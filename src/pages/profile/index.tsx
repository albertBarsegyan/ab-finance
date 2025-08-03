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
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
} from 'lucide-react';
import { useState } from 'react';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

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
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-lg font-medium">John Doe</h3>
                <p className="text-sm text-muted-foreground">
                  john.doe@example.com
                </p>
                <Badge variant="secondary">Premium Member</Badge>
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
                      defaultValue="John"
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
                      defaultValue="Doe"
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
                    defaultValue="john.doe@example.com"
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    disabled={!isEditing}
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
              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
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
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Email Notifications</h4>
                  <p className="text-xs text-muted-foreground">
                    Receive email updates about your account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Privacy Settings</h4>
                  <p className="text-xs text-muted-foreground">
                    Control who can see your profile information
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Data Export</h4>
                  <p className="text-xs text-muted-foreground">
                    Download your financial data
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
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
              <div className="text-2xl font-bold">2,847</div>
              <div className="text-sm text-muted-foreground">
                Total Transactions
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-muted-foreground">Days Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">
                Connected Accounts
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
