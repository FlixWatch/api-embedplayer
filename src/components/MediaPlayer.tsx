'use client';

import { useState, useEffect } from 'react';
import SourcePopup from './SourcePopup';
import { Source } from '@/lib/sources';

interface MediaPlayerProps {
  title: string;
  details?: string;
  sources: Source[];
  mediaType: 'movie' | 'tv';
}

export default function MediaPlayer({ title, details, sources, mediaType }: MediaPlayerProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(true);

  const handleSourceSelect = (url: string) => {
    setSelectedSource(url);
    setShowPopup(false);
  };

  const handleChangeServer = () => {
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    // Only close the popup if a source is already selected
    if (selectedSource) {
      setShowPopup(false);
    }
  };

  // Reset popup when sources change
  useEffect(() => {
    setShowPopup(true);
    setSelectedSource(null);
  }, [sources]);

  return (
    <div 
      className="player-container"
      style={{
        backgroundImage: !selectedSource ? `url('/images/backdrop.png')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
    >
      {!selectedSource && (
        <div className="backdrop-overlay"></div>
      )}
      <div className="player-info">
        <h2 className="media-title">{title}</h2>
        {details && <div className="media-details">{details}</div>}
      </div>
      <div className="player-frame-container">
        {selectedSource ? (
          <>
            <iframe
              src={selectedSource}
              className="player-frame"
              allowFullScreen
            />
            <button 
              className="change-server-btn"
              onClick={handleChangeServer}
            >
              Change Server
            </button>
          </>
        ) : (
          <div className="player-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
      {showPopup && sources.length > 0 && (
        <SourcePopup
          title="Select Source"
          sources={sources}
          mediaType={mediaType}
          onSourceSelect={handleSourceSelect}
          onClose={handleClosePopup}
          mediaId={details?.split(' | ')[1]}
        />
      )}
    </div>
  );
} 