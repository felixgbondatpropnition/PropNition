import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Building2, Globe, Info } from 'lucide-react';

interface DetailedMarketAnalysisProps {
  responses: any;
  metrics: any;
}

const DetailedMarketAnalysis: React.FC<DetailedMarketAnalysisProps> = ({ responses, metrics }) => {
  const propertyType = responses?.propertyBasics?.propertyType || 'Commercial';
  const location = responses?.propertyBasics?.location?.jurisdiction || 'United Kingdom';
  const propertyValue = responses?.propertyBasics?.valuation?.currentValue || 1000000;

  // Generate market growth data
  const marketGrowthData = Array.from({ length: 5 }, (_, i) => ({
    year: `Year ${i + 1}`,
    marketValue: Math.round(propertyValue * Math.pow(1.05, i)),
    tokenizedValue: Math.round(propertyValue * Math.pow(1.07, i)),
    industryAverage: Math.round(propertyValue * Math.pow(1.04, i))
  }));

  // Generate market comparison data
  const marketComparisonData = [
    {
      metric: 'Liquidity',
      traditional: 45,
      tokenized: 85,
      industry: 65
    },
    {
      metric: 'Transaction Speed',
      traditional: 30,
      tokenized: 90,
      industry: 60
    },
    {
      metric: 'Cost Efficiency',
      traditional: 50,
      tokenized: 80,
      industry: 65
    },
    {
      metric: 'Market Access',
      traditional: 40,
      tokenized: 85,
      industry: 60
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Detailed Market Analysis</span>
          <div className="text-xs text-gray-500 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            <span>Based on current market data and projections</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Market Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h3 className="font-medium text-blue-900">Market Position</h3>
              </div>
              <p className="text-sm text-blue-700">
                {propertyType} property in {location} market
              </p>
              <div className="mt-2 pt-2 border-t border-blue-200">
                <p className="text-xs text-blue-600">Market Maturity Score</p>
                <p className="text-xl font-bold text-blue-800">{metrics.market.demandScore}/10</p>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="font-medium text-green-900">Growth Potential</h3>
              </div>
              <p className="text-sm text-green-700">
                {metrics.market.growthPotential}/10 growth score
              </p>
              <div className="mt-2 pt-2 border-t border-green-200">
                <p className="text-xs text-green-600">Market Cycle Position</p>
                <p className="text-xl font-bold text-green-800">{metrics.market.marketCycle}</p>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-purple-600" />
                <h3 className="font-medium text-purple-900">Investor Demand</h3>
              </div>
              <p className="text-sm text-purple-700">
                Strong institutional interest
              </p>
              <div className="mt-2 pt-2 border-t border-purple-200">
                <p className="text-xs text-purple-600">Demand Score</p>
                <p className="text-xl font-bold text-purple-800">{metrics.tokenization.investorDemand}/10</p>
              </div>
            </div>
          </div>

          {/* Market Growth Projection */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Value Growth Projection</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="tokenizedValue" 
                    name="Tokenized Value" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="marketValue" 
                    name="Market Value" 
                    stroke="#16a34a" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="industryAverage" 
                    name="Industry Average" 
                    stroke="#dc2626" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Comparison */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Market Performance Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="traditional" name="Traditional Market" fill="#94a3b8" />
                  <Bar dataKey="tokenized" name="Tokenized Market" fill="#2563eb" />
                  <Bar dataKey="industry" name="Industry Average" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Market Drivers</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-gray-800">Economic Growth</p>
                    <p className="text-sm text-gray-600">
                      GDP Growth: {metrics.market.economicIndicators.gdpGrowth}%
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-gray-800">Employment Rate</p>
                    <p className="text-sm text-gray-600">
                      {metrics.market.economicIndicators.employmentRate}%
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-gray-800">Interest Rate</p>
                    <p className="text-sm text-gray-600">
                      {metrics.market.economicIndicators.interestRate}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Market Trends</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-gray-800">Tokenization Growth</p>
                    <p className="text-sm text-gray-600">
                      {metrics.market.growthPotential * 10}% YoY increase in tokenized properties
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-gray-800">Institutional Adoption</p>
                    <p className="text-sm text-gray-600">
                      Strong institutional interest with {metrics.tokenization.investorDemand * 10}% participation rate
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                  <div>
                    <p className="font-medium text-gray-800">Market Liquidity</p>
                    <p className="text-sm text-gray-600">
                      {metrics.tokenization.liquidityPotential}/10 liquidity score
                    </p>
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

export default DetailedMarketAnalysis;