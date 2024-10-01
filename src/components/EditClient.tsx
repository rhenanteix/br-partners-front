import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchClientById, updateClient } from '../services/clientService';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema } from '../mocks/schemas';
import { z } from 'zod';
import { TextField, Button, CircularProgress } from '@mui/material';

const schema = clientSchema;
type ClientFormValues = z.infer<typeof schema>;

export const EditClient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: client, isLoading, error } = useQuery(['client', id], () => fetchClientById(id!), {
    enabled: !!id,
  });

  const mutation = useMutation((data: ClientFormValues) => updateClient(id!, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      navigate('/');
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(schema),
    defaultValues: client
  });

  if (isLoading) return <CircularProgress />;
  if (error || !client) return <p>Error loading client data.</p>;

  const onSubmit = (data: ClientFormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Mesmos campos do componente de criação de cliente */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Name" error={!!errors.name} helperText={errors.name?.message} />
        )}
      />
      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="CPF" error={!!errors.cpf} helperText={errors.cpf?.message} />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Email" error={!!errors.email} helperText={errors.email?.message} />
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Phone" error={!!errors.phone} helperText={errors.phone?.message} />
        )}
      />

      <Button type="submit">Update</Button>
    </form>
  );
};
