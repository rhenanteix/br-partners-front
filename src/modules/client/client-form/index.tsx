import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { usePostClient, useUpdateClient } from "@core/services/client";
import { Button, Grid, Paper, MenuItem, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesPathEnum } from "@core/router/types";
import useToast from "@core/store/useToast";
import { InputFormField } from "@shared/components/input-form-field";
import { InputMaskFormField } from "@shared/components/input-mask-form-field";
import { DefaultError } from "@tanstack/react-query";
import { useState } from "react";

export default function ClientForm() {
  const navigate = useNavigate();
  const { cpf: cpfParam } = useParams();
  const { cnpj: cnpjParam } = useParams() 


  const { toastSuccess, toastError } = useToast();
  const { mutate: mutatePostClient } = usePostClient();
  const { mutate: mutateUpdateClient } = useUpdateClient();

  const isRegister = !cpfParam;
  const { handleSubmit, control, setValue } = useFormContext();
  
  // Adiciona estado para o tipo de cliente
  const [clientType, setClientType] = useState<"PF" | "PJ">("PF");

  const handlePostClient = (client: any) => {
    mutatePostClient(client, {
      onSuccess: () => {
        successProcess("Cadastrado realizado com sucesso!");
      },
      onError: handleError,
      onSettled: handleSettled,
    });
  };

  const handleUpdateClient = (client: any) => {
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
    // Finalização de processo (se necessário)
  };

  const successProcess = (message: string) => {
    toastSuccess(message);
    handleGoHome();
  };

  const handleValid: SubmitHandler<any> = (formData) => {
    // Processo de envio
    if (isRegister) {
      handlePostClient(formData);
    } else {
      handleUpdateClient(formData);
    }
  };

  const handleInvalid: SubmitErrorHandler<any> = () => {
    toastError("Formulário inválido.");
  };

  const handleGoHome = () => {
    navigate(RoutesPathEnum.Home);
  };

  return (
    <Paper sx={{ padding: 4 }}>
      <form onSubmit={handleSubmit(handleValid, handleInvalid)}>
        <Grid container spacing={2}>
          
          {/* Seleção do tipo de cliente (PF ou PJ) */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              label="Tipo de Cliente"
              value={clientType}
              onChange={(e) => {
                setClientType(e.target.value as "PF" | "PJ");
                setValue("cpf", ""); // Limpa o campo de CPF/CNPJ ao mudar tipo
              }}
              fullWidth
            >
              <MenuItem value="PF">Pessoa Física</MenuItem>
              <MenuItem value="PJ">Pessoa Jurídica</MenuItem>
            </TextField>
          </Grid>

          {/* Campo Nome para PF */}
          {clientType === "PF" && (
            <Grid item xs={12} md={6}>
              <InputFormField control={control} label="Nome" name="name" />
            </Grid>
          )}

          {/* Campos Nome Fantasia e Razão Social para PJ */}
          {clientType === "PJ" && (
            <>
              <Grid item xs={12} md={6}>
                <InputFormField
                  control={control}
                  label="Nome Fantasia"
                  name="fantasyName"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputFormField
                  control={control}
                  label="Razão Social"
                  name="corporateName"
                />
              </Grid>
            </>
          )}

          {/* Campo CPF ou CNPJ, com máscara adequada */}
          <Grid item xs={12} md={6}>
            <InputMaskFormField
              control={control}
              label={clientType === "PF" ? "CPF" : "CNPJ"}
              name="cpf"
              mask={clientType === "PF" ? "999.999.999-99" : "99.999.999/9999-99"}
              disabled={!isRegister}
            />
          </Grid>

          {/* Campo E-mail */}
          <Grid item xs={12} md={6}>
            <InputFormField
              control={control}
              label="E-mail"
              name="email"
              type="email"
            />
          </Grid>

          {/* Campo Telefone */}
          <Grid item xs={12} md={6}>
            <InputMaskFormField
              control={control}
              label="Telefone"
              name="phone"
              mask="(99) 99999-9999"
            />
          </Grid>

          {/* Botões de ação */}
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
