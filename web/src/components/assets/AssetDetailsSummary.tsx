// material
import { Button, Divider, Typography } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// @types
import { FetchedAssetInfo } from '../../@types/asset';
import { FetchedFollower, ListedUser } from '../../@types/user';
// components
import UserCard from '../users/profile/UserCard';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

type AssetDetailsSummaryProps = {
  asset: FetchedAssetInfo;
  user: ListedUser;
  onToggleFollow: (user: FetchedFollower) => void;
};

export default function AssetDetailsSummary({
  asset,
  user,
  onToggleFollow
}: AssetDetailsSummaryProps) {
  return (
    <RootStyle>
      <Typography variant="h5" paragraph>
        {asset.title}
      </Typography>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <UserCard
        user={user}
        isFollowed={user.amIFollowing}
        onToggle={() => onToggleFollow({ user, amIFollowing: user.amIFollowing })}
        shadow={false}
      />
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Button target="_blank" href={asset.url} variant="contained">
        View on Opensea
      </Button>
    </RootStyle>
  );
}
