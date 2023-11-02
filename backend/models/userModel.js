import mongoose from 'mongoose';

const userDataSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
        required: true

    }
});

export const userDataModel = new mongoose.model("user", userDataSchema);