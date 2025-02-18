
# Mac's Facilities Maintenance System

A comprehensive facility management system built with modern web technologies, designed to streamline maintenance operations and equipment tracking.

## Features

### Equipment Management
- Track and manage various types of HVAC equipment
- Real-time equipment status monitoring
- Detailed equipment history and maintenance records
- Equipment location tracking and mapping

### Maintenance Checks
- Scheduled maintenance tracking
- Digital maintenance checklists
- Real-time maintenance reporting
- AHU-specific maintenance workflows
- Comprehensive reading and measurement logging

### Project Management
- Project status tracking
- Task assignment and monitoring
- Priority-based project organization
- Project timeline visualization

### Technician Management
- Technician availability tracking
- Skill and certification management
- Work order assignment
- Performance monitoring

## Dashboard
- Real-time statistics showing equipment count, active projects, pending tasks, and available technicians
- Recent activities feed showing latest project and maintenance updates
- Equipment overview with quick status updates
- Responsive design for all device sizes

## Project Info

**URL**: https://lovable.dev/projects/504bf57f-2335-4e76-894e-5b151c1fbbad

## Technologies Used

This project leverages modern web technologies:

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Backend & Database**: Supabase
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts

## Documentation

For detailed information about specific features, please refer to our documentation:

- [Equipment Management Guide](./docs/equipment-management.md)
- [Maintenance Checks Guide](./docs/maintenance-checks.md)
- [Project Management Guide](./docs/project-management.md)
- [Technician Management Guide](./docs/technician-management.md)

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file based on `.env.example`
   - Add your Supabase credentials
4. Start development server:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:5173`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Deployment

The application can be deployed through:
- The Lovable platform (recommended)
- Manual deployment to services like Netlify or Vercel

For more information about deployment options, visit our [documentation](https://docs.lovable.dev/).

## Support

For support and questions:
- Visit our [documentation](https://docs.lovable.dev/)
- Create an issue in the repository
- Contact the maintenance team

## License

This project is proprietary software. All rights reserved.
