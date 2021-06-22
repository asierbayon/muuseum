import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Grid, Skeleton, Container, Typography } from '@material-ui/core';
// redux
import { useDispatch, useSelector, RootState } from '../redux/store';
import { onToggleFollow } from '../redux/slices/users';
import { getAsset } from '../redux/slices/assets';
// components
import AssetDetailsImage from '../components/assets/AssetImage';
import AssetDetailsSummary from '../components/assets/AssetDetailsSummary';
// @types
import { FetchedFollower } from '../@types/user';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

// ----------------------------------------------------------------------

export default function AssetDetail() {
  const { id } = useParams<{ id: string }>();
  const [targetedUser, setTargetedUser] = useState<FetchedFollower | null>(null);
  const dispatch = useDispatch();
  const { asset, owner, error } = useSelector((state: RootState) => state.assets);

  useEffect(() => {
    dispatch(getAsset(id));
  }, [dispatch, id, targetedUser]);

  const handleToggleFollow = async (value: FetchedFollower) => {
    await dispatch(onToggleFollow(value));
    setTargetedUser(value);
  };

  return (
    <Container>
      {asset && owner && (
        <>
          <Card>
            <Grid container>
              <Grid item xs={12} md={6} lg={7} p={1}>
                <AssetDetailsImage url={asset.image} />
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                <AssetDetailsSummary user={owner} asset={asset} onToggleFollow={handleToggleFollow}/>
              </Grid>
            </Grid>
          </Card>
        </>
      )}

      {!asset && SkeletonLoad}

      {error && <Typography variant="h6">404 Product not found</Typography>}
    </Container>
  );
}
