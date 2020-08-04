export interface Friend {
  id: string;
}

const friends: Friend[] = [
  {
    id: "@save_afk:matrix.org"
  },
  {
    id: "@mimmo_cordero:matrix.org"
  },
  {
    id: "@patricia:matrix.org"
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
