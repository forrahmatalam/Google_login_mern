import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {

    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(
            localStorage.getItem("user-info")
        );

        setUserInfo(userInfo);

    }, []);


    const logout = () => {

        localStorage.removeItem("user-info");

        navigate("/");

    };


    if (!userInfo) {
        return <div>Loading...</div>;
    }


    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 text-center">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Welcome {userInfo.name}
                </h1>

                {userInfo.image && (
                    <img
                        src={userInfo.image}
                        alt="user-image"
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 rounded-full mx-auto mb-5 object-cover"
                    />
                )}

                <p className="text-gray-600 mb-3">
                    Your email is{" "}
                    <span className="font-medium text-gray-800">
                        {userInfo.email}
                    </span>
                </p>

                <div className="bg-gray-100 rounded-lg p-3 mb-6 text-left">
                    <p className="text-sm text-gray-500 mb-1">
                        Your token
                    </p>

                    <p className="text-sm text-gray-700 break-all">
                        {userInfo.token}
                    </p>
                </div>

                <button
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>

    );

};

export default Dashboard;
