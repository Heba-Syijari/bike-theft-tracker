# 🚴 Munich Bike Theft Tracker

A modern web application for tracking and managing reported bike theft cases in the Munich area. Built for police officers to efficiently view, search, and filter bike theft reports.

## 📋 Overview

The Munich Bike Theft Tracker is a responsive web application that integrates with the [BikeIndex API](https://bikeindex.org/api/v3) to display stolen bike cases. It provides an intuitive interface for law enforcement to manage and investigate bike theft incidents in the Munich region.

## ✨ Features

### Core Functionality

- **📊 Case Listing**: View all reported bike theft cases from Munich area (100km radius)
- **🔍 Advanced Filtering**:
  - Search by partial case title (searches in title, manufacturer, model, serial, and description)
  - Filter by date range (start date and end date)
- **📄 Pagination**: Navigate through cases with 10 cases per page
- **📈 Statistics**: View total count of filtered cases

### Case Information Display

Each theft case displays:

- **Case Title**: Bike model and year
- **Description**: Detailed case description (if available)
- **Date Stolen**: When the theft occurred
- **Location**: Theft location with coordinates
- **Bike Image**: Photo of the stolen bike (if available)
- **Additional Details**: Manufacturer, year, serial number, and case ID

### User Experience

- **⚡ Loading States**: Smooth loading indicators during data fetch
- **❌ Error Handling**: Clear error messages when API calls fail
- **📭 Empty States**: Helpful messages when no results are found
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, professional interface with smooth animations

## 🛠️ Tech Stack

### Frontend Framework

- **React 19.2.0**: Modern React with latest features
- **TypeScript 5**: Type-safe development
- **Vite 7.3.0**: Fast build tool and development server

### State Management & Data Fetching

- **TanStack Query (React Query) 5.90.12**:
  - Server state management
  - Automatic caching and refetching
  - Loading and error state handling
  - Query invalidation on filter changes

### UI & Styling

- **Tailwind CSS 4.1.9**: Utility-first CSS framework
- **Tailwind CSS Animate**: Animation utilities
- **Radix UI**: Accessible component primitives
  - `@radix-ui/react-label`
  - `@radix-ui/react-slot`
- **Lucide React**: Modern icon library
- **Class Variance Authority**: Component variant management

### Forms

- **Formik 2.4.9**: Form state management and validation

### Build Tools

- **PostCSS**: CSS processing
- **TypeScript**: Type checking
- **ESLint**: Code linting

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm package manager

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Heba-Syijari/bike-theft-tracker
   cd bike-theft-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
bike-theft-tracker/
├── src/
│   ├── components/          # React components
│   │   ├── filters-form.tsx # Search and filter form
│   │   ├── pagination.tsx   # Pagination component
│   │   ├── theft-card.tsx   # Individual case card
│   │   └── ui/              # Reusable UI components
│   ├── lib/
│   │   ├── api.ts           # API integration with BikeIndex
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   └── dashboard.tsx   # Main dashboard page
│   ├── types/
│   │   └── theft.ts         # TypeScript type definitions
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🔌 API Integration

### BikeIndex API

The application integrates with the [BikeIndex API v3](https://bikeindex.org/api/v3/search) to fetch bike theft data.

**API Endpoint**: `https://bikeindex.org/api/v3/search`

**Query Parameters**:

- `location`: "Munich"
- `distance`: "100" (km radius)
- `stolenness`: "proximity"
- `per_page`: "100" (maximum allowed)
- `page`: Page number for pagination

### Data Flow

1. **Initial Fetch**: Fetches all bike theft cases from Munich area (all pages)
2. **Client-Side Filtering**: Applies search query and date filters
3. **Pagination**: Displays 10 cases per page
4. **Caching**: React Query caches data for 5 minutes

## 🎯 Key Features Implementation

### Data Fetching Strategy

- Fetches all data upfront to enable comprehensive client-side filtering
- Automatically paginates through all API pages
- Applies filters after fetching complete dataset
- Caches results to minimize API calls

### Filtering Logic

- **Text Search**: Searches across multiple fields (title, manufacturer, model, serial, description)
- **Date Range**: Filters by theft date using Unix timestamps
- **Case Insensitive**: All text searches are case-insensitive

### Responsive Design

- Mobile-first approach
- Adaptive pagination (fewer page numbers on small screens)
- Collapsible navigation elements
- Touch-friendly interface

## 🎨 UI Components

The application uses a custom component library built on:

- **shadcn/ui** style components
- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- Custom components for theft cases and filters

## 🔧 Configuration

### React Query Configuration

```typescript
{
  staleTime: 1000 * 60 * 5,  // 5 minutes
  refetchOnWindowFocus: false
}
```

### API Configuration

- Location: Munich, Germany
- Search Radius: 100km
- Items per Page: 10 (display)
- Max API Results: 100 per request

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚧 Future Enhancements

Potential improvements:

- [ ] Add sorting options (by date, manufacturer, etc.)
- [ ] Export filtered results to CSV/PDF
- [ ] Map view with theft locations
- [ ] Case details modal/page
- [ ] Advanced search filters (color, manufacturer, etc.)
- [ ] Data caching with IndexedDB for offline support
- [ ] Real-time updates with WebSockets

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For questions or issues, please contact the development team.

## 🙏 Acknowledgments

- [BikeIndex](https://bikeindex.org/) for providing the bike theft data API
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration
- [Radix UI](https://www.radix-ui.com/) for accessible primitives

---

**Version**: 0.1.0  
**Last Updated**: 2025
