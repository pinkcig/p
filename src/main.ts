import "./style.css";
import { getLanyardData } from "./utilities";
import { Activity } from "./typings";

const USER_ID = "335394597763153920";
const LANYARD_DATA = (await getLanyardData(USER_ID)).activities;
const ACTIVITY = LANYARD_DATA.find((activity: Activity) =>
  [0, 2].includes(activity.type)
);

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
  if (activity.type === 2)
    return [`By ${activity.state}`, activity.details].join("\n");
  return `${activity.details}\n${activity.state}`;
};

const updateData = (activity?: Activity) => {
  document.querySelector("#card-image")?.setAttribute("src", getImage(activity));

  const CONTENT = document.querySelector("#card-content")!.children!;
  CONTENT[0].textContent = getTitle(activity);
  CONTENT[1].textContent = getDescription(activity);
};

updateData(ACTIVITY);

setInterval(async () => {
  const LANYARD_DATA = (await getLanyardData(USER_ID)).activities;
  const ACTIVITY = LANYARD_DATA.find((activity: Activity) =>
    [0, 2].includes(activity.type)
  );

  updateData(ACTIVITY);
}, 10e3);
