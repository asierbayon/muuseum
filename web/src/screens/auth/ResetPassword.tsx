import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
// routes
import { PATH_AUTH, PATH_COMMON } from '../../routes/paths';
// components
import Logo from '../../components/Logo';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
// hooks
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center'
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  position: 'absolute',
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const { t } = useLocales();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle>
      <HeaderStyle>
        <RouterLink to={PATH_COMMON.home}>
          <Logo />
        </RouterLink>
      </HeaderStyle>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h4" gutterBottom>
                {t('reset.title')}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>{t('reset.subtitle')}</Typography>

              <ResetPasswordForm
                onSent={() => setSent(true)}
                onGetEmail={(value: string) => setEmail(value)}
              />

              <Button
                fullWidth
                size="large"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 1 }}
              >
                {t('reset.button-secondary')}
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                alt="sent email"
                src="/static/illustrations/new-email.svg"
                sx={{ mb: 5, width: '70%' }}
              />
              <Typography variant="h4" gutterBottom>
                Request sent successfully
              </Typography>
              <Typography>
                We have sent a confirmation email to &nbsp;
                <strong>{email}</strong>
                <br />
                Please check your email.
              </Typography>

              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 5 }}
              >
                Back
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
