import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import eyeFill from '@iconify-icons/eva/eye-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
// material
import { Box, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { Button } from '@material-ui/core';
// services
import { register as registerUser } from '../../services/users-service';
// hooks
import useLocales from '../../hooks/useLocales';

// -------------------------------------------------------------------------

type User = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

export default function RegisterForm() {
  const { t } = useLocales();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorsFromApi, setErrorsFromApi] = useState<object | undefined>();

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .max(50, t('form.errors.fullName.long'))
      .required(t('form.errors.fullName.required')),
    username: Yup.string()
      .min(3, t('form.errors.username.short'))
      .max(35, t('form.errors.username.long'))
      .required(t('form.errors.username.required')),
    email: Yup.string()
      .email(t('form.errors.email.valid'))
      .required(t('form.errors.email.required')),
    password: Yup.string().required(t('form.errors.password.required'))
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<User>({
    mode: 'onBlur',
    resolver: yupResolver(RegisterSchema)
  });
  const onSubmit = handleSubmit(async (values) => {
    try {
      await registerUser({
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        password: values.password
      });
    } catch (error) {
      setErrorsFromApi(error.response.data.errors);
    }
  });

  useEffect(() => {
    if (!errorsFromApi) return;
    const keys = Object.keys(errorsFromApi) as (keyof User)[];
    const values = Object.values(errorsFromApi);

    for (let i = 0; i < keys.length; i++) {
      setError(keys[i], {
        type: 'manual',
        message: values[i]
      });
    }
  }, [errorsFromApi]);

  return (
    <form autoComplete="off" noValidate onSubmit={onSubmit}>
      <TextField
        fullWidth
        label={t('form.fullName')}
        {...register('fullName')}
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
      />

      <TextField
        fullWidth
        autoComplete="username"
        type="text"
        label={t('form.username')}
        {...register('username')}
        error={Boolean(errors.username?.message)}
        helperText={errors.username?.message}
        sx={{ my: 3 }}
      />

      <TextField
        fullWidth
        autoComplete="email"
        type="email"
        label={t('form.email')}
        {...register('email')}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        autoComplete="current-password"
        type={showPassword ? 'text' : 'password'}
        label={t('form.password')}
        {...register('password')}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                <Icon icon={showPassword ? eyeFill : eyeOffFill} />
              </IconButton>
            </InputAdornment>
          )
        }}
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
      />
      <Box sx={{ mt: 3 }}>
        <Button fullWidth size="large" type="submit" variant="contained">
          {t('form.register')}
        </Button>
      </Box>
    </form>
  );
}
