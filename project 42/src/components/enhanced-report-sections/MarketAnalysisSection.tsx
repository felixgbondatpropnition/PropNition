import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Activity, LineChart as LineChartIcon, Building2, Globe, Info } from 'lucide-react';
import type { EnhancedMetrics } from '../enhanced-analysis';

interface MarketAnalysisSectionProps {
  metrics: EnhancedMetrics;
}

export const MarketAnalysisSection: React.FC<MarketAnalysisSectionProps> = ({ metrics }) => {
  const { market, jurisdiction } = metrics;

  const getJurisdictionAnalysis = (jurisdiction: string) => {
    const analyses = {
      'United States': {
        marketSize: '$3.8 billion (2025)',
        projectedSize: '$35 billion by 2034',
        cagr: '28.0%',
        keyDrivers: [
          'Fractional ownership democratization',
          'Strong institutional confidence (67% allocation plans)',
          'Robust blockchain infrastructure',
          'High liquidity (19.50% CAGR)'
        ],
        trends: [
          { year: '2025', value: 3800 },
          { year: '2027', value: 8500 },
          { year: '2029', value: 16000 },
          { year: '2031', value: 24800 },
          { year: '2034', value: 35000 }
        ]
      },
      'United Kingdom': {
        marketSize: '£3.8 billion (2025)',
        projectedSize: '£35 billion by 2034',
        cagr: '28.0%',
        keyDrivers: [
          'Off-market transactions growth (22.3% of sales)',
          'Rapid capital pooling capabilities',
          'Strong institutional participation',
          'FCA regulatory framework'
        ],
        trends: [
          { year: '2025', value: 3800 },
          { year: '2027', value: 8500 },
          { year: '2029', value: 16000 },
          { year: '2031', value: 24800 },
          { year: '2034', value: 35000 }
        ]
      },
      'European Union': {
        marketSize: '€3.8 billion (2025)',
        projectedSize: '€35 billion by 2034',
        cagr: '28.0%',
        keyDrivers: [
          'MiCA regulatory framework implementation',
          'Strong institutional adoption',
          'Cross-border transaction capabilities',
          'ESG integration focus'
        ],
        trends: [
          { year: '2025', value: 3800 },
          { year: '2027', value: 8500 },
          { year: '2029', value: 16000 },
          { year: '2031', value: 24800 },
          { year: '2034', value: 35000 }
        ]
      },
      'Asia Pacific': {
        marketSize: '$3.8 billion (2025)',
        projectedSize: '$35 billion by 2034',
        cagr: '28.0%',
        keyDrivers: [
          'Strong retail investor participation',
          'Advanced digital infrastructure',
          'Regulatory innovation in key markets',
          'Cross-border investment flows'
        ],
        trends: [
          { year: '2025', value: 3800 },
          { year: '2027', value: 8500 },
          { year: '2029', value: 16000 },
          { year: '2031', value: 24800 },
          { year: '2034', value: 35000 }
        ]
      },
      'Middle East': {
        marketSize: '$3.8 billion (2025)',
        projectedSize: '$35 billion by 2034',
        cagr: '28.0%',
        keyDrivers: [
          'Strong institutional adoption (82% participation)',
          'Regulatory sandboxes in key markets',
          'High liquidity in major centers',
          'Cross-border investment focus'
        ],
        trends: [
          { year: '2025', value: 3800 },
          { year: '2027', value: 8500 },
          { year: '2029', value: 16000 },
          { year: '2031', value: 24800 },
          { year: '2034', value: 35000 }
        ]
      }
    };

    return analyses[jurisdiction as keyof typeof analyses] || analyses['United Kingdom'];
  };

  const jurisdictionData = getJurisdictionAnalysis(jurisdiction.regulatoryFramework?.primaryAuthority || 'United Kingdom');

  const economicData = [
    { name: 'GDP Growth', value: market.economicIndicators.gdpGrowth },
    { name: 'Employment', value: market.economicIndicators.employmentRate / 10 },
    { name: 'Interest Rate', value: market.economicIndicators.interestRate },
    { name: 'Inflation', value: market.economicIndicators.inflationRate }
  ];

  // Custom formatter for tooltip values
  const formatTooltipValue = (value: any) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0';
    }
    return `${value.toLocaleString()} M`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Market Analysis</span>
          <div className="text-xs text-gray-500 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            <span>Approximate market indicators based on current data</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Market Overview</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Current Market Size</p>
                    <p className="text-sm text-blue-700">{jurisdictionData.marketSize}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Projected Size</p>
                    <p className="text-sm text-green-700">{jurisdictionData.projectedSize}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">CAGR</p>
                    <p className="text-sm text-purple-700">{jurisdictionData.cagr}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Key Market Drivers</h4>
              <div className="space-y-2">
                {jurisdictionData.keyDrivers.map((driver, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-700">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{driver}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Market Growth Trajectory</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={jurisdictionData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatTooltipValue(value)} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Market Size"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-semibold mb-4">Economic Indicators</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={economicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => value !== undefined && value !== null && !isNaN(value) ? value.toFixed(1) : '0'} />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {jurisdiction.regulatoryFramework && (
          <div className="mt-8">
            <h4 className="font-semibold mb-4">Regulatory Landscape</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-2">Key Legislation</h5>
                <ul className="space-y-2 text-sm">
                  {jurisdiction.regulatoryFramework.keyLegislation?.map((law: any, index: number) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{law.name}</span>
                      <ul className="ml-4 mt-1">
                        {law.key_provisions?.map((provision: string, i: number) => (
                          <li key={i} className="text-gray-600">• {provision}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-2">Implementation Timeline</h5>
                <div className="space-y-2 text-sm">
                  {jurisdiction.implementationTimeline?.legalStructure && (
                    <div>
                      <p className="font-medium">Legal Setup: {jurisdiction.implementationTimeline.legalStructure.timeframe}</p>
                      <p className="text-gray-600">Complexity: {jurisdiction.implementationTimeline.legalStructure.complexity}</p>
                    </div>
                  )}
                  {jurisdiction.implementationTimeline?.regulatoryCompliance && (
                    <div>
                      <p className="font-medium">Regulatory Compliance: {jurisdiction.implementationTimeline.regulatoryCompliance.timeframe}</p>
                      <p className="text-gray-600">Complexity: {jurisdiction.implementationTimeline.regulatoryCompliance.complexity}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};