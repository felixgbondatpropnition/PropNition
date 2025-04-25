import React from 'react';
import { platforms, scorePlatform, type PropertyDetails } from '../data/tokenizationPlatforms';
import { Building2, Globe, DollarSign, TrendingUp, ExternalLink, Info } from 'lucide-react';

interface PlatformRecommendationsProps {
  propertyDetails: PropertyDetails;
}

const PlatformRecommendations: React.FC<PlatformRecommendationsProps> = ({ propertyDetails }) => {
  // Get all platforms and score them
  const scoredPlatforms = Object.values(platforms)
    .map(platform => ({
      ...platform,
      score: scorePlatform(platform, propertyDetails)
    }))
    // Sort by score descending and take top 4
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    // Filter out any platforms with a score of 0
    .filter(platform => platform.score > 0);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Top Recommended Platforms</p>
            <p className="text-sm text-blue-700 mt-1">
              Based on your property details, these platforms are the best match for your tokenization needs.
              Platforms are ranked by compatibility score considering factors like property type, value range,
              and jurisdiction support.
            </p>
          </div>
        </div>
      </div>

      {scoredPlatforms.map((platform, index) => (
        <div key={index} className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">{platform.name}</h3>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={platform.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-primary-dark transition-colors"
              >
                Visit Website
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold
                ${platform.score >= 80 ? 'bg-green-100 text-green-800' :
                  platform.score >= 60 ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'}`}>
                Match Score: {platform.score}%
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Platform Overview
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Focus:</span>
                    <span className="font-medium">{platform.focus.join(", ")}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Jurisdictions:</span>
                    <span className="font-medium">{platform.jurisdiction.join(", ")}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Liquidity Score:</span>
                    <span className="font-medium">{platform.liquidityScore}/10</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Investment Requirements
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Min Investment:</span>
                    <span className="font-medium">${platform.minInvestment.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Property Range:</span>
                    <span className="font-medium">
                      ${platform.minValue.toLocaleString()} - ${platform.maxValue.toLocaleString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Key Features
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-green-700 mb-1">Advantages</h5>
                    <ul className="space-y-1">
                      {platform.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-green-600 flex items-center">
                          <span className="mr-2">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-yellow-700 mb-1">Considerations</h5>
                    <ul className="space-y-1">
                      {platform.cons.map((con, i) => (
                        <li key={i} className="text-sm text-yellow-600 flex items-center">
                          <span className="mr-2">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlatformRecommendations;