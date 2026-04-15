"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Delete, Gift, ArrowRight, ArrowLeft, Flower, Sparkles, Play, Pause, Camera, Stars, Music } from "lucide-react";

export default function BirthdayApp() {
  const [step, setStep] = useState(1);

  // === KONFIGURASI PRIBADI ===
  const CORRECT_PIN = "1404"; 

  // Data 5 Foto & Keterangannya 
  const MEMORIES = [
    {
      img: "https://images.unsplash.com/photo-1518199266791-5375a83164ba?q=80&w=600&auto=format&fit=crop",
      caption: "Hari pertama kita ketemu...",
      style: "polaroid-right" 
    },
    {
      img: "https://images.unsplash.com/photo-1606248981267-336c2f3d5fb2?q=80&w=600&auto=format&fit=crop",
      caption: "Momen yang nggak bakal aku lupain.",
      style: "film-strip" 
    },
    {
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop",
      caption: "I end up liking you even more everyday.",
      style: "circle-elegant" 
    },
    {
      img: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=600&auto=format&fit=crop",
      caption: "Dunia serasa milik berdua ya? 🤭",
      style: "polaroid-left" 
    },
    {
      img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
      caption: "And many more to come! ❤️",
      style: "thick-frame" 
    }
  ];

  const LONG_MESSAGE = `Teruntuk Sayangku,

Terima kasih sudah memilihku untuk menjadi bagian dari duniamu. Kamu adalah kado terindah yang pernah diberikan semesta kepadaku. Rasanya baru kemarin kita bertemu, tapi setiap hari bersamamu selalu terasa seperti petualangan yang baru. 

Aku berjanji akan selalu ada buat kamu. Selamat ulang tahun, sayang. Semoga bahagia selalu mengiringi setiap langkahmu. I love you! ❤️`;
  // === AKHIR KONFIGURASI ===

  const bgmRef = useRef<HTMLAudioElement>(null);
  const vnRef = useRef<HTMLAudioElement>(null);
  const [isVnPlaying, setIsVnPlaying] = useState(false);

  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [typedText, setTypedText] = useState("");
  const [showNext4, setShowNext4] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isYesClicked, setIsYesClicked] = useState(false);

  const startExperience = () => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.5; // Normal volume
      bgmRef.current.play().catch(e => console.log("Audio blocked by browser"));
    }
    setStep(2);
  };

  // FIX AUDIO UNTUK iPHONE (Di-pause sepenuhnya bukan dikecilkan)
  const toggleVN = () => {
    if (!vnRef.current || !bgmRef.current) return;
    if (isVnPlaying) {
      vnRef.current.pause();
      bgmRef.current.play(); // Lanjut putar lagu BGM
      setIsVnPlaying(false);
    } else {
      bgmRef.current.pause(); // Pause BGM biar suara VN jelas di iOS
      vnRef.current.play();
      setIsVnPlaying(true);
    }
  };

  const handleKeypad = (num: string | number) => {
    if (num === "del") {
      setPin((prev) => prev.slice(0, -1));
      setIsError(false);
    } else if (pin.length < 4 && num !== "") {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          setTimeout(() => setStep(3), 500);
        } else {
          setIsError(true);
          setTimeout(() => { setPin(""); setIsError(false); }, 800);
        }
      }
    }
  };

  useEffect(() => {
    if (step === 4) {
      let i = 0;
      setTypedText(""); 
      const typing = setInterval(() => {
        setTypedText(LONG_MESSAGE.slice(0, i));
        i++;
        if (i > LONG_MESSAGE.length) {
          clearInterval(typing);
          setShowNext4(true);
        }
      }, 40); 
      return () => clearInterval(typing);
    }
  }, [step]);

  const FloatingBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        >
          {i % 2 === 0 ? <Heart className="text-pink-200 w-6 h-6 fill-pink-100" /> : <Stars className="text-pink-300 w-5 h-5" />}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100/60 font-sans p-4 sm:p-0">
      
      <audio ref={bgmRef} src="/bgm.mp3" loop />
      <audio ref={vnRef} src="/vn.mp3" onEnded={() => {
        setIsVnPlaying(false);
        if (bgmRef.current) bgmRef.current.play(); // Lanjut putar BGM otomatis pas VN habis
      }} />

      <div className="relative w-full max-w-md h-[100dvh] sm:h-[850px] sm:max-h-[90vh] bg-[#FFF5F8] sm:rounded-[40px] sm:shadow-[0_20px_50px_rgba(244,114,182,0.2)] overflow-hidden border-4 border-white flex flex-col z-10">
        
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2720%27 height=%2720%27 viewBox=%270 0 20 20%27%3E%3Cpath fill=%27%23ffb8d4%27 fill-opacity=%271%27 d=%27M10 0 C 10 3 13 3 13 0 M20 0 C 17 3 17 10 20 10 M10 10 C 13 13 13 20 10 20 M0 20 C 3 17 10 17 0 10 Z%27 /%3E%3C/svg%3E')]" />
        
        <FloatingBackground />

        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: INTRO */}
          {step === 1 && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} className="relative z-10 absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <motion.div animate={{ y: [0, -15, 0], scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="mb-10 relative">
                <div className="w-40 h-40 bg-gradient-to-tr from-pink-200 to-pink-100 rounded-[2rem] rotate-3 flex items-center justify-center shadow-xl border-4 border-white relative z-10">
                  <Gift className="w-20 h-20 text-pink-500 drop-shadow-sm" />
                </div>
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center shadow-sm z-20 animate-bounce">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center shadow-sm z-0">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
              </motion.div>
              
              <h1 className="text-4xl font-serif text-pink-950 font-extrabold mb-3 leading-tight tracking-tight">Happy Birthday<br/><span className="text-pink-600">My Love!</span></h1>
              <p className="text-pink-700/80 mb-12 text-sm max-w-xs font-medium px-4">Sebuah perayaan kecil untuk kebahagiaan terbesar dalam hidupku: Kamu. ❤️</p>
              
              <button onClick={startExperience} className="w-full max-w-[280px] bg-gradient-to-r from-pink-500 to-pink-400 text-white py-4 rounded-full font-bold shadow-[0_8px_20px_rgba(236,72,153,0.3)] hover:scale-105 active:scale-95 transition-all flex justify-center items-center gap-2">
                <Music className="w-5 h-5" /> Mulai Kejutan
              </button>
            </motion.div>
          )}

          {/* SCREEN 2: PIN LOCK */}
          {step === 2 && (
            <motion.div key="pin" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: 50 }} className="relative z-10 absolute inset-0 flex flex-col items-center p-6 pt-12 overflow-y-auto no-scrollbar pb-10">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Lock className="w-7 h-7 text-pink-500" />
              </div>
              <h2 className="text-2xl font-bold text-pink-950 mb-2 text-center">Tanggal Jadian Kita?</h2>
              <p className="text-sm text-pink-500 mb-8 max-w-[250px] text-center font-medium">Sebuah momen kecil yang merubah duniaku.</p>

              <motion.div animate={isError ? { x: [-12, 12, -12, 12, 0] } : {}} transition={{ duration: 0.4 }} className="flex gap-5 mb-10">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-full transition-all duration-300 shadow-inner ${i < pin.length ? 'bg-pink-500 scale-125 shadow-pink-300/50' : 'bg-pink-200'}`} />
                ))}
              </motion.div>

              <div className="grid grid-cols-3 gap-5 sm:gap-6 w-full max-w-[280px] pb-10">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"].map((num, i) => (
                  <button key={i} onClick={() => handleKeypad(num)} disabled={num === ""} className={`h-16 rounded-[1.25rem] flex items-center justify-center text-3xl font-bold text-pink-900 transition-all ${num !== "" ? 'hover:bg-pink-100 active:bg-pink-200 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03)]' : 'bg-transparent'}`}>
                    {num === "del" ? <Delete className="w-7 h-7 text-pink-400" /> : num}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: SLIDESHOW (PERBAIKAN LAYOUT TENGAH & TOMBOL KEMBALI) */}
          {step === 3 && (
            <motion.div key="slideshow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -50 }} className="relative z-10 absolute inset-0 flex flex-col p-6">
              
              {/* Header */}
              <div className="w-full flex justify-between items-center mt-2">
                <span className="text-pink-500 font-bold text-xs uppercase tracking-widest bg-white/80 px-4 py-2 rounded-full shadow-sm backdrop-blur-md">
                  Memory {currentSlide + 1} / {MEMORIES.length}
                </span>
                <Camera className="w-6 h-6 text-pink-400" />
              </div>

              {/* Area Frame Foto (Auto-Center pakai flex-1) */}
              <div className="flex-1 flex justify-center items-center w-full relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    className="w-full flex justify-center items-center"
                  >
                    {/* STYLE 1: Polaroid Miring Kanan */}
                    {MEMORIES[currentSlide].style === "polaroid-right" && (
                      <div className="bg-white p-4 pb-12 rounded-lg shadow-xl rotate-3 relative w-full max-w-[280px]">
                        <div className="w-full aspect-square bg-gray-100 mb-4 overflow-hidden"><img src={MEMORIES[currentSlide].img} className="w-full h-full object-cover" alt="Memory"/></div>
                        <p className="text-center font-serif text-gray-700 italic">{MEMORIES[currentSlide].caption}</p>
                      </div>
                    )}

                    {/* STYLE 2: Film Strip */}
                    {MEMORIES[currentSlide].style === "film-strip" && (
                      <div className="bg-zinc-900 p-3 rounded-md shadow-2xl rotate-[-1deg] relative w-full max-w-[300px]">
                        <div className="flex justify-between px-1 mb-2">
                           {[...Array(6)].map((_,i)=><div key={i} className="w-3 h-2 bg-[#FFF5F8] rounded-sm"/>)}
                        </div>
                        <div className="w-full aspect-[4/3] bg-black overflow-hidden border border-zinc-700"><img src={MEMORIES[currentSlide].img} className="w-full h-full object-cover opacity-90" alt="Memory"/></div>
                        <div className="flex justify-between px-1 mt-2 mb-3">
                           {[...Array(6)].map((_,i)=><div key={i} className="w-3 h-2 bg-[#FFF5F8] rounded-sm"/>)}
                        </div>
                        <p className="text-center font-mono text-zinc-300 text-sm">{MEMORIES[currentSlide].caption}</p>
                      </div>
                    )}

                    {/* STYLE 3: Circle Elegant */}
                    {MEMORIES[currentSlide].style === "circle-elegant" && (
                      <div className="bg-pink-100 p-3 rounded-full shadow-[0_10px_30px_rgba(244,114,182,0.3)] relative w-[280px] h-[280px] flex items-center justify-center border-4 border-white mt-8">
                        <Flower className="absolute -top-4 -right-4 w-12 h-12 text-pink-400 drop-shadow-md z-10" />
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-pink-200">
                          <img src={MEMORIES[currentSlide].img} className="w-full h-full object-cover" alt="Memory"/>
                        </div>
                        <div className="absolute -bottom-8 bg-white px-6 py-2 rounded-full shadow-md text-center w-max max-w-[280px]">
                          <p className="font-serif text-pink-800 italic text-sm">{MEMORIES[currentSlide].caption}</p>
                        </div>
                      </div>
                    )}

                    {/* STYLE 4: Polaroid Miring Kiri */}
                    {MEMORIES[currentSlide].style === "polaroid-left" && (
                      <div className="bg-[#FAF8F5] p-4 pb-10 rounded-sm shadow-xl rotate-[-3deg] relative w-full max-w-[270px]">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-pink-300/60 backdrop-blur-sm rotate-[-2deg] shadow-sm" />
                        <div className="w-full aspect-square bg-gray-200 mb-4 overflow-hidden border border-gray-100"><img src={MEMORIES[currentSlide].img} className="w-full h-full object-cover" alt="Memory"/></div>
                        <p className="text-center font-serif text-pink-900">{MEMORIES[currentSlide].caption}</p>
                      </div>
                    )}

                    {/* STYLE 5: Bingkai Tebal */}
                    {MEMORIES[currentSlide].style === "thick-frame" && (
                      <div className="bg-white border-[10px] border-pink-200 p-2 rounded-3xl shadow-lg relative w-full max-w-[290px]">
                        <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-2xl mb-4"><img src={MEMORIES[currentSlide].img} className="w-full h-full object-cover" alt="Memory"/></div>
                        <p className="text-center font-sans font-bold text-pink-700 text-sm uppercase tracking-wider">{MEMORIES[currentSlide].caption}</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tanda / Indikator Bawah & Tombol Navigasi */}
              <div className="flex flex-col items-center gap-5 mb-4">
                
                {/* Dots Indicator */}
                <div className="flex gap-2 mb-2">
                  {MEMORIES.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-pink-500' : 'w-2 bg-pink-200'}`} />
                  ))}
                </div>

                {/* Tombol Navigasi (Kembali & Lanjut) */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                    className={`bg-white/60 backdrop-blur-sm border border-pink-200 text-pink-700 p-3 rounded-full shadow-sm hover:bg-pink-100 active:scale-95 transition-all ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={() => {
                      if (currentSlide < MEMORIES.length - 1) setCurrentSlide(prev => prev + 1);
                      else setStep(4);
                    }} 
                    className="bg-white/60 backdrop-blur-sm border border-pink-200 text-pink-700 px-6 py-3 rounded-full font-medium text-sm shadow-sm hover:bg-pink-100 active:scale-95 flex items-center justify-center gap-2 transition-all w-[180px]"
                  >
                    {currentSlide < MEMORIES.length - 1 ? 'Ketuk untuk lanjut ➔' : 'Buka Pesan 💌'}
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {/* SCREEN 4: TYPEWRITER & VOICE NOTE */}
          {step === 4 && (
            <motion.div key="typewriter" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -50 }} className="relative z-10 absolute inset-0 flex flex-col p-6 pt-10 overflow-hidden">
              <div className="flex-1 overflow-y-auto no-scrollbar pb-20"> 
                
                <div className="bg-[#FFF9E6] rounded-3xl p-7 shadow-xl border border-pink-100 relative mt-4">
                  <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-red-800 rounded-tl-xl" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-red-800 rounded-br-xl" />
                  <Heart className="absolute top-4 right-4 w-6 h-6 text-red-200 fill-red-100" />

                  <h3 className="text-2xl font-serif text-red-950 mb-6 italic border-b-2 border-dashed border-red-200 pb-3">Teruntuk Sayangku,</h3>
                  
                  <p className="text-fuchsia-950 font-serif leading-loose whitespace-pre-wrap text-[15px]">
                    {typedText}
                    <span className="animate-pulse text-red-800">|</span>
                  </p>

                  <AnimatePresence>
                    {showNext4 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10 bg-white/50 rounded-2xl p-4 border border-red-100 text-center">
                        <p className="text-red-900/80 text-sm font-medium mb-3">Play this note 🎧</p>
                        <button onClick={toggleVN} className="mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-red-200 to-pink-200 text-red-800 px-6 py-3 rounded-full font-bold hover:scale-105 transition-all active:scale-95 shadow-md border border-white">
                          {isVnPlaying ? <Pause className="w-5 h-5 fill-current text-red-600" /> : <Play className="w-5 h-5 fill-current text-red-600" />}
                          {isVnPlaying ? "Jeda Voice Note" : "Dengarkan Suaraku"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence>
                {showNext4 && (
                  <motion.div key="footer-step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-6 pb-2">
                    <motion.button animate={{ scale: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} onClick={() => setStep(5)} className="mx-auto flex items-center justify-center gap-3 bg-pink-500 text-white w-full py-4 rounded-full font-bold shadow-lg hover:bg-pink-600 active:scale-95">
                      Buka Amplop Spesial <Gift className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* SCREEN 5: INTERACTIVE ENVELOPE */}
          {step === 5 && (
            <motion.div key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 p-4 z-20" style={{ perspective: "1000px" }}>
              <motion.div animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.8, type: "spring", stiffness: 60 }} className="relative w-full h-[85%] max-h-[700px] transform-style-3d" style={{ transformStyle: "preserve-3d" }}>
                
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl" style={{ backfaceVisibility: "hidden" }}>
                  {!isEnvelopeOpen ? (
                    <div className="w-full h-full bg-red-700 flex items-center justify-center relative cursor-pointer group" onClick={() => setIsEnvelopeOpen(true)}>
                      <div className="absolute top-0 w-full h-1/2 bg-red-800" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
                      <div className="relative z-10 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Heart className="text-yellow-100 w-12 h-12 fill-current" />
                        <span className="absolute -bottom-9 text-white/80 text-sm tracking-widest uppercase font-semibold">Tap to Open</span>
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full h-full bg-[#FFF9E6] p-8 flex flex-col justify-between border-[12px] border-red-700">
                      <div>
                        <Flower className="w-10 h-10 text-red-200 mb-6 mx-auto"/>
                        <h3 className="text-2xl font-serif text-red-900 mb-7 italic border-b border-red-200 pb-3 text-center">Kejutan Terakhir,</h3>
                        <p className="text-red-950 font-serif leading-relaxed text-center">
                          Aku punya satu kejutan terakhir buat kamu di balik surat ini. <br/><br/>
                          Jangan berhenti tersenyum hari ini ya, sayang! ❤️
                        </p>
                      </div>
                      <button onClick={() => setIsFlipped(true)} className="self-center bg-red-700 text-white px-8 py-4 rounded-full tracking-wider uppercase font-semibold shadow-xl hover:bg-red-800 transition-colors">
                        Flip for Surprise
                      </button>
                    </motion.div>
                  )}
                </div>

                <div className="absolute inset-0 bg-[#FFF9E6] rounded-2xl border-[12px] border-red-700 shadow-2xl p-8 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                    <Heart className="text-red-300 w-20 h-20 mb-8 fill-current" />
                  </motion.div>
                  <h2 className="text-2xl font-serif text-red-900 mb-12 italic leading-relaxed">Will you be my Date for today's special? 🥺</h2>
                  
                  {!isYesClicked ? (
                    <div className="w-full space-y-4 max-w-[280px]">
                      <button onClick={() => setIsYesClicked(true)} className="w-full bg-red-700 text-white py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:bg-red-800 transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                        YES
                      </button>
                      <button className="w-full border-2 border-gray-300 text-gray-400 py-4 rounded-xl flex items-center justify-center gap-3 cursor-not-allowed">
                        <div className="w-5 h-5 rounded-sm border-2 border-gray-300" />
                        NO
                      </button>
                    </div>
                  ) : (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mt-6">
                      <Sparkles className="w-10 h-10 text-red-400 mx-auto mb-4"/>
                      <h3 className="text-2xl font-bold text-red-600 mb-5">Yay! I love you! ❤️</h3>
                      <button onClick={() => { setStep(1); setPin(""); setIsEnvelopeOpen(false); setIsFlipped(false); setIsYesClicked(false); setCurrentSlide(0); }} className="text-sm text-red-500 underline underline-offset-4">
                        Kembali ke Awal
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}