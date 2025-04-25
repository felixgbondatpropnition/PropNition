import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { TrendingUp, Building2, Globe, Shield, Info, DollarSign, ArrowUpRight } from 'lucide-react';

interface ExecutiveSummaryProps {
  responses: any;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ responses }) => {
  // Extract base values with fallbacks
  const propertyValue = responses?.propertyBasics?.valuation?.currentValue || 1200000;
  const propertyType = responses?.propertyBasics?.propertyType || 'Retail space';
  const location = responses?.propertyBasics?.location?.jurisdiction || 'United States';
  const tokenizationPercentage = responses?.tokenizationGoals?.tokenizationPercentage || 78;
  
  // Calculate monthly and annual income with proper validation
  const isGeneratingIncome = responses?.financialMetrics?.incomeGeneration?.currentlyGeneratingIncome === 'Yes';
  const monthlyIncomeInput = responses?.financialMetrics?.incomeGeneration?.monthlyGrossIncome;
  let monthlyIncome = 0;
  
  if (isGeneratingIncome && monthlyIncomeInput) {
    if (monthlyIncomeInput !== 'Not Sure' && monthlyIncomeInput !== 'None') {
      const cleanedInput = monthlyIncomeInput.toString().replace(/[^\d.-]/g, '');
      monthlyIncome = parseFloat(cleanedInput) || 0;
    }
  }
  
  const annualIncome = monthlyIncome * 12;
  
  // Calculate operating expenses with fallback to 40% of annual income
  const operatingExpenses = responses?.financialMetrics?.annualOperatingExpenses || (annualIncome * 0.4);
  
  // Calculate NOI (Net Operating Income)
  const noi = Math.max(0, annualIncome - operatingExpenses);
  
  // Calculate Cap Rate with validation
  const capRate = propertyValue > 0 ? ((noi / propertyValue) * 100) : 0;

  // Calculate debt metrics
  const hasDebt = responses?.financialMetrics?.mortgages?.hasMortgage === 'Yes';
  const loanAmount = hasDebt ? parseFloat(responses?.financialMetrics?.mortgages?.totalBalance || '0') : 0;
  const monthlyDebtService = hasDebt ? parseFloat(responses?.financialMetrics?.mortgages?.monthlyPayment || '0') : 0;
  const annualDebtService = monthlyDebtService * 12;
  const leverageRatio = hasDebt && propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;

  // Calculate effective yield
  const effectiveYield = noi > 0 && (propertyValue - loanAmount) > 0 ? 
    ((noi - annualDebtService) / (propertyValue - loanAmount)) * 100 : 0;

  // Calculate tokenized amount and metrics
  const tokenizedAmount = (propertyValue * (tokenizationPercentage / 100));
  const tokenizedEquity = tokenizedAmount - (tokenizedAmount * (leverageRatio / 100));
  const projectedAnnualReturn = effectiveYield > 0 ? effectiveYield : capRate;
  
  const lastAppraisal = responses?.propertyBasics?.valuation?.lastAppraisalDate || '6-12 months ago';

  // Ensure all numbers are valid before display
  const formatNumber = (num: number) => {
    return isNaN(num) ? 0 : num;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Executive Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <Building2 className="h-8 w-8 text-primary" />
              <ArrowUpRight className="h-4 w-4 text-success" />
            </div>
            <p className="text-sm text-gray-600 mt-4">Property Value</p>
            <h3 className="text-2xl font-bold">${formatNumber(propertyValue).toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">Current market valuation</p>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Last professional appraisal was {lastAppraisal}
                {hasDebt && ` • ${formatNumber(leverageRatio).toFixed(1)}% LTV`}
              </p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <TrendingUp className="h-8 w-8 text-secondary" />
              <ArrowUpRight className="h-4 w-4 text-success" />
            </div>
            <p className="text-sm text-gray-600 mt-4">Tokenized Amount</p>
            <h3 className="text-2xl font-bold">${formatNumber(tokenizedAmount).toLocaleString()}</h3>
            <p className="text-xs text-gray-500 mt-1">{tokenizationPercentage}% of property value</p>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Net equity: ${formatNumber(tokenizedEquity).toLocaleString()}
                {projectedAnnualReturn > 0 && ` • ${formatNumber(projectedAnnualReturn).toFixed(1)}% proj. return`}
              </p>
            </div>
          </div>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <AlertTitle className="text-blue-800">Investment Overview</AlertTitle>
          <AlertDescription className="text-blue-700">
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="font-medium">Property Type</p>
                <p className="text-sm">{propertyType}</p>
                <p className="text-xs mt-1">Selected in Basic Property Details section</p>
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm">{location}</p>
                <p className="text-xs mt-1">Jurisdiction selected in Basic Property Details</p>
              </div>
              <div>
                <p className="font-medium">Tokenization %</p>
                <p className="text-sm">{tokenizationPercentage}%</p>
                <p className="text-xs mt-1">From Tokenization Goals section</p>
              </div>
              <div>
                <p className="font-medium">Operating Expense Ratio</p>
                <p className="text-sm">{formatNumber((operatingExpenses / annualIncome) * 100).toFixed(2)}%</p>
                <p className="text-xs mt-1">Calculated from reported operating expenses</p>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default ExecutiveSummary;