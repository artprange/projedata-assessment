import { z } from 'zod';

export const productSchema = z.object({
	code: z.string().trim().min(1, 'Code is required!'),
	name: z.string().trim().min(1, 'Name is required!'),
	price: z.coerce.number().positive('Price must be greater than zero!'),
});

export type ProductFormValues = z.infer<typeof productSchema>;
