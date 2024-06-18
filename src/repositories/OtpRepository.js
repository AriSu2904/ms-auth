class OtpRepository {
    constructor({ otpSchema }) {
        this.collection = otpSchema;
    }

    async saveOtp(email, otp) {
        const newData = {
            otp,
            createdAt: new Date()
        }

        return this.collection.findOneAndUpdate({ email }, newData, { upsert: true });
    }

    async findOtp(email, otp){
        return this.collection.findOne( { email, otp } );
    }

    async deleteOtp(email, otp) {
        return this.collection.deleteOne({email, otp});
    }
}

export default OtpRepository;