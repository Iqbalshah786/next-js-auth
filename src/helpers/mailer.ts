import nodemailer from 'nodemailer';
import User from '@/models/userModal';
import bcrypt from 'bcryptjs';



export const sendEmail = async ({email,emailType,userId}:any) => {
 
  try {
    const hashedToken = await bcrypt.hash(userId.toString(),10)

    if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + 3600000)})
    }else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)})  
    }

 const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
  },
});

 const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: emailType === "VERIFY" ? "verify email":"Reset your Password",
    html:`<p>Click  <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>
    <p>or copy the link <br />${process.env.DOMAIN}/verifyemail?token=${hashedToken} and paste in the browser</p>
    `
  };

  const mailresponse = await transporter.sendMail(mailOptions);

  console.log('Welcome email sent successfully');
  } catch (error:any) {
    console.error('Error sending welcome email:', error);
    throw new Error(`Failed to send email: ${error.message}`);

  }
};
