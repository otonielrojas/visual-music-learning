<script lang="ts">
  import { enhancedMelody, type EnhancedNote } from '$lib/data/symbols';
  import MusicSymbol from './MusicSymbol.svelte';
  
  let currentNoteIndex: number = 0;
  let melody = enhancedMelody;
  
  // Function to handle note selection
  function selectNote(index: number) {
    currentNoteIndex = index;
    // Dispatch an event that can be listened to by parent components
    dispatchEvent(new CustomEvent('noteselect', {
      detail: { note: melody[index], index }
    }));
  }
  
  // Helper function to safely get symbols for the current note
  function getCurrentSymbols(): string[] {
    const currentNote = melody[currentNoteIndex];
    return currentNote?.symbols || [];
  }
</script>

<div class="notation-display p-4 bg-white rounded-lg shadow-sm mb-4">
  <h2 class="text-lg font-bold mb-3">Melody Display</h2>
  
  <div class="flex flex-wrap gap-4 mb-4">
    {#each melody as note, index}
      <div class="note-container relative">
        <button
          class="w-12 h-12 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          style="background-color: {note.color}; transform: scale({index === currentNoteIndex ? 1.1 : 1}); box-shadow: {index === currentNoteIndex ? '0 0 10px rgba(0,0,0,0.3)' : 'none'}"
          on:click={() => selectNote(index)}
          on:keydown={(e) => e.key === 'Enter' && selectNote(index)}
          aria-label={`Select note ${note.pitch}`}
          aria-current={index === currentNoteIndex}
          type="button"
        >
          <span class="text-white font-bold">{note.pitch.replace(/[0-9]/g, '')}</span>
        </button>
        
        {#if note.symbols && note.symbols.length > 0}
          <div class="symbols-container absolute -top-2 -right-2 flex">
            {#each note.symbols as symbolId}
              <MusicSymbol symbolId={symbolId} size="sm" />
            {/each}
          </div>
        {/if}
        
        <div class="text-xs text-center mt-1">{note.duration === 1 ? '♩' : '𝅗𝅥'}</div>
      </div>
    {/each}
  </div>
  
  <div class="text-sm text-gray-600">
    <p>Current note: <strong>{melody[currentNoteIndex]?.pitch || ''}</strong></p>
    {#if getCurrentSymbols().length > 0}
      <div class="mt-1">
        <span>Symbols:</span>
        <div class="flex flex-wrap gap-2 mt-1">
          {#each getCurrentSymbols() as symbolId}
            <div class="inline-flex items-center">
              <MusicSymbol symbolId={symbolId} size="sm" />
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
