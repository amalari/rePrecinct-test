# RePrecinct

[![Live Preview](https://img.shields.io/badge/View-Live%20Demo-blue?style=for-the-badge)](https://main.doyc4flw7z5eg.amplifyapp.com/)

A modern web application built with Next.js, AWS Amplify, and shadcn/ui, following a monorepo architecture for better code organization and reusability.

## 🌐 Live Demo

Check out the live demo: [https://main.doyc4flw7z5eg.amplifyapp.com/](https://main.doyc4flw7z5eg.amplifyapp.com/)

## 🚀 Tech Stack

- **Frontend**: 
  - Next.js 15+ (App Router)
  - React 19
  - TypeScript
  - Tailwind CSS
  - Shadcn UI components
  - React Query for data fetching
  - Next Themes for dark/light mode

- **Backend**:
  - AWS Amplify Gen 2
  - AWS CDK for infrastructure as code
  - AWS AppSync (GraphQL)
  - AWS Cognito for authentication
  - AWS Lambda for serverless functions

- **Development**:
  - Turborepo for monorepo management
  - pnpm as package manager
  - ESLint and Prettier for code quality
  - TypeScript across the stack

## 🛠️ Prerequisites

- Node.js 20+
- pnpm 8.x
- AWS Account with appropriate permissions
- AWS CLI v2 installed and configured
- AWS CDK v2 installed globally

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/jamal/reprecnict.git
cd reprecnict
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up AWS Amplify

1. Install AWS Amplify CLI (if not already installed):
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Configure AWS Amplify:
   ```bash
   amplify configure
   ```
   Follow the prompts to sign in to the AWS Management Console and configure the AWS CLI.

### 4. Environment Setup

1. Copy the example environment file:
   ```bash
   cp apps/web/amplify/.env.example apps/web/amplify/.env
   ```

2. Update the `.env` file with your AWS credentials and configuration.

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# From the root directory
pnpm dev
```

This will start the Next.js development server at `http://localhost:3000`

### Production Build

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

## 📁 Project Structure

```
reprecnict/
├── apps/
│   └── web/                    # Next.js web application
│       ├── src/
│       │   ├── app/           # Next.js app directory (App Router)
│       │   ├── components/     # Reusable components
│       │   └── lib/            # Utility functions and hooks
│       └── amplify/            # AWS Amplify configuration
│
├── packages/
│   ├── ui/                    # Shared UI components (shadcn/ui)
│   ├── feature/               # Feature modules
│   ├── validator/             # Validation utilities
│   ├── eslint-config/         # ESLint configuration
│   └── typescript-config/     # TypeScript configuration
│
├── package.json
└── turbo.json                 # Turborepo configuration
```

## 🎨 Adding shadcn/ui Components

1. Initialize shadcn/ui (if not already done):
   ```bash
   pnpm dlx shadcn@latest init
   ```

2. Add components to your app:
   ```bash
   pnpm dlx shadcn@latest add [component-name] -c apps/web
   ```

   Example:
   ```bash
   pnpm dlx shadcn@latest add button -c apps/web
   ```

   This will place the UI components in the `packages/ui/src/components` directory.

3. Using components in your app:
   ```tsx
   import { Button } from "@workspace/ui/components/button"
   ```

## 🔧 Development Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
