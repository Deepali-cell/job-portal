import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const navigate = useNavigate();

  // useSearchParams ka use tab hota hai jab aapko URL ke through state control karni ho.
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);
  const handleOverLay = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };
  return (
    <header className="py-4 shadow-md relative">
      <div className="max-w-screen-lg mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-24 w-auto" />
        </Link>

        {/* Login Button */}
        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role == "recruiter" && (
              <Link to="/postjob">
                <Button className="text-lg font-medium px-8 py-2 rounded-xl shadow-md transition-transform transform hover:scale-105 bg-red-500 hover:bg-red-600 text-white flex items-center">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}

            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  onClick={() => navigate("/myjobs")}
                />
                <UserButton.Link
                  label="Save Jobs"
                  labelIcon={<Heart size={15} />}
                  onClick={() => navigate("/savejob")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </div>

      {/* SignIn Popup (Transparent Background) */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md"
          onClick={handleOverLay}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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
