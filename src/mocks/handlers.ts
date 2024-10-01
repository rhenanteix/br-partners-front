import * as msw from 'msw';
import { clientSchema, ClientType } from './schemas';
import { fetchClients, createClient, updateClient, deleteClient, fetchClientById } from '../services/clientService';

const { rest } = msw;

export const handlers = [
  rest.get('/clients', (req, res, ctx) => {
    const clients = fetchClients();
    return res(ctx.json(clients));
  }),

  rest.get('/clients/:id', (req, res, ctx) => {
    const { id } = req.params;
    const client = fetchClientById(id as string);
    if (client) {
      return res(ctx.json(client));
    }
    return res(ctx.status(404), ctx.json({ message: 'Client not found' }));
  }),

  rest.post('/clients', async (req, res, ctx) => {
    const client = await req.json<ClientType>();
    const parsed = clientSchema.safeParse(client);
    if (!parsed.success) {
      return res(ctx.status(400), ctx.json({ errors: parsed.error.errors }));
    }
    createClient(client);
    return res(ctx.status(201), ctx.json(client));
  }),

  rest.put('/clients/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const updatedClient = await req.json<ClientType>();
    const parsed = clientSchema.safeParse(updatedClient);
    if (!parsed.success) {
      return res(ctx.status(400), ctx.json({ errors: parsed.error.errors }));
    }
    updateClient(id as string, updatedClient);
    return res(ctx.json(updatedClient));
  }),

  rest.delete('/clients/:id', (req, res, ctx) => {
    const { id } = req.params;
    deleteClient(id as string);
    return res(ctx.status(204));
  }),
];
