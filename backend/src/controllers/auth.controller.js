import axios from 'axios'
import jwt from 'jsonwebtoken'
import { oauth2Client } from '../utils/googleConfig.js'
import User from '../models/userModel.js'


export const googleLogin = async (req, res) => {
    const code = req.query.code ?? req.body?.code //agar query me na mile to body me code check kro

    if (!code) {
        return res.status(400).json({ message: 'Google authorization code is required' })
    }

    try {
        //GOOGLE SE MILE TOKENS SAVE KARNA
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        //GOOGLE SE USER KI INFORMATION LENA
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;


//DATABASE MEIN USER SEARCH KARNA EMAIL BASES PR
        let user = await User.findOne({ email });

        if (!user) {
//AGAR USER DATABASE MEIN NAHI HAI TO CREATE KRENGE
            user = await User.create({
                name,
                email,
                image: picture
            });

        } else if (picture && user.image !== picture) {
            // Har login par Google ka current profile image save karein
            user.image = picture;
            await user.save();
        }


//Token KI SIGN KARNE
      const accessToken = jwt.sign(

    // TOKEN KE ANDAR KYA DATA RAKHNA HAI
    {
        id: user._id,
        email: user.email
    },

    // TOKEN KO SIGN KARNE KI SECRET KEY
    process.env.JWT_SECRET,

    // TOKEN KITNI DER VALID RAHEGA
    {
        expiresIn: process.env.JWT_TIMEOUT || '1h'
    }
);

        // FRONTEND KO RESPONSE BHEJNA
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
