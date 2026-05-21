'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextType>({
  activeTab: '',
  setActiveTab: () => {},
});

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

function Tabs({ defaultValue = '', value, onValueChange, children, className }: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeTab = value ?? internalValue;

  const setActiveTab = (tab: string) => {
    setInternalValue(tab);
    onValueChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-lg bg-[#0F1117] p-1 border border-[#1E2A3A]',
        className
      )}
    >
      {children}
    </div>
  );
}

function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
        isActive
          ? 'bg-red-600 text-white shadow-sm'
          : 'text-slate-400 hover:text-white hover:bg-white/5',
        className
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab } = React.useContext(TabsContext);
  if (activeTab !== value) return null;

  return <div className={cn('mt-4', className)}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
