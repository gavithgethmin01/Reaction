import React, { useState } from 'react';
import { Language } from '../types/chemistry';
import { TRANSLATIONS } from '../data/translations';
import { Atom, ShieldAlert, Sparkles, Layers, ArrowUp, Compass } from 'lucide-react';

interface MolecularOrbitalViewerProps {
  language: Language;
}

type MOSpecies = 'dioxygen' | 'superoxide' | 'peroxide';

interface OrbitalConfig {
  name: string;
  type: 'bonding' | 'antibonding';
  y: number; // visual vertical position
  dioxygen: number[]; // e.g. [2] or [2, 2]
  superoxide: number[];
  peroxide: number[];
}

export const MolecularOrbitalViewer: React.FC<MolecularOrbitalViewerProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [activeSpecies, setActiveSpecies] = useState<MOSpecies>('superoxide');

  const speciesData = {
    dioxygen: {
      name: 'Dioxygen (O₂)',
      nameSi: 'ඩයිඔක්සිජන් (O₂)',
      formula: 'O₂',
      valenceElectrons: 12,
      totalElectrons: 16,
      bondOrder: 2.0,
      bondLength: '121 pm',
      magnetic: 'Paramagnetic',
      magneticSi: 'පැරාමැග්නටික් (2 unpaired e⁻)',
      piStarElectrons: '2 (↑, ↑)',
      notesEn: 'Reference ground-state triplet oxygen with 2 parallel unpaired electrons in π*2p orbitals.',
      notesSi: 'π*2p කාක්ෂික වල සමාන්තර භ්‍රමණය සහිත යුගලනය නොවූ ඉලෙක්ට්‍රෝන 2ක් පවතී.',
      color: 'text-sky-600',
    },
    superoxide: {
      name: 'Superoxide (O₂⁻)',
      nameSi: 'සුපර්ඔක්සයිඩ් (O₂⁻)',
      formula: 'O₂⁻',
      valenceElectrons: 13,
      totalElectrons: 17,
      bondOrder: 1.5,
      bondLength: '128 pm',
      magnetic: 'Paramagnetic',
      magneticSi: 'පැරාමැග්නටික් (1 unpaired e⁻)',
      piStarElectrons: '3 (↑↓, ↑)',
      notesEn: 'One extra electron enters the π*2p antibonding level, weakening the bond (B.O. drops to 1.5) and leaving 1 unpaired radical electron.',
      notesSi: 'අමතර ඉලෙක්ට්‍රෝනය π*2p ප්‍රතිබන්ධන මට්ටමට ඇතුළු වන බැවින් බන්ධනය දුර්වල වේ (බන්ධන ගණන 1.5). තනි යුගලනය නොවූ ඉලෙක්ට්‍රෝනයක් ඉතිරිවේ.',
      color: 'text-rose-600',
    },
    peroxide: {
      name: 'Peroxide (O₂²⁻)',
      nameSi: 'පෙරොක්සයිඩ් (O₂²⁻)',
      formula: 'O₂²⁻',
      valenceElectrons: 14,
      totalElectrons: 18,
      bondOrder: 1.0,
      bondLength: '149 pm',
      magnetic: 'Diamagnetic',
      magneticSi: 'ඩයාවැග්නටික් (all e⁻ paired)',
      piStarElectrons: '4 (↑↓, ↑↓)',
      notesEn: 'Both π*2p antibonding orbitals are completely filled with paired electrons. Bond order drops to 1.0 (single covalent bond). Diamagnetic.',
      notesSi: 'π*2p ප්‍රතිබන්ධන කාක්ෂික දෙකම යුගලනය වූ ඉලෙක්ට්‍රෝන වලින් පිරී පවතී. බන්ධන ගණන 1.0 දක්වා අඩුවේ. ඩයාවැග්නටික් වේ.',
      color: 'text-amber-600',
    },
  };

  const current = speciesData[activeSpecies];

  // Orbital levels in O2 molecular orbital diagram
  const orbitals = [
    {
      id: 'sigma_star_2pz',
      label: 'σ*2pz',
      type: 'antibonding',
      y: 40,
      slots: [{ e: 0, label: 'σ*2pz' }],
    },
    {
      id: 'pi_star_2p',
      label: 'π*2px , π*2py',
      type: 'antibonding',
      y: 95,
      slots: [
        {
          e: activeSpecies === 'dioxygen' ? 1 : 2,
          label: 'π*2px',
        },
        {
          e: activeSpecies === 'dioxygen' ? 1 : activeSpecies === 'superoxide' ? 1 : 2,
          label: 'π*2py',
        },
      ],
      highlight: true,
    },
    {
      id: 'pi_2p',
      label: 'π2px , π2py',
      type: 'bonding',
      y: 165,
      slots: [
        { e: 2, label: 'π2px' },
        { e: 2, label: 'π2py' },
      ],
    },
    {
      id: 'sigma_2pz',
      label: 'σ2pz',
      type: 'bonding',
      y: 225,
      slots: [{ e: 2, label: 'σ2pz' }],
    },
    {
      id: 'sigma_star_2s',
      label: 'σ*2s',
      type: 'antibonding',
      y: 290,
      slots: [{ e: 2, label: 'σ*2s' }],
    },
    {
      id: 'sigma_2s',
      label: 'σ2s',
      type: 'bonding',
      y: 350,
      slots: [{ e: 2, label: 'σ2s' }],
    },
  ];

  // Helper to render electrons (arrows)
  const renderArrows = (count: number) => {
    if (count === 0) return null;
    if (count === 1) {
      return (
        <span className="inline-flex items-center text-rose-500 font-bold text-sm tracking-tighter">
          ↑
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-blue-700 font-bold text-sm tracking-tighter">
        ⥮
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
            <Atom className="w-3.5 h-3.5 text-blue-600" />
            {language === 'si' ? 'අණුක කාක්ෂික වාදය' : 'Molecular Orbital (MO) Theory'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'si'
              ? 'අණුක කාක්ෂික සටහන: බන්ධන ගණන සහ චුම්භක ගුණය'
              : 'Electronic Origin of Bond Order, Radical Nature & Paramagnetism'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'si'
              ? 'සුපර්ඔක්සයිඩ් අයනයේ (O₂⁻) ඇති අසමසම ප්‍රතික්‍රියාශීලීත්වයට සහ පැරාමැග්නටික් ස්වභාවයට හේතුව π*2p ප්‍රතිබන්ධන කාක්ෂිකයේ ඇති තනි යුගලනය නොවූ නිදහස් රැඩිකල් ඉලෙක්ට්‍රෝනයයි!'
              : 'The radical reactivity and paramagnetism of superoxide (O₂⁻) arises directly from its molecular orbital electronic configuration: an unpaired electron residing in a high-energy π*2p antibonding orbital!'}
          </p>
        </div>
      </div>

      {/* Species Toggle Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSpecies('superoxide')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSpecies === 'superoxide'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="font-mono font-bold">O₂⁻</span>
          <span>{language === 'si' ? 'සුපර්ඔක්සයිඩ් (Superoxide)' : 'Superoxide'}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20 font-mono">1.5 Bond</span>
        </button>

        <button
          onClick={() => setActiveSpecies('peroxide')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSpecies === 'peroxide'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="font-mono font-bold">O₂²⁻</span>
          <span>{language === 'si' ? 'පෙරොක්සයිඩ් (Peroxide)' : 'Peroxide'}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20 font-mono">1.0 Bond</span>
        </button>

        <button
          onClick={() => setActiveSpecies('dioxygen')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSpecies === 'dioxygen'
              ? 'bg-sky-600 text-white shadow-md'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="font-mono font-bold">O₂</span>
          <span>{language === 'si' ? 'ඩයිඔක්සිජන් (Dioxygen Gas)' : 'Dioxygen (Ref)'}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/20 font-mono">2.0 Bond</span>
        </button>
      </div>

      {/* Main Grid: MO Energy Diagram Canvas (Left) + Detailed Analytics (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Diagram (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                {language === 'si' ? 'අණුක කාක්ෂික ශක්ති මට්ටම් සටහන' : 'Energy Level Diagram'}
              </span>
              <span className="text-xs text-slate-500 font-mono">({current.formula})</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-slate-500">
                <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
                {language === 'si' ? 'ශක්තිය ඉහළට' : 'Energy (E)'}
              </span>
            </div>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative bg-slate-900 rounded-xl p-6 text-white min-h-[420px] flex flex-col justify-between overflow-hidden shadow-inner">
            {/* Background vertical energy axis */}
            <div className="absolute left-6 top-6 bottom-6 flex flex-col items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1 text-[11px] font-mono text-blue-400">
                <ArrowUp className="w-4 h-4 text-blue-400" />
                <span>E (High)</span>
              </div>
              <div className="w-0.5 flex-1 bg-gradient-to-t from-slate-700 via-blue-500 to-indigo-400 my-2"></div>
              <span className="text-[11px] font-mono text-slate-500">E (Low)</span>
            </div>

            {/* Orbitals Stack */}
            <div className="ml-16 space-y-4 flex flex-col justify-between h-full py-2">
              {orbitals.map((orb) => (
                <div
                  key={orb.id}
                  className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
                    orb.highlight
                      ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-900/20'
                      : 'bg-slate-800/60 border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-300 w-24">
                      {orb.label}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                        orb.type === 'antibonding'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}
                    >
                      {orb.type}
                    </span>
                  </div>

                  {/* Electron Slots in this orbital level */}
                  <div className="flex items-center gap-3">
                    {orb.slots.map((slot, sIdx) => (
                      <div
                        key={sIdx}
                        className={`w-12 h-8 rounded border flex items-center justify-center font-mono text-sm shadow-inner ${
                          orb.highlight && slot.e === 1
                            ? 'bg-rose-900/60 border-rose-400 text-rose-300 animate-pulse'
                            : slot.e > 0
                            ? 'bg-slate-700 border-slate-500 text-white'
                            : 'bg-slate-900/60 border-slate-700 text-slate-600'
                        }`}
                      >
                        {slot.e === 0 ? '—' : slot.e === 1 ? '↑' : '⥮'}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-3 text-center">
            {language === 'si'
              ? 'රෝස පැහැයෙන් සලකුණු කර ඇත්තේ π*2p ප්‍රතිබන්ධන කාක්ෂිකයයි. සුපර්ඔක්සයිඩ් අයනයේ එහි පවතින තනි ඉලෙක්ට්‍රෝනය එය පැරාමැග්නටික් කරයි.'
              : 'Highlighted in rose: the critical π*2p antibonding level. In O₂⁻, one slot holds an unpaired electron (↑), rendering it paramagnetic.'}
          </p>
        </div>

        {/* Right: Metrics & Molecular Calculation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Key Metrics */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-base">{current.name}</h4>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                  current.magnetic === 'Paramagnetic'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {language === 'si' ? current.magneticSi : current.magnetic}
              </span>
            </div>

            {/* Bond Order Formula Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                {language === 'si' ? 'බන්ධන ගණනය කිරීමේ සූත්‍රය' : 'Bond Order Calculation Formula'}
              </span>
              <div className="font-mono text-xs text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 font-bold">
                Bond Order = (N_bonding - N_antibonding) / 2
              </div>
              <div className="text-xs text-slate-600 font-mono">
                {activeSpecies === 'superoxide' && (
                  <span>BO = (8 - 5) / 2 = <strong className="text-rose-600 text-sm">1.5</strong></span>
                )}
                {activeSpecies === 'peroxide' && (
                  <span>BO = (8 - 6) / 2 = <strong className="text-amber-600 text-sm">1.0</strong> (Single bond)</span>
                )}
                {activeSpecies === 'dioxygen' && (
                  <span>BO = (8 - 4) / 2 = <strong className="text-sky-600 text-sm">2.0</strong> (Double bond)</span>
                )}
              </div>
            </div>

            {/* Bond Length & Strength Correlation */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 block">
                  {language === 'si' ? 'බන්ධන දිග' : 'Bond Length'}
                </span>
                <span className="font-mono font-bold text-slate-800 text-sm">
                  {current.bondLength}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 block">
                  {language === 'si' ? 'සංයුජතා ඉලෙක්ට්‍රෝන' : 'Valence e⁻'}
                </span>
                <span className="font-mono font-bold text-slate-800 text-sm">
                  {current.valenceElectrons} e⁻
                </span>
              </div>
            </div>

            {/* Explanatory Narrative */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-slate-700 leading-relaxed">
              <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'si' ? 'අණුක රහස:' : 'Molecular Insight:'}</span>
              </div>
              <p>{language === 'si' ? current.notesSi : current.notesEn}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
