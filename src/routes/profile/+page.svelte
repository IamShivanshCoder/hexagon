<script lang="ts">
  import { Settings, Edit3, Users, MessageCircle, Hash, ChevronRight, Shield } from 'lucide-svelte';

  const user = {
    username: 'alex',
    avatar: 'https://picsum.photos/seed/alex/200/200',
    bio: 'Full-time developer, part-time photographer. Building things with code and capturing moments with light.',
    joinDate: 'March 2025',
    stats: { rooms: 8, friends: 42, messages: 1567 },
  };

  const joinedRooms = [
    { id: 1, name: 'Termux enthusiasts', image: 'https://picsum.photos/seed/termux/400/250', members: 1234 },
    { id: 3, name: 'Chess Grandmasters', image: 'https://picsum.photos/seed/chess/400/250', members: 2103 },
    { id: 4, name: 'Photography Lab', image: 'https://picsum.photos/seed/photography/400/250', members: 3421 },
    { id: 5, name: 'Lo-Fi Producers', image: 'https://picsum.photos/seed/lofi/400/250', members: 967 },
  ];

  function fmt(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }
</script>

<section class="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
  <div class="bg-card rounded-2xl shadow-sm p-6 sm:p-8 mb-6">
    <div class="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
      <img src={user.avatar} alt={user.username} class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm" />
      <div class="text-center sm:text-left flex-1">
        <h1 class="text-2xl sm:text-3xl font-bold text-near-black tracking-tight">{user.username}</h1>
        <p class="text-sm text-muted/70 mt-1.5 max-w-md leading-relaxed">{user.bio}</p>
        <p class="text-xs text-muted/50 mt-2">Joined {user.joinDate}</p>
      </div>
      <div class="flex sm:flex-col gap-2">
        <button class="flex items-center gap-2 bg-hex-green hover:bg-hex-green-light text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all active:scale-95 shadow-sm">
          <Edit3 class="w-4 h-4" />
          Edit Profile
        </button>
        <a href="/settings" class="flex items-center gap-2 border-2 border-hex-green/15 text-muted hover:text-hex-green hover:border-hex-green/30 text-sm font-medium px-5 py-2.5 rounded-full transition-all">
          <Settings class="w-4 h-4" />
          Settings
        </a>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
    {#each [{ label: 'Rooms Joined', value: user.stats.rooms, icon: Hash }, { label: 'Friends', value: user.stats.friends, icon: Users }, { label: 'Messages Sent', value: user.stats.messages, icon: MessageCircle }] as stat}
      <div class="bg-card rounded-xl shadow-sm p-4 sm:p-5 text-center hover:shadow-md transition-all">
        <div class="w-9 h-9 rounded-lg bg-hex-green/10 flex items-center justify-center mx-auto mb-2.5">
          <svelte:component this={stat.icon} class="w-4 h-4 text-hex-green" />
        </div>
        <p class="text-xl sm:text-2xl font-bold text-near-black">{fmt(stat.value)}</p>
        <p class="text-xs text-muted/60 mt-0.5">{stat.label}</p>
      </div>
    {/each}
  </div>

  <div class="bg-card rounded-2xl shadow-sm p-6 sm:p-8">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-lg font-bold text-near-black">Joined Rooms</h2>
      <a href="/explore" class="text-sm text-hex-green font-medium hover:underline">Browse All</a>
    </div>
    <div class="space-y-3">
      {#each joinedRooms as room}
        <a
          href="/rooms/{room.id}"
          class="flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-hex-green/5 transition-all group"
        >
          <img src={room.image} alt={room.name} class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-near-black truncate">{room.name}</p>
            <p class="text-xs text-muted/60">{fmt(room.members)} members</p>
          </div>
          <ChevronRight class="w-4 h-4 text-muted/30 group-hover:text-hex-green transition-colors flex-shrink-0" />
        </a>
      {/each}
    </div>
  </div>

  <div class="flex justify-center mt-8">
    <a href="/settings" class="flex items-center gap-2 text-sm text-muted/60 hover:text-hex-green transition-colors">
      <Shield class="w-4 h-4" />
      Account Settings
      <ChevronRight class="w-3.5 h-3.5" />
    </a>
  </div>
</section>
