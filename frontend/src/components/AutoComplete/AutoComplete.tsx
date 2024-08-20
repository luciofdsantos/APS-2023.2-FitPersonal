import React from 'react';
import { Checkbox, TextField, Autocomplete } from '@mui/material';

interface SelectOptionType {
  id?: string | number;
  nome: string;
  carga: number;
  fim: string;
  finalizado: boolean;
  grupoMuscular: string;
  inicio: string;
  repeticoes: number;
  series: number;
}

interface AutoCompleteProps {
  name: string;
  label: string;
  options: SelectOptionType[];
  optionLabel: keyof SelectOptionType;
  values: SelectOptionType[];
  setValue: (data: SelectOptionType[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  error?: string;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  options,
  label,
  optionLabel,
  values,
  setValue,
  multiple = false,
  disabled = false,
  fullWidth = true,
  variant = 'outlined',
  error = ''
}) => {
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: SelectOptionType[] | SelectOptionType | null
  ) => {
    if (newValue === null) {
      setValue([]);
    } else if (Array.isArray(newValue)) {
      setValue(newValue);
    } else {
      setValue([newValue]);
    }
  };

  const filterOptions = (options: SelectOptionType[]) => {
    if (multiple) {
      return options.filter(
        (option) => !values.some((value) => value.id === option.id)
      );
    }
    return options;
  };

  return (
    <Autocomplete
      multiple={multiple}
      id="autocomplete"
      options={options}
      getOptionLabel={(option) => option[optionLabel] as string}
      value={values}
      onChange={handleChange}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.id}>
          {multiple && (
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
          )}
          {option[optionLabel]}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={variant}
          error={!!error}
          helperText={error}
          fullWidth={fullWidth}
          label={label}
        />
      )}
      disabled={disabled}
    />
  );
};

export default AutoComplete;
