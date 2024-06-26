import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
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
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
