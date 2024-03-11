import {validateInput} from "../utils/validator.js";
import {registerValidation} from "../utils/registerValidation.js";
import bcrypt, {compareSync} from "bcrypt";
import {GraphQLError} from "graphql/error/index.js";
import {generateToken} from "../utils/JwtUtil.js";

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

        return this.userRepository.saveUser(firstName, lastName, email,
            mobilePhone, gender, birthDate, userTag, username, encryptedPw);
    }

    async login(payload) {
        const { email, username, password } = payload;

        const existUser = await this.userRepository.findUser(username, email);

        if(!existUser || !compareSync(password, existUser.password)){
            throw new GraphQLError("Incorrect data, make sure you have valid credential!", {
                extensions: {
                    code: "BAD_REQUEST"
                }
            });
        }

        if(!existUser.verified) {
            throw new GraphQLError("Can not Login, Please verify your email first!", {
                extensions: {
                    code: "BAD_REQUEST"
                }
            });
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
            throw new GraphQLError("Incorrect data, make sure you have valid credential!", {
                extensions: {
                    code: "BAD_REQUEST"
                }
            });
        }

        const isSend = await this.otpService.sendOtp(email);
        if(isSend) {
            return {
                status: isSend,
                message: 'otp is already send into your mail!'
            }
        }

        return {
            status: isSend,
            message: 'Error occurred when sending otp to your mail!'
        }
    }
    async OTPVerification(email, otp) {
        const isDeleted = await this.otpService.verifyOTP(email, otp);

        if(isDeleted) {
            const updatedUser = await this.userRepository.updateUser(email, { verified: true });

            return {
                status: true,
                message: 'Congratulations! Your Account is Active Now!',
                data: updatedUser
            }
        }

        return {
            status: false,
            message: 'OTP Is Expired, Please Resend And Submit Again!',
            data: null
        }
    }
}

export default UserService;