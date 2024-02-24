import awilix, {asClass, asValue} from "awilix";
import {User} from "../database/model/UserSchema.js";
import UserService from "../services/UserService.js";
import UserRepository from "../repositories/UserRepository.js";

export const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true,
});

container.register({
    userSchema: asValue(User),
    userRepository: asClass(UserRepository),
    userService: asClass(UserService)
});

export const setUp = () => {

}
