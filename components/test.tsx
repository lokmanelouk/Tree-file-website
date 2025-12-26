  return (
    /* 1. Change main bg to slate-50 in light mode for depth */
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500">
      <Navbar />
      
      <main className="relative pt-20">
        <HeroBackground />
        
        {/* --- 2. Enhanced Filter Bar: Added stronger shadow and better border --- */}
        <section className="sticky top-16 z-40 w-full bg-white/95 dark:bg-slate-950/90 backdrop-blur-2xl border-b border-slate-200 dark:border-white/5 py-4 px-6 md:px-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] dark:shadow-none transition-all">
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center gap-4">
            
            <div className="flex items-center gap-3 w-full xl:w-auto">
              <Tooltip content="Back to Home" side="bottom">
                <a 
                  href="/" 
                  className="flex items-center justify-center w-11 h-11 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 transition-all shrink-0 shadow-md active:scale-95 group"
                >
                  <ArrowLeft size={20} strokeWidth={3} className="group-hover:-translate-x-0.5 transition-transform" />
                </a>
              </Tooltip>

              {/* Filter Pills */}
              <div className="flex items-center gap-1 p-1 bg-slate-200/50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 flex-grow sm:flex-grow-0">
                {(['All', 'Windows', 'macOS', 'Linux'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatformFilter(p)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                      platformFilter === p 
                        ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm border border-slate-200 dark:border-white/10' 
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden xl:block w-px h-8 bg-slate-200 dark:bg-white/10 mx-2" />

            <div className="grid grid-cols-2 lg:flex items-center gap-3 w-full xl:w-auto">
              <CustomDropdown 
                label="All Versions" 
                options={uniqueVersions} 
                value={versionFilter} 
                onChange={setVersionFilter} 
                icon={Filter} 
              />
              <CustomDropdown 
                label="All Channels" 
                options={['All', 'Stable', 'Beta', 'LTS']} 
                value={typeFilter} 
                onChange={setTypeFilter} 
                icon={Layers} 
              />
            </div>

            {/* Search Input: Better contrast in light mode */}
            <div className="relative w-full xl:flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search architecture..."
                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent focus:border-teal-500 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-[12px] font-black uppercase tracking-widest outline-none transition-all placeholder:text-slate-400 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* --- 3. Grid: Added padding and spacing --- */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto min-h-[600px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Available Installers</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Choose the build optimized for your architecture.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredDownloads.map((dl) => (
                <DownloadCard 
                  key={dl.id} 
                  dl={dl} 
                  isRecommended={dl.platform === detectedOS && dl.type === 'Stable'} 
                />
              ))}
            </AnimatePresence>
          </div>
          {/* ... empty state logic ... */}
        </section>

        {/* --- 4. Support Section: Darker contrast for separation --- */}
        <section className="py-32 px-6 md:px-12 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 shadow-inner">
           {/* ... Installation Support Content ... */}
        </section>
      </main>

      <Footer />
    </div>
  );
}

function DownloadCard({ dl, isRecommended }: { dl: DownloadItem, isRecommended: boolean }) {
  // Brand color logic for better variety
  const getBrandColors = () => {
    if (dl.platform === 'Windows') return 'text-blue-600 bg-blue-50 dark:bg-blue-500/10';
    if (dl.platform === 'macOS') return 'text-slate-900 bg-slate-100 dark:bg-white/10';
    if (dl.platform === 'Linux') return 'text-orange-600 bg-orange-50 dark:bg-orange-500/10';
    return 'text-teal-600 bg-teal-50';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      /* 5. Card: Added large shadow and white background to pop against slate-50 */
      className={`group relative p-10 rounded-[3.5rem] bg-white dark:bg-slate-900 border transition-all duration-500 ${
        isRecommended 
          ? 'border-teal-500 shadow-[0_20px_50px_-12px_rgba(20,184,166,0.15)]' 
          : 'border-slate-200 dark:border-white/5 shadow-[0_15px_35px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.1)]'
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-4 left-10 bg-teal-500 text-slate-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
          <Star size={12} fill="currentColor" />
          Recommended Build
        </div>
      )}

      <div className="flex justify-between items-start mb-10">
        {/* 6. Dynamic Tints: Use the brand colors helper */}
        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm ${
          isRecommended ? 'bg-teal-500 text-slate-950' : getBrandColors()
        }`}>
          {dl.platform === 'Windows' && <Laptop size={32} />}
          {dl.platform === 'macOS' && <Apple size={32} />}
          {dl.platform === 'Linux' && <Monitor size={32} />}
        </div>
        
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
          dl.type === 'Stable' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-100 dark:border-transparent' : 
          dl.type === 'Beta' ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border-amber-100 dark:border-transparent' : 
          'bg-slate-50 dark:bg-slate-500/10 text-slate-500 border-slate-100 dark:border-transparent'
        }`}>
          {dl.type}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-2">
          {dl.platform} <span className="text-slate-400 font-bold ml-1">{dl.arch}</span>
        </h3>
        <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <span className="text-teal-600 dark:text-teal-400">v{dl.version}</span>
          <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full" />
          {dl.releaseDate}
        </p>
      </div>

      {/* Stats Section with better separation */}
      <div className="grid grid-cols-2 gap-6 mb-10 p-5 bg-slate-50 dark:bg-white/5 rounded-[2rem]">
        <div className="space-y-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Format</span>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <FileCode size={14} className="text-teal-500" />
            {dl.ext}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Size</span>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Cpu size={14} className="text-teal-500" />
            {dl.size}
          </div>
        </div>
      </div>

      <a 
        href={dl.downloadUrl}
        className={`w-full py-5 rounded-[1.5rem] font-black text-base flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg ${
          isRecommended 
            ? 'bg-teal-500 text-slate-950 hover:bg-teal-400 shadow-teal-500/20' 
            : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-teal-600 dark:hover:bg-teal-400 hover:text-white dark:hover:text-slate-950'
        }`}
      >
        <Download size={20} strokeWidth={3} />
        DOWNLOAD {dl.ext.toUpperCase()}
      </a>
      
      {/* Footer Info */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5 font-mono text-[9px] opacity-80">
          <ShieldCheck size={14} className="text-emerald-500" />
          {dl.checksum.split(': ')[1]}
        </div>
        <span className="font-black uppercase tracking-widest opacity-40">Verified</span>
      </div>
    </motion.div>
  );
}