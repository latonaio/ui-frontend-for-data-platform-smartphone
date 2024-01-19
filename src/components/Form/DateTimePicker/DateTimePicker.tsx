import DateFnsUtils from '@date-io/date-fns';
import { DateTimePickerStyle } from './DateTimePicker.style';
import { clsx } from 'clsx';
import {
  DateTimePicker as MuiDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { DateType } from '@date-io/type';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

interface DateTimePickerProps {
  className?: string;
  currentValue: any;
  isEditing?: boolean;
  onChange?: (value: { date: string, time: string }) => void;
  onClose?: () => void;
  parseDateFormat?: string;
}

// v3.3 のドキュメントのデモがないので注意
export const DateTimePicker = ({
                                 className,
                                 currentValue,
                                 onChange,
                                 parseDateFormat,
                                 isEditing,
                               }: DateTimePickerProps) => {
  const isInvalidDate = (date: Date) => Number.isNaN(date.getTime());

  const [date, setDate] = useState<Date | null>(new Date());

  const changeDateHandler = (newDate: Date | null): void => {
    setDate(newDate);
  };

  useEffect(() => {
    let dateTime = null;

    if (!isInvalidDate(new Date(currentValue))) {
      dateTime = new Date(currentValue);
    } else {
      dateTime = new Date();
    }

    changeDateHandler(dateTime);
  }, [currentValue]);

  return (
    <DateTimePickerStyle
      className={clsx(
        '',
        className
      )}
    >
      <div className={`${!isEditing ? '' : 'hidden'} datePickerTitle`}>
        {currentValue}
      </div>
      <div className={`${!isEditing ? 'hidden' : ''}`}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiDateTimePicker
            views={['year', 'month', 'date', 'hours', 'minutes']}
            value={date}
            format={parseDateFormat || 'yyyy-MM-dd HH:mm'}
            onChange={(value: DateType | null = new Date()) => {
              if (!value) {
                return;
              }

              const parsedDate = format(
                new Date(value),
                parseDateFormat || 'yyyy-MM-dd'
              );

              const parsedTime = format(
                new Date(value),
                parseDateFormat || 'HH:mm'
              );

              changeDateHandler(value);
              onChange && onChange({
                date: parsedDate,
                time: parsedTime,
              });
            }}
          ></MuiDateTimePicker>
        </MuiPickersUtilsProvider>
      </div>
    </DateTimePickerStyle>
);
};
