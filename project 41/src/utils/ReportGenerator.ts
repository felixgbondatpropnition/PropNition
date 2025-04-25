// Report Generator for Property Tokenization
import { formatCurrency, formatNumber } from './formatters';
import { platforms } from '../data/tokenizationPlatforms';

// Add scoring weights for different factors
const SCORING_WEIGHTS = {
  propertyValue: 0.15,
  propertyType: 0.12,
  location: 0.15,
  financialMetrics: 0.15,
  marketConditions: 0.10,
  regulatoryEnvironment: 0.12,
  propertyCondition: 0.13,
  occupancyAndIncome: 0.10,
  debtAndLeverage: 0.08
};

const calculateTokenizationSuitabilityScore = (responses: any): { score: number; factors: any[] } => {
  let totalScore = 0;
  const factors: any[] = [];

  // Property Value Score (0-10)
  const propertyValue = responses?.propertyBasics?.valuation?.currentValue || 0;
  let valueScore = 0;
  if (propertyValue >= 10000000) valueScore = 8.5;
  else if (propertyValue >= 5000000) valueScore = 8.0;
  else if (propertyValue >= 2000000) valueScore = 7.5;
  else if (propertyValue >= 1000000) valueScore = 7.0;
  else if (propertyValue >= 500000) valueScore = 6.5;
  else valueScore = 6.0;
  
  factors.push({
    name: 'Property Value',
    score: valueScore,
    weight: SCORING_WEIGHTS.propertyValue,
    details: `${formatCurrency(propertyValue)} - ${valueScore >= 8 ? 'Excellent' : valueScore >= 7 ? 'Good' : 'Moderate'} value range for tokenization`
  });

  // Property Type Score (0-10)
  const propertyType = responses?.propertyBasics?.propertyType || '';
  const propertyTypeScores: { [key: string]: number } = {
    'Commercial office': 8.5,
    'Multi-family residential': 8.2,
    'Mixed-use': 8.0,
    'Retail space': 7.8,
    'Industrial': 7.8,
    'Hotel/Resort': 7.2,
    'Single-family residential': 6.8,
    'Student housing': 7.0,
    'Senior living': 7.0,
    'Self-storage': 6.8,
    'Data center': 7.8,
    'Healthcare facility': 7.5,
    'Vacant land': 6.0
  };
  const typeScore = propertyTypeScores[propertyType] || 6.8;
  
  factors.push({
    name: 'Property Type',
    score: typeScore,
    weight: SCORING_WEIGHTS.propertyType,
    details: `${propertyType} - ${typeScore >= 8 ? 'Highly suitable' : typeScore >= 7.5 ? 'Well-suited' : 'Moderately suited'} for tokenization`
  });

  // Location Score (0-10)
  const location = responses?.propertyBasics?.location?.jurisdiction || '';
  const locationBaseScores: { [key: string]: number } = {
    'United Kingdom': 8.5,
    'United States': 8.5,
    'European Union': 8.2,
    'Asia Pacific': 7.8,
    'Middle East': 8.2,
    'Other': 6.8
  };
  const locationScore = locationBaseScores[location] || 6.8;
  
  factors.push({
    name: 'Location',
    score: locationScore,
    weight: SCORING_WEIGHTS.location,
    details: `${location} - ${locationScore >= 8 ? 'Strong' : locationScore >= 7.5 ? 'Favorable' : 'Developing'} regulatory framework`
  });

  // Financial Metrics Score (0-10)
  const monthlyIncome = responses?.financialMetrics?.incomeGeneration?.monthlyGrossIncome || 0;
  const annualIncome = monthlyIncome * 12;
  const operatingExpenses = responses?.financialMetrics?.annualOperatingExpenses || (annualIncome * 0.4);
  const noi = annualIncome - operatingExpenses;
  const capRate = (noi / propertyValue) * 100;
  
  let financialScore = 6.8;
  if (capRate >= 8) financialScore = 8.5;
  else if (capRate >= 6) financialScore = 8.0;
  else if (capRate >= 4) financialScore = 7.5;
  else if (capRate >= 2) financialScore = 7.0;
  
  factors.push({
    name: 'Financial Metrics',
    score: financialScore,
    weight: SCORING_WEIGHTS.financialMetrics,
    details: `Cap Rate: ${capRate.toFixed(2)}% - ${financialScore >= 8 ? 'Excellent' : financialScore >= 7.5 ? 'Strong' : 'Adequate'} financial metrics`
  });

  // Market Conditions Score (0-10)
  const areaType = responses?.propertyBasics?.location?.areaType || '';
  const marketScores: { [key: string]: number } = {
    'Urban core': 8.5,
    'Urban fringe': 8.0,
    'Suburban prime': 7.8,
    'Suburban secondary': 7.2,
    'Rural developed': 6.8,
    'Rural undeveloped': 6.2
  };
  const marketScore = marketScores[areaType] || 6.8;
  
  factors.push({
    name: 'Market Conditions',
    score: marketScore,
    weight: SCORING_WEIGHTS.marketConditions,
    details: `${areaType} - ${marketScore >= 8 ? 'Premium' : marketScore >= 7.5 ? 'Strong' : 'Moderate'} market location`
  });

  // Regulatory Environment Score (0-10)
  const regulatoryScore = locationScore * 0.95; // Slightly lower than location score
  
  factors.push({
    name: 'Regulatory Environment',
    score: regulatoryScore,
    weight: SCORING_WEIGHTS.regulatoryEnvironment,
    details: `${regulatoryScore >= 8 ? 'Well-established' : regulatoryScore >= 7.5 ? 'Developed' : 'Emerging'} regulatory framework`
  });

  // Property Condition Score (0-10)
  const condition = responses?.propertyDetails?.condition || '';
  const conditionScores: { [key: string]: number } = {
    'Excellent': 9.0,
    'Good': 8.0,
    'Fair': 7.0,
    'Needs Renovation': 6.0
  };
  const conditionScore = conditionScores[condition] || 7.0;
  
  factors.push({
    name: 'Property Condition',
    score: conditionScore,
    weight: SCORING_WEIGHTS.propertyCondition,
    details: `${condition} condition - ${conditionScore >= 8 ? 'Optimal' : conditionScore >= 7 ? 'Good' : 'Acceptable'} for tokenization`
  });

  // Occupancy and Income Score (0-10)
  const occupancyRate = responses?.propertyDetails?.occupancyRate || 0;
  const isIncomeGenerating = responses?.financialMetrics?.incomeGeneration?.currentlyGeneratingIncome === 'Yes';
  
  let occupancyScore = 6.8;
  if (occupancyRate >= 95) occupancyScore = 8.5;
  else if (occupancyRate >= 90) occupancyScore = 8.0;
  else if (occupancyRate >= 85) occupancyScore = 7.5;
  else if (occupancyRate >= 80) occupancyScore = 7.0;
  
  if (!isIncomeGenerating) occupancyScore *= 0.9;
  
  factors.push({
    name: 'Occupancy & Income',
    score: occupancyScore,
    weight: SCORING_WEIGHTS.occupancyAndIncome,
    details: `${occupancyRate}% occupancy${isIncomeGenerating ? ' with stable income' : ''} - ${occupancyScore >= 8 ? 'Excellent' : occupancyScore >= 7.5 ? 'Strong' : 'Moderate'} performance`
  });

  // Debt and Leverage Score (0-10)
  const hasDebt = responses?.financialMetrics?.financing?.hasDebt === 'Yes';
  const loanAmount = hasDebt ? (responses?.financialMetrics?.financing?.loanAmount || 0) : 0;
  const leverageRatio = hasDebt ? (loanAmount / propertyValue) * 100 : 0;
  
  let leverageScore = 8.5;
  if (leverageRatio > 80) leverageScore = 6.5;
  else if (leverageRatio > 70) leverageScore = 7.0;
  else if (leverageRatio > 60) leverageScore = 7.5;
  else if (leverageRatio > 50) leverageScore = 8.0;
  
  factors.push({
    name: 'Debt & Leverage',
    score: leverageScore,
    weight: SCORING_WEIGHTS.debtAndLeverage,
    details: `${leverageRatio.toFixed(1)}% LTV - ${leverageScore >= 8 ? 'Conservative' : leverageScore >= 7.5 ? 'Balanced' : 'High'} leverage`
  });

  // Calculate weighted total score
  totalScore = factors.reduce((acc, factor) => {
    return acc + (factor.score * factor.weight);
  }, 0);

  // Apply conservative scaling to ensure scores aren't too high
  totalScore = Math.min(8.9, totalScore * 0.95);

  // Round to one decimal place
  totalScore = Math.round(totalScore * 10) / 10;

  return {
    score: totalScore,
    factors: factors
  };
};

// Generate full report with all sections
const generateFullReport = (responses: any) => {
  const suitabilityAnalysis = calculateTokenizationSuitabilityScore(responses);
  
  return {
    suitabilityScore: suitabilityAnalysis.score,
    scoringFactors: suitabilityAnalysis.factors,
    propertyAnalysis: {
      type: responses?.propertyBasics?.propertyType || 'Commercial',
      value: responses?.propertyBasics?.valuation?.currentValue || 0,
      location: responses?.propertyBasics?.location?.jurisdiction || 'United Kingdom',
      condition: responses?.propertyDetails?.condition || 'Good'
    },
    financialMetrics: {
      capRate: suitabilityAnalysis.factors.find(f => f.name === 'Financial Metrics')?.score || 7.0,
      occupancy: responses?.propertyDetails?.occupancyRate || 95,
      noi: responses?.financialMetrics?.noi || 0,
      debtServiceCoverage: responses?.financialMetrics?.dscr || 1.25
    },
    recommendations: {
      platformOptions: Object.values(platforms)
        .filter(p => p.jurisdiction.includes(responses?.propertyBasics?.location?.jurisdiction || 'United Kingdom'))
        .map(p => ({
          name: p.name,
          score: 0,
          focus: p.focus,
          minInvestment: p.minInvestment
        }))
        .sort((a, b) => b.minInvestment - a.minInvestment)
        .slice(0, 3)
    }
  };
};

export { generateFullReport, calculateTokenizationSuitabilityScore };