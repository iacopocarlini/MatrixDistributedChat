export interface Friend {
  id: string;
}

const friends: Friend[] = [
  {
    id: "@save_afk:matrix.org"
  },
  {
    id: "@otacon:matrix.org"
  },
  {
    id: "@naomi_hunter:matrix.org"
  },
  {
    id: "@kevin:matrix.org"
  },
  {
    id: "@ursula:matrix.org"
  },
];

export const getFriends = () => friends;
// export const getFriendId = (id: number) => messages.find(m => m.id === id);
