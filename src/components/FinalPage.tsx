import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Sparkles from './Sparkles';

export default function FinalPage() {
  const bgm = useRef<HTMLAudioElement | null>(null);
  const voice = useRef<HTMLAudioElement | null>(null);

  const [needTap, setNeedTap] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const volumeRef = useRef(0.15);

  useEffect(() => {
    bgm.current = new Audio('/assets/bgm-qingge.mp3');
    voice.current = new Audio('/assets/voice-message.mp3');

    bgm.current.loop = true;
    bgm.current.volume = volumeRef.current;
    voice.current.volume = 1;

    bgm.current.play().catch(() => setNeedTap(true));

    const done = () => {
      setPlaying(false);
      if (bgm.current) {
        bgm.current.volume = volumeRef.current;
      }
    };

    voice.current.addEventListener('ended', done);

    return () => {
      voice.current?.removeEventListener('ended', done);
      bgm.current?.pause();
      voice.current?.pause();
    };
  }, []);

  const start = () => {
    bgm.current
      ?.play()
      .then(() => setNeedTap(false))
      .catch(() => setNeedTap(true));
  };

  const play = () => {
    if (!voice.current) return;

    if (bgm.current) {
      bgm.current.volume = Math.max(volumeRef.current * 0.35, 0.02);
    }

    voice.current.currentTime = 0;
    voice.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setNeedTap(true));
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    volumeRef.current = v;
    setVolume(v);

    if (bgm.current && !playing) {
      bgm.current.volume = v;
    }
  };

  return (
    <section
      className="relative h-full w-full overflow-hidden page-bg text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(20,14,24,.04),rgba(20,14,24,.18)),url(/assets/friend-bg.jpg)`,
      }}
    >
      <Sparkles count={42} />

      <div className="absolute inset-0 mx-auto max-w-6xl">
        <motion.div
          className="absolute left-[4%] top-[13%] max-w-[45vw] text-left sm:left-[8%] md:left-[10%]"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-cursiveCN gold-title text-5xl font-normal leading-tight text-yellow-100/90 sm:text-7xl md:text-8xl">
            cai 的
          </p>
          <p className="font-cursiveCN gold-title mt-4 inline-block rounded-[2rem] bg-white/10 px-6 py-3 text-4xl font-normal text-yellow-100/90 backdrop-blur-md sm:text-6xl">
            20岁
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-[22%] right-[4%] max-w-[52vw] text-right sm:right-[8%] md:right-[10%]"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="font-cursiveCN gold-title text-5xl font-normal leading-tight text-yellow-100/90 sm:text-7xl md:text-8xl">
            天天开心
          </p>
        </motion.div>

        {needTap && (
          <motion.button
            onClick={start}
            className="absolute left-1/2 top-7 z-20 -translate-x-1/2 rounded-full bg-cream px-5 py-3 font-black text-cocoa shadow-glow"
            whileTap={{ scale: 0.95 }}
          >
            tap to start music
          </motion.button>
        )}

        {/* 音量控制器 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute right-6 top-[28%] z-30"
        >
          <div className="rounded-[28px] border border-white/25 bg-white/10 px-4 py-5 backdrop-blur-xl shadow-glow">
            <div className="mb-3 text-center text-xs font-bold tracking-widest text-white/80">
              MUSIC
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                className="h-2 w-28 cursor-pointer appearance-none rounded-full bg-white/30"
              />
              <span className="text-lg">🔊</span>
            </div>
            <div className="mt-2 text-center text-xs font-bold text-white">
              {Math.round(volume * 100)}%
            </div>
          </div>
        </motion.div>

        {/* 录音按钮 */}
        <motion.button
          onClick={play}
          className="absolute bottom-7 left-1/2 z-20 grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full border-4 border-white/85 bg-softblue text-blue-900 shadow-blueGlow sm:h-28 sm:w-28"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
        >
          {playing && (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-softblue/50" />
              <span className="absolute -inset-4 animate-pulse rounded-full border border-white/70" />
            </>
          )}
          <span className="relative z-10 text-4xl sm:text-5xl">🎙️</span>
        </motion.button>
      </div>
    </section>
  );
}