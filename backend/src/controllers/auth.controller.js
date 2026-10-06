import axios from 'axios'
import jwt from 'jsonwebtoken'
import { oauth2Client } from '../utils/googleConfig.js'
import User from '../models/userModel.js'

export const googleLogin = async (req, res) => {

    const code = req.query.code;

    try {

        const googleRes = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );

        const { email, name, picture } = userRes.data;

        let user = await User.findOne({ email });

        if (!user) {

            user = await User.create({
                name,
                email,
                image: picture
            });

        }

        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_TIMEOUT
            }
        );

        return res.status(200).json({
            message: "Google login successful",
            accessToken,
            user
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};