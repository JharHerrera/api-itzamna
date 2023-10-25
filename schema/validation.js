import z from "zod";

const userSchema = z.object({
  name: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required.",
  }),
  cellphone: z.number().int(),
  email: z.string().email(),
  password: z.string(),
});

export function validateUser(object) {
  return userSchema.safeParse(object);
}

export function validatePartialUser(object) {
  return userSchema.partial().safeParse(object);
}