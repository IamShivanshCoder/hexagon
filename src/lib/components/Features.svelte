<script lang="ts">
  import { Compass, MessageCircle, Sparkles } from 'lucide-svelte';

  const features = [
    {
      icon: Compass,
      title: 'Search your hobby',
      description: 'Find rooms for any interest — from coding to ceramics. Our smart search connects you with your people instantly.',
    },
    {
      icon: MessageCircle,
      title: 'Join & Chat',
      description: 'Jump into end-to-end encrypted conversations. Text, voice, and media — all private, all yours.',
    },
    {
      icon: Sparkles,
      title: 'Create Your Own',
      description: 'Start a room around any hobby in seconds. Set the vibe, invite members, and grow your community.',
    },
  ];
</script>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
  <div class="text-center mb-12 sm:mb-16">
    <span class="inline-block px-4 py-1.5 rounded-full bg-hex-green/8 border border-hex-green/15 text-hex-green text-sm font-medium mb-4">
      Simple. Fast. Private.
    </span>
  </div>

  <div class="grid md:grid-cols-3 gap-6 sm:gap-8">
    {#each features as feat, i}
      <div
        class="bg-card rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
        style="animation: fade-in-up 0.6s ease-out {i * 0.12}s both"
      >
        <div class="w-12 h-12 rounded-xl bg-hex-green/10 flex items-center justify-center mb-5 group-hover:bg-hex-green group-hover:scale-110 transition-all duration-300">
          <svelte:component this={feat.icon} class="w-6 h-6 text-hex-green group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 class="text-lg font-bold text-near-black mb-2.5">{feat.title}</h3>
        <p class="text-sm text-muted/80 leading-relaxed">{feat.description}</p>
      </div>
    {/each}
  </div>
</section>
