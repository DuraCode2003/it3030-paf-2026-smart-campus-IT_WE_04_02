import { useAuth } from './useAuth';
import * as permissions from '../utils/permissions';

export const usePermissions = () => {
  const { currentUser } = useAuth();

  // Return all permission functions pre-bound to the current user
  return {
    canViewResource: (resource) => permissions.canViewResource(currentUser, resource),
    canCreateBooking: (resource) => permissions.canCreateBooking(currentUser, resource),
    studentHasActiveBooking: (bookings) => permissions.studentHasActiveBooking(currentUser, bookings),
    getBookingDisplayInfo: (booking) => permissions.getBookingDisplayInfo(currentUser, booking),
    canManageBookings: () => permissions.canManageBookings(currentUser),
    canViewAllBookings: () => permissions.canViewAllBookings(currentUser),
    canViewTicket: (ticket) => permissions.canViewTicket(currentUser, ticket),
    canManageTicket: (ticket) => permissions.canManageTicket(currentUser, ticket),
    canManageResources: () => permissions.canManageResources(currentUser),
    canManageUsers: () => permissions.canManageUsers(currentUser),
    navItems: permissions.getVisibleNavItems(currentUser),
  };
};
