# ADR-004: Video Player Implementation

## Status
Accepted

## Context
The "How We Teach / Demo" section requires:
- 1 main video player
- 3 selectable tiles (one per non-default language)
- Default: German demo plays on load
- Clicking a tile swaps that video into the main player inline
- Videos hosted on YouTube, embedded via iframe
- No navigation away from page

## Decision
Use **YouTube iframe embeds** with dynamic `src` swapping via React state.

## Alternatives Considered
1. **YouTube Player API (JS API)** - More control (events, playback quality), but overkill for simple swap; adds API load complexity
2. **`<video>` tag with MP4 sources** - Requires video hosting/transcoding; YouTube handles bandwidth, CDN, adaptive streaming
3. **Modal/lightbox on click** - Violates "inline swap, no navigation" requirement
4. **Separate page per video** - Violates single-page architecture

## Consequences

### Positive
- Simple implementation: just change iframe `src` attribute
- YouTube handles hosting, compression, CDN, mobile playback
- No video storage/bandwidth costs
- Familiar UX for users
- Thumbnail images from YouTube (`img.youtube.com/vi/{id}/maxresdefault.jpg`)

### Negative
- YouTube branding/controls always visible
- Requires internet connection
- Cookie consent may be needed (GDPR)
- Limited styling of player chrome
- Autoplay policies may block initial play

## Implementation Notes
- Store YouTube video IDs in `videos.json` (not full URLs)
- Construct embed URL: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
- Default language from `videos.json` `defaultLanguage` field
- State: `selectedVideoId` - updated on tile click
- Tiles show thumbnail + title; active tile highlighted
- Accessibility: `title` attr on iframe, keyboard-navigable tiles
- Lazy-load iframes (only load default on mount)