# Mac's Facilities Maintenance System

A comprehensive facility management system built with modern web technologies.

## Features

### Dashboard
- Real-time statistics showing equipment count, active projects, pending tasks, and available technicians
- Recent activities feed showing latest project and maintenance updates
- Equipment overview with quick status updates
- Responsive design for all device sizes

### Equipment Management
- Password-protected equipment section (Password: MACYS0405)
- Add and manage HVAC equipment
- Track equipment details including:
  - Model numbers
  - Serial numbers
  - Location information
  - Maintenance schedules
  - Current status
- Quick status updates via dropdown
- Equipment history tracking

### Project Management
- Create and manage maintenance projects
- Project tracking with:
  - Priority levels (High, Medium, Low)
  - Status updates (Not Started, In Progress, On Hold, Completed)
  - Start and end dates
  - Location information
- Real-time project updates
- Project filtering and sorting
- Description editing capabilities

### Maintenance Checks
- Comprehensive HVAC maintenance check system
- Dynamic maintenance forms:
  - Standard HVAC checks
  - AHU-specific daily preventative maintenance
- Track various parameters:
  - Chiller pressure and temperature readings
  - Air filter status and cleaning
  - Belt condition and tension
  - Fan bearings lubrication
  - Dampers operation
  - Coils condition
  - Sensors operation
  - Motor condition
  - Drain pan status
  - Airflow measurements
  - Refrigerant levels
  - Unusual noise detection
  - Vibration monitoring
  - Oil level status
  - Condenser condition
- Maintenance history tracking
- Technician assignment system
- Detailed reporting with:
  - Troubleshooting notes
  - Corrective actions
  - Maintenance recommendations
  - Image attachments

### Settings & Administration
- Technician management
  - Add/remove technicians
  - Track specializations
  - Monitor availability
  - Contact information management
- Appearance customization options
- Notification preferences

## How to Use

### Equipment Management
1. Navigate to the Equipment section
2. Enter the password: MACYS0405
3. Add new equipment or manage existing ones
4. Update equipment status using the dropdown menu

### Maintenance Checks
1. Go to Maintenance Checks
2. Click "New Check"
3. Select equipment from the dropdown
   - For AHU equipment, the form will automatically show AHU-specific checks
   - For standard HVAC equipment, general maintenance fields will be displayed
4. Complete all required fields
5. Add any relevant notes or images
6. Submit the check

### Project Management
1. Access the Projects section
2. Create new projects or manage existing ones
3. Update project status and priority as needed
4. Edit project descriptions through the inline editor
5. Track progress and completion dates

### Technician Management
1. Go to Settings
2. Access the Technician Management section
3. Add or update technician information
4. Manage availability and specializations

## Project info

**URL**: https://lovable.dev/projects/504bf57f-2335-4e76-894e-5b151c1fbbad

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase (Backend & Database)

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Access the application at `http://localhost:5173`

## Deployment

The application can be deployed through the Lovable platform or manually using services like Netlify.

For more information, visit our [documentation](https://docs.lovable.dev/).