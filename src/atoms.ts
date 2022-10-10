import { atom } from "jotai";
import { Channel } from "./types/Channel";
import { Server } from "./types/Server";

export const lastSeenChannelAtom = atom<Channel | null>(null);
export const lastSeenServerAtom = atom<Server | null>(null);
