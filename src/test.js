import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = () => {
  return (
    <TextField
      label="Custom TextField"
      variant="outlined"
      sx={{
        '& .MuiInputBase-root': {
          height: 40, // Adjust the height
        },
        '& .MuiInputLabel-root': {
          fontSize: '0.875rem',
          lineHeight: '0.7em',
          padding: '1px',
          top: -2 // Adjust the font size of the label
        },
        '& .MuiInputBase-input': {
          padding: '10px 14px', // Adjust the padding to fit the height
          fontSize: '0.875rem', // Adjust the font size of the input text
        },
        '& .MuiInputBase-input::placeholder': {
          fontSize: '0.75rem', // Adjust the font size of the placeholder text
        },
      }}
    />
  );
};

export default CustomTextField;
