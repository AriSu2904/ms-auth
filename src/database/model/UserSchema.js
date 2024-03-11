import mongoose, {Schema} from "mongoose";

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
        required: true,
        unique: true
    },
    mobilePhone: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    userTag: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enums: ['ADMIN', 'USER', 'SUPERIOR'],
        default: 'USER'
    },
    verified: {
        type: Boolean,
        default: false
    },
    imageUri: {
        type: String,
        required: false
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
