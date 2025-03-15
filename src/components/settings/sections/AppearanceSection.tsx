
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const AppearanceSection = () => {
  const [selectedTheme, setSelectedTheme] = useState("blue");
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Appearance</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Customize the look and feel of Shogunai's AssetGuardian.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-3">Color Theme</h3>
              <RadioGroup 
                defaultValue={selectedTheme} 
                onValueChange={setSelectedTheme}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem 
                    value="blue" 
                    id="blue" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="blue"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-[#1EAEDB] peer-data-[state=checked]:bg-blue-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#1EAEDB]" />
                    <span className="mt-2">Shogunai Blue</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="green" 
                    id="green" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="green"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-[#38B2AC] peer-data-[state=checked]:bg-green-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#38B2AC]" />
                    <span className="mt-2">Guardian Green</span>
                  </Label>
                </div>
                
                <div>
                  <RadioGroupItem 
                    value="purple" 
                    id="purple" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="purple"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-[#8B5CF6] peer-data-[state=checked]:bg-purple-50"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#8B5CF6]" />
                    <span className="mt-2">Shogunai Purple</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-2">Future Appearance Settings</h3>
              <p className="text-sm text-muted-foreground">
                More Shogunai AssetGuardian theme customization options will be available in future updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
