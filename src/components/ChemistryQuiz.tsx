import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Language } from '../types/chemistry';
import { QUIZ_QUESTIONS } from '../data/compoundsData';
import { TRANSLATIONS } from '../data/translations';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

interface ChemistryQuizProps {
  language: Language;
}

export const ChemistryQuiz: React.FC<ChemistryQuizProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2 border border-blue-200">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              {language === 'si' ? 'අකාබනික රසායන දැනුම පරීක්ෂාව' : 'Inorganic Chemistry Mastery Assessment'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.quizTitle}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              {language === 'si'
                ? 'ඔක්සයිඩ, පෙරොක්සයිඩ හා සුපර්ඔක්සයිඩ වල ද්‍රාව්‍යතාව, බන්ධන හා ප්‍රතික්‍රියා පිළිබඳ ඔබේ දැනුම මැන බලන්න.'
                : 'Test your understanding of oxygen oxidation states, water solubility trends, disproportionation, and molecular orbitals.'}
            </p>
          </div>

          {/* Score Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center shrink-0">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">{t.quizScore}</span>
            <span className="font-mono font-black text-xl text-blue-600">
              {score} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      {!quizCompleted ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
            <span className="font-bold">
              {language === 'si' ? 'ප්‍රශ්නය' : 'Question'} {currentQuestionIndex + 1} of{' '}
              {QUIZ_QUESTIONS.length}
            </span>
            <div className="w-36 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question Title */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {language === 'si' ? currentQ.questionSi : currentQ.questionEn}
          </h3>

          {/* Options List */}
          <div className="space-y-3">
            {(language === 'si' ? currentQ.optionsSi : currentQ.optionsEn).map((option: string, idx: number) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctAnswer;

              let buttonStyle = 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 hover:border-slate-300 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30 font-bold';
                } else if (isSelected && !isCorrect) {
                  buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-500/30';
                } else {
                  buttonStyle = 'border-slate-200 bg-slate-50/30 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                buttonStyle = 'border-blue-600 bg-blue-50/70 text-blue-950 ring-2 ring-blue-500/20 font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${buttonStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Submit / Next Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {!isAnswerSubmitted
                ? language === 'si'
                  ? 'පිළිතුරක් තෝරා තහවුරු කරන්න'
                  : 'Select an option to confirm'
                : ''}
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                  selectedOption === null
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 active:scale-95'
                }`}
              >
                {language === 'si' ? 'පිළිතුර තහවුරු කරන්න' : 'Submit Answer'}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md active:scale-95 transition-all"
              >
                <span>{currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? (language === 'si' ? 'ප්‍රතිඵල බලන්න' : 'View Results') : t.nextQuestion}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Explanation Box on submit */}
          {isAnswerSubmitted && (
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                selectedOption === currentQ.correctAnswer
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="font-bold mb-1 flex items-center gap-1.5">
                {selectedOption === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'si' ? 'නිවැරදියි!' : 'Correct!'}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>{language === 'si' ? 'වැරදියි - පැහැදිලි කිරීම:' : 'Incorrect - Explanation:'}</span>
                  </>
                )}
              </div>
              <p>{language === 'si' ? currentQ.explanationSi : currentQ.explanationEn}</p>
            </div>
          )}
        </div>
      ) : (
        /* Results Celebration Card */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Award className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900">
              {score >= 5
                ? language === 'si'
                  ? 'විශිෂ්ටයි! ඔබ අකාබනික රසායනය ප්‍රගුණ කර ඇත!'
                  : 'Outstanding! Master of Inorganic Chemistry!'
                : language === 'si'
                ? 'හොඳ උත්සාහයක්! නැවත උත්සාහ කර බලන්න.'
                : 'Good Job! Review the concepts and try again.'}
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              {language === 'si'
                ? `ඔබ ප්‍රශ්න ${QUIZ_QUESTIONS.length} කින් ${score} ක් නිවැරදිව පිළිතුරු ලබාදුනි.`
                : `You scored ${score} out of ${QUIZ_QUESTIONS.length} correct.`}
            </p>
          </div>

          <button
            onClick={handleRestartQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-500/25 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            {t.restartQuiz}
          </button>
        </div>
      )}
    </div>
  );
};
