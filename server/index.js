require("dotenv").config();
const nodemailer = require("nodemailer");
const hbs = require("handlebars");
const axios = require("axios");

function SendMail(Data, str,maxmin) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port:1,// 456: ssl,  587: tls
    secure: false,
    port: 587,
    auth: {
      user: "blogmediumweb@gmail.com",
      pass: "odwakeukgqwfhfmb",
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
    from: "blogmediumweb@gmail.com",
    to: "akkaladevigoutham@gmail.com",
    subject: `breaked ${str}`,
    html: template({
      currentPrice: Data.current_price,
      MaxMin: maxmin,
      str,
    }),
  });
}

setInterval(() => {
  axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin`,
    )
    .then((result) => {
      let Data = result.data[0];
      if (Data.current_price > Data.high_24h) {
        SendMail(Data, "High_24h", Data.high_24h);
      } else if (Data.current_price < Data.low_24h) {
        SendMail(Data, "Low_24h", Data.low_24h);
      }else{
        console.log("NO")
      }
      console.log("Clicked");
    })
    .catch((err) => {
      console.log(err);
    });
}, 30000);
