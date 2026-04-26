import React from 'react';
import { X, Calendar as CalendarIcon, Clock, Users, FileText } from 'lucide-react';

export default function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-card border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">New Booking Request</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-md transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form className="p-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">Select Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="date" 
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-background text-sm focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-muted-foreground">Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="time" 
                  className="w-full pl-10 pr-3 py-2 border rounded-lg bg-background text-sm focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-muted-foreground">End Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="time" 
                  className="w-full pl-10 pr-3 py-2 border rounded-lg bg-background text-sm focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">Expected Attendees</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="number" 
                placeholder="0"
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-background text-sm focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">Purpose of Booking</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea 
                rows={3}
                placeholder="Briefly describe the event..."
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-background text-sm focus:ring-1 focus:ring-primary outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 h-10 border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 h-10 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Confirm Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
