import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/shadcnUI/select';
import { Input } from '@/components/shadcnUI/input';
import { DateRangePicker } from '@/components/shadcnUI/extensions/date-range-picker';
import DashedButton from '@/components/buttons/DashedButton';

const UsersFiltersInput = ({
  filters = {},
  onFiltersChange,
  isFiltered = false
}) => {
  const { searchText = '', status = '' } = filters;
  const handleSearchTextChange = (event) => {
    onFiltersChange({ ...filters, searchText: event.target.value });
  };

  const handleDateRangeChange = (dateRange) => {
    onFiltersChange({ ...filters, dateRange });
  };

  const handleStatusChange = (value) => {
    onFiltersChange({
      ...filters,
      status: value === 'true' ? true : value === 'false' ? false : ''
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      searchText: '',
      status: '',
      dateRange: null
    });
  };

  const getStatusLabel = () => {
    switch (status) {
      case false:
        return 'Đang hoạt động';
      case true:
        return 'Đã bị cấm';
      default:
        return 'Trạng thái';
    }
  };

  return (
    <div className='flex items-center gap-5'>
      <Input
        placeholder='Tìm kiếm theo tên...'
        value={searchText}
        onChange={handleSearchTextChange}
        className='h-8 w-52 border-dashed border-slate-400 focus-visible:ring-0'
      />

      <Select value={status.toString()} onValueChange={handleStatusChange}>
        <SelectTrigger className='h-8 w-[140px] border-dashed border-slate-400 text-xs hover:bg-accent focus:ring-0'>
          {getStatusLabel()}
        </SelectTrigger>
        <SelectContent>
          <SelectItem className='hover:cursor-pointer' value='false'>
            Đang hoạt động
          </SelectItem>
          <SelectItem className='hover:cursor-pointer' value='true'>
            Đã bị cấm
          </SelectItem>
        </SelectContent>
      </Select>
      <DateRangePicker
        showCompare={false}
        align='center'
        onUpdate={handleDateRangeChange}
      />
      {isFiltered && <DashedButton onClick={resetFilters} />}
    </div>
  );
};

export default UsersFiltersInput;
