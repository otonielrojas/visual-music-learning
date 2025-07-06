# Visual Music Learning System

A SvelteKit-based proof-of-concept for a music education app designed to help public school students bridge the gap from traditional music notation to practical musical output. The app uses a simplified, highly visual and intuitive approach with color-coding, custom symbols, and visual representations to accelerate musical skill acquisition.

## Core Purpose

This application aims to create an intuitive visual notation system that helps students connect traditional music notation with practical musical output through:

- **Visual Symbols**: Custom icons representing musical concepts (jumps, holds, repeats, etc.)
- **Color-Coding**: Notes and symbols use colors to enhance recognition and memorization
- **Multiple Learning Modes**: Support for both piano students and choir members
- **Teacher Tools**: Lesson creation and symbol customization capabilities

## Features

- **Symbol Library**: Collection of visual symbols representing musical concepts
- **Enhanced Notation Display**: Color-coded notes with attached symbols
- **Teacher Interface**: Tools for creating custom lessons with symbols
- **Student View**: Simplified learning interface with visual guidance
- **Virtual Piano**: Interactive keyboard with audio playback
- **Pitch Detection**: Audio feedback for vocal practice (supplementary feature)
- **Dual Modes**: Toggle between piano and choir interfaces

## Tech Stack

- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS v4
- **Audio**: Web Audio API, Pitchy
- **Hosting**: Vercel with Edge Runtime

## Usage Instructions

### Accessing the Visual Learning System

1. After starting the application, navigate to `/visual-learning` in your browser
2. You'll see two tabs at the top: "Student View" and "Teacher View"

### Student View

The Student View is designed for learners to practice with visual notation:

1. **Notation Display**: 
   - Click on any note to select it
   - Notes are color-coded for easy recognition
   - Symbols attached to notes indicate how to play them (jumps, holds, etc.)
   - The currently selected note will be highlighted

2. **Symbol Guide**:
   - The right panel shows a guide to all available symbols
   - Symbols are grouped by type (jumps, holds, repeats, etc.)
   - Each symbol has a color and icon that visually represents its meaning

3. **Practice Tips**:
   - Follow the numbered steps in the "How to Practice" section
   - Pay attention to the symbols attached to each note
   - Practice playing each note with the indicated expression

### Teacher View

The Teacher View allows educators to create custom lessons:

1. **Melody Editor**:
   - Click "Add Note" to add a new note to the melody
   - Select a note to modify it (it will highlight in blue)
   - Use the up/down arrows to reorder notes
   - Click "Remove Note" to delete the selected note

2. **New Note Properties**:
   - Set the pitch, duration, and color for new notes
   - Pitches range from C3 to G5
   - Durations include ½ beat, 1 beat, 2 beats, and 4 beats
   - Choose any color using the color picker

3. **Symbol Selector**:
   - After selecting a note, use the Symbol Library to add symbols to it
   - Click on symbols to toggle them on/off for the selected note
   - Symbols are automatically attached to the note when selected

4. **Saving Lessons**:
   - Click "Save Lesson" to download the custom melody as a JSON file
   - This file can be shared with students or imported later

## Setup Instructions

1. **Install Node.js**: Download from https://nodejs.org (LTS version)

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/music-poc.git
   cd music-poc
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```
   If errors occur, try `npm install --legacy-peer-deps`

4. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

5. **Check TypeScript**:
   ```bash
   npm run check
   ```

6. **Build for Production**:
   ```bash
   npm run build
   ```

## Usage

- Click colored circles to select notes
- Use the virtual keyboard (piano) or pitch ladder (choir) to play notes
- Sing into the microphone for pitch detection feedback (choir mode)
- Toggle between piano and choir modes using the buttons

## Dependencies

- **SvelteKit**: `npx sv create`
- **Tailwind CSS v4**: `npm install -D tailwindcss @tailwindcss/vite @tailwindcss/forms @tailwindcss/typography`
- **Vercel Adapter**: `npm install -D @sveltejs/adapter-vercel`
- **Pitchy**: `npm install pitchy`

Project Structure

src/lib/components/: Svelte components (NotationDisplay, VirtualKeyboard, PitchLadder, FeedbackPanel).
src/lib/data/: Hardcoded melody data (melody.ts).
src/routes/: Main app page (+page.svelte).
src/app.html: Root HTML with Tailwind CSS.
svelte.config.js: SvelteKit configuration with Vercel adapter.
tsconfig.json: TypeScript configuration.

music-poc/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── NotationDisplay.svelte
│   │   │   ├── VirtualKeyboard.svelte
│   │   │   ├── PitchLadder.svelte
│   │   │   ├── FeedbackPanel.svelte
│   │   ├── data/
│   │   │   ├── melody.ts
│   ├── routes/
│   │   ├── +page.svelte
│   ├── types/
│   │   ├── pitchy.d.ts
│   ├── app.html
│   ├── app.css
├── svelte.config.js
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json

Known Issues

Pitch detection may be inaccurate in noisy environments.
Microphone access requires browser permissions.
Pitchy may lack TypeScript types (custom declaration in src/types/pitchy.d.ts).

Contributing
   Feedback is welcome! open an issue on GitHub.