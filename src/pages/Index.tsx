import { useState } from "react";
import { PhoneNumbersDashboard } from "@/components/PhoneNumbersDashboard";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "phone":
        return <PhoneNumbersDashboard />;
      case "agent":
        return (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Agent Section</h1>
              <p className="text-xl text-muted-foreground">Agent functionality will appear here</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to TalkerIQ</h1>
              <p className="text-xl text-muted-foreground">Select a section from the navigation above</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold text-foreground">TalkerIQ</div>
            <div className="flex gap-6">
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === "dashboard" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveSection("phone")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === "phone" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Phone
              </button>
              <button
                onClick={() => setActiveSection("agent")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === "agent" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                Agent
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      {renderContent()}
    </div>
  );
};

export default Index;
