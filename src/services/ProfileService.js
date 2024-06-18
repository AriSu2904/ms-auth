import {extractBirthDate} from "../utils/dateUtil.js";
import {profileSchema, validateInput} from "../utils/inputValidation.js";
import {generateImg} from "../utils/validator.js";

class ProfileService {
    constructor({profileRepository}) {
        this.profileRepository = profileRepository;
    }

    async upsertProfile(emailPayload, payload) {
        const registrationPayload = payload.profile;
        const profile = registrationPayload || payload;
        const validInput = validateInput(profileSchema, profile);

        const {
            firstName,
            lastName,
            mobilePhone,
            gender,
            birthDate,
            bio,
            email
        } = validInput

        const fullName = firstName+lastName;
        const profilePicture = generateImg(gender, fullName);

        const profilePayload = {
            firstName,
            lastName,
            email,
            mobilePhone,
            gender,
            ...(birthDate && {birthDate: extractBirthDate(birthDate)}),
            ...(fullName && { profilePicture }),
            bio
        }

        return this.profileRepository.upsertProfile(emailPayload, profilePayload);
    }

    async getProfile(email) {
        return this.profileRepository.findByEmail(email)
    }

}

export default ProfileService