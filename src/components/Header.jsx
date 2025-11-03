import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

export const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <header className="py-3 sm:py-4 shadow-md  sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto w-full px-4 flex justify-between items-center">
        {/* ✅ Logo fully responsive */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-12 xs:h-14 sm:h-16 md:h-20 w-auto transition-all"
          />
        </Link>

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* ✅ Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/postjob">
                <Button className="text-base px-5 py-2 rounded-xl shadow-sm bg-red-500 hover:bg-red-600 text-white flex items-center gap-2">
                  <PenBox size={18} />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }}>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  onClick={() => navigate("/myjobs")}
                />
                <UserButton.Action
                  label="Save Jobs"
                  labelIcon={<Heart size={15} />}
                  onClick={() => navigate("/savejob")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </div>

      {/* ✅ Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mx-4 mt-3 p-4 flex flex-col gap-4 animate-fadeIn">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Button
                onClick={() => navigate("/postjob")}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
              >
                <PenBox size={18} /> Post a Job
              </Button>
            )}

            <Button
              onClick={() => navigate("/myjobs")}
              className="flex items-center justify-center gap-2"
            >
              <BriefcaseBusiness size={18} /> My Jobs
            </Button>

            <Button
              onClick={() => navigate("/savejob")}
              className="flex items-center justify-center gap-2"
            >
              <Heart size={18} /> Saved Jobs
            </Button>

            <div className="flex justify-center">
              <UserButton
                appearance={{ elements: { avatarBox: "w-11 h-11" } }}
              />
            </div>
          </SignedIn>
        </div>
      )}

      {/* ✅ Login Popup */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm"
          onClick={handleOverlay}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg relative mx-4 w-full max-w-sm sm:max-w-md">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setShowSignIn(false)}
            >
              ✖
            </button>

            <SignIn
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            />
          </div>
        </div>
      )}
    </header>
  );
};
