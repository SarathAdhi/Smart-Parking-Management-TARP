import { updateRealTimeDB } from "@/backend/lib";
import { Slot } from "@/common/types/parking-slot";
import Button from "antd/lib/button";
import Tag from "antd/lib/tag";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  identifer: string;
  dbKey: string;
  slots: Slot;
  handleReserveSlot: (id: string) => void;
};

const ParkingSlots: React.FC<Props> = ({
  title,
  identifer,
  dbKey,
  handleReserveSlot,
  slots,
}) => {
  function handleReservation(id: number) {
    updateRealTimeDB(`slot/${dbKey}/${id}`, {
      isReserved: true,
    });

    handleReserveSlot(`${dbKey}_${id}`);
  }

  return (
    <div className="grid gap-2">
      <h3>{title} | Reserve your slot</h3>

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

          {slots[1].isOccupied && (
            <Tag className="text-center" color="purple">
              Reserved
            </Tag>
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

          {slots[2].isOccupied && (
            <Tag className="text-center" color="purple">
              Reserved
            </Tag>
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

          {slots[3].isOccupied && (
            <Tag className="text-center" color="purple">
              Reserved
            </Tag>
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

          {slots[4].isOccupied && (
            <Tag className="text-center" color="purple">
              Reserved
            </Tag>
          )}

          <h5 className="absolute bottom-2 right-2">{identifer}4</h5>
        </Button>
      </div>
    </div>
  );
};

export default ParkingSlots;
