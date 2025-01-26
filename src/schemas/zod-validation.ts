import { z } from "zod";

export const brandBookSchema = z.object({
  brandName: z.string().min(1, "Brand Name is required"),
  brandInfo: z.string().min(1, "Brand Information is required"),
  brandTone: z.string().min(1, "Brand Tone & Voice is required"),
  pages: z.string().refine((val) => Number(val) > 0, {
    message: "Enter valid number of pages"
  }),
  brandColors: z.string().min(1, "Brand Colors are required"),
  imageryStyle: z.string().min(1, "Imagery & Visual Style is required"),
  website_url:z.string().optional()
});

export const brandDeckSchema = brandBookSchema.omit({
  brandTone: true,
  pages: true,
  imageryStyle: true
});

export const onePagerSchema =z.object({
  brandName: z.string().min(1, "Brand Name is required"),
  brandInfo: z.string().min(1, "Brand Information is required"),
  bussinessMode: z.string().min(1, "Mention your mode of bussiness"),
  targetAudience:z.string().min(1, "Mention your target audience"),
  brandColors: z.string().min(1, "Brand Colors are required"),
  achievements: z.string().optional(),
  website_url:z.string().optional()


})
