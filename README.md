# Event Finder

A full-stack Next.js application for finding and managing events. Users can discover events, create their own events, and contribute to the project.

## Features

- User authentication with Google and email/password
- Event creation and management
- Admin approval system for events
- Responsive design
- Dark mode support
- PostgreSQL database with Prisma ORM

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Prisma
- PostgreSQL
- NextAuth.js

## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL database
- Google OAuth credentials (for Google Sign-in)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/eventfinder"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/event-finder.git
cd event-finder
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:
```bash
npm run dev
```

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass before submitting a PR

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.