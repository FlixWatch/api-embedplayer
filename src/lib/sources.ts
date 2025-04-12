// Types for media sources
export interface Source {
  name: string;
  url: string;
  category?: 'movie' | 'tv' | 'general';
}

export interface Movie {
  title: string;
  year: number;
  tmdbId?: string;
  imdbId?: string;
  sources: Source[];
}

export interface Episode {
  title: string;
  sources: Source[];
}

export interface Season {
  episodes: Record<string, Episode>;
}

export interface TVShow {
  title: string;
  tmdbId?: string;
  imdbId?: string;
  seasons: Record<string, Season>;
}

export interface MediaSources {
  movies: Record<string, Movie>;
  tv: Record<string, TVShow>;
}

// Define the sources grouped by type
export const movieSources: Source[] = [
  { name: 'VidSrc', url: 'https://vidsrc.xyz/embed/movie/{id}', category: 'movie' },
  { name: 'VidLink', url: 'https://vidlink.pro/movie/{tmdbId}?primaryColor=ff0000&secondaryColor=000000&iconColor=b40e0e&icons=default&player=default&title=true&poster=true&autoplay=false&nextbutton=true', category: 'movie' },
  { name: 'LetsEmbed', url: 'https://letsembed.cc/embed/movie/?id={tmdbId}', category: 'movie' },
  { name: 'iBomma', url: 'https://play.vidplay.watch/movie/{tmdbId}', category: 'movie' }
];

export const tvSources: Source[] = [
  { name: 'VidSrc', url: 'https://vidsrc.xyz/embed/tv/{id}/{season}-{episode}', category: 'tv' },
  { name: 'VidLink', url: 'https://vidlink.pro/tv/{tmdbId}/{season}/{episode}?primaryColor=ff0000&secondaryColor=000000&iconColor=b40e0e&icons=default&player=default&title=true&poster=true&autoplay=false&nextbutton=true', category: 'tv' },
  { name: 'LetsEmbed', url: 'https://letsembed.cc/embed/tv/?id={tmdbId}/{season}/{episode}', category: 'tv' },
  { name: 'iBomma', url: 'https://play.vidplay.watch/tv/{tmdbId}/{season}-{episode}', category: 'tv' }
];

// Sample data structure for media sources
export const mediaSources: MediaSources = {
  movies: {
    // IMDB ID examples
    'tt0111161': {
      title: 'The Shawshank Redemption',
      year: 1994,
      tmdbId: '278',
      sources: [
        { name: 'VidSrc', url: 'https://vidsrc.xyz/embed/movie/tt0111161', category: 'movie' },
        { name: 'VidLink', url: 'https://vidlink.pro/movie/278', category: 'movie' }
      ]
    },
    'tt0068646': {
      title: 'The Godfather',
      year: 1972,
      tmdbId: '238',
      sources: [
        { name: 'VidSrc', url: 'https://vidsrc.xyz/embed/movie/tt0068646', category: 'movie' },
        { name: 'VidLink', url: 'https://vidlink.pro/movie/238', category: 'movie' }
      ]
    },
    // TMDB ID examples
    '278': {
      title: 'The Shawshank Redemption',
      year: 1994,
      imdbId: 'tt0111161',
      sources: [
        { name: 'VidSrc', url: 'https://vidsrc.xyz/embed/movie/278', category: 'movie' },
        { name: 'VidLink', url: 'https://vidlink.pro/movie/278', category: 'movie' }
      ]
    }
  },
  tv: {
    // TMDB ID examples
    '1399': {
      title: 'Game of Thrones',
      imdbId: 'tt0944947',
      seasons: {
        '1': {
          episodes: {
            '1': {
              title: 'Winter Is Coming',
              sources: [
                { name: 'VidSrc', url: 'https://vidsrc.xyz/embed/tv/1399/1-1', category: 'tv' },
                { name: 'VidLink', url: 'https://vidlink.pro/tv/1399/1/1', category: 'tv' }
              ]
            },
            '2': {
              title: 'The Kingsroad',
              sources: [
                { name: 'VidSrc', url: 'https://vidsrc.xyz/embed/tv/1399/1-2', category: 'tv' },
                { name: 'VidLink', url: 'https://vidlink.pro/tv/1399/1/2', category: 'tv' }
              ]
            }
          }
        }
      }
    },
    // IMDB ID examples
    'tt0944947': {
      title: 'Game of Thrones',
      tmdbId: '1399',
      seasons: {
        '1': {
          episodes: {
            '1': {
              title: 'Winter Is Coming',
              sources: [
                { name: 'VidSrc', url: 'https://vidsrc.xyz/embed/tv/tt0944947/1-1', category: 'tv' },
                { name: 'VidLink', url: 'https://vidlink.pro/tv/1399/1/1', category: 'tv' }
              ]
            }
          }
        }
      }
    }
  }
};

// Helper function to check if an ID is an IMDB ID (starts with 'tt')
export function isIMDbId(id: string): boolean {
  return id.toString().startsWith('tt');
}

// Function to get the corresponding TMDB ID for an IMDb ID
export function getTMDbIdFromIMDb(imdbId: string, mediaType: 'movie' | 'tv'): string | null {
  if (mediaType === 'movie') {
    const movie = mediaSources.movies[imdbId];
    return movie?.tmdbId || null;
  } else if (mediaType === 'tv') {
    const show = mediaSources.tv[imdbId];
    return show?.tmdbId || null;
  }
  return null;
}

// Function to get the corresponding IMDb ID for a TMDB ID
export function getIMDbIdFromTMDb(tmdbId: string, mediaType: 'movie' | 'tv'): string | null {
  if (mediaType === 'movie') {
    const movie = mediaSources.movies[tmdbId];
    return movie?.imdbId || null;
  } else if (mediaType === 'tv') {
    const show = mediaSources.tv[tmdbId];
    return show?.imdbId || null;
  }
  return null;
}

// Function to get movie by ID (IMDB or TMDB)
export function getMovieById(id: string): Movie | null {
  return mediaSources.movies[id] || null;
}

// Function to get TV episode by ID, season, and episode
export function getTVEpisodeById(id: string, season: string, episode: string): {
  showTitle: string;
  episodeTitle: string;
  season: string;
  episode: string;
  sources: Source[];
  imdbId?: string;
  tmdbId?: string;
} | null {
  const show = mediaSources.tv[id];
  if (!show || !show.seasons[season] || !show.seasons[season].episodes[episode]) {
    return null;
  }
  const episodeData = show.seasons[season].episodes[episode];
  return {
    showTitle: show.title,
    episodeTitle: episodeData.title,
    season,
    episode,
    sources: episodeData.sources,
    imdbId: isIMDbId(id) ? id : show.imdbId,
    tmdbId: isIMDbId(id) ? show.tmdbId : id
  };
}

// Generate dynamic source URLs based on movie or TV identifiers
function generateSourceUrl(source: Source, params: { 
  id: string, 
  imdbId?: string, 
  tmdbId?: string,
  season?: string, 
  episode?: string 
}): string {
  let url = source.url;
  
  // Replace all placeholders in the URL with actual values
  url = url.replace('{id}', params.id);
  
  if (params.imdbId) {
    url = url.replace('{imdbId}', params.imdbId);
  }
  
  if (params.tmdbId) {
    url = url.replace('{tmdbId}', params.tmdbId);
  }
  
  if (params.season) {
    url = url.replace('{season}', params.season);
  }
  
  if (params.episode) {
    url = url.replace('{episode}', params.episode);
  }
  
  return url;
}

// Function to create source URLs based on the ID type and media type
export function getSourceUrls(id: string, mediaType: 'movie' | 'tv', season?: string, episode?: string): Source[] {
  const isImdb = isIMDbId(id);
  let sources: Source[] = [];
  
  // Get the corresponding IDs
  const imdbId = isImdb ? id : getIMDbIdFromTMDb(id, mediaType);
  const tmdbId = isImdb ? getTMDbIdFromIMDb(id, mediaType) : id;
  
  const sourceTemplates = mediaType === 'movie' ? movieSources : tvSources;
  
  // Generate dynamic URLs from templates
  sources = sourceTemplates.map(source => {
    const url = generateSourceUrl(source, {
      id,
      imdbId: imdbId || undefined,
      tmdbId: tmdbId || undefined,
      season,
      episode
    });
    
    return {
      name: source.name,
      url,
      category: source.category
    };
  });
  
  return sources;
} 