import z from 'zod';

const loginValidation = z.object({
    email: z.string().email().nonempty("email is required"),
    password: z.string().min(8,"min 8 characters").nonempty("password is required")
});

export default loginValidation;