import { APPLICATIONS_RESPONSES } from "./content";
import { Activity, Presence } from "./typings";

const getLanyardData = async (userId: string): Promise<Presence> => {
  const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
  return (await response.json()).data;
};

const getImage = (activity?: Activity) => {
  if (!activity) return "https://i.stack.imgur.com/y9DpT.jpg";
  if (activity.type === 2)
    return `https://i.scdn.co/image/${
      activity.assets.large_image?.toString().split(":")[1]
    }`;
  return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
};

const getTitle = (activity?: Activity) => {
  if (!activity) return "Doing nothing";
  if (activity.type === 2) return `Listening to ${activity.name}`;
  return `Playing ${activity.name}`;
};

const getDescription = (activity?: Activity) => {
  if (!activity) return "No details.";
  const { state, details } = APPLICATIONS_RESPONSES[activity.name];
  return `${details(activity.details)}\n${state(activity.state)}`;
};

const updateData = (activity?: Activity) => {
  document
    .querySelector("#card-image")
    ?.setAttribute("src", getImage(activity));

  const CONTENT = document.querySelector("#card-content")!.children!;
  CONTENT[0].textContent = getTitle(activity);
  CONTENT[1].textContent = getDescription(activity);
};


export { getLanyardData, updateData };
