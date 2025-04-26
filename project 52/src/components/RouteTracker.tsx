import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view with enhanced metadata
    trackPageView(
      location.pathname,
      document.title
    );

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default RouteTracker;