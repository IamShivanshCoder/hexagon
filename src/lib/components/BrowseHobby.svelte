<script lang="ts">
  import { ChevronLeft, ChevronRight, Users } from 'lucide-svelte';
  import { animate, inView } from 'motion';
  import RoomCard from './RoomCard.svelte';
  import type { Room } from './RoomCard.svelte';

  const categories = ['All', 'Tech', 'Sports', 'Art', 'Gaming', 'Music'] as const;
  type Category = (typeof categories)[number];

  const rooms: (Room & { category: Category })[] = [
    { id: 1, name: 'Termux enthusiasts', category: 'Tech', image: 'https://picsum.photos/seed/termux/400/250', members: 1234, description: 'Discuss Termux, Linux on Android, automation scripts and more.' },
    { id: 2, name: 'Table Tennis Pros', category: 'Sports', image: 'https://picsum.photos/seed/pingpong/400/250', members: 856, description: 'Serve, smash, and rally with fellow ping pong lovers worldwide.' },
    { id: 3, name: 'Chess Grandmasters', category: 'Gaming', image: 'https://picsum.photos/seed/chess/400/250', members: 2103, description: 'Daily puzzles, game analysis, and tournaments for all levels.' },
    { id: 4, name: 'Photography Lab', category: 'Art', image: 'https://picsum.photos/seed/photography/400/250', members: 3421, description: 'Share your shots, get feedback, and master the craft.' },
    { id: 5, name: 'Lo-Fi Producers', category: 'Music', image: 'https://picsum.photos/seed/lofi/400/250', members: 967, description: 'Make beats, share samples, and collab on chill tracks.' },
    { id: 6, name: 'Rock Climbers', category: 'Sports', image: 'https://picsum.photos/seed/climbing/400/250', members: 645, description: 'Bouldering, rope climbing, gear talk, and send stories.' },
  ];

  let activeCategory = $state<Category>('All');
  let filterScroll: HTMLDivElement;
  let cardScroll: HTMLDivElement;

  let filteredRooms = $derived(
    activeCategory === 'All' ? rooms : rooms.filter((r) => r.category === activeCategory)
  );

  function scrollPills(dir: -1 | 1) {
    filterScroll?.scrollBy({ left: dir * 200, behavior: 'smooth' });
  }

  function scrollCards(dir: -1 | 1) {
    if (!cardScroll) return;
    cardScroll.scrollBy({ left: dir * cardScroll.clientWidth * 0.7, behavior: 'smooth' });
  }

  $effect(() => {
    const els = document.querySelectorAll<HTMLElement>('.room-card');
    const cleanups: Array<() => void> = [];
    els.forEach((el, i) => {
      const stop = inView(el, () => {
        const a = animate(el, { opacity: [0, 1], y: [20, 0] }, { duration: 0.45, delay: i * 0.06, easing: [0.16, 1, 0.3, 1] });
        return () => a.stop();
      });
      cleanups.push(stop);
    });
    return () => cleanups.forEach((fn) => fn());
  });
</script>

<section id="browse" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
  <div class="flex items-center justify-between mb-8">
    <h2 class="text-2xl sm:text-3xl font-bold text-near-black tracking-tight">Browse by Hobby</h2>
  </div>

  <div class="flex items-center gap-2 mb-8">
    <button onclick={() => scrollPills(-1)} class="flex-shrink-0 p-1.5 rounded-full border border-hex-green/15 text-hex-green hover:bg-hex-green/5 transition-colors" aria-label="Scroll filters left">
      <ChevronLeft class="w-4 h-4" />
    </button>
    <div bind:this={filterScroll} class="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
      {#each categories as cat}
        <button
          onclick={() => activeCategory = cat}
          class="snap-start flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap {activeCategory === cat
            ? 'bg-hex-green text-white shadow-md'
            : 'bg-white text-muted hover:text-hex-green border border-hex-green/10 hover:border-hex-green/30'}"
        >
          {cat}
        </button>
      {/each}
    </div>
    <button onclick={() => scrollPills(1)} class="flex-shrink-0 p-1.5 rounded-full border border-hex-green/15 text-hex-green hover:bg-hex-green/5 transition-colors" aria-label="Scroll filters right">
      <ChevronRight class="w-4 h-4" />
    </button>
  </div>

  <div class="relative">
    <button onclick={() => scrollCards(-1)} class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 hidden lg:flex p-2 rounded-full bg-white border border-hex-green/10 text-hex-green shadow-md hover:shadow-lg transition-all hover:-translate-x-2" aria-label="Scroll rooms left">
      <ChevronLeft class="w-5 h-5" />
    </button>
    <div bind:this={cardScroll} class="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4">
      {#each filteredRooms as room (room.id)}
        <div class="snap-start flex-shrink-0 w-[85vw] sm:w-[44vw] lg:w-[calc(33.33%-1.35rem)]">
          <RoomCard {room} />
        </div>
      {/each}
    </div>
    <button onclick={() => scrollCards(1)} class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 hidden lg:flex p-2 rounded-full bg-white border border-hex-green/10 text-hex-green shadow-md hover:shadow-lg transition-all hover:translate-x-2" aria-label="Scroll rooms right">
      <ChevronRight class="w-5 h-5" />
    </button>
  </div>
</section>
