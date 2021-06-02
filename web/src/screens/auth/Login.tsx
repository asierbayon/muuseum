import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Link, Container, Typography } from '@material-ui/core';
// hooks
import useLocales from '../../hooks/useLocales';
// components
import MHidden from '../../components/@material-extend/MHidden';
import LoginForm from '../../components/auth/LoginForm';
import Logo from '../../components/Logo';
// routes
import { PATH_COMMON, PATH_AUTH } from '../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '93vw',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 0, 0, 3)
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  borderRadius: 10
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center'
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { t } = useLocales();

  return (
    <RootStyle>
      <HeaderStyle>
        <RouterLink to={PATH_COMMON.home}>
          <Logo />
        </RouterLink>
        <MHidden width="smDown">
          <Typography
            variant="body2"
            sx={{
              mt: { md: -2 },
              float: 'right'
            }}
          >
            {t('login.register.text')} &nbsp;
            <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              {t('login.register.action')}
            </Link>
          </Typography>
        </MHidden>
      </HeaderStyle>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 15, mb: 15 }}>
            {t('login.salutation')}
          </Typography>
          <img src="/static/illustrations/happy.svg" alt="login" style={{ padding: '0 50px' }} />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                {t('login.title')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{t('login.subtitle')}</Typography>
            </Box>
          </Box>

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              {t('login.register.text')}&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                {t('login.register.action')}
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
