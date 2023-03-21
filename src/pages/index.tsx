import { db } from "@/backend/db";
import LoadingPage from "@/common/components/LoadingPage";
import { PageLayout } from "@/common/layouts/PageLayout";
import { ParkingSlot } from "@/common/types/parking-slot";
import ParkingSlots from "@/modules/Home/ParkingSlots";
import Tabs, { TabsProps } from "antd/lib/tabs";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function Home() {
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot>();

  useEffect(() => {
    const starCountRef = ref(db, "slot/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.toJSON();
      setParkingSlots(data as ParkingSlot);
    });
  }, []);

  if (!parkingSlots) return <LoadingPage />;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `First Floor`,
      children: (
        <ParkingSlots
          title="First Floor"
          identifer="F"
          dbKey="first"
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
          slots={parkingSlots.second}
        />
      ),
    },
  ];

  return (
    <PageLayout title="Home">
      <Tabs defaultActiveKey="1" centered items={items} />
    </PageLayout>
  );
}
