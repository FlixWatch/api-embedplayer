'use client';

import { Source } from '@/lib/sources';

interface SourcePopupProps {
  title: string;
  sources: Source[];
  mediaType: 'movie' | 'tv';
  onSourceSelect: (url: string) => void;
  onClose: () => void;
}

export default function SourcePopup({ title, sources, mediaType, onSourceSelect, onClose }: SourcePopupProps) {
  if (!sources || sources.length === 0) {
    return null;
  }

  // Group sources by category (for future expansion with more sources)
  const movieSources = sources.filter(source => source.category === 'movie' || !source.category);
  const tvSources = sources.filter(source => source.category === 'tv' || !source.category);
  
  // Use appropriate sources based on media type
  const relevantSources = mediaType === 'movie' ? movieSources : tvSources;
  const displaySources = relevantSources.length > 0 ? relevantSources : sources;

  return (
    <div className="source-popup">
      <div className="source-popup-content">
        <button 
          className="close-icon" 
          onClick={onClose}
          aria-label="Close"
        />
        <h3>{title}</h3>
        <div className="source-list">
          {displaySources.map((source, index) => (
            <button
              key={index}
              className="source-option"
              onClick={() => onSourceSelect(source.url)}
            >
              {source.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 