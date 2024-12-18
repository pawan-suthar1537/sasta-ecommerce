import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API);

const Sendemail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "sasta ecom <onboarding@resend.dev>",
      to: to,
      subject: subject,
      html: html,
    });
    if (error) {
      return console.error({ error });
    }
    console.log(" verification Email sent successfully:", data);
    return data;
  } catch (error) {
    console.log(error.message || error);
    throw error;
  }
};

export default Sendemail;
