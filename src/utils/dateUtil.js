import moment from "moment";

export const extractBirthDate = (birthDate) => {
    return moment(birthDate).format('YYYY-MM-DD');
}