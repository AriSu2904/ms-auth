import { generateImg, validateInput } from "../utils/validator.js";
import { registerValidation } from "../utils/registerValidation.js";
import bcrypt, { compareSync } from "bcrypt";
import { generateToken } from "../utils/JwtUtil.js";
import {BadRequestError, NotFoundError} from "../utils/errorHandler.js";
import {loginResponse, otpResponse, sendOTPResponse} from "../utils/commonResponse.js";
import { profileUpdateValidation } from "../utils/profileUpdateValidation.js";
import {config} from "../../config/index.js";
import {extractBirthDate} from "../utils/dateUtil.js";

class UserService {
    constructor({ userRepository, otpService }) {
        this.userRepository = userRepository;
        this.otpService = otpService;
    }

    async register(payload) {
        const validInput = validateInput(registerValidation, payload);

        const existData = await this.userRepository.findByEmail(payload.email);
        if(existData) {
           throw BadRequestError(config.ERROR_MESSAGE.DUPLICATE_EMAIL);
        }

        const { firstName, lastName, gender, password, birthDate } = validInput;

        const encryptedPw = bcrypt.hashSync(password, 10);
        const fullName = `${firstName} ${lastName}`;
        const imageUri = generateImg(gender, fullName);

        const data = {
            ...payload,
            birthDate: extractBirthDate(birthDate),
            password: encryptedPw,
            fullName,
            imageUri
        }

        return this.userRepository.saveUser(data);
    }

    async login(payload) {
        const { email, username, password } = payload;

        const existUser = await this.userRepository.findUser(username, email);

        if(!existUser || !compareSync(password, existUser.password)){
            BadRequestError(config.ERROR_MESSAGE.BAD_REQUEST);
        }

        if(!existUser.verified) {
            return loginResponse(email, username, null, config.USER_STATUS.UNREGISTERED);
        }

        const token = await generateToken(existUser._id, username, existUser.userTag, email);

        return loginResponse(email, username, token, config.USER_STATUS.VERIFIED);
    }

    async getUser(username, email){
        console.info(`try to get user with username ${username} or email ${email}`);

        return this.userRepository.findUser(username, email);
    }

    async sendOTP(email) {

        const existUser = await this.userRepository.findByEmail(email);

        if(!existUser){
            BadRequestError(config.ERROR_MESSAGE.BAD_REQUEST);
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

    async updateUserInformation(email, payload) {
        const validInput = validateInput(profileUpdateValidation, payload);
        const existData = await this.userRepository.findByEmail(email);

        if(existData) {
            const data = {
                ...validInput,
                ...(validInput.birthDate && { birthDate: extractBirthDate(validInput.birthDate) })
            }

            return this.userRepository.updateProfile(email, data);
        }

        throw NotFoundError(config.ERROR_MESSAGE.NOT_FOUND)
    }
}

export default UserService;