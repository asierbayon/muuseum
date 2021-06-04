import { useContext } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
// components
import Searchbar from '../search-bar/SearchBar';
import AccountPopover from './AccountPopover';
// hooks
import useAuth from '../../hooks/useAuth';


// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({
  boxShadow: 'none',
  width: '100vw',
  backgroundColor: 'white',
  position: 'static'
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function Navbar() {

  const { currentUser } = useAuth();
  
  return (
    <RootStyle>
      <ToolbarStyle>
        <Searchbar />
        {currentUser &&
          <AccountPopover user={currentUser} />
        }
      </ToolbarStyle>
    </RootStyle>
  );
}
