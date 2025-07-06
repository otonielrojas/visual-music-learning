<script lang="ts">
  import NotationDisplay from '$lib/components/NotationDisplay.svelte';
  import TeacherInterface from '$lib/components/TeacherInterface.svelte';
  import SymbolLibrary from '$lib/components/SymbolLibrary.svelte';
  import TutorialOverlay from '$lib/components/TutorialOverlay.svelte';
  import { defaultSymbols, enhancedMelody } from '$lib/data/symbols';
  import { onMount } from 'svelte';
  
  let selectedSymbols: string[] = [];
  let activeTab: 'student' | 'teacher' = 'student';
  let showTutorial = false;
  let currentTutorialStep = 0;
  let tutorialCompleted = false;
  
  // Show tutorial automatically on first visit
  onMount(() => {
    // Check if tutorial has been shown before
    const tutorialShown = localStorage.getItem('tutorial-shown');
    if (!tutorialShown) {
      showTutorial = true;
      localStorage.setItem('tutorial-shown', 'true');
    } else {
      tutorialCompleted = true;
    }
  });
  
  function handleTutorialComplete() {
    tutorialCompleted = true;
    showTutorial = false;
  }
  
  function restartTutorial() {
    currentTutorialStep = 0;
    showTutorial = true;
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Visual Music Learning System</h1>
  
  <div class="mb-6">
    <div class="flex border-b border-gray-200">
      <button 
        class="py-2 px-4 font-medium text-sm focus:outline-none"
        class:text-blue-600={activeTab === 'student'}
        class:border-b-2={activeTab === 'student'}
        class:border-blue-600={activeTab === 'student'}
        on:click={() => activeTab = 'student'}
      >
        Student View
      </button>
      <button 
        class="py-2 px-4 font-medium text-sm focus:outline-none"
        class:text-blue-600={activeTab === 'teacher'}
        class:border-b-2={activeTab === 'teacher'}
        class:border-blue-600={activeTab === 'teacher'}
        on:click={() => activeTab = 'teacher'}
      >
        Teacher View
      </button>
    </div>
  </div>
  
  <!-- Tutorial Overlay -->
  <TutorialOverlay 
    bind:showTutorial 
    bind:currentStep={currentTutorialStep}
    totalSteps={5}
    on:complete={handleTutorialComplete} 
  />

  {#if activeTab === 'student'}
    <div class="student-view">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold">Learn with Visual Notation</h2>
              <button 
                class="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                on:click={restartTutorial}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tutorial
              </button>
            </div>
            
            <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <h3 class="font-bold mb-2">How to Practice</h3>
              <ol class="list-decimal list-inside space-y-2">
                <li>This is a C Major scale with proper finger positioning</li>
                <li>Click on each note to select it and see which finger to use</li>
                <li>Pay attention to the <strong>thumb under</strong> technique after E</li>
                <li>Notice how each note is color-coded to help with recognition</li>
                <li>Practice playing the scale following the finger numbers</li>
              </ol>
            </div>
            
            <p class="mb-4">
              This system helps you learn music through visual cues and symbols that make musical concepts easier to understand.
              The example below shows a C Major scale with proper finger positioning technique.
            </p>
            
            <div class="mb-6">
              <h3 class="font-semibold mb-2">Symbol Legend:</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <span class="text-2xl">👍</span>
                  <span>Thumb (Finger 1)</span>
                </div>
                <div class="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <span class="text-2xl">☝️</span>
                  <span>Index (Finger 2)</span>
                </div>
                <div class="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <span class="text-2xl">✌️</span>
                  <span>Middle (Finger 3)</span>
                </div>
                <div class="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <span class="text-2xl">🖖</span>
                  <span>Ring (Finger 4)</span>
                </div>
                <div class="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <span class="text-2xl">🤙</span>
                  <span>Pinky (Finger 5)</span>
                </div>
                <div class="flex items-center gap-2 bg-gray-50 p-2 rounded">
                  <span class="text-2xl">↪️</span>
                  <span>Thumb Under (Pass thumb under)</span>
                </div>
              </div>
            </div>
            
            <NotationDisplay />
            
            <div class="mt-8">
              <h3 class="text-lg font-semibold mb-3">How to Practice</h3>
              <ol class="list-decimal pl-5 space-y-2">
                <li>Click on each note to select it</li>
                <li>Pay attention to the symbols attached to notes</li>
                <li>Practice playing each note with the indicated expression</li>
                <li>Use the symbols as visual reminders of technique</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div>
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-bold mb-4">Symbol Guide</h2>
            <p class="mb-4">
              These symbols represent different musical techniques and expressions.
              Familiarize yourself with them to enhance your musical performance.
            </p>
            
            <div class="symbol-categories space-y-4">
              {#each Object.entries(defaultSymbols.reduce((acc, symbol) => {
                if (!acc[symbol.type]) acc[symbol.type] = [];
                acc[symbol.type].push(symbol);
                return acc;
              }, {} as Record<string, typeof defaultSymbols>)) as [category, symbols]}
                <div>
                  <h3 class="font-medium text-lg capitalize">{category}</h3>
                  <div class="grid grid-cols-2 gap-2 mt-2">
                    {#each symbols.slice(0, 4) as symbol}
                      <div class="flex items-center p-2 bg-gray-50 rounded">
                        <div class="w-8 h-8 flex items-center justify-center rounded-full mr-2"
                             style="background-color: {symbol.color}25; color: {symbol.color}">
                          {symbol.icon}
                        </div>
                        <span class="text-sm">{symbol.name}</span>
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="teacher-view">
      <TeacherInterface />
    </div>
  {/if}
</div>
