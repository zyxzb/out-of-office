import { Link } from 'react-router-dom';

import Nav from './Nav';
import Logout from '../features/authentication/Logout';
import { Button } from '../shadcn/components/ui/button';

const Aside = () => {
  return (
    <aside className='row-span-full flex flex-col gap-8 border-r px-5 py-2 transition-[border-color]'>
      <Link to='/' className='text-xl font-bold hover:underline'>
        Out of Office
      </Link>
      <Nav />
      <Button>Upload sample data</Button>
      <Logout />
    </aside>
  );
};

export default Aside;
