<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let currentStep = 0;
  export let totalSteps = 5;
  export let showTutorial = true;
  
  const dispatch = createEventDispatcher();
  
  function nextStep() {
    if (currentStep < totalSteps - 1) {
      currentStep++;
    } else {
      dispatch('complete');
      showTutorial = false;
    }
  }
  
  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
    }
  }
  
  function skipTutorial() {
    dispatch('complete');
    showTutorial = false;
  }
  
  const tutorialSteps = [
    {
      title: "Welcome to the Visual Music Learning System",
      content: "This system helps bridge the gap between traditional music notation and practical musical output using visual symbols.",
      image: "/tutorial/welcome.png"
    },
    {
      title: "Understanding Musical Symbols",
      content: "Symbols represent musical concepts like jumps (position changes), holds, repeats, and expressions. They provide visual cues for proper technique.",
      image: "/tutorial/symbols.png"
    },
    {
      title: "Reading the Notation Display",
      content: "Notes are color-coded and have symbols attached to them. For example, an up arrow on E means you need to jump up to reach that note from the previous one.",
      image: "/tutorial/notation.png"
    },
    {
      title: "Teacher Mode: Creating Lessons",
      content: "Teachers can create custom lessons by adding notes and attaching relevant symbols to guide students through proper technique.",
      image: "/tutorial/teacher.png"
    },
    {
      title: "Practice Makes Perfect",
      content: "Click through each note, observe the attached symbols, and follow their guidance to improve your musical performance.",
      image: "/tutorial/practice.png"
    }
  ];
</script>

{#if showTutorial}
  <div class="tutorial-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="tutorial-content bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{tutorialSteps[currentStep].title}</h2>
        <button 
          class="text-gray-500 hover:text-gray-700"
          on:click={skipTutorial}
          aria-label="Close tutorial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="tutorial-step mb-6">
        <div class="tutorial-image mb-4 bg-gray-100 rounded-lg p-2 flex justify-center">
          <div class="h-48 w-full flex items-center justify-center text-gray-400">
            [Image placeholder for {tutorialSteps[currentStep].image}]
          </div>
        </div>
        
        <p class="text-gray-700">{tutorialSteps[currentStep].content}</p>
      </div>
      
      <div class="flex justify-between items-center">
        <div class="step-indicator text-sm text-gray-500">
          Step {currentStep + 1} of {totalSteps}
        </div>
        
        <div class="flex space-x-2">
          {#if currentStep > 0}
            <button 
              class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
              on:click={prevStep}
            >
              Previous
            </button>
          {/if}
          
          <button 
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            on:click={nextStep}
          >
            {currentStep < totalSteps - 1 ? 'Next' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
