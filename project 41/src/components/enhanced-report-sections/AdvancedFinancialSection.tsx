import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Shield, Info } from 'lucide-react';
import type { EnhancedMetrics } from '../enhanced-analysis';

interface AdvancedFinancialSectionProps {
  metrics: EnhancedMetrics;
}

export const AdvancedFinancialSection: React.FC<AdvancedFinancialSectionProps> = ({ metrics }) => {
  const { financial } = metrics;

  // Format numbers for display with NaN handling
  const formatPercent = (value: number) => {
    return isNaN(value) ? '0.0%' : `${value.toFixed(1)}%`;
  };
  const formatRatio = (value: number) => {
    return isNaN(value) ? '0.00' : value.toFixed(2);
  };
  const formatCurrency = (value: number) => {
    return isNaN(value) ? '$0' : `$${value.toLocaleString()}`;
  };

  // Calculate key metrics
  const noiMargin = 100 - financial.operatingExpenseRatio;
  const operatingEfficiency = noiMargin;
  const debtCoverage = financial.debtServiceCoverage;

  // Get status indicators with thresholds based on industry standards
  const getCapRateStatus = (rate: number) => {
    if (rate >= 8) return { text: "Excellent", color: "text-green-600" };
    if (rate >= 6) return { text: "Good", color: "text-blue-600" };
    if (rate >= 4) return { text: "Average", color: "text-yellow-600" };
    return { text: "Below Average", color: "text-red-600" };
  };

  const getIRRStatus = (rate: number) => {
    if (rate >= 15) return { text: "Excellent", color: "text-green-600" };
    if (rate >= 12) return { text: "Good", color: "text-blue-600" };
    if (rate >= 10) return { text: "Average", color: "text-yellow-600" };
    return { text: "Below Average", color: "text-red-600" };
  };

  const getDSCRStatus = (ratio: number) => {
    if (ratio === 0) return { text: "No Debt", color: "text-gray-600" };
    if (ratio >= 1.5) return { text: "Strong", color: "text-green-600" };
    if (ratio >= 1.25) return { text: "Good", color: "text-blue-600" };
    if (ratio >= 1.0) return { text: "Adequate", color: "text-yellow-600" };
    return { text: "Risk", color: "text-red-600" };
  };

  const getEfficiencyStatus = (value: number) => {
    if (value >= 70) return { text: "Excellent", color: "bg-green-600" };
    if (value >= 60) return { text: "Good", color: "bg-blue-600" };
    if (value >= 50) return { text: "Average", color: "bg-yellow-600" };
    return { text: "Below Average", color: "bg-red-600" };
  };

  // Get current statuses
  const capRateStatus = getCapRateStatus(financial.capRate);
  const irrStatus = getIRRStatus(financial.irr);
  const dscrStatus = getDSCRStatus(debtCoverage);
  const efficiencyStatus = getEfficiencyStatus(operatingEfficiency);

  // Prepare radar chart data with normalized values
  const radarData = [
    { metric: 'Cap Rate', value: Math.min(financial.capRate / 10, 10) },
    { metric: 'IRR', value: Math.min(financial.irr / 20, 10) },
    { metric: 'ROI', value: Math.min(financial.roi / 20, 10) },
    { metric: 'DSCR', value: debtCoverage === 0 ? 0 : Math.min(debtCoverage * 2, 10) },
    { metric: 'Cash on Cash', value: Math.min(financial.cashOnCash / 10, 10) }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Advanced Financial Analysis</span>
          <div className="text-xs text-gray-500 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            <span>Based on questionnaire responses and market data</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Key Financial Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Cap Rate</span>
                </div>
                <p className="text-2xl font-bold text-blue-900 mt-2">{formatPercent(financial.capRate)}</p>
                <p className={`text-sm ${capRateStatus.color} mt-1`}>{capRateStatus.text}</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">IRR</span>
                </div>
                <p className="text-2xl font-bold text-green-900 mt-2">{formatPercent(financial.irr)}</p>
                <p className={`text-sm ${irrStatus.color} mt-1`}>{irrStatus.text}</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800">DSCR</span>
                </div>
                <p className="text-2xl font-bold text-purple-900 mt-2">
                  {debtCoverage === 0 ? "N/A" : `${formatRatio(debtCoverage)}x`}
                </p>
                <p className={`text-sm ${dscrStatus.color} mt-1`}>{dscrStatus.text}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Additional Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Cash on Cash Return</p>
                    <p className="text-lg font-semibold">{formatPercent(financial.cashOnCash)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Break-even Occupancy</p>
                    <p className="text-lg font-semibold">{formatPercent(financial.breakEvenOccupancy)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Leverage Ratio</p>
                    <p className="text-lg font-semibold">
                      {financial.leverageRatio === 0 ? "No Debt" : formatPercent(financial.leverageRatio)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Operating Expense Ratio</p>
                    <p className="text-lg font-semibold">{formatPercent(financial.operatingExpenseRatio)}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Income Analysis</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Net Operating Income</p>
                    <p className="text-lg font-semibold">{formatCurrency(financial.noi)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Operating Expenses</p>
                    <p className="text-lg font-semibold">{formatPercent(financial.operatingExpenseRatio)} of Income</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Financial Performance Radar</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis domain={[0, 10]} />
                  <Radar
                    name="Financial Metrics"
                    dataKey="value"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Financial Health Indicators</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">NOI Margin</span>
                    <span className="text-sm font-medium">{formatPercent(noiMargin)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${getEfficiencyStatus(noiMargin).color} rounded-full h-2`}
                      style={{ width: `${Math.min(noiMargin, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Debt Coverage</span>
                    <span className="text-sm font-medium">
                      {debtCoverage === 0 ? "No Debt" : `${formatRatio(debtCoverage)}x`}
                    </span>
                  </div>
                  {debtCoverage > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${getDSCRStatus(debtCoverage).text === "Strong" ? "bg-green-600" : 
                          getDSCRStatus(debtCoverage).text === "Good" ? "bg-blue-600" : 
                          getDSCRStatus(debtCoverage).text === "Adequate" ? "bg-yellow-600" : 
                          "bg-red-600"} rounded-full h-2`}
                        style={{ width: `${Math.min(debtCoverage / 2 * 100, 100)}%` }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Operating Efficiency</span>
                    <span className="text-sm font-medium">{formatPercent(operatingEfficiency)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${efficiencyStatus.color} rounded-full h-2`}
                      style={{ width: `${Math.min(operatingEfficiency, 100)}%` }}
                    />
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