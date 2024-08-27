import { useState } from 'react';

const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);

  const closeModal = () => setOpen(false);

  return { open, setOpen, closeModal };
};

export default useModal;
