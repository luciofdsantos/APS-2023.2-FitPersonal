import React from 'react';
import TextField from '@mui/material/TextField';

interface NumberInputProps {
  label: string;
  value: number | '';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  disabled = false
}) => (
  <TextField
    label={label}
    type="number"
    fullWidth
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);

export default NumberInput;
