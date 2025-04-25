import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, FileText, Zap, Briefcase, CheckSquare, CheckCircle, ArrowRight, Info } from 'lucide-react';

const timelineSteps = [
  {
    title: "Initial Assessment",
    duration: "2-3 weeks",
    icon: <Clock className="h-6 w-6 text-primary" />,
    description: "Property evaluation and tokenization strategy development",
    tasks: [
      "Complete property assessment",
      "Develop tokenization strategy",
      "Initial legal consultation"
    ]
  },
  {
    title: "Legal Structure",
    duration: "4-6 weeks",
    icon: <FileText className="h-6 w-6 text-blue-600" />,
    description: "Setting up the legal framework and documentation",
    tasks: [
      "Create legal entity (SPV)",
      "Draft token documentation",
      "Regulatory compliance review"
    ]
  },
  {
    title: "Technical Setup",
    duration: "6-8 weeks",
    icon: <Zap className="h-6 w-6 text-yellow-600" />,
    description: "Platform integration and smart contract development",
    tasks: [
      "Smart contract development",
      "Platform integration",
      "Security audits"
    ]
  },
  {
    title: "Token Launch",
    duration: "4-6 weeks",
    icon: <Briefcase className="h-6 w-6 text-green-600" />,
    description: "Token issuance and distribution setup",
    tasks: [
      "Token creation",
      "Distribution setup",
      "Marketing preparation"
    ]
  },
  {
    title: "Post-Launch",
    duration: "Ongoing",
    icon: <CheckSquare className="h-6 w-6 text-purple-600" />,
    description: "Ongoing management and compliance",
    tasks: [
      "Token holder management",
      "Regular reporting",
      "Compliance monitoring"
    ]
  }
];

export default function TokenizationTimeline() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Tokenize My Property?</h2>
            <p className="text-lg text-gray-600">A rough breakdown for what the timeline might look like</p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Get a Personalized Timeline</h3>
                <p className="text-blue-700 mb-4">
                  This is a general overview of the tokenization process. Complete our comprehensive questionnaire to receive a detailed, customized timeline specifically tailored to your property, jurisdiction, and requirements.
                </p>
                <p className="text-blue-700">
                  Your personalized timeline will include:
                </p>
                <ul className="mt-2 space-y-2 text-blue-700">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Specific timeframes based on your property type and location
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Detailed cost breakdowns and resource requirements
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Jurisdiction-specific regulatory considerations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    Platform recommendations and integration timelines
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20" />

            {/* Timeline steps */}
            <div className="space-y-12">
              {timelineSteps.map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content */}
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
                      <ul className={`space-y-1 text-sm ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        {step.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center text-gray-600">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline point */}
                  <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-primary border-4 border-white shadow" />

                  {/* Empty space for alignment */}
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/questionnaire"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Start the Questionnaire
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}