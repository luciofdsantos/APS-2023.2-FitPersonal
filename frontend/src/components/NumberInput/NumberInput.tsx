import { TextField } from '@mui/material';
import React from 'react';

interface NumberInputProps {
  label: string;
  value: number | '';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export default function NumberInput({
  label,
  value,
  onChange,
  disabled = false
}: NumberInputProps) {
  return (
    <TextField
      label={label}
      type="number"
      fullWidth
      value={value}
      onChange={onChange}
      disabled={disabled}
      inputProps={{
        min: 0,
        step: 'any'
      }}
    />
  );
}
