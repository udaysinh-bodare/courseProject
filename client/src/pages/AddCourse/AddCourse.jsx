import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import bg from "../../assets/background.png";
import Navbar from "../../components/Navbar";

function AddCourse() {
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 800);
		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return (
			<div className="h-screen w-full bg-gradient-to-br from-blue-500 to-sky-200 flex items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<div className="w-12 h-12 border-4 border-white/50 border-t-teal-400 rounded-full animate-spin" />
					<p className="text-white/90 font-medium tracking-wide">
						Loading experience…
					</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className="min-h-screen w-full bg-cover bg-no-repeat bg-center relative"
			style={{ backgroundImage: `url(${bg})` }}
		>  

            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/40 pointer-events-none" />

            {/* {Navbar} */}
            <Navbar />

            


        </div>
	);
}

export default AddCourse;
