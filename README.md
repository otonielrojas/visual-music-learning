# Music Education POC

A SvelteKit-based proof-of-concept for a music education app to simplify music notation for public school students (piano and choir) using visual cues (colors, symbols) and audio feedback, built with TypeScript for type safety.

## Features

- Visual notation display with color-coded notes
- Virtual piano keyboard with audio playback
- Pitch ladder for choir with pitch detection
- Basic feedback system for note accuracy
- Toggle between piano and choir modes

## Tech Stack

- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS v4
- **Audio**: Web Audio API, Pitchy
- **Hosting**: Vercel with Edge Runtime

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