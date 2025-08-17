import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Users, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your telecom platform.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-telecom-primary flex items-center gap-2">
                <Phone className="w-5 h-5" />
                234
              </div>
              <p className="text-xs text-success mt-1">↑ 12% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Online Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success flex items-center gap-2">
                <Users className="w-5 h-5" />
                18/24
              </div>
              <p className="text-xs text-muted-foreground mt-1">75% availability</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Messages Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-telecom-accent flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                1,847
              </div>
              <p className="text-xs text-success mt-1">↑ 8% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Call Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                96.2%
              </div>
              <p className="text-xs text-success mt-1">↑ 2.1% improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "call", message: "New call from +1(555)123-4567", time: "2 minutes ago", status: "success" },
                  { type: "agent", message: "Agent Sarah Johnson went online", time: "5 minutes ago", status: "info" },
                  { type: "sms", message: "SMS sent to +1(555)987-6543", time: "8 minutes ago", status: "success" },
                  { type: "system", message: "Phone number +1(555)456-7890 purchased", time: "15 minutes ago", status: "info" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === "success" ? "bg-success" : 
                      activity.status === "warning" ? "bg-warning" :
                      "bg-primary"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { service: "Phone Service", status: "operational", uptime: "99.9%" },
                  { service: "SMS Gateway", status: "operational", uptime: "99.8%" },
                  { service: "MMS Service", status: "operational", uptime: "99.5%" },
                  { service: "Analytics", status: "maintenance", uptime: "99.2%" },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === "operational" ? "bg-success" :
                        service.status === "maintenance" ? "bg-warning" :
                        "bg-destructive"
                      }`} />
                      <span className="font-medium">{service.service}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={service.status === "operational" ? "default" : "secondary"}
                        className={service.status === "operational" ? "bg-success text-success-foreground" : ""}
                      >
                        {service.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{service.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-border rounded-lg">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">4h 32m</div>
                <div className="text-sm text-muted-foreground">Avg Call Duration</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm text-muted-foreground">Successful Calls</div>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <AlertCircle className="w-8 h-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Failed Calls</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
