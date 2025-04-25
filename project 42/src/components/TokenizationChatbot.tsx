import React, { useState } from 'react';
import { ChevronRight, FileText, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tokenizationKnowledge } from '../TokenizationKnowledge';

const commonQuestions = [
  {
    id: 1,
    question: "What is real estate tokenization?",
    answer: tokenizationKnowledge.faq["What is real estate tokenization?"].answer
  },
  {
    id: 2,
    question: "Is real estate tokenization legal?",
    answer: tokenizationKnowledge.faq["Is real estate tokenization legal?"].answer
  },
  {
    id: 3,
    question: "How much does it cost to tokenize a property?",
    answer: tokenizationKnowledge.faq["How much does it cost to tokenize a property?"].answer
  },
  {
    id: 4,
    question: "What is the process for tokenizing a property?",
    answer: tokenizationKnowledge.faq["What is the process for tokenizing a property?"].answer
  },
  {
    id: 5,
    question: "Which properties are best suited for tokenization?",
    answer: tokenizationKnowledge.faq["Which properties are best suited for tokenization?"].answer
  },
  {
    id: 6,
    question: "What are the benefits of tokenizing real estate?",
    answer: "Real estate tokenization offers several key benefits: 1) Increased liquidity through easier trading of property shares, 2) Lower minimum investment amounts enabling broader investor participation, 3) Automated compliance and distributions through smart contracts, 4) Reduced administrative costs, and 5) Access to a global investor pool. It also enables fractional ownership and can streamline property management."
  },
  {
    id: 7,
    question: "What are the regulatory requirements?",
    answer: "Regulatory requirements vary by jurisdiction but generally include: 1) Securities registration or appropriate exemption, 2) KYC/AML compliance for all investors, 3) Ongoing reporting and disclosure requirements, 4) Compliance with property laws and regulations, and 5) Platform/exchange licensing where applicable. In most jurisdictions, real estate tokens are treated as securities and must comply with relevant securities laws."
  },
  {
    id: 8,
    question: "How long does the tokenization process take?",
    answer: "The tokenization process typically takes 4-12 months depending on complexity and jurisdiction. Key timeline factors include: 1) Legal structure setup (4-6 weeks), 2) Technical implementation (6-8 weeks), 3) Regulatory compliance (8-12 weeks), and 4) Token distribution (4-6 weeks). More complex properties or structures may require additional time."
  },
  {
    id: 9,
    question: "What are the ongoing costs and responsibilities?",
    answer: "Ongoing costs and responsibilities include: 1) Platform fees (0.5-2% annually), 2) Property management costs, 3) Compliance and reporting requirements, 4) Token holder communications and support, 5) Smart contract maintenance, and 6) Regular financial audits. Additional costs may include insurance, legal counsel, and technology updates."
  },
  {
    id: 10,
    question: "How are property income and profits distributed?",
    answer: "Income and profits are typically distributed through smart contracts based on token ownership. Distribution methods include: 1) Automated monthly/quarterly payments, 2) Dividend reinvestment options, 3) Stablecoin distributions, and 4) Traditional bank transfers. The frequency and method of distribution are defined in the token's smart contract and offering documents."
  },
  {
    id: 11,
    question: "What happens if I want to sell my tokens?",
    answer: "Token sales can be executed through several channels: 1) Secondary market trading on authorized platforms, 2) Direct peer-to-peer transfers, 3) Platform-sponsored liquidity pools, or 4) Redemption programs if offered by the issuer. Liquidity varies by platform and property type, and may be subject to lock-up periods or transfer restrictions."
  },
  {
    id: 12,
    question: "What are the risks of property tokenization?",
    answer: "Key risks include: 1) Market risks (property value fluctuations), 2) Regulatory risks (changing legal requirements), 3) Technical risks (smart contract vulnerabilities), 4) Liquidity risks (difficulty selling tokens), 5) Platform risks (exchange/platform stability), and 6) Property-specific risks. Risk levels vary by jurisdiction, property type, and tokenization structure."
  },
  {
    id: 13,
    question: "How are token holders protected?",
    answer: "Token holder protections typically include: 1) Legal rights embedded in smart contracts, 2) Property title security through legal structure, 3) Regular audits and reporting, 4) Voting rights on major decisions, 5) Independent custody of assets, and 6) Regulatory oversight. Additional protections may include insurance, reserve funds, and independent directors."
  },
  {
    id: 14,
    question: "What technology infrastructure is needed?",
    answer: "Required technology infrastructure includes: 1) Blockchain platform for token issuance, 2) Smart contracts for token functionality, 3) Secure wallet systems for token custody, 4) KYC/AML verification systems, 5) Property management integration, and 6) Reporting and compliance tools. The specific requirements depend on the chosen tokenization platform and regulatory environment."
  },
  {
    id: 15,
    question: "How do I choose the right tokenization platform?",
    answer: "Platform selection should consider: 1) Regulatory compliance in your jurisdiction, 2) Platform track record and stability, 3) Technology infrastructure and security, 4) Liquidity and trading options, 5) Cost structure, 6) Investor access and marketing support, and 7) Integration capabilities. Complete our questionnaire for personalized platform recommendations."
  }
];

export default function TokenizationAssistant() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6" />
              <h2 className="text-lg font-semibold">Property Tokenization Guide</h2>
            </div>
            <Link
              to="/questionnaire"
              className="flex items-center px-3 py-1 bg-white text-primary rounded-md hover:bg-primary/5 transition-colors"
            >
              <span className="text-sm font-medium">Go to Questionnaire</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Common Questions About Property Tokenization</h3>
              <p className="mt-2 text-gray-600">
                Click on any question below to learn more about property tokenization. For personalized recommendations,
                try our detailed questionnaire.
              </p>
            </div>

            <div className="space-y-4">
              {commonQuestions.map((q) => (
                <div key={q.id} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedQuestion(selectedQuestion === q.id ? null : q.id)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{q.question}</span>
                    <ChevronRight
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        selectedQuestion === q.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {selectedQuestion === q.id && (
                    <div className="px-4 py-3 bg-gray-50 border-t">
                      <p className="text-gray-700 whitespace-pre-wrap">{q.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Need More Detailed Information?</h4>
                  <p className="mt-1 text-sm text-blue-700">
                    Complete our property questionnaire to receive a comprehensive analysis and
                    personalized recommendations for your specific property.
                  </p>
                  <Link
                    to="/questionnaire"
                    className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Start Questionnaire
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}