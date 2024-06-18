class UserRepository {
    constructor({userSchema}) {
        this.collection = userSchema
    }

    async upsertUser(email, payload) {
        const filter = {
            email
        };
        const replacement = {
            ...payload
        }
        const options = {
            new: true,
            upsert: true
        }

        return await this.collection.findOneAndUpdate(filter, replacement, options);
    }

    async findUser(filterField) {
        return this.collection.findOne({
            $or: [
                {email: filterField},
                {username: filterField}
            ]
        });
    }
}

export default UserRepository;