import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import { DialogActionType } from '@/lib/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId } from '@/redux/slices/selectorSlice';
import { useDispatch } from 'react-redux';

export default function ReviewsTableRowActions({ row }) {
  const dispatch = useDispatch();

  const handleToggleVisibility = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.TOGGLE_VISIBILITY_REVIEW,
        data: {
          isReviewHidden: row.original.isHidden
        }
      })
    );
    dispatch(addId(row.original.id));
  };

  return (
    <div className='flex items-center justify-center gap-2'>
      {row.original.isHidden === true ? (
        <InfoButton
          name='Hiện'
          className='w-12'
          onClick={handleToggleVisibility}
        />
      ) : (
        <DangerButton
          name='Ẩn'
          className='w-12'
          onClick={handleToggleVisibility}
        />
      )}
    </div>
  );
}
