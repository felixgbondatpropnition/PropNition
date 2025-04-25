import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Scale, FileText, TrendingUp, Shield, ArrowRight, Leaf, Users, Building2 } from 'lucide-react';
import type { EnhancedMetrics } from '../enhanced-analysis';

interface JurisdictionalAnalysisSectionProps {
  metrics: EnhancedMetrics;
}

export const JurisdictionalAnalysisSection: React.FC<JurisdictionalAnalysisSectionProps> = ({ metrics }) => {
  const { jurisdiction } = metrics;
  const framework = jurisdiction.regulatoryFramework || {};
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jurisdictional Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Legal Framework */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Legal Framework</h3>
              </div>
              
              {framework.primaryAuthority && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Primary Regulatory Authority</h4>
                  <p className="mt-1 text-blue-800">{framework.primaryAuthority}</p>
                </div>
              )}

              {framework.keyLegislation && (
                <div className="space-y-3">
                  <h4 className="font-medium">Key Legislation</h4>
                  {framework.keyLegislation.map((law: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <p className="font-medium text-gray-900">{law.name}</p>
                      <ul className="mt-2 space-y-1">
                        {law.key_provisions?.map((provision: string, i: number) => (
                          <li key={i} className="text-gray-600 flex items-start">
                            <ArrowRight className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                            {provision}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tax Requirements */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Tax Requirements</h3>
              </div>

              {framework.taxImplications && Object.entries(framework.taxImplications).map(([category, details]: [string, any]) => (
                <div key={category} className="p-4 border rounded-lg">
                  <h4 className="font-medium capitalize mb-2">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                  <div className="space-y-2">
                    {Object.entries(details).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1" />
                        <div>
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                          <span className="text-gray-600">{value as string}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ESG Considerations */}
          {framework.esgConsiderations && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">ESG Considerations</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Environmental */}
                <div className="p-4 bg-green-50 rounded-lg space-y-3">
                  <h4 className="font-medium text-green-900">Environmental</h4>
                  {Object.entries(framework.esgConsiderations.environmental).map(([key, items]) => (
                    <div key={key}>
                      <h5 className="text-sm font-medium text-green-800 capitalize mb-2">{key}</h5>
                      <ul className="space-y-1">
                        {(items as string[]).map((item, i) => (
                          <li key={i} className="text-sm text-green-700 flex items-start">
                            <ArrowRight className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                  <h4 className="font-medium text-blue-900">Social</h4>
                  {Object.entries(framework.esgConsiderations.social).map(([key, items]) => (
                    <div key={key}>
                      <h5 className="text-sm font-medium text-blue-800 capitalize mb-2">{key}</h5>
                      <ul className="space-y-1">
                        {(items as string[]).map((item, i) => (
                          <li key={i} className="text-sm text-blue-700 flex items-start">
                            <ArrowRight className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Governance */}
                <div className="p-4 bg-purple-50 rounded-lg space-y-3">
                  <h4 className="font-medium text-purple-900">Governance</h4>
                  {Object.entries(framework.esgConsiderations.governance).map(([key, items]) => (
                    <div key={key}>
                      <h5 className="text-sm font-medium text-purple-800 capitalize mb-2">{key}</h5>
                      <ul className="space-y-1">
                        {(items as string[]).map((item, i) => (
                          <li key={i} className="text-sm text-purple-700 flex items-start">
                            <ArrowRight className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Exit Strategies */}
          {framework.exitStrategies && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Exit Strategies</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(framework.exitStrategies).map(([strategy, details]: [string, any]) => (
                  <div key={strategy} className="p-4 border rounded-lg">
                    <h4 className="font-medium capitalize mb-3">
                      {strategy.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(details).map(([key, items]) => (
                        <div key={key}>
                          <h5 className="text-sm font-medium text-gray-700 capitalize mb-2">{key}</h5>
                          {Array.isArray(items) ? (
                            <ul className="space-y-1">
                              {items.map((item, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start">
                                  <ArrowRight className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-600">{items}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};