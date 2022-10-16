import { atom } from "jotai";
import { ActiveView } from "./types/ActiveView";
import { Channel } from "./types/Channel";
import { Server } from "./types/Server";

export const lastSeenChannelAtom = atom<Channel | null>(null);
export const lastSeenServerAtom = atom<Server | null>(null);
export const createServerModalVisibleAtom = atom<boolean>(false);
export const createServerModalViewAtom = atom<ActiveView>("initial");
