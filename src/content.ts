import { IActivityContent } from "./typings";

const USER_ID = "335394597763153920";
const APPLICATIONS_RESPONSES: Record<string, IActivityContent> = {
  Spotify: {
    state: (state?: string) => `By ${state}`,
    details: (details?: string) => `${details}`,
  },
  "Visual Studio Code": {
    state: (state?: string) => `${state}`,
    details: (details?: string) => `${details}`,
  },
};

export { APPLICATIONS_RESPONSES, USER_ID };
