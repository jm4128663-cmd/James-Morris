import React, { useState } from 'react';
import { Play, Bookmark, Eye, ThumbsUp, Film } from 'lucide-react';
import { VideoItem } from '../data/contentData';

interface ContentCardProps {
  video: VideoItem;
  onSelect: (video: VideoItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (video: VideoItem) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  video,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={() => onSelect(video)}
      className="group relative flex flex-col bg-[#11111a] hover:bg-[#161622] border border-[#222232] hover:border-purple-500/40 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-950/20"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#0d0d14]">
        {!imageError ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1329] to-[#0f0e17] text-purple-300/60 p-4">
            <Film className="w-10 h-10 mb-2 opacity-50" />
            <span className="text-xs font-mono">{video.category}</span>
          </div>
        )}

        {/* Ambient Dark Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Play Button Overlay (Reveals on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg shadow-purple-900/50 transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>

        {/* Top Badges (Quality + Bookmark) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide bg-black/70 backdrop-blur-sm text-purple-300 border border-purple-500/30">
            {video.resolution}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(video);
            }}
            title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
              isBookmarked
                ? 'bg-purple-600 text-white'
                : 'bg-black/60 text-slate-300 hover:text-white hover:bg-black/80'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Duration Badge */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[11px] font-medium bg-black/80 text-slate-200">
          {video.duration}
        </div>

        {/* Category Chip (Left Bottom) */}
        <div className="absolute bottom-2.5 left-2.5 text-[11px] font-semibold text-rose-300 drop-shadow">
          {video.category}
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-sm sm:text-base text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1 mb-1.5">
            {video.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {video.description}
          </p>
        </div>

        {/* Metadata Footer (Disciplined unboxed inline text) */}
        <div className="pt-2 border-t border-[#1f1f2e] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>{video.views}</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <ThumbsUp className="w-3 h-3" />
              <span>{video.rating}</span>
            </span>
          </div>

          <span className="text-[11px] text-slate-500">{video.releaseDate}</span>
        </div>
      </div>
    </div>
  );
};
