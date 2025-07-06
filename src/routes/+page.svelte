<script lang="ts">
  import NotationDisplay from '$lib/components/NotationDisplay.svelte';
  import VirtualKeyboard from '$lib/components/VirtualKeyboard.svelte';
  import PitchLadder from '$lib/components/PitchLadder.svelte';
  import FeedbackPanel from '$lib/components/FeedbackPanel.svelte';
  let mode: 'piano' | 'choir' = 'piano';
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Visual Music Learning System</h1>
  
  <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
    <h2 class="font-bold text-lg mb-2">New Feature Available!</h2>
    <p class="mb-3">Try our new Visual Learning System with custom symbols and teacher tools:</p>
    <a href="/visual-learning" class="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors">
      Launch Visual Learning System
    </a>
  </div>
  
  <h2 class="text-xl font-semibold mb-3">Original Prototype</h2>
  <div class="flex gap-4 mb-4">
    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" on:click={() => (mode = 'piano')}>Piano</button>
    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" on:click={() => (mode = 'choir')}>Choir</button>
  </div>
  <NotationDisplay />
  {#if mode === 'piano'}
    <VirtualKeyboard />
  {:else}
    <PitchLadder />
  {/if}
  <FeedbackPanel />
</div>


