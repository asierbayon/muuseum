import * as Yup from 'yup';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// material
import { TextField, Button } from '@material-ui/core';
// hooks
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

type InitialValues = {
  email: string;
};

type ResetPasswordFormProps = {
  onSent: VoidFunction;
  onGetEmail: (value: string) => void;
};

export default function ResetPasswordForm({ onSent, onGetEmail }: ResetPasswordFormProps) {
  const { t } = useLocales();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email(t('form.errors.email.valid')).required(t('form.errors.email.required'))
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<InitialValues>({
    mode: 'onBlur',
    resolver: yupResolver(ResetPasswordSchema)
  });
  const { isSubmitSuccessful } = useFormState({ control });
  const onSubmit = handleSubmit(async (values) => {
    try {
      /* const user = await resetPassword({
        email: values.email // TODO
      }); */
      onSent();
      onGetEmail(values.email);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form autoComplete="off" noValidate onSubmit={onSubmit}>
      <TextField
        fullWidth
        {...register('email')}
        type="email"
        label={t('form.email')}
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        sx={{ mb: 3 }}
      />
      <Button fullWidth size="large" type="submit" variant="contained">
        {t('reset.button')}
      </Button>
    </form>
  );
}
