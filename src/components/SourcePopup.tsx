'use client';

import { Source } from '@/lib/sources';
import { useEffect, useState } from 'react';

interface SourcePopupProps {
  title: string;
  sources: Source[];
  mediaType: 'movie' | 'tv';
  onSourceSelect: (url: string) => void;
  onClose: () => void;
  mediaId?: string;
}

export default function SourcePopup({ 
  title, 
  sources, 
  mediaType, 
  onSourceSelect, 
  onClose,
  mediaId
}: SourcePopupProps) {
  const [backdropUrl, setBackdropUrl] = useState<string | null>(null);
  const [selectedServer, setSelectedServer] = useState<number | null>(null);
  
  useEffect(() => {
    // Set the first server as selected by default
    if (sources.length > 0) {
      setSelectedServer(0);
    }
    
    // Attempt to fetch backdrop from TMDB
    const fetchBackdrop = async () => {
      if (!mediaId) return;
      
      try {
        // Extract TMDB ID - if it starts with 'tt', it's an IMDB ID and we need to convert
        let tmdbId = mediaId;
        if (mediaId.startsWith('tt')) {
          // This is just a simple check - in a real app, you'd have a proper mapping
          // Assume the TMDB ID is already available in the sources
          if (sources.length > 0 && sources[0].url) {
            // Try to extract from URL (this is just an example approach)
            const match = sources[0].url.match(/\/(\d+)/);
            if (match && match[1]) {
              tmdbId = match[1];
            }
          }
        }
        
        // For testing/demo purposes, use a known backdrop path
        // In production, you'd want to call the TMDB API to get the correct backdrop path
        const backdropPath = `/xRyW60TXvX7Q2HSbpz8nZJGLZ6H.jpg`;
        setBackdropUrl(backdropPath);
      } catch (error) {
        console.error('Error fetching backdrop:', error);
      }
    };
    
    fetchBackdrop();
  }, [mediaId, sources]);

  if (!sources || sources.length === 0) {
    return null;
  }

  // Group sources by category
  const movieSources = sources.filter(source => source.category === 'movie' || !source.category);
  const tvSources = sources.filter(source => source.category === 'tv' || !source.category);
  
  // Use appropriate sources based on media type
  const relevantSources = mediaType === 'movie' ? movieSources : tvSources;
  const displaySources = relevantSources.length > 0 ? relevantSources : sources;

  const handleServerSelect = (index: number) => {
    setSelectedServer(index);
    // Remove the immediate play functionality
    // Only select the server, don't play until "Play Now" is clicked
  };

  return (
    <div className="source-popup" style={{
      backgroundImage: backdropUrl ? `url(https://image.tmdb.org/t/p/w1280${backdropUrl})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="backdrop-overlay"></div>
      <div className="source-popup-content">
        <button 
          className="close-icon" 
          onClick={onClose}
          aria-label="Close"
        />
        <h3>Select Server</h3>
        <p className="source-description">
          Choose the server, which is working for you according to your need.
        </p>
        <div className="source-list">
          {displaySources.map((source, index) => (
            <button
              key={index}
              className={`source-option ${selectedServer === index ? 'selected-source' : ''}`}
              onClick={() => handleServerSelect(index)}
            >
              {source.name}
              {selectedServer === index && <span className="check-icon">✓</span>}
            </button>
          ))}
        </div>
        <div className="source-actions">
          <button className="action-button cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="action-button play-button"
            onClick={() => {
              if (selectedServer !== null && displaySources[selectedServer]) {
                onSourceSelect(displaySources[selectedServer].url);
              }
            }}
          >
            Play Now <span className="play-icon">▶</span>
          </button>
        </div>
      </div>
    </div>
  );
} 