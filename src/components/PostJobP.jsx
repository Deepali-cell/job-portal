import React, { useEffect } from "react";
import { PostJobSchema } from "@/schemas/PostJobSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { postJobApi } from "@/api/postJobApi";
import AddCompany from "./AddCompany";

const PostJobP = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  // form fields
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

  // Fetch companies
  const {
    fn: getcompanyfn,
    data: companies,
    loading: companiesLoading,
  } = useFetchHook(getCompaniesApi);

  useEffect(() => {
    if (isLoaded) getcompanyfn();
  }, [isLoaded]);

  // post job
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
      <div className="flex items-center justify-center h-screen ">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to={"/jobs"} />;
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h1 className="text-2xl font-bold text-center mb-6">Post a Job</h1>
      {postjoberror && (
        <p className="text-red-400 text-center">{postjoberror}</p>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Job Title */}
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

        <div>
          <Label className="font-medium my-2">Job Description</Label>
          <Input
            {...register("description")}
            type="text"
            placeholder="Enter job description..."
            className="w-full border-gray-600 bg-gray-700 text-white"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        {/* Location & Company Row */}
        <div className="flex gap-4">
          {/* Location */}
          <div className="w-1/2">
            <Label className="font-medium my-2">Location</Label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-gray-600 bg-gray-700 text-white">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700">
                    <SelectGroup>
                      {State.getStatesOfCountry("IN").map(({ name }) => (
                        <SelectItem
                          key={name}
                          value={name}
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
            {errors.location && (
              <p className="text-red-400 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Company Selection */}
          <div className="w-1/2">
            <Label className="font-medium my-2">Company</Label>
            <Controller
              name="company_id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-gray-600 bg-gray-700 text-white">
                    <SelectValue placeholder="Select a company">
                      {field.value
                        ? companies?.find(
                            (com) => com.id === Number(field.value)
                          )?.name
                        : "Company"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700">
                    <SelectGroup>
                      {companies?.map(({ name, id }) => (
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
        {/* add new company */}
        <AddCompany getcompanyfn={getcompanyfn} />
        {/* Requirements (Markdown Editor) */}
        <div>
          <Label className="font-medium my-2">Requirements</Label>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <div className="border border-gray-600 rounded-md bg-gray-700">
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

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <Button
            type="submit"
            className="w-32 bg-green-600 hover:bg-green-700 text-white"
            disabled={postjobloading}
          >
            {postjobloading ? "Submitting..." : "Submit"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-32 border-gray-500 text-gray-400 hover:bg-gray-700"
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
