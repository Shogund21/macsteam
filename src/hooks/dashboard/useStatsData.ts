import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useStatsData = () => {
  // Fetch equipment data
  const { data: equipmentData, isLoading: equipmentLoading, error: equipmentError } = useQuery({
    queryKey: ['equipment'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('equipment')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch projects data
  const { data: projectsData, isLoading: projectsLoading, error: projectsError } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch maintenance checks data
  const { data: maintenanceData, isLoading: maintenanceLoading, error: maintenanceError } = useQuery({
    queryKey: ['maintenance_checks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hvac_maintenance_checks')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch technicians data
  const { data: techniciansData, isLoading: techniciansLoading, error: techniciansError } = useQuery({
    queryKey: ['technicians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technicians')
        .select('*');
      
      if (error) throw error;
      return data || [];
    },
  });

  const isLoading = equipmentLoading || projectsLoading || maintenanceLoading || techniciansLoading;
  const errors = { equipmentError, projectsError, maintenanceError, techniciansError };
  const hasError = Object.values(errors).some(error => error !== null);

  // Calculate derived stats
  const activeProjectsCount = projectsData?.filter(project => 
    project.status.toLowerCase() === 'in progress' || 
    project.status.toLowerCase() === 'ongoing'
  ).length || 0;

  const pendingTasksCount = maintenanceData?.filter(check => 
    check.status === 'pending'
  ).length || 0;

  const availableTechniciansCount = techniciansData?.filter(tech => 
    tech.isAvailable
  ).length || 0;

  return {
    stats: {
      totalEquipment: equipmentData?.length || 0,
      activeProjects: activeProjectsCount,
      pendingTasks: pendingTasksCount,
      availableTechnicians: availableTechniciansCount,
    },
    isLoading,
    hasError,
    errors,
  };
};