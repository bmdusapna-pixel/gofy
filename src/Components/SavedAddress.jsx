import React, { useState, useContext } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext.jsx";
import api from "../api/axios.js";

const SavedAddress = () => {
  const { user, updateUser } = useContext(AuthContext);
  // We'll use a unique 'id' for each address. In a real app, this would come from a database.
  // const [addresses, setAddresses] = useState([
  //   {
  //     id: 1,
  //     name: "Home Address",
  //     houseAndStreet: "123 Main St",
  //     apartments: "Apt 4B",
  //     town: "Springfield",
  //     pinCode: "12345",
  //     district: "Capital District",
  //     state: "State of Mind",
  //   },
  //   {
  //     id: 2,
  //     name: "Work Address",
  //     houseAndStreet: "456 Office Rd",
  //     apartments: "Suite 100",
  //     town: "Metro City",
  //     pinCode: "67890",
  //     district: "Business District",
  //     state: "Another State",
  //   },
  // ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    houseAndStreet: "",
    apartments: "",
    town: "",
    pinCode: "",
    district: "",
    state: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewClick = () => {
    setEditingAddressId(null);
    setFormData({
      name: "",
      houseAndStreet: "",
      apartments: "",
      town: "",
      pinCode: "",
      district: "",
      state: "",
    });
    setShowForm(true);
  };

  const handleEditClick = (address) => {
    setEditingAddressId(address._id);

    setFormData({
      name: address.nickname || "",
      houseAndStreet: address.houseStreet || "",
      apartments: address.apartment || "",
      town: address.city || "",
      pinCode: address.zipCode || "",
      district: address.district || "",
      state: address.state || "",
    });

    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      const { data } = await api.post("/user/auth/address", {
        userId: user?._id,
        addressId: id,
      });

      alert("Address deleted successfully!");
      if (data.user) {
        updateUser(data.user);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Something went wrong");
    }
  };

  const handleSaveAddress = async (event) => {
    event.preventDefault();

    try {
      let data;

      if (editingAddressId) {
        ({ data } = await api.post("/user/auth/address", {
          userId: user?._id,
          addressId: editingAddressId,
          address: {
            nickname: formData.name,
            houseStreet: formData.houseAndStreet,
            apartment: formData.apartments,
            city: formData.town,
            zipCode: formData.pinCode,
            district: formData.district,
            state: formData.state,
          },
        }));
      } else {
        ({ data } = await api.post("/user/auth/address", {
          userId: user?._id,
          address: {
            nickname: formData.name,
            houseStreet: formData.houseAndStreet,
            apartment: formData.apartments,
            city: formData.town,
            zipCode: formData.pinCode,
            district: formData.district,
            state: formData.state,
          },
        }));
      }

      if (data.user) {
        updateUser(data.user);
      }
      alert(
        editingAddressId
          ? "Address updated successfully!"
          : "Address added successfully!"
      );
      setShowForm(false);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Something went wrong");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Display list of addresses */}
      <h2 className="text-xl font-bold">Your Saved Addresses</h2>
      <div className="flex flex-col gap-4">
        {user?.addresses.length > 0 ? (
          user?.addresses.map((address) => (
            <div
              key={address._id}
              className="bg-gray-100 p-4 rounded-md flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{address.nickname}</p>
                <p className="text-gray-700">
                  {address.houseStreet}, {address.apartment}
                </p>
                <p className="text-gray-700">
                  {address.city}, {address.district}, {address.state}
                </p>
                <p className="text-gray-700">{address.zipCode}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(address)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeleteClick(address._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No saved addresses. Add one to get started.</p>
        )}
      </div>

      {/* Button to show form for adding a new address */}
      {!showForm && (
        <button
          onClick={handleAddNewClick}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl h-10 px-4 text-white bg-[#00bbae] hover:bg-[#f88e0f] transition-colors duration-300"
        >
          <FaPlus /> Add New Address
        </button>
      )}

      {/* Address Form (Conditionally rendered) */}
      {showForm && (
        <form
          onSubmit={handleSaveAddress}
          className="w-full mt-6 p-4 border border-gray-200 rounded-md"
        >
          <h3 className="text-lg font-bold mb-4">
            {editingAddressId ? "Edit Address" : "Add New Address"}
          </h3>
          <div className="flex flex-col gap-2">
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              type="text"
              placeholder="Address Nickname (e.g., Home, Work)"
              className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              required
              name="houseAndStreet"
              value={formData.houseAndStreet}
              onChange={handleFormChange}
              type="text"
              placeholder="House number and street name"
              className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              name="apartments"
              value={formData.apartments}
              onChange={handleFormChange}
              type="text"
              placeholder="Apartments, suits, unit, etc. (optional)"
              className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              required
              name="town"
              value={formData.town}
              onChange={handleFormChange}
              type="text"
              placeholder="Town / City"
              className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              required
              name="pinCode"
              value={formData.pinCode}
              onChange={handleFormChange}
              type="text"
              placeholder="Zip / Postal Code"
              className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              required
              name="district"
              value={formData.district}
              onChange={handleFormChange}
              type="text"
              placeholder="District"
              className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              required
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              type="text"
              placeholder="State"
              className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="rounded-xl w-24 h-10 text-white bg-[#00bbae] hover:bg-[#f88e0f] transition-colors duration-300"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl w-24 h-10 text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SavedAddress;
