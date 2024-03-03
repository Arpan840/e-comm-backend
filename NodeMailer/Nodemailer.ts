import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const EmailVerification = "http://localhost:8000/auth/EmailAuth";
export async function sendMail(sendToEmail: string) {
  return new Promise((resolve, reject) => {
    try {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "arpandas020498@gmail.com",
          pass: process.env.GMAILPASSWORD,
        },
      });

      var mailOptions = {
        from: "arpandas020498@gmail.com",
        to: sendToEmail,
        subject: "Email Verification",
        text: `Click here to verify ${EmailVerification}. You are successfully logged in`,
      };

      transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (!error) {
          resolve(true);
        }
      });
    } catch (error: any) {
      reject({
        message: error.message,
      });
    }
  });
}
