import { Icon } from '@iconify/react';
import { useState, useRef } from 'react';
import personFill from '@iconify-icons/eva/person-fill';
import settings2Fill from '@iconify-icons/eva/settings-2-fill';
import { Link as RouterLink, useHistory } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar } from '@material-ui/core';
// services
import { logout } from '../../services/users-service';
// components
import MenuPopover from '../MenuPopover';
// hooks
import useAuth from '../../hooks/useAuth';
// @types
import { AuthUser } from '../../@types/authentication';
// routes
import { PATH_AUTH, PATH_USERS } from '../../routes/paths';

// ----------------------------------------------------------------------

type AccountPopoverProps = {
  user: AuthUser
}

export default function AccountPopover({user}: AccountPopoverProps) {
  console.log(user)
  const history = useHistory();
  const anchorRef = useRef(null);
  const { onUserChange } = useAuth();
  const [open, setOpen] = useState(false);

  const MENU_OPTIONS = [
    {
      label: 'Profile',
      icon: personFill,
      linkTo: `/${user?.username}`
    },
    {
      label: 'Settings',
      icon: settings2Fill,
      linkTo: PATH_USERS.settings
    }
  ];

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      onUserChange(null);
      history.push(PATH_AUTH.login);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Avatar
        ref={anchorRef}
        alt={user?.fullName}
        src={user?.avatar}
        onClick={handleOpen}
        sx={{
          cursor: 'pointer',
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      />
      <MenuPopover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        sx={{
          mt: 1,
          width: 220
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap fontWeight="fontWeightBold">
            {user?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.fullName}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />
            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            sx={{ textTransform: 'none', fontWeight: 'fontWeightBold', borderRadius: '10px' }}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
