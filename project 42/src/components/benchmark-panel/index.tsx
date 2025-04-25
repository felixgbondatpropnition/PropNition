import React from 'react';
import { Card, CardContent } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BenchmarkPanelProps {
  property: string;
  metrics: any;
  benchmarkData: any;
}

const BenchmarkPanel: React.FC<BenchmarkPanelProps> = ({ property, metrics, benchmarkData }) => {
  const formatData = () => {
    return [
      {
        metric: 'Cap Rate',
        property: metrics.financial.capRate,
        market: benchmarkData.capRate,
        tokenized: benchmarkData.tokenizedCapRate
      },
      {
        metric: 'Operating Expense Ratio',
        property: metrics.financial.operatingExpenseRatio,
        market: benchmarkData.operatingExpenseRatio,
        tokenized: benchmarkData.tokenizedOperatingExpenseRatio
      },
      {
        metric: 'Occupancy Rate',
        property: 95,
        market: benchmarkData.occupancyRate,
        tokenized: benchmarkData.tokenizedOccupancyRate
      }
    ];
  };

  // Custom formatter for tooltip values
  const formatTooltipValue = (value: any) => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0';
    }
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formatData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip formatter={(value) => formatTooltipValue(value)} />
            <Legend />
            <Bar dataKey="property" name="Your Property" fill="#2563eb" />
            <Bar dataKey="market" name="Market Average" fill="#16a34a" />
            <Bar dataKey="tokenized" name="Tokenized Average" fill="#eab308" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900">Your Property</h4>
          <p className="text-sm text-blue-700 mt-1">
            Performance metrics specific to your property
          </p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-900">Market Average</h4>
          <p className="text-sm text-green-700 mt-1">
            Average metrics for similar properties in your market
          </p>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900">Tokenized Average</h4>
          <p className="text-sm text-yellow-700 mt-1">
            Average metrics for tokenized properties
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkPanel;