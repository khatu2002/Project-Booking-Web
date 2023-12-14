// controllers/reservation.js
import Reservation from '../models/Reservation.js';

export const createReservation = async (req, res) => {
    try {
        const { roomNumbers, user, paymentMethod, total } = req.body;

        // Lưu thông tin đặt phòng vào cơ sở dữ liệu
        const reservation = await Reservation.create({
            roomNumbers,
            user,
            paymentMethod,
            total,
            // Thêm các trường thanh toán khác tùy thuộc vào yêu cầu của bạn
            // Ví dụ: thêm các thông tin cần thiết khác
        });

        res.json({ success: true, reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};
