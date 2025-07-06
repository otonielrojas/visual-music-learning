declare module 'pitchy' {
  /**
   * Analyzes a buffer of PCM audio data and returns the pitch and clarity.
   * @param buffer - The audio buffer to analyze
   * @param sampleRate - The sample rate of the audio buffer
   * @returns A tuple containing the pitch in Hz and the clarity (0-1)
   */
  export function findPitch(buffer: Float32Array, sampleRate: number): [number, number];

  /**
   * Converts a frequency in Hz to the corresponding musical note name.
   * @param frequency - The frequency in Hz
   * @returns The name of the musical note
   */
  export function noteFromPitch(frequency: number): string;

  /**
   * Converts a frequency in Hz to the corresponding MIDI note number.
   * @param frequency - The frequency in Hz
   * @returns The MIDI note number
   */
  export function midiFromPitch(frequency: number): number;

  /**
   * Gets the frequency in Hz for a given MIDI note number.
   * @param note - The MIDI note number
   * @returns The frequency in Hz
   */
  export function frequencyFromMidi(note: number): number;

  /**
   * Gets the frequency in Hz for a given musical note name.
   * @param note - The musical note name (e.g., "A4")
   * @returns The frequency in Hz
   */
  export function frequencyFromNote(note: string): number;
}
