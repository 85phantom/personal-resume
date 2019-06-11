const express = require('express')
const app = express();
let nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
const cors = require('cors');
const util = require('util');
const fs = require('fs');
AWS.config.update({ region: 'us-west-2' });
const ses = new AWS.SES();

app.use(cors());
app.use(express.json());

app.post('/email', async (req, res) => {
  let transporter = nodemailer.createTransport({
    SES: new AWS.SES({
      apiVersion: '2010-12-01'
    })
  });
  transporter.sendMail({
    from: 'oxox850502@kebowen.dev',
    to: req.body.email,
    subject: '柯博文的履歷',
    text: '這是我的履歷，請參閱附件',
    attachments:[{
      path: __dirname + '/PDF/personal_resume.pdf'
    }]
  }, (err, info) => {
    if(err){
      console.error(err);
      res.status(500).json({message: 'error'});
    }else{
      console.log(info.envelope);
      console.log(info.messageId);
      res.status(200).json({message: 'success'});
    }
  });
})

app.listen(3000, () => {
  console.log('Server Start.');
})
