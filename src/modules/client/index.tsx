import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TClient, clientSchema } from "@core/schemas";
import { useGetClient } from "@core/services/client";
import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ClientForm from "@modules/client/client-form";
import { RoutesPathEnum } from "@core/router/types";

export default function Client() {
  const navigate = useNavigate();
  const { cpf: cpfParam } = useParams();

  const { data: clientUpdated, isLoading } = useGetClient();

  const isRegister = !cpfParam;

  const form = useForm<TClient>({
    mode: "onSubmit",
    resolver: zodResolver(clientSchema),
    defaultValues: {
      cpf: "",
      name: "",
      email: "",
      phone: "",
    },
  });
  const { setValue } = form;

  const handleGoHome = () => {
    navigate(RoutesPathEnum.Home);
  };

  useEffect(() => {
    if (clientUpdated) {
      setValue("name", clientUpdated.name);
      setValue("cpf", clientUpdated.cpf);
      setValue("email", clientUpdated.email);
      setValue("phone", clientUpdated.phone);
    }
  }, [clientUpdated, setValue]);

  return (
    <FormProvider {...form}>
      <Container>
        <Box
          maxWidth="md"
          textAlign="center"
          mx="auto"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" textAlign={"left"}>
              {isRegister
                ? "Inclusao de cadastro de Cliente"
                : "Edição de cadastro de Cliente"}
            </Typography>

            <Button onClick={handleGoHome}>Home</Button>
          </Box>

          {!isRegister && isLoading && <CircularProgress sx={{ mx: "auto" }} />}

          {!isRegister && !isLoading && !clientUpdated && (
            <Alert severity="error">
              Cliente não cadastrado.
              <Button
                type="button"
                variant="text"
                color="error"
                size="small"
                onClick={handleGoHome}
                sx={{ p: 0 }}
              >
                Voltar
              </Button>
            </Alert>
          )}

          {(isRegister || (!isLoading && clientUpdated)) && <ClientForm />}
        </Box>
      </Container>
    </FormProvider>
  );
}
