import React from "react";

const useToggleOpen = (initOpen: boolean) => {
  const [open, setOpen] = React.useState(initOpen);

  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return [open, handleOpen, handleClose] as const;
};

export default useToggleOpen;
