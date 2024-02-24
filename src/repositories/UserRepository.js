class UserRepository {
    constructor({ userSchema }) {
        this.collection = userSchema;
    }

    async saveUser(firstName, lastName, email, mobilePhone, gender, birthDate, userTag, username, password) {
       const user = new this.collection({
           firstName,
           lastName,
           email,
           mobilePhone,
           gender,
           birthDate,
           userTag,
           username,
           password
       });

       return this.collection.create(user);
    }

    async findUser(username, email) {
        return this.collection.findOne({$or: [ { username }, { email } ] });
    }
}

export default UserRepository;