import React, { useState } from 'react';
import { Language } from '../types/chemistry';
import { OXYGEN_SPECIES_COMPARISON } from '../data/compoundsData';
import { TRANSLATIONS } from '../data/translations';
import {
  Layers,
  ArrowRight,
  Zap,
  Info,
  Sparkles,
  Flame,
  CheckCircle2,
  Atom,
  ShieldCheck,
} from 'lucide-react';

interface ReactivityMatrixProps {
  language: Language;
}

export const ReactivityMatrix: React.FC<ReactivityMatrixProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [activeSpeciesId, setActiveSpeciesId] = useState<string>('superoxide');

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            {language === 'si' ? 'මූලික රසායනික සංසන්දනය' : 'Fundamental Chemical Comparative Matrix'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'si'
              ? 'ඔක්සිජන් ප්‍රමාණය මත ජලය සමග ප්‍රතික්‍රියාශීලීත්වය වෙනස් වන්නේ කෙසේද?'
              : 'How Oxygen Content Radically Changes Water Reactivity'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'si'
              ? 'සාමාන්‍ය ඔක්සයිඩ වල සිට පෙරොක්සයිඩ සහ සුපර්ඔක්සයිඩ දක්වා ඔක්සිජන් ප්‍රමාණය වැඩිවත්ම, ඔක්සිජන් පරමාණුවේ ඔක්සිකරණ අංකය -2 සිට -1 සහ -1/2 දක්වා ඉහළ යයි. මෙය ජලය හමුවේ සරල අම්ල-භෂ්ම ප්‍රතික්‍රියාවක සිට ප්‍රචණ්ඩ රෙඩොක්ස් විෂමානුපාතීකරණයක් දක්වා ප්‍රතික්‍රියාවේ ස්වභාවය සම්පූර්ණයෙන්ම වෙනස් කරයි!'
              : 'As oxygen content increases from normal oxide (O²⁻) to peroxide (O₂²⁻) and superoxide (O₂⁻), the oxidation state rises from -2 to -1 and -1/2. This shifts water reactivity from simple Brønsted acid-base hydrolysis to violent redox disproportionation liberating active oxygen!'}
          </p>
        </div>
      </div>

      {/* 3 Main Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {OXYGEN_SPECIES_COMPARISON.map((species) => {
          const isSelected = activeSpeciesId === species.id;
          return (
            <div
              key={species.id}
              onClick={() => setActiveSpeciesId(species.id)}
              className={`cursor-pointer rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between relative overflow-hidden ${
                isSelected
                  ? 'bg-white border-blue-600 shadow-lg ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              {/* Top Accent Bar */}
              <div
                className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${species.colorClass}`}
              ></div>

              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                      {species.oxygenToMetalRatio}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 font-mono flex items-center gap-2">
                      {language === 'si' ? species.nameSi : species.nameEn}
                    </h3>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-lg bg-gradient-to-br ${species.colorClass} text-white shadow-md`}
                  >
                    {species.formula}
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 block">
                      {language === 'si' ? 'ඔක්සිකරණ අංකය' : 'Oxidation State'}
                    </span>
                    <span className="font-mono font-extrabold text-slate-900 text-sm">
                      {species.oxidationState}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 block">
                      {language === 'si' ? 'බන්ධන ගණන' : 'Bond Order'}
                    </span>
                    <span className="font-mono font-extrabold text-slate-900 text-sm">
                      {species.bondOrder}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 block">
                      {language === 'si' ? 'බන්ධන දිග' : 'Bond Length'}
                    </span>
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      {species.bondLengthPm}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-500 block">
                      {language === 'si' ? 'චුම්භකත්වය' : 'Magnetism'}
                    </span>
                    <span
                      className={`font-bold text-[11px] ${
                        species.id === 'superoxide' ? 'text-rose-600' : 'text-slate-800'
                      }`}
                    >
                      {species.id === 'superoxide' ? 'Paramagnetic 🧲' : 'Diamagnetic'}
                    </span>
                  </div>
                </div>

                {/* Hydrolysis Reaction Box */}
                <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono text-xs">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                    {language === 'si' ? 'ජල විච්ඡේදන සමීකරණය' : 'Hydrolysis Equation'}
                  </span>
                  <div className="text-emerald-400 font-bold whitespace-pre-wrap">
                    {species.generalEquation}
                  </div>
                </div>

                {/* Explanation text */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'si' ? species.reactionWithWaterSi : species.reactionWithWaterEn}
                </p>
              </div>

              {/* Bottom Footer Badge */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className={`px-2 py-0.5 rounded-md font-semibold border ${species.badgeColor}`}>
                  {species.enthalpyCharacter}
                </span>
                <span className="text-blue-600 font-semibold flex items-center gap-1">
                  {language === 'si' ? 'විස්තර බලන්න' : 'Deep dive'} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Analytical Section: Why Reactivity Alters with Oxygen Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {language === 'si'
                ? 'ඔක්සිජන් ප්‍රමාණය අනුව ප්‍රතික්‍රියාවේ ප්‍රචණ්ඩත්වය හා ඵල වෙනස් වීමේ විද්‍යාත්මක හේතුව'
                : 'Thermodynamics & Mechanism: Why Oxygen Content Governs the Reaction'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'si'
                ? 'Brønsted භෂ්මිකත්වයේ සිට රෙඩොක්ස් විෂමානුපාතීකරණය දක්වා සංක්‍රමණය වීම'
                : 'The step transition from pure Brønsted basicity to energetic redox disproportionation'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Oxide */}
          <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-blue-950 text-sm">
                {language === 'si' ? 'සාමාන්‍ය ඔක්සයිඩ (O²⁻): සරල අම්ල-භෂ්ම' : 'Normal Oxides (O²⁻): Pure Brønsted Base'}
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'si'
                ? 'O²⁻ අයනයේ ඔක්සිජන් සතු වන්නේ එහි හැකි අවම ඔක්සිකරණ අංකයයි (-2). එයට තවදුරටත් ඉලෙක්ට්‍රෝන ලබාගත නොහැක (reduction නොවේ). එබැවින් ජල අණු මගින් H⁺ ලබාගනිමින් පූර්ණ වශයෙන් OH⁻ බවට පත්වේ. කිසිදු වායුවක් පිට නොවේ.'
                : 'The O²⁻ ion is already in its lowest accessible oxidation state (-2). It has colossal proton affinity and acts as an ultra-strong Brønsted base. It extracts protons from H₂O forming 2OH⁻ with zero electron transfer, releasing immense hydration heat but NO oxygen gas.'}
            </p>
            <div className="bg-white/80 p-2.5 rounded-lg border border-blue-200 font-mono text-[11px] text-blue-900 font-bold">
              O²⁻ + H₂O → 2OH⁻ (ΔH &lt; 0, No Redox)
            </div>
          </div>

          {/* Card 2: Peroxide */}
          <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-amber-950 text-sm">
                {language === 'si' ? 'පෙරොක්සයිඩ (O₂²⁻): පෙරොක්සයිඩ් බන්ධනය' : 'Peroxides (O₂²⁻): Weak O-O Bridge'}
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'si'
                ? 'මෙහි ඔක්සිජන් පවතින්නේ -1 තත්වයේය. තනි O-O සහසංයුජ බන්ධනයක් පවතී. ශීතල ජලයේදී එය H⁺ ලබාගෙන H₂O₂ සාදයි. එහෙත් රත් කළ විට H₂O₂ අස්ථායී වී O₂ (0) සහ H₂O (-2) බවට විෂමානුපාතී වේ!'
                : 'Oxygen is at intermediate oxidation state (-1). In cold water, O₂²⁻ protonates cleanly to hydrogen peroxide (H₂O₂). When warmed or aged, the metastable H₂O₂ disproportionates: 2H₂O₂ → 2H₂O + O₂↑, yielding effervescence and oxidizing properties.'}
            </p>
            <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200 font-mono text-[11px] text-amber-900 font-bold">
              O₂²⁻ + 2H₂O → 2OH⁻ + H₂O₂ (Bleaching action)
            </div>
          </div>

          {/* Card 3: Superoxide */}
          <div className="p-5 rounded-xl bg-rose-50/60 border border-rose-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-rose-950 text-sm">
                {language === 'si' ? 'සුපර්ඔක්සයිඩ (O₂⁻): ක්ෂණික විෂමානුපාතීකරණය' : 'Superoxides (O₂⁻): Spontaneous Disproportionation'}
              </h4>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'si'
                ? 'ඉහළම ඔක්සිජන් ප්‍රතිශතය සහිත සුපර්ඔක්සයිඩ වල ඔක්සිකරණ අංකය -1/2 කි. ජලය ස්පර්ශ වූ සැණින් සුපර්ඔක්සයිඩ් අයන දෙකක් ක්ෂණිකව රෙඩොක්ස් විෂමානුපාතීකරණයට ලක්වෙමින් පිරිසිදු O₂ වායුව (0), H₂O₂ (-1) සහ OH⁻ (-2) ලබාදෙයි!'
                : 'Contains the highest oxygen-to-metal ratio with oxygen at -1/2. The radical anion O₂⁻ is thermodynamically violently unstable in water. It spontaneously and instantaneously disproportionates: half is oxidized to O₂ (0) while half is reduced to H₂O₂ (-1) and OH⁻ (-2)!'}
            </p>
            <div className="bg-white/80 p-2.5 rounded-lg border border-rose-200 font-mono text-[11px] text-rose-900 font-bold">
              2O₂⁻ + 2H₂O → 2OH⁻ + H₂O₂ + O₂↑ (Torrential Gas)
            </div>
          </div>
        </div>

        {/* Visual Progression Summary Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            {language === 'si' ? 'ප්‍රවණතා සාරාංශය (Trend Spectrum)' : 'Comprehensive Property Spectrum'}
          </h4>
          <div className="relative bg-slate-100 rounded-xl p-4 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Starting Point</span>
              <span className="font-bold text-sm text-blue-700 font-mono">Oxide (O²⁻)</span>
              <span className="text-xs text-slate-600 block">Lowest Oxygen % • No O₂ Gas</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-xs font-semibold text-slate-600">Increasing Oxygen Content & Oxidation State</span>
              <ArrowRight className="w-5 h-5 text-indigo-500 animate-pulse" />
            </div>

            <div className="text-center md:text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Highest Energy</span>
              <span className="font-bold text-sm text-rose-600 font-mono">Superoxide (O₂⁻)</span>
              <span className="text-xs text-slate-600 block">Highest Oxygen % • Immediate Violent O₂ Rush</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
