import { TClient, clientSchema } from "../schemas";

const clientStorageKey = "clients-storage";

export class ClientRepository extends Map<string, TClient> {
  constructor() {
    super();
    const clientsStorageValue = sessionStorage.getItem(clientStorageKey);

    if (!clientsStorageValue) {
      return;
    }

    try {
      const clientsStorageData: TClient[] = JSON.parse(
        clientsStorageValue
      ) as TClient[];

      for (let i = 0; i < clientsStorageData.length; i++) {
        try {
          this.set(clientsStorageData[i]);
        } catch {
          // aqui dei só um console.log para não travar o carregamento dos outros clientes
          console.error(
            "Erro ao carregar cliente do sessionStorage.",
            clientsStorageData[i]
          );
        }
      }
    } catch {
      console.error("Erro ao carregar clientes!");
    }
  }

  private parse(data: unknown) {
    const parseResult = clientSchema.safeParse(data);

    return parseResult;
  }

  private save() {
    const clients = this.values();

    const sessionStorageValue = JSON.stringify([...clients]);

    sessionStorage.setItem(clientStorageKey, sessionStorageValue);
  }

  set(value: unknown): this {
    const parseResult = this.parse(value);

    if (!parseResult.success) {
      throw new Error("Objeto Cliente inválido.");
    }

    super.set(parseResult.data.cpf, parseResult.data);

    this.save();

    return this;
  }

  delete(key: string): boolean {
    const result = super.delete(key);

    if (!result) {
      return false;
    }

    this.save();
    return true;
  }
}
