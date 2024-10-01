import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchClients, deleteClient } from '../services/clientService';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Modal, Box } from '@mui/material';

export const ClientList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: clients, error, isLoading } = useQuery(['clients'], fetchClients);

  const mutation = useMutation((id: string) => deleteClient(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      setModalOpen(false);
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading clients.</p>;
  if (clients.length === 0) return <p>No clients found.</p>;

  const handleDelete = (id: string) => {
    setClientToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      mutation.mutate(clientToDelete);
    }
  };

  return (
    <>
      <Button onClick={() => navigate('/create')}>Create Client</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client: any) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.type === 'PF' ? client.name : client.businessName}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/edit/${client.id}`)}>Edit</Button>
                <Button onClick={() => handleDelete(client.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box>
          <p>Are you sure you want to delete this client?</p>
          <Button onClick={confirmDelete}>Yes</Button>
          <Button onClick={() => setModalOpen(false)}>No</Button>
        </Box>
      </Modal>
    </>
  );
};
