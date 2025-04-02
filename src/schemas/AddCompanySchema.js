import { z } from "zod";

export const AddCompanySchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" ||
          file[0].type === "image/jpg" ||
          file[0].type === "image/jpeg"),
      { message: "Only png or jpg images are allowed" }
    ),
});
