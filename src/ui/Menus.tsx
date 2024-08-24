import { createContext, useContext, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import useClickOutside from '../hooks/useClickOutside';

type MenusContextType = {
  openId: number | undefined;
  close: () => void;
  open: (id: number) => void;
};

type MenusProps = {
  children: ReactNode;
};
type ListProps = {
  id: number;
  children: ReactNode;
};

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
};

const MenusContext = createContext<MenusContextType | undefined>(undefined);

const Menus = ({ children }: MenusProps) => {
  const [openId, setOpenId] = useState<number | undefined>(undefined);

  const close = () => setOpenId(undefined);
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
};

const List = ({ id, children }: ListProps) => {
  const context = useContext(MenusContext);
  if (!context) throw new Error('List must be used within a Menus provider');

  const { openId, close } = context;
  const { ref } = useClickOutside<HTMLUListElement>(close);

  if (openId !== id) return null;

  return createPortal(
    <ul
      className='text:white fixed border bg-white p-2 dark:bg-black'
      ref={ref}
    >
      {children}
    </ul>,
    document.body,
  );
};

const Button = ({ children, icon, onClick }: ButtonProps) => {
  const context = useContext(MenusContext);
  if (!context) throw new Error('Button must be used within a Menus provider');
  const { close } = context;

  const handleClick = () => {
    if (onClick) onClick();
    close();
  };

  return (
    <li>
      <button
        className='flex items-center gap-2 p-2 hover:underline'
        onClick={handleClick}
      >
        {icon} <span>{children}</span>
      </button>
    </li>
  );
};

Menus.Menu = Menus;
Menus.List = List;
Menus.Button = Button;

export default Menus;
