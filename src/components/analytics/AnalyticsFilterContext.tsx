
import { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";
import { sub } from "date-fns";

interface AnalyticsFilterContextType {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
  location: string | null;
  setLocation: (location: string | null) => void;
}

const defaultDateRange: DateRange = {
  from: sub(new Date(), { days: 30 }),
  to: new Date(),
};

const AnalyticsFilterContext = createContext<AnalyticsFilterContextType>({
  dateRange: defaultDateRange,
  setDateRange: () => {},
  location: null,
  setLocation: () => {},
});

export const useAnalyticsFilters = () => useContext(AnalyticsFilterContext);

export const AnalyticsFilterProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRange] = useState<DateRange>(defaultDateRange);
  const [location, setLocation] = useState<string | null>(null);

  return (
    <AnalyticsFilterContext.Provider value={{ dateRange, setDateRange, location, setLocation }}>
      {children}
    </AnalyticsFilterContext.Provider>
  );
};
