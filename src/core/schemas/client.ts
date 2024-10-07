import { z } from "zod";
import { isCPF, isCNPJ } from "brazilian-values";

export const clientSchema = z
  .object({
    cpf: z.string().refine((cpf: string) => isCPF(cpf), "CPF Inválido."),
    name: z
      .string()
      .min(3, "Mínimo de 3 caracteres.")
      .max(100, "Máximo de 100 caracteres."),
    email: z.string().email("E-mail inválido."),
    phone: z.string().refine(
      // (value) => /^\([1-9]{2}\) (?:9)([0-9]{4})\-([0-9]{4})$/.test(value),
      (value) => /^[1-9]{2}(9)([0-9]{8})$/.test(value),
      "Telefone inválido. (00) 90000-0000"
    ),
  })
  .strict();

export type TClient = z.infer<typeof clientSchema>;
