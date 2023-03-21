import { updateRealTimeDB } from "@/backend/lib";
import { Slot } from "@/common/types/parking-slot";
import Button from "antd/lib/button";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  title: string;
  identifer: string;
  dbKey: string;
  slots: Slot;
};

const ParkingSlots: React.FC<Props> = ({ title, identifer, dbKey, slots }) => {
  const [reserveSlotId, setReserveSlotId] = useState("");

  function handleReservation(id: number) {
    console.log(`slot/${dbKey}/${id}`);
    updateRealTimeDB(`slot/${dbKey}/${id}`, {
      isReserved: true,
      isOccupied: false,
    });
  }

  return (
    <div>
      <h3>{title}</h3>

      <div className="grid grid-cols-2">
        <Button
          type="dashed"
          onClick={() => handleReservation(1)}
          disabled={slots[1].isOccupied || slots[1].isReserved}
          className="slot-container border-r-2"
        >
          {slots[1].isOccupied && (
            <Image
              width={200}
              height={200}
              src="/car.png"
              alt="Slot Occupied"
            />
          )}

          <h5 className="absolute bottom-2 right-2">{identifer}1</h5>
        </Button>

        <Button
          type="dashed"
          onClick={() => handleReservation(2)}
          disabled={slots[2].isOccupied || slots[2].isReserved}
          className="slot-container "
        >
          {slots[2].isOccupied && (
            <Image
              width={200}
              height={200}
              src="/car.png"
              alt="Slot Occupied"
            />
          )}

          <h5 className="absolute bottom-2 right-2">{identifer}2</h5>
        </Button>

        <Button
          type="dashed"
          onClick={() => handleReservation(3)}
          disabled={slots[3].isOccupied || slots[3].isReserved}
          className="slot-container"
        >
          {slots[3].isOccupied && (
            <Image
              width={200}
              height={200}
              src="/car.png"
              alt="Slot Occupied"
            />
          )}

          <h5 className="absolute bottom-2 right-2">{identifer}3</h5>
        </Button>

        <Button
          type="dashed"
          onClick={() => handleReservation(4)}
          disabled={slots[4].isOccupied || slots[4].isReserved}
          className="slot-container"
        >
          {slots[4].isOccupied && (
            <Image
              width={200}
              height={200}
              src="/car.png"
              alt="Slot Occupied"
            />
          )}

          <h5 className="absolute bottom-2 right-2">{identifer}4</h5>
        </Button>
      </div>

      <Button>Reserve Slot</Button>
    </div>
  );
};

export default ParkingSlots;
