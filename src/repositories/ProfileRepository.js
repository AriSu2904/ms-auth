class ProfileRepository {
    constructor({ profileSchema }) {
        this.collection = profileSchema;
    }

    async findByEmail(email) {
        return this.collection.findOne({ email });
    }

    async upsertProfile(email, payload) {
        const filter = {
            email
        };

        return this.collection.findOneAndUpdate(filter, payload, {
            new: true,
            upsert: true
        });
    }
}

export default ProfileRepository;