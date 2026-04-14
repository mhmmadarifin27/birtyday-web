"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Delete, Gift, ArrowRight, Flower, Sparkles, Play, Pause } from "lucide-react";

export default function BirthdayApp() {
  const [step, setStep] = useState(1);

  // === KONFIGURASI PRIBADI ===
  const CORRECT_PIN = "1404"; // GANTI TANGGAL JADIAN DI SINI 

  // Data Foto per Slide
  const MEMORIES = [
    {
      img: "https://images.unsplash.com/photo-1518199266791-5375a83164ba?q=80&w=600&auto=format&fit=crop",
      caption: "Hari pertama kita ketemu..."
    },
    {
      img: "https://images.unsplash.com/photo-1606248981267-336c2f3d5fb2?q=80&w=600&auto=format&fit=crop",
      caption: "Suka banget pas kita jalan bareng ke sini."
    },
    {
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop",
      caption: "I end up liking you even more every single day. ❤️"
    }
  ];

  const LONG_MESSAGE = `Teruntuk Sayangku,

Terima kasih sudah memilihku untuk menjadi bagian dari duniamu. Kamu adalah kado terindah yang pernah diberikan semesta kepadaku. Rasanya baru kemarin kita bertemu, tapi setiap hari bersamamu selalu terasa seperti petualangan yang baru. 

Aku berjanji akan selalu ada buat kamu. Selamat ulang tahun, sayang. Semoga bahagia selalu mengiringi setiap langkahmu. I love you! ❤️`;
  // === AKHIR KONFIGURASI ===

  // Audio Refs (BGM & VN)
  const bgmRef = useRef<HTMLAudioElement>(null);
  const vnRef = useRef<HTMLAudioElement>(null);
  const [isVnPlaying, setIsVnPlaying] = useState(false);

  // States
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  
  const [currentSlide, setCurrentSlide] = useState(0); // State untuk Slide Foto
  
  const [typedText, setTypedText] = useState("");
  const [showNext4, setShowNext4] = useState(false);
  
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isYesClicked, setIsYesClicked] = useState(false);

  // Handle Play BGM pas klik mulai
  const startExperience = () => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.4;
      bgmRef.current.play().catch(e => console.log("Audio blocked by browser"));
    }
    setStep(2);
  };

  // Handle Voice Note (VN)
  const toggleVN = () => {
    if (!vnRef.current || !bgmRef.current) return;
    if (isVnPlaying) {
      vnRef.current.pause();
      bgmRef.current.volume = 0.4; // Volume lagu kembali normal
      setIsVnPlaying(false);
    } else {
      vnRef.current.play();
      bgmRef.current.volume = 0.05; // Volume lagu mengecil (samar-samar) saat VN nyala
      setIsVnPlaying(true);
    }
  };

  // Fungsi Numpad
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

  // Typewriter Effect (Screen 4)
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100/50 font-sans p-4 sm:p-0">
      
      {/* Audio Tags */}
      <audio ref={bgmRef} src="/bgm.mp3" loop />
      <audio ref={vnRef} src="/vn.mp3" onEnded={() => {
        setIsVnPlaying(false);
        if (bgmRef.current) bgmRef.current.volume = 0.4;
      }} />

      <div className="relative w-full max-w-md h-[100dvh] sm:h-[850px] sm:max-h-[90vh] bg-[#FFF5F8] sm:rounded-[40px] sm:shadow-2xl overflow-hidden border-4 border-white flex flex-col">
        
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2720%27 height=%2720%27 viewBox=%270 0 20 20%27%3E%3Cpath fill=%27%23ffb8d4%27 fill-opacity=%271%27 d=%27M10 0 C 10 3 13 3 13 0 M20 0 C 17 3 17 10 20 10 M10 10 C 13 13 13 20 10 20 M0 20 C 3 17 10 17 0 10 Z%27 /%3E%3C/svg%3E')" }} />

        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: INTRO */}
          {step === 1 && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} className="relative z-10 absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <Flower className="absolute top-10 right-10 w-8 h-8 text-pink-300" />
              <Heart className="absolute bottom-10 left-10 w-6 h-6 text-pink-300" />

              <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="mb-10">
                <div className="w-40 h-40 bg-pink-200 rounded-full flex items-center justify-center shadow-lg relative">
                  <Gift className="w-20 h-20 text-pink-600" />
                  <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-pink-400" />
                </div>
              </motion.div>
              <h1 className="text-4xl font-serif text-pink-900 font-bold mb-4">Happy Birthday<br/>My Love!</h1>
              <p className="text-pink-700 mb-12 max-w-sm">Sebuah perayaan kecil untuk kebahagiaan terbesar dalam hidupku: Kamu. ❤️</p>
              
              <button onClick={startExperience} className="w-full bg-pink-500 text-white py-4 rounded-full font-semibold shadow-lg shadow-pink-500/40 hover:bg-pink-600 active:scale-95 transition-all">
                Siap untuk kejutan selanjutnya?
              </button>
            </motion.div>
          )}

          {/* SCREEN 2: PIN LOCK */}
          {step === 2 && (
            <motion.div key="pin" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="relative z-10 absolute inset-0 flex flex-col items-center p-6 pt-10 overflow-y-auto no-scrollbar pb-10">
              <Lock className="w-8 h-8 text-pink-500 mb-3 flex-shrink-0" />
              <h2 className="text-2xl font-semibold text-pink-900 mb-2 flex-shrink-0">Masukkan Tanggal Jadian ❤️</h2>
              <p className="text-sm text-pink-600 mb-8 max-w-[250px] text-center flex-shrink-0">Sebuah momen kecil yang merubah segalanya.</p>

              <motion.div animate={isError ? { x: [-12, 12, -12, 12, 0] } : {}} transition={{ duration: 0.5 }} className="flex gap-4 mb-8 flex-shrink-0">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-full transition-all duration-300 ${i < pin.length ? 'bg-pink-500 scale-125' : 'bg-pink-100'}`} />
                ))}
              </motion.div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-[280px] pb-10">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"].map((num, i) => (
                  <button key={i} onClick={() => handleKeypad(num)} disabled={num === ""} className={`h-16 sm:h-20 rounded-xl flex items-center justify-center text-3xl font-semibold text-pink-900 transition-all ${num !== "" ? 'hover:bg-pink-100 active:bg-pink-200 bg-pink-100/50 shadow-sm' : 'bg-transparent'}`}>
                    {num === "del" ? <Delete className="w-8 h-8" /> : num}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: SLIDESHOW FOTO */}
          {step === 3 && (
            <motion.div key="slideshow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -50 }} className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10 bg-[#FFF5F8]">
              <p className="text-pink-400 font-medium mb-8 text-sm uppercase tracking-widest">Our Memories {currentSlide + 1}/{MEMORIES.length}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, rotate: -2 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-4 pb-12 rounded-xl shadow-xl border border-pink-100 relative w-full max-w-[280px]"
                >
                  <Flower className="absolute -top-3 -right-3 w-8 h-8 text-pink-300" />
                  <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4 relative shadow-inner">
                    <img src={MEMORIES[currentSlide].img} alt="Memory" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-center font-serif text-gray-700 italic">{MEMORIES[currentSlide].caption}</p>
                </motion.div>
              </AnimatePresence>

              <button 
                onClick={() => {
                  if (currentSlide < MEMORIES.length - 1) {
                    setCurrentSlide(prev => prev + 1);
                  } else {
                    setStep(4);
                  }
                }} 
                className="mt-12 bg-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-pink-500/30 hover:bg-pink-600 active:scale-95 flex items-center gap-2"
              >
                {currentSlide < MEMORIES.length - 1 ? 'Foto Selanjutnya ➔' : 'Ada Pesan Buatmu 💌'}
              </button>
            </motion.div>
          )}

          {/* SCREEN 4: TYPEWRITER & VOICE NOTE */}
          {step === 4 && (
            <motion.div key="typewriter" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -50 }} className="absolute inset-0 flex flex-col p-6 pt-12 overflow-hidden z-10 bg-[#FFF5F8]">
              <div className="flex-1 overflow-y-auto no-scrollbar pb-20"> 
                
                <div className="bg-[#FFF9E6] rounded-2xl p-6 shadow-xl border border-pink-100 relative mt-4">
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-700 rounded-tl-lg" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-700 rounded-br-lg" />
                  <Flower className="absolute top-2 right-2 w-6 h-6 text-red-200" />

                  <h3 className="text-xl font-serif text-red-950 mb-5 italic border-b-2 border-dashed border-red-200 pb-2">Teruntuk Sayangku,</h3>
                  
                  <p className="text-fuchsia-950 font-serif leading-relaxed whitespace-pre-wrap">
                    {typedText}
                    <span className="animate-pulse text-red-800">|</span>
                  </p>

                  {/* Tombol Play VN muncul setelah ngetik selesai */}
                  <AnimatePresence>
                    {showNext4 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 border-t border-red-100 pt-6">
                        <p className="text-red-900/60 text-sm text-center mb-3">Dengerin ini ya...</p>
                        <button onClick={toggleVN} className="mx-auto flex items-center justify-center gap-3 bg-red-100 text-red-700 px-6 py-3 rounded-full font-bold hover:bg-red-200 transition-all active:scale-95 shadow-sm">
                          {isVnPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                          {isVnPlaying ? "Jeda Voice Note" : "Play Voice Note 🎧"}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence>
                {showNext4 && (
                  <motion.div key="footer-step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pt-6 pb-2">
                    <motion.button animate={{ scale: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} onClick={() => setStep(5)} className="mx-auto flex items-center justify-center gap-3 bg-pink-500 text-white w-full py-4 rounded-full font-semibold shadow-lg hover:bg-pink-600 active:scale-95">
                      Buka Amplop Spesial <Gift className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* SCREEN 5: INTERACTIVE ENVELOPE */}
          {step === 5 && (
            <motion.div key="envelope" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 p-4 z-10" style={{ perspective: "1000px" }}>
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