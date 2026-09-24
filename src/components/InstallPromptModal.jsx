import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, ShieldCheck, Sparkles } from 'lucide-react';

export default function InstallPromptModal() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone (installed) mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check if user dismissed previously in this session
    const dismissed = sessionStorage.getItem('jcrgm_install_dismissed');
    if (dismissed) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Standard Chromium beforeinstallprompt listener
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Auto-show prompt shortly after page load
      setTimeout(() => {
        setShowPrompt(true);
      }, 1500);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS or browsers without beforeinstallprompt, auto-prompt after 2 seconds
    const timer = setTimeout(() => {
      if (!isStandalone && !sessionStorage.getItem('jcrgm_install_dismissed')) {
        setShowPrompt(true);
      }
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('jcrgm_install_dismissed', 'true');
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#111b21] border border-gray-200 dark:border-gray-800 text-[#111b21] dark:text-[#e9edef] w-full max-w-md rounded-3xl p-5 shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Top Header Badge */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-[#008069] flex items-center justify-center text-white text-3xl shadow-md ring-2 ring-emerald-400/50">
            ✝
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-[#008069] dark:text-[#25d366] px-2 py-0.5 rounded-full">
                Official Church App
              </span>
            </div>
            <h3 className="font-bold text-base sm:text-lg leading-tight mt-0.5">
              The JCRGM Community
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Jesus Christ Reigns Gospel Ministry
            </p>
          </div>
        </div>

        {/* Explanation */}
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Install the official WhatsApp-style church fellowship app directly on your phone or PC. Enjoy fast access, full-screen sanctuary view, and instant prayer updates.
        </p>

        {/* Dynamic Action Area: iOS vs Android/Desktop */}
        {isIOS ? (
          <div className="bg-gray-50 dark:bg-[#202c33] p-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-xs space-y-2 mb-4">
            <div className="font-bold text-[#008069] dark:text-[#25d366] flex items-center gap-1.5">
              <Smartphone size={14} /> To install on iPhone / iPad:
            </div>
            <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-300">
              <li>Tap the <strong>Share</strong> button (box with upward arrow <span className="text-base leading-none">⎋</span>) at the bottom of Safari.</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
              <li>Tap <strong>Add</strong> in the top right corner.</li>
            </ol>
          </div>
        ) : (
          <div className="space-y-2.5 mb-4">
            <button
              onClick={handleInstallClick}
              className="w-full py-3 bg-[#008069] hover:bg-[#006e58] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Download size={18} />
              Install The JCRGM App
            </button>
            <div className="text-center text-[11px] text-gray-400">
              No App Store or Play Store account required • Instant & Free
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <ShieldCheck size={13} className="text-emerald-500" /> Safe & verified
          </span>
          <button
            onClick={handleDismiss}
            className="hover:underline text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-medium"
          >
            Continue in Browser
          </button>
        </div>

      </div>
    </div>
  );
}
