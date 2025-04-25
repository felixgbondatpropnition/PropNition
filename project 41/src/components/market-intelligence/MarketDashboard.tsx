import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Activity, Globe, AlertTriangle, Building2, ChevronRight, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const marketData = {
  currentSize: {
    value: 3.8,
    year: 2025,
    projectedValue: 35.0,
    projectedYear: 2034,
    cagr: 28.0
  },
  tokenizedAssets: {
    currentValue: 1.5,
    projectedValue: 3.0,
    timeline: "2025-2030"
  },
  growthData: [
    { year: 2025, value: 3.8 },
    { year: 2026, value: 5.8 },
    { year: 2027, value: 8.5 },
    { year: 2028, value: 12.0 },
    { year: 2029, value: 16.0 },
    { year: 2030, value: 20.5 },
    { year: 2031, value: 24.8 },
    { year: 2032, value: 28.9 },
    { year: 2033, value: 32.2 },
    { year: 2034, value: 35.0 }
  ],
  keyDrivers: [
    {
      name: "Liquidity Enhancement",
      impact: 85,
      description: "Increased trading volume and market depth"
    },
    {
      name: "Lower Entry Barriers",
      impact: 78,
      description: "Reduced minimum investment requirements"
    },
    {
      name: "Global Accessibility",
      impact: 72,
      description: "Cross-border investment opportunities"
    },
    {
      name: "Cost Efficiency",
      impact: 68,
      description: "Reduced transaction and management costs"
    }
  ],
  regionalData: [
    {
      region: "North America",
      marketShare: 35,
      growth: 22.4,
      maturity: "High"
    },
    {
      region: "Europe",
      marketShare: 28,
      growth: 19.8,
      maturity: "Medium-High"
    },
    {
      region: "Asia-Pacific",
      marketShare: 25,
      growth: 24.6,
      maturity: "Medium"
    },
    {
      region: "Rest of World",
      marketShare: 12,
      growth: 16.5,
      maturity: "Low"
    }
  ]
};

export default function MarketDashboard() {
  return (
    <div className="space-y-6">
      {/* Educational Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-amber-800">
              <strong>Educational Purpose Only:</strong> The market data and analysis presented here are for educational and informational purposes only. Not financial advice. Consult qualified professionals before making investment decisions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Personalized Analysis CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 mb-2">
              <strong>Get Personalized Analysis:</strong> For more detailed analysis and financial data specific to your property, complete our questionnaire to receive customized insights and recommendations.
            </p>
            <p className="text-sm text-blue-700">
              This will help you understand the tokenization landscape better and prepare you for your next steps in your tokenization journey.
            </p>
            <Link
              to="/questionnaire"
              className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Start Questionnaire
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Market Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Market Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">$3.8B</div>
            <p className="text-sm text-gray-600 mt-1">Current Market Value ({marketData.currentSize.year})</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Projected {marketData.currentSize.projectedYear}</span>
                <span className="font-semibold">${marketData.currentSize.projectedValue}B</span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-primary rounded-full"
                  style={{ width: `${(marketData.currentSize.value / marketData.currentSize.projectedValue) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Growth Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{marketData.currentSize.cagr}%</div>
            <p className="text-sm text-gray-600 mt-1">CAGR (2025-2034)</p>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                <span>Consistent growth trajectory</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Tokenized Assets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">${marketData.tokenizedAssets.currentValue}T</div>
            <p className="text-sm text-gray-600 mt-1">Total Value (2025)</p>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Target 2030</span>
                <span className="font-semibold">${marketData.tokenizedAssets.projectedValue}T</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Market Growth Trajectory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketData.growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}B`} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  name="Market Size" 
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Key Market Drivers */}
      <Card>
        <CardHeader>
          <CardTitle>Key Market Drivers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketData.keyDrivers.map((driver, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{driver.name}</h3>
                  <span className="text-sm font-semibold text-primary">{driver.impact}% Impact</span>
                </div>
                <p className="text-sm text-gray-600">{driver.description}</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${driver.impact}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Market Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Market Share Distribution</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketData.regionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="marketShare" name="Market Share %" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Regional Growth Rates</h4>
              <div className="space-y-4">
                {marketData.regionalData.map((region, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{region.region}</span>
                      <span className="text-sm text-green-600">+{region.growth}% YoY</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Market Maturity:</span>
                      <span>{region.maturity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Trends and Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Trends and Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Technological Trends</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Blockchain platform evolution
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Smart contract automation
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Integration with IoT
                </li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Regulatory Developments</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Increasing regulatory clarity
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Cross-border frameworks
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Standardization efforts
                </li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Investment Trends</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Institutional adoption
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Retail investor growth
                </li>
                <li className="flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1 text-primary" />
                  Cross-border investments
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}