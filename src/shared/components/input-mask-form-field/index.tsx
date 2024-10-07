import {
  InputBaseComponentProps,
  TextFieldProps,
  TextField,
} from "@mui/material";
import { onlyNumbers } from "@shared/string";
import { forwardRef } from "react";
import { Control, Controller } from "react-hook-form";
import InputMask from "react-input-mask";

type TFormFieldProps = TextFieldProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  name: string;
  mask: string;
};

const MaskInput = forwardRef<HTMLInputElement, InputBaseComponentProps>(
  ({ onChange, mask, ...props }, ref) => {
    console.log({ props, onChange });
    return (
      <InputMask
        inputRef={ref}
        mask={mask}
        maskChar=" "
        {...props}
        onChange={(event) =>
          onChange?.({
            ...event,
            target: {
              ...event.target,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              value: onlyNumbers(event.target.value),
            },
          })
        }
      />
    );
  }
);

export const InputMaskFormField = ({
  control,
  name,
  label,
  mask,
  ...otherProps
}: TFormFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onChange, value }, fieldState: { error } }) => (
        <TextField
          margin="normal"
          InputProps={{
            inputComponent: MaskInput,
            inputProps: {
              mask: mask,
              onChange: onChange,
              value,
            },
          }}
          id={name}
          name={name}
          inputRef={ref}
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
          sx={{ my: 0 }}
          {...otherProps}
        />
      )}
    />
  );
};
