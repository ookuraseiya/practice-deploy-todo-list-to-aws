import { IconButton as MuiIconButton, IconButtonProps } from '@mui/material';

type Props = IconButtonProps;

const IconButton = ({ children, ...rest }: Props) => {
  return <MuiIconButton {...rest}>{children}</MuiIconButton>;
};

export default IconButton;
