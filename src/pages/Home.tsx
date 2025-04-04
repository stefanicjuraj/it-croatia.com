import { Link } from "react-router-dom";
// Components
import Badge from "../components/Badge";
import Footer from "../components/Footer";
// Utils
import { useTheme } from "../utils/Theme";
// Icons
import company from "/assets/icons/company.svg";
import conference from "/assets/icons/conference.svg";
import internship from "/assets/icons/internship.svg";
import education from "/assets/icons/education.svg";
import certificate from "/assets/icons/certificate.svg";
import podcast from "/assets/icons/podcast.svg";
import arrow from "/assets/icons/arrow.svg";
import community from "/assets/icons/community.svg";
import placesToWork from "/assets/icons/places-to-work.svg";
import dictionary from "/assets/icons/dictionary.svg";
// Images
import image from "/assets/images/cro-it.png";
import redditImage from "/assets/images/reddit-image.png";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, themeClasses } = useTheme();
  const style = themeClasses(theme);
  const [currentItem, setCurrentItem] = useState(0);

  const items = [
    "companies",
    "conferences",
    "education",
    "certificates",
    "communities",
    "places to work",
    "podcasts",
    "internships",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentItem((prevItem) => (prevItem + 1) % items.length);
    }, 900);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`${style.backgroundBody}`}>
      <section className={`mx-auto pt-40 ${style.text} max-w-screen-xl`}>
        <div className="px-4 py-4 mb-8 text-center animation glow delay-1">
          <h1
            className={`mb-12 font-bold text-center ${style.headingH1} text-7xl`}
          >
            IT Croatia
          </h1>
          <p className="w-full mx-auto text-2xl text-center sm:w-4/5 sm:text-2xl">
            Explore a collection of IT
            <span className={`${style.headingH1} mx-2`}>
              {items[currentItem]}
            </span>
            in Croatia
          </p>
        </div>
        <Badge />
        <section className="px-8 py-8 space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-16 md:space-y-0">
          <Link to="/companies">
            <div
              className={`${style.background} sm:mb-0 mb-8 px-6 py-6 rounded-xl hover:ring-1 hover:ring-indigo-300 animation glow delay-2`}
            >
              <div
                className={`flex justify-center items-center mb-4 w-16 h-16 rounded-full ${style.backgroundBody}`}
              >
                <img src={company} alt="Company icon" className="w-8 h-8" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Companies</h1>
              <p className={`${style.text}`}>
                View companies conducting business operations, providing
                services, or offering consultancy in Croatia.
              </p>
              <div className="flex flex-row-reverse px-1 py-1">
                <img src={arrow} className="w-8 h-8" alt="arrow" />
              </div>
            </div>
          </Link>
          <Link to="/conferences">
            <div
              className={`${style.background} sm:mb-0 mb-8 px-6 py-6 rounded-xl hover:ring-1 hover:ring-indigo-300 animation glow delay-3`}
            >
              <div
                className={`flex justify-center items-center mb-4 w-16 h-16 rounded-full ${style.backgroundBody}`}
              >
                <img src={conference} alt="Company icon" className="w-8 h-8" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Conferences</h1>
              <p className={`${style.text}`}>
                Attend conferences and presentations with industry knowledge
                professionals and enthusiasts.
              </p>
              <div className="flex flex-row-reverse px-1 py-1">
                <img src={arrow} className="w-8 h-8" alt="arrow" />
              </div>
            </div>
          </Link>
          <Link to="/education">
            <div
              className={`${style.background} sm:mb-0 mb-8 px-6 py-6 rounded-xl hover:ring-1 hover:ring-indigo-300 animation glow delay-4`}
            >
              <div
                className={`flex justify-center items-center mb-4 w-16 h-16 rounded-full ${style.backgroundBody}`}
              >
                <img src={education} alt="Company icon" className="w-8 h-8" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Education</h1>
              <p className={`${style.text}`}>
                Enroll into colleges, courses, lectures, and classes to learn
                more about IT and software development.
              </p>
              <div className="flex flex-row-reverse px-1 py-1">
                <img src={arrow} className="w-8 h-8" alt="arrow" />
              </div>
            </div>
          </Link>
          <Link to="/certificates">
            <div
              className={`${style.background} sm:mb-0 mb-8 px-6 py-6 rounded-xl hover:ring-1 hover:ring-indigo-300 animation glow delay-5`}
            >
              <div
                className={`flex justify-center items-center mb-4 w-16 h-16 rounded-full ${style.backgroundBody}`}
              >
                <img src={certificate} alt="Company icon" className="w-8 h-8" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Certificates</h1>
              <p className={`${style.text}`}>
                Search for the certifications to master and demonstrate your
                professional knowledge and skills.
              </p>
              <div className="flex flex-row-reverse px-1 py-1">
                <img src={arrow} className="w-8 h-8" alt="arrow" />
              </div>
            </div>
          </Link>
          <Link to="/communities">
            <div
              className={`${style.background} sm:mb-0 mb-8 px-6 py-6 rounded-xl hover:ring-1 hover:ring-indigo-300 animation glow delay-6`}
            >
              <div
                className={`flex justify-center items-center mb-4 w-16 h-16 rounded-full ${style.backgroundBody}`}
              >
                <img src={community} alt="Company icon" className="w-8 h-8" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Communities</h1>
              <p className={`${style.text}`}>
                Find communities and groups to connect and network with other IT
                professionals and enthusiasts.
              </p>
              <div className="flex flex-row-reverse px-1 py-1">
                <img src={arrow} className="w-8 h-8" alt="arrow" />
              </div>
            </div>
          </Link>
          <Link to="/places-to-work">
            <div
              className={`${style.background} sm:mb-0 mb-8 px-6 py-6 rounded-xl hover:ring-1 hover:ring-indigo-300 animation glow delay-7`}
            >
              <div
                className={`flex justify-center items-center mb-4 w-16 h-16 rounded-full ${style.backgroundBody}`}
              >
                <img
                  src={placesToWork}
                  alt="Places to Work icon"
                  className="w-8 h-8"
                />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Places to Work</h1>
              <p className={`${style.text}`}>
                A collection of places to visit and work in the best coffee
                shops, bars, and co-working places in Croatia.
              </p>
              <div className="flex flex-row-reverse px-1 py-1">
                <img src={arrow} className="w-8 h-8" alt="arrow" />
              </div>
            </div>
          </Link>
          <Link to="/podcasts">
            <div
              className={`${style.background} sm:mb-0 mb-8 px-6 py-6 rounded-xl hover:ring-1 hover:ring-indigo-300 animation glow delay-8`}
            >
              <div
                className={`flex justify-center items-center mb-4 w-16 h-16 rounded-full ${style.backgroundBody}`}
              >
                <img src={podcast} alt="Company icon" className="w-8 h-8" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Podcasts</h1>
              <p className={`${style.text}`}>
                Listen to podcasts and interviews about IT related topics with
                industry professionals and enthusiasts.
              </p>
              <div className="flex flex-row-reverse px-1 py-1">
                <img src={arrow} className="w-8 h-8" alt="arrow" />
              </div>
            </div>
          </Link>
          <Link to="/internships">
            <div
              className={`${style.background} sm:mb-0 mb-8 px-6 py-6 rounded-xl hover:ring-1 hover:ring-indigo-300 animation glow delay-9`}
            >
              <div
                className={`flex justify-center items-center mb-4 w-16 h-16 rounded-full ${style.backgroundBody}`}
              >
                <img src={internship} alt="Company icon" className="w-8 h-8" />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Internships</h1>
              <p className={`${style.text}`}>
                Start your career and enhance your professional knowledge by
                applying to internship programs.
              </p>
              <div className="flex flex-row-reverse px-1 py-1">
                <img src={arrow} className="w-8 h-8" alt="arrow" />
              </div>
            </div>
          </Link>
          <Link to="/dictionary">
            <div
              className={`${style.background} sm:mb-0 mb-8 px-6 py-6 rounded-xl hover:ring-1 hover:ring-indigo-300 animation glow delay-9`}
            >
              <div
                className={`flex justify-center items-center mb-4 w-16 h-16 rounded-full ${style.backgroundBody}`}
              >
                <img
                  src={dictionary}
                  alt="Dictionary icon"
                  className="w-8 h-8"
                />
              </div>
              <h1 className="mb-2 text-2xl font-bold">Dictionary</h1>
              <p className={`${style.text}`}>
                View a collection of IT words, terms, phrases, and definitions
                translated from English to Croatian language.
              </p>
              <div className="flex flex-row-reverse px-1 py-1">
                <img src={arrow} className="w-7 h-7" alt="arrow" />
              </div>
            </div>
          </Link>
        </section>
        <div
          className={`px-4 py-4 mt-24 mb-24 text-center ${style.headingH1} animation glow delay-8`}
        >
          <h2 className="mb-4 text-5xl font-bold">By popular demand</h2>
          <h3 className="text-2xl italic font-normal">
            You asked. We answered.
          </h3>
          <img
            src={image}
            className="w-full mx-auto mt-16 mb-32 shadow-sm sm:w-2/3 rounded-xl"
          ></img>
          <h2 className="mb-4 text-5xl font-bold">The launch</h2>
          <h3 className="text-2xl italic font-normal">
            View the launch post and join the discussion!
          </h3>
          <a
            href="https://www.reddit.com/r/CroIT/comments/1bfba43/kolekcija_it_kompanija_konferencija_edukacija/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={redditImage}
              className="w-full mx-auto mt-16 mb-16 shadow-md sm:w-1/3 rounded-xl hover:border-2 hover:border-indigo-500"
            ></img>
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
