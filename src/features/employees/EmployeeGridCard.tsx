type EmployeeGridCardProps = {
  name: string;
  value: string;
  valueStyles?: string;
};

const EmployeeGridCard = ({
  name,
  value,
  valueStyles,
}: EmployeeGridCardProps) => {
  return (
    <div className='relative grid place-items-center border py-14 transition-[border-color]'>
      <p className='absolute left-2 top-2 text-sm opacity-50'>{name}</p>
      {valueStyles ? <p className={valueStyles}>{value}</p> : <p>{value}</p>}
    </div>
  );
};

export default EmployeeGridCard;
