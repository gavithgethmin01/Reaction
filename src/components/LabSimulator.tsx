import React, { useState, useEffect, useRef } from 'react';
import { ChemicalCompound, Language } from '../types/chemistry';
import { COMPOUNDS } from '../data/compoundsData';
import { TRANSLATIONS } from '../data/translations';
import {
  Thermometer,
  Flame,
  RotateCcw,
  Sparkles,
  Droplets,
  HelpCircle,
  Activity,
  Layers,
  ChevronRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface LabSimulatorProps {
  language: Language;
}

export const LabSimulator: React.FC<LabSimulatorProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [selectedCompound, setSelectedCompound] = useState<ChemicalCompound>(COMPOUNDS[0]); // Li2O
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'oxide' | 'peroxide' | 'superoxide'>('all');
  const [waterTemperature, setWaterTemperature] = useState<number>(25.0);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [reactionComplete, setReactionComplete] = useState<boolean>(false);
  const [indicatorType, setIndicatorType] = useState<'universal' | 'phenolphthalein' | 'litmus'>('universal');
  const [splintTesting, setSplintTesting] = useState<boolean>(false);
  const [splintResult, setSplintResult] = useState<string | null>(null);
  const [starchTesting, setStarchTesting] = useState<boolean>(false);
  const [starchResult, setStarchResult] = useState<string | null>(null);
  const [activeBubbles, setActiveBubbles] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);

  const animTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredCompounds = COMPOUNDS.filter((c) => {
    if (categoryFilter === 'all') return true;
    return c.category === categoryFilter;
  });

  // Handle dropping reagent into water
  const handleDropIntoWater = (compound: ChemicalCompound = selectedCompound) => {
    if (isReacting) return;
    setIsReacting(true);
    setReactionComplete(false);
    setSplintResult(null);
    setStarchResult(null);

    // Initial temperature
    setWaterTemperature(25.0);

    // Generate bubbles if gas is evolved
    if (compound.gasEvolved === 'O2') {
      const bubbleCount = compound.category === 'superoxide' ? 24 : 12;
      const bubbles = Array.from({ length: bubbleCount }, (_, i) => ({
        id: i,
        left: 20 + Math.random() * 60,
        delay: Math.random() * 1.5,
        size: compound.category === 'superoxide' ? 8 + Math.random() * 10 : 5 + Math.random() * 6,
      }));
      setActiveBubbles(bubbles);
    } else {
      setActiveBubbles([]);
    }

    // Reaction duration based on speed
    const durationMs =
      compound.reactionSpeed === 'instant_violent' ? 1200 : compound.reactionSpeed === 'vigorous_fast' ? 1800 : 2500;

    const targetTemp = 25.0 + compound.temperatureRiseC;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Smooth cubic temperature curve
      const currentTemp = 25.0 + compound.temperatureRiseC * (1 - Math.pow(1 - progress, 3));
      setWaterTemperature(Number(currentTemp.toFixed(1)));

      if (progress >= 1) {
        clearInterval(interval);
        setWaterTemperature(targetTemp);
        setIsReacting(false);
        setReactionComplete(true);
      }
    }, 40);

    animTimerRef.current = interval as unknown as NodeJS.Timeout;
  };

  // Reset beaker to neutral clean water
  const handleResetBeaker = () => {
    if (animTimerRef.current) clearInterval(animTimerRef.current);
    setIsReacting(false);
    setReactionComplete(false);
    setWaterTemperature(25.0);
    setSplintResult(null);
    setStarchResult(null);
    setActiveBubbles([]);
  };

  // Run glowing splint test
  const handleTestSplint = () => {
    if (!reactionComplete) {
      handleDropIntoWater();
      setTimeout(() => runSplint(), 1600);
    } else {
      runSplint();
    }
  };

  const runSplint = () => {
    setSplintTesting(true);
    setTimeout(() => {
      setSplintTesting(false);
      setSplintResult(
        language === 'si'
          ? selectedCompound.splintTestResultSi
          : selectedCompound.splintTestResultEn
      );
    }, 1200);
  };

  // Run starch-iodide test
  const handleTestStarch = () => {
    if (!reactionComplete) {
      handleDropIntoWater();
      setTimeout(() => runStarch(), 1600);
    } else {
      runStarch();
    }
  };

  const runStarch = () => {
    setStarchTesting(true);
    setTimeout(() => {
      setStarchTesting(false);
      setStarchResult(
        language === 'si'
          ? selectedCompound.starchIodideTestSi
          : selectedCompound.starchIodideTestEn
      );
    }, 1200);
  };

  useEffect(() => {
    handleResetBeaker();
  }, [selectedCompound]);

  // Compute liquid color based on indicator and reaction state
  const getLiquidColor = () => {
    if (!reactionComplete && !isReacting) {
      // Neutral pure water
      if (indicatorType === 'universal') return 'bg-emerald-100/70 border-emerald-300';
      if (indicatorType === 'phenolphthalein') return 'bg-sky-50/50 border-sky-200';
      if (indicatorType === 'litmus') return 'bg-purple-100/50 border-purple-200';
    }

    // Reaction in progress or complete
    if (indicatorType === 'universal') {
      // Color depends on pH
      if (selectedCompound.pHResult >= 13.5) return 'bg-purple-600/80 border-purple-800 text-white';
      if (selectedCompound.pHResult >= 12.0) return 'bg-indigo-500/75 border-indigo-700 text-white';
      if (selectedCompound.pHResult >= 10.0) return 'bg-blue-500/60 border-blue-600 text-white';
      return 'bg-emerald-500/60 border-emerald-600';
    }

    if (indicatorType === 'phenolphthalein') {
      // Colorless below 8.2, intense fuchsia/magenta at high pH
      if (selectedCompound.pHResult >= 10.0) return 'bg-fuchsia-600/85 border-fuchsia-800 text-white';
      return 'bg-pink-300/60 border-pink-400';
    }

    if (indicatorType === 'litmus') {
      // Blue in basic solution
      return 'bg-blue-600/80 border-blue-800 text-white';
    }

    return 'bg-blue-100/70 border-blue-300';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Selector */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {language === 'si' ? 'අන්තර්ක්‍රියාකාරී රසායනාගාර බීකරය' : 'Interactive Wet-Lab Beaker Simulation'}
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              {language === 'si'
                ? `${selectedCompound.nameSi} (${selectedCompound.formula}) ජලය සමග ප්‍රතික්‍රියාව`
                : `Hydrolysis of ${selectedCompound.name} (${selectedCompound.formula})`}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              {language === 'si'
                ? `ඔක්සිජන් ප්‍රමාණය (${selectedCompound.anionFormula}) සහ දැල් එන්තැල්පිය අනුව ජලයේ ද්‍රාව්‍යතාව හා ප්‍රතික්‍රියාශීලීත්වය වෙනස් වන ආකාරය නිරීක්ෂණය කරන්න.`
                : `Observe how oxygen content (${selectedCompound.anionFormula}) and lattice energy dictate water solubility, temperature surge, and oxygen gas release.`}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleDropIntoWater()}
              disabled={isReacting}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                isReacting
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-emerald-500/25 active:scale-95'
              }`}
            >
              <Droplets className="w-4 h-4 text-slate-950" />
              {t.addReagent}
            </button>
            <button
              onClick={handleResetBeaker}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              {t.resetBeaker}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Vessel & Probes, Right Reagent Shelf */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Beaker & Diagnostics (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
                <h3 className="font-bold text-slate-800 text-base">{t.beakerTitle}</h3>
              </div>
              {/* Indicator Selector */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-500 font-medium hidden sm:inline">{t.indicatorTest}</span>
                <select
                  value={indicatorType}
                  onChange={(e) => setIndicatorType(e.target.value as any)}
                  className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-700 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="universal">{t.universalIndicator}</option>
                  <option value="phenolphthalein">{t.phenolphthalein}</option>
                  <option value="litmus">{t.litmus}</option>
                </select>
              </div>
            </div>

            {/* Vessel Area with Beaker & Gauges */}
            <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200/80 min-h-[380px] flex flex-col justify-end items-center overflow-hidden">
              {/* Background measurement graduations */}
              <div className="absolute left-6 top-6 bottom-6 flex flex-col justify-between text-[11px] font-mono text-slate-400 select-none pointer-events-none">
                <span>500 mL</span>
                <span>400 mL</span>
                <span>300 mL</span>
                <span>200 mL</span>
                <span>100 mL</span>
              </div>

              {/* Steam Rising Animation if hot */}
              {(isReacting || reactionComplete) && waterTemperature > 40 && (
                <div className="absolute top-10 flex gap-4 pointer-events-none">
                  <div className="w-8 h-16 bg-white/40 blur-md rounded-full steam-anim"></div>
                  <div className="w-10 h-20 bg-white/30 blur-md rounded-full steam-anim" style={{ animationDelay: '0.4s' }}></div>
                  <div className="w-6 h-14 bg-white/50 blur-md rounded-full steam-anim" style={{ animationDelay: '0.8s' }}></div>
                </div>
              )}

              {/* Glowing Splint in action */}
              {splintTesting && (
                <div className="absolute top-4 z-20 flex flex-col items-center animate-bounce">
                  <div className="flex items-center gap-1 bg-slate-900/90 text-white px-3 py-1.5 rounded-full shadow-lg border border-slate-700 text-xs font-bold">
                    <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>{language === 'si' ? 'හබල පරීක්ෂාව...' : 'Inserting Glowing Splint...'}</span>
                  </div>
                  <div className="w-1.5 h-16 bg-amber-800 rounded-sm mt-1 relative flex justify-center">
                    <div
                      className={`w-4 h-4 rounded-full -bottom-1 absolute ${
                        selectedCompound.gasEvolved === 'O2'
                          ? 'bg-amber-400 shadow-[0_0_20px_#f59e0b] animate-ping'
                          : 'bg-red-900 shadow-none'
                      }`}
                    ></div>
                  </div>
                </div>
              )}

              {/* Starch Iodide Strip dipping */}
              {starchTesting && (
                <div className="absolute top-6 z-20 flex flex-col items-center">
                  <div className="flex items-center gap-1 bg-slate-900/90 text-white px-3 py-1.5 rounded-full shadow-lg border border-slate-700 text-xs font-bold mb-2">
                    <Droplets className="w-4 h-4 text-indigo-400" />
                    <span>{language === 'si' ? 'පත්‍රිකාව ඔබමින්...' : 'Dipping Starch-Iodide Paper...'}</span>
                  </div>
                  <div
                    className={`w-6 h-28 border border-slate-300 shadow-md transition-colors duration-700 rounded-b-md ${
                      selectedCompound.peroxideFormed ? 'bg-indigo-950 border-indigo-900' : 'bg-white'
                    }`}
                  ></div>
                </div>
              )}

              {/* Dropping Reagent Solid Powder Animation */}
              {isReacting && (
                <div className="absolute top-20 z-10 flex flex-col items-center animate-bounce">
                  <div
                    className="w-10 h-10 rounded-lg shadow-lg flex items-center justify-center font-bold font-mono text-xs border border-white/50"
                    style={{ backgroundColor: selectedCompound.colorHex, color: '#1e293b' }}
                  >
                    {selectedCompound.formula}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 mt-1">
                    {language === 'si' ? 'දියවෙමින් පවතී...' : 'Dissolving...'}
                  </span>
                </div>
              )}

              {/* 3D Glass Beaker Structure */}
              <div className="relative w-64 sm:w-80 h-72 border-x-4 border-b-4 border-slate-300/80 rounded-b-3xl bg-white/20 backdrop-blur-xs flex flex-col justify-end overflow-hidden shadow-inner">
                {/* Lip / Rim of Beaker */}
                <div className="absolute top-0 left-0 right-0 h-3 border-t-2 border-slate-300 bg-slate-200/30"></div>

                {/* Beaker Markings */}
                <div className="absolute right-3 top-8 bottom-8 flex flex-col justify-between text-[10px] font-mono text-slate-400 select-none pointer-events-none">
                  <div className="flex items-center gap-1">
                    <span>— 400 mL</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>— 300 mL</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>— 200 mL</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>— 100 mL</span>
                  </div>
                </div>

                {/* Beaker Liquid Body */}
                <div
                  className={`w-full h-44 rounded-b-2xl transition-all duration-700 relative overflow-hidden border-t-2 ${getLiquidColor()}`}
                >
                  {/* Liquid Surface Meniscus */}
                  <div className="absolute top-0 inset-x-0 h-3 bg-white/25 rounded-full transform -translate-y-1"></div>

                  {/* Reactive Gas Bubbles (if O2 released) */}
                  {(isReacting || reactionComplete) &&
                    activeBubbles.map((b) => (
                      <div
                        key={b.id}
                        className="absolute bottom-2 rounded-full bg-white/90 shadow-xs bubble-anim pointer-events-none"
                        style={{
                          left: `${b.left}%`,
                          width: `${b.size}px`,
                          height: `${b.size}px`,
                          animationDelay: `${b.delay}s`,
                        }}
                      ></div>
                    ))}

                  {/* Dissolved Precipitate / Slaked lime suspension indicator */}
                  {selectedCompound.id === 'cao' && reactionComplete && (
                    <div className="absolute bottom-0 inset-x-0 h-10 bg-white/40 blur-xs flex items-center justify-center text-[10px] text-slate-700 font-medium">
                      Ca(OH)₂ {language === 'si' ? 'අවක්ෂේපය (හුණු දියර)' : 'Suspension (Limewater)'}
                    </div>
                  )}

                  {selectedCompound.id === 'mgo' && reactionComplete && (
                    <div className="absolute bottom-1 inset-x-0 flex items-center justify-center text-[10px] text-slate-600 font-medium">
                      MgO {language === 'si' ? 'දිය නොවී පතුලේ පවතී' : 'Remains insoluble at bottom'}
                    </div>
                  )}

                  {/* Center Text on Liquid */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
                    <span className="font-mono text-xs font-bold drop-shadow-xs">
                      {reactionComplete
                        ? `${selectedCompound.formula} + H₂O`
                        : isReacting
                        ? `${language === 'si' ? 'ප්‍රතික්‍රියා වේගය:' : 'Reaction:'} ${selectedCompound.reactionSpeed}`
                        : language === 'si'
                        ? 'පිරිසිදු H₂O (උදාසීන)'
                        : 'Pure Deionized H₂O'}
                    </span>
                    {reactionComplete && (
                      <span className="text-[11px] font-medium opacity-90">
                        pH: {selectedCompound.pHResult.toFixed(1)} • {waterTemperature}°C
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Probe readouts underneath beaker */}
              <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {/* Thermocouple Probe */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      waterTemperature > 35 ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">{t.temperature}</div>
                    <div className="font-mono font-bold text-sm text-slate-800">
                      {waterTemperature.toFixed(1)}°C
                      {selectedCompound.temperatureRiseC > 0 && reactionComplete && (
                        <span className="text-[11px] font-normal text-rose-500 ml-1">
                          (+{selectedCompound.temperatureRiseC}°C)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* pH Probe */}
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">{t.phMeasurement}</div>
                    <div className="font-mono font-bold text-sm text-slate-800">
                      {reactionComplete ? selectedCompound.pHResult.toFixed(2) : '7.00'}
                      <span className="text-[10px] font-medium text-slate-400 ml-1">
                        {reactionComplete && selectedCompound.pHResult > 11 ? '(Strong Base)' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Gas Detection Status */}
                <div className="col-span-2 sm:col-span-1 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedCompound.gasEvolved === 'O2' && reactionComplete
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-medium">{t.gasGenerated}</div>
                    <div className="font-mono font-bold text-sm text-slate-800">
                      {reactionComplete
                        ? selectedCompound.gasEvolved === 'O2'
                          ? 'O₂ (Gas ↑)'
                          : 'None (No Gas)'
                        : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Action Bar: Splint Test & Starch-Iodide Test */}
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleTestSplint}
                disabled={splintTesting}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all active:scale-95"
              >
                <Flame className="w-4 h-4 text-amber-600" />
                {t.testSplintBtn}
              </button>

              <button
                onClick={handleTestStarch}
                disabled={starchTesting}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold transition-all active:scale-95"
              >
                <Droplets className="w-4 h-4 text-indigo-600" />
                {t.testStarchBtn}
              </button>
            </div>

            {/* Test Results Display Feedback */}
            {splintResult && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-start gap-2 animate-fadeIn">
                <Flame className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{t.gasSplintTest}: </span>
                  {splintResult}
                </div>
              </div>
            )}

            {starchResult && (
              <div className="mt-3 p-3 rounded-xl bg-indigo-50 border border-indigo-300 text-xs text-indigo-900 flex items-start gap-2 animate-fadeIn">
                <Droplets className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{t.starchIodideTest}: </span>
                  {starchResult}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Reagent Shelf & Chemical Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Reagent Shelf */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-sm">{t.reagentShelf}</h3>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {language === 'si' ? 'පරීක්ෂා කිරීමට තෝරන්න' : 'Click to select reagent'}
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  categoryFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setCategoryFilter('oxide')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  categoryFilter === 'oxide'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                {t.filterOxide}
              </button>
              <button
                onClick={() => setCategoryFilter('peroxide')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  categoryFilter === 'peroxide'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                {t.filterPeroxide}
              </button>
              <button
                onClick={() => setCategoryFilter('superoxide')}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  categoryFilter === 'superoxide'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                {t.filterSuperoxide}
              </button>
            </div>

            {/* Reagents Grid */}
            <div className="grid grid-cols-2 gap-2 max-h-[290px] overflow-y-auto pr-1">
              {filteredCompounds.map((compound) => {
                const isSelected = selectedCompound.id === compound.id;
                return (
                  <button
                    key={compound.id}
                    onClick={() => {
                      setSelectedCompound(compound);
                      handleDropIntoWater(compound);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border border-slate-300 shadow-2xs shrink-0"
                      style={{ backgroundColor: compound.colorHex }}
                    >
                      {compound.metal}
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-xs text-slate-800 font-mono truncate">
                        {compound.formula}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {language === 'si' ? compound.nameSi : compound.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Property Card for Selected Compound */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {selectedCompound.category.toUpperCase()}
                </span>
                <h4 className="font-bold text-slate-900 text-base font-mono">
                  {selectedCompound.formula} • {language === 'si' ? selectedCompound.nameSi : selectedCompound.name}
                </h4>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                  selectedCompound.category === 'oxide'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : selectedCompound.category === 'peroxide'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {selectedCompound.anionFormula} ({selectedCompound.oxygenOxidationState})
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 block">{t.oxidationState}</span>
                <span className="font-mono font-bold text-slate-800 text-sm">
                  {selectedCompound.oxygenOxidationState}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 block">{t.bondOrder}</span>
                <span className="font-mono font-bold text-slate-800 text-sm">
                  {selectedCompound.bondOrder === 0 ? '0 (No O-O)' : selectedCompound.bondOrder}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 block">{t.magneticStatus}</span>
                <span className="font-bold text-slate-800 text-xs">
                  {selectedCompound.magneticBehavior}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-500 block">{t.gasGenerated}</span>
                <span className="font-mono font-bold text-slate-800 text-xs">
                  {selectedCompound.gasEvolved === 'O2' ? 'O₂ Gas (Bubbles)' : 'No Gas'}
                </span>
              </div>
            </div>

            {/* Solubility Note */}
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs">
              <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span>{language === 'si' ? 'ජලයේ ද්‍රාව්‍යතාව' : 'Solubility Behavior'}:</span>
              </div>
              <p className="text-slate-700">
                {language === 'si' ? selectedCompound.solubilityNoteSi : selectedCompound.solubilityNoteEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Reaction Equations & Science Breakdown (Bottom Card) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Zap className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 text-base">{t.reactionMechanism}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Equations Box */}
          <div className="space-y-4">
            <div className="bg-slate-900 text-white rounded-xl p-4 shadow-inner">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                {t.chemicalEquation}
              </span>
              <pre className="font-mono text-xs sm:text-sm text-emerald-400 whitespace-pre-wrap font-bold">
                {selectedCompound.reactionEquation}
              </pre>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {t.netIonic}
              </span>
              <span className="font-mono text-xs text-indigo-700 font-bold block">
                {selectedCompound.netIonicEquation}
              </span>
            </div>
          </div>

          {/* Conceptual Insight */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                {language === 'si' ? 'රසායනික පැහැදිලි කිරීම' : 'Scientific Explanation'}
              </h4>
              <p className="leading-relaxed">
                {language === 'si'
                  ? selectedCompound.reactionDescriptionSi
                  : selectedCompound.reactionDescriptionEn}
              </p>
            </div>

            {/* Applications List */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                {language === 'si' ? 'ප්‍රධාන ප්‍රායෝගික භාවිත:' : 'Key Applications:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCompound.keyApplications.map((app, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium"
                  >
                    • {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
