import "./App.css";
import { useInput } from "./hooks/useInput";
import { FormEvent, useState } from "react";
import CarsTable from "./components/CarsTable/CarsTable";
import { ICar } from "./types/CarTypes";

function App() {
  const { inputState, inputUpdate } = useInput({
    number: "",
    name: "",
  });
  const [error, setError] = useState<string>("");
  const [carDetails, setCarDetails] = useState<ICar[]>([]);
  const [carChecker, setCarChecker] = useState<boolean>(false);

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (!inputState.number || !inputState.name) {
      setError("Enter details");
      return;
    }
    if (carDetails.some((car) => car.number === inputState.number)) {
      setError("Already present in the garage");
      return;
    }
    setError("");
    const newCarData = {
      checkIn: new Date().toLocaleString(),
      checkOut: "",
      name: inputState.name,
      number: inputState.number,
    };
    setCarDetails((prev: ICar[]): ICar[] => {
      return [newCarData, ...prev];
    });
  }
  const carNumber = carDetails.reduce<number>((num, car) => {
    if (!car.checkOut) return ++num;
    else return num;
  }, 0);

  return (
    <div className="App">
      <div className="container">
        <h1 style={{ marginBottom: "1rem" }}>Parking Lot</h1>
        <h3 style={{ marginBottom: "1.5rem" }}>Add car details</h3>
        <form onSubmit={submitHandler}>
          <div className="input-container">
            <div className="input-textfield">
              <input
                className={`input ${error ? "error" : "success"} `}
                placeholder=" "
                type="text"
                name="number"
                value={inputState.number}
                onChange={inputUpdate}
              />
              <label className={`input-label ${error ? "error" : "success"} `}>
                Car Number
              </label>
            </div>
          </div>
          <div className="input-container">
            <div className="input-textfield">
              <input
                className={`input ${error ? "error" : "success"} `}
                placeholder=" "
                type="text"
                name="name"
                value={inputState.name}
                onChange={inputUpdate}
              />
              <label className={`input-label ${error ? "error" : "success"} `}>
                Name
              </label>
            </div>
          </div>
          <button className="button add-button" type="submit">
            Add Car
          </button>
          <br />
          {error && <h5 style={{ color: "red" }}>{error}</h5>}
        </form>
        <button
          className="button add-button"
          style={{ margin: "1rem 0" }}
          type="submit"
          onClick={() => setCarChecker(!carChecker)}
        >
          Check number of cars
        </button>
        {carChecker && <h3>{carNumber}</h3>}

        <CarsTable
          carDetails={carDetails}
          setCarDetails={setCarDetails}
        ></CarsTable>
      </div>
    </div>
  );
}

export default App;
