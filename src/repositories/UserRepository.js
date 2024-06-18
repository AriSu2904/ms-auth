class UserRepository {
    constructor({ userSchema }) {
        this.collection = userSchema;
    }

    async saveUser(payload) {
       return this.collection.create(payload);
    }

    async findUser(username, email) {
        return this.collection.findOne({$or: [ { username }, { email } ] });
    }

    async findByEmail(email) {
        return this.collection.findOne({ email });
    }

    async updateUser(email, update) {
        return this.collection.findOneAndUpdate( { email }, update, {
            new: true
        });
    }

    async updateProfile(email, payload) {
        const filter = {
            email
        };
        const replacement = {
            ...payload
        }
        const options = {
            new: true
        }

        return this.collection.findOneAndUpdate(filter, replacement, options);
    }
}

export default UserRepository;