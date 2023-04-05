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
import { getMinutes } from "../utils/diff";
import Popconfirm from "antd/lib/popconfirm";
import { toast } from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const vehicleNumber = router.query.vehicle;
  const gate = router.query.gate;

  const [parkingSlots, setParkingSlots] = useState<ParkingSlot>();
  const [userBookedSlot, setUserBookedSlot] = useState("");
  const [userBookedSlotTiming, setUserBookedSlotTiming] = useState<Timestamp>();
  const [parkingCost, setParkingCost] = useState(0);

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
            if (data?.isActive) {
              setUserBookedSlot(data?.slot || "");
              setUserBookedSlotTiming(data?.entryTime);
            }
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
    const entryTime = Timestamp.now();

    updateRealTimeDB(`vehicle/${vehicleNumber}`, {
      slot,
      entryTime,
    });

    updateRealTimeDB(`slot/gate${gate}`, {
      isActive: true,
    });

    setUserBookedSlot(slot);
    setUserBookedSlotTiming(entryTime);
  }

  function getNumberOfMinutes() {
    const diff = getMinutes(userBookedSlotTiming!);
    console.log({ diff });
    setParkingCost(diff * 25);
  }

  function handleExit() {
    const exitTime = Timestamp.now();

    updateRealTimeDB(`vehicle/${vehicleNumber}`, {
      isActive: false,
      isLeft: true,
      exitTime,
      slot: "",
    });

    updateRealTimeDB(`slot/${userBookedSlot.split("_").join("/")}`, {
      isReserved: false,
      isOccupied: false,
    });

    setUserBookedSlot("");

    toast.success("Received Payment successfully");
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
    <PageLayout title="Home" className="grid">
      <Tabs defaultActiveKey="1" centered items={items} />

      {userBookedSlot && (
        <div>
          <h3>
            You Booked {userBookedDetails[0].slice(0, 1).toUpperCase()}
            {userBookedDetails[1]}
          </h3>

          <Popconfirm
            title="Payment Portal"
            description={
              `Your parking cost is: ${parkingCost.toFixed(2)}` +
              " Pay using any UPI"
            }
            onConfirm={handleExit}
            okText="Pay"
            cancelText="Cancel"
            okButtonProps={{
              type: "default",
            }}
            cancelButtonProps={{
              danger: true,
            }}
          >
            <Button onClick={getNumberOfMinutes}>Exit Now</Button>
          </Popconfirm>
        </div>
      )}
    </PageLayout>
  );
}
