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
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type LoginFormData,
  loginSchema,
} from '@/shared/components/pages/auth/schemas.ts';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useAuth } from '@/shared/hooks/auth.tsx';
import { useAlert } from '@/shared/hooks/alert.tsx';
import { useTranslation } from 'react-i18next';
import { GoogleIcon } from '@/shared/components/icons/google-icon.tsx';

export function LoginForm() {
  const { signIn, signInWithGoogle } = useAuth();
  const { setAlert } = useAlert();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const messageData = await signIn?.(data);

    if (messageData) setAlert(messageData);

    setIsLoading(false);
  };

  const onGoogleSignIn = async () => {
    setIsLoading(true);
    const messageData = await signInWithGoogle?.();
    if (messageData) setAlert(messageData);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('auth.signIn')}</CardTitle>
        <CardDescription>{t('auth.enterCredentials')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                placeholder={t('auth.enterPassword')}
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

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={checked =>
                  setValue('rememberMe', checked as boolean)
                }
              />
              <Label htmlFor="rememberMe" className="text-sm">
                {t('auth.rememberMe')}
              </Label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:text-green-500"
            >
              {t('auth.forgotPassword')}
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? t('auth.signingIn') : t('auth.signIn')}
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
            className="w-full"
            onClick={onGoogleSignIn}
            disabled={isLoading}
          >
            <span> {t('auth.continueWithGoogle')}</span> <GoogleIcon />
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t('auth.dontHaveAccount')}{' '}
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-500"
            >
              {t('auth.signUp')}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
