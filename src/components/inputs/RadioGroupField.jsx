import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const RadioGroupField = ({
  field,
  label,
  options,
  containerClassName,
  radioGroupClassName,
  onValueChange
}) => {
  const handleValueChange = (value) => {
    if (onValueChange) {
      onValueChange(value, field);
    } else {
      field.onChange(value);
    }
  };
  return (
    <FormItem className={containerClassName}>
      {label && (
        <FormLabel className='mb-3 block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <RadioGroup
          onValueChange={handleValueChange}
          defaultValue={String(field.value)}
          className={`flex ${radioGroupClassName}`}
        >
          {options.map((option) => (
            <FormItem
              key={option.value}
              className='flex items-center space-x-3'
            >
              <FormControl>
                <RadioGroupItem value={String(option.value)} />
              </FormControl>
              <FormLabel className='!m-0 !ml-2 font-normal'>
                {option.label}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage className='text-sm font-normal' />
    </FormItem>
  );
};

export default RadioGroupField;
