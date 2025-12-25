import React from "react";
import bg from "../../assets/background.png";
import heroImg from "../../assets/hero.png";
import studentsImg from "../../assets/students.png";

function Landing() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Navbar */}
      <div className="h-[70px] flex items-center px-10">
        Navbar Here
      </div>

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center px-10 pt-6 gap-10">
        
        {/* LEFT — Tagline */}
        <div className="md:w-1/2 flex flex-col gap-5">
          <h1 className="text-4xl font-semibold text-blue-950 leading-tight">
            Upgrade Your Skills <br /> With Our Training Programs
          </h1>

          <p className="text-lg text-blue-900/90">
            Professional courses with live mentoring <br />
            and real-world projects.
          </p>

          <div className="flex gap-4 mt-1">
            <button className="px-7 py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-emerald-400 to-teal-500 shadow-lg
              hover:shadow-emerald-400/60 hover:-translate-y-0.5 transition">
              Enroll Now
            </button>

            <button className="px-7 py-3 rounded-full font-semibold
              bg-white/80 backdrop-blur border shadow-md
              hover:-translate-y-0.5 hover:shadow-lg transition">
              View Courses
            </button>
          </div>
        </div>

        {/* RIGHT — Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={heroImg}
            alt="Training Illustration"
            className="w-[520px] max-w-full drop-shadow-2xl"
          />
        </div>
      </section>

      {/* STATS CARDS */}
      <section className="flex flex-wrap justify-center gap-6 mt-10 px-10">
        {[
          { v: "10,000+", l: "Students Trained", icon: "🎓" },
          { v: "120+", l: "Courses", icon: "📘" },
          { v: "50+", l: "Certified Trainers", icon: "🥇" },
          { v: "98%", l: "Success Rate", icon: "🏆" },
        ].map((i) => (
          <div key={i.l}
            className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl
                       px-6 py-4 w-[180px] text-center">
            <div className="text-3xl">{i.icon}</div>
            <h2 className="text-xl font-bold">{i.v}</h2>
            <p className="text-sm text-gray-600">{i.l}</p>
          </div>
        ))}
      </section>

      {/* LIVE COURSES */}
      <section className="mt-12 px-10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Live Courses
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Full-Stack Development",
              duration: "Live • 6 Months • Certification",
              btn: "View Details",
            },
            {
              title: "Data Science",
              duration: "Live • 4 Months • Certification",
              btn: "View Details",
            },
            {
              title: "Digital Marketing",
              duration: "Live • 3 Months • Certification",
              btn: "View Details",
            },
          ].map((c) => (
            <div key={c.title}
              className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-4">
              <div className="h-[140px] bg-blue-200/30 rounded-xl" />
              <h3 className="font-semibold mt-3">{c.title}</h3>
              <p className="text-sm text-gray-600">{c.duration}</p>

              <button className="mt-3 w-full py-2 rounded-xl
                bg-gradient-to-r from-teal-400 to-green-500
                text-white font-semibold shadow-md">
                {c.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mt-16 px-10 pb-16">
        <div className="bg-white/80 backdrop-blur shadow-xl rounded-3xl p-8 flex flex-col md:flex-row gap-6">

          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>

            <ul className="space-y-2 text-gray-700">
              <li>✔ Industry-oriented curriculum</li>
              <li>✔ Hands-on project experience</li>
              <li>✔ Placement assistance</li>
              <li>✔ Certificates of completion</li>
            </ul>

            <button className="mt-6 px-6 py-3 rounded-full font-semibold
              bg-gradient-to-r from-emerald-400 to-teal-500
              text-white shadow-lg">
              Get Started
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img src={studentsImg} className="rounded-2xl w-full max-w-[460px]" />
          </div>

        </div>
      </section>
    </div>
  );
}

export default Landing;
