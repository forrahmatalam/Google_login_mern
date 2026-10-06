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

        <div className="flex flex-col items-center justify-center h-screen">

            <h1>
                Welcome {userInfo.name}
            </h1>

            <img
                src={userInfo.image}
                alt="user-image"
                className="w-24 h-24 rounded-full"
            />

            <p>
                Your email is {userInfo.email}
            </p>

            <p>
                Your token is {userInfo.token}
            </p>

            <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={logout}
            >
                Logout
            </button>

        </div>

    );

};


export default Dashboard;
