import { Outlet } from 'react-router-dom';

import Aside from './Aside';
import Header from './Header';

const AppLayout = () => {
  return (
    <div className='grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr]'>
      <Header />
      <Aside />
      <main className='flex flex-col gap-4 overflow-y-auto px-5 py-10'>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
