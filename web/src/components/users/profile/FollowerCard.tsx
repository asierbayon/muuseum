import { Icon } from '@iconify/react';
import pinFill from '@iconify-icons/eva/pin-fill';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
// material
import { Box, Card, Button, Avatar, Typography } from '@material-ui/core'; // @types
// @types
import { Follower } from '../../../@types/user';

// ----------------------------------------------------------------------

type FollowerCardProps = {
  follower: Follower;
  isFollowed: boolean | undefined;
  onToggle: VoidFunction;
};

export default function FollowerCard({ follower, isFollowed, onToggle }: FollowerCardProps) {
  const { fullName, username, avatar } = follower;
  
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Avatar alt={fullName} src={avatar} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {fullName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component={Icon}
            icon={pinFill}
            sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
          />
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {username}
          </Typography>
        </Box>
      </Box>
      {typeof isFollowed !== undefined && (
        <Button
          size="small"
          onClick={onToggle}
          variant={isFollowed ? 'text' : 'outlined'}
          color={isFollowed ? 'primary' : 'inherit'}
          startIcon={isFollowed && <Icon icon={checkmarkFill} />}
        >
          {isFollowed ? 'Followed' : 'Follow'}
        </Button>
      )}
    </Card>
  );
}
