import {registrationSchema, validateInput} from "../utils/inputValidation.js";
import bcrypt, {compareSync} from "bcrypt";
import {generateToken} from "../utils/JwtUtil.js";
import {BadRequestError, NotFoundError} from "../utils/errorHandler.js";
import {loginResponse, otpResponse} from "../utils/commonResponse.js";
import {config} from "../../config/index.js";
import {userProfileMapped} from "./mapper/UserProfileMapped.js";
import {isEqual} from "../utils/validator.js";

class UserService {
    constructor({userRepository, otpService, profileService}) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.profileService = profileService;
    }

    async register(payload) {
        const validInput = validateInput(registrationSchema, payload);

        const existData = await this.userRepository.findUser(payload.email);
        if (existData) {
            throw BadRequestError(config.ERROR_MESSAGE.DUPLICATE_EMAIL);
        }

        const {username, email, password} = validInput;

        const encryptedPw = bcrypt.hashSync(password, 10);

        const storedProfile = await this.profileService.upsertProfile(email, validInput);

        const userPayload = {
            username,
            email,
            password: encryptedPw,
            profile: storedProfile._id
        }

        const storedUser = await this.userRepository.upsertUser(email, userPayload)

        return userProfileMapped(storedUser, storedProfile);
    }

    async login(payload) {
        const {username, password} = payload;

        const existUser = await this.userRepository.findUser(username);

        if (!existUser || !compareSync(password, existUser.password)) {
            BadRequestError(config.ERROR_MESSAGE.BAD_REQUEST);
        }

        if (!existUser.verified) {
            return loginResponse(username, null, config.USER_STATUS.UNREGISTERED);
        }

        const token = await generateToken(existUser._id, username, existUser.email);

        return loginResponse(username, token, config.USER_STATUS.VERIFIED);
    }

    async OtpRequest(email) {
        const result = await this.otpService.sendOtp(email);

        console.log(result);

        if(result) {
            return otpResponse(true, "OTP is sent to your mail!", result);
        }
        return otpResponse(false, result, null);
    }

    async OtpClaims(email, otp) {
        try {
            await this.otpService.verifyOtp(email, otp);
            const verifiedUser = await this.userRepository.upsertUser(email, {verified: true});

            return otpResponse(true, "grats! your account is active now!", verifiedUser)
        }catch (err) {
            if(isEqual(err.extensions.code, config.ERROR_CODE["404"])) {
                return otpResponse(false, err.message, null);
            }
            throw err;
        }
    }

    async getUser(username){
        const existUser = await this.userRepository.findUser(username);

        if(existUser) {
            const profileUser = await this.profileService.getProfile(existUser.email);

            return userProfileMapped(existUser, profileUser);
        }

        throw NotFoundError(config.ERROR_MESSAGE.NOT_FOUND)
    }

}

export default UserService;