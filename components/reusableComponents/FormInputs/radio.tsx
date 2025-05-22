import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

// Define the structure for each radio option
interface Option {
  value?: string | number;
  label?: string;
}

interface RadioComponentProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  type?: 'radio';
  disabled?: boolean;
  options?: Option[];
  inputClass?: string;
  name?: string;
  containerClass?: string;
  label?: string;
  inline?: boolean;
  errorMessage?: string;
  helpText?: string;
}

const RadioComponent: React.FC<RadioComponentProps> = ({
  value,
  onChange,
  type,
  disabled,
  options,
  inputClass,
  name,
  containerClass,
  label,
  inline,
  errorMessage,
  helpText,
}) => {
  const [inputValue, setInputValue] = useState<string | number>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Form.Group className={containerClass}>
      <Form.Label>{label}</Form.Label>
      <div>
        {
          options?.map((op) => (
            <Form.Check
              key={op?.value} // Added key prop for better list rendering
              type={type}
              name={name}
              value={op?.value}
              onChange={(e) => {
                const newValue = e.target.value;
                setInputValue(newValue);
                if (onChange) onChange(newValue);
              }}
              inline={inline}
              label={op.label}
              disabled={disabled}
              className={inputClass}
              checked={inputValue === op.value}
            />
          ))}
      </div>
      {helpText && <div><Form.Text muted>{helpText}</Form.Text></div>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </Form.Group>
  );
};

export default RadioComponent;
