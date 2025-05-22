import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

interface InputComponentProps {
  label?: string;
  placeholder?: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  inputClass?: string;
  inputIcon?: React.ReactNode;
  type?: string;
  containerClass?: string;
  inputVarible?: string;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  onInputChange?: (e: any) => void;
  helpText?: string;
  asterisk?: string;
  autoComplete?:string;
  minLength?:number;
  maxlength?:number;

}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeholder,
  id,
  value,
  onChange,
  name,
  inputClass,
  inputIcon,
  type,
  containerClass,
  inputVarible,
  errorMessage,
  disabled,
  required,
  onInputChange,
  helpText,
  asterisk,
  autoComplete,
  minLength,
  maxlength,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const renderInput = () => {
    return (
      <Form.Control
        id={id}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (onChange) onChange(e.target.value);
          if (onInputChange) onInputChange(e);
        }}
        name={name}
        type={type}
        placeholder={placeholder}
        className={inputClass}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
      />
    );
  };

  return (
    <Form.Group className={containerClass}>
      {label &&
        <Form.Label className="w-100 text-start">
          {" "}
          {label}
          <span className='text-danger'>{asterisk}</span>{" "}
        </Form.Label>
      }
      {inputIcon && <>{inputIcon}</>}
      {inputVarible ? (
        <InputGroup>
          <InputGroup.Text>{inputVarible}</InputGroup.Text>
          {renderInput()}
        </InputGroup>
      ) : (
        <>{renderInput()}</>
      )}
      {helpText && <div><Form.Text muted>{helpText}</Form.Text></div>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </Form.Group>
  );
};

export default InputComponent;
