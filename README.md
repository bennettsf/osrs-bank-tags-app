# OSRS Bank Tags App

A web application for browsing, sharing, and importing Old School RuneScape bank tag tabs. Built with React, TypeScript, and Supabase.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase&logoColor=white)

## 🎮 About

OSRS Bank Tags App allows players to share and discover bank tag configurations for Old School RuneScape. The app integrates with the built-in Bank Tags RuneLite plugin, enabling users to:

- **Browse** community-created bank tag tabs
- **Import** bank tags directly from your clipboard
- **Share** your own bank tag configurations
- **Favorite** tabs for quick access later
- **Filter** by category (PvM, PvP, Skilling, Clue, Minigame, Quest, Miscellaneous)

## ✨ Features

- **Import & Validate** - Paste bank tag strings from clipboard with automatic validation
- **Category Filtering** - Browse tabs by activity type using the sidebar
- **Favorites System** - Save your favorite bank tabs locally
- **Responsive Layout** - Clean two-pane design with fixed navigation
- **Tutorial** - Step-by-step guides for importing and exporting bank tags
- **Like System** - Upvote community bank tabs (Soon...)

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Chakra UI 3** - Component library
- **TanStack Query** - Data fetching and caching
- **Zod** - Schema validation

### Backend

- **Supabase** - Database and Edge Functions
- **Deno** - Edge function runtime

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase CLI (for local development with backend)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/bennettsf/osrs-bank-tags-app.git
   cd osrs-bank-tags-app
   ```

2. **Install frontend dependencies**

   ```bash
   cd app
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `app` directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

### Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🗄️ Supabase Setup

### Local Development

1. **Install Supabase CLI**

   ```bash
   npm install -g supabase
   ```

2. **Start local Supabase**

   ```bash
   supabase start
   ```

3. **Deploy edge functions locally**
   ```bash
   supabase functions serve
   ```

### Database Schema

The app uses the following main table structure:

| Column          | Type      | Description          |
| --------------- | --------- | -------------------- |
| `id`            | integer   | Primary key          |
| `created_at`    | timestamp | Creation date        |
| `name`          | text      | Bank tab name        |
| `icon`          | text      | Item ID for tab icon |
| `import_string` | text      | Full bank tag string |
| `layout`        | boolean   | Layout enabled flag  |
| `tags`          | text[]    | Category tags        |
| `likes`         | integer   | Like count           |

## 🎯 Bank Tag Format

The app validates bank tag strings in the format used by the RuneLite Bank Tag Layouts plugin:

```
banktags,1,<tab_name>,<icon_id>,<item_ids...>,layout,<layout_data...>
```

Example:

```
banktags,1,ecumenical,11942,2554,2562,1704,layout,0,147,1,159,2,165
```

## 📝 Categories

Bank tabs can be tagged with the following categories:

- **PvM** - Player vs Monster content
- **PvP** - Player vs Player content
- **Skilling** - Skill training setups
- **Clue** - Clue scroll equipment
- **Minigame** - Minigame gear
- **Quest** - Quest item collections
- **Miscellaneous** - Everything else

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Related Links

- [Old School RuneScape](https://oldschool.runescape.com/)
- [RuneLite Client](https://runelite.net/)
- [Bank Tag Layouts Plugin](https://runelite.net/plugin-hub/show/bank-tag-layouts)
- [Supabase Documentation](https://supabase.com/docs)

---

_This project is not affiliated with Jagex or Old School RuneScape._
