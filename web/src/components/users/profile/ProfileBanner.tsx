// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography, Avatar } from '@material-ui/core';
// @types
import { FetchedUser } from '../../../@types/user';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({
  '&:before': {
    top: 0,
    left: 0,
    zIndex: 9,
    width: '100%',
    content: "''",
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}));

const CoverImgStyle = styled('img')(({
  zIndex: 8,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  left: 0
}));

// ----------------------------------------------------------------------

type ProfileBannerProps = {
  user: FetchedUser | null;
};

export default function ProfileBanner({ user }: ProfileBannerProps) {
  console.log(user)
  return (
    <RootStyle>
      <InfoStyle>
        <Avatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
            backgroundColor: 'white'
          }}
          src={user?.avatar}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="h4">{user?.fullName}</Typography>
          <Typography variant="h6" sx={{ opacity: 0.72 }}>{user?.username}</Typography>
        </Box>
      </InfoStyle>
      <CoverImgStyle alt="profile cover" src={user?.coverImage} />
    </RootStyle>
  );
}
