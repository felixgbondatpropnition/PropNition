import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Layers, Wallet, Shield, Code, Zap, DollarSign } from 'lucide-react';
import type { EnhancedMetrics } from '../enhanced-analysis';

interface TokenizationAnalysisSectionProps {
  metrics: EnhancedMetrics;
}

export const TokenizationAnalysisSection: React.FC<TokenizationAnalysisSectionProps> = ({ metrics }) => {
  const { tokenization } = metrics;

  const tokenizationData = [
    { name: 'Complexity', value: tokenization.complexityScore },
    { name: 'Liquidity', value: tokenization.liquidityPotential },
    { name: 'Demand', value: tokenization.investorDemand },
    { name: 'Compliance', value: tokenization.regulatoryCompliance },
    { name: 'Technical', value: tokenization.technicalReadiness },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokenization Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-4">Tokenization Metrics</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Layers className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Structure Complexity</p>
                    <p className="text-sm text-blue-700">
                      {tokenization.complexityScore < 5 ? 'Simple' :
                       tokenization.complexityScore < 7 ? 'Moderate' : 'Complex'}
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-900">{tokenization.complexityScore}/10</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Wallet className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Liquidity Potential</p>
                    <p className="text-sm text-green-700">High Trading Volume Expected</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-900">{tokenization.liquidityPotential}/10</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">Regulatory Readiness</p>
                    <p className="text-sm text-purple-700">Compliant Structure</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-purple-900">{tokenization.regulatoryCompliance}/10</span>
              </div>
            </div>
            
            {/* New section for technical recommendations */}
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold">Technical Recommendations</h4>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Code className="h-5 w-5 text-gray-700" />
                  <p className="font-medium text-gray-900">Recommended Blockchain</p>
                </div>
                <p className="text-gray-700 mb-2">{tokenization.recommendedBlockchain}</p>
                <p className="text-sm text-gray-600">
                  {tokenization.recommendedBlockchain === 'Ethereum' ? 
                    'Highest security and institutional acceptance, ideal for high-value properties.' :
                   tokenization.recommendedBlockchain === 'Polygon' ?
                    'Excellent balance of low fees, Ethereum compatibility, and strong ecosystem support.' :
                    'Selected based on your property value, location, and regulatory requirements.'}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="h-5 w-5 text-gray-700" />
                  <p className="font-medium text-gray-900">Recommended Token Standard</p>
                </div>
                <p className="text-gray-700 mb-2">{tokenization.recommendedTokenStandard}</p>
                <p className="text-sm text-gray-600">
                  {tokenization.recommendedTokenStandard.includes('ERC-1400') ? 
                    'Security token standard with built-in compliance features for regulatory requirements.' :
                    'Standard with added compliance extensions to ensure regulatory adherence while maintaining flexibility.'}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <DollarSign className="h-5 w-5 text-gray-700" />
                  <p className="font-medium text-gray-900">Recommended Token Economics</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Token Price</p>
                    <p className="text-lg font-semibold text-gray-900">${tokenization.recommendedTokenPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Token Count</p>
                    <p className="text-lg font-semibold text-gray-900">{tokenization.recommendedTokenCount.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Optimized for market accessibility and investor participation while maintaining administrative efficiency.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tokenization Readiness</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">Smart Contract Features</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold mt-0.5 mr-2 flex-shrink-0">1</div>
                  <div>
                    <p className="font-medium text-blue-800">Automated Distributions</p>
                    <p className="text-sm text-blue-700">Programmatic dividend payments to token holders</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold mt-0.5 mr-2 flex-shrink-0">2</div>
                  <div>
                    <p className="font-medium text-blue-800">Compliance Controls</p>
                    <p className="text-sm text-blue-700">KYC/AML enforcement and transfer restrictions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold mt-0.5 mr-2 flex-shrink-0">3</div>
                  <div>
                    <p className="font-medium text-blue-800">Governance Mechanisms</p>
                    <p className="text-sm text-blue-700">Voting rights for major property decisions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 text-xs font-bold mt-0.5 mr-2 flex-shrink-0">4</div>
                  <div>
                    <p className="font-medium text-blue-800">Liquidity Enhancements</p>
                    <p className="text-sm text-blue-700">Secondary market trading capabilities</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};