import "./style.css";
import { getLanyardData, updateData } from "./utilities";
import { Activity } from "./typings";
import { USER_ID, POP } from "./content";

window.addEventListener("click", () => POP.play());

getLanyardData(USER_ID).then(
  async (data) =>
    await updateData(
      data.activities.find((activity: Activity) =>
        [0, 2].includes(activity.type)
      )
    )
);

setInterval(async () => {
  const LANYARD_DATA = (await getLanyardData(USER_ID)).activities;
  const ACTIVITY = LANYARD_DATA.find((activity: Activity) =>
    [0, 2].includes(activity.type)
  );

  updateData(ACTIVITY);
}, 10e3);
