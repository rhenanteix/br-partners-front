import { clientSchema, ClientType } from '../mocks/schemas';

const CLIENTS_KEY = 'clients';

export const fetchClients = (): ClientType[] => {
  const clients = sessionStorage.getItem(CLIENTS_KEY);
  return clients ? JSON.parse(clients) : [];
};

export const fetchClientById = (id: string): ClientType | undefined => {
  const clients = fetchClients();
  return clients.find(client => client.id === id);
};

export const createClient = (data: ClientType): void => {
  const clients = fetchClients();
  clients.push({ ...data, id: String(Date.now()) });
  sessionStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
};

export const updateClient = (id: string, updatedClient: ClientType): void => {
  const clients = fetchClients();
  const index = clients.findIndex(client => client.id === id);
  if (index !== -1) {
    clients[index] = { ...updatedClient, id };
    sessionStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
  }
};

export const deleteClient = (id: string): void => {
  const clients = fetchClients();
  const updatedClients = clients.filter(client => client.id !== id);
  sessionStorage.setItem(CLIENTS_KEY, JSON.stringify(updatedClients));
};
