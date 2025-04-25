import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Shield, TrendingDown } from 'lucide-react';
import type { EnhancedMetrics } from '../enhanced-analysis';

interface RiskAnalysisSectionProps {
  metrics: EnhancedMetrics;
}

export const RiskAnalysisSection: React.FC<RiskAnalysisSectionProps> = ({ metrics }) => {
  const { risk } = metrics;

  const riskData = [
    { risk: 'Market', value: risk.marketRisk },
    { risk: 'Property', value: risk.propertyRisk },
    { risk: 'Financial', value: risk.financialRisk },
    { risk: 'Regulatory', value: risk.regulatoryRisk },
    { risk: 'Operational', value: risk.operationalRisk },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Risk Profile</h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Composite Risk Score</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-900">{risk.compositeScore.toFixed(1)}/10</span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${(risk.compositeScore / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(risk).map(([key, value]) => {
                  if (key !== 'compositeScore') {
                    return (
                      <div key={key} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-lg font-semibold mt-1">{value.toFixed(1)}/10</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Risk Distribution</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={riskData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="risk" />
                  <PolarRadiusAxis domain={[0, 10]} />
                  <Radar
                    name="Risk Level"
                    dataKey="value"
                    stroke="#dc2626"
                    fill="#dc2626"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};