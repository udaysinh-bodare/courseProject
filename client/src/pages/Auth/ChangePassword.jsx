import React from "react";
import bg from "../../assets/background.png";
import { useState } from "react";
import { changePassword } from "../../services/studentServices";
import { toast } from "react-toastify";

 function ChangePassword() {
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    async function changepassf(newpassword, confirmpassword) {
        // Add your change password logic here
        console.log("Changing password to:", newpassword);
        console.log("Confirming password:", confirmpassword);
        if (!newpassword || !confirmpassword) {
            toast.error("Please fill all the fields");
            return;
        }
        if (newpassword !== confirmpassword) {
            toast.error("Passwords do not match");
            return;
        }
        const response = await changePassword(newpassword);
        console.log(response);
        if (response.status === 200) {
            toast.success("Password changed successfully");
        } else {
            toast.error("Failed to change password");
        }   

    }

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat 
                 flex items-center justify-center px-4"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div
                className="w-full max-w-md bg-white/20 backdrop-blur-md 
                   rounded-xl shadow-lg p-8"
            >
                <h1 className="text-center font-bold text-3xl mb-8 text-gray-800">
                    Change Password
                </h1>

                {/* New Password */}
                <div className="mb-5">
                    <label className="block text-blue-700 font-medium mb-1">
                        New Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full p-2 rounded-md border border-gray-300 bg-white/60
                       focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                {/* Confirm Password */}
                <div className="mb-8">
                    <label className="block text-blue-700 font-medium mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full p-2 rounded-md border border-gray-300 bg-white/60
                       focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* Button */}
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md
                     transition-all duration-300
                     hover:bg-blue-600 hover:scale-[1.02]
                     active:scale-95" onClick={() => changepassf(newpassword, confirmpassword)}
                >
                    Change Password
                </button>
            </div>
        </div>
    );
}

export default ChangePassword;
