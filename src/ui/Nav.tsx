import { NavLink } from 'react-router-dom';

import { cn } from '../shadcn/lib/utils';
import { navLinks } from '../utils/constants';

const Nav = () => {
  return (
    <nav>
      <ul className='flex flex-col gap-3'>
        {navLinks.map((navLink) => (
          <li key={navLink.name} className='relative flex items-center gap-4'>
            <NavLink
              to={navLink.link}
              className={({ isActive }) =>
                cn(
                  `${isActive && 'relative after:absolute after:-left-5 after:top-1.5 after:h-3 after:w-3 after:bg-black dark:after:bg-white'} after:content-[" "] select-none after:transition-all hover:underline hover:opacity-90`,
                )
              }
            >
              {navLink.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
