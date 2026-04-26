import { ROLES } from '../data';

// Resource visibility
export const canViewResource = (user, resource) => {
  if (user.role === ROLES.STUDENT) {
    return resource.type !== 'LECTURE_HALL';
  }
  return true; // LECTURER, ADMIN, TECHNICIAN see all
};

// Booking creation
export const canCreateBooking = (user, resource) => {
  if (user.role === ROLES.TECHNICIAN) return false;
  if (user.role === ROLES.STUDENT) {
    return resource.type !== 'LECTURE_HALL';
  }
  return true;
};

// Active booking limit for students
export const studentHasActiveBooking = (user, bookings) => {
  if (user.role !== ROLES.STUDENT) return false;
  return bookings.some(
    b => b.userId === user.id && b.status === 'APPROVED'
  );
};

// Booking visibility on timeline
// STUDENT and LECTURER see "Booked" only — no details
// ADMIN sees full details
export const getBookingDisplayInfo = (user, booking) => {
  if (user.role === ROLES.ADMIN) {
    return {
      label: booking.purpose,
      showDetails: true,
    };
  }
  return {
    label: 'Booked',
    showDetails: false,
  };
};

// Who can approve/reject bookings
export const canManageBookings = (user) => {
  return user.role === ROLES.ADMIN;
};

// Who can see all bookings (not just own)
export const canViewAllBookings = (user) => {
  return user.role === ROLES.ADMIN || user.role === ROLES.LECTURER;
};

// Who can see ticket details
export const canViewTicket = (user, ticket) => {
  if (user.role === ROLES.ADMIN) return true;
  if (user.role === ROLES.TECHNICIAN) {
    return ticket.assignedToId === user.id;
  }
  // STUDENT and LECTURER see only their own
  return ticket.reportedById === user.id;
};

// Who can manage tickets (assign, change status)
export const canManageTicket = (user, ticket) => {
  if (user.role === ROLES.ADMIN) return true;
  if (user.role === ROLES.TECHNICIAN) {
    return ticket.assignedToId === user.id;
  }
  return false;
};

// Who can manage resources
export const canManageResources = (user) => {
  return user.role === ROLES.ADMIN;
};

// Who can manage users
export const canManageUsers = (user) => {
  return user.role === ROLES.ADMIN;
};

// Navigation visibility
export const getVisibleNavItems = (user) => ({
  dashboard: true,
  resources: user.role !== ROLES.TECHNICIAN,
  allAvailability: user.role === ROLES.LECTURER,
  myBookings: user.role === ROLES.STUDENT || user.role === ROLES.LECTURER,
  allBookings: user.role === ROLES.ADMIN,
  myTickets: user.role === ROLES.STUDENT || user.role === ROLES.LECTURER,
  assignedTickets: user.role === ROLES.TECHNICIAN,
  allTickets: user.role === ROLES.ADMIN,
  manageResources: user.role === ROLES.ADMIN,
  manageUsers: user.role === ROLES.ADMIN,
  notifications: true,
});
