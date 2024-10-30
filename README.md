# 🏔️ Mountaineer

An interactive mountain map application designed to help aspiring mountain guides study topography through engaging learning modes and gamification.

## 🎯 Mission

This project was born from a real need - a friend preparing for mountain guide certification exams needed an effective way to study mountain topography. Traditional static maps weren't cutting it, so Mountaineer was created to provide an interactive, engaging way to learn about mountain peaks, passes, shelters, and other key geographical features.

## ✨ Features

- **🗺️ Interactive Map** - Built with Leaflet.js, offering smooth pan and zoom capabilities
- **📚 Learning Mode** - Study mode with detailed information about each point of interest
- **🎮 Game Mode** - Test your knowledge through an interactive quiz system
- **✏️ Edit Mode** - Contribute to the map by adding new points (requires authentication)
- **🌓 Dark/Light Mode** - Comfortable viewing experience in any lighting condition

## 🛠️ Technology Stack

- **Next.js 15** - App Router, Server Components, and other modern React features
- **TypeScript** - Type safety and better developer experience
- **Leaflet.js** - Powers the interactive map functionality
- **Supabase** - Database and authentication
- **TanStack Query** - Data fetching, caching, and state management
- **Tailwind CSS** - Styling and responsive design
- **Shadcn/ui** - Component library for consistent UI elements
- **Zod** - Runtime type validation

### Why These Choices?

- **Next.js**: Offers excellent developer experience and performance optimizations out of the box
- **Leaflet.js**: Mature, well-documented mapping library with great community support
- **Supabase**: Provides a quick way to set up a backend with auth capabilities
- **TanStack Query**: Simplifies data management with built-in caching and real-time updates
- **TypeScript**: Ensures type safety and improves maintainability

## 🚧 Current Limitations & Future Improvements

### Authentication
The current authentication system is intentionally simplified for this proof of concept. In a production environment, it would need:
- Email verification
- Password reset functionality
- Multi-factor authentication
- Session management
- Password hashing
- And many, many more...

### Security Considerations
Future security improvements should include:
- Rate limiting for API endpoints
- Request validation
- CSRF protection
- Security headers
- Content Security Policy

## 🔍 SEO Implementation

The project includes basic SEO optimization through:
- Dynamic metadata generation for each route
- JSON-LD structured data for better search engine understanding
- OpenGraph tags for social media sharing
- Sitemap generation
- Proper semantic HTML structure
- Meta descriptions and titles

## 📚 Resources

This project was built with help from these excellent resources:
- [Tatra Ridge Image](https://pza.org.pl/download/314598.pdf)
- [Next.js Documentation](https://nextjs.org/docs)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Shadcn/UI Documentation](https://ui.shadcn.com/docs)
- [Zod Documentation](https://zod.dev/)