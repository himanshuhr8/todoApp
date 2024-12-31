# Todo App

This is a simple Todo application with user authentication and profile management.

## Tech Stack

### Backend

- **TypeScript**
- **Prisma ORM**
- **PostgreSQL** (using Neon DB)

### Frontend

- **React** (using Vite)
- **TypeScript (TSX)**
- **Tailwind CSS**

## Features

- User login and authentication
- Add, edit, mark as done, and delete todos
- Profile section to edit user details and password

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/himanshuhr8/todoApp.git
   ```
2. Navigate to the project directory:
   ```sh
   cd todo-app
   ```
3. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```sh
   cd ../frontend
   npm install
   ```

### Running the App

1. Start the backend server:
   ```sh
   cd backend
   tsc -b
   node dist/index.js
   ```
2. Start the frontend development server:
   ```sh
   cd ../frontend
   npm run dev
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
