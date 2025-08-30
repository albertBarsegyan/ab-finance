import { LoginForm } from '@/shared/components/pages/auth';

export function LoginPage() {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-green-50 lg:h-[calc(100vh-166px)] to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
