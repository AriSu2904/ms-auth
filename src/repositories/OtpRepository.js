class OtpRepository {
    constructor({ otpSchema }) {
        this.collection = otpSchema;
    }

    async saveOtp(email, otp) {
        const newOtp = new this.collection({
            email, otp
        });

        this.collection.create(newOtp);
    }

    async findOtp(email, otp){
        return this.collection.findOne( { email, otp } );
    }

    async deleteOtp(email, otp) {
        return this.collection.findOneAndDelete({email, otp});
    }
}

export default OtpRepository;