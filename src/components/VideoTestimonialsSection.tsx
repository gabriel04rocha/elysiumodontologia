"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Play } from "lucide-react";
import { useRef, useState } from "react";

const videos = [
  {
    id: "v1",
    src: "/Depoimentos/depoimento-1.mp4",
    label: "Depoimento 1",
  },
  {
    id: "v2",
    src: "/Depoimentos/depoimento-2.mp4",
    label: "Depoimento 2",
  },
];

function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      className="hover-lift rounded-3xl overflow-hidden group relative w-full h-full mx-auto"
      style={{ 
        boxShadow: "0 12px 40px rgba(55,92,109,0.18)", 
        border: "1px solid rgba(65,193,187,0.2)",
        aspectRatio: "9/16",
        maxHeight: "520px"
      }}
    >
      <video
        ref={videoRef}
        src={video.src}
        className="w-full h-full object-cover"
        playsInline
        onEnded={() => setPlaying(false)}
        style={{ display: "block" }}
      />

      {/* Play overlay */}
      {!playing && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
          style={{ background: "rgba(22,44,55,0.35)" }}
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #2d9f99, #41c1bb)",
              boxShadow: "0 8px 32px rgba(65,193,187,0.5)",
            }}
          >
            <Play className="w-7 h-7 text-white ml-1" fill="white" />
          </motion.div>
        </div>
      )}

      {/* Pause button when playing */}
      {playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label="Pausar vídeo"
        />
      )}
    </motion.div>
  );
}

export function VideoTestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="depoimentos"
      className="section-pad relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f7fefe 0%, #eaf6f6 100%)" }}
    >
      {/* Blob */}
      <div
        className="absolute right-[-60px] top-[-60px] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(65,193,187,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p
            className="text-xs font-body font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: "#41c1bb" }}
          >
            Depoimentos em Vídeo
          </p>
          <h2
            className="font-heading font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1a2f38" }}
          >
            Ouça quem já
            <br />
            <em className="not-italic" style={{ color: "#375c6d" }}>
              transformou o sorriso
            </em>
          </h2>
          <span className="divider-teal mx-auto block" />
          <p className="font-body text-slate-500 mt-5 max-w-lg mx-auto text-sm leading-relaxed">
            Nada melhor do que ouvir diretamente de quem viveu a experiência.
          </p>
        </motion.div>

        {/* Vídeos */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {videos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
