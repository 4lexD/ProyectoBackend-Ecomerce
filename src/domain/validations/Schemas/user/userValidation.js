import z from 'zod'

const userValidation = z.object({
    firstName: z.string().min(5).max(35),
    lastName: z.string().min(5).max(35),
    password: z.string().min(8, "min 8 characters"),
    age:  z.number().default(18),
    email:z.string().email().nonempty('email is required')
});

export default userValidation;