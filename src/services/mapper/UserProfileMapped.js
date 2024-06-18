export const userProfileMapped = (user, profile) => {
    const { username, role, verified, email } = user
    const { firstName, lastName, mobilePhone,
        gender, birthDate, profilePicture, bio } = profile
    return {
        username,
        role,
        verified,
        email,
        profile: {
            firstName,
            lastName,
            email,
            mobilePhone,
            gender,
            birthDate,
            profilePicture,
            bio
        }
    }
}