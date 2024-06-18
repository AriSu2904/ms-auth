import awilix, {asClass, asValue} from "awilix";
import { User } from "../database/model/UserSchema.js";
import UserService from "../services/UserService.js";
import UserRepository from "../repositories/UserRepository.js";
import { OTP } from "../database/model/OtpSchema.js";
import OtpRepository from "../repositories/OtpRepository.js";
import OtpService from "../services/OtpService.js";

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true,
});

container.register({
    userSchema: asValue(User),
    otpSchema: asValue(OTP),
    userRepository: asClass(UserRepository),
    otpRepository: asClass(OtpRepository),
    otpService: asClass(OtpService),
    userService: asClass(UserService)
});