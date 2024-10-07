import { create } from "zustand";
import type { AlertColor } from "@mui/material";
import { generateId } from "@shared/string";

type TMessage = {
  id: string;
  message: string;
  severity: AlertColor;
};

export type TToastStore = {
  messages: TMessage[];
  toast: (message: string, severity: AlertColor) => void;
  toastSuccess: (message: string) => void;
  toastError: (message: string) => void;
  removeToast: (id: string) => void;
};

const useToast = create<TToastStore>((setState, getState) => ({
  messages: [],
  toast: (message, severity) => {
    const { messages } = getState();

    const newToast = {
      id: generateId(),
      message,
      severity,
    };

    setState({ messages: [...messages, newToast] });
  },
  toastSuccess: (message) => {
    const { toast } = getState();
    toast(message, "success");
  },
  toastError: (message) => {
    const { toast } = getState();
    toast(message, "error");
  },
  removeToast: (id) => {
    const { messages } = getState();
    setState({ messages: messages.filter((m) => m.id !== id) });
  },
}));

export default useToast;
