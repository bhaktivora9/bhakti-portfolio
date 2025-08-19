// analytics.ts - Clean and minimal for existing GTM setup

// Global dataLayer declaration
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Simple developer detection
const isDeveloperMode = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('devmode') === 'true';
};

// Initialize analytics (GTM already loaded in HTML)
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  const isDeveloper = isDeveloperMode();
  
  // Add our tracking data to existing GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'analytics_initialized',
    user_type: isDeveloper ? 'developer' : 'visitor',
    is_developer: isDeveloper
  });

  if (isDeveloper) {
    console.log('🔍 Analytics initialized - Developer Mode ON (events filtered)');
    console.log('💡 To disable: Remove ?devmode=true from URL');
  }
};

// Core tracking function
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window === 'undefined' || !window.dataLayer) return;

  const isDeveloper = isDeveloperMode();
  
  const eventData = {
    event: eventName,
    ...parameters,
    user_type: isDeveloper ? 'developer' : 'visitor',
    is_developer: isDeveloper
  };

  window.dataLayer.push(eventData);

  if (isDeveloper) {
    console.log('📊 Event:', eventName, eventData);
  }
};

// Essential tracking functions used in your App.tsx
export const trackPageView = (pageName?: string) => {
  window.dataLayer.push({
    event: 'page_view',
    page_title: pageName || document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
  });
};

export const trackFileOpen = (fileName: string, fileCategory?: string) => {
  trackEvent('file_open', {
    file_name: fileName,
    file_category: fileCategory || 'general'
  });
};

export const trackResumeDownload = () => {
  trackEvent('file_download', {
    file_name: 'resume.pdf',
    file_category: 'resume',
    value: 5
  });
};

export const trackNavigation = (section: string, fromSection?: string) => {
  trackEvent('page_navigation', {
    section_name: section,
    from_section: fromSection || 'unknown'
  });
};

export const trackInteractiveElement = (elementType: string, elementId: string, action: string = 'click') => {
  trackEvent('interactive_element', {
    element_type: elementType,
    element_id: elementId,
    action: action
  });
};

export const trackTimeOnPage = (seconds: number, page?: string) => {
  trackEvent('timing_complete', {
    name: 'time_on_page',
    value: Math.round(seconds),
    page_path: page || window.location.pathname
  });
};

// Additional functions used in your components
export const trackContactClick = (method: string, location?: string) => {
  trackEvent('contact', {
    method: method,
    contact_location: location || 'unknown'
  });
};

export const trackProjectView = (projectName: string, projectCategory?: string) => {
  trackEvent('view_item', {
    item_id: projectName.toLowerCase().replace(/\s+/g, '_'),
    item_name: projectName,
    item_category: projectCategory || 'project'
  });
};

export const trackTerminalCommand = (command: string, success: boolean = true) => {
  trackEvent('terminal_command', {
    command_name: command,
    command_success: success
  });
};

// Debug function
export const getAnalyticsDebugInfo = () => ({
  isDeveloperMode: isDeveloperMode(),
  dataLayerLength: window.dataLayer?.length || 0,
  lastEvents: window.dataLayer?.slice(-3) || []
});