
-- Creates a function to get a user's company information
CREATE OR REPLACE FUNCTION get_user_company()
RETURNS TABLE (company json) 
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT 
    json_build_object(
      'id', c.id,
      'name', c.name
    ) AS company
  FROM 
    public.companies c
  JOIN 
    public.company_users cu ON c.id = cu.company_id
  WHERE 
    cu.user_id = auth.uid()
  LIMIT 1;
END;
$$;
