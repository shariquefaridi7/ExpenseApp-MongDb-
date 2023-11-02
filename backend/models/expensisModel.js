import mongoose from 'mongoose';

const expensisSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    }
});

export const expensisModel = new mongoose.model("expense", expensisSchema);