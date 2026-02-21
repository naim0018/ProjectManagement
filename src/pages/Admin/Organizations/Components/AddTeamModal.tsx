import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputField } from "@/common/FormFields/InputField";
import { Users } from "lucide-react";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTeamModal = ({ isOpen, onClose }: AddTeamModalProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden rounded-3xl shadow-2xl border border-slate-200 bg-white">
        
        {/* Top Accent Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700" />

        <div className="px-8 py-7">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 shadow-inner">
                <Users size={20} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-slate-900">
                  Create Team
                </DialogTitle>
                <DialogDescription className="text-slate-500 text-sm">
                  Define team structure and leadership assignment.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            
            {/* Section: Identity */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Team Identity
              </h4>

              <InputField
                label="Team Name"
                placeholder="Frontend Engineering"
                required
                autoFocus
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Short Name"
                  placeholder="FE-ENG"
                  required
                />
                <InputField
                  label="Logo URL"
                  placeholder="https://..."
                  description="Publicly accessible image link"
                />
              </div>
            </div>

            {/* Section Divider */}
            <div className="border-t border-slate-100" />

            {/* Section: Leadership */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                Leadership
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Team Leader"
                  placeholder="Full Name"
                  required
                />
                <InputField
                  label="Co-Leader"
                  placeholder="Optional"
                />
              </div>
            </div>
          </form>
        </div>

        <DialogFooter className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex justify-between">
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-7 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Create Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
