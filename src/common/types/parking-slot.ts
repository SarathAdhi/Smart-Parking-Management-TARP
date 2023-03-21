export type Slot = {
  1: {
    isOccupied: boolean;
    isReserved: boolean;
  };
  2: {
    isOccupied: boolean;
    isReserved: boolean;
  };
  3: {
    isOccupied: boolean;
    isReserved: boolean;
  };
  4: {
    isOccupied: boolean;
    isReserved: boolean;
  };
};

export type ParkingSlot = {
  first: Slot;
  second: Slot;
};
