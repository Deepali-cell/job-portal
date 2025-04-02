import { z } from "zod";

export const ApplyJobSchema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be atlease 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["intermediate", "graduate", "postgraduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only Pdfs or Msword files are allowed" }
    ),
});
