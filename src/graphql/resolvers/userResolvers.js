import {GraphQLScalarType} from "graphql/type/index.js";
import {GraphQLError} from "graphql/error/index.js";
import {Kind} from "graphql/language/index.js";
import {authenticateToken} from "../../utils/JwtUtil.js";
import {setCookies} from "../../utils/cookies.js";

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
        Hello: async (_, args, context) => {
            const { req } = context;
            if(req.headers.authorization) {
                await authenticateToken(req.headers.authorization)
                return "Hello World!";
            }

            throw new GraphQLError("You are not authorize!", {
                extensions: {
                    code: "FORBIDDEN"
                }
            })
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
        OneTimePassword: async (_, { email }, { userService }) => {
            return userService.sendOTP(email);
        },
        verifyOTP: async(_, { otpInput }, { req, userService }) => {
            const { email, otp } = otpInput;

            return userService.OTPVerification(email, otp);
        }
    }
}

export default userResolvers;