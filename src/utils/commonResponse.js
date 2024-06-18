export const otpResponse = (status, message, data) => {
    return {
        status,
        message,
        data
    }
}

export const loginResponse = (username, token, status) => ({
    username, token, status
})