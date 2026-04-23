import { Button as MuiButton, ButtonProps } from '@mui/material';

type Props = ButtonProps;

const Button = ({ children, ...rest }: Props) => {
  return <MuiButton {...rest}>{children}</MuiButton>;
};

export default Button;
