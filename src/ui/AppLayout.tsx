import { Outlet } from 'react-router-dom';

import Aside from './Aside';
import Header from './Header';

const AppLayout = () => {
  return (
    <div className='font-sono grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr] bg-white transition-colors dark:bg-black dark:text-white'>
      <Header />
      <Aside />
      <main className='overflow-y-auto px-5 py-10'>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
