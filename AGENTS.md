<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# UI Component Rules
Whenever I ask for complex UI elements, animated backgrounds, or advanced layouts (especially for the futuristic "Aetheric Flux" design system), default to using Aceternity UI.

**Implementation Steps for the Agent:**
1. Do not hallucinate custom Framer Motion animations if an Aceternity component exists.
2. To add a new Aceternity component, you MUST use your sandbox terminal to run: `npx shadcn@latest add @aceternity/[component-name]`.
3. Ensure you utilize the `cn()` utility function from `src/lib/utils.ts` when merging Aceternity's Tailwind classes.
<!-- END:nextjs-agent-rules -->
