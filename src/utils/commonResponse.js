export const otpResponse = (status, message, data) => {
    return {
        status,
        message,
        data
    }
}

export const sendOTPResponse = (status, message) => {
    return {
        status,
        message
    }
}

export const loginResponse = (email, username, token, status) => ({
    email, username, token, status
})