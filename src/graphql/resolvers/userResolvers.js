import {GraphQLScalarType} from "graphql/type/index.js";
import {GraphQLError} from "graphql/error/index.js";
import {Kind} from "graphql/language/index.js";
import {authenticateToken} from "../../utils/JwtUtils.js";

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
        loginUser: (_, { loginInput }, context) => {
            const { userService } = context;

            return userService.login(loginInput);
        },
        registerUser: (_, { registerInput }, context) => {
            const { userService } = context;

            return userService.register(registerInput);
        }
    }
}

export default userResolvers;