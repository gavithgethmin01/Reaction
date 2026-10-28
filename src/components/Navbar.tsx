import React from 'react';
import { FlaskConical, Atom, Flame, BookOpen, Layers, CheckCircle2, Globe2 } from 'lucide-react';
import { Language } from '../types/chemistry';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
}) => {
  const t = TRANSLATIONS[language];

  const tabs = [
    { id: 'lab', label: t.tabLab, icon: FlaskConical },
    { id: 'matrix', label: t.tabMatrix, icon: Layers },
    { id: 'solubility', label: t.tabSolubility, icon: Flame },
    { id: 'mo', label: t.tabMO, icon: Atom },
    { id: 'applications', label: t.tabApplications, icon: BookOpen },
    { id: 'quiz', label: t.tabQuiz, icon: CheckCircle2 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('lab')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <span className="font-mono font-black text-lg tracking-tighter">O₂</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  {t.appTitle}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Chemistry Lab
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block truncate max-w-md">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Right Action: Language Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <Globe2 className="w-4 h-4 text-slate-500 ml-1.5 mr-1" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage('si')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'si'
                    ? 'bg-white text-blue-700 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇱🇰 සිංහල
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 overflow-x-auto py-2 no-scrollbar border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
