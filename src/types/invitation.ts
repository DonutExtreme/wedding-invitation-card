export interface InvitationDetails {
  brideFirst: string;
  groomFirst: string;
  date: string;
  time: string;
  venue: string;
  message: string;
}

export const defaultDetails: InvitationDetails = {
  brideFirst: "Isabella",
  groomFirst: "Alexander",
  date: "Saturday, December 20th, 2025",
  time: "Four O'Clock in the Afternoon",
  venue: "The Grand Palace Ballroom, Beverly Hills",
  message: "Together with their families, request the pleasure of your company at the celebration of their marriage",
};
