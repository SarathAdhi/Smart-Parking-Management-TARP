// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { filterDoc, updateDoc } from "@/backend/lib";
import { nextCors } from "@/lib/nextCors";
import { where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

const floorKeys = ["zero", "first", "second"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await nextCors(req, res);

  const floor = parseInt(`${req.query?.floor}`);
  const sensorId = parseInt(`${req.query?.id}`);
  const isFreeSlot = req.query?.isFree === "true";

  console.log({ floor, sensorId, isFreeSlot });

  if (floor < 0 || floor > 2)
    return res.status(401).json({
      error: "Floor should be between 0 - 2",
    });

  if (sensorId < 1 || sensorId > 4)
    return res.status(401).json({
      error: "Sensor ID should be between 1 - 4",
    });

  const originalDoc = await filterDoc(
    "parking-slot",
    where("isOriginal", "==", true)
  );

  let slots = originalDoc[0];

  const getFloor = floorKeys[floor];

  slots[getFloor][sensorId] = isFreeSlot;

  const updatedSlot = slots[getFloor];

  console.log(slots.id);

  await updateDoc("parking-slot", slots.id, {
    [getFloor]: updatedSlot,
  });

  res.status(200).json({
    message: "Hello World!",
    time: "2019-11-23 13:10:00",
    name: "Sarath",
  });
}

// await addDoc("parking", {
//   first: {
//     1: false,
//     2: false,
//     3: false,
//     4: false,
//   },
//   second: {
//     1: false,
//     2: false,
//     3: false,
//     4: false,
//   },
// });
