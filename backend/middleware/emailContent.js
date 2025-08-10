/*const { transporter } = require("./mail.js");


 const sendverificationcode=async(email, verificationcode)=>{
    try {
        const response  = await transporter.sendMail({
            from: '"CodeBYLakshya" <learnai10100@gmail.com>',
            to: email,
            subject:"verify your email",
            text: "verify your email",
            html: verificationcode,
        });
        console.log("email send successsfully",response);
    } catch (error) {
        
    }
}

*/
// utils/sendverificationcode.js
const nodemailer = require("nodemailer");

const sendverificationcode = async (email, otp) => {
  try {
    // 1. Transporter Setup (use your real Gmail & App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "learnai10100@gmail.com",         // 🔁 Your Gmail
        pass: "bidv qxgz plig zjsf",            // 🔁 App Password from Google (not your main pass!)
      },
    });

    // 2. Mail Content
    const mailOptions = {
      from: '"WebWithLakshya" <learnai10100@gmail.com>',
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family: sans-serif; padding: 10px">
          <h2>Email Verification</h2>
          <p>Thanks for signing up. Use the OTP below to verify your email:</p>
          <h3 style="color: #333;">${otp}</h3>
          <p>This OTP is valid for one-time use only.</p>
        </div>
      `,
    };

    // 3. Send the mail
    await transporter.sendMail(mailOptions);
    console.log("OTP mail sent to", email);
  } catch (error) {
    console.error("Mail send error:", error);
    throw new Error("Failed to send OTP");
  }
};




module.exports = { sendverificationcode };