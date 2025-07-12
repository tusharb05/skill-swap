export const skills = [
  { id: 1, user: "Alice", name: "Guitar", description: "I can teach basic chords.", status: "pending" },
  { id: 2, user: "Bob", name: "Cooking", description: "Home-style Italian food.", status: "pending" },
  { id: 3, user: "Charlie", name: "Yoga", description: "Beginner yoga sessions.", status: "approved" },
  { id: 4, user: "Dave", name: "SEO", description: "Spammy SEO tricks!!!", status: "pending" },
];

export const users = [
  { id: 1, name: "Alice", email: "alice@email.com", banned: false },
  { id: 2, name: "Bob", email: "bob@email.com", banned: false },
  { id: 3, name: "Charlie", email: "charlie@email.com", banned: true },
  { id: 4, name: "Dave", email: "dave@email.com", banned: false },
];

export const swaps = [
  { id: 1, user1: "Alice", user2: "Bob", skill1: "Guitar", skill2: "Cooking", status: "pending" },
  { id: 2, user1: "Charlie", user2: "Dave", skill1: "Yoga", skill2: "SEO", status: "accepted" },
  { id: 3, user1: "Bob", user2: "Charlie", skill1: "Cooking", skill2: "Yoga", status: "cancelled" },
];

export const messages = [
  { id: 1, text: "Welcome to the new admin panel!", date: "2024-06-01 10:00" },
  { id: 2, text: "Platform downtime scheduled for June 5th.", date: "2024-06-02 14:30" },
]; 