import nodemailer, { SendMailOptions } from 'nodemailer';
import { PathMap } from '../pathMap';

export module Mail {
  interface EmailOption {
    smpt: string;
    smptPort: number;
    userId: string;
    password: string;
  }

  function createTransporter(emailOption: EmailOption) {
    const transporter = nodemailer.createTransport({
      host: emailOption.smpt,
      port: emailOption.smptPort,
      requireTLS: true,
      auth: {
        user: emailOption.userId,
        pass: emailOption.password
      }
    });

    return transporter;
  }

  export async function sendMail(mail: SendMailOptions) {
    const emailOption: EmailOption = require(PathMap.email);
    const transporter = createTransporter(emailOption);

    const sendMail: SendMailOptions = {
      from: '"Elaina Blog" <foo@example.com>'
    };
    Object.assign(sendMail, mail);
    await transporter.sendMail(sendMail);
  }
}
