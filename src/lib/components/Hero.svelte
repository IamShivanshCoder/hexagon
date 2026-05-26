<script lang="ts">
  import { animate } from 'motion';
  import { ArrowRight, Compass } from 'lucide-svelte';
  import { createRoomModal } from '$lib/stores/modal.svelte';

  const pills = [
    { label: '#TableTennis', emoji: '🏓', top: '14%', left: '6%' },
    { label: '#Termux', emoji: '🖥', top: '10%', right: '10%' },
    { label: '#Chess', emoji: '♟', bottom: '22%', left: '12%' },
    { label: '#Photography', emoji: '📷', bottom: '18%', right: '8%' },
    { label: '#Guitar', emoji: '🎸', top: '42%', left: '3%' },
    { label: '#Running', emoji: '🏃', top: '38%', right: '6%' },
  ];

  let animCleanups: Array<() => void> = [];

  $effect(() => {
    pills.forEach((_, i) => {
      const el = document.getElementById(`hero-pill-${i}`);
      if (!el) return;
      const xDrift = (Math.random() - 0.5) * 16;
      const yDrift = -(10 + Math.random() * 18);
      const dur = 3.5 + Math.random() * 3;
      const anim = animate(
        el,
        { y: [0, yDrift, 0], x: [0, xDrift, 0] },
        { duration: dur, repeat: Infinity, delay: i * 0.35, easing: 'ease-in-out' }
      );
      animCleanups.push(() => anim.stop());
    });
    return () => {
      animCleanups.forEach((fn) => fn());
      animCleanups = [];
    };
  });
</script>

<section class="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 px-4">
  {#each pills as pill, i}
    <div
      id="hero-pill-{i}"
      class="absolute hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-hex-green/10 text-sm font-medium text-hex-green shadow-sm whitespace-nowrap"
      style="top: {pill.top}; left: {pill.left}; right: {pill.right}; bottom: {pill.bottom}"
    >
      <span>{pill.emoji}</span>
      <span>{pill.label}</span>
    </div>
  {/each}

  <div class="relative z-10 max-w-3xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-hex-green/8 border border-hex-green/15 text-hex-green text-sm font-medium mb-8 animate-fade-in-up">
      <span class="w-2 h-2 rounded-full bg-cta-green animate-pulse"></span>
      End-to-end encrypted
    </div>

    <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-in-up" style="animation-delay: 0.1s">
      <span class="text-near-black">Find your people.</span><br />
      <span class="text-hex-green">Join the room.</span>
    </h1>

    <p class="text-base sm:text-lg text-muted/90 max-w-xl mx-auto leading-relaxed mb-10 animate-fade-in-up" style="animation-delay: 0.2s">
      Explore public hobby chat rooms, talk to strangers, and build your community — all end-to-end encrypted.
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up" style="animation-delay: 0.3s">
      <a
        href="/explore"
        class="flex items-center gap-2 bg-hex-green hover:bg-hex-green-light text-white font-semibold px-7 py-3 rounded-full transition-all hover:shadow-xl hover:shadow-hex-green/20 active:scale-[0.97]"
      >
        <Compass class="w-4 h-4" />
        Explore Rooms
      </a>
      <button
        onclick={() => createRoomModal.show = true}
        class="flex items-center gap-2 border-2 border-hex-green/30 text-hex-green font-semibold px-7 py-3 rounded-full transition-all hover:border-hex-green hover:bg-hex-green/5 active:scale-[0.97] cursor-pointer"
      >
        Create a Room
        <ArrowRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</section>
