import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { TypePlanosAlimentares } from 'src/types';

interface AutoCompletePlanoAlimentarProps {
  selectedValues: TypePlanosAlimentares.SelectOptionType[];
  onChange: (newValues: TypePlanosAlimentares.SelectOptionType[]) => void;
  error?: string;
  options: TypePlanosAlimentares.SelectOptionType[];
}

const AutoCompletePlanoAlimentar: React.FC<AutoCompletePlanoAlimentarProps> = ({
  selectedValues,
  onChange,
  error,
  options
}) => {
  return (
    <Autocomplete
      multiple
      options={options} // Use a propriedade options
      getOptionLabel={(option) => option.alimento} // Ajuste conforme necessário
      value={selectedValues}
      onChange={(event, newValue) =>
        onChange(newValue as TypePlanosAlimentares.SelectOptionType[])
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Refeições"
          variant="outlined"
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};

export default AutoCompletePlanoAlimentar;
