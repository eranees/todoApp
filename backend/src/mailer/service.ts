import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

export class Mailer {
	async sendMail(mailOptions) {
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: false,
			auth: {
				user: process.env.MAIL_EMAIL,
				pass: process.env.MAIL_PASS,
			},
		});

		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				return err;
			} else {
				return info.response;
			}
		});
	}
}
