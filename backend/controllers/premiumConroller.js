import Razorpay from "razorpay";
import { userDataModel } from "../models/userModel.js";
import dotenv from 'dotenv';

dotenv.config();
const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});

export const createPayment = async (req, res) => {
    try {

        const amount = 499 * 100
        const id = req.body.userId;

        const resp = await userDataModel.findById({ _id: id })

        const name = resp.username;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options,
            (err, order) => {
                if (!err) {
                    res.status(200).send({
                        success: true,
                        msg: 'Order Created',
                        order_id: order.id,
                        amount: amount,
                        key_id: process.env.KEY_ID,
                        product_name: "Preium Features",
                        contact: process.env.NUMBER,
                        name: name,
                        email: resp.email
                    });
                }
                else {
                    res.status(400).send({ success: false, msg: 'Something went wrong!' });
                }
            }
        );

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Internal Server Error' });
    }


}