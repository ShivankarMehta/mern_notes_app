import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../Theme/ThemeContext"; // Import ThemeContext

function Signup() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const { theme } = useTheme(); // Access the current theme
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/user/signup", formData);
            navigate("/login");
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className={`font-[sans-serif] md:h-screen bg-[var(--bg-color)] text-[var(--text-color)]`}>
            <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                {/* Image Section */}
                <div className="max-md:order-1 p-4 bg-[var(--bg-color)] h-full">
                    <img
                        src="https://readymadeui.com/signin-image.webp"
                        className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
                        alt="login-image"
                    />
                </div>

                {/* Form Section */}
                <div className="flex items-center p-6 h-full w-full">
                    <form onSubmit={handleSubmit} className="max-w-lg w-full mx-auto">
                        <div className="mb-12">
                            <h3 className="text-[#008080] md:text-3xl text-2xl font-extrabold max-md:text-center">
                                Create an account
                            </h3>
                        </div>

                        <div>
                            <label className="text-[var(--text-color)] text-xs block mb-2">UserName</label>
                            <div className="relative flex item-center">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter Username"
                                    onChange={handleChange}
                                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                                    required
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="var(--text-color)"
                                    stroke="var(--text-color)"
                                    className="w-[18px] h-[18px] absolute right-2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="10" cy="7" r="6" />
                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>

                        <div className="mt-6">
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
                                    fill="var(--text-color)"
                                    stroke="var(--text-color)"
                                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                                    viewBox="0 0 128 128"
                                    onClick={togglePasswordVisibility}
                                >
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center mt-6">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 shrink-0 rounded"
                                required
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-3 block text-sm text-[var(--text-color)]"
                            >
                                I accept the{" "}
                                <a
                                    href="javascript:void(0);"
                                    className="text-blue-500 font-semibold hover:underline ml-1"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>

                        <div className="mt-12">
                            <button
                                type="submit"
                                className="w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md bg-[#61B5B9] hover:bg-[#005A57] text-white focus:outline-none"
                            >
                                Sign Up
                            </button>
                            <p className="text-sm mt-6 text-[var(--text-color)]">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="text-blue-500 font-semibold hover:underline ml-1"
                                >
                                    Login here
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
