<script lang="ts">
  import { enhancedMelody, type EnhancedNote } from '$lib/data/symbols';
  import SymbolLibrary from './SymbolLibrary.svelte';
  import MusicSymbol from './MusicSymbol.svelte';
  
  // This is a Svelte component, no explicit default export needed
  
  // State
  let melody: EnhancedNote[] = [...enhancedMelody]; // Start with a copy of the default melody
  let selectedNote: number | null = null;
  let selectedSymbols: string[] = [];
  let newNotePitch = 'C4';
  let newNoteDuration = 1;
  let newNoteColor = '#FF5722';
  
  const availablePitches = [
    'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
    'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
    'C5', 'D5', 'E5', 'F5', 'G5'
  ];
  
  const pitchToFrequency: Record<string, number> = {
    'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99
  };
  
  // Functions
  function selectNote(index: number) {
    selectedNote = index;
    selectedSymbols = [...(melody[index].symbols || [])];
  }
  
  function addNote() {
    const newNote: EnhancedNote = {
      pitch: newNotePitch,
      frequency: pitchToFrequency[newNotePitch] || 261.63,
      duration: newNoteDuration,
      color: newNoteColor,
      symbols: []
    };
    
    melody = [...melody, newNote];
    selectedNote = melody.length - 1;
    selectedSymbols = [];
  }
  
  function removeNote() {
    if (selectedNote !== null) {
      melody = melody.filter((_, i) => i !== selectedNote);
      selectedNote = null;
      selectedSymbols = [];
    }
  }
  
  function updateNoteSymbols() {
    if (selectedNote !== null) {
      melody = melody.map((note, i) => {
        if (i === selectedNote) {
          return { ...note, symbols: [...selectedSymbols] };
        }
        return note;
      });
    }
  }
  
  function moveNoteUp() {
    if (selectedNote !== null && selectedNote > 0) {
      const newMelody = [...melody];
      [newMelody[selectedNote - 1], newMelody[selectedNote]] = [newMelody[selectedNote], newMelody[selectedNote - 1]];
      melody = newMelody;
      selectedNote -= 1;
    }
  }
  
  function moveNoteDown() {
    if (selectedNote !== null && selectedNote < melody.length - 1) {
      const newMelody = [...melody];
      [newMelody[selectedNote], newMelody[selectedNote + 1]] = [newMelody[selectedNote + 1], newMelody[selectedNote]];
      melody = newMelody;
      selectedNote += 1;
    }
  }
  
  function saveMelody() {
    const melodyJson = JSON.stringify(melody, null, 2);
    const blob = new Blob([melodyJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-melody.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  // Update symbols when selection changes
  $: if (selectedNote !== null) {
    updateNoteSymbols();
  }
</script>

<div class="teacher-interface p-4 bg-white rounded-lg shadow-sm">
  <h2 class="text-xl font-bold mb-4">Teacher Lesson Creator</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Melody Editor -->
    <div class="melody-editor">
      <h3 class="text-lg font-semibold mb-3">Melody Notes</h3>
      
      <div class="flex flex-wrap gap-3 mb-4 p-4 bg-gray-50 rounded-md min-h-40">
        {#each melody as note, i}
          <div 
            class="note-item relative p-2 rounded-md cursor-pointer transition-all"
            class:bg-blue-100={selectedNote === i}
            on:click={() => selectNote(i)}
            on:keydown={(e) => e.key === 'Enter' && selectNote(i)}
            role="button"
            tabindex="0"
            aria-pressed={selectedNote === i}
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center"
              style="background-color: {note.color}"
            >
              <span class="text-white font-bold">{note.pitch.replace(/[0-9]/g, '')}</span>
            </div>
            
            {#if note.symbols && note.symbols.length > 0}
              <div class="absolute -top-2 -right-2 flex">
                {#each note.symbols.slice(0, 2) as symbolId}
                  <MusicSymbol symbolId={symbolId} size="sm" />
                {/each}
                {#if (note.symbols?.length || 0) > 2}
                  <span class="text-xs bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center">+{(note.symbols?.length || 0) - 2}</span>
                {/if}
              </div>
            {/if}
          </div>
        {/each}
      </div>
      
      <div class="flex gap-2 mb-4">
        <button 
          class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          on:click={addNote}
        >
          Add Note
        </button>
        
        <button 
          class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          on:click={removeNote}
          disabled={selectedNote === null}
        >
          Remove Note
        </button>
        
        <button 
          class="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
          on:click={moveNoteUp}
          disabled={selectedNote === null || selectedNote === 0}
        >
          ↑
        </button>
        
        <button 
          class="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
          on:click={moveNoteDown}
          disabled={selectedNote === null || selectedNote === melody.length - 1}
        >
          ↓
        </button>
      </div>
      
      <!-- New Note Form -->
      <div class="new-note-form p-3 bg-gray-100 rounded-md mb-4">
        <h4 class="font-medium mb-2">New Note Properties</h4>
        
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="pitch-select" class="block text-sm mb-1">Pitch</label>
            <select 
              id="pitch-select"
              class="w-full p-2 border rounded"
              bind:value={newNotePitch}
            >
              {#each availablePitches as pitch}
                <option value={pitch}>{pitch}</option>
              {/each}
            </select>
          </div>
          
          <div>
            <label for="duration-select" class="block text-sm mb-1">Duration</label>
            <select 
              id="duration-select"
              class="w-full p-2 border rounded"
              bind:value={newNoteDuration}
            >
              <option value={0.5}>½ beat</option>
              <option value={1}>1 beat</option>
              <option value={2}>2 beats</option>
              <option value={4}>4 beats</option>
            </select>
          </div>
          
          <div>
            <label for="note-color" class="block text-sm mb-1">Color</label>
            <input 
              id="note-color"
              type="color" 
              class="w-full p-1 border rounded h-10"
              bind:value={newNoteColor}
            />
          </div>
        </div>
      </div>
      
      <button 
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
        on:click={saveMelody}
      >
        Save Lesson
      </button>
    </div>
    
    <!-- Symbol Selector -->
    <div class="symbol-selector">
      <h3 class="text-lg font-semibold mb-3">
        {#if selectedNote !== null}
          Symbols for Note {melody[selectedNote].pitch}
        {:else}
          Select a note to add symbols
        {/if}
      </h3>
      
      <SymbolLibrary 
        selectable={selectedNote !== null}
        bind:selectedSymbols={selectedSymbols}
      />
    </div>
  </div>
</div>
