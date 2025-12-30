import React, { useState } from "react";
import c1 from "../../assets/c1.png";
import background from "../../assets/background.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { sendemailsys } from "../../services/studentServices";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function sendemail(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    try {
      const response = await sendemailsys(name, email, message);
      console.log(response);
      toast.success("Email sent successfully ✅");

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Email not sent ❌");
    }
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />

      <div className="flex items-center justify-center px-4 mt-10">
        <div
          className="max-w-6xl w-full bg-white/20 backdrop-blur-md
                     rounded-2xl shadow-xl p-10 grid md:grid-cols-2
                     gap-10 items-center"
        >
          {/* Left Side */}
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-700 mb-8">
              Have questions or need help? Fill out the form and we’ll get back to you.
            </p>

            <form className="space-y-5" onSubmit={sendemail}>
              {/* Name */}
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded-md bg-white/40
                             border border-gray-300
                             hover:border-blue-500
                             focus:border-blue-500
                             focus:ring-2 focus:ring-blue-400
                             outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-md bg-white/40
                             border border-gray-300
                             hover:border-blue-500
                             focus:border-blue-500
                             focus:ring-2 focus:ring-blue-400
                             outline-none transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 rounded-md bg-white/40
                             border border-gray-300
                             hover:border-blue-500
                             focus:border-blue-500
                             focus:ring-2 focus:ring-blue-400
                             outline-none transition"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2
                           rounded-full hover:bg-blue-600
                           transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side Image */}
          <div className="flex justify-center">
            <img src={c1} alt="Contact" className="w-full max-w-md" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;
