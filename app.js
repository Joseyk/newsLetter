const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
  const fName = req.body.Fname;
  const lName = req.body.Lname;
  const mail = req.body.email;
  const data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/375e1e3b5f";
  const option = {
    method: "post",
    auth: "Joseyk1:eb2d43f01f7df3404fa3c1ee375c7bd0-us21",
  };
  const request = https.request(url, option, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT||3000, function () {
  console.log("server is running on port 3000");
});
// eb2d43f01f7df3404fa3c1ee375c7bd0-us21
// 375e1e3b5f
