import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const OnboardingP = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const handleClickFunction = async (role) => {
    if (!user) return;

    try {
      // ✅ User object se hi update karo
      await user.update({
        publicMetadata: { role },
      });

      navigate(role === "candidate" ? "/jobs" : "/postjob");
    } catch (error) {
      console.error("Error updating user metadata:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.role) {
      navigate(user.publicMetadata.role === "candidate" ? "/jobs" : "/postjob");
    }
  }, [isLoaded, user, navigate]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="px-8 py-6 rounded-2xl shadow-lg w-full text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          I am a ...
        </h1>
        <p className="text-gray-600 mt-2">Choose your role to get started.</p>

        <div className="mt-6 flex flex-col gap-y-4">
          <Button
            className="mx-auto py-6 text-lg font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={() => handleClickFunction("candidate")}
          >
            Candidate
          </Button>
          <Button
            className="mx-auto py-6 text-lg font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={() => handleClickFunction("recruiter")}
          >
            Recruiter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingP;
