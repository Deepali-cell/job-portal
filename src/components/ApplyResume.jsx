import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplyJobSchema } from "@/schemas/ApplyJobSchema";
import useFetchHook from "@/hooks/useFetchHook";
import { applyResumeApi } from "@/api/applyResumeApi";

const ApplyResume = ({
  getSingleJob,
  applied = false,
  user,
  getSingleJobfn,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(ApplyJobSchema) });

  const { fn: applyresumefn } = useFetchHook(applyResumeApi);

  const onSubmit = (data) => {
    applyresumefn({
      ...data,
      candidate_id: user.id,
      job_id: getSingleJob.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      getSingleJobfn();
      reset();
    });
  };

  return (
    <Dialog>
      {!getSingleJob?.isOpen || applied ? (
        <div className="flex justify-center items-center w-1/2 my-10 mx-auto text-red-500 font-semibold">
          {applied
            ? "You have already applied. No need to apply again."
            : "Hiring Closed"}
        </div>
      ) : (
        <DialogTrigger className="flex justify-center items-center w-1/2 my-10 mx-auto">
          <Button className="w-full py-2 text-lg bg-blue-500 hover:bg-blue-600 text-white">
            Apply
          </Button>
        </DialogTrigger>
      )}

      {!applied && getSingleJob?.isOpen && (
        <DialogContent className="max-h-[80vh] overflow-y-auto p-4">
          <DialogHeader>
            <DialogTitle>
              Apply for {getSingleJob?.title} at {getSingleJob?.company?.name}
            </DialogTitle>
            <DialogDescription>Please fill the form below</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Experience</Label>
              <Input
                {...register("experience", { valueAsNumber: true })}
                type="number"
                placeholder="Enter your experience"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <Input
                {...register("skills")}
                type="text"
                placeholder="Enter your skills"
              />
              {errors.skills && (
                <p className="text-red-500 text-sm">{errors.skills.message}</p>
              )}
            </div>

            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label>Education</Label>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intermediate" id="intermediate" />
                      <Label htmlFor="intermediate">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="graduate" id="graduate" />
                      <Label htmlFor="graduate">Graduate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="postgraduate" id="postgraduate" />
                      <Label htmlFor="postgraduate">Postgraduate</Label>
                    </div>
                  </RadioGroup>
                  {errors.education && (
                    <p className="text-red-500 text-sm">
                      {errors.education.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="space-y-2">
              <Label>Upload Resume</Label>
              <Input
                {...register("resume")}
                type="file"
                className="border p-2 rounded-md w-full"
              />
              {errors.resume && (
                <p className="text-red-500 text-sm">{errors.resume.message}</p>
              )}
            </div>

            <div className="sticky bottom-0 left-0 w-full bg-white p-4 border-t flex justify-between">
              <Button
                type="submit"
                className="text-lg bg-green-500 hover:bg-green-600 text-white"
              >
                Submit
              </Button>
              <DialogClose>
                <Button
                  variant="outline"
                  className="text-lg bg-gray-500 hover:bg-gray-600 text-white"
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ApplyResume;
