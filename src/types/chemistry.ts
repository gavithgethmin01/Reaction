export type SpeciesCategory = 'oxide' | 'peroxide' | 'superoxide';

export interface ChemicalCompound {
  id: string;
  name: string;
  nameSi: string;
  formula: string;
  category: SpeciesCategory;
  metal: string;
  group: 1 | 2;
  colorName: string;
  colorHex: string;
  molarMass: number; // g/mol
  oxygenContentPercent: number; // mass %
  oxygenOxidationState: string;
  anionFormula: string;
  anionName: string;
  bondOrder: number;
  magneticBehavior: 'Diamagnetic' | 'Paramagnetic';
  solubilityCategory: 'completely_soluble_reacts' | 'sparingly_soluble' | 'insoluble_slow';
  solubilityValue: string;
  solubilityNoteEn: string;
  solubilityNoteSi: string;
  reactionEquation: string;
  netIonicEquation: string;
  reactionDescriptionEn: string;
  reactionDescriptionSi: string;
  reactionSpeed: 'instant_violent' | 'vigorous_fast' | 'moderate' | 'slow';
  temperatureRiseC: number; // approx temp increase in typical lab beaker test
  gasEvolved: 'O2' | 'None';
  peroxideFormed: boolean;
  splintTestResultEn: string;
  splintTestResultSi: string;
  starchIodideTestEn: string;
  starchIodideTestSi: string;
  indicatorColorUniversal: string; // hex
  pHResult: number;
  latticeEnergyKjMol: number;
  hydrationEnthalpyKjMol: number;
  keyApplications: string[];
}

export type Language = 'en' | 'si';

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionSi: string;
  optionsEn: string[];
  optionsSi: string[];
  correctAnswer: number;
  explanationEn: string;
  explanationSi: string;
}
