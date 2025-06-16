import React, { useState, useEffect, useRef } from "react";
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

  // Store the shipment just submitted for printing
  const [printShipment, setPrintShipment] = useState(null);

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
    setPrintShipment(shipment); // save for printing
  };

  // useEffect to trigger print after printShipment is set
  useEffect(() => {
    if (printShipment) {
      // Use setTimeout to let React render the print content before printing
      setTimeout(() => {
        window.print();
        setPrintShipment(null); // reset after printing
      }, 100);
    }
  }, [printShipment]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Тамхины түгээлтийн бүртгэл</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Бренд сонгох:</h2>
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
          placeholder="Жолоочийн нэр"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          name="shop"
          placeholder="Дэлгүүрийн нэр"
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        <select
          name="packType"
          value={form.packType}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Сав баглаа боодлын төрөл сонгох</option>
          {selectedBrand?.packTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Тоо ширхэг"
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
          placeholder="Сав тутам үнэ ($)"
          className="p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white p-2 rounded"
        >
          Түгээмэл бүртгэх ба хэвлэх
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Түгээлтийн түүх</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr>
            <th className="border p-2">Огноо</th>
            <th className="border p-2">Жолооч</th>
            <th className="border p-2">Дэлгүүр</th>
            <th className="border p-2">Бренд</th>
            <th className="border p-2">Сав баглаа боодол төрөл</th>
            <th className="border p-2">Тоо ширхэг</th>
            <th className="border p-2">Үнэ</th>
            <th className="border p-2">Нийт</th>
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

      {/* Hidden print section */}
      <div style={{ display: "none" }}>
        {printShipment && (
          <div>
            <h2>Түгээмэл мэдээлэл</h2>
            <p><strong>Огноо:</strong> {printShipment.date}</p>
            <p><strong>Жолооч:</strong> {printShipment.driver}</p>
            <p><strong>Дэлгүүр:</strong> {printShipment.shop}</p>
            <p><strong>Бренд:</strong> {printShipment.brand}</p>
            <p><strong>Сав баглаа боодлын төрөл:</strong> {printShipment.packType}</p>
            <p><strong>Тоо ширхэг:</strong> {printShipment.quantity}</p>
            <p><strong>Үнэ:</strong> ${printShipment.pricePerPack}</p>
            <p><strong>Нийт үнэ:</strong> ${printShipment.totalPrice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
