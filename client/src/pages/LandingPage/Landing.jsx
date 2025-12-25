import React, { useState, useEffect } from "react";
import bg from "../../assets/background.png";
import heroImg from "../../assets/hero.png";
import studentsImg from "../../assets/students.png";
import Navbar from "../../components/Navbar";

function Landing() {
  const [loading, setLoading] = useState(true);

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

      <div className="relative max-w-7xl mx-auto ">

        {/* NAVBAR */}
          <Navbar/>

        {/* HERO */}
        <section className="flex flex-col md:flex-row items-center px-10 pt-6 gap-10">

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
                hover:shadow-emerald-400/60 hover:-translate-y-0.5 transition-all">
                Enroll Now
              </button>

              <button className="px-7 py-3 rounded-full font-semibold
                bg-white/80 backdrop-blur border shadow-md
                hover:-translate-y-0.5 hover:shadow-lg transition-all">
                View Courses
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src={heroImg}
              alt="Training Illustration"
              className="w-[520px] max-w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
            />
          </div>
        </section>

        {/* STATS */}
        <section className="flex flex-wrap justify-center gap-6 mt-10 px-10">
          {[
            { v: "10,000+", l: "Students Trained", icon: "🎓" },
            { v: "120+",   l: "Courses",            icon: "📘" },
            { v: "50+",    l: "Certified Trainers", icon: "🥇" },
            { v: "98%",    l: "Success Rate",       icon: "🏆" },
          ].map((i) => (
            <div key={i.l}
              className="bg-white/85 backdrop-blur-lg shadow-xl rounded-2xl border border-white/50
                         px-6 py-4 w-[180px] text-center
                         hover:-translate-y-1 hover:shadow-2xl transition-all">
              <div className="text-3xl">{i.icon}</div>
              <h2 className="text-xl font-bold">{i.v}</h2>
              <p className="text-sm text-gray-600">{i.l}</p>
            </div>
          ))}
        </section>

        {/* LIVE COURSES — CAROUSEL */}
        <section className="mt-12 px-10">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Live Courses
          </h2>

          <CourseCarousel />
        </section>

        {/* WHY CHOOSE US */}
        <section className="mt-16 px-10 pb-16">
          <div className="bg-white/85 backdrop-blur-lg shadow-xl rounded-3xl p-8
                          flex flex-col md:flex-row gap-6 border border-white/50">

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
                text-white shadow-lg hover:shadow-emerald-400/60 transition-all">
                Get Started
              </button>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src={studentsImg}
                alt="Students"
                className="rounded-2xl w-full max-w-[460px] drop-shadow-lg"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}



function CourseCarousel() {
  const courses = [
    { title: "Full-Stack Development", duration: "Live • 6 Months • Certification" },
    { title: "Data Science", duration: "Live • 4 Months • Certification" },
    { title: "Digital Marketing", duration: "Live • 3 Months • Certification" },
    { title: "UI / UX Designing", duration: "Live • 5 Months • Certification" },
  ];

  const getCardsPerView = () =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);
  const [paused, setPaused] = useState(false);
  const trackRef = React.useRef(null);
  const posRef = React.useRef(0);

  useEffect(() => {
    const handler = () => setCardsPerView(getCardsPerView());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const looped = [...courses, ...courses];

  const speed = 2.3;

  useEffect(() => {
    let frame;

    const animate = () => {
      if (!paused && trackRef.current) {
        posRef.current -= speed;

        const track = trackRef.current;
        const width = track.scrollWidth / 2; 

        if (Math.abs(posRef.current) >= width) {
          posRef.current = 0;
        }

        track.style.transform = `translateX(${posRef.current}px)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  return (
    <div
      className="relative max-w-6xl mx-auto overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform"
      >
        {looped.map((c, i) => (
          <div
            key={i}
            className="flex-none px-3"
            style={{ width: `${100 / cardsPerView}%` }}
          >
            <div className="bg-white/80 backdrop-blur shadow-lg rounded-2xl p-4
                            hover:-translate-y-1 hover:shadow-2xl transition-all">
              <div className="h-[140px] bg-blue-200/30 rounded-xl" />
              <h3 className="font-semibold mt-3">{c.title}</h3>
              <p className="text-sm text-gray-600">{c.duration}</p>

              <button className="mt-3 w-full py-2 rounded-xl
                bg-gradient-to-r from-teal-400 to-green-500
                text-white font-semibold shadow-md">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




export default Landing;
