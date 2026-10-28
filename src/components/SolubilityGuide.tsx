import React, { useState } from 'react';
import { Language } from '../types/chemistry';
import { COMPOUNDS } from '../data/compoundsData';
import { TRANSLATIONS } from '../data/translations';
import { Droplets, TrendingUp, ShieldCheck, Scale, Zap, Info, Filter } from 'lucide-react';

interface SolubilityGuideProps {
  language: Language;
}

export const SolubilityGuide: React.FC<SolubilityGuideProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedGroup, setSelectedGroup] = useState<1 | 2 | 'all'>('all');

  const filteredCompounds = COMPOUNDS.filter((c) => {
    if (selectedGroup === 'all') return true;
    return c.group === selectedGroup;
  });

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
            <Droplets className="w-3.5 h-3.5 text-blue-600" />
            {language === 'si' ? 'ද්‍රාව්‍යතා හා දැල් ශක්ති මූලධර්ම' : 'Water Solubility & Lattice Thermodynamics'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'si'
              ? 'ඔක්සයිඩ, පෙරොක්සයිඩ හා සුපර්ඔක්සයිඩ ජලයේ දියවන්නේ කෙසේද?'
              : 'Why Some Oxides Dissolve Completely While Others Remain Insoluble'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'si'
              ? 'ජලයේ ද්‍රාව්‍යතාව තීරණය වන්නේ දැල් එන්තැල්පිය (Lattice Enthalpy) සහ සජලන එන්තැල්පිය (Hydration Enthalpy) අතර තරඟයෙනි. කාණ්ඩය 1 (Alkali) ලෝහයන්හි සියලුම ඔක්සයිඩ, පෙරොක්සයිඩ හා සුපර්ඔක්සයිඩ ජලයේ පූර්ණ ලෙස දියවී ප්‍රතික්‍රියා කරන අතර, කාණ්ඩය 2 හි MgO අද්‍රාව්‍ය වන අතර පහළට යත්ම ද්‍රාව්‍යතාව ක්‍රමයෙන් වැඩිවේ.'
              : 'Water solubility is governed by the thermodynamic competition between Lattice Enthalpy (ΔH_latt) and Hydration Enthalpy (ΔH_hyd). All Group 1 compounds react completely to form dissolved hydroxides, while Group 2 shows dramatic contrast: MgO is virtually insoluble, CaO is sparingly soluble, and BaO dissolves easily.'}
          </p>
        </div>
      </div>

      {/* Group Filter Switch */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700">
            {language === 'si' ? 'ලෝහ කාණ්ඩය අනුව පෙරීම:' : 'Filter by Metal Group:'}
          </span>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setSelectedGroup('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedGroup === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'si' ? 'සියල්ල (All)' : 'All Elements'}
          </button>
          <button
            onClick={() => setSelectedGroup(1)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedGroup === 1
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            {language === 'si' ? 'කාණ්ඩය 1 (Li, Na, K, Rb, Cs)' : 'Group 1 Alkali Metals'}
          </button>
          <button
            onClick={() => setSelectedGroup(2)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              selectedGroup === 2
                ? 'bg-purple-600 text-white'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            {language === 'si' ? 'කාණ්ඩය 2 (Mg, Ca, Ba)' : 'Group 2 Alkaline Earth'}
          </button>
        </div>
      </div>

      {/* Solubility Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompounds.map((c) => {
          const isHighSolubility = c.solubilityCategory === 'completely_soluble_reacts';
          const isSparingly = c.solubilityCategory === 'sparingly_soluble';

          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: c.colorHex }}
                    >
                      {c.metal}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 font-mono text-base">{c.formula}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {language === 'si' ? c.nameSi : c.name}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      c.category === 'oxide'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : c.category === 'peroxide'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {c.anionFormula}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border ${
                      isHighSolubility
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : isSparingly
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    <Droplets className="w-3.5 h-3.5" />
                    {isHighSolubility
                      ? language === 'si'
                        ? 'පූර්ණ ද්‍රාව්‍ය ප්‍රතික්‍රියාව'
                        : 'Completely Soluble (Reacts)'
                      : isSparingly
                      ? language === 'si'
                        ? 'ස්වල්ප වශයෙන් ද්‍රාව්‍යයි'
                        : 'Sparingly Soluble'
                      : language === 'si'
                      ? 'ප්‍රායෝගිකව අද්‍රාව්‍යයි'
                      : 'Practically Insoluble'}
                  </span>
                </div>

                {/* Thermodynamic Values */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Lattice Enthalpy</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      {c.latticeEnergyKjMol} kJ/mol
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Hydration Enthalpy</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      {c.hydrationEnthalpyKjMol} kJ/mol
                    </span>
                  </div>
                </div>

                {/* Explanation text */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'si' ? c.solubilityNoteSi : c.solubilityNoteEn}
                </p>
              </div>

              {/* Soluble Result product */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                <span className="text-slate-400">Yield: </span>
                <span className="text-slate-800 font-semibold truncate">{c.reactionEquation.split('→')[1] || ''}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fundamental Concept Explainer: Group 1 vs Group 2 Trends */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {language === 'si'
                ? 'කාණ්ඩය 1 සහ කාණ්ඩය 2 අතර ද්‍රාව්‍යතා ප්‍රවණතා සංසන්දනය'
                : 'Group 1 vs Group 2 Hydroxide & Oxide Solubility Trends'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'si'
                ? 'අයන අරය, ආරෝපණ ඝනත්වය සහ දැල් එන්තැල්පි වෙනස'
                : 'Ionic radius, charge density, and lattice vs hydration enthalpy balance'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group 1 Explanation */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              {language === 'si'
                ? 'කාණ්ඩය 1 (Li, Na, K, Rb, Cs): 100% ජල ද්‍රාව්‍යයි'
                : 'Group 1 (Alkali Metals): Universally Soluble'}
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'si'
                ? 'ඇල්කලී ලෝහ අයන සතු වන්නේ තනි ආරෝපණයක් (+1) පමණි. එබැවින් ඒවායේ දැල් ශක්තිය සාපේක්ෂව අඩුය. ජලය හමුවේදී ඒවා විගස සජලනය වන අතර සෑදෙන LiOH, NaOH, KOH, RbOH, CsOH සියල්ල ජලයේ අතිශයින්ම ද්‍රාව්‍ය ප්‍රබල භෂ්ම වේ. අද්‍රාව්‍ය අවක්ෂේප කිසිවක් ඉතිරි නොවේ.'
                : 'Group 1 cations carry only a single positive charge (+1). Their lattice energies are modest (e.g. 700 - 2,500 kJ/mol), which hydration enthalpy easily overcomes. The resulting hydroxides (LiOH, NaOH, KOH, etc.) are 100% water-soluble strong electrolytes with complete ionic dissociation.'}
            </p>
          </div>

          {/* Group 2 Explanation */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-purple-900 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              {language === 'si'
                ? 'කාණ්ඩය 2 (Mg, Ca, Ba): පහළට යත්ම ද්‍රාව්‍යතාව වැඩිවේ'
                : 'Group 2 (Alkaline Earth): Solubility Increases Down the Group'}
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {language === 'si'
                ? 'ද්වි-සංයුජ ආරෝපණය (+2) නිසා දැල් ශක්තිය අතිශය ඉහළය! කුඩා Mg²⁺ නිසා MgO ජලයේ දියනොවේ. කෙසේ වෙතත්, කාණ්ඩයේ පහළට යත්ම කැටායන අරය වැඩිවන බැවින් දැල් එන්තැල්පිය වේගයෙන් පහත වැටේ. ඒ නිසා Mg(OH)₂ < Ca(OH)₂ < Ba(OH)₂ ලෙස ද්‍රාව්‍යතාව ඉහළ යයි!'
                : 'Due to the divalent (+2) charge, lattice energies are colossal! For MgO, the tiny Mg²⁺ and O²⁻ ions create a lattice energy of 3,791 kJ/mol that cold water cannot rupture. However, descending Group 2, cation radius expands rapidly, causing lattice enthalpy to plunge faster than hydration enthalpy. Hence: Mg(OH)₂ (insoluble) < Ca(OH)₂ (sparingly soluble) < Ba(OH)₂ (soluble)!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
