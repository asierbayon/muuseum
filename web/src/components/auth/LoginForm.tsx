import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Icon } from '@iconify/react';
import closeFill from '@iconify-icons/eva/close-fill';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
// material
import {
  Box,
  Button,
  Link,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert
} from '@material-ui/core';
import MIconButton from '../@material-extend/MIconButton';
// hooks
import useAuth from '../../hooks/useAuth';
import useLocales from '../../hooks/useLocales';
// services
import { login } from '../../services/users-service';

// ----------------------------------------------------------------------

type User = {
  email: string;
  password: string;
  remember: boolean;
  onSubmit?: string;
};

export default function LoginForm() {
  const history = useHistory();
  const { onUserChange } = useAuth();
  const { t } = useLocales();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [onSubmitError, setonSubmitError] = useState();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('form.errors.email.valid'))
      .required(t('form.errors.email.required')),
    password: Yup.string().required(t('form.errors.password.required'))
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
    setValue
  } = useForm<User>({
    mode: 'onBlur',
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      remember: true
    }
  });
  const onSubmit = handleSubmit(async (values) => {
    try {
      const user = await login({
        email: values.email,
        password: values.password
      });
      enqueueSnackbar(t('snackbar.login'), {
        variant: 'success',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      history.push('/');
      onUserChange(user);
    } catch (error) {
      const { onSubmit } = error.response.data.errors;
      console.log(onSubmit);
      setonSubmitError(onSubmit);
    }
  });

  useEffect(() => {
    if (!onSubmitError) return;
    setError('onSubmit', {
      type: 'manual',
      message: onSubmitError
    });
  }, [setError, onSubmitError]);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleRemember = () => {
    setValue('remember', !getValues('remember'));
  };

  return (
    <>
      {errors.onSubmit?.message && <Alert severity="error">{errors.onSubmit?.message}</Alert>}

      <form autoComplete="off" noValidate onSubmit={onSubmit}>
        <TextField
          fullWidth
          autoComplete="email"
          type="email"
          label={t('form.email')}
          {...register('email')}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          sx={{ my: 3 }}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label={t('form.password')}
          {...register('password')}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Box
          sx={{
            my: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <FormControlLabel
            control={
              <Checkbox {...register('remember')} onClick={handleRemember} defaultChecked />
              // TODO
            }
            label={t('form.remember')}
          />

          <Link component={RouterLink} variant="subtitle2" to="/reset-password">
            {t('form.resetPassword')}
          </Link>
        </Box>

        <Button fullWidth size="large" type="submit" variant="contained">
          {t('form.login')}
        </Button>
      </form>
    </>
  );
}
