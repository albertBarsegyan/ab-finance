import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Calendar, Edit, Mail, MapPin, Save, User, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/shared/hooks/auth.tsx';
import { useAlert } from '@/shared/hooks/alert.tsx';
import { useGoals } from '@/entities/goals/model/use-goals.tsx';
import { useIncomes } from '@/entities/incomes/model/use-incomes.tsx';
import { useOutcomes } from '@/entities/outcomes/model/use-outcomes.tsx';

export function ProfilePage() {
  const { setAlert } = useAlert();
  const { user, userAdditional, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(userAdditional?.firstName || '');
  const [lastName, setLastName] = useState(userAdditional?.lastName || '');
  const [email] = useState(userAdditional?.email || user?.email || '');
  const [isSaving, setIsSaving] = useState(false);

  const uid = user?.uid;
  const { goals } = useGoals(uid);
  const { incomes } = useIncomes(uid);
  const { outcomes } = useOutcomes(uid);

  const totalTransactions = (incomes?.length || 0) + (outcomes?.length || 0);
  const goalsCount = goals?.length || 0;

  const createdAtStr = user?.metadata?.creationTime;
  const daysActive = (() => {
    if (!createdAtStr) return 0;
    const created = new Date(createdAtStr).getTime();
    const now = Date.now();
    const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 0 : diffDays;
  })();

  const getInitials = () => {
    if (userAdditional?.firstName && userAdditional?.lastName) {
      return `${userAdditional.firstName[0]}${userAdditional.lastName[0]}`.toUpperCase();
    }

    return user?.displayName?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Button
          variant={isEditing ? 'outline' : 'default'}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details and contact information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-lg font-medium">
                  {userAdditional
                    ? `${userAdditional.firstName} ${userAdditional.lastName}`
                    : user?.displayName || 'User'}
                </h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <Badge variant="secondary">
                  {userAdditional?.isFirstTime
                    ? 'New Member'
                    : 'Premium Member'}
                </Badge>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    defaultValue="San Francisco, CA"
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="birthdate"
                    type="date"
                    defaultValue="1990-01-01"
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <Button
                className="w-full"
                disabled={isSaving}
                onClick={async () => {
                  if (!updateUserProfile) return;
                  setIsSaving(true);
                  const res = await updateUserProfile({ firstName, lastName });
                  setAlert(res);
                  setIsSaving(false);
                  setIsEditing(false);
                }}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            )}

            {/* User Metadata */}
            {userAdditional && (
              <div className="pt-4 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Member Since:</span>
                  <span className="font-medium">
                    {userAdditional.createdAt
                      ? new Date(userAdditional.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Account Type:</span>
                  <Badge variant="outline">
                    {userAdditional.isFirstTime ? 'New Account' : 'Established'}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {/*<div className="flex items-center justify-between">*/}
              {/*  <div>*/}
              {/*    <h4 className="text-sm font-medium">Email Notifications</h4>*/}
              {/*    <p className="text-xs text-muted-foreground">*/}
              {/*      Receive email updates about your account*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*  <Button variant="outline" size="sm">*/}
              {/*    Configure*/}
              {/*  </Button>*/}
              {/*</div>*/}

              {/*<div className="flex items-center justify-between">*/}
              {/*  <div>*/}
              {/*    <h4 className="text-sm font-medium">*/}
              {/*      Two-Factor Authentication*/}
              {/*    </h4>*/}
              {/*    <p className="text-xs text-muted-foreground">*/}
              {/*      Add an extra layer of security to your account*/}
              {/*    </p>*/}
              {/*  </div>*/}
              {/*  <Button variant="outline" size="sm">*/}
              {/*    Enable*/}
              {/*  </Button>*/}
              {/*</div>*/}
            </div>

            <div className="pt-4 border-t">
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
          <CardDescription>
            Overview of your account activity and usage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalTransactions}</div>
              <div className="text-sm text-muted-foreground">
                Total Transactions
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{daysActive}</div>
              <div className="text-sm text-muted-foreground">Days Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{goalsCount}</div>
              <div className="text-sm text-muted-foreground">Goals</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
