import { decodeToken } from "../../utils/JwtUtil.js";
import { setCookies } from "../../utils/cookies.js";
import { ForbiddenError } from "../../utils/errorHandler.js";
import { authorizationHeaderCheck } from "../../utils/validator.js";
import { config } from "../../../config/index.js";

const userResolvers = {
    User: {
        id: (parent) => parent.id ?? parent._id,
    },
    Query: {
        userInformation: async (_, args, { req, userService }) => {
            if (authorizationHeaderCheck(req)) {
                const { username } = await decodeToken(req.headers.authorization);

                return userService.getUser(username);
            }

            throw ForbiddenError(config.ERROR_MESSAGE.FORBIDDEN);
        }
    },
    Mutation: {
        loginUser: async (_, { loginInput }, { res, userService }) => {

            const loggedUser = await userService.login(loginInput);

            const { token } = loggedUser;

            await setCookies(res, 'token', token);

            return loggedUser;
        },
        registerUser: async (_, { registerInput }, { res, userService }) => {
            const registeredUser = await userService.register(registerInput);

            await setCookies(res, 'email', registeredUser.email);

            return registeredUser;
        },
        oneTimePassword: async (_, { email }, { userService }) => {
            return userService.OtpRequest(email);
        },
        verifyOTP: async (_, { otpInput }, { userService }) => {
            const {email, otp} = otpInput;

            return userService.OtpClaims(email, otp);
        },
        updateProfile: async (_, { updateInput }, { req, userService }) => {
            if(authorizationHeaderCheck(req)) {
                const { user_email } = await decodeToken(req.headers.authorization);

                return userService.updateUserInformation(user_email, updateInput);
            }

            throw ForbiddenError(config.ERROR_MESSAGE.FORBIDDEN);
        }
    }
}

export default userResolvers;