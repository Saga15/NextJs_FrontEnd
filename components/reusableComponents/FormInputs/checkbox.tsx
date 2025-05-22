import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

interface Option {
  value: string | number;
  label: string;
}

interface CheckboxComponentProps {
  value?: (string | number)[];
  onChange?: (values: (string | number)[]) => void;
  type?: 'checkbox' | 'radio';
  disabled?: boolean;
  options?: Option[];
  inputClass?: string;
  containerClass?: string;
  label?: string;
  inline?: boolean;
  errorMessage?: string;
  helpText?: string;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = (props) => {
  const {
    value,
    onChange,
    type,
    disabled,
    options,
    inputClass,
    containerClass,
    label,
    inline,
    errorMessage,
    helpText
  } = props;

  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([]);

  useEffect(() => {
    const allValues = value.length ? [...value] : [];
    setSelectedValues([...allValues]);
  }, [value]);

  return (
    <Form.Group className={containerClass}>
      <Form.Label>{label}</Form.Label>
      <div>
        {
          options?.map((op) => (
            <Form.Check
              key={op.value}
              type={type}
              value={op.value}
              onChange={(e) => {
                const allValues = [...selectedValues];
                const currentValue = !Number.isNaN(e.target.value) ? Number(e.target.value) : e.target.value;
                const currentIndex = allValues.indexOf(currentValue);
                if (currentIndex > -1) allValues.splice(currentIndex, 1);
                else allValues.push(currentValue);
                setSelectedValues(allValues);
                if (onChange) onChange(allValues);
              }}
              label={op.label}
              disabled={disabled}
              className={inputClass}
              checked={selectedValues.includes(op.value)}
              inline={inline}
            />
          ))}
      </div>
      {helpText &&
        <div>
          <Form.Text muted>{helpText}
          </Form.Text>
        </div>
      }
      <Form.Text className="text-danger">{errorMessage}</Form.Text>
    </Form.Group>
  );
};

export default CheckboxComponent;
