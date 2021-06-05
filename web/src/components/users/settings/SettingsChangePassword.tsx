import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, TextField, Button } from '@material-ui/core';
// services
import { update } from '../../../services/users-service';
// @types
import { UserChangePassword } from '../../../@types/user';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)({
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  borderRadius: '1rem'
});

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const [errorsFromApi, setErrorsFromApi] = useState<object>({});

  const ChangePassWordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    passwordMatch: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
    control
  } = useForm<UserChangePassword>({
    resolver: yupResolver(ChangePassWordSchema),
    mode: 'onBlur'
  });
  const onSubmit = handleSubmit(async (values) => {
    try {
      await update({
        password: values.password,
        passwordMatch: values.passwordMatch
      });
    } catch (error) {
      setErrorsFromApi(error.response.data.errors);
    }
  });

  useEffect(() => {
    if (Object.keys(errorsFromApi).length === 0) return;
    const keys = Object.keys(errorsFromApi) as (keyof UserChangePassword)[];
    const values = Object.values(errorsFromApi);

    for (let i = 0; i < keys.length; i++) {
      setError(keys[i], {
        type: 'manual',
        message: values[i]
      });
    }
  }, [errorsFromApi, setError]);

  return (
    <CardStyle sx={{ p: 3 }}>
      <form autoComplete="off" noValidate onSubmit={onSubmit}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              autoComplete="on"
              type="password"
              label="New Password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...field}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          name="passwordMatch"
          control={control}
          render={({ field }) => (
            <TextField
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirm New Password"
              {...field}
              error={Boolean(errors.passwordMatch?.message)}
              helperText={errors.passwordMatch?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Box>
      </form>
    </CardStyle>
  );
}
