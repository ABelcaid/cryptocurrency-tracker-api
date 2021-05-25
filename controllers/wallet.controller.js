const { Wallet } = require("../models");
const { User } = require("../models");

const addWallet = async (req, res) => {
  try {
    const email = req.body.id;
    const currencyPrice = req.body.currencyPrice;
    const cryptoName = req.body.cryp_name;
    const currencyValue = req.body.value;

    const user = await User.findOne({ email: email });
    const newSolde = user.solde - currencyPrice;

    if (user.solde >= currencyPrice) {
      //check existing wallet

      const userWallet = await Wallet.findAll({
        where: {
          user: email,
          cryp_name: cryptoName,
        },
      });

      if (userWallet.length > 0) {
        // update wallet

        const newValue = userWallet[0].value + currencyValue;

        await userWallet[0]
          .update({
            value: newValue,
          })
          .then(() => {
            user.update({
              solde: newSolde,
            });
          });
      } else {
        await Wallet.create({
          user: email,
          cryp_name: cryptoName,
          value: currencyValue,
        }).then(() => {
          user.update({
            solde: newSolde,
          });
        });
        res.send("payement created");
      }
    } else {
      res.send("Solde insuffisant ");
    }
  } catch (err) {
    res.json(err);
  }
};

const sellCrypto = async (req, res) => {
  const email = req.body.email;
  const currencyName = req.body.currencyName;
  const value = req.body.value;
  const currencyPrice = req.body.currencyPrice;

  try {
    const findWallet = await Wallet.findAll({
      where: {
        user: email,
        cryp_name: currencyName,
      },
    });

    const user = await User.findOne({ email: email });
    const newSolde = user.solde + currencyPrice;

    if (findWallet.length > 0) {
      if (findWallet[0].value > value) {
        const newValue = findWallet[0].value - value;

        await findWallet[0]
          .update({
            value: newValue,
          })
          .then(() => {
            user.update({
              solde: newSolde,
            });
          });
        res.send("Currency selled successfully");
      } else {
        res.send(`Please set a value less than ${value}`);
      }
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { addWallet, sellCrypto };
