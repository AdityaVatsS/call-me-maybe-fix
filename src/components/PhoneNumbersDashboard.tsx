import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Phone, MessageSquare, Mail, Search, Filter, Download, Plus } from "lucide-react";
import { BuyPhoneNumberModal } from "./BuyPhoneNumberModal";
import { toast } from "@/hooks/use-toast";

interface PhoneNumber {
  id: string;
  number: string;
  type: "Local" | "Toll-free";
  capabilities: ("Call" | "SMS" | "MMS")[];
  owner: string;
  sharedWith: string[];
  location?: string;
  country: string;
}

const mockPhoneNumbers: PhoneNumber[] = [
  {
    id: "1",
    number: "+1(555)123-4567",
    type: "Local",
    capabilities: ["Call", "SMS", "MMS"],
    owner: "John Doe",
    sharedWith: [],
    location: "New York",
    country: "US"
  },
  {
    id: "2", 
    number: "+1(555)234-5678",
    type: "Local",
    capabilities: ["Call", "SMS", "MMS"],
    owner: "Jane Smith",
    sharedWith: ["AL", "WI"],
    location: "California",
    country: "US"
  },
  {
    id: "3",
    number: "+1(555)345-6789", 
    type: "Local",
    capabilities: ["Call", "SMS", "MMS"],
    owner: "Mike Johnson",
    sharedWith: ["AL"],
    location: "Texas",
    country: "US"
  },
  {
    id: "4",
    number: "+1(555)456-7890",
    type: "Local", 
    capabilities: ["Call", "SMS", "MMS"],
    owner: "Sarah Wilson",
    sharedWith: [],
    location: "Florida",
    country: "US"
  },
  {
    id: "5",
    number: "+1(555)567-8901",
    type: "Local",
    capabilities: ["Call", "SMS", "MMS"], 
    owner: "David Brown",
    sharedWith: ["WI"],
    location: "Illinois",
    country: "US"
  }
];

export const PhoneNumbersDashboard = () => {
  const [phoneNumbers] = useState<PhoneNumber[]>(mockPhoneNumbers);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBuyModal, setShowBuyModal] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNumbers(phoneNumbers.map(p => p.id));
    } else {
      setSelectedNumbers([]);
    }
  };

  const handleSelectNumber = (numberId: string, checked: boolean) => {
    if (checked) {
      setSelectedNumbers([...selectedNumbers, numberId]);
    } else {
      setSelectedNumbers(selectedNumbers.filter(id => id !== numberId));
    }
  };

  const handleCall = (number: string) => {
    toast({
      title: "Initiating Call",
      description: `Calling ${number}...`,
      duration: 3000,
    });
    // Here you would integrate with your telephony service
    console.log(`Calling ${number}`);
  };

  const handleSMS = (number: string) => {
    toast({
      title: "Opening SMS",
      description: `Opening SMS for ${number}...`,
      duration: 3000,
    });
    // Here you would open SMS interface
    console.log(`Opening SMS for ${number}`);
  };

  const handleMMS = (number: string) => {
    toast({
      title: "Opening MMS",
      description: `Opening MMS for ${number}...`,
      duration: 3000,
    });
    // Here you would open MMS interface
    console.log(`Opening MMS for ${number}`);
  };

  const filteredNumbers = phoneNumbers.filter(number =>
    number.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    number.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    number.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Phone Numbers</h1>
            <p className="text-muted-foreground mt-1">Manage your phone numbers and telephony services</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button onClick={() => setShowBuyModal(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Number
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-telecom-primary">{phoneNumbers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">SMS Enabled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{phoneNumbers.filter(p => p.capabilities.includes("SMS")).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Call Enabled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-telecom-accent">{phoneNumbers.filter(p => p.capabilities.includes("Call")).length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search numbers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Phone Numbers Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedNumbers.length === phoneNumbers.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Phone Numbers</TableHead>
                  <TableHead>Number Type</TableHead>
                  <TableHead>Capabilities</TableHead>
                  <TableHead>Number Owner</TableHead>
                  <TableHead>Shared with</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNumbers.map((phoneNumber) => (
                  <TableRow key={phoneNumber.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedNumbers.includes(phoneNumber.id)}
                        onCheckedChange={(checked) => handleSelectNumber(phoneNumber.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {phoneNumber.country}
                          </span>
                        </div>
                        <div>
                          <div className="font-mono font-medium">{phoneNumber.number}</div>
                          {phoneNumber.location && (
                            <div className="text-xs text-muted-foreground">{phoneNumber.location}</div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{phoneNumber.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {phoneNumber.capabilities.includes("Call") && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-telecom-primary hover:text-telecom-primary hover:bg-telecom-primary/10 h-6 px-2 text-xs"
                            onClick={() => handleCall(phoneNumber.number)}
                          >
                            Call
                          </Button>
                        )}
                        {phoneNumber.capabilities.includes("SMS") && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-telecom-primary hover:text-telecom-primary hover:bg-telecom-primary/10 h-6 px-2 text-xs"
                            onClick={() => handleSMS(phoneNumber.number)}
                          >
                            SMS
                          </Button>
                        )}
                        {phoneNumber.capabilities.includes("MMS") && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-telecom-primary hover:text-telecom-primary hover:bg-telecom-primary/10 h-6 px-2 text-xs"
                            onClick={() => handleMMS(phoneNumber.number)}
                          >
                            MMS
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{phoneNumber.owner}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {phoneNumber.sharedWith.length > 0 ? (
                          phoneNumber.sharedWith.map((shared, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {shared}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredNumbers.length} of {phoneNumbers.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>

      <BuyPhoneNumberModal 
        open={showBuyModal} 
        onOpenChange={setShowBuyModal}
      />
    </div>
  );
};