import {Model, Schema} from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobilePhone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    userTag: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

export const User = new Model('User', userSchema);
