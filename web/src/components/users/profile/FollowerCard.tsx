import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import personAddOutline from '@iconify-icons/eva/person-add-outline';
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
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 3,
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        borderRadius: '0.5rem'
      }}
    >
      <Avatar alt={fullName} src={avatar} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          {fullName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {username}
        </Typography>
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
