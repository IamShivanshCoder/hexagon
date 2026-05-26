<script lang="ts">
  import { toastState } from '$lib/stores/toast.svelte';
  import { X, CheckCircle } from 'lucide-svelte';
  import { fly } from 'svelte/transition';
</script>

{#if toastState.visible}
  <div class="fixed bottom-6 right-6 z-50" transition:fly={{ x: 20, duration: 300, opacity: 0 }}>
    <div class="flex items-center gap-3 bg-hex-green text-white pl-4 pr-3 py-3 rounded-xl shadow-lg">
      <CheckCircle class="w-5 h-5 flex-shrink-0" />
      <span class="text-sm font-medium">{toastState.message}</span>
      <button
        onclick={() => toastState.visible = false}
        class="p-0.5 text-white/70 hover:text-white transition-colors ml-1"
        aria-label="Dismiss"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  </div>
{/if}
