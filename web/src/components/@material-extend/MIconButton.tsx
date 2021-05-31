import { forwardRef } from 'react';
// material
import { alpha, useTheme } from '@material-ui/core/styles';
import { IconButton, IconButtonProps, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

interface MIconButtonProps extends Omit<IconButtonProps, 'color'> {
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
}

const MIconButton = forwardRef<HTMLButtonElement, MIconButtonProps>(
  ({ color = 'default', children, sx, ...other }, ref) => {
    const theme = useTheme();

    if (
      color === 'default' ||
      color === 'inherit' ||
      color === 'primary' ||
      color === 'secondary'
    ) {
      return (
        <Box>
          <IconButton ref={ref} color={color} sx={sx} {...other}>
            {children}
          </IconButton>
        </Box>
      );
    }

    return (
      <Box>
        <IconButton
          ref={ref}
          sx={{
            color: theme.palette[color].main,
            '&:hover': {
              bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
            },
            ...sx
          }}
          {...other}
        >
          {children}
        </IconButton>
      </Box>
    );
  }
);

export default MIconButton;
