<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Home, Compass } from 'lucide-svelte';

  const pills = [
    { label: '#404', top: '12%', left: '6%' },
    { label: '#Lost', top: '8%', right: '12%' },
    { label: '#Oops', bottom: '24%', left: '10%' },
    { label: '#BrokenLink', bottom: '15%', right: '8%' },
    { label: '#PageNotFound', top: '44%', left: '4%' },
  ];
</script>

<svelte:head>
  <title>404 — Page Not Found — Hexagon</title>
</svelte:head>

<section class="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden px-4">
  <div class="absolute inset-0 pointer-events-none">
    {#each pills as pill, i}
      <div
        class="absolute hidden sm:flex px-3.5 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-hex-green/10 text-sm font-medium text-hex-green/30 shadow-sm"
        style="top: {pill.top}; left: {pill.left}; right: {pill.right}; bottom: {pill.bottom}; animation: float 5s ease-in-out {i * 0.6}s infinite"
      >
        {pill.label}
      </div>
    {/each}
  </div>

  <div class="relative z-10 text-center" transition:fade={{ duration: 400 }}>
    <p class="text-8xl sm:text-9xl font-extrabold text-hex-green tracking-tighter leading-none mb-4">404</p>
    <h1 class="text-3xl sm:text-4xl font-bold text-near-black tracking-tight mb-3">Room not found.</h1>
    <p class="text-sm sm:text-base text-muted/70 max-w-md mx-auto mb-8 leading-relaxed">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
      <a
        href="/"
        class="flex items-center gap-2 bg-hex-green hover:bg-hex-green-light text-white font-semibold px-6 py-3 rounded-full transition-all hover:shadow-xl hover:shadow-hex-green/20 active:scale-[0.97]"
      >
        <Home class="w-4 h-4" />
        Go Home
      </a>
      <a
        href="/explore"
        class="flex items-center gap-2 border-2 border-hex-green/30 text-hex-green font-semibold px-6 py-3 rounded-full transition-all hover:border-hex-green hover:bg-hex-green/5 active:scale-[0.97]"
      >
        <Compass class="w-4 h-4" />
        Explore Rooms
      </a>
    </div>
  </div>
</section>
