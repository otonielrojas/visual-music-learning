export interface Note {
  pitch: string;
  frequency: number;
  duration: string;
  color: string;
}

export const melody: Note[] = [
  { pitch: "C4", frequency: 261.63, duration: "quarter", color: "blue" },
  { pitch: "C4", frequency: 261.63, duration: "quarter", color: "blue" },
  { pitch: "G4", frequency: 392.0, duration: "quarter", color: "red" },
  { pitch: "G4", frequency: 392.0, duration: "quarter", color: "red" },
  { pitch: "A4", frequency: 440.0, duration: "quarter", color: "green" },
  { pitch: "A4", frequency: 440.0, duration: "quarter", color: "green" },
  { pitch: "G4", frequency: 392.0, duration: "quarter", color: "red" },
  { pitch: "F4", frequency: 349.23, duration: "quarter", color: "yellow" },
];
