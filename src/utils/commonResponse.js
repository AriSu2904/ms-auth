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