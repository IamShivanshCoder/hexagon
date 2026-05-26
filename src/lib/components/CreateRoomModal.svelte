<script lang="ts">
  import { X, Upload, Loader2 } from 'lucide-svelte';
  import { createRoomModal } from '$lib/stores/modal.svelte';
  import { showToast } from '$lib/stores/toast.svelte';
  import { fade } from 'svelte/transition';

  let roomName = $state('');
  let description = $state('');
  let hobbyTag = $state('Tech');
  let coverFile = $state<File | null>(null);
  let coverPreview = $state('');
  let loading = $state(false);
  let submitted = $state(false);
  let dragOver = $state(false);

  let charCount = $derived(description.length);

  let errors = $derived({
    roomName: submitted && !roomName.trim() ? 'Room name is required' : '',
    description: submitted && !description.trim() ? 'Description is required' : '',
    cover: submitted && !coverFile ? 'Cover image is required' : '',
  });

  let valid = $derived(!errors.roomName && !errors.description && !errors.cover);

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragOver = false;
    const file = e.dataTransfer?.files?.[0];
    if (file?.type.startsWith('image/')) {
      coverFile = file;
      coverPreview = URL.createObjectURL(file);
    }
  }

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      coverFile = file;
      coverPreview = URL.createObjectURL(file);
    }
  }

  function reset() {
    roomName = '';
    description = '';
    hobbyTag = 'Tech';
    coverFile = null;
    coverPreview = '';
    loading = false;
    submitted = false;
    dragOver = false;
  }

  function close() {
    createRoomModal.show = false;
    reset();
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    submitted = true;
    if (!valid) return;
    loading = true;
    await new Promise((r) => setTimeout(r, 1000));
    loading = false;
    close();
    showToast('Room created successfully!');
  }
</script>

<svelte:window onkeydown={(e) => { if (e.key === 'Escape') close(); }} />

{#if createRoomModal.show}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" onclick={close}>
    <div class="absolute inset-0 bg-near-black/40 backdrop-blur-sm"></div>
    <div
      class="relative bg-card rounded-2xl shadow-xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto p-6 sm:p-8"
      onclick={(e) => e.stopPropagation()}
      role="dialog"
      transition:fade={{ duration: 150 }}
    >
      <button
        onclick={close}
        class="absolute top-4 right-4 p-1.5 text-muted/50 hover:text-muted transition-colors rounded-lg hover:bg-hex-green/5"
        aria-label="Close modal"
      >
        <X class="w-5 h-5" />
      </button>

      <h2 class="text-xl font-bold text-near-black mb-6">Create a Room</h2>

      <form onsubmit={handleSubmit} class="space-y-4">
        <div>
          <label for="room-name" class="text-sm font-medium text-near-black block mb-1.5">Room Name</label>
          <input
            id="room-name"
            type="text"
            bind:value={roomName}
            placeholder="e.g. Termux enthusiasts"
            class="w-full px-4 py-2.5 rounded-xl border text-sm text-near-black placeholder:text-muted/50 focus:outline-none focus:ring-2 transition-all {errors.roomName ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-hex-green/15 focus:border-hex-green/30 focus:ring-hex-green/8 bg-cream'}"
          />
          {#if errors.roomName}
            <p class="text-xs text-red-500 mt-1.5">{errors.roomName}</p>
          {/if}
        </div>

        <div>
          <label for="description" class="text-sm font-medium text-near-black block mb-1.5">Description</label>
          <textarea
            id="description"
            bind:value={description}
            maxlength="160"
            placeholder="Describe what this room is about…"
            class="w-full px-4 py-2.5 rounded-xl border text-sm text-near-black placeholder:text-muted/50 focus:outline-none focus:ring-2 transition-all resize-none h-24 {errors.description ? 'border-red-400 focus:ring-red-200 bg-red-50' : 'border-hex-green/15 focus:border-hex-green/30 focus:ring-hex-green/8 bg-cream'}"
          ></textarea>
          <div class="flex items-center justify-between mt-1">
            {#if errors.description}
              <p class="text-xs text-red-500">{errors.description}</p>
            {:else}
              <span></span>
            {/if}
            <span class="text-xs text-muted/50">{charCount}/160</span>
          </div>
        </div>

        <div>
          <label for="hobby-tag" class="text-sm font-medium text-near-black block mb-1.5">Hobby Tag</label>
          <select
            id="hobby-tag"
            bind:value={hobbyTag}
            class="w-full px-4 py-2.5 rounded-xl border border-hex-green/15 text-sm text-near-black focus:outline-none focus:ring-2 focus:border-hex-green/30 focus:ring-hex-green/8 bg-cream transition-all appearance-none bg-no-repeat bg-[right_0.75rem_center] [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]"
          >
            <option value="Tech">Tech</option>
            <option value="Sports">Sports</option>
            <option value="Art">Art</option>
            <option value="Gaming">Gaming</option>
            <option value="Music">Music</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label for="cover-input" class="text-sm font-medium text-near-black block mb-1.5">Cover Image</label>
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
        <div
          class="relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all {dragOver ? 'border-hex-green bg-hex-green/5' : errors.cover ? 'border-red-400 bg-red-50' : 'border-hex-green/20 hover:border-hex-green/40 bg-cream'}"
          ondragover={(e) => { e.preventDefault(); dragOver = true; }}
          ondragleave={() => dragOver = false}
          ondrop={handleDrop}
          onclick={() => document.getElementById('cover-input')?.click()}
          >
            {#if coverPreview}
              <img src={coverPreview} alt="Cover preview" class="max-h-32 mx-auto rounded-lg object-cover" />
              <p class="text-xs text-muted/50 mt-2">Click or drag to change</p>
            {:else}
              <Upload class="w-8 h-8 text-muted/40 mx-auto mb-2" />
              <p class="text-sm text-muted/60">Drag & drop or click to upload</p>
              <p class="text-xs text-muted/40 mt-1">PNG, JPG, GIF up to 5MB</p>
            {/if}
          </div>
          <input id="cover-input" type="file" accept="image/png,image/jpeg,image/gif,image/webp" class="hidden" onchange={handleFileSelect} />
          {#if errors.cover}
            <p class="text-xs text-red-500 mt-1.5">{errors.cover}</p>
          {/if}
        </div>

        <button
          type="submit"
          disabled={loading}
          class="w-full flex items-center justify-center gap-2 bg-hex-green hover:bg-hex-green-light text-white font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
        >
          {#if loading}
            <Loader2 class="w-4 h-4 animate-spin" />
            Creating…
          {:else}
            Create Room
          {/if}
        </button>
      </form>
    </div>
  </div>
{/if}
