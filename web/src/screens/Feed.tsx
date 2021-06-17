import { useEffect } from 'react';
// material
import { Box } from '@material-ui/core';
// redux
import { useSelector, useDispatch, RootState } from '../redux/store';
import { getFeed } from '../redux/slices/assets';
// @types
import { SingleAsset } from '../@types/asset';
//
import Asset from '../components/assets/Asset';
import Navbar from '../components/nav/Navbar';

export default function Feed() {
  const dispatch = useDispatch();
  const { feed } = useSelector(
    (state: RootState) => state.assets
  );

  useEffect(() => {
    dispatch(getFeed())
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {feed.map((asset: SingleAsset) => (
          <Asset key={asset.id} asset={asset} sx={{ mb: 3 }} />
        ))}
      </Box>
    </>
  );
}
