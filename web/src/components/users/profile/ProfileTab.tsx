import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Grid } from '@material-ui/core';
// @types
import { SimpleSingleAsset } from '../../../@types/asset';

// ----------------------------------------------------------------------

type ProfileTabProps = {
  assets: SimpleSingleAsset[] | null;
};

export default function ProfileTab({ assets }: ProfileTabProps) {
  return (
    <Grid container>
      {assets &&
        assets.map((asset) => (
          <Grid
            item
            key={asset.id}
            xs={4}
            sx={{
              paddingBottom: '30%',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Box
              component={RouterLink}
              to={`/assets/${asset.id}`}
              sx={{
                height: '95%',
                width: '95%',
                borderRadius: '0.5rem',
                position: 'absolute',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${asset.image})`
              }}
            />
          </Grid>
        ))}
    </Grid>
  );
}
