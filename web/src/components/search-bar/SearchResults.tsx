// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// components
import UserItem from '../users/UserItem';
// @types
import { ListedUser } from '../../@types/user';

// -------------------------------------------------------------------

type SearchResultsProps = {
  users: ListedUser[];
}

export default function SearchResults({ users }: SearchResultsProps) {

  const APPBAR_MOBILE = 64;
  const APPBAR_DESKTOP = 92;

  const SearchResultsStyle = styled('div')(({ theme }) => ({
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'white',
    top: APPBAR_MOBILE,
    borderRadius: '1.5rem',
    width: '70%',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      width: '30%',
      top: APPBAR_DESKTOP
    },
    [theme.breakpoints.down('md')]: {
      left: 10
    }
  }));

  return (
    <SearchResultsStyle>
      {users.length > 0
        ? users.map(user => (
          <UserItem key={user.id} user={user} />
        ))
        : <Typography
          variant="subtitle2"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightBold' }}
        >
          Sorry, we didn't find any user matching this search.
        </Typography>
      }
    </SearchResultsStyle>
  )
}
