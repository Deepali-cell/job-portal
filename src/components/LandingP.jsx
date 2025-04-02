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
    <div className="flex flex-col items-center justify-center text-white py-4">
      <div className="text-center shadow-xl rounded-2xl">
        <div className="mb-6 flex justify-center items-center gap-4">
          <h1 className="text-7xl font-extrabold tracking-wide leading-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text whitespace-nowrap">
            Find Your Dream Job
          </h1>
          <img src={hire} alt="Logo" className="h-14 w-auto" />
        </div>
        <p className="text-gray-200 text-2xl font-light leading-relaxed mb-8">
          Explore limitless career opportunities, connect with top employers,
          and take the next big step in your professional journey.
        </p>
        <div className="flex justify-center gap-6 pt-10">
          <Link to="/jobs">
            <Button className="text-lg font-medium px-8 py-6 rounded-xl shadow-md transition-transform transform hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white">
              Browse Jobs
            </Button>
          </Link>
          <Link to="/postjob">
            <Button className="text-lg font-medium px-8 py-6 rounded-xl shadow-md transition-transform transform hover:scale-105 bg-red-500 hover:bg-red-600 text-white">
              Post a Job
            </Button>
          </Link>
        </div>
        <CompaniesShowing />

        {/* Banner Section with Text & Image Side by Side */}
        <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6">
          {/* Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold leading-tight text-white">
              Start Your Career Journey Today
            </h2>
            <p className="text-gray-300 text-lg mt-4">
              Unlock your potential by finding the perfect job that matches your
              skills and passion. Browse thousands of opportunities from top
              companies worldwide.
            </p>
            <div className="mt-6">
              <Link to="/jobs">
                <Button className="text-lg font-medium px-6 py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-green-500 hover:bg-green-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={banner}
              alt="Career Opportunities"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Job Seeker & Employer Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto px-6">
          {/* Card for Job Seekers */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <h3 className="text-3xl font-semibold text-blue-400">
              For Job Seekers
            </h3>
            <p className="text-gray-300 mt-4 text-lg">
              Search and apply for jobs, track applications, and more.
            </p>
          </div>

          {/* Card for Employers/Recruiters */}
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
            <h3 className="text-3xl font-semibold text-red-400">
              For Employers & Recruiters
            </h3>
            <p className="text-gray-300 mt-4 text-lg">
              Post jobs, manage applications, and find the best candidates.
            </p>
          </div>
        </div>
        <Accordion type="single" collapsible className="px-[150px] pt-10">
          {questions.map(({ question, answer }, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="w-full"
            >
              <AccordionTrigger className="w-full text-left">
                {question}
              </AccordionTrigger>
              <AccordionContent className="w-full">{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default LandingP;
