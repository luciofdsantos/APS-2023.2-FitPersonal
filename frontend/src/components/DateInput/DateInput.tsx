import { TextField } from '@mui/material';
import React from 'react';

interface DateInputProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
}

export default function DateInput({
  label,
  value,
  onChange,
  disabled = false,
  disablePast = false,
  disableFuture = false
}: DateInputProps) {
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
}
