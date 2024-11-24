import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

const LoadingButton = ({ onClick, isLoading, className, children, variant, size, type }) => {
  return (
    <Button
      className={` ${className}`}
      onClick={onClick}
      variant={variant}
      size={size}
      type={type}
      disabled={isLoading}
    >
      {children}
      {isLoading && <Loader2 className='animate-spin' />}
    </Button>
  );
};
export default LoadingButton;
