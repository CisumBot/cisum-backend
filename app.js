const express = require('express');
const path = require('path');
const DailyReward = require('./models/DailyReward');
const Wallet = require('./models/Wallet');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // onde está seu resgate.html

app.post('/daily', async (req, res) => {
  const { userID } = req.body;
  const now = new Date();

  

  try {
    let rewardData = await DailyReward.findOne({ userID });

    if (rewardData && now - rewardData.lastClaim < 86400000) {
      return res.status(429).json({ message: "Você já resgatou hoje!" });
    }

    const amount = Math.floor(1500 + Math.random() * 501);

    if (!rewardData) {
      await DailyReward.create({ userID, lastClaim: now });
    } else {
      rewardData.lastClaim = now;
      await rewardData.save();
    }

    let wallet = await Wallet.findOne({ userID });
    if (!wallet) {
      await Wallet.create({ userID, coins: amount });
    } else {
      wallet.coins += amount;
      await wallet.save();
    }

    res.json({ message: `🎉 ${amount} Cisum Coins recebidos! Saldo: ${wallet.coins}` });
  } catch (error) {
    console.error("Erro no resgate:", error);
    res.status(500).json({ message: "Erro interno ao processar o resgate." });
  }
});

app.get('/status', async (req, res) => {
  const { userID } = req.query;

  try {
    const rewardRecord = await DailyReward.findOne({ userID });
    const wallet = await Wallet.findOne({ userID });

    const now = Date.now();
    const lastClaim = rewardRecord?.lastClaim?.getTime() ?? 0;
    const timeLeft = Math.max(86400000 - (now - lastClaim), 0);
    const coins = wallet?.coins ?? 0;

    res.json({ coins, timeLeft });
  } catch (err) {
    console.error("Erro ao buscar status:", err);
    res.status(500).json({ coins: 0, timeLeft: 0 });
  }
});

app.listen(3000, () => {
  console.log("🟢 Servidor do site ativo na porta 3000");
});
