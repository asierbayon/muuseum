import { useState, useEffect } from 'react';
// material
import { Box } from '@material-ui/core';
// services
import { feed } from '../services/assets-service';
// @types
import { SingleAsset } from '../@types/asset';
//
import Asset from '../components/assets/Asset';
import Navbar from '../components/nav/Navbar';

export default function Feed() {
  const [assets, setAssets] = useState<SingleAsset[] | []>([]);

  const fetchAssets = async () => {
    const fetchedAssets = await feed();
    setAssets(fetchedAssets);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

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
        {assets.map((asset: SingleAsset) => (
          <Asset key={asset.id} asset={asset} sx={{ mb: 3 }} />
        ))}
      </Box>
    </>
  );
}
