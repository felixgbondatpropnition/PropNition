import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowUpRight, TrendingUp, Building, Users, DollarSign, AlertTriangle, ChevronUp, ChevronDown, Activity, Info, CheckCircle } from 'lucide-react';
import PlatformRecommendations from './PlatformRecommendations';
import { calculateEnhancedMetrics } from './enhanced-analysis';
import { 
  MarketAnalysisSection,
  RiskAnalysisSection,
  TokenizationAnalysisSection,
  JurisdictionalAnalysisSection
} from './enhanced-report-sections';
import { 
  AnalysisExplanation,
  marketExplanation,
  riskExplanation,
  tokenizationExplanation,
  projectionExplanation
} from './explanation-components';
import BenchmarkPanel from './benchmark-panel';
import NextStepsComponent from './next-steps-component';
import ExitStrategiesSection from './exit-strategies/ExitStrategiesSection';
import ExecutiveSummary from './report-sections/ExecutiveSummary';
import FinancialAnalytics from './report-sections/FinancialAnalytics';
import CostBreakdown from './report-sections/CostBreakdown';
import { calculateTokenizationSuitabilityScore } from '../utils/ReportGenerator';
import { generateAIReport } from '../utils/aiReportGenerator';
import _ from 'lodash';

interface TokenizationReportProps {
  responses: any;
  additionalInfo?: string;
}

const TokenizationReport: React.FC<TokenizationReportProps> = ({ responses, additionalInfo }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'10yr' | '20yr'>('20yr');
  const [enhancedMetrics, setEnhancedMetrics] = useState<any>(null);
  const [benchmarkData, setBenchmarkData] = useState<any>(null);
  const [suitabilityAnalysis, setSuitabilityAnalysis] = useState<any>(null);
  const [aiReportData, setAiReportData] = useState<any>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(true);

  useEffect(() => {
    // Scroll to top when report is generated
    window.scrollTo(0, 0);

    // Calculate suitability score
    const analysis = calculateTokenizationSuitabilityScore(responses);
    setSuitabilityAnalysis(analysis);

    // Ensure financial data is available by providing defaults if missing
    const updatedResponses = {
      ...responses,
      propertyBasics: {
        ...responses.propertyBasics,
        valuation: {
          ...responses.propertyBasics?.valuation,
          currentValue: responses.propertyBasics?.valuation?.currentValue || 1000000
        },
        propertyType: responses.propertyBasics?.propertyType || 'Commercial office',
        location: {
          ...responses.propertyBasics?.location,
          jurisdiction: responses.propertyBasics?.location?.jurisdiction || 'United Kingdom'
        }
      },
      tokenizationGoals: {
        ...responses.tokenizationGoals,
        tokenizationPercentage: responses.tokenizationGoals?.tokenizationPercentage || 30,
        primaryMotivation: responses.tokenizationGoals?.primaryMotivation || 'Raising capital',
        timeframe: responses.tokenizationGoals?.timeframe || 'Medium-term (6-12 months)'
      },
      financialMetrics: {
        ...responses.financialMetrics,
        incomeGeneration: {
          ...responses.financialMetrics?.incomeGeneration,
          monthlyGrossIncome: responses.financialMetrics?.incomeGeneration?.monthlyGrossIncome || 8000,
          currentlyGeneratingIncome: responses.financialMetrics?.incomeGeneration?.currentlyGeneratingIncome || 'Yes'
        },
        annualOperatingExpenses: responses.financialMetrics?.annualOperatingExpenses || 38400,
        financing: {
          ...responses.financialMetrics?.financing,
          hasDebt: responses.financialMetrics?.financing?.hasDebt || 'Yes',
          loanAmount: responses.financialMetrics?.financing?.loanAmount || 700000,
          interestRate: responses.financialMetrics?.financing?.interestRate || 5.5,
          loanTerm: responses.financialMetrics?.financing?.loanTerm || 25
        },
        capRate: responses.financialMetrics?.capRate || 5.8,
        potentialRentalIncome: responses.financialMetrics?.potentialRentalIncome || 96000
      },
      propertyDetails: {
        ...responses.propertyDetails,
        occupancyRate: responses.propertyDetails?.occupancyRate || 95,
        condition: responses.propertyDetails?.condition || 'Good'
      }
    };
    
    const metrics = calculateEnhancedMetrics(updatedResponses);
    setEnhancedMetrics(metrics);
    
    const propertyType = updatedResponses?.propertyBasics?.propertyType || 'Commercial';
    const location = updatedResponses?.propertyBasics?.location?.jurisdiction || 'United Kingdom';
    
    let capRateBenchmark = 5.8;
    let expenseRatioBenchmark = 42;
    let occupancyBenchmark = 92;
    
    if (propertyType.includes('Residential')) {
      capRateBenchmark = 4.5;
      expenseRatioBenchmark = 38;
      occupancyBenchmark = 95;
    } else if (propertyType.includes('Retail')) {
      capRateBenchmark = 6.2;
      expenseRatioBenchmark = 35;
      occupancyBenchmark = 90;
    } else if (propertyType.includes('Industrial')) {
      capRateBenchmark = 5.5;
      expenseRatioBenchmark = 30;
      occupancyBenchmark = 94;
    }
    
    if (location === 'United States') {
      capRateBenchmark += 0.3;
    } else if (location === 'European Union') {
      capRateBenchmark -= 0.2;
    } else if (location === 'Asia Pacific') {
      capRateBenchmark += 0.5;
    }
    
    setBenchmarkData({
      capRate: capRateBenchmark,
      operatingExpenseRatio: expenseRatioBenchmark,
      occupancyRate: occupancyBenchmark,
      tokenizedCapRate: capRateBenchmark + 0.4,
      tokenizedOperatingExpenseRatio: expenseRatioBenchmark - 4,
      tokenizedOccupancyRate: occupancyBenchmark + 2
    });

    // Generate AI report
    setIsLoadingAI(true);
    generateAIReport(updatedResponses, additionalInfo)
      .then(reportData => {
        setAiReportData(reportData);
        setIsLoadingAI(false);
      })
      .catch(error => {
        console.error("Error generating AI report:", error);
        setIsLoadingAI(false);
      });
  }, [responses, additionalInfo]);

  if (!enhancedMetrics || !benchmarkData || !suitabilityAnalysis) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Analyzing Data</h2>
          <p className="text-gray-600">Please wait while we generate your comprehensive report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="space-y-12">
        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800">Important Notice</h3>
              <p className="text-sm text-amber-700 mt-1">
                This report is provided for educational and informational purposes only. It does not constitute financial, legal, or investment advice. 
                Always consult with qualified professionals before making any investment decisions regarding property tokenization.
              </p>
            </div>
          </div>
        </div>

        {/* Title and Date */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">
            Comprehensive Property Tokenization Analysis
          </h1>
          <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        {/* Executive Summary */}
        <div className="mb-16">
          <ExecutiveSummary responses={responses} />
        </div>

        {/* Financial Analytics */}
        <div className="mb-16">
          <FinancialAnalytics responses={responses} />
        </div>

        {/* AI-Enhanced Market Analysis */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Market Analysis</span>
                <div className="text-xs text-gray-500 flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  <span>AI-Enhanced Analysis with Live Data</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAI ? (
                <div className="py-8 text-center">
                  <p className="text-gray-600">Loading AI-enhanced market analysis...</p>
                </div>
              ) : aiReportData?.sections?.marketAnalysis ? (
                <div>
                  <div className="mb-4 text-gray-800">
                    {aiReportData.sections.marketAnalysis.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-3">{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Recent Market News</h4>
                    <ul className="space-y-2">
                      {aiReportData.marketData.news.map((item: any, index: number) => (
                        <li key={index} className="text-blue-800">
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <MarketAnalysisSection metrics={enhancedMetrics} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Risk Analysis */}
        <div className="mb-16">
          <RiskAnalysisSection metrics={enhancedMetrics} />
        </div>

        {/* AI-Enhanced Regulatory Analysis */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Jurisdictional & Regulatory Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAI ? (
                <div className="py-8 text-center">
                  <p className="text-gray-600">Loading AI-enhanced regulatory analysis...</p>
                </div>
              ) : aiReportData?.sections?.regulatoryAnalysis ? (
                <div>
                  <div className="mb-4 text-gray-800">
                    {aiReportData.sections.regulatoryAnalysis.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-3">{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Key Regulatory Information</h4>
                    <p className="text-purple-800 mb-2">
                      <span className="font-medium">Regulatory Authority:</span> {aiReportData.marketData.regulatory.authority}
                    </p>
                    <p className="text-purple-800 mb-2">
                      <span className="font-medium">Latest Update:</span> {aiReportData.marketData.regulatory.latestUpdate}
                    </p>
                    <div className="mt-3">
                      <p className="font-medium text-purple-800 mb-1">Compliance Requirements:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {aiReportData.marketData.regulatory.complianceRequirements.map((item: string, index: number) => (
                          <li key={index} className="text-purple-800">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <JurisdictionalAnalysisSection metrics={enhancedMetrics} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Advice Section (New) */}
        {aiReportData?.sections?.aiAdvice && (
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle>AI Strategic Advice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Strategic Recommendations</h3>
                  <div className="mb-4 text-gray-800">
                    {aiReportData.sections.aiAdvice.split('\n').map((paragraph: string, index: number) => (
                      <p key={index} className="mb-3">{paragraph}</p>
                    ))}
                  </div>
                  
                  {additionalInfo && (
                    <div className="mt-6 p-4 bg-white bg-opacity-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Based on Your Additional Information</h4>
                      <p className="text-gray-700">
                        "{additionalInfo}"
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Platform Recommendations */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Platform Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                We recommend scheduling discovery calls to the platforms we have recommended to compare their specific offerings and fee structures.
              </p>
              <PlatformRecommendations
                propertyDetails={{
                  type: responses?.propertyBasics?.propertyType || 'Commercial',
                  value: responses?.propertyBasics?.valuation?.currentValue || 1000000,
                  location: responses?.propertyBasics?.location?.jurisdiction || 'United Kingdom',
                  targetInvestorType: responses?.investorProfile?.targetInvestors?.type || "Institutional",
                  minInvestmentTarget: responses?.investorProfile?.targetInvestors?.minimumInvestment || 10000
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Implementation Timeline and Next Steps */}
        <div className="mb-16">
          <NextStepsComponent metrics={enhancedMetrics} responses={responses} />
        </div>

        {/* Exit Strategies */}
        <div className="mb-16">
          <ExitStrategiesSection
            propertyType={responses?.propertyBasics?.propertyType || 'Commercial'}
            propertyValue={responses?.propertyBasics?.valuation?.currentValue || 1000000}
            tokenizationPercentage={responses?.tokenizationGoals?.tokenizationPercentage || 30}
            location={responses?.propertyBasics?.location?.jurisdiction || 'United Kingdom'}
          />
        </div>

        {/* Cost Breakdown */}
        <div className="mb-16">
          <CostBreakdown responses={responses} />
        </div>

        {/* Tokenization Suitability Analysis */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Tokenization Suitability Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Property Tokenization Assessment</h3>
                  <p className="text-blue-800 mb-4">
                    Based on our comprehensive analysis of your {responses?.propertyBasics?.propertyType?.toLowerCase() || 'property'} in {responses?.propertyBasics?.location?.jurisdiction || 'your jurisdiction'}, 
                    {suitabilityAnalysis.score >= 8.5 ? (
                      " your property shows excellent potential for tokenization. The combination of strong fundamentals, favorable market conditions, and robust financial metrics indicates a high likelihood of successful tokenization."
                    ) : suitabilityAnalysis.score >= 7.5 ? (
                      " your property demonstrates strong potential for tokenization. While there are some areas that could be optimized, the overall profile suggests a good foundation for a successful tokenization project."
                    ) : suitabilityAnalysis.score >= 6.5 ? (
                      " your property shows moderate potential for tokenization. While tokenization is feasible, there are several areas that should be strengthened to enhance the likelihood of success."
                    ) : (
                      " your property may face some challenges in tokenization. We recommend addressing key areas of improvement before proceeding with tokenization."
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Key Strengths</h4>
                    <div className="space-y-2">
                      {suitabilityAnalysis.factors
                        .filter((f: any) => f.score >= 7.5)
                        .map((factor: any, index: number) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1" />
                            <p className="text-gray-700">{factor.details}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Areas for Improvement</h4>
                    <div className="space-y-2">
                      {suitabilityAnalysis.factors
                        .filter((f: any) => f.score < 7.5)
                        .map((factor: any, index: number) => (
                          <div key={index} className="flex items-start">
                            <Info className="h-4 w-4 text-blue-500 mr-2 mt-1" />
                            <div>
                              <p className="text-gray-700">{factor.details}</p>
                              <p className="text-sm text-blue-600 mt-1">
                                {factor.name === 'Property Value' ? 'Consider bundling with other properties or focusing on premium features to justify tokenization costs.' :
                                 factor.name === 'Financial Metrics' ? 'Focus on improving operational efficiency and income generation.' :
                                 factor.name === 'Occupancy & Income' ? 'Work on increasing occupancy rates and stabilizing income streams.' :
                                 'Consult with experts to develop specific improvement strategies.'}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">Next Steps Recommendation</h4>
                  <p className="text-gray-700">
                    {suitabilityAnalysis.score >= 8.5 ? (
                      "Your property is well-positioned for tokenization. We recommend proceeding with platform selection and beginning the technical implementation process. Focus on maintaining current strong performance while developing your tokenization strategy."
                    ) : suitabilityAnalysis.score >= 7.5 ? (
                      "Consider proceeding with tokenization while addressing minor improvement areas. We recommend starting with platform evaluation while simultaneously working on optimizing the identified areas for improvement."
                    ) : suitabilityAnalysis.score >= 6.5 ? (
                      "Before proceeding with tokenization, focus on strengthening the identified areas for improvement. Consider consulting with property management experts and tokenization platforms to develop specific enhancement strategies."
                    ) : (
                      "We recommend postponing tokenization plans until key challenges can be addressed. Focus on fundamental improvements in property performance and market positioning. Consider alternative financing options in the interim."
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TokenizationReport;