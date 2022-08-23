import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class SendMailService {
    private nodemailerTransport: Mail;
    constructor() {
        this.nodemailerTransport = createTransport({
            host: "localhost",
            service: 'gmail',
            auth: {
                user: "nhnghia1806@gmail.com",
                pass: "zqtpbbybqbzzigzu",
            },
        });
    }

    async sendMail(email: string) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        await this.nodemailerTransport.sendMail({
            from: '"Huunghia" <nhnghia1806@gmail.com>',
            to: email,
            subject: 'Verify Your Account',
            html: `<p>Enter <b>${otp}</b> to verify your email address</p>`,
        });

        return otp;
    }
}