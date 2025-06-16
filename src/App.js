import React, { useState } from "react";
import brands from "./data/brands";

const App = () => {
  const [shipments, setShipments] = useState([]);
  const [form, setForm] = useState({
    driver: "",
    shop: "",
    brand: "",
    packType: "",
    quantity: 0,
    pricePerPack: 0,
  });

  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setForm({
      ...form,
      brand: brand.name,
      pricePerPack: brand.pricePerPack,
      packType: "",
      quantity: 0,
    });
  };

  const handlePrint = (shipmentsToPrint) => {
    const html = `
      <html>
        <head>
          <title>Shipment Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background: #eee; }
          </style>
        </head>
        <body>
          <h1>Shipment Report</h1>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Driver</th>
                <th>Shop</th>
                <th>Brand</th>
                <th>Pack Type</th>
                <th>Quantity</th>
                <th>Price per Pack ($)</th>
                <th>Total ($)</th>
              </tr>
            </thead>
            <tbody>
              ${shipmentsToPrint
                .map(
                  (s) => `
                <tr>
                  <td>${s.date}</td>
                  <td>${s.driver}</td>
                  <td>${s.shop}</td>
                  <td>${s.brand}</td>
                  <td>${s.packType}</td>
                  <td>${s.quantity}</td>
                  <td>${s.pricePerPack.toFixed(2)}</td>
                  <td>${s.totalPrice.toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.driver ||
      !form.shop ||
      !form.brand ||
      !form.packType ||
      form.quantity <= 0 ||
      form.pricePerPack <= 0
    ) {
      alert("Please fill out all fields with valid values.");
      return;
    }

    const shipment = {
      ...form,
      quantity: Number(form.quantity),
      pricePerPack: Number(form.pricePerPack),
      totalPrice: Number(form.quantity) * Number(form.pricePerPack),
      date: new Date().toLocaleString(),
    };

    const newShipments = [...shipments, shipment];
    setShipments(newShipments);

    setForm({
      driver: "",
      shop: "",
      brand: "",
      packType: "",
      quantity: 0,
      pricePerPack: 0,
    });
    setSelectedBrand(null);

    setTimeout(() => handlePrint(newShipments), 100);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cigarette Distribution Tracker</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Brand:</h2>
        <div className="flex flex-wrap gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              onClick={() => handleBrandClick(brand)}
              className={`cursor-pointer border rounded p-4 w-32 text-center ${
                selectedBrand?.name === brand.name
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-24 h-auto mx-auto mb-2"
              />
              <p className="text-sm font-medium">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <input
          name="driver"
          placeholder="Driver Name"
          onChange={handleChange}
          value={form.driver}
          className="p-2 border rounded"
          required
        />
        <input
          name="shop"
          placeholder="Shop Name"
          onChange={handleChange}
          value={form.shop}
          className="p-2 border rounded"
          required
        />

        <select
          name="packType"
          value={form.packType}
          onChange={handleChange}
          className="p-2 border rounded"
          required
          disabled={!selectedBrand}
        >
          <option value="">Select Pack Type</option>
          {selectedBrand?.packTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="p-2 border rounded"
          min="1"
          required
        />

        <input
          type="number"
          name="pricePerPack"
          value={form.pricePerPack}
          placeholder="Price per Pack ($)"
          className="p-2 border rounded"
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          readOnly={selectedBrand !== null}
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white p-2 rounded"
        >
          Record Shipment & Print
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Shipment History</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Driver</th>
            <th className="border p-2">Shop</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Pack Type</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((s, idx) => (
            <tr key={idx}>
              <td className="border p-2">{s.date}</td>
              <td className="border p-2">{s.driver}</td>
              <td className="border p-2">{s.shop}</td>
              <td className="border p-2">{s.brand}</td>
              <td className="border p-2">{s.packType}</td>
              <td className="border p-2">{s.quantity}</td>
              <td className="border p-2">${s.pricePerPack.toFixed(2)}</td>
              <td className="border p-2 font-bold">${s.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
