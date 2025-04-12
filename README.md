# Embedded Media Player (Next.js Version)

A Next.js website that embeds multiple media sources in one place. This application allows users to access movies and TV shows from different sources using IMDb or TMDB IDs directly through URLs.

## Features

- Direct access to media content via URL:
  - Movies: `/movie/{imdbid}` or `/movie/{tmdbid}`
  - TV Shows: `/tv/{tmdbid}/{season_number}/{episode_number}` or `/tv/{imdbid}/{season_number}/{episode_number}`
- Automatic ID type detection (IMDb IDs start with "tt", others are TMDB)
- Source selection popup when loading content
- Multiple source options for each movie or TV episode
- Embedded iframe player
- Admin panel for content management (Ctrl+Shift+A)

## Supported Sources

### Movies
- VidSrc: `https://vidsrc.xyz/embed/movie/{imdbid}` or `{tmdbid}`
- VidLink: `https://vidlink.pro/movie/{tmdbid}`

### TV Shows
- VidSrc: `https://vidsrc.xyz/embed/tv/{imdbid}/{season_number}-{episode_number}` or `{tmdbid}/{season_number}-{episode_number}`
- VidLink: `https://vidlink.pro/tv/{tmdbId}/{season}/{episode}`

## Getting Started

### Prerequisites

- Node.js 18.17 or later

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

To build the application for production:

```
npm run build
```

To run the production build:

```
npm start
```

## Project Structure

- `/src/app` - App Router routes
- `/src/components` - React components
- `/src/lib` - Utility functions and data
- `/src/styles` - CSS styles

## URL Structure

The website supports the following URL patterns:

- `/movie/{id}` - Where `id` can be an IMDb ID (e.g., tt0111161) or TMDB ID (e.g., 278)
- `/tv/{id}/{season}/{episode}` - Where `id` can be an IMDb ID or TMDB ID, and `season` and `episode` are numbers

## Usage

1. Access a movie directly via `/movie/{imdbid}` or `/movie/{tmdbid}`
2. Access a TV episode via `/tv/{id}/{season}/{episode}`
3. When the page loads, a popup will appear with available sources
4. Select your preferred source to start playback in the embedded player

## Admin Functions

Press `Ctrl+Shift+A` to open the admin panel where you can:

- Add new movies with both IMDb and TMDB IDs
- Add new TV shows with both IMDb and TMDB IDs
- Add new TV episodes

## Example URLs

- `/movie/tt0111161` - The Shawshank Redemption (IMDb ID)
- `/movie/278` - The Shawshank Redemption (TMDB ID)
- `/tv/1399/1/1` - Game of Thrones, Season 1, Episode 1 (TMDB ID)
- `/tv/tt0944947/1/1` - Game of Thrones, Season 1, Episode 1 (IMDb ID)

## Future Improvements

- Backend API integration with a database
- User authentication for admin functions
- More advanced source management
- Source rating system
- Automatic content metadata fetching from IMDb/TMDB APIs 