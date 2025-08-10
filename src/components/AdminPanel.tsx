'use client';

import { useState, useEffect } from 'react';
import { isIMDbId } from '@/lib/sources';

// This is a simple client-side implementation
// In a real app, you would handle this through an API to persist data

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [movieId, setMovieId] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [movieAltId, setMovieAltId] = useState('');
  
  const [tvId, setTvId] = useState('');
  const [tvTitle, setTvTitle] = useState('');
  const [tvAltId, setTvAltId] = useState('');
  
  const [tvEpId, setTvEpId] = useState('');
  const [season, setSeason] = useState('');
  const [episode, setEpisode] = useState('');
  const [episodeTitle, setEpisodeTitle] = useState('');

  // Handle keyboard shortcut to close the panel (Escape key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  
  const handleAddMovie = () => {
    if (!movieId || !movieTitle) {
      alert('Please fill in at least Movie ID and Title.');
      return;
    }
    
    try {
      const year = movieYear ? parseInt(movieYear) : new Date().getFullYear();
      
      // In a real implementation, you would send this to an API
      // Here we show an alert to demonstrate
      alert(
        `Movie would be added with:\nID: ${movieId}\nTitle: ${movieTitle}\nYear: ${year}\nAlt ID: ${movieAltId || 'None'}`
      );
      
      // Clear the form
      setMovieId('');
      setMovieTitle('');
      setMovieYear('');
      setMovieAltId('');
    } catch (error) {
      alert('Error adding movie: ' + error);
    }
  };
  
  const handleAddTVShow = () => {
    if (!tvId || !tvTitle) {
      alert('Please fill in at least TV Show ID and Title.');
      return;
    }
    
    try {
      // In a real implementation, you would send this to an API
      alert(
        `TV Show would be added with:\nID: ${tvId}\nTitle: ${tvTitle}\nAlt ID: ${tvAltId || 'None'}`
      );
      
      // Clear the form
      setTvId('');
      setTvTitle('');
      setTvAltId('');
    } catch (error) {
      alert('Error adding TV show: ' + error);
    }
  };
  
  const handleAddTVEpisode = () => {
    if (!tvEpId || !season || !episode || !episodeTitle) {
      alert('Please fill in all TV Episode fields.');
      return;
    }
    
    try {
      // In a real implementation, you would send this to an API
      alert(
        `TV Episode would be added with:\nShow ID: ${tvEpId}\nSeason: ${season}\nEpisode: ${episode}\nTitle: ${episodeTitle}`
      );
      
      // Clear the form
      setTvEpId('');
      setSeason('');
      setEpisode('');
      setEpisodeTitle('');
    } catch (error) {
      alert('Error adding TV episode: ' + error);
    }
  };
  
  return (
    <div className="admin-panel">
      <h3>Admin Panel</h3>
      
      <div className="admin-section">
        <h4>Add Movie</h4>
        <input
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          placeholder="Movie ID (IMDB or TMDB)"
        />
        <input
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          placeholder="Movie Title"
        />
        <input
          value={movieYear}
          onChange={(e) => setMovieYear(e.target.value)}
          placeholder="Year"
          type="number"
        />
        <input
          value={movieAltId}
          onChange={(e) => setMovieAltId(e.target.value)}
          placeholder="Alternative ID (TMDB for IMDB, or IMDB for TMDB)"
        />
        <button onClick={handleAddMovie}>Add Movie</button>
      </div>
      
      <div className="admin-section">
        <h4>Add TV Show</h4>
        <input
          value={tvId}
          onChange={(e) => setTvId(e.target.value)}
          placeholder="TV Show ID (IMDB or TMDB)"
        />
        <input
          value={tvTitle}
          onChange={(e) => setTvTitle(e.target.value)}
          placeholder="TV Show Title"
        />
        <input
          value={tvAltId}
          onChange={(e) => setTvAltId(e.target.value)}
          placeholder="Alternative ID (TMDB for IMDB, or IMDB for TMDB)"
        />
        <button onClick={handleAddTVShow}>Add TV Show</button>
      </div>
      
      <div className="admin-section">
        <h4>Add TV Episode</h4>
        <input
          value={tvEpId}
          onChange={(e) => setTvEpId(e.target.value)}
          placeholder="TV Show ID (IMDB or TMDB)"
        />
        <input
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          placeholder="Season Number"
          type="number"
        />
        <input
          value={episode}
          onChange={(e) => setEpisode(e.target.value)}
          placeholder="Episode Number"
          type="number"
        />
        <input
          value={episodeTitle}
          onChange={(e) => setEpisodeTitle(e.target.value)}
          placeholder="Episode Title"
        />
        <button onClick={handleAddTVEpisode}>Add TV Episode</button>
      </div>
      
      <button className="close-admin" onClick={onClose}>Close</button>
    </div>
  );
} 