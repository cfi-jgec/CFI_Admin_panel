
import nodemailer from "nodemailer";


export const mailer = async (email: string, subject: string, message: string) => {
  try {
    const transport = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_USER_ID,
        pass: process.env.NEXT_PUBLIC_PASSWORD,
      },
    });
    const mailOption = {
      from: "CFI-Center For Innovation",
      to: email,
      subject,
      html: message
    };
    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
