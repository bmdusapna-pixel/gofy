import React, { useState } from "react";
import {
  Wallet as WalletIcon,
  ArrowUp,
  ArrowDown,
  X,
  Tag,
  Truck,
  Gift,
} from "lucide-react";

// Mock data for Wallet history
const walletHistory = [
  {
    id: 1,
    date: "19 Aug, 2025",
    description: "Payment received from John Doe",
    amount: 219.0,
    type: "received",
  },
  {
    id: 2,
    date: "18 Aug, 2025",
    description: "Funds added from linked card",
    amount: 89.0,
    type: "received",
  },
  {
    id: 3,
    date: "19 Aug, 2025",
    description: "Withdrawal to bank account",
    amount: -100.0,
    type: "sent",
  },
  {
    id: 4,
    date: "16 Aug, 2025",
    description: "Received bonus from referral program",
    amount: 50.0,
    type: "received",
  },
  {
    id: 5,
    date: "15 Aug, 2025",
    description: "Payment for online order",
    amount: -75.0,
    type: "sent",
  },
  {
    id: 6,
    date: "14 Aug, 2025",
    description: "Cashback from a purchase",
    amount: 35.0,
    type: "received",
  },
];

const Wallet = () => {
  const [showActionsModal, setShowActionsModal] = useState(false);
  const [filterType, setFilterType] = useState("all");

  const totalBalance = walletHistory.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const filteredHistory = walletHistory.filter((entry) => {
    if (filterType === "all") return true;
    return entry.type === filterType;
  });

  const handleActionsClick = () => {
    setShowActionsModal(true);
  };

  const handleCloseModal = () => {
    setShowActionsModal(false);
  };

  const WalletActionsModal = () => (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Wallet Actions
          </h3>
          <button
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-sm text-gray-500 mb-1">
            Your current balance is
          </div>
          <div className="text-4xl font-bold text-teal-600">
            ₹{totalBalance.toFixed(2)}
          </div>
        </div>

        <h4 className="font-semibold text-gray-700 mb-2">Select an Action:</h4>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full text-green-600">
                <ArrowUp size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-900">Add Funds</div>
                <div className="text-sm text-gray-500">
                  Top up your wallet from a linked account
                </div>
              </div>
            </div>
            <button className="bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-green-600 transition-colors">
              Deposit
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full text-red-600">
                <ArrowDown size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-900">Withdraw Funds</div>
                <div className="text-sm text-gray-500">
                  Transfer funds to your bank account
                </div>
              </div>
            </div>
            <button className="bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition-colors">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-6">
        {/* Wallet Balance Card */}
        <div className="bg-white rounded-lg p-6 flex justify-between items-center shadow-sm border border-gray-200">
          <div>
            <h2 className="text-xl font-semibold mb-1 text-gray-900 flex items-center gap-2">
              <WalletIcon size={24} className="text-teal-500" />
              My Wallet
            </h2>
            <div className="text-3xl font-bold text-teal-600">
              ₹{totalBalance.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Your current balance
            </div>
          </div>
          <div>
            <button
              onClick={handleActionsClick}
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Actions
            </button>
          </div>
        </div>

        {/* --- */}

        {/* Transaction History Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] leading-[24px] font-semibold text-black">
              Transaction History
            </h2>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full md:w-48 rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 cursor-pointer"
            >
              <option value="all">All</option>
              <option value="received">Received</option>
              <option value="sent">Sent</option>
            </select>
          </div>
          <div className="overflow-x-auto max-h-[400px] border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((entry) => {
                  const isReceived = entry.type === "received";
                  const amountColor = isReceived ? "teal" : "orange";
                  return (
                    <tr
                      key={entry.id}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {entry.date}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {entry.description}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm font-bold text-${amountColor}-600`}
                      >
                        {isReceived
                          ? `+₹${entry.amount.toFixed(2)}`
                          : `₹${entry.amount.toFixed(2)}`}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`bg-${amountColor}-100 text-${amountColor}-600 px-2 py-1 rounded text-sm font-medium`}
                        >
                          {isReceived ? "Received" : "Sent"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showActionsModal && <WalletActionsModal />}
    </div>
  );
};

export default Wallet;
