import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

const Notification = () => {
  return (
    <div>
      <Button variant='ghost' size='icon'>
        <Bell className='!size-6' />
      </Button>
    </div>
  );
};
export default Notification;