# Hexagon

Privacy-first hobby chat room platform. End-to-end encrypted community rooms.

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5 (runes mode)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Motion One
- **Icons**: lucide-svelte
- **Adapter**: `@sveltejs/adapter-static`

## Getting Started

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Project Structure

```
src/
├── app.html              # HTML shell
├── app.css               # Tailwind v4 + custom animations
├── routes/
│   ├── +layout.svelte    # Root layout
│   ├── +page.svelte      # Landing page
│   ├── +error.svelte     # 404 page
│   ├── explore/          # Explore rooms
│   ├── register/         # Auth (Sign In / Register)
│   ├── profile/          # User profile
│   └── rooms/[id]/       # Chat screen
└── lib/
    ├── components/       # Reusable components
    └── stores/           # Svelte 5 runes stores
```

All data is static/hardcoded — no backend calls.
