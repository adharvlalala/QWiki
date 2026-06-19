# QWiki — Navigate the Quantum Frontier 🌌

QWiki is a premium, living knowledge base and research hub for quantum physics, quantum computing, and advanced information science. It merges highly polished modern design with technical clarity, featuring interactive UI elements, full mathematical notation support, and vector-based semantic search.

---

## ✨ Features

- **Interactive Quantum Taxonomy:** Browse curated articles across multiple pillars of quantum theory:
  - **Fundamentals:** Quantum Mechanics, Wave-Particle Duality, Uncertainty Principle, and Entanglement.
  - **Quantum Computing:** Qubits, Quantum Gates, Circuits, and Error Correction.
  - **Algorithms:** Shor's Algorithm, Grover's Algorithm, and VQE.
  - **Hardware:** Superconducting, Photonic, and Trapped Ion devices.
  - **Research:** Quantum Advantage and the NISQ Era.
- **Futuristic & Immersive Aesthetics:** Built with a clean, high-contrast visual design system featuring dark-mode details, glassmorphism, dynamic grid layouts, and custom micro-animations (powered by Framer Motion and Aceternity UI).
- **Mathematical Formula Rendering:** Full LaTeX formatting support for quantum state vectors, wavefunctions, and operators (using KaTeX, `rehype-katex`, and `remark-math`).
- **Semantic & Full-Text Search:** Hybrid database searching using Supabase full-text indexing and pgvector cosine similarity matching.
- **Interactive Contribution Flow:** Fully integrated contribution dashboard where users can submit corrections or propose new articles, which go to a moderated queue protected by Row Level Security (RLS) policies.
- **Quantum Labs Playground:** A sandbox area for simulating or experimenting with quantum concepts (under `labs`).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & React 19)
- **Database / Auth:** [Supabase](https://supabase.com/) (PostgreSQL with `pgvector`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Aceternity UI](https://ui.aceternity.com/)
- **Math Rendering:** [KaTeX](https://katex.org/)
- **Content:** Markdown-driven article pages parsed with `react-markdown`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.x or v20.x+ (Recommended)
- **npm** or your preferred package manager
- **Supabase Account:** A free Supabase project to host the database tables and search functions.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/quantum-wiki.git
   cd quantum-wiki
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up local environment variables:**
   Copy the environment variables template:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and enter your Supabase Project URL and Anon Key. You can find these in your Supabase Dashboard under **Project Settings → API**.

4. **Initialize Database and Schema:**
   Go to your Supabase Project dashboard, open the **SQL Editor**, and run the SQL scripts found in the root directory in the following order:
   - `supabase_setup.sql`: Creates `wiki_articles` and `wiki_contributions` tables, defines vector indexes, enables Row Level Security (RLS) policies, and populates initial articles.
   - `supabase_fix_rls.sql`: Applies any extra required RLS policy configurations.

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see QWiki live.

---

## 📂 Project Structure

```
├── app/
│   ├── (editorial)/        # Main editorial/wiki layouts & pages
│   │   ├── about/          # About the QWiki project
│   │   ├── categories/     # Categories list and filtering
│   │   ├── contribute/     # User submission hub
│   │   ├── labs/           # Interactive quantum labs sandbox
│   │   ├── wiki/           # Dynamic article views ([slug])
│   │   └── page.tsx        # Homepage hero & search interface
│   ├── api/                # Next.js API routes (e.g. search, embeddings)
│   ├── globals.css         # Tailwind & custom glassmorphism styles
│   └── layout.tsx          # Root layout and metadata configuration
├── components/             # Reusable UI & Layout components
├── lib/
│   ├── supabase/           # Supabase client instantiation
│   └── utils.ts            # Utility functions (Tailwind merging)
├── public/                 # Static files (icons, illustrations)
├── .env.example            # Environment variables placeholder
├── CONTRIBUTING.md         # Open-source contributing instructions
└── LICENSE                 # MIT License details
```

---

## 📝 Database Migrations & Schemas

The database configuration scripts in the root directory can be run directly inside the Supabase console:
- **`supabase_setup.sql`:** Sets up the tables, security policies, full-text indexes, and basic seed data.
- **`supabase_seed.sql`:** Contains additional content and detailed articles.
- **`supabase_update_math.sql`:** Updates content formatting, ensuring proper rendering of LaTeX equations.

---

## 🤝 Contributing

We welcome all contributions! Whether you're fixing a typo in an article, polishing a CSS animation, or introducing a whole new quantum category:
1. Review the [Contributing Guidelines](CONTRIBUTING.md).
2. Create an issue or look at existing ones to avoid duplicate work.
3. Fork, branch, commit, and open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
