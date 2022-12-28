import { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import React from 'react';

interface IHelperText {
  helper: string;
  content: string;
}
const HelperText = ({ helper, content }: IHelperText) => {
  const { focused } = useFormControl() || {};

  return (
    <FormHelperText
      style={{
        color: '#FF9E44',
        whiteSpace: 'nowrap',
        margin: '-9px 0 0 6px',
      }}
    >
      {content ? helper : ''}
    </FormHelperText>
  );
};

export default HelperText;
