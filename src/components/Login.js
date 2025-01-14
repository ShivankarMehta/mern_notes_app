import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_USER = process.env.REACT_APP_API_USER;
function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         await axios.post(`${API_USER}/user/login`, formData, {
    //             withCredentials: true, 
    //             headers: {
    //                 "Content-Type": "application/json", // Ensure correct headers
    //             },
    //         });
    //         navigate('/noteslist');
    //     } catch (error) {
    //         console.error('Error logging in:', error);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            console.log("API Endpoint:", `${API_USER}/user/login`);
            console.log("Request Payload:", formData);
    
            const response = await axios.post(`${API_USER}/user/login`, formData, {
                withCredentials: true, // Ensures cookies are sent if the backend uses them
                headers: {
                    "Content-Type": "application/json", // Ensure correct headers
                },
            });
    
            console.log("Login Success:", response.data);
            navigate('/noteslist');
        } catch (error) {
            if (error.response) {
                console.error("Error Response Data:", error.response.data); // Logs error details from the backend
                console.error("Error Response Status:", error.response.status); // Logs the status code
            } else if (error.request) {
                console.error("No Response Received:", error.request); // Logs the request if no response was received
            } else {
                console.error("Error Message:", error.message); // Logs any other errors
            }
        }
    };
    

    return (
        <div className="font-[sans-serif] md:h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                {/* Form Section */}
                <div className="flex items-center p-6 h-full w-full">
                    <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
                        <div className="mb-12">
                            <h3 className="text-[#008080] md:text-3xl text-2xl font-extrabold max-md:text-center">
                                Log In
                            </h3>
                        </div>
                        <div>
                            <label className="text-[var(--text-color)] text-xs block mb-2">Email</label>
                            <div className="relative flex items-center">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    required
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2"
                                    viewBox="0 0 682.667 682.667"
                                >
                                    <defs>
                                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                            <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                        </clipPath>
                                    </defs>
                                    <g
                                        clipPath="url(#a)"
                                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                                    >
                                        <path
                                            fill="none"
                                            strokeMiterlimit="10"
                                            strokeWidth="40"
                                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                            data-original="#000000"
                                        ></path>
                                        <path
                                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                                            data-original="#000000"
                                        ></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="mt-6">
                            <label className="text-[var(--text-color)] text-xs block mb-2">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    required
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                    viewBox="0 0 128 128"
                                    onClick={togglePasswordVisibility}
                                >
                                    <path
                                        d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                                        data-original="#000000"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                        <div className="mt-12">
                            <button
                                type="submit"
                                className="w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md bg-[#61B5B9] hover:bg-[#005A57] text-white focus:outline-none"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>

                {/* Image Section */}
                <div className="max-md:order-1 p-4 bg-[var(--bg-color)] h-full">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
                        alt="login-image"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
