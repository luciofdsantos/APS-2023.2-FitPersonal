import React from 'react';
import { TextField } from '@mui/material';

interface DateInputProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  disablePast = false,
  disableFuture = false
}) => {
  const today = new Date().toISOString().split('T')[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  return (
    <TextField
      label={label}
      type="date"
      fullWidth
      value={value}
      onChange={onChange}
      InputLabelProps={{ shrink: true }}
      disabled={disabled}
      inputProps={{
        min: disablePast ? today : undefined,
        max: disableFuture ? tomorrowDate : undefined
      }}
    />
  );
};

export default DateInput;
