class OtpRepository {
    constructor({ otpSchema }) {
        this.collection = otpSchema;
    }

    async saveOtp(email, otp) {
        const newData = {
            otp,
            createdAt: new Date()
        }

        await this.collection.findOneAndUpdate({ email }, newData, { upsert: true });
    }

    async findOtp(email, otp){
        return this.collection.findOne( { email, otp } );
    }

    async deleteOtp(email, otp) {
        return this.collection.findOneAndDelete({email, otp});
    }
}

export default OtpRepository;