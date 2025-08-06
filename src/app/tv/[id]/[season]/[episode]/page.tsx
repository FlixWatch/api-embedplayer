'use client';

import { useEffect, useState } from 'react';
import MediaPlayer from '@/components/MediaPlayer';
import { getTVEpisodeById, getSourceUrls, isIMDbId } from '@/lib/sources';
import type { Source } from '@/lib/sources';

export default function TVEpisodePage({ 
  params 
}: { 
  params: { id: string; season: string; episode: string } 
}) {
  const [title, setTitle] = useState<string>('Loading episode...');
  const [details, setDetails] = useState<string>('');
  const [sources, setSources] = useState<Source[]>([]);

  useEffect(() => {
    // Get TV show params
    const { id, season, episode } = params;
    
    // If any params are missing, return early
    if (!id || !season || !episode) return;
    
    // Try to get existing episode data
    const episodeData = getTVEpisodeById(id, season, episode);
    
    // Generate sources based on ID, season, and episode
    const dynamicSources = getSourceUrls(id, 'tv', season, episode);
    
    // Use dynamic sources if available, otherwise use stored sources
    const availableSources = dynamicSources.length > 0 
      ? dynamicSources 
      : (episodeData ? episodeData.sources : []);

    // Update state with episode data
    if (episodeData) {
      setTitle(`${episodeData.showTitle} - ${episodeData.episodeTitle}`);
      setDetails(`Season: ${season} | Episode: ${episode} | ID: ${id}`);
    } else {
      setTitle(`TV Show (ID: ${id}) - S${season}E${episode}`);
      setDetails(`ID Type: ${isIMDbId(id) ? 'IMDb' : 'TMDB'}`);
    }
    
    setSources(availableSources);
  }, [params.id, params.season, params.episode]);

  return (
    <MediaPlayer 
      title={title}
      details={details}
      sources={sources}
      mediaType="tv"
    />
  );
} 