import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Control, Controller } from "react-hook-form";

type TFormFieldProps = TextFieldProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  name: string;
};

export const InputFormField = ({
  control,
  name,
  label,
  ...inputProps
}: TFormFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          {...inputProps}
        />
      )}
    />
  );
};
