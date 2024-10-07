export const onlyNumbers = (value: string) =>
  value?.match(/\d/g)?.join("") || "";

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

export const formatCPF = (value: string) =>
  value
    .replace(/\D+/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

export const formatPhone = (value: string) =>
  value.replace(/\D+/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
