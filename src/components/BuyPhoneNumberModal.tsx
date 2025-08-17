import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PhoneNumberOption {
  number: string;
  location: string;
  price: number;
  capabilities: string[];
}

const mockAvailableNumbers: PhoneNumberOption[] = [
  { number: "+1(762)263-1409", location: "Wilmington", price: 1.15, capabilities: ["Voice", "SMS"] },
  { number: "+1(775)369-7206", location: "Imlay", price: 1.15, capabilities: ["Voice", "SMS"] },
  { number: "+1(938)223-1107", location: "Red Bay", price: 1.15, capabilities: ["Voice", "SMS"] },
  { number: "+1(775)269-7954", location: "Mcgill", price: 1.15, capabilities: ["Voice", "SMS"] },
  { number: "+1(270)812-9623", location: "Hawesville", price: 1.15, capabilities: ["Voice", "SMS"] },
  { number: "+1(231)440-1145", location: "Baldwin", price: 1.15, capabilities: ["Voice", "SMS"] },
  { number: "+1(231)272-5896", location: "Kingsley", price: 1.15, capabilities: ["Voice", "SMS"] },
  { number: "+1(856)406-2712", location: "Merchantville", price: 1.15, capabilities: ["Voice", "SMS"] },
  { number: "+1(856)432-7839", location: "Gloucester", price: 1.15, capabilities: ["Voice", "SMS"] },
];

interface BuyPhoneNumberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BuyPhoneNumberModal = ({ open, onOpenChange }: BuyPhoneNumberModalProps) => {
  const [selectedProvider, setSelectedProvider] = useState("twilio");
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

  const filteredNumbers = mockAvailableNumbers.filter(number =>
    number.number.includes(searchQuery) || 
    number.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredNumbers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNumbers = filteredNumbers.slice(startIndex, startIndex + itemsPerPage);

  const handleNumberSelect = (number: string) => {
    setSelectedNumbers(prev => 
      prev.includes(number) 
        ? prev.filter(n => n !== number)
        : [...prev, number]
    );
  };

  const handlePurchase = () => {
    if (selectedNumbers.length === 0) {
      toast({
        title: "No numbers selected",
        description: "Please select at least one phone number to purchase.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Purchase Initiated",
      description: `Purchasing ${selectedNumbers.length} phone number(s)...`,
      duration: 3000,
    });

    // Here you would integrate with your telephony provider's API
    console.log("Purchasing numbers:", selectedNumbers);
    
    // Reset state and close modal
    setSelectedNumbers([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Buy Phone Number</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Provider Selection */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={selectedProvider === "twilio" ? "default" : "outline"}
              onClick={() => setSelectedProvider("twilio")}
              className="flex-1"
            >
              Twilio
            </Button>
            <Button
              variant={selectedProvider === "telnyx" ? "default" : "outline"}
              onClick={() => setSelectedProvider("telnyx")}
              className="flex-1 bg-muted text-muted-foreground"
            >
              Telnyx
            </Button>
          </div>

          {/* Search and Country Selection */}
          <div className="flex gap-3 mb-4">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-48">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-semibold">🇺🇸</span>
                  </div>
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">
                  <div className="flex items-center gap-2">
                    <span>🇺🇸</span>
                    <span>United States</span>
                  </div>
                </SelectItem>
                <SelectItem value="ca">
                  <div className="flex items-center gap-2">
                    <span>🇨🇦</span>
                    <span>Canada</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search numbers e.g. 650"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Price Info */}
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              Starting from <span className="font-semibold text-foreground">$1.15/month</span>
            </div>
          </div>

          {/* Numbers List */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {paginatedNumbers.map((phoneNumber, index) => (
                <Card
                  key={phoneNumber.number}
                  className={`cursor-pointer transition-all hover:bg-accent/50 ${
                    selectedNumbers.includes(phoneNumber.number) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : ''
                  }`}
                  onClick={() => handleNumberSelect(phoneNumber.number)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-mono font-medium text-lg">
                          {phoneNumber.number}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {phoneNumber.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {phoneNumber.capabilities.map((capability) => (
                            <Badge key={capability} variant="secondary" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold">
                            ${phoneNumber.price.toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            /month
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing first {Math.min(itemsPerPage, filteredNumbers.length)} results
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <span className="text-sm">
                {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedNumbers.length > 0 && (
              <>Selected: {selectedNumbers.length} number(s)</>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handlePurchase}
              disabled={selectedNumbers.length === 0}
            >
              Save ({selectedNumbers.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};