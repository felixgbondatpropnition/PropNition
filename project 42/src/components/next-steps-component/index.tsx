import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, FileText, Zap, Briefcase, CheckSquare, CheckCircle, ArrowRight, Info, Building2, Globe, Shield, Code, DollarSign, Users, BarChart as ChartBar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface NextStepsComponentProps {
  metrics: any;
  responses?: any;
}

const steps = [
  {
    title: "Initial Assessment & Strategy",
    duration: "2-3 weeks",
    icon: <Clock className="h-6 w-6 text-primary" />,
    description: "Comprehensive property evaluation and tokenization strategy development",
    tasks: [
      "Complete detailed property assessment and valuation",
      "Develop comprehensive tokenization strategy",
      "Initial legal and regulatory consultation",
      "Market analysis and investor demand assessment",
      "Financial modeling and token economics design",
      "Risk assessment and mitigation planning"
    ],
    details: {
      keyMilestones: [
        "Property valuation report",
        "Initial legal opinion",
        "Market analysis report",
        "Token economics model"
      ],
      stakeholders: [
        "Property owners",
        "Legal counsel",
        "Financial advisors",
        "Tokenization platform"
      ],
      considerations: [
        "Current market conditions",
        "Regulatory environment",
        "Property characteristics",
        "Investment objectives"
      ]
    }
  },
  {
    title: "Legal Structure & Documentation",
    duration: "4-6 weeks",
    icon: <FileText className="h-6 w-6 text-blue-600" />,
    description: "Establishing the legal framework and preparing required documentation",
    tasks: [
      "Create Special Purpose Vehicle (SPV)",
      "Draft token purchase agreement",
      "Prepare offering memorandum",
      "Develop token holder rights agreement",
      "Structure governance framework",
      "Establish compliance protocols"
    ],
    details: {
      keyMilestones: [
        "SPV registration",
        "Legal documentation package",
        "Regulatory filings",
        "Compliance framework"
      ],
      stakeholders: [
        "Legal counsel",
        "Compliance officers",
        "Corporate services",
        "Tax advisors"
      ],
      considerations: [
        "Jurisdiction requirements",
        "Tax implications",
        "Investor rights",
        "Governance structure"
      ]
    }
  },
  {
    title: "Technical Implementation",
    duration: "6-8 weeks",
    icon: <Zap className="h-6 w-6 text-yellow-600" />,
    description: "Platform integration and smart contract development",
    tasks: [
      "Smart contract development and testing",
      "Security audit preparation",
      "Platform integration setup",
      "Token issuance mechanism implementation",
      "Wallet integration",
      "Testing and quality assurance"
    ],
    details: {
      keyMilestones: [
        "Smart contract deployment",
        "Security audit completion",
        "Platform integration",
        "Technical documentation"
      ],
      stakeholders: [
        "Smart contract developers",
        "Security auditors",
        "Platform technical team",
        "QA engineers"
      ],
      considerations: [
        "Security best practices",
        "Scalability requirements",
        "Integration complexity",
        "Maintenance needs"
      ]
    }
  },
  {
    title: "Marketing & Distribution",
    duration: "4-6 weeks",
    icon: <Briefcase className="h-6 w-6 text-green-600" />,
    description: "Token launch preparation and investor outreach",
    tasks: [
      "Marketing strategy development",
      "Investor presentation creation",
      "KYC/AML process setup",
      "Distribution platform configuration",
      "Investor onboarding preparation",
      "Marketing material compliance review"
    ],
    details: {
      keyMilestones: [
        "Marketing strategy approval",
        "Investor materials package",
        "KYC/AML system setup",
        "Distribution platform launch"
      ],
      stakeholders: [
        "Marketing team",
        "Compliance officers",
        "Investor relations",
        "Platform providers"
      ],
      considerations: [
        "Target investor profile",
        "Marketing restrictions",
        "Distribution channels",
        "Investor education needs"
      ]
    }
  },
  {
    title: "Launch & Ongoing Management",
    duration: "Ongoing",
    icon: <CheckSquare className="h-6 w-6 text-purple-600" />,
    description: "Token issuance and continuous property management",
    tasks: [
      "Token holder communication system",
      "Regular performance reporting",
      "Compliance monitoring",
      "Distribution management",
      "Secondary market support",
      "Investor relations maintenance"
    ],
    details: {
      keyMilestones: [
        "Token issuance completion",
        "Reporting system setup",
        "Management protocols",
        "Secondary market activation"
      ],
      stakeholders: [
        "Property managers",
        "Token administrators",
        "Compliance team",
        "Investor relations"
      ],
      considerations: [
        "Reporting requirements",
        "Distribution schedule",
        "Market making needs",
        "Holder communications"
      ]
    }
  }
];

export default function NextStepsComponent({ metrics, responses }: NextStepsComponentProps) {
  const propertyValue = responses?.propertyBasics?.valuation?.currentValue || 1000000;
  const propertyType = responses?.propertyBasics?.propertyType || 'Commercial';
  const location = responses?.propertyBasics?.location?.jurisdiction || 'United Kingdom';
  const tokenizationPercentage = responses?.tokenizationGoals?.tokenizationPercentage || 30;
  const tokenizedValue = propertyValue * (tokenizationPercentage / 100);
  const monthlyIncome = responses?.financialMetrics?.incomeGeneration?.monthlyGrossIncome || 8000;
  const annualIncome = monthlyIncome * 12;
  const operatingExpenses = responses?.financialMetrics?.annualOperatingExpenses || (annualIncome * 0.4);
  const noi = annualIncome - operatingExpenses;
  const capRate = (noi / propertyValue) * 100;
  const tokenPrice = metrics?.tokenization?.recommendedTokenPrice || 900;
  const tokenCount = metrics?.tokenization?.recommendedTokenCount || 4820;

  return (
    <div className="space-y-8">
      {/* Personalized Tokenization Roadmap */}
      <Card>
        <CardHeader>
          <CardTitle>Your Personalized Tokenization Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Strategic Overview</h3>
              <p className="text-blue-800 mb-4">
                Based on our analysis of your {propertyType.toLowerCase()} property valued at ${propertyValue.toLocaleString()} in {location}, 
                we've developed a comprehensive tokenization strategy tailored to your specific needs. Your {responses?.tokenizationGoals?.timeframe?.toLowerCase() || 'medium-term'} timeline 
                allows for thorough preparation while still moving efficiently through the tokenization process.  We recommend scheduling discovery calls to the platforms we have recommended to compare their specific offerings and fee structures.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Key Success Factors</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-blue-800">Strong property fundamentals with {capRate.toFixed(1)}% cap rate</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-blue-800">Optimal {tokenizationPercentage}% tokenization target</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-blue-800">Favorable {location} regulatory environment</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">Critical Considerations</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-blue-800">Regulatory compliance requirements</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-blue-800">Market timing and investor appetite</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-4 w-4 mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <span className="text-blue-800">Technical infrastructure needs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Strategic Recommendations</h3>
                <div className="space-y-3">
                  <div className="flex items-start text-blue-700 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    Implement a tiered investment structure with minimum purchase of {Math.ceil((50000) / tokenPrice)} tokens (${(50000).toLocaleString()})
                  </div>
                  <div className="flex items-start text-blue-700 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    Establish quarterly distribution schedule for rental income
                  </div>
                  <div className="flex items-start text-blue-700 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    Create comprehensive investor dashboard for performance tracking
                  </div>
                  <div className="flex items-start text-blue-700 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
                    Implement automated compliance monitoring system
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Token Economics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">Token Price</p>
                    <p className="text-xl font-semibold text-blue-900">${tokenPrice.toLocaleString()}</p>
                    <p className="text-xs text-blue-700">Optimized for investor accessibility</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Total Tokens</p>
                    <p className="text-xl font-semibold text-green-900">{tokenCount.toLocaleString()}</p>
                    <p className="text-xs text-green-700">Based on property value and token price</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600">Projected Yield</p>
                    <p className="text-xl font-semibold text-purple-900">{capRate.toFixed(2)}%</p>
                    <p className="text-xs text-purple-700">Based on current NOI</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-600">Distribution Frequency</p>
                    <p className="text-xl font-semibold text-orange-900">Quarterly</p>
                    <p className="text-xs text-orange-700">Automated payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="w-1/2 px-8">
                <div className={`bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`flex items-center mb-3 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    {step.icon}
                    <h3 className="text-xl font-semibold ml-2">{step.title}</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2 justify-end">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{step.duration}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Key Tasks:</h4>
                    <ul className={`space-y-1 text-sm ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {step.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-center text-gray-600">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 gap-3 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">Key Milestones</h5>
                      <ul className="space-y-1">
                        {step.details.keyMilestones.map((milestone, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center">
                            <ArrowRight className="h-3 w-3 mr-1" />
                            {milestone}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">Key Stakeholders</h5>
                      <ul className="space-y-1">
                        {step.details.stakeholders.map((stakeholder, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {stakeholder}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">Key Considerations</h5>
                      <ul className="space-y-1">
                        {step.details.considerations.map((consideration, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center">
                            <Info className="h-3 w-3 mr-1" />
                            {consideration}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-primary border-4 border-white shadow" />
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}