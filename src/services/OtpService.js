import randomizing from "randomstring";
import { config } from "../../config/index.js";
import nodemailer from "nodemailer";
import {NotFoundError} from "../utils/errorHandler.js";

class OtpService {
    constructor({ otpRepository }) {
        this.otpRepository = otpRepository;
    }

    async _generateOTP() {
        return randomizing.generate({
            length: 6,
            charset: 'numeric'
        });
    }

    async _mailSender(options) {
        const transporter = nodemailer.createTransport({
            service: config.SMPT_SERVICE,
            host: config.SMPT_HOST,
            secure: true,
            auth: {
                user: config.SMPT_MAIL,
                pass: config.SMPT_PASS
            },
            authMethod: 'LOGIN'
        });

        const mailOptions= {
            from: config.SMPT_MAIL,
            to: options.to,
            subject: options.subject,
            html: options.message,
        };

        await transporter.sendMail(mailOptions);
    }

    async sendOtp(email){
        try {
            const newOTP = await this._generateOTP();

            await this._mailSender({
                to: email,
                subject: 'Your OTP',
                message: `<p>Your otp is: <strong>${newOTP}</strong></p>`
            });

            await this.otpRepository.saveOtp(email, newOTP);

            return newOTP
        }catch (err){
            return err.message;
        }
    }

    async verifyOtp(email, otp) {
        const existingOtp = await this.otpRepository.findOtp(email, otp);

        if(existingOtp) {
            return this.otpRepository.deleteOtp(email, otp);
        }

        throw NotFoundError('Expired OTP Code, Please request new OTP!');
    }
}

export default OtpService;