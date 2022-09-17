require("dotenv").config();
const MonitorPrice = require("../models/Monitor");
const nodemailer = require("nodemailer");
const hbs = require("handlebars");
const axios = require("axios");
module.exports.MonitorBitCon = (req, res) => {
  let { date, page, limit } = req.query;
  let email = process.env.TO;
  let min = process.env.MIN;
  let max = process.env.MAX;

  function SendMail(Data, str, maxmin, email) {
    var transport = nodemailer.createTransport({
      host: process.env.HOST,
      port: 2525,
      auth: {
        user: process.env.user,
        pass: process.env.password,
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
      from: process.env.FROM,
      to: process.env.TO,
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
        var cal = new Date();
        var date = cal.getDate();
        var mon = cal.getMonth() + 1;
        var year = cal.getFullYear();
        const Monitor = new MonitorPrice({
          price: Data.current_price,
          coin: "bitcon",
          email: email,
          date: `${date}/0${mon}/${year}`,
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
  MonitorPrice.find({ email: process.env.TO }).exec((err, succ) => {
    if (succ) {
      c = succ.length;
    }
  });
  MonitorPrice.find({ email: process.env.TO ,date})
    .skip(page * limit)
    .limit(limit)
    .exec((err, succ) => {
      if (err) {
        return res.status.apply(500).send(err);
      } else {
        if(succ.length === 0){
          return res.status(201).send({message:"data not present keep different page number", count: c });
        }else{
          return res.status(201).send({ succ, count: c });
        }
      }
    });
};
