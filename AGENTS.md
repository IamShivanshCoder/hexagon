# Hexagon

Privacy-first hobby chat room platform. End-to-end encrypted community rooms.

## Tech Stack

- **Framework**: SvelteKit 2 + Svelte 5 (runes mode: `$state`, `$derived`, `$effect`, `$props`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`, `@theme` for custom tokens)
- **Animation**: Motion One (`motion` npm package — `animate`, `inView` imports)
- **Icons**: lucide-svelte (`import { Search, Menu, ... } from 'lucide-svelte'`)
- **Adapter**: `@sveltejs/adapter-static`

## Design System

| Token | Value | Usage |
|---|---|---|
| `bg-cream` | `#f5f5ee` | Page background + dot pattern (`radial-gradient`) |
| `text-hex-green` / `bg-hex-green` | `#2d5a3d` | Accent headings, primary buttons, icons |
| `bg-cta-green` | `#4ade80` | CTA buttons ("Create a Room") |
| `bg-cta-hover` | `#22c55e` | CTA hover |
| `text-near-black` | `#1a1a1a` | Body text, headings |
| `bg-card` | `#ffffff` | Card backgrounds |
| `text-muted` | `#6b7280` | Secondary text |

Cards: `bg-card rounded-2xl shadow-sm hover:shadow-xl` pattern.
Buttons: `rounded-full` (nav CTAs) or `rounded-xl` (forms, modals).

## Project Structure

```
src/
├── app.html              # HTML shell
├── app.css               # Tailwind v4 + custom animations + dot bg
├── app.d.ts              # Type declarations
├── routes/
│   ├── +layout.svelte    # Root layout: Navbar + CreateRoomModal + Toast + page content + Footer
│   ├── +page.svelte       # Landing: Hero, BrowseHobby, Features
│   ├── +error.svelte      # 404 page with floating pills, Go Home / Explore Rooms buttons
│   ├── explore/+page.svelte          # Explore page: search hero, filter tabs, room grid, Load More
│   ├── register/+page.svelte         # Combined auth page: Sign In / Register tab switcher
│   ├── profile/+page.svelte          # Profile: avatar, stats, joined rooms list
│   └── rooms/[id]/+page.svelte       # Chat screen: 3-column layout, messages, context menu
├── lib/
│   ├── components/
│   │   ├── Navbar.svelte           # Fixed top nav: logo, search, Sign In link, Create a Room modal trigger
│   │   ├── Hero.svelte             # Hero section: floating pills (Motion One), heading, CTAs
│   │   ├── BrowseHobby.svelte      # Landing section: filter pills, room card carousel, Motion One inView
│   │   ├── Features.svelte         # Landing section: 3 feature cards
│   │   ├── Footer.svelte           # Site footer: branding, 3 link columns
│   │   ├── RoomCard.svelte         # Reusable room card: cover, Live badge, member count, name, description, Join
│   │   ├── ChatSidebar.svelte      # Chat left sidebar: logo, Chats list with active highlight
│   │   ├── MessageBubble.svelte    # Message: text (own=right/green, other=left/white), image, link preview
│   │   ├── CreateRoomModal.svelte  # Modal overlay: name, description (160-char), hobby dropdown, cover drag-drop, validation
│   │   └── Toast.svelte            # Bottom-right auto-dismiss notification
│   └── stores/
│       ├── modal.svelte.ts         # $state: showCreateRoom (boolean)
│       └── toast.svelte.ts         # $state: toastState {message, visible} + showToast() function
```

## Routes

| Path | Page | Key Features |
|---|---|---|
| `/` | Landing | Hero, Browse by Hobby carousel, Features |
| `/explore` | Explore | Search "Search the Hex Net", filter tabs, room grid, Load More |
| `/register` | Auth | Tab switcher (Sign In / Register), validation, strength bar, Google button |
| `/rooms/[id]` | Chat | 3-column layout, message bubbles, context menu, input bar, right panel |
| `/profile` | Profile | Avatar, stats row, joined rooms list, Edit Profile, Settings |
| `*` | 404 | Floating pills, "Room not found.", Go Home / Explore Rooms |

## Svelte 5 Runes Patterns

- **`$state()`** — reactive local state (e.g. `let count = $state(0)`)
- **`$derived(expr)`** — computed values (e.g. `let doubled = $derived(count * 2)`)
- **`$effect(() => {...})`** — side effects, return cleanup function
- **`$props()`** — component props (e.g. `let { room } = $props()`)
- **`{@render children()}`** — slot/children in layouts
- **`onclick={handler}`** — event handlers (new syntax, no `on:` prefix)
- **`bind:value={state}`** — two-way binding still works with `$state`
- **`bind:this={ref}`** — element references with plain `let` declarations
- **`{#key expr}...{/key}`** — destroy/recreate on value change (used for page transitions)

## Key Components API

### RoomCard
```svelte
<RoomCard room={{ id, name, image, members, description }} />
```

### ChatSidebar
```svelte
<ChatSidebar rooms={ChatRoom[]} activeId={string} />
```

### MessageBubble
```svelte
<MessageBubble message={Message} currentUserId={number} onContextMenu={fn} />
```

### Toast
```typescript
import { showToast } from '$lib/stores/toast.svelte';
showToast('Room created successfully!');
```

### Modal
```typescript
import { createRoomModal } from '$lib/stores/modal.svelte';
createRoomModal.show = true; // opens modal
```

## Data Models (TypeScript interfaces in components)

```typescript
interface Room { id: number; name: string; image: string; members: number; description: string; }
interface Message {
  id: number; userId: number; username: string; avatar: string;
  text: string; timestamp: string; type: 'text' | 'image' | 'link';
  imageUrl?: string; linkPreview?: { title: string; description: string; url: string; thumbnail: string };
}
interface ChatRoom { id: string; name: string; lastMessage: string; }
```

## Page Transitions

Root layout wraps page content in `{#key $page.url.pathname}` with `transition:fly={{ y: 6, duration: 200, opacity: 0 }}`.

## Notes

- Footer is hidden on `/rooms/*` pages.
- Navbar is fixed at top (h-16 = 4rem). All pages padding-top accounts for it (`pt-24` or `pt-16`).
- Chat screen uses `h-dvh` for mobile browser chrome support.
- All data is static/hardcoded — no backend calls.
- Images use `https://picsum.photos/seed/{seed}/{width}/{height}`.
