import React, { MouseEvent } from "react";
import { ICar } from "./../../types/CarTypes";

interface ICarsTableProps {
  carDetails: ICar[];
  setCarDetails: React.Dispatch<React.SetStateAction<ICar[]>>;
}

const CarsTable = ({ carDetails, setCarDetails }: ICarsTableProps) => {
  function handleCheckout(
    e: MouseEvent<HTMLButtonElement | MouseEvent>,
    checkOutCar: ICar
  ) {
    e.preventDefault();
    checkOutCar.checkOut = new Date().toLocaleString();
    const newCarDetails = carDetails.map((car) => {
      if (car.number === checkOutCar.number) {
        return checkOutCar;
      } else {
        return car;
      }
    });

    setCarDetails(newCarDetails);
  }

  function handleRemove(
    e: MouseEvent<HTMLButtonElement | MouseEvent>,
    carToBeRemoved: ICar
  ) {
    e.preventDefault();

    setCarDetails((prev) => {
      return prev.filter((car) => carToBeRemoved.number !== car.number);
    });
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Number Plate</th>
          <th>Name</th>
          <th>Check-in Time</th>
          <th>Check-out Time</th>
          <th>Check out</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {carDetails &&
          carDetails.map((car) => {
            return (
              <tr
                style={car.checkOut ? { textDecoration: "line-through" } : {}}
              >
                <td data-column="Number Plate">{car.number}</td>
                <td data-column="Name">{car.name}</td>
                <td data-column="Check-in Time">{car.checkIn}</td>
                <td data-column="Check-out Time">{car.checkOut || "--"}</td>
                <td data-column="Check out">
                  <button
                    onClick={(e) => handleCheckout(e, car)}
                    disabled={car.checkOut ? true : false}
                    className="button add-button"
                    style={{ width: "100%" }}
                  >
                    Check out
                  </button>
                </td>
                <td data-column="Remove">
                  <button
                    onClick={(e) => handleRemove(e, car)}
                    className="button add-button"
                    style={{ width: "100%" }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default CarsTable;
