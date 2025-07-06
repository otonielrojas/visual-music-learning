<script lang="ts">
  import { melody, type Note } from '$lib/data/melody';
  import { onMount } from 'svelte';
  import { PitchDetector } from 'pitchy';

  let feedback: string = 'Click Start to begin pitch detection';
  let currentNoteIndex: number = 0;
  let audioContext: AudioContext | null = null;
  let analyser: AnalyserNode | null = null;
  let source: MediaStreamAudioSourceNode | null = null;
  let pitchDetector: PitchDetector | null = null;
  let detectionActive = false;
  let detectionInterval: number | null = null;
  let currentPitch: number | null = null;
  let currentClarity: number = 0;
  let pitchDifference: number = 0;
  let calibrationOffset: number = 0;
  let toleranceCents: number = 50; // Default tolerance in cents (50 cents = quarter tone)
  let showCalibration = false;

  // Convert frequency difference to cents (musical unit where 100 cents = 1 semitone)
  function frequencyToCents(f1: number, f2: number): number {
    return Math.abs(1200 * Math.log2(f1 / f2));
  }

  // Start pitch detection with user interaction
  async function startPitchDetection(): Promise<void> {
    if (detectionActive) return;
    
    try {
      feedback = 'Accessing microphone...';
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Create audio context on user interaction
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      const fftSize = 2048;
      analyser.fftSize = fftSize;
      const data = new Float32Array(fftSize);
      
      // Initialize the pitch detector
      pitchDetector = PitchDetector.forFloat32Array(fftSize);
      detectionActive = true;
      feedback = 'Sing or play a note!';

      // Start the detection loop
      detectionInterval = window.setInterval(() => {
        if (analyser && audioContext && pitchDetector) {
          analyser.getFloatTimeDomainData(data);
          const [pitch, clarity] = pitchDetector.findPitch(data, audioContext.sampleRate);
          
          // Apply calibration offset
          const calibratedPitch = pitch * (1 + calibrationOffset/100);
          currentPitch = calibratedPitch;
          currentClarity = clarity;
          
          if (calibratedPitch && clarity > 0.8) {
            // Calculate difference in cents
            const targetFreq = melody[currentNoteIndex].frequency;
            const cents = frequencyToCents(calibratedPitch, targetFreq);
            pitchDifference = cents;
            
            if (cents < toleranceCents) {
              feedback = 'Correct!';
              setTimeout(() => {
                currentNoteIndex = (currentNoteIndex + 1) % melody.length;
                feedback = 'Now sing: ' + melody[currentNoteIndex].pitch;
              }, 500);
            } else {
              // Provide directional feedback
              feedback = calibratedPitch > targetFreq ? 'Too high!' : 'Too low!';
            }
          } else if (clarity <= 0.8 && clarity > 0.5) {
            feedback = 'Almost there, sing clearer';
          }
        }
      }, 100);
    } catch (err) {
      feedback = 'Microphone access denied';
      console.error(err);
    }
  }

  // Stop pitch detection
  function stopPitchDetection(): void {
    if (detectionInterval) {
      window.clearInterval(detectionInterval);
      detectionInterval = null;
    }
    
    if (source) {
      source.disconnect();
      source = null;
    }
    
    if (audioContext) {
      audioContext.close().catch(console.error);
      audioContext = null;
    }
    
    detectionActive = false;
    feedback = 'Pitch detection stopped';
    currentPitch = null;
    currentClarity = 0;
  }

  // Adjust calibration
  function adjustCalibration(amount: number): void {
    calibrationOffset += amount;
    feedback = `Calibration: ${calibrationOffset > 0 ? '+' : ''}${calibrationOffset.toFixed(1)}%`;
  }

  // Adjust tolerance
  function adjustTolerance(amount: number): void {
    toleranceCents = Math.max(10, Math.min(100, toleranceCents + amount));
    feedback = `Tolerance: ${toleranceCents.toFixed(0)} cents`;
  }

  onMount(() => {
    // Clean up on component unmount
    return () => {
      if (detectionInterval) {
        window.clearInterval(detectionInterval);
      }
      if (source) {
        source.disconnect();
      }
      if (audioContext) {
        audioContext.close().catch(console.error);
      }
    };
  });
</script>

<div class="p-4 bg-gray-100 rounded-md">
  <div class="mb-4">
    <p class="text-lg font-bold">{feedback}</p>
    
    {#if currentPitch && detectionActive}
      <p class="text-sm">Current pitch: {currentPitch.toFixed(1)} Hz (Clarity: {(currentClarity * 100).toFixed(0)}%)</p>
      
      <!-- Visual pitch meter -->
      <div class="h-8 w-full bg-gray-200 rounded-full mt-2 overflow-hidden">
        <div 
          class="h-full transition-all duration-100"
          class:bg-red-500={pitchDifference > toleranceCents}
          class:bg-yellow-500={pitchDifference <= toleranceCents && pitchDifference > toleranceCents/2}
          class:bg-green-500={pitchDifference <= toleranceCents/2}
          style="width: {Math.min(100, (100 - pitchDifference))}%"
        ></div>
      </div>
      <p class="text-xs text-center mt-1">{pitchDifference.toFixed(0)} cents off</p>
    {/if}
  </div>
  
  <div class="flex gap-2 mb-4">
    {#if !detectionActive}
      <button 
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" 
        on:click={startPitchDetection}
      >
        Start
      </button>
    {:else}
      <button 
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" 
        on:click={stopPitchDetection}
      >
        Stop
      </button>
    {/if}
    
    <button 
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
      on:click={() => showCalibration = !showCalibration}
    >
      {showCalibration ? 'Hide Settings' : 'Show Settings'}
    </button>
  </div>
  
  {#if showCalibration}
    <div class="p-3 bg-white rounded-md shadow-sm">
      <h3 class="font-bold mb-2">Calibration</h3>
      <div class="flex items-center gap-2 mb-2">
        <button 
          class="px-2 py-1 bg-gray-200 rounded" 
          on:click={() => adjustCalibration(-1)}
        >
          -1%
        </button>
        <button 
          class="px-2 py-1 bg-gray-200 rounded" 
          on:click={() => adjustCalibration(-0.1)}
        >
          -0.1%
        </button>
        <span class="px-2">{calibrationOffset > 0 ? '+' : ''}{calibrationOffset.toFixed(1)}%</span>
        <button 
          class="px-2 py-1 bg-gray-200 rounded" 
          on:click={() => adjustCalibration(0.1)}
        >
          +0.1%
        </button>
        <button 
          class="px-2 py-1 bg-gray-200 rounded" 
          on:click={() => adjustCalibration(1)}
        >
          +1%
        </button>
      </div>
      
      <h3 class="font-bold mb-2 mt-4">Tolerance</h3>
      <div class="flex items-center gap-2">
        <button 
          class="px-2 py-1 bg-gray-200 rounded" 
          on:click={() => adjustTolerance(-5)}
        >
          -5 cents
        </button>
        <span class="px-2">{toleranceCents.toFixed(0)} cents</span>
        <button 
          class="px-2 py-1 bg-gray-200 rounded" 
          on:click={() => adjustTolerance(5)}
        >
          +5 cents
        </button>
      </div>
      <p class="text-xs mt-1">100 cents = 1 semitone</p>
    </div>
  {/if}
</div>
