const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "learnai10100@gmail.com",
    pass: "bidv qxgz plig zjsf",
  },
});

const SendEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"CodeBYLakshya" <learnai10100@gmail.com>',
      to: "lakshyagoud969@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

SendEmail();

module.exports={transporter};