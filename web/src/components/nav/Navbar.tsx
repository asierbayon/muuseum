import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { AppBar, Toolbar, Box, Link } from '@material-ui/core';
// components
import Searchbar from '../search-bar/SearchBar';
import AccountPopover from './AccountPopover';
import Logo from '../Logo';
// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_COMMON } from '../../routes/paths';
import MHidden from '../@material-extend/MHidden';

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)({
  boxShadow: 'none',
  backgroundColor: 'white',
  position: 'static'
});

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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Link to={PATH_COMMON.home} component={RouterLink} sx={{ display: 'inline-flex' }}>
            <Logo height={30} marginRight={5} />
          </Link>
          <MHidden width="mdDown">
            <Searchbar />
          </MHidden>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <MHidden width="mdUp">
            <Searchbar />
          </MHidden>
          {currentUser && <AccountPopover user={currentUser} />}
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
}
