// Analytics utility for enhanced Google Analytics tracking
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

// Page view tracking with enhanced metadata
export const trackPageView = (path: string, title?: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }
};

// Button click tracking
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('Button', 'click', `${buttonName} - ${location}`);
};

// Form tracking with enhanced data
export const trackFormSubmit = (formName: string, success: boolean, formData?: any) => {
  trackEvent(
    'Form',
    success ? 'submit_success' : 'submit_failure',
    formName,
    formData?.propertyValue
  );
};

// Document tracking
export const trackDocumentView = (documentName: string, category?: string) => {
  trackEvent('Document', 'view', `${category || 'General'} - ${documentName}`);
};

export const trackDocumentDownload = (documentName: string, category?: string) => {
  trackEvent('Document', 'download', `${category || 'General'} - ${documentName}`);
};

// Platform comparison tracking with enhanced data
export const trackPlatformComparison = (platforms: string[], propertyType?: string) => {
  trackEvent('Platform', 'compare', `${platforms.join(' vs ')} - ${propertyType || 'General'}`);
};

// Questionnaire tracking with enhanced metrics
export const trackQuestionnaireProgress = (
  step: number,
  totalSteps: number,
  timeSpent: number,
  category?: string
) => {
  trackEvent(
    'Questionnaire',
    'progress',
    `${category || 'General'} - Step ${step}/${totalSteps}`,
    timeSpent
  );
};

export const trackQuestionnaireComplete = (timeSpent: number, propertyValue?: number) => {
  trackEvent('Questionnaire', 'complete', undefined, propertyValue);
};

// Scroll depth tracking with enhanced data
export const trackScrollDepth = (depth: number, pageType: string) => {
  trackEvent('Scroll', 'depth', `${pageType} - ${depth}%`, depth);
};

// External link tracking with enhanced context
export const trackExternalLink = (url: string, location: string, category?: string) => {
  trackEvent('ExternalLink', 'click', `${category || 'General'} - ${url} from ${location}`);
};

// Report generation tracking
export const trackReportGeneration = (propertyType: string, propertyValue: number) => {
  trackEvent('Report', 'generate', propertyType, propertyValue);
};

// Platform recommendation tracking
export const trackPlatformRecommendation = (platform: string, score: number) => {
  trackEvent('Platform', 'recommend', platform, score);
};

// Custom type declarations for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}