export const setCookies = async (res, key, value) => {
    res.cookie(key, value, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000
    });
}

