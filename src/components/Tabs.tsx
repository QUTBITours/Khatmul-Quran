import React from 'react';
import './Tabs.css';

interface TabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
  children: React.ReactNode;
}

interface TabProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onChange, children }) => {
  // Filter out non-Tab children and extract their props
  const tabs = React.Children.toArray(children)
    .filter((child): child is React.ReactElement<TabProps> => 
      React.isValidElement(child) && 'id' in child.props
    )
    .map(child => ({
      id: child.props.id,
      title: child.props.title
    }));

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {React.Children.toArray(children).filter((child): child is React.ReactElement<TabProps> => 
          React.isValidElement(child) && child.props.id === activeTab
        )}
      </div>
    </div>
  );
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div className="tab-panel">{children}</div>;
};