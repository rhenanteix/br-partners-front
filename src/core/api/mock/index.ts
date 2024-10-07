/* eslint-disable @typescript-eslint/no-explicit-any */
import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";
import { ClientRepository } from "@core/repository";
import { onlyNumbers } from "@shared/string";
import { clientSchema } from "@core/schemas";
import ResponseData from "@core/api/mock/ResponseData";

const clientRepository = new ClientRepository();

export const worker = setupWorker(
  ...[
    http.get("/client", () => {
      const responseData = clientRepository.values();

      return ResponseData.json([...responseData]);
    }),

    http.get("/client/:cpf", ({ params }) => {
      const { cpf } = params;

      const cpfValue = cpf && onlyNumbers(cpf as string);

      if (!cpfValue) {
        new HttpResponse("Cliente não encontrado", {
          status: 404,
          headers: {
            "Content-Type": "text/plain",
          },
        });
      }

      const responseData = clientRepository.get(cpfValue as string);

      return ResponseData.json(responseData);
    }),

    http.post("/client", async ({ request }) => {
      const data = await request.json();

      try {
        const clientData = clientSchema.parse(data);

        const isExist = clientRepository.get(clientData.cpf);

        if (isExist) {
          throw new Error("CPF já existe.");
        }

        clientRepository.set(data);

        return ResponseData.json(true);
      } catch (e: any) {
        return ResponseData.error(e.message);
      }
    }),

    http.put("/client", async ({ request }) => {
      const data = await request.json();

      try {
        clientRepository.set(data);

        return ResponseData.json(true);
      } catch (e: any) {
        console.log("erro api", { e });
        return ResponseData.error(e.message);
      }
    }),

    http.delete("/client/:cpf", ({ params }) => {
      const { cpf } = params;

      try {
        const cpfValue = cpf && onlyNumbers(cpf as string);

        const result = clientRepository.delete(cpfValue);

        if (!result) {
          return ResponseData.error(
            "Não foi possível remover o cliente enviado."
          );
        }

        return ResponseData.json(true);
      } catch (e: any) {
        return ResponseData.error(e.message);
      }
    }),
  ]
);
