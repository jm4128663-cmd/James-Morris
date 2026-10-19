import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Bookmark,
  Play,
  Flame,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Filter,
  FileCode,
  RotateCcw,
  Flag,
  Film,
} from 'lucide-react';
import { INITIAL_VIDEOS, CATEGORIES, VideoItem } from './data/contentData';
import { ContentCard } from './components/ContentCard';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AgeVerificationModal } from './components/AgeVerificationModal';
import { ReportModal } from './components/ReportModal';
import { ComplianceModals, ComplianceType } from './components/ComplianceModals';
import { BloggerExportModal } from './components/BloggerExportModal';

export default function App() {
  // Age Gate State
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Content');
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'watchlist'>('all');

  // Active Modals & Selected Video
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [reportingVideo, setReportingVideo] = useState<VideoItem | null>(null);
  const [complianceType, setComplianceType] = useState<ComplianceType>(null);
  const [showBloggerExport, setShowBloggerExport] = useState(false);

  // Watchlist & Bookmarks
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('velvetnoir_watchlist');
      return saved ? JSON.parse(saved) : ['vid-01', 'vid-03'];
    } catch {
      return ['vid-01', 'vid-03'];
    }
  });

  // Additional content for "Load More" pagination
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Check initial age verification
  useEffect(() => {
    const verified = localStorage.getItem('velvetnoir_age_verified');
    if (verified === 'true') {
      setIsAgeVerified(true);
    } else {
      setShowAgeModal(true);
    }
  }, []);

  const handleAgeConfirm = () => {
    setIsAgeVerified(true);
    setShowAgeModal(false);
  };

  const handleResetAgeGate = () => {
    localStorage.removeItem('velvetnoir_age_verified');
    setIsAgeVerified(false);
    setShowAgeModal(true);
  };

  const toggleBookmark = (video: VideoItem) => {
    setWatchlist((prev) => {
      const next = prev.includes(video.id)
        ? prev.filter((id) => id !== video.id)
        : [...prev, video.id];
      try {
        localStorage.setItem('velvetnoir_watchlist', JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  // Filtered Videos based on search, category, and tabs
  const filteredVideos = useMemo(() => {
    let list = [...INITIAL_VIDEOS];

    if (activeTab === 'trending') {
      list = list.filter((v) => v.isTrending);
    } else if (activeTab === 'watchlist') {
      list = list.filter((v) => watchlist.includes(v.id));
    }

    if (selectedCategory !== 'All Content') {
      if (selectedCategory === '4K Ultra HD') {
        list = list.filter((v) => v.resolution === '4K UHD');
      } else {
        list = list.filter((v) => v.category === selectedCategory);
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q)) ||
          v.performers.some((p) => p.toLowerCase().includes(q))
      );
    }

    return list;
  }, [searchQuery, selectedCategory, activeTab, watchlist]);

  const displayedVideos = filteredVideos.slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoadingMore(false);
    }, 400);
  };

  const featuredVideo = INITIAL_VIDEOS[0];
  const trendingVideos = INITIAL_VIDEOS.filter((v) => v.isTrending).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* 18+ Mandatory Age Verification Modal */}
      <AgeVerificationModal
        isOpen={showAgeModal && !isAgeVerified}
        onConfirm={handleAgeConfirm}
      />

      {/* Interactive Video Player & Cinema Detail Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        isBookmarked={selectedVideo ? watchlist.includes(selectedVideo.id) : false}
        onToggleBookmark={toggleBookmark}
        onOpenReport={(v) => {
          setSelectedVideo(null);
          setReportingVideo(v);
        }}
        onSelectRelated={(v) => setSelectedVideo(v)}
        allVideos={INITIAL_VIDEOS}
      />

      {/* Content & Legal Reporting Modal */}
      <ReportModal
        video={reportingVideo}
        onClose={() => setReportingVideo(null)}
      />

      {/* Compliance Policies (2257, DMCA, Privacy, Terms) */}
      <ComplianceModals
        type={complianceType}
        onClose={() => setComplianceType(null)}
      />

      {/* Blogger Single-File HTML Exporter & Guide */}
      <BloggerExportModal
        isOpen={showBloggerExport}
        onClose={() => setShowBloggerExport(false)}
      />

      {/* ====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract)
          Zone 1: Brand wordmark
          Zone 2: 4-5 single-line clean nav links
          Zone 3: 1 primary action CTA
          ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#09090e]/95 backdrop-blur-md border-b border-[#1c1c2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('all');
                setSelectedCategory('All Content');
                setSearchQuery('');
              }}
              className="flex items-center gap-2 group whitespace-nowrap shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-purple-900/40">
                <Film className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white font-serif">
                VELVET<span className="text-purple-400">NOIR</span>
              </span>
            </a>

            {/* Zone 2: Single-line Clean Nav Links */}
            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
              <button
                onClick={() => {
                  setActiveTab('all');
                  setSelectedCategory('All Content');
                }}
                className={`transition-colors whitespace-nowrap hover:text-white ${
                  activeTab === 'all' && selectedCategory === 'All Content'
                    ? 'text-purple-400 border-b-2 border-purple-500 py-5'
                    : 'text-slate-400'
                }`}
              >
                All Releases
              </button>

              <button
                onClick={() => {
                  setActiveTab('trending');
                  setSelectedCategory('All Content');
                }}
                className={`transition-colors whitespace-nowrap hover:text-white ${
                  activeTab === 'trending'
                    ? 'text-purple-400 border-b-2 border-purple-500 py-5'
                    : 'text-slate-400'
                }`}
              >
                Trending Now
              </button>

              <button
                onClick={() => setSelectedCategory('VIP Premiere')}
                className={`transition-colors whitespace-nowrap hover:text-white ${
                  selectedCategory === 'VIP Premiere'
                    ? 'text-purple-400 border-b-2 border-purple-500 py-5'
                    : 'text-slate-400'
                }`}
              >
                VIP Premiere
              </button>

              <button
                onClick={() => {
                  setActiveTab('watchlist');
                  setSelectedCategory('All Content');
                }}
                className={`transition-colors whitespace-nowrap hover:text-white flex items-center gap-1.5 ${
                  activeTab === 'watchlist'
                    ? 'text-purple-400 border-b-2 border-purple-500 py-5'
                    : 'text-slate-400'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Watchlist ({watchlist.length})</span>
              </button>

              <button
                onClick={() => setComplianceType('2257')}
                className="transition-colors whitespace-nowrap text-slate-400 hover:text-white"
              >
                18 U.S.C. 2257
              </button>
            </nav>

            {/* Zone 3: 1 Primary Action (Blogger HTML Exporter) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowBloggerExport(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs font-bold tracking-wide shadow-lg shadow-purple-950/40 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <FileCode className="w-4 h-4" />
                <span>Get Blogger HTML</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* Search & Tagline Strip */}
        <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search titles, actors, categories, 4K releases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#10101a] border border-[#232336] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500/70 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 self-end md:self-auto">
            <span className="flex items-center gap-1 text-rose-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>18+ Consensual Adult Entertainment</span>
            </span>
          </div>
        </div>

        {/* Featured Content Hero Spotlight */}
        {!searchQuery && activeTab === 'all' && selectedCategory === 'All Content' && (
          <div className="mb-10">
            <div
              onClick={() => setSelectedVideo(featuredVideo)}
              className="group relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-[#232338] hover:border-purple-500/40 cursor-pointer shadow-2xl transition-all duration-300"
            >
              <img
                src={featuredVideo.backdropUrl || featuredVideo.thumbnailUrl}
                alt={featuredVideo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-85 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/50 to-transparent" />

              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 max-w-3xl">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Featured Premiere</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-purple-300">{featuredVideo.resolution}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 line-clamp-2">
                  {featuredVideo.title}
                </h1>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 mb-5 leading-relaxed">
                  {featuredVideo.description}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideo(featuredVideo);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-950/40 flex items-center gap-2 transition-transform group-hover:scale-105"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Full Premiere</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(featuredVideo);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 hover:bg-black/80 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        watchlist.includes(featuredVideo.id) ? 'fill-white' : ''
                      }`}
                    />
                    <span>
                      {watchlist.includes(featuredVideo.id) ? 'Saved' : 'Add to Watchlist'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Navigation Bar */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Filter className="w-4 h-4 text-purple-400" />
              <span>Browse Categories</span>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              {filteredVideos.length} Available
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveTab('all');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-950/40'
                    : 'bg-[#12121c] border-[#222234] text-slate-400 hover:text-white hover:bg-[#1a1a28]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Trending Section Spotlight (when on All Releases) */}
        {!searchQuery && activeTab === 'all' && selectedCategory === 'All Content' && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-500" />
                <h2 className="text-lg font-bold text-white tracking-tight">Trending Releases</h2>
              </div>
              <button
                onClick={() => setActiveTab('trending')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <span>View All Trending</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingVideos.map((video) => (
                <ContentCard
                  key={`trending-${video.id}`}
                  video={video}
                  onSelect={(v) => setSelectedVideo(v)}
                  isBookmarked={watchlist.includes(video.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          </section>
        )}

        {/* Content Grid (Latest & Filtered Results) */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : activeTab === 'watchlist'
                  ? `My Watchlist (${watchlist.length})`
                  : activeTab === 'trending'
                  ? 'All Trending Now'
                  : selectedCategory !== 'All Content'
                  ? selectedCategory
                  : 'Latest Uploads & Cinema Catalog'}
              </h2>
            </div>
          </div>

          {displayedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedVideos.map((video) => (
                <ContentCard
                  key={video.id}
                  video={video}
                  onSelect={(v) => setSelectedVideo(v)}
                  isBookmarked={watchlist.includes(video.id)}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#11111c] border border-[#212133] rounded-2xl">
              <Film className="w-12 h-12 text-purple-400/40 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No videos found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                Try searching for another keyword or browse our standard categories.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Content');
                  setActiveTab('all');
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredVideos.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 rounded-xl bg-[#141422] hover:bg-[#1d1d2e] border border-[#2b2b40] text-slate-200 text-xs font-semibold transition-all shadow-md flex items-center gap-2"
              >
                {isLoadingMore ? (
                  <span>Loading additional releases...</span>
                ) : (
                  <span>Load More Releases ({filteredVideos.length - visibleCount} remaining)</span>
                )}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ====================================================================
          PROFESSIONAL FOOTER & COMPLIANCE POLICIES
          ==================================================================== */}
      <footer className="bg-[#050508] border-t border-[#1a1a28] py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-rose-600 flex items-center justify-center text-white">
                  <Film className="w-3.5 h-3.5 fill-white" />
                </div>
                <span className="text-sm font-bold tracking-wider text-white font-serif">
                  VELVET<span className="text-purple-400">NOIR</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                A modern cinematic entertainment service dedicated to lawful, consenting adult productions. Engineered with 4K UHD streaming, privacy safeguards, and 18 U.S.C. 2257 statutory record compliance.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Platform Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('all');
                      setSelectedCategory('All Content');
                    }}
                    className="hover:text-purple-400 transition-colors"
                  >
                    Featured &amp; Latest
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('trending')}
                    className="hover:text-purple-400 transition-colors"
                  >
                    Trending Catalog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory('VIP Premiere')}
                    className="hover:text-purple-400 transition-colors"
                  >
                    VIP Premiere Pass
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleResetAgeGate}
                    className="flex items-center gap-1.5 text-rose-400/80 hover:text-rose-300 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset 18+ Verification Gate</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Legal &amp; Compliance
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setComplianceType('2257')}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    18 U.S.C. § 2257 Statement
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setComplianceType('dmca')}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    DMCA Copyright Notice
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setComplianceType('terms')}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setReportingVideo(INITIAL_VIDEOS[0])}
                    className="hover:text-rose-400 transition-colors text-left flex items-center gap-1 text-rose-400/90"
                  >
                    <Flag className="w-3 h-3" />
                    <span>Report Content or Abuse</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Support &amp; Privacy
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setComplianceType('privacy')}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    Privacy &amp; Data Protection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setComplianceType('contact')}
                    className="hover:text-purple-400 transition-colors text-left"
                  >
                    Contact Records Custodian
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowBloggerExport(true)}
                    className="hover:text-purple-400 transition-colors text-left text-purple-400 font-semibold flex items-center gap-1"
                  >
                    <FileCode className="w-3 h-3" />
                    <span>Blogger HTML Export Tool</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-[#161622] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} VelvetNoir Entertainment Inc. All rights reserved. Strictly 18+ Adults Only.
            </div>
            <div>
              Records required by 18 U.S.C. 2257 and 28 C.F.R. 75 are maintained by Custodian of Records.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
