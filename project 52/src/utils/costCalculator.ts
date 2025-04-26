// Shared cost calculator utility
export const calculateImplementationCosts = (propertyValue: number, propertyType: string, jurisdiction: string) => {
  // Base costs - aligned with NextStepsComponent and reduced by 35%
  let legalCosts = Math.min(Math.max(propertyValue * 0.00975, 16250), 21450);
  let technicalCosts = Math.min(Math.max(propertyValue * 0.00975, 13000), 19500);
  let marketingCosts = Math.min(Math.max(propertyValue * 0.0065, 9750), 13000);
  let complianceCosts = Math.min(Math.max(propertyValue * 0.0065, 9750), 16250);
  let platformCosts = Math.min(Math.max(propertyValue * 0.0065, 6500), 9750);

  // Adjust for jurisdiction
  if (jurisdiction === 'United States') {
    legalCosts *= 1.1;
    complianceCosts *= 1.15;
  } else if (jurisdiction === 'European Union') {
    legalCosts *= 1.05;
    complianceCosts *= 1.1;
  }

  // Adjust for property type
  if (propertyType.includes('Commercial')) {
    legalCosts *= 1.05;
    technicalCosts *= 1.03;
  }

  // Round to nearest thousand
  const roundToThousand = (num: number) => Math.round(num / 1000) * 1000;

  const costs = {
    legal: roundToThousand(legalCosts),
    technical: roundToThousand(technicalCosts),
    marketing: roundToThousand(marketingCosts),
    compliance: roundToThousand(complianceCosts),
    platform: roundToThousand(platformCosts)
  };

  const totalCost = Object.values(costs).reduce((a, b) => a + b, 0);

  // Calculate annual costs (also reduced by 35%)
  const annualCosts = {
    platformFees: Math.round(propertyValue * 0.00195),
    compliance: Math.round(propertyValue * 0.0013),
    technical: Math.round(propertyValue * 0.00065)
  };

  const totalAnnualCost = Object.values(annualCosts).reduce((a, b) => a + b, 0);

  return {
    initialCosts: costs,
    totalInitialCost: totalCost,
    annualCosts,
    totalAnnualCost
  };
};