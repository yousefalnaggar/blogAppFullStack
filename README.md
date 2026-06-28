# BlogApp — Full Stack Blog CRUD Application

A full stack blog application built with **ASP.NET Core 8** (C#) on the backend and **React + Vite** on the frontend. Supports creating, reading, updating, and deleting blog posts backed by a SQL Server database via Entity Framework Core.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Backend | ASP.NET Core 8 Web API (C#) |
| Database | SQL Server (local) |
| ORM | Entity Framework Core 8 |

---

## Project Structure

```
BlogApp/
├── BlogApp.sln                 ← Solution file
├── BlogApp.API/                ← ASP.NET Core 8 Web API
│   ├── Controllers/            ← HTTP endpoints (CRUD)
│   ├── Data/                   ← EF Core DbContext
│   ├── DTOs/                   ← Request/response shapes
│   ├── Models/                 ← BlogPost entity
│   ├── Migrations/             ← EF Core schema migrations
│   ├── Program.cs              ← App startup & middleware
│   └── appsettings.json        ← Connection string config
└── blog-client/                ← Vite + React frontend
    └── src/
        ├── App.jsx             ← Main UI (list/view/create/edit)
        ├── PostForm.jsx        ← Reusable create/edit form
        └── api.js              ← Fetch calls to the backend
```

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/blogposts` | Get all posts (newest first) |
| GET | `/api/blogposts/{id}` | Get a single post by ID |
| POST | `/api/blogposts` | Create a new post |
| PUT | `/api/blogposts/{id}` | Update an existing post |
| DELETE | `/api/blogposts/{id}` | Delete a post |

---

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- SQL Server (local instance — Windows Authentication)
- [EF Core CLI tools](https://learn.microsoft.com/en-us/ef/core/cli/dotnet): `dotnet tool install --global dotnet-ef`

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/joealnagar/blogAppFullStack.git
cd blogAppFullStack
```

### 2. Configure the database connection

The default connection string in `BlogApp.API/appsettings.json` targets a local SQL Server instance using Windows Authentication:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=BlogAppDb;Trusted_Connection=True;TrustServerCertificate=True"
}
```

Update this if your SQL Server instance name or auth method differs.

### 3. Run the backend API

```bash
cd BlogApp.API
dotnet run
```

The API starts at `http://localhost:5000`. Database migrations are applied automatically on startup — no manual `dotnet ef database update` needed.

### 4. Run the frontend

Open a second terminal:

```bash
cd blog-client
npm install
npm run dev
```

The React app starts at `http://localhost:5173`.

---

## Data Model

```
BlogPost
├── Id          int           (Primary Key, auto-incremented)
├── Title       nvarchar(max)
├── Content     nvarchar(max)
├── Author      nvarchar(max)
├── CreatedAt   datetime2
└── UpdatedAt   datetime2
```

---

## How It Works

1. React sends HTTP requests to the ASP.NET Core API.
2. The controller validates input via DTOs and calls EF Core.
3. EF Core translates C# operations into SQL and executes against SQL Server.
4. Results are returned as JSON and rendered in the React UI.

---

## Viewing the Database

Connect to your local SQL Server in **SSMS** or **Azure Data Studio** using `localhost` with Windows Authentication, then browse `BlogAppDb > Tables > dbo.BlogPosts`.

Quick query:

```sql
SELECT * FROM BlogPosts ORDER BY CreatedAt DESC;
```
