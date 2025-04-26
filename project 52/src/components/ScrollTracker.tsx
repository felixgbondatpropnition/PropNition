import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { trackScrollDepth } from '../utils/analytics';
import { useLocation } from 'react-router-dom';

const ScrollTracker: React.FC = () => {
  const [maxScroll, setMaxScroll] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const calculateScrollDepth = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const trackLength = docHeight - winHeight;
      const scrollPercent = Math.floor((scrollTop / trackLength) * 100);

      if (scrollPercent > maxScroll) {
        setMaxScroll(scrollPercent);
        if (scrollPercent % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          // Get page type from pathname
          const pageType = location.pathname.split('/')[1] || 'home';
          trackScrollDepth(scrollPercent, pageType);
        }
      }
    };

    const throttledScroll = throttle(calculateScrollDepth, 500);
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      throttledScroll.cancel();
    };
  }, [maxScroll, location]);

  return null;
};

export default ScrollTracker;