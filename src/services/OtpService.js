import randomizing from "randomstring";
import { config } from "../../config/index.js";
import nodemailer from "nodemailer";

class OtpService {
    constructor({ otpRepository }) {
        this.repository = otpRepository;
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

            await this.repository.saveOtp(email, newOTP);

            await this._mailSender({
                to: email,
                subject: 'Your OTP',
                message: `<p>Your otp is: <strong>${newOTP}</strong></p>`
            });
            console.log(`Success send otp to ${email}`);
            return true;
        }catch (err){
            console.log(`Error occurred when sending otp ${err}`);

            throw err;
        }
    }

    async verifyOTP(email, otp) {
        return this.repository.deleteOtp(email, otp);
    }
}

export default OtpService;