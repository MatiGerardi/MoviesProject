import z from "zod";

const movieSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Movie title must be a string",
      required_error: "Movie title is required.",
    })
    .or(z.literal("N/A")),
  year: z.string().or(z.literal("N/A")),
  poster: z.string().url("Must be a valid URL.").or(z.literal("N/A")),
  genre: z
    .string()
    .min(1, "Must have at least one genre.")
    .or(z.literal("N/A")),
  director: z.string().or(z.literal("N/A")),
  actors: z.string().or(z.literal("N/A")),
  plot: z.string().or(z.literal("N/A")),
  rating: z
    .string()
    .regex(
      /^\d(\.\d)?$/,
      "The rating must be a number with one decimal place between 0.0 and 9.9 or N/A"
    )
    .or(z.literal("N/A")),
  runtime: z
    .string()
    .regex(
      /^(\d{1,3} min|\-)$/,
      "The runtime must be a number followed by 'min' or '-' or N/A"
    )
    .or(z.literal("N/A")),
});

export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}
