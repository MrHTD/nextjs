"use client";
import { SnackbarProvider } from "notistack";

const SnackProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {children}
    </SnackbarProvider>
  );
};
export default SnackProvider;
