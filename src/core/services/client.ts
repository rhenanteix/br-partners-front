import Api from "@core/api";
import { TResponseBase } from "@core/api/types";
import Client from "@core/models/client";
import type { TClient } from "@core/schemas";
import { DefaultError, useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useGetClients = () => {
  return useQuery({
    queryKey: ["useGetClients"],
    queryFn: async () => {
      const { data } = await Api.Client.get();

      return data?.map((c) => new Client(c)) || [];
    },
  });
};

export const useGetClient = () => {
  const { cpf: cpfParam } = useParams();

  return useQuery({
    enabled: !!cpfParam,
    queryKey: ["useGetClient", cpfParam],
    queryFn: async () => {
      if (!cpfParam) return null;

      const { data } = await Api.Client.getClient(cpfParam);
      return data;
    },
  });
};

export const usePostClient = () => {
  return useMutation<TResponseBase<boolean>, DefaultError, TClient>({
    mutationFn: Api.Client.post,
  });
};

export const useUpdateClient = () => {
  return useMutation<TResponseBase<boolean>, DefaultError, TClient>({
    mutationFn: Api.Client.update,
  });
};

export const useDeleteClient = () => {
  return useMutation<TResponseBase<boolean>, DefaultError, string>({
    mutationFn: Api.Client.remove,
  });
};
