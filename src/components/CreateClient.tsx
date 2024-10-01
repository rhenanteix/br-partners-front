import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema } from '../mocks/schemas';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '../services/clientService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const schema = clientSchema;
type ClientFormValues = z.infer<typeof schema>;

export const CreateClient = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(schema),
  });

  const clientType = watch('type');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(createClient, {
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      navigate('/');
    }
  });

  const onSubmit = (data: ClientFormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Controller
          name="type"
          control={control}
          defaultValue="PF"
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="PF">PF</MenuItem>
              <MenuItem value="PJ">PJ</MenuItem>
            </Select>
          )}
        />
      </FormControl>

      {clientType === 'PF' && (
        <>
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
        </>
      )}

      {clientType === 'PJ' && (
        <>
          <Controller
            name="businessName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Business Name" error={!!errors.businessName} helperText={errors.businessName?.message} />
            )}
          />
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Company Name" error={!!errors.companyName} helperText={errors.companyName?.message} />
            )}
          />
          <Controller
            name="cnpj"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="CNPJ" error={!!errors.cnpj} helperText={errors.cnpj?.message} />
            )}
          />
        </>
      )}

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

      <Button type="submit">Create</Button>
    </form>
  );
};
