import { GoPeople, GoGitPullRequest } from 'react-icons/go';
import { GrProjects } from 'react-icons/gr';
import { MdOutlineApproval } from 'react-icons/md';
import { Link } from 'react-router-dom';

const DashboardCards = () => {
  return (
    <section className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
      <Link
        to='/employees'
        className='grid h-20 w-full place-items-center rounded border transition-[border-color] hover:underline lg:h-60'
      >
        <span className='flex items-center gap-2'>
          <GoPeople size={20} /> Employees
        </span>
      </Link>
      <Link
        to='/projects'
        className='grid h-20 w-full place-items-center rounded border transition-[border-color] hover:underline lg:h-60'
      >
        <span className='flex items-center gap-2'>
          <GrProjects size={20} /> Projects
        </span>
      </Link>
      <Link
        to='/leave-requests'
        className='grid h-20 w-full place-items-center rounded border transition-[border-color] hover:underline lg:h-60'
      >
        <span className='flex items-center gap-2'>
          <GoGitPullRequest size={20} /> Leave Request
        </span>
      </Link>
      <Link
        to='/approval-requests'
        className='grid h-20 w-full place-items-center rounded border transition-[border-color] hover:underline lg:h-60'
      >
        <span className='flex items-center gap-2'>
          <MdOutlineApproval size={20} /> Approval Requests
        </span>
      </Link>
    </section>
  );
};

export default DashboardCards;
