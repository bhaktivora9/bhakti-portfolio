import { useEffect } from 'react';

interface ClickEvent {
  elementType: string;
  elementText: string;
  elementId?: string;
  elementClass?: string;
  href?: string;
  dataAttributes: Record<string, string>;
  coordinates: { x: number; y: number };
  timestamp: number;
  elementPath: string;
}

interface AnalyticsData {
  // Session Info
  sessionId: string;
  userId: string;
  timestamp: number;
  
  // Page Info
  path: string;
  referrer: string;
  userAgent: string;
  
  // User Info
  isReturningUser: boolean;
  visitNumber: number;
  
  // Browser Info
  viewport: {
    width: number;
    height: number;
  };
  screen: {
    width: number;
    height: number;
    colorDepth: number;
  };
  timezone: string;
  language: string;
  platform: string;
  cookieEnabled: boolean;
  
  // Performance Info
  connectionType?: string;
  deviceMemory?: number;
  hardwareConcurrency: number;
  
  // Location (if available)
  location?: {
    country?: string;
    city?: string;
  };
  
  // Click Events
  clickEvents: ClickEvent[];
}

// Click tracking utilities
const ClickTracker = {
  // Get detailed element information
  getElementDetails: (element: Element): Omit<ClickEvent, 'coordinates' | 'timestamp'> => {
    // Get all data attributes
    const dataAttributes: Record<string, string> = {};
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('data-')) {
        dataAttributes[attr.name] = attr.value;
      }
    });

    // Get element path (DOM selector path)
    const getElementPath = (el: Element): string => {
      const path: string[] = [];
      let current = el;
      
      while (current && current.nodeType === Node.ELEMENT_NODE) {
        let selector = current.nodeName.toLowerCase();
        
        if (current.id) {
          selector += `#${current.id}`;
          path.unshift(selector);
          break;
        } else {
          let sibling = current;
          let nth = 1;
          while ((sibling = sibling.previousElementSibling as Element)) {
            if (sibling.nodeName.toLowerCase() === selector) nth++;
          }
          if (nth !== 1) selector += `:nth-of-type(${nth})`;
        }
        
        path.unshift(selector);
        current = current.parentElement as Element;
      }
      
      return path.join(' > ');
    };

    return {
      elementType: element.tagName.toLowerCase(),
      elementText: element.textContent?.trim().substring(0, 100) || '',
      elementId: element.id || undefined,
      elementClass: element.className || undefined,
      href: (element as HTMLAnchorElement).href || undefined,
      dataAttributes,
      elementPath: getElementPath(element)
    };
  },

  // Determine if click should be tracked
  shouldTrack: (element: Element): boolean => {
    // Always track these elements
    const alwaysTrack = ['a', 'button', 'input'];
    if (alwaysTrack.includes(element.tagName.toLowerCase())) {
      return true;
    }

    // Track elements with click handlers
    if (element.hasAttribute('onclick') || 
        element.hasAttribute('data-track') ||
        element.getAttribute('role') === 'button') {
      return true;
    }

    // Track elements with specific classes (common button/link classes)
    const clickableClasses = [
      'btn', 'button', 'link', 'clickable', 'click',
      'nav-link', 'menu-item', 'card', 'icon'
    ];
    
    const className = element.className.toLowerCase();
    if (clickableClasses.some(cls => className.includes(cls))) {
      return true;
    }

    // Track elements with cursor pointer
    const style = window.getComputedStyle(element);
    if (style.cursor === 'pointer') {
      return true;
    }

    return false;
  },

  // Categorize the click for better analysis
  categorizeClick: (clickEvent: ClickEvent): string => {
    const { elementText, href, elementClass, dataAttributes } = clickEvent;
    
    // Social media links
    if (href?.includes('github.com') || elementText.toLowerCase().includes('github')) {
      return 'social-github';
    }
    if (href?.includes('linkedin.com') || elementText.toLowerCase().includes('linkedin')) {
      return 'social-linkedin';
    }
    if (href?.includes('twitter.com') || elementText.toLowerCase().includes('twitter')) {
      return 'social-twitter';
    }
    
    // Resume/CV related
    if (elementText.toLowerCase().includes('resume') || 
        elementText.toLowerCase().includes('cv') ||
        href?.includes('resume') ||
        href?.includes('.pdf')) {
      return 'resume';
    }
    
    // Navigation
    if (elementText.toLowerCase().includes('project')) return 'navigation-projects';
    if (elementText.toLowerCase().includes('about')) return 'navigation-about';
    if (elementText.toLowerCase().includes('contact')) return 'navigation-contact';
    if (elementText.toLowerCase().includes('home')) return 'navigation-home';
    if (elementText.toLowerCase().includes('experience')) return 'navigation-experience';
    if (elementText.toLowerCase().includes('skill')) return 'navigation-skills';
    
    // Email
    if (href?.includes('mailto:') || elementText.toLowerCase().includes('email')) {
      return 'contact-email';
    }
    
    // Downloads
    if (href?.includes('.pdf') || href?.includes('.doc') || href?.includes('.zip')) {
      return 'download';
    }
    
    // External links
    if (href && !href.includes(window.location.hostname)) {
      return 'external-link';
    }
    
    // Theme toggle
    if (elementText.toLowerCase().includes('theme') || 
        elementClass?.includes('theme') ||
        dataAttributes['data-theme']) {
      return 'ui-theme-toggle';
    }
    
    // Form buttons
    if (elementText.toLowerCase().includes('submit') || 
        elementText.toLowerCase().includes('send')) {
      return 'form-submit';
    }
    
    return 'other';
  }
};

// Enhanced analytics hook with comprehensive click tracking
export const useAnalytics = () => {
  useEffect(() => {
    const clickEvents: ClickEvent[] = [];
    
    const generateAnalytics = async () => {
      // Generate session ID
      let sessionId = sessionStorage.getItem('portfolio_session_id');
      if (!sessionId) {
        sessionId = 'session_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
        sessionStorage.setItem('portfolio_session_id', sessionId);
      }

      // Generate user ID
      let userId = localStorage.getItem('portfolio_user_id');
      let isReturningUser = true;
      let visitNumber = 1;

      if (!userId) {
        userId = 'user_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
        localStorage.setItem('portfolio_user_id', userId);
        isReturningUser = false;
      }

      // Get visit count
      const userData = JSON.parse(localStorage.getItem('portfolio_user_data') || '{}');
      if (userData[userId]) {
        visitNumber = userData[userId].visitCount + 1;
        userData[userId].visitCount = visitNumber;
        userData[userId].lastVisit = Date.now();
      } else {
        userData[userId] = {
          firstVisit: Date.now(),
          lastVisit: Date.now(),
          visitCount: 1
        };
      }
      localStorage.setItem('portfolio_user_data', JSON.stringify(userData));

      // Get location data
      let locationData = {};
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          locationData = {
            country: data.country_name,
            city: data.city
          };
        }
      } catch (error) {
        console.warn('Could not fetch location data');
      }

      // Compile complete analytics object with click events
      const analytics: AnalyticsData = {
        // Session Info
        sessionId,
        userId,
        timestamp: Date.now(),
        
        // Page Info
        path: window.location.pathname,
        referrer: document.referrer || 'Direct',
        userAgent: navigator.userAgent,
        
        // User Info
        isReturningUser,
        visitNumber,
        
        // Browser Info
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        screen: {
          width: screen.width,
          height: screen.height,
          colorDepth: screen.colorDepth
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        
        // Performance Info
        connectionType: (navigator as any).connection?.effectiveType,
        deviceMemory: (navigator as any).deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency,
        
        // Location (if available)
        ...(Object.keys(locationData).length > 0 && { location: locationData }),
        
        // Click Events
        clickEvents: [...clickEvents]
      };

      // Print complete analytics object
      console.log('📊 COMPLETE ANALYTICS OBJECT WITH CLICKS:');
      console.log('==========================================');
      console.log(JSON.stringify(analytics, null, 2));
      console.log('==========================================');
      
      // Print click summary
      if (clickEvents.length > 0) {
        console.log('🖱️ CLICK EVENTS SUMMARY:');
        console.log('==========================================');
        clickEvents.forEach((click, index) => {
          const category = ClickTracker.categorizeClick(click);
          console.log(`${index + 1}. [${category.toUpperCase()}] ${click.elementType} "${click.elementText}"`);
          if (click.href) console.log(`   → ${click.href}`);
        });
        console.log('==========================================');
      }
      
      // Store the analytics data
      const allAnalytics = JSON.parse(localStorage.getItem('portfolio-analytics') || '[]');
      allAnalytics.push(analytics);
      
      // Keep only last 50 entries
      if (allAnalytics.length > 50) {
        allAnalytics.splice(0, allAnalytics.length - 50);
      }
      
      localStorage.setItem('portfolio-analytics', JSON.stringify(allAnalytics));
      
      console.log('💾 Analytics stored. Total entries:', allAnalytics.length);
    };

    // Set up click tracking
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target) return;

      // Check if we should track this click
      if (!ClickTracker.shouldTrack(target)) return;

      const elementDetails = ClickTracker.getElementDetails(target);
      const clickEvent: ClickEvent = {
        ...elementDetails,
        coordinates: { x: event.clientX, y: event.clientY },
        timestamp: Date.now()
      };

      clickEvents.push(clickEvent);
      
      const category = ClickTracker.categorizeClick(clickEvent);
      
      console.log('🖱️ CLICK TRACKED:', {
        category: category.toUpperCase(),
        element: `${clickEvent.elementType}`,
        text: clickEvent.elementText,
        href: clickEvent.href,
        coordinates: clickEvent.coordinates,
        timestamp: new Date(clickEvent.timestamp).toLocaleTimeString()
      });
      
      console.log('📋 Full click details:', clickEvent);
    };

    // Add click listener to document
    document.addEventListener('click', handleClick, true);
    console.log('🖱️ Click tracking enabled - All buttons and links will be tracked');

    // Generate initial analytics
    generateAnalytics();

    // Generate final analytics when user leaves
    const handleBeforeUnload = () => {
      generateAnalytics();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        generateAnalytics();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};

// Enhanced analytics data with click analysis
export const useAnalyticsData = () => {
  const getAllAnalytics = () => {
    const data = JSON.parse(localStorage.getItem('portfolio-analytics') || '[]');
    console.log('📋 ALL STORED ANALYTICS WITH CLICKS:');
    console.log('=====================================');
    data.forEach((analytics: AnalyticsData, index: number) => {
      console.log(`Entry ${index + 1}:`);
      console.log(`Clicks: ${analytics.clickEvents?.length || 0}`);
      console.log(JSON.stringify(analytics, null, 2));
      console.log('-------------------------------------');
    });
    return data;
  };

  const getClickAnalysis = () => {
    const data = JSON.parse(localStorage.getItem('portfolio-analytics') || '[]');
    const allClicks: ClickEvent[] = [];
    
    data.forEach((analytics: AnalyticsData) => {
      if (analytics.clickEvents) {
        allClicks.push(...analytics.clickEvents);
      }
    });

    // Categorize all clicks
    const clicksByCategory: Record<string, ClickEvent[]> = {};
    allClicks.forEach(click => {
      const category = ClickTracker.categorizeClick(click);
      if (!clicksByCategory[category]) {
        clicksByCategory[category] = [];
      }
      clicksByCategory[category].push(click);
    });

    // Create summary
    const summary = Object.entries(clicksByCategory).map(([category, clicks]) => ({
      category,
      count: clicks.length,
      elements: clicks.map(c => `${c.elementType} "${c.elementText}"`).slice(0, 3),
      mostClicked: clicks.reduce((acc, click) => {
        const key = `${click.elementType} "${click.elementText}"`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    }));

    console.log('📊 CLICK ANALYSIS:');
    console.log('==========================================');
    console.log(`Total clicks tracked: ${allClicks.length}`);
    console.log('Categories:');
    summary.forEach(cat => {
      console.log(`  ${cat.category.toUpperCase()}: ${cat.count} clicks`);
      console.log(`    Examples: ${cat.elements.join(', ')}`);
    });
    console.log('==========================================');
    
    return {
      totalClicks: allClicks.length,
      categorySummary: summary,
      allClicks
    };
  };

  const getPopularElements = () => {
    const data = JSON.parse(localStorage.getItem('portfolio-analytics') || '[]');
    const clickCounts: Record<string, number> = {};
    
    data.forEach((analytics: AnalyticsData) => {
      analytics.clickEvents?.forEach(click => {
        const key = `${click.elementType} "${click.elementText}"`;
        clickCounts[key] = (clickCounts[key] || 0) + 1;
      });
    });

    const popular = Object.entries(clickCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    console.log('🔥 MOST CLICKED ELEMENTS:');
    console.log('==========================================');
    popular.forEach(([element, count], index) => {
      console.log(`${index + 1}. ${element}: ${count} clicks`);
    });
    console.log('==========================================');
    
    return popular;
  };

  const clearAllAnalytics = () => {
    localStorage.removeItem('portfolio-analytics');
    localStorage.removeItem('portfolio_user_data');
    localStorage.removeItem('portfolio_user_id');
    sessionStorage.removeItem('portfolio_session_id');
    console.log('🗑️ All analytics data cleared');
  };

  return {
    getAllAnalytics,
    getClickAnalysis,
    getPopularElements,
    clearAllAnalytics
  };
};