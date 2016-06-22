var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();
var router = express.Router();
var path = __dirname + '/views/';

app.use(express.static(__dirname + '/views'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.post("/contact", handleContact);

function handleContact(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'win@retas.com.sg',
      pass: '32592135'
    }
  });
  
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;
  
  var mailOptions = {
    from: email,
    to: 'kyawagwin@gmail.com, kyawagwin@live.com',
    subject: name + " - " + subject,
    text: message
  };
  
  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error);
      res.json({
        error: 'message: ' + error
      });
    } else {
      console.log('message sent:', info.response);
      res.json({
        message: info.response
      });
    }
  });
}

app.use("/", router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log('app is listening at:', process.env.IP, ':', process.env.PORT);
})