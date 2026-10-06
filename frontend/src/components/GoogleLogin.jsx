import { useGoogleLogin } from '@react-oauth/google';


const GoogleLogin = () => {
    const responseGoogle = async (authResult) => {
        try {
            console.log(authResult)
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