import React from 'react';
import { Mail, Shield, User as UserIcon } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { USERS } from '../data';

export default function AdminUsersPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="User Management" 
        subtitle="Manage campus staff and student accounts and roles."
      />

      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100">
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {USERS.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} initials={user.initials} size="md" />
                    <p className="text-sm font-bold text-zinc-900">{user.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                     <Mail className="w-3.5 h-3.5" />
                     {user.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge status={user.role} />
                </td>
                <td className="px-6 py-4 text-right">
                  <select 
                    className="bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-xs font-bold focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer"
                    defaultValue={user.role}
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="LECTURER">LECTURER</option>
                    <option value="TECHNICIAN">TECHNICIAN</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
