import * as React from 'react';
import Select, {
  selectClasses,
  SelectProps,
  SelectRootSlotProps,
} from '@mui/base/Select';
import Option, { optionClasses } from '@mui/base/Option';
import Popper from '@mui/base/Popper';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

export const CustomSelect = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
});

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  //IBM Plex Sans, sans-serif
  ({ theme }) => `
  font-family: SegoeUISemibold;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 200px;
  padding: 12px;
  border-radius: 20px;
  text-align: center;
  line-height: 1.5;
  background: ${theme.palette.background.paper};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.highlightText.main};
  position: relative;
  cursor: pointer;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    opacity: 0.8;
  }

  &.${selectClasses.focusVisible} {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: SegoeUISemibold;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 0px 0;
  min-width: 200px;
  border-radius: 20px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.background.paper};
  border: 0.5px solid ${grey[900]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  z-index: 100;
  `
);
// box-shadow: 0px 4px 30px ${
//   theme.palette.mode === "dark" ? grey[900] : grey[200]
// };

export const StyledOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  color: ${theme.palette.highlightText.main};
  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background: ${theme.palette.background.paper};
  }

  &.${optionClasses.highlighted} {
    background: ${theme.palette.background.paper};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background: ${theme.palette.background.paper};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
  }
  `
);

const StyledPopper = styled(Popper)`
  z-index: 1000;
`;
