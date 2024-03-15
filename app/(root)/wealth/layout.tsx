"use client";

import { Button } from "@/components/ui/button";
// HUH
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { SideMenu } from "@/components/wealth/SideMenu/SideMenu";
import { UnfoldHorizontalIcon } from "lucide-react";
import { useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

export default function Layout({ children }: { children: React.ReactNode }) {
  const panel = useRef<ImperativePanelHandle>(null);
  const [isCollapsed, setIsCollapsed] = useState(panel.current?.isCollapsed());

  const togglePanel = () => {
    const collapsed = panel.current?.isCollapsed();
    setIsCollapsed(!collapsed);

    if (collapsed) {
      panel.current?.expand();
    } else {
      panel.current?.collapse();
    }
  };

  return (
    <section className="flex h-[calc(100dvh-64px)]">
      <ResizablePanelGroup direction="horizontal" className="relative">
        <ResizablePanel collapsible collapsedSize={5} ref={panel} defaultSize={20} maxSize={20} minSize={5}>
          <SideMenu onCollapse={togglePanel} isCollapsed={isCollapsed} />
        </ResizablePanel>
        <ResizablePanel defaultSize={80}>
          <div className="flex-1 overflow-auto">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
}
