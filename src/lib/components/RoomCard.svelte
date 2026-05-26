<script lang="ts">
  import { Users } from 'lucide-svelte';

  export interface Room {
    id: number;
    name: string;
    image: string;
    members: number;
    description: string;
  }

  let { room }: { room: Room } = $props();

  function fmt(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }
</script>

<article class="room-card bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
  <div class="relative overflow-hidden">
    <img
      src={room.image}
      alt={room.name}
      class="w-full h-44 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div class="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cta-green/90 text-xs font-semibold text-near-black shadow-sm">
      <span class="w-1.5 h-1.5 rounded-full bg-near-black animate-pulse"></span>
      Live
    </div>
    <div class="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-near-black/70 text-white text-xs font-medium backdrop-blur-sm">
      <Users class="w-3 h-3" />
      {fmt(room.members)}
    </div>
  </div>
  <div class="p-4 sm:p-5 flex flex-col flex-1">
    <h3 class="text-base sm:text-lg font-bold text-near-black mb-1.5">{room.name}</h3>
    <p class="text-sm text-muted/80 leading-relaxed mb-4 flex-1">{room.description}</p>
    <a
      href="/rooms/{room.id}"
      class="inline-flex items-center gap-1.5 text-hex-green font-semibold text-sm group/btn hover:gap-2.5 transition-all"
    >
      Join Room
      <span class="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
    </a>
  </div>
</article>
