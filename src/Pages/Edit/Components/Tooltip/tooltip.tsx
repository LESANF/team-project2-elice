import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ReactComponent as EditIcon } from './edit.svg';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    followCursor
    placement="right-start"
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#2A2A2A',
    borderRadius: '8px',
    padding: '7px 10px',
  },
}));

const CustomizedTooltips = ({ children, content }: any) => (
  <HtmlTooltip
    title={
      <div style={{ display: 'flex' }}>
        <EditIcon />
        <p
          style={{
            fontFamily: 'Noto Sans KR',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '11px',
            lineHeight: '14px',
            textAlign: 'center',
            color: '#FFFFFF',
            marginLeft: '7px',
          }}
        >
          {content}
        </p>
      </div>
    }
  >
    {children}
  </HtmlTooltip>
);

export default CustomizedTooltips;

export const NameTooltip = () => {};

export const ProfileTooltip = () => {};
