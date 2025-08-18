import { useAuth } from '@/shared/hooks/auth';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { RefreshCw, User, Mail, Calendar } from 'lucide-react';

export function UserInfo() {
  const { user, userAdditional, fetchUserDocument, initializing } = useAuth();

  const handleRefreshUserData = async () => {
    if (user?.uid) {
      await fetchUserDocument(user.uid);
    }
  };

  if (initializing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading user data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please sign in to view user information.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Information</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefreshUserData}
          disabled={!user.uid}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Firebase Auth User Info */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">Authentication Details</h4>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">UID:</span>
              <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                {user.uid.slice(0, 8)}...
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Email Verified:</span>
              <Badge variant={user.emailVerified ? "default" : "secondary"}>
                {user.emailVerified ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Firestore User Document Info */}
        {userAdditional ? (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium text-sm text-muted-foreground">Profile Details</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Full Name:</span>
                <span className="font-medium">
                  {userAdditional.firstName} {userAdditional.lastName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Account Type:</span>
                <Badge variant={userAdditional.isFirstTime ? "secondary" : "default"}>
                  {userAdditional.isFirstTime ? "New User" : "Returning User"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Member Since:</span>
                <span className="font-medium">
                  {userAdditional.createdAt?.toDate?.() 
                    ? new Date(userAdditional.createdAt.toDate()).toLocaleDateString()
                    : 'N/A'
                  }
                </span>
              </div>
              {userAdditional.updatedAt && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-medium">
                    {userAdditional.updatedAt?.toDate?.() 
                      ? new Date(userAdditional.updatedAt.toDate()).toLocaleDateString()
                      : 'N/A'
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t">
            <p className="text-muted-foreground text-sm">
              No additional profile information found. This might be a new user or there was an error loading the data.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

