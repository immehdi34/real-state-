import React, { useState, useMemo } from 'react';

export default function MortgageCalculator({ initialPrice = 12850000 }) {
  const [homePrice, setHomePrice] = useState(initialPrice);
  const [downPercent, setDownPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);

  const calculations = useMemo(() => {
    const downAmount = Math.round((homePrice * downPercent) / 100);
    const loanAmount = homePrice - downAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = termYears * 12;

    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI =
        (loanAmount *
          (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else {
      monthlyPI = loanAmount / numberOfPayments;
    }

    const estimatedTaxes = Math.round((homePrice * 0.008) / 12);
    const estimatedInsurance = Math.round((homePrice * 0.0035) / 12);
    const totalMonthly = Math.round(monthlyPI + estimatedTaxes + estimatedInsurance);

    return {
      downAmount,
      loanAmount,
      monthlyPI: Math.round(monthlyPI),
      estimatedTaxes,
      estimatedInsurance,
      totalMonthly,
    };
  }, [homePrice, downPercent, interestRate, termYears]);

  return (
    <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-200 pb-5">
        <div>
          <h3 className="font-bold text-2xl text-slate-900">Mortgage Estimator</h3>
          <p className="text-xs text-slate-500">Calculate estimated monthly investment with taxes & insurance</p>
        </div>
        <div className="flex flex-col sm:items-end">
          <span className="text-3xl font-extrabold text-emerald-600">
            ${calculations.totalMonthly.toLocaleString()}{' '}
            <span className="text-sm font-medium text-slate-500">/ mo</span>
          </span>
          <span className="text-[11px] text-slate-400">Includes P&I, Taxes & Ins.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Home Price Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-600">Home Price</span>
            <strong className="text-slate-900">${homePrice.toLocaleString()}</strong>
          </div>
          <input
            type="range"
            min="1000000"
            max="30000000"
            step="50000"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        {/* Down Payment Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-600">Down Payment ({downPercent}%)</span>
            <strong className="text-slate-900">${calculations.downAmount.toLocaleString()}</strong>
          </div>
          <input
            type="range"
            min="10"
            max="50"
            step="1"
            value={downPercent}
            onChange={(e) => setDownPercent(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        {/* Interest Rate Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-600">Interest Rate</span>
            <strong className="text-slate-900">{interestRate}%</strong>
          </div>
          <input
            type="range"
            min="3.0"
            max="10.0"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        {/* Loan Term Selector */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-slate-600">Loan Term</span>
            <strong className="text-slate-900">{termYears} Years Fixed</strong>
          </div>
          <select
            value={termYears}
            onChange={(e) => setTermYears(Number(e.target.value))}
            className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          >
            <option value={30}>30 Years Fixed (Standard)</option>
            <option value={15}>15 Years Fixed (Aggressive)</option>
            <option value={20}>20 Years Fixed</option>
          </select>
        </div>
      </div>

      {/* Breakdown Pills */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 text-center">
        <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm">
          <span className="text-xs text-slate-500 block">Principal & Int.</span>
          <span className="font-bold text-slate-800 text-sm sm:text-base">${calculations.monthlyPI.toLocaleString()}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm">
          <span className="text-xs text-slate-500 block">Property Tax (Est.)</span>
          <span className="font-bold text-slate-800 text-sm sm:text-base">${calculations.estimatedTaxes.toLocaleString()}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200/60 shadow-sm">
          <span className="text-xs text-slate-500 block">Insurance (Est.)</span>
          <span className="font-bold text-slate-800 text-sm sm:text-base">${calculations.estimatedInsurance.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
