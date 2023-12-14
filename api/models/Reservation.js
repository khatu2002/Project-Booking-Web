// models/Reservation.js
import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
    roomNumbers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    paymentMethod: { type: String, required: true },
    total: { type: Number, required: true },
    // Thêm các trường thanh toán khác tùy thuộc vào yêu cầu của bạn
});

export default mongoose.model("Reservation", ReservationSchema);
