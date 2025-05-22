import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Form } from 'react-bootstrap';

// Define the structure for each option in the dropdown
interface Option {
  value?: string | number;
  label?: string;
}

interface SelectDropdownProps {
  label?: string;
  value?: Option | Option[] | null;
  name?: string;
  inputClass?: string;
  isMulti?: boolean;
  onChange?: (selectedOption: any) => void;
  options?: Option[];
  containerClass?: string;
  errorMessage?: string;
  helpText?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  value,
  name,
  inputClass,
  isMulti = false,
  onChange,
  options,
  containerClass,
  errorMessage,
  helpText,
}) => {
  const [inputValue, setInputValue] = useState<any>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Form.Group className={containerClass}>
      {label && <Form.Label>{label}</Form.Label>}
      <Select
        value={inputValue}
        onChange={(e) => {
          setInputValue(e);
          if (onChange) onChange(e);
        }}
        name={name}
        className={inputClass}
        options={options}
        isMulti={isMulti}
      />
      {helpText && <div><Form.Text muted>{helpText}</Form.Text></div>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </Form.Group>
  );
};

export default SelectDropdown;
