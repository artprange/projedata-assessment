import { z } from 'zod';

export const materialSchema = z.object({
	code: z.string().trim().min(1, 'Code is required!'),
	name: z.string().trim().min(1, 'Name is required!'),
	stockQuantity: z.coerce.number().min(0, 'Stock cannot be negative!'),
});

export type MaterialFormValues = z.infer<typeof materialSchema>;
