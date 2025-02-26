# MATA Web (Next.js)

## Overview
MATA Web is a Next.js-based frontend for the MATA project, providing users with an intuitive interface to manage their market lists efficiently. It is designed for a seamless experience with a modern UI and backend integration.

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (vXX+)

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/mata-project/mata-web-next.git
   cd mata-web-next
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create and configure the `.env` file:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and set the required values:
   ```env
   AUTH_SECRET=your_auth_secret
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   ```
   (see https://nextjs.org/learn/dashboard-app/adding-authentication)
4. Start the development server:
   ```bash
   npm run dev
   ```


## License
This project is licensed under the **MIT License**.
