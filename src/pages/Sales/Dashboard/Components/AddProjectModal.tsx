import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, DollarSign, Calendar, User, Briefcase } from "lucide-react";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProjectModal = ({ isOpen, onClose }: AddProjectModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] border-slate-200 rounded-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
              <ShoppingCart size={18} />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-900">Add New Order</DialogTitle>
          </div>
          <DialogDescription className="text-slate-500">
            Initialize a new sales project or Fiverr order in your pipeline.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="client" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <User size={12} /> Client Name
              </Label>
              <Input id="client" placeholder="e.g. John Doe" className="h-10 border-slate-200 rounded-lg focus-visible:ring-brand-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="platform" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Briefcase size={12} /> Platform
              </Label>
              <Select defaultValue="fiverr">
                <SelectTrigger id="platform" className="h-10 border-slate-200 rounded-lg focus-visible:ring-brand-500">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fiverr">Fiverr</SelectItem>
                  <SelectItem value="upwork">Upwork</SelectItem>
                  <SelectItem value="direct">Direct Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              Service / Gig Name
            </Label>
            <Input id="service" placeholder="e.g. Full Stack Web Development" className="h-10 border-slate-200 rounded-lg focus-visible:ring-brand-500" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="price" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <DollarSign size={12} /> Project Value
              </Label>
              <Input id="price" type="number" placeholder="0.00" className="h-10 border-slate-200 rounded-lg focus-visible:ring-brand-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline" className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Calendar size={12} /> Delivery Date
              </Label>
              <Input id="deadline" type="date" className="h-10 border-slate-200 rounded-lg focus-visible:ring-brand-500" />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="rounded-lg font-semibold border-slate-200">
            Cancel
          </Button>
          <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg shadow-sm">
            Create Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
