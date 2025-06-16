import React, { useState } from "react";
import brands from "./data/brands";

function App() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedPackType, setSelectedPackType] = useState("");
  const [quantity, setQuantity] = useState(0);

  const totalPrice = selectedBrand
    ? (quantity * selectedBrand.pricePerPack).toFixed(2)
    : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Cigarette Distribution App</h1>

      <h2>Select Brand:</h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {brands.map((brand) => (
          <div
            key={brand.name}
            onClick={() => {
              setSelectedBrand(brand);
              setSelectedPackType("");
              setQuantity(0);
            }}
            style={{
              cursor: "pointer",
              border:
                selectedBrand?.name === brand.name
                  ? "2px solid blue"
                  : "1px solid gray",
              borderRadius: "8px",
              padding: "1rem",
              width: "120px",
              textAlign: "center",
              backgroundColor:
                selectedBrand?.name === brand.name ? "#e0f7ff" : "#fff"
            }}
          >
            <img
              src={brand.image}
              alt={brand.name}
              style={{ width: "100px", height: "auto" }}
            />
            <p>{brand.name}</p>
          </div>
        ))}
      </div>

      {selectedBrand && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Brand: {selectedBrand.name}</h3>
          <p>Price per pack: ${selectedBrand.pricePerPack.toFixed(2)}</p>

          <label>
            Pack Type:
            <select
              value={selectedPackType}
              onChange={(e) => setSelectedPackType(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="">Select type</option>
              {selectedBrand.packTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <br />
          <br />

          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={0}
              style={{ marginLeft: "0.5rem", width: "60px" }}
            />
          </label>

          <h4>Total: ${totalPrice}</h4>

          <button onClick={handlePrint} style={{ marginTop: "1rem" }}>
            Print Receipt
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
