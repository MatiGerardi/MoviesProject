import z from "zod";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required.",
  }),
  year: z.string(),
  poster: z.string().url("Must be a valid URL."),
  genre: z.string().min(1, "Must have at least one genre."),
  director: z.string(),
  actors: z.string(),
  plot: z.string(),
  rating: z.string()
    .regex(/^\d(\.\d)?$/, "El rating debe estar entre 0.0 y 9.9 con un solo decimal"),
  runtime: z.string()
    .regex(/^(\d{1,3} min|\-)$/, "El runtime debe ser un número seguido de 'min'"),
});

export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input);
}
