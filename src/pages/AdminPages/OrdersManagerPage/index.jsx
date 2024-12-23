import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DIALOG_ACTION_TYPE, ORDER_STATUS_LIST } from '@/utils/constants';

import FormDialog from '@/components/dialogs/FormDialog';
import { FormField } from '@/components/shadcnUI/form';

import DataTable from '@/components/table/DataTable';
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation
} from '@/redux/apis/ordersApi';
import { ordersTableColumns } from '@/components/table/columns';
import RadioGroupField from '@/components/inputs/RadioGroupField';
import OrdersTableToolbar from './OrdersTable/OrdersTableToolbar';
import SelectField from '@/components/inputs/SelectField';
import { getLatestLogStatus } from '@/utils/orderUtils';
import { updateOrderStatusFormSchema } from '@/validations/orderSchema';
import { cn } from '@/utils/classUtils';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';

const OrdersManagerPage = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar?.isSidebarOpen);
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: ordersData, isFetching } = useGetOrdersQuery();
  const [updateOrderStatus, updateOrderStatusState] =
    useUpdateOrderStatusMutation();

  const orderStatusForm = useForm({
    resolver: zodResolver(updateOrderStatusFormSchema)
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      orderStatusForm.reset({
        orderStatus: getLatestLogStatus(dialogData?.rowData.logs),
        paymentStatus:
          dialogData.rowData?.payment.status === 'paid' ? true : false
      });
    }
  }, [dialogData, orderStatusForm]);

  useApiToastNotifications({
    isSuccess: updateOrderStatusState.isSuccess,
    successMessage: 'Cập nhật trạng thái đơn hàng thành công!',
    isLoading: updateOrderStatusState.isLoading,
    loadingMessage: 'Đang cập nhật trạng thái đơn hàng...',
    isError: updateOrderStatusState.isError,
    error: updateOrderStatusState.error,
    fallbackErrorMessage: 'Cập nhật trạng thái đơn hàng thất bại!'
  });

  const handleUpdateOrderStatus = (values) => {
    updateOrderStatus({
      id: selectedIds[0],
      ...values,
      paymentStatus: Boolean(values.paymentStatus)
    });
  };

  return (
    <div>
      <DataTable
        data={ordersData?.results}
        loading={isFetching}
        columns={ordersTableColumns}
        className={cn(
          'transition-width duration-200',
          !isSidebarOpen
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        )}
        containerClassname='max-h-[calc(100vh-180px)]'
        tableToolbar={OrdersTableToolbar}
      />

      {triggeredBy === DIALOG_ACTION_TYPE.UPDATE_ORDER_STATUS && (
        <FormDialog
          form={orderStatusForm}
          onSubmit={handleUpdateOrderStatus}
          title='Chỉnh sửa trạng thái đơn hàng'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        >
          <FormField
            control={orderStatusForm.control}
            name='paymentStatus'
            render={({ field }) => (
              <RadioGroupField
                field={field}
                label='Chọn trạng thái thanh toán'
                options={[
                  {
                    label: 'Chưa thanh toán',
                    value: false
                  },
                  {
                    label: 'Đã thanh toán',
                    value: true
                  }
                ]}
              />
            )}
          />
          <FormField
            control={orderStatusForm.control}
            name='orderStatus'
            render={({ field }) => (
              <SelectField
                field={field}
                label='Chọn trạng thái đơn hàng'
                items={ORDER_STATUS_LIST}
              />
            )}
          />
        </FormDialog>
      )}
    </div>
  );
};

export default OrdersManagerPage;
