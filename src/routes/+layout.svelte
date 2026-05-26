<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CreateRoomModal from '$lib/components/CreateRoomModal.svelte';
  import Toast from '$lib/components/Toast.svelte';
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';

  let { children } = $props();
</script>

<Navbar />
<CreateRoomModal />
<Toast />
{#key $page.url.pathname}
  <div transition:fly={{ y: 6, duration: 200, opacity: 0 }}>
    {@render children()}
  </div>
{/key}
{#if !$page.url.pathname.startsWith('/rooms/')}
  <Footer />
{/if}
