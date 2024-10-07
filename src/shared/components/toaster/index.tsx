import { Alert, Snackbar } from "@mui/material";

import useToast from "@core/store/useToast";

export default function Toaster() {
  const { messages, removeToast } = useToast();

  return (
    <>
      {messages?.map(({ id, message, severity }) => (
        <Snackbar
          key={id}
          open={true}
          autoHideDuration={3000}
          onClose={() => removeToast(id)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            key={id}
            severity={severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
}
