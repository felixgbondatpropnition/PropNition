import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Check, X, Info, ArrowRight, Building2, Globe, DollarSign, Users, ExternalLink, AlertTriangle } from 'lucide-react';
import { platforms } from '../../data/tokenizationPlatforms';
import { useNavigate } from 'react-router-dom';

type Feature = 'fees' | 'liquidity' | 'compliance' | 'support' | 'technology';

interface FeatureScore {
  score: number;
  details: string[];
}

export default function PlatformComparison() {
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const navigate = useNavigate();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Educational Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-amber-800">
              <strong>Educational Purpose Only:</strong> The platform information and comparisons presented here are for educational and informational purposes only. Not financial advice. Consult qualified professionals before making investment decisions.
            </p>
          </div>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Platform Feature Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4">Platform</th>
                  <th className="text-left p-4">Focus Areas</th>
                  <th className="text-left p-4">Min Investment</th>
                  <th className="text-left p-4">Value Range</th>
                  <th className="text-left p-4">Liquidity Score</th>
                  <th className="text-left p-4">Jurisdictions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(platforms).map(([id, platform]) => (
                  <tr key={id} className="border-t hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{platform.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {platform.focus.map((focus, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      {formatCurrency(platform.minInvestment)}
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{formatCurrency(platform.minValue)} -</div>
                        <div>{formatCurrency(platform.maxValue)}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              platform.liquidityScore >= 8 ? 'bg-green-500' :
                              platform.liquidityScore >= 6 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${platform.liquidityScore * 10}%` }}
                          />
                        </div>
                        <span className="text-sm">{platform.liquidityScore}/10</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {platform.jurisdiction.map((j, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                          >
                            {j}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Platform Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(platforms).map(([id, platform]) => (
                <div key={id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">{platform.name}</h3>
                    </div>
                    <button
                      onClick={() => setShowDetails(showDetails === id ? null : id)}
                      className="text-primary hover:text-primary-dark"
                    >
                      <Info className="h-5 w-5" />
                    </button>
                  </div>
                  {showDetails === id && (
                    <div className="mt-3 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Advantages</h4>
                          <ul className="space-y-1">
                            {platform.pros.map((pro, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Limitations</h4>
                          <ul className="space-y-1">
                            {platform.cons.map((con, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Special Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {platform.specialFeatures.map((feature, index) => (
                            <div 
                              key={index}
                              className="px-3 py-2 bg-gray-50 rounded text-sm text-gray-700"
                            >
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Website</h4>
                        <a 
                          href={platform.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark flex items-center"
                        >
                          Visit {platform.name} Website
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Selection Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-3">Key Selection Criteria</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-800">Jurisdiction Coverage</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Ensure the platform operates in your target jurisdiction and complies with local regulations.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-800">Cost Structure</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Compare platform fees, transaction costs, and ongoing maintenance expenses.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-800">Investor Access</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Consider the platform's investor network and marketing capabilities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3">Platform Comparison Checklist</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Review minimum investment requirements</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Check supported property types</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Evaluate liquidity mechanisms</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Assess technical capabilities</span>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Compare fee structures</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Need Help Deciding?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Complete our questionnaire for personalized platform recommendations based on your specific needs.
                </p>
                <button 
                  onClick={() => navigate('/questionnaire')}
                  className="text-primary hover:text-primary-dark flex items-center"
                >
                  <span className="text-sm">Start Questionnaire</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}