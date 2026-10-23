import { useEffect, useState } from 'react';

// Change this single config object to update the video later.
const VIDEO = {
  url: 'https://youtu.be/1sy4p8oXJs8?si=vKrlX0QnnGjeg1Dz',
  title: 'How We Teach at EXL Institute'
};

function extractYouTubeVideoId(url) {
  const match = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );

  return match ? match[1] : null;
}

export default function YouTubeVideo() {
  const videoId = extractYouTubeVideoId(VIDEO.url);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : null);
  const [thumbnailFallback, setThumbnailFallback] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(!videoId);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  useEffect(() => {
    if (!isPlaying || embedLoaded) return undefined;

    const timeout = window.setTimeout(() => setEmbedFailed(true), 10000);
    return () => window.clearTimeout(timeout);
  }, [embedLoaded, isPlaying]);

  const watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : VIDEO.url;

  if (embedFailed) {
    return (
      <div className="teaching-video teaching-video--fallback" role="status">
        <p>We couldn’t load the video here, but you can watch it on YouTube.</p>
        <a href={watchUrl} target="_blank" rel="noreferrer">
          Watch on YouTube
        </a>
      </div>
    );
  }

  if (isPlaying) {
    return (
      <div className="teaching-video">
        <iframe
          className="teaching-video__iframe"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={VIDEO.title}
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          onLoad={() => setEmbedLoaded(true)}
          onError={() => setEmbedFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="teaching-video">
      <button
        className="teaching-video__facade"
        type="button"
        onClick={() => setIsPlaying(true)}
        aria-label={`Play video: ${VIDEO.title}`}
      >
        {thumbnail && (
          <img
            className="teaching-video__thumbnail"
            src={thumbnail}
            alt=""
            onError={() => {
              if (!thumbnailFallback) {
                setThumbnail(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
                setThumbnailFallback(true);
              } else {
                setThumbnail(null);
              }
            }}
          />
        )}
        <span className="teaching-video__overlay" aria-hidden="true" />
        <span className="teaching-video__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13l10-6.5z" />
          </svg>
        </span>
        <span className="teaching-video__hint">Click to play</span>
      </button>
    </div>
  );
}
