<script lang="ts">
  import { Hash, ChevronRight } from 'lucide-svelte';

  export interface ChatRoom {
    id: string;
    name: string;
    lastMessage: string;
  }

  let { rooms, activeId }: { rooms: ChatRoom[]; activeId: string } = $props();
</script>

<aside class="h-full flex flex-col">
  <div class="p-4 border-b border-hex-green/10">
    <a href="/" class="flex items-center gap-2">
      <div class="w-7 h-7 bg-hex-green rounded-lg flex items-center justify-center">
        <span class="text-white font-bold text-sm leading-none">⬡</span>
      </div>
      <span class="text-base font-bold text-near-black tracking-tight">hexagon</span>
    </a>
  </div>
  <div class="flex-1 overflow-y-auto p-3">
    <h3 class="text-xs font-semibold text-muted uppercase tracking-wider mb-2 px-2">Chats</h3>
    <div class="space-y-0.5">
      {#each rooms as room}
        <a
          href="/rooms/{room.id}"
          class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all {room.id === activeId
            ? 'bg-hex-green/10 text-hex-green font-medium shadow-sm'
            : 'text-muted hover:text-near-black hover:bg-hex-green/5'}"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <Hash class="w-4 h-4 flex-shrink-0 opacity-60" />
            <span class="truncate">{room.name}</span>
          </div>
          <ChevronRight class="w-3.5 h-3.5 flex-shrink-0 transition-colors {room.id === activeId ? 'text-hex-green' : 'text-muted/20'}" />
        </a>
      {/each}
    </div>
  </div>
</aside>
