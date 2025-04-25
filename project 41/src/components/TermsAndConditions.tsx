import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Info, Shield, Scale, FileText } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-6 w-6" />
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to Propnition.com, your educational platform for understanding real estate tokenization. These Terms and Conditions outline the rules and regulations for using our platform and services. By accessing our platform, you acknowledge and agree to these terms in their entirety. Our platform serves as an educational resource designed to help property owners and investors understand the complexities and opportunities within real estate tokenization. If you find yourself in disagreement with any part of these terms, we kindly ask that you refrain from using our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Educational Nature of Our Services</h2>
              <p className="text-gray-700 leading-relaxed">
                At the core of our platform lies a fundamental principle: we are an educational resource first and foremost. Our platform has been designed to provide information and insights about real estate tokenization, but it's crucial to understand that we do not provide direct financial, legal, investment, or tax advice. The content we offer, including our analyses, reports, and recommendations, are all provided purely for educational and informational purposes. We believe strongly in empowering our users with knowledge, but this knowledge should always be complemented by consultation with qualified professionals who can provide personalized advice based on your specific circumstances.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Every piece of content on our platform, from our interactive questionnaires to our market analyses, is designed to enhance your understanding of real estate tokenization. However, this information should serve as a starting point for your journey, not as the sole basis for making investment decisions. We strongly encourage all users to seek professional guidance from qualified legal counsel, financial advisors, and tax professionals before proceeding with any real estate tokenization or investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Platform Services and Functionality</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform provides educational resources, interactive questionnaires, and analytical tools focused on helping you understand real estate tokenization. Through our questionnaire system, we gather information about your property and objectives to generate reports and recommendations. These reports are created using algorithms that analyze the information you provide, combining it with our database of market knowledge and tokenization practices. However, it's important to understand that the quality and accuracy of our analysis depend entirely on the information you provide. We do not independently verify this information, and therefore, cannot guarantee the absolute accuracy of our recommendations. Our platform serves as a guide, helping you navigate the complex landscape of real estate tokenization while leaving the final decisions in your capable hands.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Responsibilities as a User</h2>
              <p className="text-gray-700 leading-relaxed">
                When using our platform, you take on certain responsibilities that are crucial for ensuring the best possible experience and most accurate results. First and foremost, we rely on you to provide accurate and complete information when using our questionnaires and analytical tools. The quality of our analysis and recommendations is directly tied to the quality of information you provide. Additionally, you acknowledge that any decisions you make based on information from our platform are ultimately your responsibility. While we strive to provide helpful information, the final decision-making power - and responsibility - rests with you. We also expect users to maintain the integrity of our platform by using it only for its intended, lawful purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                We take your privacy seriously and have implemented measures to protect any information you share with us. Our data collection is limited to the information you voluntarily provide through our questionnaire system, which typically includes details about your property, its financial characteristics, location information, and your investment objectives. We want to assure you that we do not collect or store sensitive personal financial information, bank details, or other sensitive personal data. To improve our platform and enhance user experience, we utilize Google Analytics to collect anonymous usage data. This helps us understand how users interact with our platform and allows us to make meaningful improvements to better serve your needs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Content Usage</h2>
              <p className="text-gray-700 leading-relaxed">
                The content on our platform is provided for your personal educational use. While we encourage you to learn from and use the reports generated through our platform for your personal educational purposes, we ask that you respect our work by not reproducing, distributing, or commercializing the content without proper attribution. Our goal is to continue providing valuable educational resources in the field of real estate tokenization, and we appreciate your support in achieving this mission by using our content responsibly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Warranty Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                Our platform is provided on an "as is" and "as available" basis, reflecting our commitment to transparency in what we offer. While we strive to maintain high standards of accuracy and reliability, we cannot and do not provide any warranties, either express or implied, regarding the platform's operation or the information it contains. This includes, but is not limited to, warranties about the platform's uninterrupted availability, timeliness, security, or freedom from errors. We make no guarantees about the accuracy, reliability, or completeness of any analysis, recommendations, or information provided through the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by applicable law, we shall not be held liable for any indirect, incidental, special, consequential, or punitive damages that may arise from your use of our platform. This includes any decisions made or actions taken based on information provided through our platform. We understand that real estate tokenization involves significant financial decisions, which is precisely why we emphasize the educational nature of our platform and the importance of consulting with qualified professionals before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Platform Availability and Updates</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to maintain consistent platform availability and regularly update our content to reflect the latest developments in real estate tokenization. However, we reserve the right to modify, suspend, or discontinue any aspect of the platform without prior notice when necessary. Such changes might be required for technical maintenance, content updates, or responding to evolving market conditions. We cannot be held liable for any inconvenience or losses that might result from such modifications, suspensions, or discontinuations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Content and Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Throughout our platform, you may encounter links to third-party websites or services that operate independently from Propnition.com. While we may reference these external resources to enhance your educational experience, we want to be clear that we have no control over their content, privacy policies, or operational practices. These links are provided for your convenience and additional reference, but we cannot endorse or guarantee the accuracy, relevance, or safety of any third-party content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Terms Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                The field of real estate tokenization is dynamic and evolving, and our terms must evolve alongside it. We reserve the right to modify or replace these terms at any time without providing prior notice. Such changes might be necessary to reflect new features, respond to regulatory changes, or address emerging aspects of real estate tokenization. Your continued use of our platform following any modifications to these terms constitutes your acceptance of the changes.
              </p>
            </section>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-4">
                <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">Contact Information</h3>
                  <p className="text-blue-800">
                    We value open communication with our users and are always here to help clarify any aspects of these terms. If you have questions, concerns, or need clarification about any part of these Terms and Conditions, please don't hesitate to reach out through our feedback form on the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}