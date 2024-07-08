import { Link } from 'react-router-dom';

import { Button } from '../shadcn/components/ui/button';
import Heading from '../ui/Heading';

const NotFound = () => {
  return (
    <main className='flex flex-col items-center justify-center gap-4'>
      <Heading as='h1'>404 - Page Not Found</Heading>
      <Button asChild>
        <Link to='/'>Back to home</Link>
      </Button>
    </main>
  );
};

export default NotFound;
