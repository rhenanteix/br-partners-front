import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { type TClient } from "@core/schemas";
import { usePostClient, useUpdateClient } from "@core/services/client";
import { Button, Grid, Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesPathEnum } from "@core/router/types";
import useToast from "@core/store/useToast";
import { InputFormField } from "@shared/components/input-form-field";
import { InputMaskFormField } from "@shared/components/input-mask-form-field";
import { DefaultError } from "@tanstack/react-query";

export default function ClientForm() {
  const navigate = useNavigate();
  const { cpf: cpfParam } = useParams();

  const { toastSuccess, toastError } = useToast();
  const { mutate: mutatePostClient } = usePostClient();
  const { mutate: mutateUpdateClient } = useUpdateClient();

  const isRegister = !cpfParam;

  const { handleSubmit, control } = useFormContext<TClient>();

  const handlePostClient = (client: TClient) => {
    mutatePostClient(client, {
      onSuccess: () => {
        successProcess("Cadastrado realizado com sucesso!");
      },
      onError: handleError,
      onSettled: handleSettled,
    });
  };

  const handleUpdateClient = (client: TClient) => {
    mutateUpdateClient(client, {
      onSuccess: () => {
        successProcess("Edição realizada com sucesso!");
      },
      onError: handleError,
      onSettled: handleSettled,
    });
  };

  const handleError = (e: DefaultError) => {
    toastError(e.message);
  };

  const handleSettled = () => {
    // loading(false)
  };

  const successProcess = (message: string) => {
    toastSuccess(message);

    handleGoHome();
  };

  const handleValid: SubmitHandler<TClient> = (formData) => {
    // loading(true);
    if (isRegister) {
      handlePostClient(formData);
    } else {
      handleUpdateClient(formData);
    }
  };

  const handleInvalid: SubmitErrorHandler<TClient> = () => {
    toastError("Formulário inválido.");
  };

  const handleGoHome = () => {
    navigate(RoutesPathEnum.Home);
  };

  return (
    <Paper sx={{ padding: 4 }}>
      <form onSubmit={handleSubmit(handleValid, handleInvalid)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputFormField control={control} label="Nome" name="name" />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputMaskFormField
              control={control}
              label="CPF"
              name="cpf"
              mask="999.999.999-99"
              disabled={!isRegister}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputFormField
              control={control}
              label="E-mail"
              name="email"
              type="email"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputMaskFormField
              control={control}
              label="Telefone"
              name="phone"
              mask="(99) 99999-9999"
            />
          </Grid>
          <Grid
            item
            xs={12}
            textAlign="right"
            display="flex"
            justifyContent="end"
            gap={2}
          >
            <Button type="button" onClick={handleGoHome}>
              Cancelar
            </Button>

            <Button variant="contained" type="submit">
              {isRegister ? "Cadastrar" : "Atualizar"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
