/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LabSimulator } from './components/LabSimulator';
import { ReactivityMatrix } from './components/ReactivityMatrix';
import { SolubilityGuide } from './components/SolubilityGuide';
import { MolecularOrbitalViewer } from './components/MolecularOrbitalViewer';
import { RealWorldApplications } from './components/RealWorldApplications';
import { ChemistryQuiz } from './components/ChemistryQuiz';
import { Language } from './types/chemistry';
import { FlaskConical, Atom, Sparkles, BookOpen, Layers, Flame, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('lab');
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Render Active View */}
        {activeTab === 'lab' && <LabSimulator language={language} />}
        {activeTab === 'matrix' && <ReactivityMatrix language={language} />}
        {activeTab === 'solubility' && <SolubilityGuide language={language} />}
        {activeTab === 'mo' && <MolecularOrbitalViewer language={language} />}
        {activeTab === 'applications' && <RealWorldApplications language={language} />}
        {activeTab === 'quiz' && <ChemistryQuiz language={language} />}
      </main>

      {/* Laboratory Scientific Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-[10px]">
              O₂
            </div>
            <span className="font-semibold text-slate-700">
              OxySphere Chemistry Lab
            </span>
            <span className="text-slate-400">•</span>
            <span>
              {language === 'si'
                ? 'අකාබනික රසායන විද්‍යා අධ්‍යාපනික වැඩබිම'
                : 'Interactive Inorganic Chemistry Educational Workbench'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span>Ref: IUPAC Blue Book • Greenwood &amp; Earnshaw Chemistry of the Elements</span>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setActiveTab('matrix')}
              className="hover:text-blue-600 transition-colors"
            >
              Oxygen Trends
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className="hover:text-blue-600 transition-colors"
            >
              Reaction Lab
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="hover:text-blue-600 transition-colors"
            >
              Quiz Assessment
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
