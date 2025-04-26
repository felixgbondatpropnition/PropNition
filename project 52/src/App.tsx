import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { MessageSquare, ClipboardList, Building2, Globe, Shield, ArrowRight, ChevronDown, CheckCircle, Users, LayoutGrid, Clock, Wallet, Menu, X } from 'lucide-react';
import PropertyQuestionnaire from './components/PropertyQuestionnaire';
import CommonQuestions from './components/CommonQuestions';
import MarketDashboard from './components/market-intelligence/MarketDashboard';
import DocumentCenter from './components/document-center/DocumentCenter';
import PlatformComparison from './components/platform-comparison/PlatformComparison';
import PlatformList from './components/platform-list/PlatformList';
import PropertyReadiness from './components/property-readiness/PropertyReadiness';
import PredictiveAnalytics from './components/predictive-analytics/PredictiveAnalytics';
import TokenizationTimeline from './components/timeline/TokenizationTimeline';
import { tokenizationKnowledge } from './TokenizationKnowledge';
import FeedbackForm from './components/FeedbackForm';
import { trackPageView } from './utils/analytics';
import ScrollTracker from './components/ScrollTracker';
import RouteTracker from './components/RouteTracker';
import TermsAndConditions from './components/TermsAndConditions';

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-6">We're sorry, but there was an error loading the page.</p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/';
              }}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const primaryNavItems = [
    { to: "/questionnaire", icon: <ClipboardList className="h-5 w-5 mr-1" />, label: "Questionnaire" },
    { to: "/market-intelligence", icon: <Globe className="h-5 w-5 mr-1" />, label: "Market" },
    { to: "/documents", icon: <Shield className="h-5 w-5 mr-1" />, label: "Docs" }
  ];

  const secondaryNavItems = [
    { to: "/common-questions", icon: <MessageSquare className="h-5 w-5 mr-1" />, label: "FAQ" },
    { to: "/platforms-list", icon: <Building2 className="h-5 w-5 mr-1" />, label: "Platforms" },
    { to: "/timeline", icon: <Clock className="h-5 w-5 mr-1" />, label: "Timeline" }
  ];
  
  return (
    <nav className={`bg-white shadow-lg z-10 ${isHomePage ? 'sticky top-0' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://gwmhielostbvxelbvcjf.supabase.co/storage/v1/object/public/logos//Propnition.png" 
                alt="Propnition Logo" 
                className="h-12 w-auto"
              />
              <span className="font-bold text-xl text-gray-900">Propnition.com</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            {[...primaryNavItems, ...secondaryNavItems].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-primary/5"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-primary hover:bg-primary/5"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-48' : 'max-h-0'}`}>
          <div className="py-2 space-y-2">
            <div className="flex justify-around">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex flex-col items-center px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-primary/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              ))}
            </div>
            <div className="flex justify-around">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex flex-col items-center px-3 py-2 rounded-md text-gray-700 hover:text-primary hover:bg-primary/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const DisclaimerFooter = () => {
  return (
    <div className="bg-gray-100 border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="text-center text-xs text-gray-500 space-y-2">
          <p>
            Educational platform for informational purposes only. Not financial, legal, or investment advice.
            Consult qualified professionals before making investment decisions.
          </p>
          <p>
            <Link to="/terms" className="text-primary hover:text-primary-dark">Terms and Conditions</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
      <button 
        onClick={scrollDown}
        className="flex flex-col items-center text-white bg-primary/80 hover:bg-primary rounded-full p-3 shadow-lg transition-colors"
        aria-label="Scroll down for more content"
      >
        <span className="text-xs font-medium mb-1">Scroll Down</span>
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
}

function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <div className="relative bg-gradient-to-br from-primary/90 to-secondary/90 text-white py-16 min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `url("https://images.theconversation.com/files/534137/original/file-20230626-23-hhuczo.jpg?ixlib=rb-4.1.0&rect=0%2C3%2C2121%2C1406&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.2)'
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-secondary/80" />
          
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 60%)'
            }}
          />
          
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 50%)'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center pt-16">
            <div className="mb-8 inline-block">
              <img 
                src="https://gwmhielostbvxelbvcjf.supabase.co/storage/v1/object/public/logos//Propnition.png" 
                alt="Propnition Logo" 
                className="h-32 w-auto mx-auto logo-white"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Unlock And Understand The Potential Of Real Estate Tokenization
            </h1>
            <div className="space-y-6">
              <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                Before committing significant resources and funds, let our cutting-edge technology and expertise guide you through 
                the tokenization landscape. We're here to help you make informed decisions and capitalise on the future 
                of real estate investment.
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-center text-2xl font-semibold mb-6">How Our Platform Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary font-bold mb-3">1</div>
                  <h3 className="font-medium mb-2">Complete Questionnaire</h3>
                  <p className="text-sm text-white/80">Share your property details</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary font-bold mb-3">2</div>
                  <h3 className="font-medium mb-2">Receive Analysis</h3>
                  <p className="text-sm text-white/80">Get detailed tokenization insights specific to your real estate</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary font-bold mb-3">3</div>
                  <h3 className="font-medium mb-2">Review Options</h3>
                  <p className="text-sm text-white/80">Explore platform recommendations</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary font-bold mb-3">4</div>
                  <h3 className="font-medium mb-2">Implementation</h3>
                  <p className="text-sm text-white/80">Execute your tokenization plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollIndicator />
      </div>

      <div className="bg-gray-50 py-3 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-xs text-gray-500 text-center">
            <span className="font-medium">Important:</span> Propnition.com is designed for educational and informational purposes only, to prepare you and help you decide for yourself if, when, and how you want to tokenize your real estate. Not financial, legal, or investment advice. Always consult qualified professionals before making financial decisions.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 py-3 border-b border-blue-200">
        <div className="container mx-auto px-4">
          <p className="text-xs text-blue-700 text-center">
            <span className="font-medium">Jurisdiction Coverage:</span> Our questionnaire and analysis are currently optimized for properties in the United Kingdom, United States, European Union, Asia Pacific, and Middle East regions.
          </p>
        </div>
      </div>

      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&q=80")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)'
          }}></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="mt-12 p-8 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Is Tokenization Right for Your Property?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                While tokenization offers significant benefits, it's important to determine if it's the right approach for your specific property and circumstances. 
                Our comprehensive questionnaire helps you evaluate your property's tokenization potential and provides personalized recommendations.
              </p>
              <div className="text-center">
                <Link
                  to="/questionnaire"
                  className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-lg font-semibold shadow-lg hover:shadow-xl"
                >
                  Start The Questionnaire
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </div>
            </div>

            <div className="text-center mt-24 mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Should I Tokenize My Real Estate?</h2>
              <p className="text-xl text-gray-600">Discover the key benefits that property tokenization offers to real estate owners</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Improved Access to Capital</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Tokenization opens new doors for property owners by splitting properties into digital shares that are easy to buy. 
                  This allows you to quickly reach a global pool of investors, raising more capital than traditional methods.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  By selling fractional shares globally, you can turn your property value into ready capital more efficiently and at a lower cost.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <LayoutGrid className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Partial Sales Flexibility</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Rather than being forced to sell an entire building or unit, tokenization gives you the flexibility to release exactly 
                  the amount of equity you need.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  This works especially well for landlords or firms wanting to branch out into other investments while maintaining control.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">More Efficient Management</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Tokenization creates a more simple and clear way to manage property ownership, eliminating most of the paperwork 
                  that traditionally complicates real estate deals.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Smart contracts automate important aspects like dividend distribution and ownership transfers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&q=80")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scaleX(-1)',
            filter: 'grayscale(90%)'
          }}></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know about property tokenization</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  question: "What is real estate tokenization?",
                  answer: tokenizationKnowledge.faq["What is real estate tokenization?"].answer
                },
                {
                  question: "What does Propnition.com do?",
                  answer: "Propnition.com is your comprehensive platform for real estate tokenization, combining advanced analytics, market intelligence, and expert guidance. We help property owners navigate the tokenization process with our AI-driven platform that provides detailed property analysis, market insights, platform comparisons, and step-by-step guidance through the entire tokenization journey."
                },
                {
                  question: "How much does it cost to tokenize a property?",
                  answer: tokenizationKnowledge.faq["How much does it cost to tokenize a property?"].answer
                }
              ].map((q, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow transform hover:-translate-y-1 duration-300 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{q.question}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{q.answer}</p>
                  <Link
                    to="/common-questions"
                    className="inline-flex items-center text-primary hover:text-primary-dark text-lg font-medium"
                  >
                    Learn More
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/common-questions"
                className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                View All Questions
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1579547945413-497e1b99dac0?auto=format&fit=crop&q=80")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%)'
          }}></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Share Your Thoughts</h2>
              <p className="text-xl text-gray-600">We value your feedback to improve our platform and services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Why Your Feedback Matters</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  At Propnition.com, we're committed to providing the best possible experience for property owners exploring tokenization. Your insights help us:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 leading-relaxed">Improve our platform features and usability</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 leading-relaxed">Enhance our analysis and recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 leading-relaxed">Address any concerns or questions you may have</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 leading-relaxed">Develop new features based on user needs</span>
                  </li>
                </ul>
              </div>

              <FeedbackForm recipientEmail="felixgbond@gmail.com" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Log initial render
    console.log('App component mounted');
    
    // Add error event listener
    const errorHandler = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      // You could also send this to an error tracking service
    };
    
    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <RouteTracker />
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questionnaire" element={<PropertyQuestionnaire />} />
            <Route path="/common-questions" element={<CommonQuestions />} />
            <Route path="/market-intelligence" element={<MarketDashboard />} />
            <Route path="/documents" element={<DocumentCenter />} />
            <Route path="/platforms" element={<PlatformComparison />} />
            <Route path="/platforms-list" element={<PlatformList />} />
            <Route path="/property-readiness" element={<PropertyReadiness />} />
            <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
            <Route path="/timeline" element={<TokenizationTimeline />} />
            <Route path="/terms" element={<TermsAndConditions />} />
          </Routes>
          <DisclaimerFooter />
          <ScrollTracker />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;