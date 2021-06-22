import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import { Link as RouterLink, useHistory } from 'react-router-dom';
// material
import { Box, Card, Button, Avatar, Typography } from '@material-ui/core'; // @types
// hooks
import useAuth from '../../../hooks/useAuth';
// @types
import { ListedUser } from '../../../@types/user';
import { PATH_USERS } from '../../../routes/paths';

// ----------------------------------------------------------------------

type UserCardProps = {
  user: ListedUser;
  isFollowed: boolean | undefined;
  onToggle: VoidFunction;
  shadow?: boolean;
};

export default function UserCard({ user, isFollowed, onToggle, shadow }: UserCardProps) {
  const history = useHistory();
  const { fullName, username, avatar } = user;
  const { currentUser } = useAuth();
  const isMe = currentUser?.id === user.id;

  const handleEditProfile = () => {
    history.push(PATH_USERS.settings)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        boxShadow: shadow ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : 'none',
        borderRadius: '0.5rem'
      }}
    >
      <Avatar
        component={RouterLink}
        to={`/${username}`}
        alt={fullName}
        src={avatar}
        sx={{ width: 48, height: 48 }}
      />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {fullName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {username}
        </Typography>
      </Box>
      {typeof isFollowed !== undefined && !isMe ? (
        <Button
          size="small"
          onClick={onToggle}
          variant={isFollowed ? 'text' : 'outlined'}
          color={isFollowed ? 'primary' : 'inherit'}
          startIcon={isFollowed && <Icon icon={checkmarkFill} />}
        >
          {isFollowed ? 'Followed' : 'Follow'}
        </Button>
      ) : (
        <Button onClick={handleEditProfile} size="small" variant='outlined' color='primary' >
          Edit profile
        </Button>
      )}
    </Card>
  );
}

UserCard.defaultProps = {
  shadow: true
};
