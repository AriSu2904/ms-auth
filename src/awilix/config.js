import awilix, {asClass, asValue} from "awilix";
import { Profile } from "../database/model/ProfileSchema.js";
import UserService from "../services/UserService.js";
import ProfileRepository from "../repositories/ProfileRepository.js";
import { OTP } from "../database/model/OtpSchema.js";
import OtpRepository from "../repositories/OtpRepository.js";
import OtpService from "../services/OtpService.js";
import { User } from "../database/model/UserSchema.js";
import userRepository from "../repositories/UserRepository.js";
import ProfileService from "../services/ProfileService.js";

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true,
});

container.register({
    profileSchema: asValue(Profile),
    userSchema: asValue(User),
    otpSchema: asValue(OTP),
    profileRepository: asClass(ProfileRepository),
    userRepository: asClass(userRepository),
    otpRepository: asClass(OtpRepository),
    otpService: asClass(OtpService),
    profileService: asClass(ProfileService),
    userService: asClass(UserService)
});