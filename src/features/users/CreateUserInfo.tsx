import { Link } from 'react-router-dom';

type CreateUserInfoProps = {
  handleFocusRef: () => void;
};

const CreateUserInfo = ({ handleFocusRef }: CreateUserInfoProps) => {
  return (
    <div className='mx-10'>
      <h2 className='mb-5 text-2xl'>How to create a User?</h2>
      <ol className='flex list-decimal flex-col gap-2 pl-10'>
        <li>
          Go to{' '}
          <Link className='underline underline-offset-2' to='/employees'>
            Employees page
          </Link>{' '}
          and create a User
        </li>
        <li>If you want to create new admin - select role "admin" </li>
        <li>
          <button
            className='underline underline-offset-2'
            type='button'
            onClick={handleFocusRef}
          >
            Email addresses
          </button>{' '}
          must match
        </li>
      </ol>
    </div>
  );
};

export default CreateUserInfo;
