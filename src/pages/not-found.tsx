import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { appPath } from '@/shared/constants/app-path.ts';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-gray-600 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="bg-green-600 hover:bg-green-700">
        <Link to={appPath.MAIN_PATH}>Go to Home</Link>
      </Button>
    </div>
  );
}
