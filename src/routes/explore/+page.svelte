<script lang="ts">
  import { Search, ChevronDown } from 'lucide-svelte';
  import RoomCard from '$lib/components/RoomCard.svelte';
  import type { Room } from '$lib/components/RoomCard.svelte';

  const categories = ['All', 'Tech', 'Sports', 'Art', 'Gaming', 'Music'] as const;
  type Category = (typeof categories)[number];

  const rooms: (Room & { category: Category })[] = [
    { id: 1, name: 'Termux enthusiasts', category: 'Tech', image: 'https://picsum.photos/seed/termux/400/250', members: 1234, description: 'Discuss Termux, Linux on Android, automation scripts and more.' },
    { id: 2, name: 'Table Tennis Pros', category: 'Sports', image: 'https://picsum.photos/seed/pingpong/400/250', members: 856, description: 'Serve, smash, and rally with fellow ping pong lovers worldwide.' },
    { id: 3, name: 'Chess Grandmasters', category: 'Gaming', image: 'https://picsum.photos/seed/chess/400/250', members: 2103, description: 'Daily puzzles, game analysis, and tournaments for all levels.' },
    { id: 4, name: 'Photography Lab', category: 'Art', image: 'https://picsum.photos/seed/photography/400/250', members: 3421, description: 'Share your shots, get feedback, and master the craft.' },
    { id: 5, name: 'Lo-Fi Producers', category: 'Music', image: 'https://picsum.photos/seed/lofi/400/250', members: 967, description: 'Make beats, share samples, and collab on chill tracks.' },
    { id: 6, name: 'Rock Climbers', category: 'Sports', image: 'https://picsum.photos/seed/climbing/400/250', members: 645, description: 'Bouldering, rope climbing, gear talk, and send stories.' },
    { id: 7, name: 'Digital Painters', category: 'Art', image: 'https://picsum.photos/seed/digitalart/400/250', members: 1523, description: 'Procreate, Photoshop, Krita — share your digital masterpieces.' },
    { id: 8, name: 'Jazz Jam', category: 'Music', image: 'https://picsum.photos/seed/jazz/400/250', members: 789, description: 'Improvisation, chord progressions, and late-night vinyl vibes.' },
    { id: 9, name: 'Speedrunners', category: 'Gaming', image: 'https://picsum.photos/seed/speedrun/400/250', members: 2341, description: 'Glitch-hunting, PB chasing, and frame-perfect strats.' },
  ];

  let activeCategory = $state<Category>('All');
  let searchQuery = $state('');

  let filteredRooms = $derived(
    rooms.filter(
      (r) =>
        (activeCategory === 'All' || r.category === activeCategory) &&
        (searchQuery === '' || r.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );
</script>

<section class="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <div class="max-w-2xl mx-auto text-center mb-12">
    <h1 class="text-3xl sm:text-4xl font-bold text-near-black tracking-tight mb-6">Explore Groups</h1>
    <div class="relative max-w-xl mx-auto">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search the Hex Net"
        class="w-full pl-12 pr-4 py-3 rounded-full border border-hex-green/15 bg-white text-base text-near-black placeholder:text-muted/50 focus:outline-none focus:border-hex-green/30 focus:ring-2 focus:ring-hex-green/8 transition-all shadow-sm"
      />
    </div>
  </div>

  <div class="flex flex-wrap gap-2 mb-8 justify-center">
    {#each categories as cat}
      <button
        onclick={() => activeCategory = cat}
        class="px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap {activeCategory === cat
          ? 'bg-hex-green text-white shadow-md'
          : 'bg-white text-muted hover:text-hex-green border border-hex-green/10 hover:border-hex-green/30'}"
      >
        {cat}
      </button>
    {/each}
  </div>

  {#if filteredRooms.length === 0}
    <div class="text-center py-16">
      <p class="text-muted/60 text-lg">No rooms found for this search.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredRooms as room (room.id)}
        <RoomCard {room} />
      {/each}
    </div>
  {/if}

  <div class="flex justify-center mt-12">
    <button class="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-hex-green/20 text-hex-green font-semibold hover:border-hex-green hover:bg-hex-green/5 transition-all active:scale-[0.97]">
      Load More
      <ChevronDown class="w-4 h-4" />
    </button>
  </div>
</section>
