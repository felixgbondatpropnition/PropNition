import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { DollarSign, TrendingUp, Shield, Building2, Info, Activity, ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';

interface FinancialAnalyticsProps {
  responses: any;
}

const FinancialAnalytics: React.FC<FinancialAnalyticsProps> = ({ responses }) => {
  // Extract and validate financial data
  const propertyValue = responses?.propertyBasics?.valuation?.currentValue || 0;
  const isGeneratingIncome = responses?.financialMetrics?.incomeGeneration?.currentlyGeneratingIncome === 'Yes';
  const monthlyIncomeInput = responses?.financialMetrics?.incomeGeneration?.monthlyGrossIncome;
  
  // Calculate monthly income
  let monthlyIncome = 0;
  if (isGeneratingIncome && monthlyIncomeInput) {
    if (monthlyIncomeInput !== 'Not Sure' && monthlyIncomeInput !== 'None') {
      monthlyIncome = parseFloat(monthlyIncomeInput.toString().replace(/[^\d.-]/g, '')) || 0;
    }
  }
  
  // Calculate annual metrics
  const annualIncome = monthlyIncome * 12;
  const operatingExpenses = responses?.financialMetrics?.annualOperatingExpenses || (annualIncome * 0.4);
  const noi = Math.max(0, annualIncome - operatingExpenses);
  const capRate = propertyValue > 0 ? ((noi / propertyValue) * 100) : 0;
  
  // Calculate debt metrics
  const hasDebt = responses?.financialMetrics?.mortgages?.hasMortgage === 'Yes';
  const loanAmount = hasDebt ? parseFloat(responses?.financialMetrics?.mortgages?.totalBalance || '0') : 0;
  const monthlyDebtService = hasDebt ? parseFloat(responses?.financialMetrics?.mortgages?.monthlyPayment || '0') : 0;
  const annualDebtService = monthlyDebtService * 12;
  const leverageRatio = hasDebt && propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
  
  // Calculate occupancy metrics
  const occupancyRate = responses?.financialMetrics?.incomeGeneration?.occupancyRate || 0;
  const operatingExpenseRatio = annualIncome > 0 ? (operatingExpenses / annualIncome) * 100 : 0;
  
  // Calculate investment metrics
  const equityInvested = propertyValue - loanAmount;
  const cashOnCash = equityInvested > 0 ? ((noi - annualDebtService) / equityInvested) * 100 : 0;

  // Prepare performance metrics for radar chart
  const performanceMetrics = [
    { metric: 'Cap Rate', value: Math.min(capRate / 10, 10) },
    { metric: 'Occupancy', value: Math.min(occupancyRate / 10, 10) },
    { metric: 'Cash Flow', value: Math.min(cashOnCash / 10, 10) },
    { metric: 'Debt Coverage', value: Math.min(dscr * 2, 10) },
    { metric: 'Efficiency', value: Math.min((100 - operatingExpenseRatio) / 10, 10) }
  ];

  // Prepare income breakdown data
  const incomeBreakdown = [
    { category: 'Gross Income', amount: annualIncome },
    { category: 'Operating Expenses', amount: operatingExpenses },
    { category: 'NOI', amount: noi },
    { category: 'Debt Service', amount: annualDebtService }
  ];

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Helper function to format percentages
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Helper function to determine metric status
  const getMetricStatus = (metric: string, value: number) => {
    const thresholds = {
      capRate: { good: 7, average: 5 },
      dscr: { good: 1.25, average: 1.0 },
      occupancy: { good: 90, average: 80 },
      expense: { good: 40, average: 50 },
      leverage: { good: 65, average: 75 }
    };

    let status = { color: 'text-red-600', icon: <ArrowDownRight className="h-4 w-4" /> };
    
    switch(metric) {
      case 'capRate':
        if (value >= thresholds.capRate.good) status = { color: 'text-green-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        else if (value >= thresholds.capRate.average) status = { color: 'text-yellow-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        break;
      case 'dscr':
        if (value >= thresholds.dscr.good) status = { color: 'text-green-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        else if (value >= thresholds.dscr.average) status = { color: 'text-yellow-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        break;
      case 'occupancy':
        if (value >= thresholds.occupancy.good) status = { color: 'text-green-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        else if (value >= thresholds.occupancy.average) status = { color: 'text-yellow-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        break;
      case 'expense':
        if (value <= thresholds.expense.good) status = { color: 'text-green-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        else if (value <= thresholds.expense.average) status = { color: 'text-yellow-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        break;
      case 'leverage':
        if (value <= thresholds.leverage.good) status = { color: 'text-green-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        else if (value <= thresholds.leverage.average) status = { color: 'text-yellow-600', icon: <ArrowUpRight className="h-4 w-4" /> };
        break;
    }
    
    return status;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Financial Analytics</span>
          <div className="text-xs text-gray-500 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            <span>Based on provided financial data</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Data Completeness Notice */}
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-800 font-medium">Financial Data Notice</p>
                <p className="text-sm text-amber-700 mt-1">
                  {!isGeneratingIncome && "Income-related metrics are not shown as the property is not currently generating income. "}
                  {!hasDebt && "Debt-related metrics are not shown as the property has no current debt. "}
                  For more accurate analysis, ensure all financial information is provided in the questionnaire.
                </p>
              </div>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Cap Rate</span>
                </div>
                <div className={getMetricStatus('capRate', capRate).color}>
                  {getMetricStatus('capRate', capRate).icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-2">{formatPercent(capRate)}</p>
              <p className="text-sm text-blue-700 mt-1">Net Operating Income Yield</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">DSCR</span>
                </div>
                <div className={getMetricStatus('dscr', dscr).color}>
                  {getMetricStatus('dscr', dscr).icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-2">
                {dscr === 0 ? 'N/A' : `${dscr.toFixed(2)}x`}
              </p>
              <p className="text-sm text-green-700 mt-1">Debt Service Coverage</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Cash on Cash</span>
                </div>
                <div className={cashOnCash >= 8 ? 'text-green-600' : 'text-yellow-600'}>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-900 mt-2">{formatPercent(cashOnCash)}</p>
              <p className="text-sm text-purple-700 mt-1">Cash Return on Equity</p>
            </div>
          </div>

          {/* Financial Performance Radar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Performance Overview</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={performanceMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis domain={[0, 10]} />
                    <Radar
                      name="Performance"
                      dataKey="value"
                      stroke="#2563eb"
                      fill="#2563eb"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Income Breakdown</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="amount" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Operating Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Occupancy Rate</span>
                    <span className={getMetricStatus('occupancy', occupancyRate).color}>
                      {formatPercent(occupancyRate)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 rounded-full h-2"
                      style={{ width: `${Math.min(occupancyRate, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Operating Expense Ratio</span>
                    <span className={getMetricStatus('expense', operatingExpenseRatio).color}>
                      {formatPercent(operatingExpenseRatio)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-green-600 rounded-full h-2"
                      style={{ width: `${Math.min(operatingExpenseRatio, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Debt Profile</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Leverage Ratio</span>
                    <span className={getMetricStatus('leverage', leverageRatio).color}>
                      {formatPercent(leverageRatio)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-purple-600 rounded-full h-2"
                      style={{ width: `${Math.min(leverageRatio, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Annual Debt Service</p>
                    <p className="text-lg font-semibold">{formatCurrency(annualDebtService)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Loan Balance</p>
                    <p className="text-lg font-semibold">{formatCurrency(loanAmount)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialAnalytics;