import React from 'react';
import { Form } from 'react-bootstrap';

interface Option {
  value?: string | number;
  name?: string;
}

interface DropdownComponentProps {
  label?: string;
  options?: Option[];
  onSelectOptions?: (e: any) => void;
  name?: string;
  value?: any;
  placeholder?: string;
  multiple?: boolean;
  inputClass?: string;
  containerClass?: string;
  errorMessage?: string;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  label,
  options,
  onSelectOptions,
  name,
  value,
  placeholder,
  multiple,
  inputClass,
  containerClass,
  errorMessage
}) => {
  return (
    <>
      <Form.Group className={containerClass} controlId="formSelect">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="select"
          className={inputClass}
          value={value}
          name={name}
          multiple={multiple}
          placeholder={placeholder}
          onChange={(e) => {
            if (onSelectOptions) onSelectOptions(e);
          }}
        >
          {
            options?.map((op: any) => (
              <option key={op?.value} value={op?.value}>
                {op.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </>
  );
};

export default DropdownComponent;
