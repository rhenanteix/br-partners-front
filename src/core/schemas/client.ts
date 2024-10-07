import { z } from "zod";
import { isCPF, isCNPJ } from "brazilian-values";

// Atualize o schema para aceitar CPF ou CNPJ dinamicamente
export const clientSchema = z
  .object({
    cpf: z
      .string()
      .refine(
        (cpf) => isCPF(cpf) || isCNPJ(cpf),
        (cpf) => (isCNPJ(cpf) ? "CNPJ Inválido." : "CPF Inválido.")
      ),
    name: z
      .string()
      .min(3, "Mínimo de 3 caracteres.")
      .max(100, "Máximo de 100 caracteres."),
    email: z.string().email("E-mail inválido."),
    phone: z.string().refine(
      (value) => /^[1-9]{2}(9)([0-9]{8})$/.test(value),
      "Telefone inválido. (00) 90000-0000"
    ),
  })
  .strict();

export type TClient = z.infer<typeof clientSchema>;
