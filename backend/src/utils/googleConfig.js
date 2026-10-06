import { google } from "googleapis";
import 'dotenv/config'

const config = process.env


export const oauth2Client = new google.auth.OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_CLIENT_SECRET,
    "postmessage"
);
