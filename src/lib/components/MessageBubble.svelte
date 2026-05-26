<script lang="ts">
  export interface Message {
    id: number;
    userId: number;
    username: string;
    avatar: string;
    text: string;
    timestamp: string;
    type: 'text' | 'image' | 'link';
    imageUrl?: string;
    linkPreview?: { title: string; description: string; url: string; thumbnail: string };
  }

  let {
    message,
    currentUserId,
    onContextMenu,
  }: {
    message: Message;
    currentUserId: number;
    onContextMenu?: (e: MouseEvent) => void;
  } = $props();

  let isOwn = $derived(message.userId === currentUserId);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="flex {isOwn ? 'justify-end' : 'justify-start'} gap-2.5"
  oncontextmenu={onContextMenu}
>
  {#if !isOwn}
    <img src={message.avatar} alt={message.username} class="w-8 h-8 rounded-full mt-1 flex-shrink-0" />
  {/if}

  <div class="max-w-[80%] sm:max-w-[65%] flex flex-col {isOwn ? 'items-end' : 'items-start'}">
    {#if !isOwn}
      <span class="text-[11px] font-medium text-muted/60 mb-1 ml-1">{message.username}</span>
    {/if}

    {#if message.type === 'image'}
      <div class="rounded-2xl overflow-hidden shadow-sm max-w-xs">
        <img src={message.imageUrl} alt="" class="w-full h-auto block" />
      </div>
    {:else if message.type === 'link' && message.linkPreview}
      <div class="space-y-1.5">
        <div class="rounded-2xl {isOwn ? 'bg-hex-green/8' : 'bg-white'} px-4 py-2.5 shadow-sm {isOwn ? 'rounded-tr-md' : 'rounded-tl-md'}">
          <p class="text-sm text-near-black leading-relaxed">{message.text}</p>
        </div>
        <a
          href={message.linkPreview.url}
          class="block bg-white rounded-xl overflow-hidden shadow-sm border border-hex-green/5 hover:border-hex-green/20 transition-all"
          target="_blank"
        >
          <img src={message.linkPreview.thumbnail} alt="" class="w-full h-20 sm:h-24 object-cover" />
          <div class="px-3 py-2.5">
            <p class="text-xs font-semibold text-near-black truncate">{message.linkPreview.title}</p>
            <p class="text-[11px] text-muted/60 truncate mt-0.5">{message.linkPreview.description}</p>
          </div>
        </a>
      </div>
    {:else}
      <div class="rounded-2xl px-4 py-2.5 shadow-sm {isOwn
        ? 'bg-hex-green/10 rounded-tr-md'
        : 'bg-white rounded-tl-md'}">
        <p class="text-sm text-near-black leading-relaxed">{message.text}</p>
      </div>
    {/if}

    <span class="text-[10px] text-muted/40 mt-1 px-1">{message.timestamp}</span>
  </div>

  {#if isOwn}
    <img src={message.avatar} alt={message.username} class="w-8 h-8 rounded-full mt-1 flex-shrink-0" />
  {/if}
</div>
