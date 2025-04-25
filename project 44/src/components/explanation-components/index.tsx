import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface AnalysisExplanationProps {
  title: string;
  explanation: string;
  factors: string[];
  recommendations: string[];
}

export const AnalysisExplanation: React.FC<AnalysisExplanationProps> = ({
  title,
  explanation,
  factors,
  recommendations
}) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-gray-700">{explanation}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Key Factors Considered</h4>
            <ul className="list-disc pl-5 space-y-1">
              {factors.map((factor, index) => (
                <li key={index} className="text-gray-600">{factor}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Recommendations</h4>
            <ul className="list-disc pl-5 space-y-1">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-gray-600">{recommendation}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const financialExplanation = {
  title: "Understanding the Financial Analysis",
  explanation: "The financial analysis provides a comprehensive view of the property's current and projected financial performance, considering multiple factors and market conditions.",
  factors: [
    "Current market value and appreciation potential",
    "Income generation capacity and stability",
    "Operating costs and efficiency metrics",
    "Debt service coverage and leverage options",
    "Comparative market analysis"
  ],
  recommendations: [
    "Optimize operational efficiency to maximize returns",
    "Consider strategic improvements to enhance value",
    "Implement robust financial monitoring systems",
    "Develop contingency plans for market fluctuations"
  ]
};

export const marketExplanation = {
  title: "Market Analysis Insights",
  explanation: "The market analysis evaluates current market conditions, trends, and competitive positioning to assess the property's market potential.",
  factors: [
    "Local market dynamics and growth trends",
    "Supply and demand metrics",
    "Competitive landscape analysis",
    "Economic indicators and forecasts",
    "Demographic trends and shifts"
  ],
  recommendations: [
    "Position the property to capitalize on market trends",
    "Develop targeted marketing strategies",
    "Monitor market changes and adapt accordingly",
    "Build relationships with key market participants"
  ]
};

export const riskExplanation = {
  title: "Risk Assessment Framework",
  explanation: "The risk analysis identifies and quantifies potential risks, providing a framework for risk management and mitigation strategies.",
  factors: [
    "Market risk exposure",
    "Operational risk factors",
    "Regulatory compliance requirements",
    "Financial risk metrics",
    "Environmental considerations"
  ],
  recommendations: [
    "Implement comprehensive risk management protocols",
    "Develop contingency plans for identified risks",
    "Regular monitoring and reporting of risk metrics",
    "Maintain adequate insurance coverage"
  ]
};

export const tokenizationExplanation = {
  title: "Tokenization Strategy Overview",
  explanation: "The tokenization analysis outlines the optimal approach for tokenizing the property, considering various technical and market factors.",
  factors: [
    "Token structure and economics",
    "Platform selection criteria",
    "Regulatory compliance requirements",
    "Technical implementation considerations",
    "Market readiness assessment"
  ],
  recommendations: [
    "Select appropriate tokenization platform",
    "Design optimal token structure",
    "Ensure regulatory compliance",
    "Develop clear governance framework"
  ]
};

export const projectionExplanation = {
  title: "Understanding Long-term Projections",
  explanation: "The projections provide a detailed view of potential future scenarios, based on various market conditions and assumptions.",
  factors: [
    "Historical market performance",
    "Economic cycle analysis",
    "Growth rate assumptions",
    "Risk factor adjustments",
    "Market correlation impacts"
  ],
  recommendations: [
    "Regular review and adjustment of projections",
    "Monitor key performance indicators",
    "Adjust strategies based on actual performance",
    "Maintain flexible response capabilities"
  ]
};