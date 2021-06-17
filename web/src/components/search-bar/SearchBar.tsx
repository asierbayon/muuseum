import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import searchFill from '@iconify-icons/eva/search-fill';
import closeFill from '@iconify-icons/eva/close-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Input,
  Slide,
  IconButton,
  InputAdornment,
  ClickAwayListener
} from '@material-ui/core';
// components 
import SearchResults from './SearchResults';
// redux
import { useSelector, useDispatch, RootState } from '../../redux/store';
import { searchUsers } from '../../redux/slices/users';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchBarContainerStyle = styled('div')(({ theme }) => ({
  width: '70%',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    width: '40%',
  }
}));

const SearchbarStyle = styled('div')(({ theme }) => ({
  maxWidth: '100vw',
  display: 'flex',
  backgroundColor: 'white',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',

  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP / 2,
    padding: theme.spacing(0, 5),
    borderRadius: '1.5rem',
    width: '50vw'
  },
  [theme.breakpoints.down('md')]: {
    width: '100vw',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 99,
  }
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const dispatch = useDispatch();
  const { userList } = useSelector(
    (state: RootState) => state.users
  );

  const [isOpen, setOpen] = useState(false);
  const [input, setInput] = useState('');


  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target?.value);
      dispatch(searchUsers(event.target?.value));
  }

  return (
    <ClickAwayListener onClickAway={handleClose} >
      <SearchBarContainerStyle >
        {!isOpen ?
          <IconButton onClick={handleOpen} sx={{ mr: 1 }}>
            <Icon icon={searchFill} width={20} height={20} />
          </IconButton>
          : null
        }

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              onChange={handleSearch}
              defaultValue={input}
              autoFocus
              disableUnderline
              fullWidth
              placeholder="Search…"
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              startAdornment={
                <InputAdornment position="start" sx={{ marginLeft: 3 }} >
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="start" onClick={handleClose}>
                  <Box
                    component={Icon}
                    icon={closeFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20, cursor: 'pointer' }}
                  />
                </InputAdornment>
              }
            />
          </SearchbarStyle>
        </Slide>
        {isOpen && input && <SearchResults users={userList} />}
      </SearchBarContainerStyle>
    </ClickAwayListener>
  );
}
