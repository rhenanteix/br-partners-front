import type { TResponseBase } from "@core/api/types";
import { TClient } from "@core/schemas";

const URL_BASE = "http://localhost:5173/client";

export const get = async () => {
  return fetch(URL_BASE).then<TResponseBase<TClient[]>>((response) => {
    return response.json();
  });
};

export const getClient = async (cpf: string) => {
  return fetch(`${URL_BASE}/${cpf}`).then<TResponseBase<TClient>>(
    (response) => {
      return response.json();
    }
  );
};

export const post = async (data: TClient) => {
  return fetch(URL_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then<TResponseBase<boolean>>(async (response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(await response.json());
  });
};

export const update = async (data: TClient) => {
  return fetch(URL_BASE, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then<TResponseBase<boolean>>(async (response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(await response.json());
  });
};

export const remove = async (cpf: string) => {
  return fetch(`${URL_BASE}/${cpf}`, {
    method: "DELETE",
  }).then<TResponseBase<boolean>>(async (response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(await response.json());
  });
};
