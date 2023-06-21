import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
dotenv.config()
export const {
    PORT,DEBUG_MODE,
    HASH_SECRET,
    SMS_SID,
    SMS_AUTH,
    SMS_FROM_NUMBER,
    accessTokenSecret,
    refreshTokenSecret,
    BASE_URL
}=process.env;


// multer configure
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    },
});

export const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).single('cv'); // 5mb