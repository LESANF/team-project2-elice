import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../Header/arrowdown.svg';

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  & select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    min-width: 0;
    display: block;
    width: 100%;
    padding: 8px 8px;
    font-size: inherit;
    line-height: inherit;
    border: 1px solid;
    border-radius: 4px;
    color: inherit;
    background-color: transparent;
    &:focus {
      border-color: red;
    }
  }
  & svg {
    scale: 2;
    padding: 0 90px 0 0;
  }
`;
const SelectWrapper = ({ children }: any) => (
  <SelectContainer>
    {children}
    <ArrowIcon />
  </SelectContainer>
);

export default SelectWrapper;
