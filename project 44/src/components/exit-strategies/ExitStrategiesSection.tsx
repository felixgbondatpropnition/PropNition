import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowRight, TrendingUp, Users, Building2, DollarSign, Scale, Clock, AlertTriangle } from 'lucide-react';

interface ExitStrategy {
  name: string;
  description: string;
  timeframe: string;
  advantages: string[];
  disadvantages: string[];
  suitabilityScore: number;
  considerations: string[];
}

interface ExitStrategiesSectionProps {
  propertyType: string;
  propertyValue: number;
  tokenizationPercentage: number;
  location: string;
}

const ExitStrategiesSection: React.FC<ExitStrategiesSectionProps> = ({
  propertyType,
  propertyValue,
  tokenizationPercentage,
  location
}) => {
  const tokenizedValue = propertyValue * (tokenizationPercentage / 100);

  const getExitStrategies = (): ExitStrategy[] => {
    const strategies: ExitStrategy[] = [
      {
        name: "Secondary Market Trading",
        description: "Allow token holders to trade their tokens on secondary markets, providing ongoing liquidity without full property sale.",
        timeframe: "Immediate to Short-term",
        advantages: [
          "Continuous liquidity for token holders",
          "No need to sell entire property",
          "Market-driven pricing",
          "Flexibility for investors"
        ],
        disadvantages: [
          "Potential price volatility",
          "Market depth limitations",
          "Trading volume uncertainty",
          "Platform dependency"
        ],
        suitabilityScore: 8.5,
        considerations: [
          "Secondary market platform selection",
          "Trading volume requirements",
          "Market maker arrangements",
          "Price stability mechanisms"
        ]
      },
      {
        name: "Whole Property Sale",
        description: "Sell the entire property and distribute proceeds to token holders based on their ownership percentage.",
        timeframe: "Medium to Long-term",
        advantages: [
          "Clean exit for all token holders",
          "Potentially higher sale price",
          "Single transaction efficiency",
          "Clear valuation point"
        ],
        disadvantages: [
          "Requires buyer for entire property",
          "Longer sale process",
          "Market timing challenges",
          "All-or-nothing approach"
        ],
        suitabilityScore: 7.5,
        considerations: [
          "Market conditions timing",
          "Property valuation method",
          "Token holder approval process",
          "Distribution mechanics"
        ]
      },
      {
        name: "Token Buyback Program",
        description: "Implement a structured program to repurchase tokens from holders at predetermined intervals or prices.",
        timeframe: "Short to Medium-term",
        advantages: [
          "Controlled liquidity provision",
          "Price stability support",
          "Flexible implementation",
          "Gradual exit option"
        ],
        disadvantages: [
          "Requires capital reserves",
          "May create price pressure",
          "Administrative complexity",
          "Potential conflicts of interest"
        ],
        suitabilityScore: 8.0,
        considerations: [
          "Funding source for buybacks",
          "Price determination mechanism",
          "Schedule and frequency",
          "Maximum buyback limits"
        ]
      },
      {
        name: "Strategic Investor Acquisition",
        description: "Sell tokens to a strategic investor who wants to accumulate a significant ownership position.",
        timeframe: "Medium-term",
        advantages: [
          "Potentially premium pricing",
          "Simplified transaction process",
          "Strategic value addition",
          "Market confidence boost"
        ],
        disadvantages: [
          "Limited buyer pool",
          "Complex negotiations",
          "May require majority approval",
          "Potential control implications"
        ],
        suitabilityScore: 7.0,
        considerations: [
          "Investor qualification criteria",
          "Control rights implications",
          "Existing holder protections",
          "Regulatory compliance"
        ]
      },
      {
        name: "Property Refinancing",
        description: "Refinance the property to return capital to token holders while maintaining ownership structure.",
        timeframe: "Medium-term",
        advantages: [
          "Maintain property ownership",
          "Potential value capture",
          "No immediate sale needed",
          "Market timing flexibility"
        ],
        disadvantages: [
          "Dependent on lending market",
          "May increase property costs",
          "Limited capital return",
          "Requires good property performance"
        ],
        suitabilityScore: 6.5,
        considerations: [
          "Current debt levels",
          "Interest rate environment",
          "Property cash flow coverage",
          "Lender requirements"
        ]
      }
    ];

    // Adjust suitability scores based on property characteristics
    return strategies.map(strategy => {
      let adjustedScore = strategy.suitabilityScore;

      // Adjust for property value
      if (propertyValue > 10000000) {
        if (strategy.name === "Strategic Investor Acquisition") adjustedScore += 1;
        if (strategy.name === "Secondary Market Trading") adjustedScore += 0.5;
      }

      // Adjust for property type
      if (propertyType.includes('Commercial')) {
        if (strategy.name === "Whole Property Sale") adjustedScore += 0.5;
        if (strategy.name === "Strategic Investor Acquisition") adjustedScore += 0.5;
      }

      // Adjust for tokenization percentage
      if (tokenizationPercentage < 50) {
        if (strategy.name === "Property Refinancing") adjustedScore += 1;
        if (strategy.name === "Token Buyback Program") adjustedScore += 0.5;
      }

      return {
        ...strategy,
        suitabilityScore: Math.min(10, Math.round(adjustedScore * 10) / 10)
      };
    }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);
  };

  const exitStrategies = getExitStrategies();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exit Strategy Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Exit Strategy Overview</h3>
            <p className="text-blue-700">
              Based on your property's characteristics and market conditions, we've analyzed various exit strategies 
              for your tokenized property. Each strategy is evaluated for suitability and includes key considerations 
              for implementation.
            </p>
          </div>

          <div className="space-y-6">
            {exitStrategies.map((strategy, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {strategy.name === "Secondary Market Trading" ? <TrendingUp className="h-5 w-5 text-primary" /> :
                         strategy.name === "Whole Property Sale" ? <Building2 className="h-5 w-5 text-primary" /> :
                         strategy.name === "Token Buyback Program" ? <DollarSign className="h-5 w-5 text-primary" /> :
                         strategy.name === "Strategic Investor Acquisition" ? <Users className="h-5 w-5 text-primary" /> :
                         <Scale className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{strategy.name}</h4>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{strategy.timeframe}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      strategy.suitabilityScore >= 8 ? 'bg-green-100 text-green-800' :
                      strategy.suitabilityScore >= 7 ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      Suitability: {strategy.suitabilityScore}/10
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{strategy.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">Advantages</h5>
                      <ul className="space-y-1">
                        {strategy.advantages.map((advantage, i) => (
                          <li key={i} className="flex items-center text-sm text-green-600">
                            <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium text-red-700 mb-2">Disadvantages</h5>
                      <ul className="space-y-1">
                        {strategy.disadvantages.map((disadvantage, i) => (
                          <li key={i} className="flex items-center text-sm text-red-600">
                            <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                            {disadvantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-700 mb-2">Key Considerations</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {strategy.considerations.map((consideration, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-600">
                          <ArrowRight className="h-4 w-4 mr-1 flex-shrink-0" />
                          {consideration}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-medium text-amber-800">Important Considerations</h5>
                <p className="text-sm text-amber-700 mt-1">
                  Exit strategy implementation should be carefully planned and may require token holder approval, 
                  legal consultation, and consideration of market conditions. The optimal timing and choice of 
                  exit strategy should be regularly reviewed based on property performance and market dynamics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExitStrategiesSection;