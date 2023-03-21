import { Slot } from "@/common/types/parking-slot";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  identifer: string;
  slots: Slot;
};

const ParkingSlots: React.FC<Props> = ({ title, identifer, slots }) => {
  return (
    <div>
      <h3>{title}</h3>

      <div className="grid grid-cols-2">
        <div className="slot-container border-r-2">
          {slots[1] && (
            <Image
              width={200}
              height={200}
              src="/car.png"
              alt="Slot Occupied"
            />
          )}

          <h5 className="absolute bottom-2 right-2">{identifer}1</h5>
        </div>

        <div className="slot-container ">
          {slots[2] && (
            <Image
              width={200}
              height={200}
              src="/car.png"
              alt="Slot Occupied"
            />
          )}

          <h5 className="absolute bottom-2 right-2">{identifer}2</h5>
        </div>

        <div className="slot-container border-r-2 border-t-2">
          {slots[3] && (
            <Image
              width={200}
              height={200}
              src="/car.png"
              alt="Slot Occupied"
            />
          )}

          <h5 className="absolute bottom-2 right-2">{identifer}3</h5>
        </div>

        <div className="slot-container border-t-2">
          {slots[4] && (
            <Image
              width={200}
              height={200}
              src="/car.png"
              alt="Slot Occupied"
            />
          )}

          <h5 className="absolute bottom-2 right-2">{identifer}4</h5>
        </div>
      </div>
    </div>
  );
};

export default ParkingSlots;
