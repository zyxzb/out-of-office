import React, {
  createContext,
  useContext,
  useState,
  MouseEvent,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';

import useClickOutside from '../hooks/useClickOutside';

type MenusContextType = {
  openId: number | undefined;
  close: () => void;
  open: (id: number) => void;
  position: { x: number; y: number } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
};

type MenusProps = {
  children: ReactNode;
};

type ToggleProps = {
  id: number;
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
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const close = () => setOpenId(undefined);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }: ToggleProps) => {
  const context = useContext(MenusContext);
  if (!context) throw new Error('Toggle must be used within a Menus provider');
  const { openId, close, open, setPosition } = context;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 10,
    });

    openId === undefined || openId !== id ? open(id) : close();
  };

  return (
    <button
      id='show-more'
      onClick={handleClick}
      className='max-w-max border bg-none p-1.5 transition-[border]'
    >
      <HiEllipsisVertical />
    </button>
  );
};

const List = ({ id, children }: ListProps) => {
  const context = useContext(MenusContext);
  if (!context) throw new Error('List must be used within a Menus provider');

  const { openId, position, close } = context;
  const { ref } = useClickOutside<HTMLUListElement>(close);

  if (openId !== id) return null;

  return createPortal(
    <ul
      className='text:white font-sono fixed border bg-white p-2 dark:bg-black'
      style={{ right: position?.x, top: position?.y }}
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
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
