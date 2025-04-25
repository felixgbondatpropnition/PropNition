import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, Activity, DollarSign, Info } from 'lucide-react';

const generatePredictiveData = (baseValue: number, years: number) => {
  const scenarios = {
    optimistic: { growth: 0.08, volatility: 0.02 },
    base: { growth: 0.05, volatility: 0.015 },
    conservative: { growth: 0.03, volatility: 0.01 }
  };

  return Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    const randomFactor = () => 1 + (Math.random() - 0.5) * 0.02;

    return {
      year: `Year ${year}`,
      optimistic: Math.round(baseValue * Math.pow(1 + scenarios.optimistic.growth, i) * randomFactor()),
      base: Math.round(baseValue * Math.pow(1 + scenarios.base.growth, i) * randomFactor()),
      conservative: Math.round(baseValue * Math.pow(1 + scenarios.conservative.growth, i) * randomFactor()),
      marketVolume: Math.round(1000000 * Math.pow(1.15, i) * randomFactor()),
      tokenDemand: Math.round(75 + (Math.random() * 5)),
      liquidityScore: Math.round(65 + (i * 2) + (Math.random() * 5))
    };
  });
};

export default function PredictiveAnalytics() {
  const [baseValue] = useState(1000000);
  const [projectionYears] = useState(5);
  const [data] = useState(() => generatePredictiveData(baseValue, projectionYears));

  return (
    <div className="space-y-6">
      {/* Educational Disclaimer - Subtle version */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-xs text-gray-500 text-center">
          <span className="font-medium">Educational Purpose:</span> All projections are hypothetical and for educational purposes only.
          Not financial advice. Past performance is not indicative of future results.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Projected Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">+42%</div>
            <p className="text-sm text-gray-600 mt-1">Expected 5-Year Growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Token Liquidity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">85%</div>
            <p className="text-sm text-gray-600 mt-1">Projected Liquidity Score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              Market Demand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">High</div>
            <p className="text-sm text-gray-600 mt-1">Investor Interest Level</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Value Projection Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="optimistic" 
                  name="Optimistic" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="base" 
                  name="Base Case" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="conservative" 
                  name="Conservative" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Projection Disclaimer */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                These projections are hypothetical and for educational purposes only. Actual results may vary significantly.
                Past performance is not indicative of future results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Volume Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Area
                    type="monotone"
                    dataKey="marketVolume"
                    name="Trading Volume"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Token Demand & Liquidity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="tokenDemand"
                    name="Token Demand"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="liquidityScore"
                    name="Liquidity Score"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Risk Factors & Mitigations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <h3 className="font-medium">Market Risks</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">Property value fluctuations</li>
                <li className="text-sm text-gray-600">Interest rate changes</li>
                <li className="text-sm text-gray-600">Market cycle timing</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <h3 className="font-medium">Liquidity Risks</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">Trading volume variations</li>
                <li className="text-sm text-gray-600">Market maker stability</li>
                <li className="text-sm text-gray-600">Secondary market depth</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <h3 className="font-medium">Regulatory Risks</h3>
              </div>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600">Policy changes</li>
                <li className="text-sm text-gray-600">Compliance requirements</li>
                <li className="text-sm text-gray-600">Cross-border regulations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}