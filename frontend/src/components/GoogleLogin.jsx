import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../api/api';
import { useNavigate } from 'react-router';


const GoogleLogin = () => {
    const navigate = useNavigate();
    const responseGoogle = async (authResult) => {
        try {
        if (authResult["code"]) {

    const result = await googleAuth(authResult.code);

    const { email, name, image } = result.data.user;

    const token = result.data.accessToken;

    const obj = {
        email,
        name,
        token,
        image
    };

    localStorage.setItem('user-info', JSON.stringify(obj));
    navigate('/dashboard');

} else {

    console.log(authResult);

    throw new Error(authResult);

}
        } catch (err) {
            console.log(err)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code"
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <button
                onClick={googleLogin}
                className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            >
                Google Login
            </button>
        </div>
    );
};

export default GoogleLogin;
