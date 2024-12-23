import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addIds } from '@/redux/slices/selectorSlice';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import UsersFiltersInput from './UsersFiltersInput';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { cn } from '@/utils/classUtils';
import { convertISODateToDDMMYYYY } from '@/utils/dateUtils';

export default function UsersTableToolbar({ rowSelection, table }) {
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);

  const dataToExport = table.getFilteredRowModel().rows.map((item) => ({
    ...item.original,
    roles: (item.original?.roles || []).join(', '),
    version: item.original?.version < 0 ? 'Bị cấm' : 'Đang hoạt động',
    createdAt: convertISODateToDDMMYYYY(item.original?.createdAt)
  }));

  const [filters, setFilters] = useState({
    searchText: '',
    status: '',
    dateRange: null
  });

  const isFiltered =
    filters.searchText !== '' ||
    filters.status !== '' ||
    filters.dateRange !== null;

  const handleToggleBanUsers = ({ isHidden }) => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.TOGGLE_BAN_USER,
        data: {
          isUserBanned: isHidden
        }
      })
    );
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    table.getColumn('fullName')?.setFilterValue(newFilters.searchText);
    table.getColumn('version')?.setFilterValue(newFilters.status);
    table.getColumn('createdAt')?.setFilterValue(newFilters.dateRange);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-3'>
        <div
          className={cn(
            'flex gap-3 transition-opacity duration-200',
            selectedIds.length > 0
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          )}
        >
          <InfoButton
            className='px-3 py-2'
            name='Bỏ cấm những ND đã chọn'
            onClick={() => handleToggleBanUsers({ isHidden: true })}
          />
          <DangerButton
            className='px-3 py-2'
            name='Cấm những ND đã chọn'
            onClick={() => handleToggleBanUsers({ isHidden: false })}
          />
        </div>
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <UsersFiltersInput
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isFiltered={isFiltered}
        />
        <DataTableViewOptions
          table={table}
          dataViewOptions={{
            index: 'STT',
            createdAt: 'Ngày tạo',
            fullName: 'Họ và tên',
            phoneNumber: 'Số điện thoại',
            email: 'Email',
            roles: 'Vai trò',
            version: 'Trạng thái'
          }}
          data={dataToExport}
        />
      </div>
    </div>
  );
}
