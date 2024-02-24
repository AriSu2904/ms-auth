import {validateInput} from "../utils/validator.js";
import {registerValidation} from "../utils/registerValidation.js";
import bcrypt, {compareSync} from "bcrypt";
import {GraphQLError} from "graphql/error/index.js";
import {generateToken} from "../utils/JwtUtils.js";

class UserService {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
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
            })
        }

        const token = await generateToken(existUser._id, username, existUser.userTag, email);

        return {
            email,
            username,
            token
        }
    }
}

export default UserService;