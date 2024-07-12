import { Label } from '../shadcn/components/ui/label';

type FormRowProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

const FormRow = ({ label, error, children }: FormRowProps) => {
  const childElement = children as React.ReactElement<{ id: string }>;

  return (
    <div>
      <div className='flex flex-col gap-2'>
        {label && childElement?.props?.id && (
          <Label htmlFor={childElement.props.id}>{label}</Label>
        )}
        {children}
      </div>
      {error && <span className='text-xs text-red-500'>{error}</span>}
    </div>
  );
};

export default FormRow;
