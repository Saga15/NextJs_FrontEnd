import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

interface TextAreaComponentProps {
  label?: string;
  placeholder?: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  inputClass?: string;
  type?: string;
  containerClass?: string;
  errorMessage?: string;
  disabled?: boolean;
  rows?: number;
  helpText?: string;
}

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  label,
  placeholder,
  id,
  value,
  onChange,
  name,
  inputClass,
  type,
  containerClass,
  errorMessage,
  disabled,
  rows,
  helpText
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Form.Group className={containerClass}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as='textarea'
        id={id}
        rows={rows || 2}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        name={name}
        type={type}
        placeholder={placeholder}
        className={inputClass}
        disabled={disabled}
      />
      {helpText && <div><Form.Text muted>{helpText}</Form.Text></div>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </Form.Group>
  );
};

export default TextAreaComponent;
