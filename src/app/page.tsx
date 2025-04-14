import React from 'react';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'monospace',
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6'
    }}>
      <h1>API Endpoints</h1>
      <div>
        <code>GET: /movie/id</code>
      </div>
      <div>
        <code>GET: /tv/id/season_number/episode_number</code>
      </div>
    </div>
  );
}