// material
import { Grid, Box, Typography } from '@material-ui/core';
//
import FollowerCard from './FollowerCard';
// @types
import { FetchedFollower } from '../../../@types/user';


// ----------------------------------------------------------------------

type FollowersTabProps = {
  label: string;
  followers: FetchedFollower[];
  onToggleFollow: (user: FetchedFollower) => void;
};

export default function FollowersTab({ label, followers, onToggleFollow }: FollowersTabProps) {
  
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {label}
      </Typography>

      <Grid container spacing={3}>
        {followers.map((follower: FetchedFollower) => (
          <Grid key={follower.user.id} item xs={12} md={4}>
            <FollowerCard
              isFollowed={follower.amIFollowing}
              follower={follower.user}
              onToggle={() => onToggleFollow(follower)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
