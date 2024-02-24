const userResolvers = {
    User: {
        id: (parent) => parent.id ?? parent._id,
    },
    Query: {
        Hello: () => {
            return "Hello World!";
        }
    },
    Mutation: {
        loginUser: (_, { loginInput }) => {

        },
        registerUser: (_, { registerInput }) => {

        }
    }
}

export default userResolvers;