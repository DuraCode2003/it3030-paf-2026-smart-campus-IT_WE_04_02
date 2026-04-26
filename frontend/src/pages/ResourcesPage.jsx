import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import FilterBar from '../components/ui/FilterBar';
import ResourceCard from '../components/ResourceCard';
import EmptyState from '../components/ui/EmptyState';
import { RESOURCES } from '../data';
import { cn } from '../utils/cn';
import { useQuery } from '@tanstack/react-query';
import { resourcesApi } from '../api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { usePermissions } from '../hooks/usePermissions';

export default function ResourcesPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    capacity: '',
    status: ''
  });

  const { canViewResource } = usePermissions();

  const { data: apiResources, isLoading } = useQuery({
    queryKey: ['resources', filters],
    queryFn: () => resourcesApi.getAll(filters).then(res => res.data),
    initialData: RESOURCES 
  });

  const displayResources = apiResources?.content || apiResources || [];

  // Filter 1: Role-based silent filtering
  const visibleToRole = displayResources.filter(r => canViewResource(r));

  // Filter 2: UI Search/Type/Status filtering
  const filteredResources = visibleToRole.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                         r.location.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = !filters.type || r.type === filters.type;
    const matchesStatus = !filters.status || r.status === filters.status;
    
    let matchesCapacity = true;
    if (filters.capacity === '1-10') matchesCapacity = r.capacity <= 10;
    else if (filters.capacity === '11-30') matchesCapacity = r.capacity > 10 && r.capacity <= 30;
    else if (filters.capacity === '31-80') matchesCapacity = r.capacity > 30 && r.capacity <= 80;
    else if (filters.capacity === '81+') matchesCapacity = r.capacity > 80;

    return matchesSearch && matchesType && matchesStatus && matchesCapacity;
  });

  const filterConfigs = [
    { key: 'search', type: 'search', label: 'Search rooms, labs, equipment...' },
    { 
      key: 'type', 
      type: 'select', 
      label: 'All Types', 
      options: [
        { value: 'LECTURE_HALL', label: 'Lecture Hall' },
        { value: 'LAB', label: 'Lab' },
        { value: 'MEETING_ROOM', label: 'Meeting Room' },
        { value: 'EQUIPMENT', label: 'Equipment' },
      ] 
    },
    { 
      key: 'capacity', 
      type: 'select', 
      label: 'Any Capacity', 
      options: [
        { value: '1-10', label: '1–10 people' },
        { value: '11-30', label: '11–30 people' },
        { value: '31-80', label: '31–80 people' },
        { value: '81+', label: '81+ people' },
      ] 
    },
    { 
      key: 'status', 
      type: 'select', 
      label: 'All Status', 
      options: [
        { value: 'ACTIVE', label: 'Available' },
        { value: 'OUT_OF_SERVICE', label: 'Out of Service' },
      ] 
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Resource Catalogue" 
        subtitle="Browse and book campus facilities and assets."
        actions={
          <div className="flex bg-white border border-zinc-200 rounded-lg p-1">
            <button 
              onClick={() => setView('grid')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                view === 'grid' ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                view === 'list' ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        }
      />

      <FilterBar 
        filters={filterConfigs} 
        values={filters} 
        onChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))}
      />

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
           <LoadingSpinner text="Fetching resources..." />
        </div>
      ) : filteredResources.length === 0 ? (
        <EmptyState 
          title="No resources found" 
          description="Try adjusting your filters or search terms."
          icon={LayoutGrid}
        />
      ) : (
        view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResources.map(r => (
              <ResourceCard 
                key={r.id} 
                resource={r} 
                onBook={() => navigate(`/bookings/new?resourceId=${r.id}`)}
                onClick={() => navigate(`/resources/${r.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Capacity</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredResources.map(r => (
                  <ResourceCard 
                    key={r.id} 
                    resource={r} 
                    view="list" 
                    onBook={() => navigate(`/bookings/new?resourceId=${r.id}`)}
                    onClick={() => navigate(`/resources/${r.id}`)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}
