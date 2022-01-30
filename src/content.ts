import { IActivityContent } from "./typings";

const CONTENT: Record<string, IActivityContent> = {
  Spotify: {
    state: (state?: string) => `By ${state}`,
    details: (details?: string) => `${details}`,
  },
  "Visual Studio Code": {
    state: (state?: string) => `${state}`,
    details: (details?: string) => `${details}`,
  },
};

export { CONTENT };
