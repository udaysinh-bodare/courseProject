import React from "react";
import c1 from "../../assets/c1.png";
import background from "../../assets/background.png";
import Navbar from "../../components/Navbar";

function ContactUs() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Content Wrapper */}
      <div className="flex items-center justify-center px-4 mt-10">
        <div
          className="max-w-6xl w-full bg-white/20 backdrop-blur-md
                     rounded-2xl shadow-xl p-10 grid md:grid-cols-2 gap-10 items-center"
        >
          {/* Left Side – Form */}
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-700 mb-8">
              Have questions or need help?
              Fill out the form and we’ll get back to you shortly.
            </p>

            <form className="space-y-5">
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 rounded-md border border-gray-300 bg-white/60
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 rounded-md border border-gray-300 bg-white/60
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full p-2 rounded-md border border-gray-300 bg-white/60
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded-full
                           hover:bg-blue-600 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side – Image */}
          <div className="flex justify-center">
            <img
              src={c1}
              alt="Contact illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
