import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import bg from "../../assets/background.png";

function PrivacyPolicy() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <Navbar />

        <div className="px-4 py-10">
          <h1 className="text-3xl font-semibold text-blue-950 mb-6">
            Privacy Policy
          </h1>

          <div className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-6 md:p-8 space-y-6 text-slate-700 leading-relaxed">
            
            <p>
              Your privacy is important to us. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use
              our platform and services.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <span className="font-medium">Personal Data:</span> Name, email
                  address, contact details, and information you voluntarily provide.
                </li>
                <li>
                  <span className="font-medium">Usage Data:</span> Pages visited,
                  actions taken, and device / browser information.
                </li>
                <li>
                  <span className="font-medium">Cookies:</span> Used to improve
                  performance, analytics, and user experience.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To operate and improve our services and platform.</li>
                <li>To communicate updates, notifications, and support messages.</li>
                <li>To enhance security and prevent fraudulent activity.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Disclosure of Information
              </h2>
              <p>
                We do not sell or trade your personal information. Data may only be
                shared with trusted partners or authorities when required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Data Security
              </h2>
              <p>
                We implement reasonable technical and organizational measures to
                protect your data. However, no internet transmission is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Your Rights
              </h2>
              <p>
                You may request access, correction, or deletion of your personal
                data by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact
                us through the support section of our platform.
              </p>
            </section>
          </div>

          <div className="mt-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
