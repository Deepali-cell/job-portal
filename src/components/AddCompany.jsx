import { AddCompanySchema } from "@/schemas/AddCompanySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { addnewCompanyApi } from "@/api/addnewCompanyApi";
import useFetchHook from "@/hooks/useFetchHook";

const AddCompany = ({ getcompanyfn }) => {
  // form handle
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(AddCompanySchema),
  });

  // add company api handle
  const {
    fn: addcompanyfn,
    loading: addcompanyloading,
    error: addcompanyerror,
    data: addcompanydata,
  } = useFetchHook(addnewCompanyApi);

  const handleAddCompany = (data) => {
    addcompanyfn({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (addcompanydata?.length > 0) {
      getcompanyfn();
    }
  }, [addcompanyloading]);

  return (
    <Dialog>
      <DialogTrigger className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300">
        + Add New Company
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Company Here By Filling this Form</DialogTitle>
        </DialogHeader>
        {addcompanyerror && (
          <p className="text-red-400 text-center">{addcompanyerror}</p>
        )}
        {/* Ensure form is wrapped in handleSubmit */}
        <form onSubmit={handleSubmit(handleAddCompany)}>
          <div className="grid gap-4 py-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                {...register("name")}
                type="text"
                placeholder="Enter Your Company name..."
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Upload Company Logo */}
            <div className="space-y-2">
              <Label>Upload Company Logo</Label>
              <Input
                {...register("logo")}
                type="file"
                accept="image/*"
                className="border p-2 rounded-md w-full"
              />
              {errors.logo && (
                <p className="text-red-500 text-sm">{errors.logo.message}</p>
              )}
            </div>
          </div>
          {/* form button */}
          <div className="flex justify-between mt-4">
            <Button
              type="submit"
              className="w-32 bg-green-600 hover:bg-green-700 text-white"
              disabled={addcompanyloading}
            >
              {addcompanyloading ? "Submitting..." : "Submit"}
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
      </DialogContent>
    </Dialog>
  );
};

export default AddCompany;
