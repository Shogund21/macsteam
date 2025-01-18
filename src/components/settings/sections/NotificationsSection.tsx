import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const NotificationsSection = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Notifications</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Manage your notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base text-muted-foreground">
            Notification settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};