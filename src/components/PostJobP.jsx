import React, { useEffect } from "react";
import { PostJobSchema } from "@/schemas/PostJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { State } from "country-state-city";
import useFetchHook from "@/hooks/useFetchHook";
import { getCompaniesApi } from "@/api/getCompaniesApi";
import { useUser } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { postJobApi } from "@/api/postJobApi";
import AddCompany from "./AddCompany";

const PostJobP = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(PostJobSchema),
  });

  const {
    fn: getcompanyfn,
    data: companies,
    loading: companiesLoading,
  } = useFetchHook(getCompaniesApi);

  useEffect(() => {
    if (isLoaded) getcompanyfn();
  }, [isLoaded]);

  const {
    fn: postjobfn,
    loading: postjobloading,
    error: postjoberror,
    data: postjobdata,
  } = useFetchHook(postJobApi);

  const onSubmit = (data) => {
    postjobfn({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (postjobdata?.length > 0) {
      navigate("/jobs");
    }
  }, [postjobloading]);

  if (!isLoaded || companiesLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to={"/jobs"} />;
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg text-white mt-6 mb-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Post a Job
      </h1>

      {postjoberror && (
        <p className="text-red-400 text-center mb-4">{postjoberror}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ✅ Title */}
        <div>
          <Label className="font-medium my-2">Job Title</Label>
          <Input
            {...register("title")}
            type="text"
            placeholder="Enter job title..."
            className="w-full border-gray-600 bg-gray-700 text-white"
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* ✅ Description */}
        <div>
          <Label className="font-medium my-2">Job Description</Label>
          <Input
            {...register("description")}
            placeholder="Enter job description..."
            className="w-full border-gray-600 bg-gray-700 text-white"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* ✅ Location & Company → Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Location */}
          <div>
            <Label className="font-medium my-2">Location</Label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-gray-600 bg-gray-700 text-white">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700">
                    <SelectGroup>
                      {State.getStatesOfCountry("IN").map((state) => (
                        <SelectItem
                          key={state.name}
                          value={state.name}
                          className="text-white"
                        >
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.location && (
              <p className="text-red-400 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <Label className="font-medium my-2">Company</Label>
            <Controller
              name="company_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-gray-600 bg-gray-700 text-white">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700">
                    <SelectGroup>
                      {companies?.map(({ id, name }) => (
                        <SelectItem
                          key={id}
                          value={id.toString()}
                          className="text-white"
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.company_id && (
              <p className="text-red-400 text-sm mt-1">
                {errors.company_id.message}
              </p>
            )}
          </div>
        </div>

        {/* ✅ Add new company section */}
        <AddCompany getcompanyfn={getcompanyfn} />

        {/* ✅ Requirements - Markdown Editor */}
        <div>
          <Label className="font-medium my-2">Requirements</Label>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <div className="border border-gray-600 rounded-md bg-gray-700 p-2">
                <MDEditor value={field.value} onChange={field.onChange} />
              </div>
            )}
          />
          {errors.requirements && (
            <p className="text-red-400 text-sm mt-1">
              {errors.requirements.message}
            </p>
          )}
        </div>

        {/* ✅ Buttons responsive */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <Button
            type="submit"
            className="w-full sm:w-40 bg-green-600 hover:bg-green-700 text-white"
            disabled={postjobloading}
          >
            {postjobloading ? "Submitting..." : "Submit"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-40 border-gray-500 text-gray-400 hover:bg-gray-700"
            onClick={() => reset()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostJobP;
