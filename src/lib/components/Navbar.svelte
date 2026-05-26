<script lang="ts">
  import { Search, Menu, X } from 'lucide-svelte';
  import { createRoomModal } from '$lib/stores/modal.svelte';

  let mobileOpen = $state(false);
  let searchQuery = $state('');
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-hex-green/10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="/" class="flex items-center gap-2.5 flex-shrink-0">
        <div class="w-8 h-8 bg-hex-green rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-lg leading-none">⬡</span>
        </div>
        <span class="text-xl font-bold text-near-black tracking-tight">hexagon</span>
      </a>

      <div class="hidden md:flex flex-1 max-w-md mx-6">
        <div class="relative w-full">
          <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search a hobby room… e.g. Termux, Table Tennis, Chess"
            class="w-full pl-10 pr-4 py-2 rounded-full border border-hex-green/15 bg-white text-sm text-near-black placeholder:text-muted/50 focus:outline-none focus:border-hex-green/30 focus:ring-2 focus:ring-hex-green/8 transition-all"
          />
        </div>
      </div>

      <div class="hidden md:flex items-center gap-5">
        <a href="/register" class="text-sm font-medium text-muted hover:text-hex-green transition-colors">Sign In</a>
        <button
          onclick={() => createRoomModal.show = true}
          class="bg-cta-green hover:bg-cta-hover text-near-black text-sm font-semibold px-5 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-cta-green/20 active:scale-95 cursor-pointer"
        >
          Create a Room
        </button>
      </div>

      <button
        onclick={() => mobileOpen = !mobileOpen}
        class="md:hidden p-2.5 -mr-2 text-muted hover:text-hex-green transition-colors"
        aria-label="Toggle menu"
      >
        {#if mobileOpen}
          <X class="w-5 h-5" />
        {:else}
          <Menu class="w-5 h-5" />
        {/if}
      </button>
    </div>
  </div>

  {#if mobileOpen}
    <div class="md:hidden border-t border-hex-green/10 bg-cream/95 backdrop-blur-md px-4 py-5 space-y-4 animate-slide-in">
      <div class="relative">
        <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search a hobby room…"
          class="w-full pl-10 pr-4 py-2.5 rounded-full border border-hex-green/15 bg-white text-sm text-near-black placeholder:text-muted/50 focus:outline-none focus:border-hex-green/30 transition-all"
        />
      </div>
      <div class="flex flex-col gap-3 pt-1">
        <a href="/register" class="text-sm font-medium text-muted hover:text-hex-green transition-colors py-1">Sign In</a>
        <button
          onclick={() => { createRoomModal.show = true; mobileOpen = false; }}
          class="bg-cta-green hover:bg-cta-hover text-near-black text-sm font-semibold px-5 py-2.5 rounded-full transition-all text-center active:scale-95 cursor-pointer"
        >
          Create a Room
        </button>
      </div>
    </div>
  {/if}
</nav>
