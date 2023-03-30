import { db } from "@/backend/db";
import { setRealTimeDB, updateRealTimeDB } from "@/backend/lib";
import LoadingPage from "@/common/components/LoadingPage";
import { PageLayout } from "@/common/layouts/PageLayout";
import { ParkingSlot } from "@/common/types/parking-slot";
import ParkingSlots from "@/modules/Home/ParkingSlots";
import Button from "antd/lib/button";
import Tabs, { TabsProps } from "antd/lib/tabs";
import { ref, onValue, get, child } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const vehicleNumber = router.query.vehicle;
  const gate = router.query.gate;

  const [parkingSlots, setParkingSlots] = useState<ParkingSlot>();
  const [userBookedSlot, setUserBookedSlot] = useState("");

  useEffect(() => {
    const slotsRef = ref(db, "slot/");
    onValue(slotsRef, (snapshot) => {
      const data = snapshot.toJSON();
      setParkingSlots(data as ParkingSlot);
    });
  }, []);

  useEffect(() => {
    if (vehicleNumber && gate) {
      const dbRef = ref(db);

      updateRealTimeDB(`vehicle/${vehicleNumber}`, {
        isLeft: false,
        isActive: true,
      });

      get(child(dbRef, `vehicle/${vehicleNumber}`))
        .then((snapshot) => {
          if (!snapshot.exists()) {
            setRealTimeDB(`vehicle/${vehicleNumber}`, {
              isLeft: false,
              isActive: true,
              entryTime: Timestamp.now(),
            });
          } else {
            const data = snapshot.toJSON() as any;
            if (data?.isActive) setUserBookedSlot(data?.slot || "");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router.query]);

  if (!parkingSlots) return <LoadingPage />;

  if (!(vehicleNumber && gate))
    return (
      <PageLayout title="No vehicle number found">
        <h2>No vehicle number found.</h2>
      </PageLayout>
    );

  function handleReserveSlot(slot: string) {
    updateRealTimeDB(`vehicle/${vehicleNumber}`, {
      slot,
    });

    updateRealTimeDB(`slot/gate${gate}`, {
      isActive: true,
    });

    setUserBookedSlot(slot);
  }

  function handleExit() {
    updateRealTimeDB(`vehicle/${vehicleNumber}`, {
      isActive: false,
      isLeft: true,
      exitTime: Timestamp.now(),
    });

    updateRealTimeDB(`slot/${userBookedSlot.split("_").join("/")}`, {
      isReserved: false,
      isOccupied: false,
    });

    setUserBookedSlot("");
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `First Floor`,
      children: (
        <ParkingSlots
          title="First Floor"
          identifer="F"
          dbKey="first"
          handleReserveSlot={handleReserveSlot}
          slots={parkingSlots.first}
        />
      ),
    },
    {
      key: "2",
      label: `Second Floor`,
      children: (
        <ParkingSlots
          title="Second Floor"
          identifer="S"
          dbKey="second"
          handleReserveSlot={handleReserveSlot}
          slots={parkingSlots.second}
        />
      ),
    },
  ];

  const userBookedDetails = userBookedSlot?.split("_");

  return (
    <PageLayout title="Home">
      {!userBookedSlot ? (
        <Tabs defaultActiveKey="1" centered items={items} />
      ) : (
        <div>
          <h3>
            You Booked {userBookedDetails[0]} floor and slot{" "}
            {userBookedDetails[1]}
          </h3>

          <Button onClick={handleExit}>Exit and Pay</Button>
        </div>
      )}
    </PageLayout>
  );
}
