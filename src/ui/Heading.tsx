type HeadingProps = {
  as: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading = ({ as: Tag, children, ...props }: HeadingProps) => {
  let classes = '';

  switch (Tag) {
    case 'h1':
      classes = 'text-3xl font-semibold';
      break;
    case 'h2':
      classes = 'text-2xl font-semibold';
      break;
    case 'h3':
      classes = 'text-2xl font-medium';
      break;
    default:
      classes = 'text-xl';
  }

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

export default Heading;
