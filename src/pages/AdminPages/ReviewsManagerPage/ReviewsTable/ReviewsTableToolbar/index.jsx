import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import { addIds } from '@/redux/slices/selectorSlice';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import ReviewsFiltersInput from './ReviewsFiltersInput';

export default function ReviewsTableToolbar({ rowSelection, table }) {
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);

  const [filters, setFilters] = useState({
    searchText: '',
    status: '',
    dateRange: null
  });

  const isFiltered =
    filters.searchText !== '' ||
    filters.status !== '' ||
    filters.dateRange !== null;

  const handleToggleVisibilityReviews = ({ isHidden }) => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.TOGGLE_VISIBILITY_REVIEW,
        data: {
          isReviewHidden: isHidden
        }
      })
    );
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    table.getColumn('bookName')?.setFilterValue(newFilters.searchText);
    table.getColumn('isHidden')?.setFilterValue(newFilters.status);
    table.getColumn('createdAt')?.setFilterValue(newFilters.dateRange);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-3'>
        <div
          className={`space-x-3 transition-opacity duration-200 ${selectedIds.length > 0 ? 'visible opacity-100' : 'invisible opacity-0'}`}
        >
          <InfoButton
            className='px-3 py-2'
            name='Hiển thị các DM đã chọn'
            onClick={() => handleToggleVisibilityReviews({ isHidden: true })}
          />
          <DangerButton
            className='px-3 py-2'
            name='Ẩn các DM đã chọn'
            onClick={() => handleToggleVisibilityReviews({ isHidden: false })}
          />
        </div>
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <ReviewsFiltersInput
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isFiltered={isFiltered}
        />
        <DataTableViewOptions
          table={table}
          dataViewOptions={{
            index: 'STT',
            createdAt: 'Ngày tạo',
            isHidden: 'Trạng thái',
            bookName: 'Tên sách',
            reviewerName: 'Họ và tên',
            rating: 'Đánh giá',
            description: 'Nội dung'
          }}
        />
      </div>
    </div>
  );
}
