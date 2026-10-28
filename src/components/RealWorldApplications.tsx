import React from 'react';
import { Language } from '../types/chemistry';
import { Rocket, Sparkles, Building2, ShieldCheck, HeartPulse, ExternalLink } from 'lucide-react';

interface RealWorldApplicationsProps {
  language: Language;
}

export const RealWorldApplications: React.FC<RealWorldApplicationsProps> = ({ language }) => {
  const apps = [
    {
      id: 'spacecraft',
      titleEn: 'Spacecraft & Submarine Emergency Rebreathers',
      titleSi: 'අභ්‍යවකාශ යානා සහ සබ්මැරීන හදිසි ශ්වසන පද්ධති',
      compound: 'KO₂ (Potassium Superoxide)',
      badge: 'Aerospace & Military',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: Rocket,
      descEn:
        'Potassium Superoxide is the heart of life support in Russian Soyuz capsules, miners emergency packs, and submarine rebreathers. It performs two miracles simultaneously without needing electricity: it reacts with moisture in exhaled breath to liberate pure O₂ gas, while the resulting KOH captures exhaled toxic CO₂ as solid potassium carbonate (K₂CO₃).',
      descSi:
        'පොටෑසියම් සුපර්ඔක්සයිඩ් (KO₂) රුසියානු සෝයුස් අභ්‍යවකාශ යානා, සබ්මැරීන සහ පතල් කම්කරුවන්ගේ ශ්වසන උපකරණ වල ප්‍රධානතම ජීවිතාරක්ෂක සංයෝගයයි. කිසිදු විදුලි බලයක් නොමැතිව, පිටකරන තෙතමනය සමග ප්‍රතික්‍රියා කර පිරිසිදු O₂ වායුව මුදාහරින අතරම, සෑදෙන KOH මගින් CO₂ උරාගෙන ඝන කාබනේට් බවට පත්කර වාතය පිරිසිදු කරයි.',
      equations: [
        '4KO₂(s) + 2H₂O(v) → 4KOH(s) + 3O₂↑',
        '2KOH(s) + CO₂(g) → K₂CO₃(s) + H₂O',
        'Overall: 4KO₂ + 2CO₂ → 2K₂CO₃ + 3O₂↑',
      ],
    },
    {
      id: 'bleaching',
      titleEn: 'Industrial Pulp, Textile Bleaching & Modern Detergents',
      titleSi: 'කාර්මික පල්ප, රෙදිපිළි විරංජනය හා ඩිටර්ජන්ට්',
      compound: 'Na₂O₂ (Sodium Peroxide)',
      badge: 'Industrial Chemistry',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Sparkles,
      descEn:
        'Sodium peroxide dissolves in water to generate hydrogen peroxide (H₂O₂), a potent eco-friendly oxidizing bleach that whitens wood pulp, textiles, and paper without producing toxic chlorinated dioxins. It is the historical chemical parent of modern oxygen bleach powders (sodium percarbonate).',
      descSi:
        'සෝඩියම් පෙරොක්සයිඩ් ජලයේ දියවී හයිඩ්‍රජන් පෙරොක්සයිඩ් (H₂O₂) නිපදවයි. පරිසර හිතකාමී ප්‍රබල ඔක්සිකාරකයක් වන මෙය ලී පල්ප, කඩදාසි සහ රෙදිපිළි විරංජනය සඳහා යොදාගනී. අහිතකර ක්ලෝරීන් අතුරුඵල ඇති නොකර පිරිසිදු සුදු පැහැයක් ලබාදෙයි.',
      equations: [
        'Na₂O₂(s) + 2H₂O(l) → 2NaOH(aq) + H₂O₂(aq)',
        'H₂O₂ + Chromophore → Decolorized product + H₂O',
      ],
    },
    {
      id: 'civil',
      titleEn: 'Slaking Quicklime: Civil Engineering & Water Purification',
      titleSi: 'හුණු නිවීම: ඉදිකිරීම් කර්මාන්තය හා ජල පිරිපහදුව',
      compound: 'CaO (Calcium Oxide / Quicklime)',
      badge: 'Civil Engineering',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Building2,
      descEn:
        'The ancient slaking reaction of quicklime (CaO + H₂O → Ca(OH)₂) releases massive heat used historically to boil water and produce slaked lime. It forms the backbone of traditional mortar, plaster, pH neutralization in acid-mine drainage, and flue-gas desulfurization in power plants.',
      descSi:
        'කැල්සියම් ඔක්සයිඩ් හෙවත් නොනිවූ හුණු ජලය සමග ප්‍රතික්‍රියාව මගින් අධික තාපයක් පිටකරමින් නිවූ හුණු Ca(OH)₂ සාදයි. මෙය බදාම, හුණු පිරියම්, ආම්ලික අපජලය උදාසීන කිරීම සහ විදුලි බලාගාර දුමාරයෙන් සල්ෆර් ඩයොක්සයිඩ් ඉවත් කිරීම සඳහා අත්‍යවශ්‍ය වේ.',
      equations: [
        'CaO(s) + H₂O(l) → Ca(OH)₂(s/aq)  (ΔH = -65.2 kJ/mol)',
        'Ca(OH)₂ + CO₂(g) → CaCO₃(s) + H₂O(l)  (Hardening)',
      ],
    },
    {
      id: 'biology',
      titleEn: 'Cellular Defense Against Superoxide Radical (SOD Enzyme)',
      titleSi: 'සුපර්ඔක්සයිඩ් රැඩිකල් වලට එරෙහි සෛලීය ආරක්ෂාව (SOD එන්සයිමය)',
      compound: 'O₂•⁻ Radical Defense Mechanism',
      badge: 'Biomedical Science',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: HeartPulse,
      descEn:
        'In human mitochondria, 1-2% of oxygen consumed accidentally leaks an electron, forming the cytotoxic superoxide radical (O₂•⁻). To survive, aerobic life evolved Superoxide Dismutase (SOD), an ultra-fast metalloenzyme that catalyzes the disproportionation of O₂•⁻ into molecular oxygen and H₂O₂.',
      descSi:
        'මානව සෛල තුළ මයිටකොන්ඩ්‍රියා මගින් ශ්වසනය කිරීමේදී 1-2% ක පමණ ඔක්සිජන් ප්‍රමාණයක් අහම්බෙන් තනි ඉලෙක්ට්‍රෝනයක් ලබාගෙන සෛල විනාශකාරී සුපර්ඔක්සයිඩ් රැඩිකල් (O₂•⁻) බවට පත්වේ. සිරුර ආරක්ෂා කිරීම සඳහා සුපර්ඔක්සයිඩ් ඩිස්මියුටේස් (SOD) එන්සයිමය මගින් මෙය O₂ සහ H₂O₂ බවට විෂමානුපාතී කර හානි අවම කරයි.',
      equations: [
        '2O₂•⁻ + 2H⁺ —[SOD enzyme]→ O₂ + H₂O₂',
        '2H₂O₂ —[Catalase]→ 2H₂O + O₂',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3 border border-blue-200">
            <Rocket className="w-3.5 h-3.5 text-blue-600" />
            {language === 'si' ? 'ප්‍රායෝගික තාක්ෂණික භාවිත' : 'Real-World Chemistry Applications'}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'si'
              ? 'අභ්‍යවකාශ යානයේ සිට සෛලීය ජීව විද්‍යාව දක්වා'
              : 'From Space Exploration to Cellular Survival'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            {language === 'si'
              ? 'ඔක්සයිඩ, පෙරොක්සයිඩ සහ සුපර්ඔක්සයිඩ සතු අසමසම ජල ප්‍රතික්‍රියාශීලීත්වය හා ඔක්සිජන් නිදහස් කිරීමේ හැකියාව සැබෑ ලෝකයේ අතිශය තීරණාත්මක තාක්ෂණයන් සඳහා පදනම සපයයි.'
              : 'The distinct water reactivity and oxygen-liberating dynamics of oxides, peroxides, and superoxides empower some of the most critical technologies and biological defense shields in the universe.'}
          </p>
        </div>
      </div>

      {/* Grid of Applications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${app.badgeColor}`}>
                    {app.badge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono font-bold text-blue-600 block">
                    {app.compound}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    {language === 'si' ? app.titleSi : app.titleEn}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'si' ? app.descSi : app.descEn}
                </p>
              </div>

              {/* Chemical Equations Box */}
              <div className="bg-slate-900 rounded-xl p-3.5 text-white font-mono text-xs space-y-1">
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block">
                  {language === 'si' ? 'ප්‍රතික්‍රියා සමීකරණ' : 'Key Reactions'}
                </span>
                {app.equations.map((eq, idx) => (
                  <div key={idx} className="text-emerald-400 text-[11px] font-bold">
                    {eq}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
