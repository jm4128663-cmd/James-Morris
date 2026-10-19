import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ThumbsUp,
  Bookmark,
  Share2,
  Flag,
  ShieldCheck,
  Sparkles,
  Check,
} from 'lucide-react';
import { VideoItem } from '../data/contentData';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (video: VideoItem) => void;
  onOpenReport: (video: VideoItem) => void;
  onSelectRelated: (video: VideoItem) => void;
  allVideos: VideoItem[];
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenReport,
  onSelectRelated,
  allVideos,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(18); // Simulated % progress
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState<'4K' | '1080p'>('4K');
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    if (video) {
      setLikesCount(video.likes);
      setHasLiked(false);
      setProgress(15);
      setIsPlaying(true);
    }
  }, [video]);

  // Simulated progress timer when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!video) return null;

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const related = allVideos.filter((v) => v.id !== video.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0c0c14] border border-[#222236] rounded-2xl overflow-hidden shadow-2xl text-slate-200 my-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#11111d] border-b border-[#202030]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-purple-400">
              {video.category}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">{selectedQuality} HDR</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen / Player Container */}
        <div className="relative aspect-video w-full bg-black group overflow-hidden select-none">
          <img
            src={video.backdropUrl || video.thumbnailUrl}
            alt={video.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-90 group-hover:scale-101 transition-transform duration-700"
          />

          {/* Vignette & cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

          {/* Center Play/Pause button on tap */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-black/60 hover:bg-purple-600/90 text-white flex items-center justify-center border border-white/20 shadow-2xl transition-all duration-300 transform hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-white" />
            ) : (
              <Play className="w-8 h-8 fill-white ml-1" />
            )}
          </button>

          {/* Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex flex-col gap-2">
            {/* Scrubber Bar */}
            <div
              className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer group/bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPct = (clickX / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, newPct)));
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 -top-1 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-slate-400">
                  {Math.floor((video.durationSeconds * progress) / 100 / 60)}:
                  {String(Math.floor(((video.durationSeconds * progress) / 100) % 60)).padStart(2, '0')}{' '}
                  / {video.duration}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Resolution Selector */}
                <div className="flex items-center gap-1 bg-[#1a1a2b] border border-[#2f2f47] rounded-md p-0.5 text-[11px] font-semibold">
                  <button
                    onClick={() => setSelectedQuality('4K')}
                    className={`px-2 py-0.5 rounded ${
                      selectedQuality === '4K'
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    4K
                  </button>
                  <button
                    onClick={() => setSelectedQuality('1080p')}
                    className={`px-2 py-0.5 rounded ${
                      selectedQuality === '1080p'
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    1080p
                  </button>
                </div>

                <button
                  onClick={() => {
                    const el = document.documentElement;
                    if (!document.fullscreenElement) {
                      el.requestFullscreen?.().catch(() => {});
                    } else {
                      document.exitFullscreen?.().catch(() => {});
                    }
                  }}
                  className="p-1 hover:text-white transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info & Action Section */}
        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {video.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-purple-400 font-semibold">{video.category}</span>
                <span>·</span>
                <span>{video.views} views</span>
                <span>·</span>
                <span className="text-emerald-400">{video.rating} positive</span>
                <span>·</span>
                <span>Released {video.releaseDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  hasLiked
                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/30'
                    : 'bg-[#181827] border-[#292942] text-slate-300 hover:bg-[#202035]'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-white' : ''}`} />
                <span>{likesCount.toLocaleString()}</span>
              </button>

              <button
                onClick={() => onToggleBookmark(video)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isBookmarked
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-[#181827] border-[#292942] text-slate-300 hover:bg-[#202035]'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#181827] border border-[#292942] text-slate-300 hover:bg-[#202035] transition-all"
              >
                {copiedToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedToast ? 'Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={() => onOpenReport(video)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-950/30 border border-rose-800/40 text-rose-300 hover:bg-rose-900/40 transition-all"
                title="Flag or Report Content"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Report</span>
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {video.description}
          </p>

          {/* Performers & Tags */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#1f1f30] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Performers:</span>
              <div className="flex items-center gap-1.5">
                {video.performers.map((p) => (
                  <span
                    key={p}
                    className="text-slate-200 font-medium hover:text-purple-300 transition-colors"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500">Tags:</span>
              <div className="flex items-center gap-2">
                {video.tags.map((t) => (
                  <span key={t} className="text-purple-400/90 hover:underline">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 18 U.S.C. 2257 Notice */}
          <div className="p-3 bg-[#11111b] border border-[#232338] rounded-xl flex items-start gap-2.5 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong className="text-slate-300">18 U.S.C. § 2257 Record-Keeping Exemption:</strong> All models appearing on this website were 18 years of age or older at the time of creation. Records required pursuant to 18 U.S.C. § 2257 are maintained by the custodian of records.
            </p>
          </div>

          {/* Related Releases */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Recommended For You</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectRelated(item)}
                  className="group flex gap-3 p-2 bg-[#141420] border border-[#212133] hover:border-purple-500/40 rounded-xl cursor-pointer transition-all"
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-24 h-16 object-cover rounded-lg shrink-0 group-hover:brightness-110"
                  />
                  <div className="min-w-0 flex flex-col justify-center">
                    <h4 className="text-xs font-semibold text-slate-200 group-hover:text-purple-300 truncate">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-purple-400">{item.category}</span>
                    <span className="text-[10px] text-slate-500">{item.duration} · {item.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
