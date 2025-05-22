/* eslint no-unneeded-ternary: "error" */
import React, { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { TextInput } from '.';

function PasswordComponent(props:any) {
  const [switchItem, setSwitchItem] = useState(false);

  const {
    label,
    placeholder,
    id,
    value,
    onInputChange,
    name,
    type,
    containerClass,
    errorMessage,
    minLength,
    asterisk,
    switchElement,
    autoComplete,
    maxLength
  } = props;

  const handlePasswordView = (e:any) => {
    e.preventDefault();
    setSwitchItem(!switchItem);
  };

  return (
    <InputGroup className="change-password-type">
      <TextInput
        onInputChange={onInputChange}
        name={name}
        containerClass={containerClass}
        label={label}
        value={value}
        minLength={minLength}
        maxlength={maxLength}
        type={switchItem ? 'text' : type}
        asterisk={asterisk}
        placeholder={placeholder}
        id={id}
        errorMessage={errorMessage}
        autoComplete={autoComplete}
      />
      {switchElement && (
        <div className='input-group-append'>
          <InputGroup.Text>
            <a href="javascipt:void(0)" onClick={handlePasswordView}>
              {' '}
              <img
                src={!switchItem ? '/visibility.svg' : '/eyePass.svg'}
                alt="Username"
              />{' '}
            </a>
          </InputGroup.Text>
        </div>
      )}
    </InputGroup>
  );
}

export default PasswordComponent