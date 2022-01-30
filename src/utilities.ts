import { Presence } from "./typings";

const getLanyardData = async (userId: string): Promise<Presence> => {
  const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
  return (await response.json()).data;
};



export { getLanyardData };
