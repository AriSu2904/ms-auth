class UserRepository {
    constructor({ userSchema }) {
        this.collection = userSchema;
    }

    async saveUser(firstName, lastName, email, mobilePhone, gender, birthDate, userTag, username, password, imageUri) {
       const user = new this.collection({
           firstName,
           lastName,
           email,
           mobilePhone,
           gender,
           birthDate,
           userTag,
           username,
           password,
           imageUri
       });

       return this.collection.create(user);
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
}

export default UserRepository;