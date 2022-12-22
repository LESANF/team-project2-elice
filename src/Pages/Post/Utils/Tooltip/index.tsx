import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const TagToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    lineHeight: '1.5',
    backgroundColor: '#343A40',
    padding: '12px',
    color: '#fff',
    maxWidth: 280,
    fontSize: theme.typography.pxToRem(12),
  },
}));

export default TagToolTip;
