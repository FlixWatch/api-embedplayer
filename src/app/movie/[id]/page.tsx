'use client';

import { useEffect, useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { getMovieById, getSourceUrls, isIMDbId } from '@/lib/sources';
import type { Source } from '@/lib/sources';

export default function MoviePage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState<string>('Loading movie...');
  const [details, setDetails] = useState<string>('');
  const [sources, setSources] = useState<Source[]>([]);

  useEffect(() => {
    // Get movie ID from params
    const id = params.id;
    
    // If no ID, return early
    if (!id) return;
    
    // Try to get existing movie data
    const movie = getMovieById(id);
    
    // Generate sources based on ID
    const dynamicSources = getSourceUrls(id, 'movie');
    
    // Use dynamic sources if available, otherwise use stored sources
    const availableSources = dynamicSources.length > 0 
      ? dynamicSources 
      : (movie ? movie.sources : []);

    // Update state with movie data
    if (movie) {
      setTitle(movie.title);
      setDetails(`Year: ${movie.year} | ID: ${id}`);
    } else {
      setTitle(`Movie (ID: ${id})`);
      setDetails(`ID Type: ${isIMDbId(id) ? 'IMDb' : 'TMDB'}`);
    }
    
    setSources(availableSources);
  }, [params.id]);

  return (
    <MediaPlayer 
      title={title}
      details={details}
      sources={sources}
      mediaType="movie"
    />
  );
} 