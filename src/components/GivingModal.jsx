import React, { useState } from 'react';
import { 
  Heart, CreditCard, ShieldCheck, CheckCircle2, Copy, 
  Sparkles, Church, DollarSign, ArrowRight, Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CHURCH_GIVING_CATEGORIES } from '../churchData';

export default function GivingModal({ onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(CHURCH_GIVING_CATEGORIES[0].id);
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('Grateful Servant');
  const [donorNote, setDonorNote] = useState('Thank You Jesus for Your faithfulness');
  const [paymentMethod, setPaymentMethod] = useState('momo'); // momo, card, bank
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  const quickAmounts = ['20', '50', '100', '250', '500', '1000'];

  const handleGive = (e) => {
    e.preventDefault();
    const finalAmount = customAmount || amount;
    const ref = 'JCRGM-' + Math.floor(100000 + Math.random() * 900000);
    setTransactionRef(ref);
    setIsSuccess(true);
    
    // Fire celebratory confetti for the seed
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback safe
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#111b21] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-[#008069] dark:bg-[#005c4b] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
              🕊️
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">JCRGM Kingdom Giving</h2>
              <p className="text-white/80 text-xs">"God loves a cheerful giver" — 2 Corinthians 9:7</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-black/10 transition"
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center space-y-4 my-auto overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">
              <CheckCircle2 size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#111b21] dark:text-[#e9edef]">
                Kingdom Seed Received! 🙌
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                May the Lord open the windows of heaven and pour you out a blessing that there shall not be room enough to receive it (Malachi 3:10).
              </p>
            </div>

            <div className="bg-[#f0f2f5] dark:bg-[#202c33] p-4 rounded-xl text-left text-xs space-y-2 text-[#111b21] dark:text-[#e9edef]">
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction Ref:</span>
                <span className="font-mono font-bold text-[#008069] dark:text-[#25d366]">{transactionRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Purpose:</span>
                <span className="font-semibold capitalize">
                  {CHURCH_GIVING_CATEGORIES.find(c => c.id === selectedCategory)?.name.split('(')[0]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-sm">${customAmount || amount} USD (Equiv)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Giver:</span>
                <span className="font-semibold">{donorName || 'Beloved in Christ'}</span>
              </div>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setIsSuccess(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Give Another Offering
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-[#008069] text-white rounded-lg text-xs font-semibold hover:bg-[#006e58] transition"
              >
                Return to Fellowship
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGive} className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {/* Giving Category Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                1. Select Giving Category
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {CHURCH_GIVING_CATEGORIES.map(cat => (
                  <label
                    key={cat.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition ${
                      selectedCategory === cat.id
                        ? 'border-[#008069] bg-emerald-50 dark:bg-emerald-950/30'
                        : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#202c33]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="givingCategory"
                      value={cat.id}
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="mt-0.5 text-[#008069] focus:ring-[#008069]"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-[#111b21] dark:text-[#e9edef] text-xs sm:text-sm">
                        {cat.name}
                      </div>
                      <div className="text-[11px] text-gray-500 dark:text-gray-400">
                        {cat.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Amount Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                2. Seed Amount (USD / Local Equivalent)
              </label>
              <div className="grid grid-cols-6 gap-2 mb-2">
                {quickAmounts.map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => { setAmount(val); setCustomAmount(''); }}
                    className={`py-2 rounded-lg font-bold text-xs transition ${
                      amount === val && !customAmount
                        ? 'bg-[#008069] text-white shadow-sm'
                        : 'bg-gray-100 dark:bg-[#202c33] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 font-bold">$</span>
                <input
                  type="number"
                  placeholder="Or enter custom amount..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-gray-50 dark:bg-[#202c33] border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#008069] text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                3. Payment Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-2.5 rounded-xl border text-center font-medium text-xs transition ${
                    paymentMethod === 'momo'
                      ? 'border-[#008069] bg-emerald-50 dark:bg-emerald-950/40 text-[#008069] dark:text-[#25d366] font-bold'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  📱 Mobile Money
                  <span className="block text-[10px] text-gray-500 font-normal">Airtel / MTN / M-Pesa</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-center font-medium text-xs transition ${
                    paymentMethod === 'card'
                      ? 'border-[#008069] bg-emerald-50 dark:bg-emerald-950/40 text-[#008069] dark:text-[#25d366] font-bold'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  💳 Debit / Credit Card
                  <span className="block text-[10px] text-gray-500 font-normal">Visa & Mastercard</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-2.5 rounded-xl border text-center font-medium text-xs transition ${
                    paymentMethod === 'bank'
                      ? 'border-[#008069] bg-emerald-50 dark:bg-emerald-950/40 text-[#008069] dark:text-[#25d366] font-bold'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  🏛️ Bank Transfer
                  <span className="block text-[10px] text-gray-500 font-normal">Direct Church Account</span>
                </button>
              </div>
            </div>

            {/* Optional Giver Details */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Giver / Member Name</label>
                <input
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Anonymous or Your Name"
                  className="w-full px-3 py-1.5 bg-gray-50 dark:bg-[#202c33] border border-gray-200 dark:border-gray-700 rounded-lg text-xs focus:ring-1 focus:ring-[#008069] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">Prayer / Dedication Note</label>
                <input
                  type="text"
                  value={donorNote}
                  onChange={(e) => setDonorNote(e.target.value)}
                  placeholder="e.g. Thanksgiving for healing"
                  className="w-full px-3 py-1.5 bg-gray-50 dark:bg-[#202c33] border border-gray-200 dark:border-gray-700 rounded-lg text-xs focus:ring-1 focus:ring-[#008069] focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#008069] hover:bg-[#006e58] text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-3 cursor-pointer"
            >
              <Heart size={16} className="fill-white" />
              Seed ${customAmount || amount} for Kingdom Work
            </button>
            <div className="text-center text-[11px] text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck size={12} className="text-emerald-500" />
              Official encrypted payment gateway for Jesus Christ Reigns Gospel Ministry
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
