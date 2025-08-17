import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, UserCheck, UserX, Clock } from "lucide-react";

const AgentsPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agents</h1>
            <p className="text-muted-foreground mt-1">Manage your team of agents and their performance</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Agent
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary flex items-center gap-2">
                <Users className="w-5 h-5" />
                24
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Online</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                18
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Offline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive flex items-center gap-2">
                <UserX className="w-5 h-5" />
                6
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">On Break</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning flex items-center gap-2">
                <Clock className="w-5 h-5" />
                3
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents List */}
        <Card>
          <CardHeader>
            <CardTitle>Agent List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", status: "Online", calls: 15, satisfaction: 98 },
                { name: "Mike Chen", status: "Online", calls: 12, satisfaction: 95 },
                { name: "Emma Davis", status: "Break", calls: 8, satisfaction: 97 },
                { name: "Alex Rivera", status: "Offline", calls: 0, satisfaction: 92 },
              ].map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">{agent.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{agent.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant={agent.status === "Online" ? "default" : agent.status === "Break" ? "secondary" : "outline"}
                          className={
                            agent.status === "Online" ? "bg-success text-success-foreground" :
                            agent.status === "Break" ? "bg-warning text-warning-foreground" :
                            "bg-destructive text-destructive-foreground"
                          }
                        >
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="text-center">
                      <div className="font-medium text-foreground">{agent.calls}</div>
                      <div>Calls Today</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{agent.satisfaction}%</div>
                      <div>Satisfaction</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentsPage;