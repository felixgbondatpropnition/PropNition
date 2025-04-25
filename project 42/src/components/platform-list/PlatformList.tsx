import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Building2, ArrowRight, Info } from 'lucide-react';
import { platforms } from '../../data/tokenizationPlatforms';
import { Link } from 'react-router-dom';

const PlatformList: React.FC = () => {
  // Get all platforms as a flat array
  const allPlatforms = Object.values(platforms);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Tokenization Platforms Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-gray-600">
              A comprehensive list of platforms that facilitate real estate tokenization across different jurisdictions.
              Each platform has its own focus areas, minimum investment requirements, and supported property types.
            </p>
          </div>
          
          {/* Questionnaire CTA */}
          <div className="mb-8 p-5 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">Find Your Ideal Tokenization Platform</h3>
                <p className="text-sm text-blue-700 mb-3">
                  To find out which platform is best for your real estate, complete our questionnaire and receive your personalised report with platform recommendations tailored to your specific property and requirements.
                </p>
                <Link
                  to="/questionnaire"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Start Questionnaire
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPlatforms.map((platform, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{platform.name}</h3>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="font-medium w-32">Focus Areas:</span>
                    <span className="text-gray-700">{platform.focus.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="font-medium w-32">Jurisdictions:</span>
                    <span className="text-gray-700">{platform.jurisdiction.join(', ')}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="font-medium w-32">Min Investment:</span>
                    <span className="text-gray-700">${platform.minInvestment.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="font-medium w-32">Property Range:</span>
                    <span className="text-gray-700">${platform.minValue.toLocaleString()} - ${platform.maxValue.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <div className="flex flex-wrap gap-2">
                    {platform.specialFeatures.map((feature, i) => (
                      <div key={i} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformList;