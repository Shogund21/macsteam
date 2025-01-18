import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const AppearanceSection = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Appearance</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Customize the look and feel of the application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base text-muted-foreground">
            Appearance settings will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};