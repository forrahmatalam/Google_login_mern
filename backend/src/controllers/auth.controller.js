import axios from 'axios'
import jwt from 'jsonwebtoken'
import { oauth2Client } from '../utils/googleConfig.js'
import User from '../models/userModel.js'


export const googleLogin = async (req, res) => {
    const code = req.query.code ?? req.body?.code

    if (!code) {
        return res.status(400).json({ message: 'Google authorization code is required' })
    }

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
            { expiresIn: process.env.JWT_TIMEOUT || '1h' }
        );

        return res.status(200).json({
            message: "Google login successful",
            accessToken,
            user
        });

      

    } catch (error) {
        console.error('Google login failed:', error.message)

        return res.status(500).json({
            message: "Internal Server Error"
        });

    }
};
