import { enqueueSnackbar, OptionsObject } from "notistack";

export const showNotification = (
  type: "success" | "error" | "info" | "warning" = "info",
  message: string,
  options: OptionsObject = {}
) => {
  if(message === "authorization header is missing") {
    message = "please login again";
  }
  enqueueSnackbar(message, {
    variant: type,
    ...options,
  });
};
