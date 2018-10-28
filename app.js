const path = require("path")
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser")
let fs = require('fs')
const app = express()  // make express app
//const port = process.env.PORT||8085

// ADD THESE COMMENTS AND IMPLEMENTATION HERE
// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") // specify our view

// 2 include public assets and use bodyParser
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3 set up the logger
// log HTTP requests to a file using the standard Apache combined format
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));

// 4 handle valid GET requests
app.get("/", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
})

// 4 http GET /Agecalculator
app.get("/agecalculator", function (req, res) {
  res.render("agecalculator.ejs")
})

// 4 http GET /about
app.get("/index", function (req, res) {
  res.render("index.ejs")
})

// 4 http GET /contact
app.get("/contact", function (req, res) {
  res.render("contact.ejs")
})

// 5 handle valid POST request
app.post("/contact", function (req, res) {
  var api_key = '6f779fc0fd4c413e8d35-4836d8f5-09a65287';
  var domain = 'sandboxd762d5c591627116b56ce07c.mailgun.org';
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

  var data = {
    from: 'Calculator App User <postmaster@sandboxd762468591627116b56ce07c.mailgun.org>',
    to: 'karunb09@gmail.com',
    subject: req.body.name + " Sent you a message",
    html: "<b style='color:blue'>Name: </b>" + req.body.name + "<br>" + "<b style='color:green'> phone: </b>" + req.body.phone + "<br>" + "<b style='color:red'>reply him : </b>" + req.body.email +"<br>" +"<b>message: </b>"  +req.body.message+"<br>"
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if (!error) {
      res.send({
        show: true,
        message: "Mail sent",
        messagebody: "success"
      })
    } else {
      res.send({
        show: true,
        message: "Mail Sending Failed",
        messagebody: "Failure! Please try again"
      })
    }
  })

})


// 6 respond with 404 if a bad URI is requested
app.get(function (req, res) {
  res.render("404")
})

// Listen for an application request on port 8081
app.listen(process.env.PORT||8085, function () {
  console.log('Age calculator app started and listening on http://localhost:' + port)
}) 