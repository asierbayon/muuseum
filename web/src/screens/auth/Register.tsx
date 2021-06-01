import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Link, Container, Typography } from '@material-ui/core';
import MHidden from '../../components/@material-extend/MHidden';
import RegisterForm from '../../components/auth/RegisterForm';
import Logo from '../../components/Logo';
// hooks
import useLocales from '../../hooks/useLocales';

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
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(5, 0, 0, 0)
  }
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { t } = useLocales();
  return (
    <RootStyle>
      <HeaderStyle>
        <RouterLink to="/">
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
            {t('register.login.text')} &nbsp;
            <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
              {t('register.login.action')}
            </Link>
          </Typography>
        </MHidden>
      </HeaderStyle>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 5, mb: 15 }}>
            {t('register.salutation')}
          </Typography>
          <img alt="register" src="/static/illustrations/post.svg" style={{ padding: '0 50px' }} />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('register.title')}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{t('register.subtitle')}</Typography>
          </Box>

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            {t('form.terms.intro')}&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              {t('form.terms.termsOfService')}
            </Link>
            &nbsp;{t('form.terms.and')}&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              {t('form.terms.privacyPolicy')}
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              {t('form.register.login.text')}&nbsp;
              <Link to="/login" component={RouterLink}>
                {t('form.register.login.action')}
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
