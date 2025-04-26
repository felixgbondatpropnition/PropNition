import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, AlertTriangle, ArrowRight, Shield, Settings, FileText, Info } from 'lucide-react';

export default function PropertyReadiness() {
  return (
    <div className="space-y-6">
      {/* Educational Disclaimer - Subtle version */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-xs text-gray-500 text-center">
          <span className="font-medium">Educational Purpose:</span> This readiness assessment is for educational and informational purposes only.
          Not financial or legal advice. Consult qualified professionals for your specific situation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Property Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Legal Requirements</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Clear property title
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    No pending litigation
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Regulatory compliance
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Financial Status</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Current valuation
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Income verification
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Debt obligations
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Compliance Checklist</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Regulatory Requirements</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Securities registration
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    KYC/AML procedures
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Investor accreditation
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Documentation</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Offering memorandum
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Legal agreements
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Technical specifications
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <span>Technical Readiness</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Platform Requirements</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Smart contract development
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Token standard compliance
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Integration capabilities
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Security Measures</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Smart contract audit
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Penetration testing
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Access controls
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Preparation Phase</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Legal structure setup
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Compliance framework
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Technical architecture
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Implementation Phase</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Platform integration
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Smart contract deployment
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Security audits
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Launch Phase</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Marketing campaign
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Investor onboarding
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Token distribution
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Long-term Strategy</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Ongoing compliance monitoring
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Investor relations program
                  </li>
                  <li className="text-sm text-gray-600 flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5" />
                    Platform upgrades and maintenance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}