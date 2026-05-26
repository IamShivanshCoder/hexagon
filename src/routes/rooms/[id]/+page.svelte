<script lang="ts">
  import { page } from '$app/stores';
  import { Search, MoreVertical, Paperclip, Menu, X, Users, Hash, Globe } from 'lucide-svelte';
  import ChatSidebar from '$lib/components/ChatSidebar.svelte';
  import type { ChatRoom } from '$lib/components/ChatSidebar.svelte';
  import MessageBubble from '$lib/components/MessageBubble.svelte';
  import type { Message } from '$lib/components/MessageBubble.svelte';

  let roomId = $derived($page.params.id);

  const currentUser = { id: 1, username: 'alex', avatar: 'https://picsum.photos/seed/alex/40/40' };

  const chatRooms: ChatRoom[] = [
    { id: '1', name: 'Termux enthusiasts', lastMessage: 'Great tip!' },
    { id: '2', name: 'Table Tennis Pros', lastMessage: 'Anyone up for a match?' },
    { id: '3', name: 'Chess Grandmasters', lastMessage: 'Nice move!' },
    { id: '4', name: 'Photography Lab', lastMessage: 'Check my new shot' },
    { id: '5', name: 'Lo-Fi Producers', lastMessage: 'New beat dropped' },
  ];

  const messages: Message[] = [
    { id: 1, userId: 2, username: 'maya', avatar: 'https://picsum.photos/seed/maya/40/40', text: 'Hey everyone! Just installed Termux on my phone. Any tips for a beginner?', timestamp: '10:32 AM', type: 'text' },
    { id: 2, userId: 3, username: 'riley', avatar: 'https://picsum.photos/seed/riley/40/40', text: 'Welcome! First thing — run `pkg update && pkg upgrade`. Gets you the latest packages.', timestamp: '10:33 AM', type: 'text' },
    { id: 3, userId: 4, username: 'jordan', avatar: 'https://picsum.photos/seed/jordan/40/40', text: 'Also check out termux-setup-storage to access your phone files.', timestamp: '10:34 AM', type: 'text' },
    { id: 4, userId: 1, username: 'alex', avatar: 'https://picsum.photos/seed/alex/40/40', text: 'Pro tip: install `openssh` and you can SSH into your phone from your laptop. Total game changer.', timestamp: '10:36 AM', type: 'text' },
    { id: 5, userId: 2, username: 'maya', avatar: 'https://picsum.photos/seed/maya/40/40', text: 'Whoa that sounds awesome! Does it work with VS Code Remote SSH?', timestamp: '10:37 AM', type: 'text' },
    { id: 6, userId: 5, username: 'sam', avatar: 'https://picsum.photos/seed/sam/40/40', text: 'Check this setup I\'m working on — Neovim running in Termux with a custom config', timestamp: '10:39 AM', type: 'image', imageUrl: 'https://picsum.photos/seed/termux-setup/400/300' },
    { id: 7, userId: 1, username: 'alex', avatar: 'https://picsum.photos/seed/alex/40/40', text: 'Speaking of cool tools, check this out:', timestamp: '10:42 AM', type: 'link', linkPreview: { title: 'Hyperland — The Future of Linux Desktop', description: 'A dynamic window manager with cutting-edge compositing', url: 'https://hyperland.example.com', thumbnail: 'https://picsum.photos/seed/hyperland/400/200' } },
    { id: 8, userId: 3, username: 'riley', avatar: 'https://picsum.photos/seed/riley/40/40', text: 'That looks sick. I\'ve been wanting to try Hyprland but my GPU doesn\'t support it 😢', timestamp: '10:44 AM', type: 'text' },
  ];

  let newMessage = $state('');
  let showMobileSidebar = $state(false);
  let contextMenu = $state<{ show: boolean; x: number; y: number }>({ show: false, x: 0, y: 0 });

  let currentRoom = $derived(chatRooms.find((r) => r.id === roomId));
  let roomName = $derived(currentRoom?.name ?? 'Unknown Room');

  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    contextMenu = { show: true, x: e.clientX, y: e.clientY };
  }

  function closeContextMenu() {
    contextMenu = { show: false, x: 0, y: 0 };
  }

  function sendMessage() {
    if (newMessage.trim()) {
      newMessage = '';
    }
  }
</script>

<svelte:window onclick={closeContextMenu} />

<div class="pt-16 flex h-dvh bg-cream overflow-hidden">
  {#if showMobileSidebar}
    <div class="fixed inset-0 z-40 lg:hidden">
      <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
      <div class="absolute inset-0 bg-near-black/30" onclick={() => showMobileSidebar = false}></div>
      <div class="relative w-72 max-w-[80vw] h-full bg-cream border-r border-hex-green/10 animate-slide-in">
        <div class="flex justify-end p-3">
          <button onclick={() => showMobileSidebar = false} class="p-1 text-muted hover:text-hex-green">
            <X class="w-5 h-5" />
          </button>
        </div>
        <ChatSidebar rooms={chatRooms} activeId={roomId} />
      </div>
    </div>
  {/if}

  <div class="hidden lg:block w-64 xl:w-72 border-r border-hex-green/10 bg-white/50">
    <ChatSidebar rooms={chatRooms} activeId={roomId} />
  </div>

  <div class="flex-1 flex flex-col min-w-0">
    <div class="flex items-center gap-3 px-4 py-3 border-b border-hex-green/10 bg-white/50 flex-shrink-0">
      <button onclick={() => showMobileSidebar = true} class="lg:hidden p-1.5 -ml-1 text-muted hover:text-hex-green transition-colors" aria-label="Toggle sidebar">
        <Menu class="w-5 h-5" />
      </button>
      <div class="flex-1 relative max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
        <input type="text" placeholder="Search the Hex Net" class="w-full pl-9 pr-3 py-1.5 rounded-full border border-hex-green/8 bg-cream text-sm text-near-black placeholder:text-muted/50 focus:outline-none focus:border-hex-green/30 transition-all" />
      </div>
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex -space-x-2">
          <img src="https://picsum.photos/seed/user1/32/32" alt="" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white" />
          <img src="https://picsum.photos/seed/user2/32/32" alt="" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white" />
          <img src="https://picsum.photos/seed/user3/32/32" alt="" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white" />
        </div>
        <button onclick={handleContextMenu} class="p-1.5 text-muted hover:text-hex-green transition-colors" aria-label="More options">
          <MoreVertical class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0">
      {#each messages as msg (msg.id)}
        <MessageBubble message={msg} currentUserId={currentUser.id} onContextMenu={handleContextMenu} />
      {/each}
    </div>

    <div class="border-t border-hex-green/10 bg-white/50 px-4 py-3 flex-shrink-0">
      <div class="flex items-center gap-3 max-w-4xl mx-auto">
        <button class="p-2 text-muted hover:text-hex-green transition-colors" aria-label="Attach file">
          <Paperclip class="w-5 h-5" />
        </button>
        <input
          type="text"
          bind:value={newMessage}
          placeholder="Type a message..."
          class="flex-1 px-4 py-2.5 rounded-full border border-hex-green/10 bg-cream text-sm text-near-black placeholder:text-muted/50 focus:outline-none focus:border-hex-green/30 transition-all"
          onkeydown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
        />
        <button onclick={sendMessage} class="p-2.5 rounded-full bg-hex-green text-white hover:bg-hex-green-light transition-all active:scale-95 shadow-sm" aria-label="Send message">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2L2 12l10 10 10-10L12 2z" />
            <path d="M12 2v20" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <div class="hidden xl:flex flex-col w-72 border-l border-hex-green/10 bg-white/50 p-4">
    <div class="text-center mb-5">
      <img src="https://picsum.photos/seed/{roomId}/120/120" alt={roomName} class="w-16 h-16 rounded-xl object-cover mx-auto mb-3" />
      <h3 class="font-bold text-near-black">{roomName}</h3>
      <div class="flex items-center justify-center gap-1 text-xs text-muted/60 mt-1">
        <Users class="w-3 h-3" />
        <span>1,234 members</span>
      </div>
    </div>
    <div class="border-t border-hex-green/5 pt-4">
      <h4 class="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Online Now</h4>
      <div class="space-y-2.5">
        {#each ['maya', 'riley', 'jordan', 'sam'] as name}
          <div class="flex items-center gap-2.5">
            <div class="relative">
              <img src="https://picsum.photos/seed/{name}/32/32" alt={name} class="w-7 h-7 rounded-full" />
              <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cta-green border-2 border-white"></span>
            </div>
            <span class="text-sm text-near-black">{name}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

{#if contextMenu.show}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="fixed z-50 bg-white rounded-xl shadow-xl border border-hex-green/10 py-1 min-w-[160px] overflow-hidden"
    style="left: {Math.min(contextMenu.x, window.innerWidth - 170)}px; top: {Math.min(contextMenu.y, window.innerHeight - 120)}px"
    onclick={() => closeContextMenu()}
  >
    <button class="w-full text-left px-4 py-2.5 text-sm text-near-black hover:bg-hex-green/5 transition-colors">Report</button>
    <button class="w-full text-left px-4 py-2.5 text-sm text-near-black hover:bg-hex-green/5 transition-colors">Add Friend</button>
  </div>
{/if}
