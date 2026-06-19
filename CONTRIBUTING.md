# Contributing to QWiki

Thank you for your interest in contributing to QWiki! We welcome contributions from the community to help make this the ultimate quantum knowledge platform.

Please review this document to understand our development workflow, coding standards, and how to get your contributions merged.

---

## Code of Conduct
We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone. Please be respectful, supportive, and collaborative in all communications.

## Development Setup

1. **Fork & Clone**
   Fork the repository to your own GitHub account and clone it locally:
   ```bash
   git clone https://github.com/your-username/quantum-wiki.git
   cd quantum-wiki
   ```

2. **Install Dependencies**
   Use `npm` to install the required node modules:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy the example environment file and configure your own Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```
   *Get your credentials by creating a free project at [Supabase](https://supabase.com).*

4. **Initialize the Database**
   Log in to the Supabase Console, navigate to the **SQL Editor**, and run the contents of the following SQL scripts in order:
   - `supabase_setup.sql` (Creates tables, vector indexes, RLS policies, match functions, and initial articles)
   - `supabase_seed.sql` (Optional: Seeds additional articles if any)
   - `supabase_fix_rls.sql` (Applies security patches)

5. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`.

---

## Coding Standards & Guidelines

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database / Backend:** Supabase (PostgreSQL with `pgvector` for semantic search)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion / Aceternity UI
- **Formatting:** React Markdown, Rehype KaTeX (for mathematical formulas)

### UI and Styling Rules
- **Aesthetic Direction:** We aim for a high-end, premium, dark/glassmorphic "quantum space" look. Avoid generic solid colors.
- **Component Libraries:** We utilize **Aceternity UI** for advanced animated components and interactive elements.
- **Tailwind Utility Merging:** Always use the `cn()` utility function from `src/lib/utils.ts` when merging custom Tailwind classes to avoid specificity issues.
- **Linting:** Ensure your code is clean and passes the linter before committing:
  ```bash
  npm run lint
  ```

---

## Contribution Workflow

1. **Find or Create an Issue:** Always search existing issues or open a new one to discuss major feature changes before starting work.
2. **Create a Feature Branch:** Branch out from `main` using a descriptive name:
   ```bash
   git checkout -b feat/add-quantum-computing-simulator
   ```
3. **Commit your changes:** Write clean, descriptive commit messages:
   ```bash
   git commit -m "feat: implement particle animation background"
   ```
4. **Push & Open a Pull Request:** Push to your fork and create a PR targeting the main repository's `main` branch. Provide a clear summary of the changes and reference any related issues.

Thank you for helping us advance the quantum frontier!
