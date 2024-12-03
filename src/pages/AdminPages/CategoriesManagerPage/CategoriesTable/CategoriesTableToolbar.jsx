import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import AddNewButton from '@/components/buttons/AddNewButton';
import AddNewDialog from '@/components/dialogs/AddNewDialog';

export default function CategoriesTableToolbar({ table, globalFilterPlaceholder }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <AddNewDialog
          triggerContainer={<AddNewButton />}
          onSubmit={(data) => console.log(data)}
          form={{ handleSubmit: (fn) => fn }}
        >
          <p>Form nội dung ở đây</p>
        </AddNewDialog>
        <Input
          placeholder={globalFilterPlaceholder ? globalFilterPlaceholder : 'Tìm kiếm...'}
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 text-sm lg:px-3'
          >
            Làm mới
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
