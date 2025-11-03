import React from "react";
import hire from "../assets/hire.png";
import banner from "../assets/banner.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import CompaniesShowing from "./CompaniesShowing";
import questions from "../data/questions.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const LandingP = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white py-6 px-4 sm:px-6">
      <div className="text-center w-full max-w-7xl">
        {/* ✅ HERO SECTION */}
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text leading-tight">
              Find Your Dream Job
            </h1>

            <img src={hire} alt="Hire Icon" className="h-10 sm:h-12 md:h-14" />
          </div>

          <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
            Explore limitless career opportunities, connect with top employers,
            and take the next big step in your professional journey.
          </p>

          {/* ✅ ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/jobs">
              <Button className="text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-xl shadow-md hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto">
                Browse Jobs
              </Button>
            </Link>

            <Link to="/postjob">
              <Button className="text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 rounded-xl shadow-md hover:scale-105 bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>

        {/* ✅ COMPANIES LOGO SLIDER */}
        <CompaniesShowing />

        {/* ✅ BANNER SIDE-BY-SIDE SECTION */}
        <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-10 max-w-6xl mx-auto">
          {/* Text */}
          <div className="lg:w-1/2 text-center lg:text-left px-2">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Start Your Career Journey Today
            </h2>
            <p className="text-gray-300 text-base md:text-lg mt-4">
              Unlock your potential by finding the perfect job that matches your
              skills and passion. Browse thousands of opportunities from top
              companies worldwide.
            </p>

            <div className="mt-6">
              <Link to="/jobs">
                <Button className="text-base md:text-lg px-6 py-4 rounded-lg shadow-md hover:scale-105 bg-green-500 hover:bg-green-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={banner}
              alt="Career Opportunities"
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
        </div>

        {/* ✅ JOB SEEKER / RECRUITER CARDS */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-2">
          <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold text-blue-400">
              For Job Seekers
            </h3>
            <p className="text-gray-300 mt-4 text-base sm:text-lg">
              Search and apply for jobs, track applications, and more.
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold text-red-400">
              For Employers & Recruiters
            </h3>
            <p className="text-gray-300 mt-4 text-base sm:text-lg">
              Post jobs, manage applications, and find the best candidates.
            </p>
          </div>
        </div>

        {/* ✅ FAQ ACCORDION (RESPONSIVE WIDTH) */}
        <div className="w-full max-w-5xl mx-auto mt-14">
          <Accordion
            type="single"
            collapsible
            className="px-2 sm:px-6 md:px-10"
          >
            {questions.map(({ question, answer }, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base sm:text-lg">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default LandingP;
