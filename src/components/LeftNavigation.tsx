// Enhanced version with some improvements

import React, { useState, useCallback } from 'react';
// @ts-ignore
import TerminalIconWithBlink from '../animations/TerminalIconWithBlink';
// @ts-ignore
import { UserLookingAroundAnimation } from '../animations/UserLookingAroundAnimation';
import {
  Files,
  Search,
  GitBranch,
  Package,
  Settings,
  Terminal as TerminalIcon,
  X,
  User
} from 'lucide-react';

// Types
interface NavigationItem {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
  active?: boolean;
}

interface PopupState {
  show: boolean;
  message: string;
  type: 'info' | 'error' | 'success';
}

interface NotificationCounts {
  search: number;
  'source-control': number;
  extensions: number;
  accounts: number;
  settings: number;
}

interface LeftNavigationProps {
  id?: string;
  onItemClick?: (itemId: string) => void;
  isExplorerCollapsed?: boolean;
  setIsExplorerCollapsed?: (collapsed: boolean) => void;
  isTerminalOpen?: boolean;
  setIsTerminalOpen?: (open: boolean) => void;
  isTerminalMinimized?: boolean;
  setIsTerminalMinimized?: (minimized: boolean) => void;
  isDarkTheme?: boolean;
  setIsDarkTheme?: (isDark: boolean) => void;
  activeNavItem?: string;
  setActiveNavItem?: (item: string) => void;
}

// Constants
const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'explorer', icon: Files, label: 'Explorer', active: true },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'source-control', icon: GitBranch, label: 'Source Control' },
  { id: 'extensions', icon: Package, label: 'Extensions' },
  { id: 'terminal', icon: TerminalIcon, label: 'Terminal' },
];

const BOTTOM_ITEMS: NavigationItem[] = [
  { id: 'accounts', icon: User, label: 'Accounts' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

const GIT_ERROR_MESSAGES = [
  "Repository does not exist",
  "No longer allowed to contribute", 
  "You are not authorized",
  "Access denied",
  "Repository archived",
] as const;

const ANIMATION_CLASSES = {
  search: 'animate-bounce',
  'source-control': 'animate-pulse',
  extensions: 'animate-spin',
  settings: 'animate-spin',
  default: 'animate-pulse',
} as const;

export const LeftNavigation: React.FC<LeftNavigationProps> = ({
  id,
  onItemClick,
  isExplorerCollapsed,
  setIsExplorerCollapsed,
  isTerminalOpen,
  setIsTerminalOpen,
  isTerminalMinimized,
  setIsTerminalMinimized,
  isDarkTheme,
  setIsDarkTheme,
  activeNavItem: propActiveNavItem,
  setActiveNavItem: propSetActiveNavItem
}) => {
  // State management
  const [localActiveNavItem, setLocalActiveNavItem] = useState('explorer');
  const activeNavItem = propActiveNavItem || localActiveNavItem;
  const setActiveNavItem = propSetActiveNavItem || setLocalActiveNavItem;
  
  const [notifications, setNotifications] = useState<NotificationCounts>({
    search: 0,
    'source-control': 0,
    extensions: 0,
    accounts: 0,
    settings: 0
  });
  
  const [uiState, setUiState] = useState({
    settingsHovered: false,
    settingsAnimating: false,
    terminalCursorBlink: false,
    shakeItem: null as string | null,
  });
  
  const [showPopup, setShowPopup] = useState<PopupState>({
    show: false,
    message: '',
    type: 'info'
  });

  // Handlers
  const hidePopup = useCallback(() => {
    setShowPopup({ show: false, message: '', type: 'info' });
  }, []);

  const showPopupMessage = useCallback((message: string, type: PopupState['type'], duration = 3000) => {
    setShowPopup({ show: true, message, type });
    setTimeout(hidePopup, duration);
  }, [hidePopup]);



  const triggerAnimation = useCallback((itemId: string, duration = 600) => {
    setUiState(prev => ({ ...prev, shakeItem: itemId }));
    setTimeout(() => {
      setUiState(prev => ({ ...prev, shakeItem: null }));
    }, duration);
  }, []);

  const handleItemClick = useCallback((itemId: string) => {
    setActiveNavItem(itemId);
    
    switch (itemId) {
      case "explorer":
        setIsExplorerCollapsed?.(!isExplorerCollapsed);
        break;
        
      case "terminal":
        if (isTerminalOpen) {
          setIsTerminalOpen?.(false);
          setIsTerminalMinimized?.(false);
          setActiveNavItem("explorer");
        } else {
          setIsTerminalOpen?.(true);
          setIsTerminalMinimized?.(false);
        }
        // Terminal cursor blink effect
        setUiState(prev => ({ ...prev, terminalCursorBlink: true }));
        setTimeout(() => {
          setUiState(prev => ({ ...prev, terminalCursorBlink: false }));
        }, 50);
        break;
        
      case "theme-toggle":
        setIsDarkTheme?.(!isDarkTheme);
        break;
        
      case "search":
        triggerAnimation(itemId);
        showPopupMessage("🔍 Searching through 847 files...", "info");
        break;
        
      case "source-control": {
        triggerAnimation(itemId);
        const currentCount = notifications["source-control"];
        const nextCount = (currentCount % GIT_ERROR_MESSAGES.length) + 1;
        setNotifications(prev => ({ ...prev, "source-control": nextCount }));
        const errorMsg = GIT_ERROR_MESSAGES[nextCount - 1];
        showPopupMessage(`🚫 Git Error: ${errorMsg}`, "error", 4000);
        break;
      }
      
      case "extensions":
        triggerAnimation(itemId, 800);
        showPopupMessage("📦 Installing new extensions...", "success");
        break;
        
      case 'settings':
        setUiState(prev => ({ ...prev, settingsAnimating: true }));
        setTimeout(() => {
          setUiState(prev => ({ ...prev, settingsAnimating: false }));
        }, 2000);
        break;
        
      case "accounts":
        break;
    }
    
    onItemClick?.(itemId);
  }, [
    activeNavItem, setActiveNavItem, isExplorerCollapsed, setIsExplorerCollapsed,
    isTerminalOpen, setIsTerminalOpen, setIsTerminalMinimized, isDarkTheme,
    setIsDarkTheme, notifications, triggerAnimation, showPopupMessage, onItemClick
  ]);

  const handleSettingsHover = useCallback((isHovered: boolean) => {
    setUiState(prev => ({ 
      ...prev, 
      settingsHovered: isHovered,
      settingsAnimating: isHovered ? true : prev.settingsAnimating
    }));
    
    if (isHovered) {
      setTimeout(() => {
        setUiState(prev => ({ ...prev, settingsAnimating: false }));
      }, 2000);
    }
  }, []);

  // Memoized calculations
  const getItemAnimation = useCallback((itemId: string) => {
    if (uiState.shakeItem !== itemId) return '';
    return ANIMATION_CLASSES[itemId as keyof typeof ANIMATION_CLASSES] || ANIMATION_CLASSES.default;
  }, [uiState.shakeItem]);

  const isItemActive = useCallback((itemId: string) => {
    switch (itemId) {
      case 'explorer':
        return !isExplorerCollapsed;
      case 'terminal':
        return (isTerminalOpen && !isTerminalMinimized) || activeNavItem === 'terminal';
      default:
        return activeNavItem === itemId;
    }
  }, [activeNavItem, isExplorerCollapsed, isTerminalOpen, isTerminalMinimized]);

  // Render helpers
  const renderNavigationItem = useCallback((item: NavigationItem, isBottomItem = false) => {
    const Icon = item.icon;
    const isActive = isItemActive(item.id);
    const hasNotification = notifications[item.id as keyof typeof notifications] > 0;
    const animationClass = getItemAnimation(item.id);

    return (
      <div key={item.id} id={`left-nav-${isBottomItem ? 'bottom-' : ''}item-${item.id}`} className="relative w-full">
        <button
          id={`left-nav-${isBottomItem ? 'bottom-' : ''}button-${item.id}`}
          className={`w-full h-12 p-0 mb-1 flex items-center justify-center transition-all duration-200 hover:bg-[var(--vscode-bg-tertiary)] hover:text-[var(--vscode-accent)] group ${animationClass} ${
            isActive 
              ? 'border-r-2 border-r-[var(--vscode-accent)] bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)]' 
              : 'text-[var(--vscode-text-secondary)] border-r-2 border-r-transparent'
          }`}
          onClick={() => handleItemClick(item.id)}
          onMouseEnter={() => item.id === 'settings' && handleSettingsHover(true)}
          onMouseLeave={() => item.id === 'settings' && handleSettingsHover(false)}
          title={item.label}
          aria-label={item.label}
          aria-pressed={isActive}
        >
          {item.id === 'terminal' ? (
            <TerminalIconWithBlink 
              size={20}
              color={isActive ? 'var(--vscode-text-primary)' : 'currentColor'}
              hoverColor="var(--vscode-accent)"
              animated={false}
              forceBlinking={uiState.terminalCursorBlink}
              className={`transition-all duration-300 group-hover:animate-none ${
                isActive ? 'text-[var(--vscode-text-primary)]' : 'text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)]'
              } ${!isActive ? 'animate-soft-bounce' : ''}`}
            />
          ) : item.id === 'accounts' ? (
            <UserLookingAroundAnimation 
              size={20}
              color={isActive ? 'var(--vscode-text-primary)' : 'var(--vscode-text-secondary)'}
              hoverColor="var(--vscode-accent)"
              triggerAnimation={true}
              className={`transition-all duration-200 group-hover:text-[var(--vscode-accent)] ${
                isActive ? 'text-[var(--vscode-text-primary)]' : 'text-[var(--vscode-text-secondary)]'
              }`}
            />
          ) : (
            <Icon 
              size={20} 
              className={`transition-all duration-200 ${
                (uiState.settingsAnimating || uiState.settingsHovered) && item.id === 'settings' ? 'animate-settings-rotation' : ''
              } ${
                isActive ? 'text-[var(--vscode-text-primary)]' : 'text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)]'
              }`} 
            />
          )}
        </button>
        
        {hasNotification && (
          <div 
            id={`left-nav-${isBottomItem ? 'bottom-' : ''}notification-${item.id}`} 
            className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center animate-pulse"
            aria-label={`${notifications[item.id as keyof typeof notifications]} notifications`}
          >
            <span className="text-white text-[10px] font-bold">
              {notifications[item.id as keyof typeof notifications]}
            </span>
          </div>
        )}
      </div>
    );
  }, [isItemActive, notifications, getItemAnimation, handleItemClick, handleSettingsHover, uiState]);

  return (
    <nav 
      id={id || "left-navigation-container"}  
      className="relative w-12 bg-[var(--vscode-bg-primary)] h-full flex flex-col border-r border-[var(--vscode-border)] shadow-sm transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      {showPopup.show && (
        <div 
          id="left-navigation-popup" 
          className={`fixed top-16 z-50 animate-slide-in-right ${isExplorerCollapsed ? 'left-16' : 'left-64'}`}
          role="alert"
          aria-live="polite"
        >
          <div className={`px-4 py-3 rounded-lg shadow-lg border max-w-xs backdrop-blur-sm ${
            showPopup.type === 'error'
              ? 'bg-red-900/90 border-red-700 text-red-200'
              : showPopup.type === 'success'
              ? 'bg-green-900/90 border-green-700 text-green-200'
              : 'bg-blue-900/90 border-blue-700 text-blue-200'
          }`}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium font-sans">{showPopup.message}</span>
              <button 
                onClick={hidePopup}
                className="text-current hover:opacity-70 transition-opacity"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div id="left-navigation-main-items" className="flex-1 py-2">
        {NAVIGATION_ITEMS.map(item => renderNavigationItem(item))}
      </div>

      <div id="left-navigation-bottom-items" className="py-2">
        {BOTTOM_ITEMS.map(item => renderNavigationItem(item, true))}
      </div>
    </nav>
  );
};