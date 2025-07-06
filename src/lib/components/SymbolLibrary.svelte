<script lang="ts">
  import { defaultSymbols, type MusicSymbol as MusicSymbolType } from '$lib/data/symbols';
  import MusicSymbolComponent from './MusicSymbol.svelte';
  
  // Props
  export let selectedSymbols: string[] = [];
  export let selectable = false;
  export let filterType: string | null = null;
  
  // State
  let symbols = defaultSymbols;
  let searchQuery = '';
  
  // Filter symbols based on search and type
  $: filteredSymbols = symbols.filter(symbol => {
    const matchesSearch = searchQuery === '' || 
      symbol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      symbol.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = filterType === null || symbol.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Handle symbol selection
  function toggleSymbol(symbolId: string) {
    if (!selectable) return;
    
    if (selectedSymbols.includes(symbolId)) {
      selectedSymbols = selectedSymbols.filter(id => id !== symbolId);
    } else {
      selectedSymbols = [...selectedSymbols, symbolId];
    }
    
    // Dispatch event for parent components
    dispatchEvent(new CustomEvent('selectionchange', {
      detail: { selectedSymbols }
    }));
  }
  
  // Group symbols by type for organized display
  $: groupedSymbols = filteredSymbols.reduce((groups, symbol) => {
    if (!groups[symbol.type]) {
      groups[symbol.type] = [];
    }
    groups[symbol.type].push(symbol);
    return groups;
  }, {} as Record<string, MusicSymbolType[]>);
</script>

<div class="symbol-library p-4 bg-white rounded-lg shadow-sm">
  <div class="mb-4">
    <input 
      type="text" 
      placeholder="Search symbols..." 
      class="w-full p-2 border rounded-md"
      bind:value={searchQuery}
    />
  </div>
  
  <div class="flex flex-wrap gap-2 mb-4">
    <button 
      class="px-3 py-1 text-sm rounded-full {filterType === null ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
      on:click={() => filterType = null}
    >
      All
    </button>
    <button 
      class="px-3 py-1 text-sm rounded-full {filterType === 'notation' ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
      on:click={() => filterType = 'notation'}
    >
      Notation
    </button>
    <button 
      class="px-3 py-1 text-sm rounded-full {filterType === 'movement' ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
      on:click={() => filterType = 'movement'}
    >
      Movement
    </button>
    <button 
      class="px-3 py-1 text-sm rounded-full {filterType === 'rhythm' ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
      on:click={() => filterType = 'rhythm'}
    >
      Rhythm
    </button>
    <button 
      class="px-3 py-1 text-sm rounded-full {filterType === 'expression' ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
      on:click={() => filterType = 'expression'}
    >
      Expression
    </button>
    <button 
      class="px-3 py-1 text-sm rounded-full {filterType === 'custom' ? 'bg-blue-600 text-white' : 'bg-gray-200'}"
      on:click={() => filterType = 'custom'}
    >
      Custom
    </button>
  </div>
  
  {#if filteredSymbols.length === 0}
    <div class="text-center py-8 text-gray-500">
      No symbols found matching your search.
    </div>
  {:else}
    {#each Object.entries(groupedSymbols) as [type, typeSymbols]}
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2 capitalize">{type}</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {#each typeSymbols as symbol}
            {#if selectable}
              <div 
                class="p-2 rounded-lg text-center cursor-pointer hover:bg-gray-100
                  {selectedSymbols.includes(symbol.id) ? 'bg-blue-100 ring-2 ring-blue-400' : ''}"
                on:click={() => toggleSymbol(symbol.id)}
                on:keydown={(e) => e.key === 'Enter' && toggleSymbol(symbol.id)}
                tabindex="0"
                role="button"
                aria-pressed={selectedSymbols.includes(symbol.id)}
              >
                <MusicSymbolComponent 
                  symbolId={symbol.id} 
                  size="md" 
                  showLabel={true}
                  interactive={false}
                />
                <p class="text-xs mt-1 text-gray-600">{symbol.description}</p>
              </div>
            {:else}
              <div 
                class="p-2 rounded-lg text-center"
                role="presentation"
              >
                <MusicSymbolComponent 
                  symbolId={symbol.id} 
                  size="md" 
                  showLabel={true}
                  interactive={false}
                />
                <p class="text-xs mt-1 text-gray-600">{symbol.description}</p>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  {/if}
</div>
