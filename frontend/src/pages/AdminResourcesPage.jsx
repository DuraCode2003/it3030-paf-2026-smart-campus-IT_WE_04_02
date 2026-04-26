import React from 'react';
import { 
  Building2, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Power
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { RESOURCES } from '../data';

export default function AdminResourcesPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Manage Resources" 
        subtitle="Configure campus facilities, equipment, and availability."
        actions={
          <Button icon={Plus}>Add Resource</Button>
        }
      />

      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100">
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Resource Name</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {RESOURCES.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-zinc-500" />
                    </div>
                    <p className="text-sm font-bold text-zinc-900">{r.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge status={r.type} className="bg-zinc-100 text-zinc-600" />
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-zinc-500 font-medium">{r.location}</p>
                </td>
                <td className="px-6 py-4">
                   <p className="text-xs text-zinc-600 font-bold">{r.capacity}</p>
                </td>
                <td className="px-6 py-4">
                  <Badge status={r.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-900">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-emerald-600">
                      <Power className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
