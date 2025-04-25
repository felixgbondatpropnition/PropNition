import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DollarSign, FileText, Code, Users, Shield, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { calculateImplementationCosts } from '../../utils/costCalculator';

interface CostBreakdownProps {
  responses: any;
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ responses }) => {
  const propertyValue = responses?.propertyBasics?.valuation?.currentValue || 1000000;
  const jurisdiction = responses?.propertyBasics?.location?.jurisdiction || 'United Kingdom';
  const propertyType = responses?.propertyBasics?.propertyType || 'Commercial';

  const { initialCosts: costs, totalInitialCost: totalCost, annualCosts } = calculateImplementationCosts(
    propertyValue,
    propertyType,
    jurisdiction
  );

  const pieData = [
    { name: 'Legal & Structure', value: costs.legal, color: '#2563eb' },
    { name: 'Technical Implementation', value: costs.technical, color: '#16a34a' },
    { name: 'Marketing & Distribution', value: costs.marketing, color: '#dc2626' },
    { name: 'Compliance & Regulatory', value: costs.compliance, color: '#9333ea' },
    { name: 'Platform & Integration', value: costs.platform, color: '#ea580c' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Cost Breakdown Analysis</span>
          <div className="text-xs text-gray-500 flex items-center">
            <Info className="h-3 w-3 mr-1" />
            <span>Estimated costs based on property characteristics</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Total Cost Overview */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium text-blue-900">Total Implementation Cost</h3>
            </div>
            <p className="text-3xl font-bold text-blue-700">${totalCost.toLocaleString()}</p>
            <p className="text-sm text-blue-600 mt-1">
              Approximately {((totalCost / propertyValue) * 100).toFixed(2)}% of property value
            </p>
          </div>

          {/* Cost Distribution Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Cost Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-4">Detailed Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Legal & Structure</p>
                    <p className="text-2xl font-bold text-blue-600">${costs.legal.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Entity setup, documentation, and legal framework</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Code className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Technical Implementation</p>
                    <p className="text-2xl font-bold text-green-600">${costs.technical.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Smart contracts, security audits, and infrastructure</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Marketing & Distribution</p>
                    <p className="text-2xl font-bold text-red-600">${costs.marketing.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Investor acquisition and marketing materials</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Compliance & Regulatory</p>
                    <p className="text-2xl font-bold text-purple-600">${costs.compliance.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Regulatory filings and compliance setup</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Platform & Integration</p>
                    <p className="text-2xl font-bold text-orange-600">${costs.platform.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Platform fees and integration costs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ongoing Costs */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Annual Ongoing Costs</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded-lg shadow">
                <p className="font-medium text-gray-800">Platform Fees</p>
                <p className="text-xl font-bold text-gray-900">${annualCosts.platformFees.toLocaleString()}/year</p>
                <p className="text-sm text-gray-600">0.5% of property value</p>
              </div>

              <div className="p-3 bg-white rounded-lg shadow">
                <p className="font-medium text-gray-800">Compliance & Reporting</p>
                <p className="text-xl font-bold text-gray-900">${annualCosts.compliance.toLocaleString()}/year</p>
                <p className="text-sm text-gray-600">0.3% of property value</p>
              </div>

              <div className="p-3 bg-white rounded-lg shadow">
                <p className="font-medium text-gray-800">Technical Maintenance</p>
                <p className="text-xl font-bold text-gray-900">${annualCosts.technical.toLocaleString()}/year</p>
                <p className="text-sm text-gray-600">0.2% of property value</p>
              </div>
            </div>
          </div>

          {/* Methodology Note */}
          <div className="text-sm text-gray-500">
            <p>
              Cost estimates are based on current market rates and typical implementation requirements for {propertyType.toLowerCase()} 
              properties in {jurisdiction}. Actual costs may vary based on specific requirements, complexity, and chosen service providers. 
              All estimates include standard implementation components but may require adjustment for unique property characteristics or 
              special requirements.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBreakdown;