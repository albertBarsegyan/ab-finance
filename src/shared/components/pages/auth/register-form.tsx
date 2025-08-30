import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type RegisterFormData,
  registerSchema,
} from '@/shared/components/pages/auth/schemas.ts';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useAuth } from '@/shared/hooks/auth.tsx';
import { useAlert } from '@/shared/hooks/alert.tsx';
import { GoogleIcon } from '@/shared/components/icons/google-icon.tsx';
import { useTranslation } from 'react-i18next';

export function RegisterForm() {
  const { setAlert } = useAlert();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signUp, signInWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    const messageData = await signUp?.(data);
    if (messageData) setAlert(messageData);
    setIsLoading(false);
  };

  const onGoogleSignUp = async () => {
    setIsLoading(true);
    const messageData = await signInWithGoogle?.();
    if (messageData) setAlert(messageData);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.signUp')}</CardTitle>
        <CardDescription>
          {t('auth.fillDetails')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t('auth.firstName')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder={t('auth.first_name')}
                  className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                  {...register('firstName')}
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t('auth.lastName')}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="lastName"
                  type="text"
                  placeholder={t('auth.last_name')}
                  className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                  {...register('lastName')}
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder={t('auth.enterEmail')}
                className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                {...register('email')}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.createPassword')}
                className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                {...register('password')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t('auth.confirmYourPassword')}
                className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                {...register('confirmPassword')}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              checked={acceptTerms}
              onCheckedChange={checked =>
                setValue('acceptTerms', checked as boolean)
              }
            />
            <Label htmlFor="acceptTerms" className="text-sm">
              {t('auth.acceptTerms')}{' '}
              <Link to="/terms" className="text-green-600 hover:text-green-500">
                {t('auth.termsOfService')}
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="text-green-600 hover:text-green-500"
              >
                {t('auth.privacyPolicy')}
              </Link>
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? t('auth.creatingAccount') : t('auth.signUp')}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                {t('auth.orContinueWith')}
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={onGoogleSignUp}
            disabled={isLoading}
          >
            <span> {t('auth.continueWithGoogle')}</span> <GoogleIcon />
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              {t('auth.signIn')}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
