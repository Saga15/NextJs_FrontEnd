import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerProps {
  selected?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  isClearable?: boolean;
  dateFormat?: string;
  showMonthYearPicker?: boolean;
  showYearPicker?: boolean;
  disabled?: boolean;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  timeIntervals?: number;
  timeCaption?: string;
  className?: string;
  showYearDropdown?: boolean;
  yearDropdownItemNumber?: number;
  showMonthDropdown?: boolean;
  showMonthYearDropdown?: any;
  scrollableYearDropdown?: boolean;
  errorMessage?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const {
    selected,
    startDate,
    endDate,
    onChange,
    minDate,
    maxDate,
    isClearable,
    dateFormat,
    showMonthYearPicker,
    showYearPicker,
    disabled,
    showTimeSelect,
    showTimeSelectOnly,
    timeIntervals,
    timeCaption,
    className,
    showYearDropdown,
    yearDropdownItemNumber,
    showMonthDropdown,
    showMonthYearDropdown,
    scrollableYearDropdown,
    errorMessage
  } = props;

  return (
    <>
      <DatePicker
        selected={selected}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        isClearable={isClearable}
        disabled={disabled}
        dateFormat={dateFormat}
        showMonthYearPicker={showMonthYearPicker}
        showYearPicker={showYearPicker}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        timeIntervals={timeIntervals}
        timeCaption={timeCaption}
        className={className}
        showYearDropdown={showYearDropdown}
        yearDropdownItemNumber={yearDropdownItemNumber}
        showMonthDropdown={showMonthDropdown}
        showMonthYearDropdown={showMonthYearDropdown}
        scrollableYearDropdown={scrollableYearDropdown}
      />
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </>
  );
};

export default DateTimePicker;
