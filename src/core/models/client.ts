import { TClient } from "@core/schemas";
import { formatCPF, formatPhone } from "@shared/string";

class Client implements TClient {
  cpf: string;
  name: string;
  email: string;
  phone: string;

  constructor(obj: TClient) {
    this.cpf = formatCPF(obj.cpf);
    this.name = obj.name;
    this.email = obj.email;
    this.phone = formatPhone(obj.phone);
  }
}

export default Client;
