import { GraphQLScalarType } from "graphql/type/index.js";
import { Kind } from "graphql/language/index.js";
import { decodeToken } from "../../utils/JwtUtil.js";
import { setCookies } from "../../utils/cookies.js";
import {ForbiddenError} from "../../utils/errorHandler.js";
import {authorizationHeaderCheck} from "../../utils/validator.js";
import {config} from "../../../config/index.js";


const userResolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize(value) {
            if (value instanceof Date) {
                return value.getTime();
            }
            throw Error('GraphQL Date Scalar serializer expected a `Date` object');
        },
        parseValue(value) {
            if (typeof value === 'string') {
                return new Date(value);
            }
            throw new Error('GraphQL Date Scalar parser expected a `string date`');
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {

                return new Date(parseInt(ast.value, 10));
            }

            return null;
        },
    }),
    User: {
        id: (parent) => parent.id ?? parent._id,
    },
    Query: {
        userInformation: async (_, args, {req, userService}) => {
            if (authorizationHeaderCheck(req)) {
                const { user_dna, user_email } = await decodeToken(req.headers.authorization);

                return userService.getUser(user_dna, user_email);
            }

            throw ForbiddenError(config.ERROR_MESSAGE.FORBIDDEN);
        }
    },
    Mutation: {
        loginUser: async (_, { loginInput }, {res, userService}) => {

            const loggedUser = await userService.login(loginInput);

            const {token} = loggedUser;

            await setCookies(res, 'token', token);

            return loggedUser;
        },
        registerUser: async (_, { registerInput }, { res, userService }) => {

            const registeredUser = await userService.register(registerInput);

            await setCookies(res, 'email', registeredUser.email);

            return registeredUser;
        },
        oneTimePassword: async (_, { email }, { userService }) => {
            return userService.sendOTP(email);
        },
        verifyOTP: async (_, { otpInput }, { userService }) => {
            const {email, otp} = otpInput;

            return userService.OTPVerification(email, otp);
        },
        updateProfile: async (_, { updateInput }, { req, userService }) => {
            if(authorizationHeaderCheck(req)) {
                const { user_email } = await decodeToken(req.headers.authorization);

                const updatedProfile = await userService.updateUserInformation(user_email, updateInput);
            }

            throw ForbiddenError(config.ERROR_MESSAGE.FORBIDDEN);
        }
    }
}

export default userResolvers;