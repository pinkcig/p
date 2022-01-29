import "./style.css";
import { getLanyardData } from "./utilities";
import { Activity } from "./typings";

const USER_ID = "335394597763153920";
const LANYARD_DATA = (await getLanyardData(USER_ID)).activities;
const ACTIVITY = LANYARD_DATA.find((activity: Activity) =>
  [0, 2].includes(activity.type)
);

const getImage = (activity: Activity) => {
  if (activity.type === 2)
    return `https://i.scdn.co/image/${
      activity.assets.large_image?.toString().split(":")[1]
    }`;
  return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
};

const getTitle = (activity: Activity) => {
  if (activity.type === 2) return `Listening to ${activity.name}`;
  return `Playing ${activity.name}`;
};

document.querySelector<HTMLImageElement>("#card-image")!.src = ACTIVITY
  ? getImage(ACTIVITY)
  : "https://i.stack.imgur.com/y9DpT.jpg";

const CONTENT = document.querySelector("#card-content")!.children!;
CONTENT[0].textContent = ACTIVITY ? getTitle(ACTIVITY) : "Doing nothing";
CONTENT[1].textContent = ACTIVITY
  ? `${ACTIVITY.details}\n${ACTIVITY.state}`
  : "No details";
