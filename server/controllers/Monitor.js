const MonitorPrice = require("../models/Monitor");
const nodemailer = require("nodemailer");
const hbs = require("handlebars");
const axios = require("axios");
module.exports.MonitorBitCon = (req, res) => {
  let { date, page, limit } = req.query;
  const { max, min, email } = req.body;
  function SendMail(Data, str, maxmin, email) {
    const transport = nodemailer.createTransport({
      host: process.env.HOST,
      secure: false,
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const content = `<div>
                            <h1>{{str}} BREAKED OUT ALERT</h1>
                            <p>This is current price of BitCoin {{ currentPrice}} </p>
                            <p>{{str}} {{MaxMin}}</p>
                            </div>
                         `;
    const template = hbs.compile(content);

    transport.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: `BREAKED ${str}`,
      html: template({
        currentPrice: Data.current_price,
        MaxMin: maxmin,
        str,
      }),
    });
  }
  var ClearInterval;
  clearInterval(ClearInterval);
  ClearInterval = setInterval(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`,
      )
      .then((result) => {
        let Data = result.data[0];

        const Monitor = new MonitorPrice({
          price: Data.current_price,
          coin: "bitcon",
          email: email,
        });
        Monitor.save();
        if (Data.current_price > max) {
          SendMail(Data, "MAXIMUM PRICE", max, email);
        } else if (Data.current_price < min) {
          SendMail(Data, "MINIMUM PRICE", min, email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, 30000);
  if (page == undefined) {
    page = 1;
  }
  let c = 0;
     MonitorPrice.find({ email }).exec((err, succ) => {
     if (succ) {
      c = succ.length
     }
   });
  MonitorPrice.find({ email })
    .skip(page * limit)
    .limit(limit)
    .exec((err, succ) => {
      if (err) {
        return res.status.apply(500).send(err);
      } else {
        return res.status(201).send({ succ, count: c });
      }
    });
};
