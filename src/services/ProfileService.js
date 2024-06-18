import {extractBirthDate} from "../utils/dateUtil.js";
import {profileSchema, validateInput} from "../utils/inputValidation.js";
import {generateImg} from "../utils/validator.js";

class ProfileService {
    constructor({profileRepository}) {
        this.profileRepository = profileRepository;
    }

    async upsertProfile(email, { profile }) {
        const validInput = validateInput(profileSchema, profile);

        const {
            firstName,
            lastName,
            mobilePhone,
            gender,
            birthDate
        } = validInput

        const fullName = `${firstName}${lastName}`;
        const profilePicture = generateImg(gender, fullName);

        const profilePayload = {
            firstName,
            lastName,
            email,
            mobilePhone,
            gender,
            birthDate: extractBirthDate(birthDate),
            profilePicture
        }

        return this.profileRepository.upsertProfile(email, profilePayload);
    }

    async getProfile(email) {
        return this.profileRepository.findByEmail(email)
    }

}

export default ProfileService