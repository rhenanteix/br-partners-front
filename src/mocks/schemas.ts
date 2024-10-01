import { z } from 'zod';

export const clientSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['PF', 'PJ']),
  name: z.string().optional(),
  cpf: z.string().min(11).max(11),
  businessName: z.string().optional(),
  companyName: z.string().optional(),
  cnpj: z.string().min(14).max(14),
  email: z.string().email(),
  phone: z.string().regex(/^9\d{8}$/, 'Phone number must start with 9 and contain 9 digits'),
});

export type ClientType = z.infer<typeof clientSchema>;
