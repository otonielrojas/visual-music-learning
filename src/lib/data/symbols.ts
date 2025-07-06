export interface MusicSymbol {
  id: string;
  name: string;
  description: string;
  type: 'notation' | 'movement' | 'rhythm' | 'expression' | 'custom';
  icon: string; // SVG path or emoji
  color?: string;
  shortcut?: string;
}

// Sample symbols library
export const defaultSymbols: MusicSymbol[] = [
  // Finger position symbols
  {
    id: 'finger_1',
    name: 'Thumb (1)',
    description: 'Use your thumb (finger 1)',
    type: 'movement',
    icon: '👍',
    color: '#4285F4'
  },
  {
    id: 'finger_2',
    name: 'Index (2)',
    description: 'Use your index finger (finger 2)',
    type: 'movement',
    icon: '☝️',
    color: '#5E97F6'
  },
  {
    id: 'finger_3',
    name: 'Middle (3)',
    description: 'Use your middle finger (finger 3)',
    type: 'movement',
    icon: '✌️',
    color: '#EA4335'
  },
  {
    id: 'finger_4',
    name: 'Ring (4)',
    description: 'Use your ring finger (finger 4)',
    type: 'movement',
    icon: '🖖',
    color: '#46BDC6'
  },
  {
    id: 'finger_5',
    name: 'Pinky (5)',
    description: 'Use your pinky finger (finger 5)',
    type: 'movement',
    icon: '🤙',
    color: '#673AB7'
  },
  // Technique symbols
  {
    id: 'thumb_under',
    name: 'Thumb Under',
    description: 'Pass your thumb under your hand to reach the next note',
    type: 'movement',
    icon: '↪️',
    color: '#FF8A65'
  },
  {
    id: 'start',
    name: 'Start Position',
    description: 'Starting position for your hand',
    type: 'movement',
    icon: '🏁',
    color: '#4285F4'
  },
  {
    id: 'hold',
    name: 'Hold',
    description: 'Hold this note longer than written',
    type: 'rhythm',
    icon: '➖',
    color: '#673AB7'
  },
  // Additional symbols
  {
    id: 'accent',
    name: 'Accent',
    description: 'Play this note with emphasis',
    type: 'expression',
    icon: '▲',
    color: '#FFC107'
  },
  {
    id: 'soft',
    name: 'Soft',
    description: 'Play this note softly',
    type: 'expression',
    icon: '○',
    color: '#9C27B0'
  },
  {
    id: 'chord-c',
    name: 'C Chord',
    description: 'C major chord',
    type: 'notation',
    icon: '🍎', // Apple for C chord
    color: '#E91E63'
  },
  {
    id: 'chord-g',
    name: 'G Chord',
    description: 'G major chord',
    type: 'notation',
    icon: '🍇', // Grapes for G chord
    color: '#673AB7'
  },
  {
    id: 'chord-f',
    name: 'F Chord',
    description: 'F major chord',
    type: 'notation',
    icon: '🍓', // Strawberry for F chord
    color: '#F44336'
  }
];

// Enhanced Note interface that can include symbols
export interface EnhancedNote {
  pitch: string;
  frequency: number;
  duration: number;
  color: string;
  symbols?: string[]; // Array of symbol IDs
}

// Sample enhanced melody with symbols - Piano C Major Scale with Technique Guidance
export const enhancedMelody: EnhancedNote[] = [
  // Starting position - Thumb on C
  {
    pitch: 'C4',
    frequency: 261.63,
    duration: 1,
    color: '#4285F4', // Blue
    symbols: ['start', 'finger_1'] // Thumb position
  },
  // D - Use finger 2 (index finger)
  {
    pitch: 'D4',
    frequency: 293.66,
    duration: 1,
    color: '#5E97F6', // Lighter blue
    symbols: ['finger_2'] // Index finger
  },
  // E - Use finger 3 (middle finger)
  {
    pitch: 'E4',
    frequency: 329.63,
    duration: 1,
    color: '#EA4335', // Red
    symbols: ['finger_3'] // Middle finger
  },
  // F - Use finger 1 (thumb passing under)
  {
    pitch: 'F4',
    frequency: 349.23,
    duration: 1,
    color: '#FF8A65', // Orange
    symbols: ['thumb_under', 'finger_1'] // Thumb passes under
  },
  // G - Use finger 2 (index finger)
  {
    pitch: 'G4',
    frequency: 392.00,
    duration: 1,
    color: '#FBBC05', // Yellow
    symbols: ['finger_2'] // Index finger
  },
  // A - Use finger 3 (middle finger)
  {
    pitch: 'A4',
    frequency: 440.00,
    duration: 1,
    color: '#34A853', // Green
    symbols: ['finger_3'] // Middle finger
  },
  // B - Use finger 4 (ring finger)
  {
    pitch: 'B4',
    frequency: 493.88,
    duration: 1,
    color: '#46BDC6', // Teal
    symbols: ['finger_4'] // Ring finger
  },
  // C - Use finger 5 (pinky finger) and hold
  {
    pitch: 'C5',
    frequency: 523.25,
    duration: 2,
    color: '#673AB7', // Purple
    symbols: ['finger_5', 'hold'] // Pinky finger and hold
  }
];
