import React, { useState } from "react";
import brands from "./data/brands";

const App = () => {
  const [drivers, setDrivers] = useState([]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const shipment = {
      ...form,
      totalPrice: form.quantity * form.pricePerPack,
      date: new Date().toLocaleString(),
    };
    setShipments([...shipments, shipment]);
    window.print();
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
                selectedBrand?.name === brand.name ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"
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
        <input name="driver" placeholder="Driver Name" onChange={handleChange} className="p-2 border rounded" required />
        <input name="shop" placeholder="Shop Name" onChange={handleChange} className="p-2 border rounded" required />

        <select
          name="packType"
          value={form.packType}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Pack Type</option>
          {selectedBrand?.packTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <input
          type="number"
          name="pricePerPack"
          value={form.pricePerPack}
          onChange={handleChange}
          placeholder="Price per Pack ($)"
          className="p-2 border rounded"
          required
        />

        <button type="submit" className="col-span-2 bg-blue-600 text-white p-2 rounded">
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
              <td className="border p-2">${s.pricePerPack}</td>
              <td className="border p-2 font-bold">${s.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
