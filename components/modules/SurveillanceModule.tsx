import React, { useState } from 'react';
import { Video, Maximize2, Grid3x3, Grid2x2, Filter } from 'lucide-react';
import GlassCard from '../GlassCard';

// Import local images
import cam1 from '../../img/computer_vision_dense_crowd1.jpg';
import cam2 from '../../img/computer_vision_dense_crowd2.png';
import cam3 from '../../img/computer_vision_not_dense_crowd1.jpg';
import cam4 from '../../img/computer_vision_not_dense_crowd2.jpg';

interface Camera {
    id: number;
    name: string;
    zone: string;
    feedUrl: string;
    status: 'online' | 'offline';
    density: 'high' | 'low';
    densityPercent: number; // Actual crowd density percentage
    trendPercent: number; // Trend percentage
}

const cameras: Camera[] = [
    {
        id: 1,
        name: 'Security Zone 2 - Lane A',
        zone: 'Security',
        feedUrl: cam1,
        status: 'online',
        density: 'high',
        densityPercent: 85,
        trendPercent: 12
    },
    {
        id: 2,
        name: 'Security Zone 2 - Lane B',
        zone: 'Security',
        feedUrl: cam2,
        status: 'online',
        density: 'high',
        densityPercent: 78,
        trendPercent: 15
    },
    {
        id: 3,
        name: 'Security Zone 2 - Main Area',
        zone: 'Security',
        feedUrl: cam3,
        status: 'online',
        density: 'low',
        densityPercent: 42,
        trendPercent: 3
    },
    {
        id: 4,
        name: 'Security Zone 2 - Exit',
        zone: 'Security',
        feedUrl: cam4,
        status: 'online',
        density: 'low',
        densityPercent: 35,
        trendPercent: -2
    }
];

const SurveillanceModule: React.FC = () => {
    const [gridSize, setGridSize] = useState<'2x2' | '3x3'>('2x2');
    const [_selectedCamera, setSelectedCamera] = useState<number | null>(null); // Prefixed unsed var

    const displayedCameras = gridSize === '2x2' ? cameras.slice(0, 4) : cameras.slice(0, 9);

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">


            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-amber-400" />
                    <span className="text-sm md:text-base font-bold text-white">
                        {displayedCameras.filter(c => c.status === 'online').length} Cameras Online
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs md:text-sm text-white/50 hidden sm:block">Grid Size:</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setGridSize('2x2')}
                            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${gridSize === '2x2'
                                ? 'bg-amber-500/20 border-2 border-amber-500/50 text-amber-400'
                                : 'bg-white/5 border-2 border-white/10 text-white/70 hover:bg-white/10'
                                }`}
                        >
                            <Grid2x2 className="w-4 h-4" />
                            <span className="text-xs md:text-sm font-bold hidden sm:inline">2×2</span>
                        </button>
                        <button
                            onClick={() => setGridSize('3x3')}
                            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all ${gridSize === '3x3'
                                ? 'bg-amber-500/20 border-2 border-amber-500/50 text-amber-400'
                                : 'bg-white/5 border-2 border-white/10 text-white/70 hover:bg-white/10'
                                }`}
                        >
                            <Grid3x3 className="w-4 h-4" />
                            <span className="text-xs md:text-sm font-bold hidden sm:inline">3×3</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Camera Grid */}
            <div
                className={`grid gap-3 md:gap-4 overflow-y-auto max-h-[calc(100vh-220px)] pr-2 scrollbar-thin scrollbar-thumb-amber-500/50 scrollbar-track-neutral-800/50 ${gridSize === '2x2' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    }`}
            >
                {displayedCameras.map((camera) => (
                    <GlassCard
                        key={camera.id}
                        variant="dark"
                        className={`p-0 overflow-hidden border-2 transition-all group ${camera.density === 'high' ? 'border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-white/10 hover:border-amber-500/30'
                            }`}
                    >
                        {/* Camera Feed */}
                        <div className="relative aspect-video bg-black">
                            <img
                                src={camera.feedUrl}
                                alt={camera.name}
                                className="w-full h-full object-cover opacity-80"
                            />

                            {/* High Density Overlay */}
                            {camera.density === 'high' && (
                                <div className="absolute inset-0 pointer-events-none">
                                    {/* Red Tint */}
                                    <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>

                                    {/* Bounding Box Simulation */}
                                    <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] border-2 border-red-400/50 border-dashed"></div>
                                </div>
                            )}

                            {/* Overlay Info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setSelectedCamera(camera.id)}
                                    className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-colors"
                                >
                                    <Maximize2 className="w-4 h-4 text-white" />
                                </button>
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm">
                                <div className={`w-2 h-2 rounded-full ${camera.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></div>
                                <span className="text-xs font-bold text-white uppercase">{camera.status}</span>
                            </div>


                            {/* Live Badge */}
                            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-red-600/80 backdrop-blur-sm">
                                <span className="text-xs font-bold text-white uppercase tracking-wider">● LIVE</span>
                            </div>
                        </div>


                        {/* Camera Info */}
                        <div className={`p-3 md:p-4 ${camera.density === 'high' ? 'bg-red-500/10' : ''} relative`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm md:text-base font-bold text-white mb-1">{camera.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-white/50">
                                        <Filter className="w-3 h-3" />
                                        <span>{camera.zone}</span>
                                    </div>
                                </div>

                                {/* Vertex AI Vision Analysis - In Camera Info Section */}
                                <div className="bg-neutral-900/95 backdrop-blur-sm border border-amber-500/40 rounded-md px-3 py-1.5 shadow-lg shadow-amber-900/20">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                                <circle cx="12" cy="13" r="4" />
                                            </svg>
                                            <span className="text-[10px] font-bold text-amber-400">Vertex AI</span>
                                        </div>
                                        <div className="h-3 w-px bg-amber-500/30"></div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-white/60">Density</span>
                                            <span className={`text-sm font-black ${camera.density === 'high' ? 'text-red-400' : 'text-emerald-400'}`}>
                                                {camera.densityPercent}%
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-white/60">Trend</span>
                                            <span className={`text-sm font-black ${camera.trendPercent > 0 ? 'text-orange-400' : 'text-emerald-400'}`}>
                                                {camera.trendPercent > 0 ? '+' : ''}{camera.trendPercent}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default SurveillanceModule;
