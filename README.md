# 🌳 Cladograph

<div align="center">
  <img src="apps/frontend/public/cladographLogo.png" alt="Cladograph Logo" width="400"/>
</div>

<p align="center">
  <strong>Create, visualize, and share phylogenetic trees with ease.</strong>
</p>

<p align="center">
  <a href="https://cladograph.vercel.app">Acesse a aplicação em cladograph.vercel.app</a>
</p>

<p align="center">
  <a href="https://github.com/pedrogiroldo/cladograph/issues">
    <img src="https://img.shields.io/github/issues/pedrogiroldo/cladograph" alt="GitHub issues">
  </a>
  <a href="https://github.com/pedrogiroldo/cladograph/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/pedrogiroldo/cladograph" alt="GitHub license">
  </a>
</p>

---

## 📖 About The Project

Cladograph is a web-based application that allows users to create, visualize, and share phylogenetic trees. The project started as a Python application (v1), which was later rewritten using Electron. The current version is a modern web application with a Next.js frontend and a NestJS backend, providing a more robust and scalable solution.

The main goal of Cladograph is to provide a user-friendly tool for students, teachers, and researchers to explore evolutionary relationships between different species.

### 📜 Project History

*   **v1 (Python):** The first version of Cladograph was a desktop application built with Python. It was a complete but limited application.
*   **Electron (Deprecated):** An attempt was made to rewrite the application using Electron to create a cross-platform desktop application. However, this version was never completed.
*   **Current Version (Web Application):** The current and actively developed version is a web application with a Next.js frontend and a NestJS backend. This architecture provides a modern, fast, and scalable platform for the future of Cladograph.

---

## 🏆 Science Fair Recognition

This project has been recognized and awarded at the following science fairs:

> ### 🥇 **Fenecit** (2023 and 2024)
> ### 🥇 **Ficiencias** (2023)
> ### 🥇 **Fecitec UFPR** (2024)
> ### 🥇 **Mostratec** (2023)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### ✅ Prerequisites

*   **Node.js:** Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
*   **Yarn:** This project uses Yarn as a package manager. You can install it by following the instructions [here](https://yarnpkg.com/getting-started/install).
*   **PostgreSQL:** You need a running instance of PostgreSQL. You can download it from [here](https://www.postgresql.org/download/).

### 🛠️ Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/pedrogiroldo/cladograph.git
    cd cladograph
    ```

2.  **Install backend dependencies:**
    ```sh
    cd apps/backend
    yarn install
    ```

3.  **Install frontend dependencies:**
    ```sh
    cd ../frontend
    yarn install
    ```

### 🗄️ Database Setup

1.  **Navigate to the backend directory:**
    ```sh
    cd apps/backend
    ```

2.  **Create a `.env` file** by copying the example file:
    ```sh
    cp .env.example .env
    ```

3.  **Edit the `.env` file** with your PostgreSQL database connection string:
    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

4.  **Run the database migrations:**
    ```sh
    npx prisma migrate dev
    ```

### ▶️ Running the Application

1.  **Start the backend server:**
    ```sh
    cd apps/backend
    yarn start:dev
    ```
    The backend will be running on `http://localhost:3000`.

2.  **Start the frontend server:**
    ```sh
    cd apps/frontend
    yarn dev
    ```
    The frontend will be running on `http://localhost:3001`.

Now you can open your browser and navigate to `http://localhost:3001` to use the application.

---

## 💻 Technologies Used

*   **Frontend:**
    *   [Next.js](https://nextjs.org/)
    *   [React](https://reactjs.org/)
    *   [Material-UI](https://mui.com/)
    *   [Phylotree.js](https://github.com/veg/phylotree.js)

*   **Backend:**
    *   [NestJS](https://nestjs.com/)
    *   [Prisma](https://www.prisma.io/)
    *   [PostgreSQL](https://www.postgresql.org/)

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.