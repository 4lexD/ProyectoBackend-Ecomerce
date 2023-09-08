import z from 'zod';

const productValidation = z.object({
    title: z.string(),
    code: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    price:z.number().positive(),
    stock: z.number().positive()
});

export default productValidation;