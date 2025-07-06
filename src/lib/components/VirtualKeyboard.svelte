<script lang="ts">
  import { melody, type Note } from '$lib/data/melody';
  let currentNoteIndex: number = 0;
  let audioContext: AudioContext | null = null;

  function playNote(frequency: number): void {
    if (!audioContext) audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  }
</script>

<div class="flex space-x-1 mb-4">
  {#each melody as note, index}
    <button
      class:bg-blue-600={note.color === 'blue' && index === currentNoteIndex}
      class:bg-red-600={note.color === 'red' && index === currentNoteIndex}
      class:bg-green-600={note.color === 'green' && index === currentNoteIndex}
      class:bg-yellow-600={note.color === 'yellow' && index === currentNoteIndex}
      class="w-12 h-24 border-2"
      on:click={() => {
        currentNoteIndex = index;
        playNote(note.frequency);
      }}
    >
      {note.pitch}
    </button>
  {/each}
</div>
