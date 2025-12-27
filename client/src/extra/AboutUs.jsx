import React from "react";
import bg from "../assets/background.png";
import coursebg from "../assets/about.png";
import Navbar from "../components/Navbar";

function AboutUs() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between mt-16 px-6 gap-10">
        <div className="md:w-1/2 text-left">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            About Skill Katta
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Skill Katta is a modern learning platform focused on
            <span className="font-semibold"> industry-ready skills</span>.
            We provide live training, real-world projects, and expert mentoring
            to help students build successful careers.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <img
            src={coursebg}
            alt="About illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto mt-20 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "10,000+", desc: "Students Trained" },
            { title: "120+", desc: "Courses" },
            { title: "50+", desc: "Expert Trainers" },
            { title: "98%", desc: "Success Rate" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/40 backdrop-blur-md rounded-xl p-6 text-center shadow-md"
            >
              <h2 className="text-2xl font-bold text-blue-700">
                {item.title}
              </h2>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Values Section */}
      <div className="max-w-6xl mx-auto mt-24 px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Our Values
          </h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li>✔ Industry-oriented curriculum</li>
            <li>✔ Hands-on real-world projects</li>
            <li>✔ Live mentoring & doubt solving</li>
            <li>✔ Career guidance & placement support</li>
            <li>✔ Certificates of completion</li>
          </ul>
        </div>

        <div className="flex justify-center ">
          <img
            src={coursebg}
            alt="Values illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>

      {/* Call To Action */}
      <div className="mt-24 bg-gradient-to-r from-blue-600 to-cyan-500 py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Learning Journey Today
          </h2>
          <p className="text-white/90 mb-8">
            Join thousands of learners and upgrade your skills with expert-led
            training programs.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Skill Katta. All rights reserved.
      </div>
    </div>
  );
}

export default AboutUs;
