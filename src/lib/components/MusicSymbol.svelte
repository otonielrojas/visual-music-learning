<script lang="ts">
  import { defaultSymbols, type MusicSymbol } from '$lib/data/symbols';
  
  // Props
  export let symbolId: string;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let showLabel = false;
  export let interactive = false;
  
  // Find the symbol in our library
  $: symbol = defaultSymbols.find(s => s.id === symbolId) || {
    id: symbolId,
    name: 'Unknown',
    description: 'Symbol not found',
    type: 'custom' as const,
    icon: '❓',
    color: '#999999'
  };
  
  // Size classes
  $: sizeClass = {
    sm: 'text-lg w-6 h-6',
    md: 'text-2xl w-8 h-8',
    lg: 'text-4xl w-12 h-12'
  }[size];
  
  // Handle click for interactive symbols
  function handleClick() {
    if (interactive) {
      const event = new CustomEvent('symbolclick', {
        detail: { symbolId, symbol }
      });
      dispatchEvent(event);
    }
  }
</script>

<div 
  class="inline-flex flex-col items-center justify-center"
  title={symbol.description}
>
  {#if interactive}
    <div 
      class={`flex items-center justify-center rounded-full ${sizeClass} cursor-pointer hover:opacity-80`}
      style={`background-color: ${symbol.color}25; color: ${symbol.color}`}
      on:click={handleClick}
      on:keydown={(e) => e.key === 'Enter' && handleClick()}
      tabindex="0"
      role="button"
      aria-label={`${symbol.name} symbol`}
    >
      <span class="symbol-icon">{symbol.icon}</span>
    </div>
  {:else}
    <div 
      class={`flex items-center justify-center rounded-full ${sizeClass}`}
      style={`background-color: ${symbol.color}25; color: ${symbol.color}`}
      role="presentation"
    >
      <span class="symbol-icon">{symbol.icon}</span>
    </div>
  {/if}
  
  {#if showLabel}
    <span class="text-xs mt-1 font-medium">{symbol.name}</span>
  {/if}
</div>

<style>
  .symbol-icon {
    line-height: 1;
  }
</style>
