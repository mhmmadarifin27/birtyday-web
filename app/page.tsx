"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Delete, ArrowRight, Play, Pause, Heart, Sparkles, MailOpen } from "lucide-react";

export default function BirthdayApp() {
  const [step, setStep] = useState(1);

  // === KONFIGURASI ===
  const CORRECT_PIN = "1404"; // Ganti tanggal jadian (1404 = 14 April)
  const SURAT_PANJANG = `Teruntuk Sayangku,

Setiap tahun kamu tumbuh menjadi versi dirimu yang lebih luar biasa. Rasanya baru kemarin kita mulai cerita ini, tapi sekarang aku nggak bisa bayangin duniaku tanpa kamu.

Makasih ya udah selalu sabar, selalu bikin aku ketawa, dan jadi tempat paling nyaman buat pulang. Selamat ulang tahun, cintaku. Semoga semua doa baikmu dikabulkan semesta. 

I love you, more than words can say. ❤️`;

  const MEMORIES = [
    {
      img: "https://images.unsplash.com/photo-1606248981267-336c2f3d5fb2?q=80&w=600&auto=format&fit=crop",
      text: "You deserve all the love in the world today and always. Happy birthday, my boy! 🤍",
    },
    {
      img: "https://images.unsplash.com/photo-1518199266791-5375a83164ba?q=80&w=600&auto=format&fit=crop",
      text: "Every year, you grow wiser, kinder, and even more amazing.",
    },
    {
      img: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop",
      text: "I swear every time we take a photo together, I end up liking you even more.",
    }
  ];
  // === AKHIR KONFIGURASI ===

  // Audio Refs
  const bgmRef = useRef<HTMLAudioElement>(null);
  const vnRef = useRef<HTMLAudioElement>(null);
  const [isVnPlaying, setIsVnPlaying] = useState(false);

  // States
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Handle Play BGM (Dimulai di Screen 1)
  const startExperience = () => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.5; // Volume normal BGM 50%
      bgmRef.current.play().catch(e => console.log("Autoplay blocked"));
    }
    setStep(2);
  };

  // Handle Voice Note Toggle
  const toggleVN = () => {
    if (!vnRef.current || !bgmRef.current) return;

    if (isVnPlaying) {
      vnRef.current.pause();
      bgmRef.current.volume = 0.5; // BGM kembali normal
      setIsVnPlaying(false);
    } else {
      vnRef.current.play();
      bgmRef.current.volume = 0.1; // BGM mengecil jadi 10% (Ducking)
      setIsVnPlaying(true);
    }
  };

  // Numpad Logic
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 font-sans p-4 sm:p-0">
      
      {/* Audio Elements (Hidden) */}
      <audio ref={bgmRef} src="/bgm.mp3" loop />
      <audio ref={vnRef} src="/vn.mp3" onEnded={() => {
        setIsVnPlaying(false);
        if (bgmRef.current) bgmRef.current.volume = 0.5; // Kembalikan BGM setelah VN tamat
      }} />

      {/* Container Layar HP */}
      <div className="relative w-full max-w-md h-[100dvh] sm:h-[850px] sm:max-h-[90vh] bg-[#FFF5F8] sm:rounded-[40px] sm:shadow-2xl overflow-hidden border-4 border-white flex flex-col shadow-pink-200">
        
        <AnimatePresence mode="wait">
          
          {/* SCREEN 1: INTRO */}
          {step === 1 && (
            <motion.div key="intro" exit={{ opacity: 0, y: -50 }} className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#FFF5F8] z-10">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Heart className="w-24 h-24 text-pink-400 mb-8 fill-pink-300" />
              </motion.div>
              <h1 className="text-4xl font-serif text-pink-900 font-bold mb-4">Happy Birthday<br/>My Love!</h1>
              <p className="text-pink-600 mb-12">Siapkan earphone / aktifkan suara HP kamu ya. ❤️</p>
              
              <button onClick={startExperience} className="w-full bg-pink-500 text-white py-4 rounded-full font-bold shadow-lg hover:bg-pink-600 transition-all active:scale-95">
                Mulai Kejutan ✨
              </button>
            </motion.div>
          )}

          {/* SCREEN 2: PIN LOCK */}
          {step === 2 && (
            <motion.div key="pin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center p-6 pt-16 bg-[#FFF5F8] z-10">
              <Lock className="w-8 h-8 text-pink-400 mb-4" />
              <h2 className="text-2xl font-bold text-pink-900 mb-2">Tanggal Jadian Kita?</h2>
              
              <motion.div animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}} className="flex gap-4 mb-12 mt-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-full transition-all duration-300 ${i < pin.length ? 'bg-pink-500 scale-125' : 'bg-pink-200'}`} />
                ))}
              </motion.div>

              <div className="grid grid-cols-3 gap-4 w-full max-w-[260px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"].map((num, i) => (
                  <button key={i} onClick={() => handleKeypad(num)} disabled={num === ""} className={`h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-pink-900 ${num !== "" ? 'hover:bg-pink-100 bg-white shadow-sm' : ''}`}>
                    {num === "del" ? <Delete className="w-6 h-6 text-pink-500" /> : num}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* SCREEN 3: STORY TIMELINE (SCROLL BANYAK FOTO) */}
          {step === 3 && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -100 }} className="absolute inset-0 flex flex-col bg-[#FFF5F8] z-10 overflow-hidden">
              <div className="flex-1 overflow-y-auto no-scrollbar pb-32 pt-8 px-6">
                
                {MEMORIES.map((item, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                    key={idx} className="mb-12"
                  >
                    <div className="bg-white p-3 rounded-2xl shadow-md rotate-[-1deg] border border-pink-50">
                      <img src={item.img} alt="memory" className="w-full h-auto aspect-square object-cover rounded-xl mb-4" />
                      <p className="text-center font-serif text-pink-950 font-medium px-2 leading-relaxed">"{item.text}"</p>
                    </div>
                  </motion.div>
                ))}

                {/* Bagian Voice Note & Lanjut Surat */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-8 bg-white p-6 rounded-3xl shadow-sm border border-pink-100 text-center">
                  <p className="text-pink-800 font-medium mb-4">I have something to say...</p>
                  <button onClick={toggleVN} className="mx-auto flex items-center justify-center gap-3 bg-pink-100 text-pink-700 px-6 py-3 rounded-full font-bold hover:bg-pink-200 transition-all mb-6 active:scale-95">
                    {isVnPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                    {isVnPlaying ? "Jeda Voice Note" : "Play Voice Note 🎧"}
                  </button>

                  <div className="w-full h-[1px] bg-pink-100 my-6"></div>

                  <p className="text-sm text-pink-500 mb-4">Masih ada satu lagi di bawah ini 👇</p>
                  <button onClick={() => setStep(4)} className="w-full flex justify-center items-center gap-2 bg-pink-500 text-white py-4 rounded-full font-bold shadow-lg hover:bg-pink-600 active:scale-95">
                    Buka Surat Spesial <MailOpen className="w-5 h-5" />
                  </button>
                </motion.div>

              </div>
            </motion.div>
          )}

          {/* SCREEN 4: DIGITAL LETTER (ESTETIK CREAM & PINK) */}
          {step === 4 && (
            <motion.div key="letter" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 bg-[#FFF5F8] p-6 flex flex-col items-center justify-center z-10">
              
              <div className="relative w-full max-w-[320px] aspect-[3/4] perspective-1000">
                <motion.div 
                  animate={{ rotateX: isEnvelopeOpen ? 0 : 5 }} 
                  className="w-full h-full relative"
                >
                  {/* Desain Kartu / Surat */}
                  <div className="absolute inset-0 bg-[#FFFDF9] rounded-xl shadow-2xl overflow-hidden flex flex-col border border-pink-100">
                    {/* Hiasan Bunga/Pola di Header */}
                    <div className="h-12 w-full bg-pink-50 flex items-center justify-center border-b border-pink-100">
                      <Sparkles className="w-5 h-5 text-pink-300" />
                    </div>

                    {!isEnvelopeOpen ? (
                      // Tampilan Depan (Tertutup)
                      <div className="flex-1 flex flex-col items-center justify-center p-6 cursor-pointer group" onClick={() => setIsEnvelopeOpen(true)}>
                        <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-6">
                          <Heart className="w-8 h-8 text-white fill-white" />
                        </div>
                        <h3 className="font-serif text-xl text-pink-900 text-center">A Special Letter<br/>For You</h3>
                        <p className="text-xs text-pink-400 mt-8 uppercase tracking-widest animate-pulse">Tap to Open</p>
                      </div>
                    ) : (
                      // Tampilan Isi Surat (Terbuka)
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex-1 overflow-y-auto no-scrollbar p-6">
                        <p className="text-pink-950 font-serif leading-loose whitespace-pre-wrap text-[15px]">
                          {SURAT_PANJANG}
                        </p>
                        
                        <div className="mt-12 text-center">
                          <p className="font-serif text-pink-800 italic mb-2">With all my love,</p>
                          <p className="font-serif text-xl text-pink-950 font-bold">Your Boyfriend</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}