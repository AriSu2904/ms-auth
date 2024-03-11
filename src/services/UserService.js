import {generateImg, validateInput} from "../utils/validator.js";
import {registerValidation} from "../utils/registerValidation.js";
import bcrypt, {compareSync} from "bcrypt";
import {generateToken} from "../utils/JwtUtil.js";
import {BadRequestError} from "../utils/errorHandler.js";
import {otpResponse, sendOTPResponse} from "../utils/commonResponse.js";

class UserService {
    constructor({ userRepository, otpService }) {
        this.userRepository = userRepository;
        this.otpService = otpService;
    }

    async register(payload) {
        const validInput = validateInput(registerValidation, payload);

        const { firstName, lastName, email,
            mobilePhone, gender, birthDate, userTag,
            username, password } = validInput;

        const encryptedPw = bcrypt.hashSync(password, 10);

        const fullName = `${firstName} ${lastName}`;

        const imageUri = generateImg(gender, fullName);

        return this.userRepository.saveUser(firstName, lastName, email,
            mobilePhone, gender, birthDate, userTag, username, encryptedPw, imageUri);
    }

    async login(payload) {
        const { email, username, password } = payload;

        const existUser = await this.userRepository.findUser(username, email);

        if(!existUser || !compareSync(password, existUser.password)){
            BadRequestError("Incorrect data, make sure you have valid credential!");
        }

        if(!existUser.verified) {
            BadRequestError("Can not Login, Please verify your email first!");
        }

        const token = await generateToken(existUser._id, username, existUser.userTag, email);

        return {
            email,
            username,
            token
        }
    }
    async sendOTP(email) {

        const existUser = await this.userRepository.findByEmail(email);

        if(!existUser){
            BadRequestError("Incorrect data, make sure you have valid credential!");
        }

        const isSend = await this.otpService.sendOtp(email);
        if(isSend) {
            return sendOTPResponse(isSend, `OTP Code is Sent, Please check your mail box!`);
        }

        return sendOTPResponse(isSend, 'Failed to send OTP Code!');
    }
    async OTPVerification(email, otp) {
        const isDeleted = await this.otpService.verifyOTP(email, otp);

        if(isDeleted) {
            const updatedUser = await this.userRepository.updateUser(email, { verified: true });

            return otpResponse(true, "Congratulations! Your Account is Active Now!", updatedUser);
        }

        return otpResponse(false, "OTP Is Expired, Please Resend And Submit Again!", null);

    }
}

export default UserService;