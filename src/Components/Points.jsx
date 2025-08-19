import React, { useState } from "react";
import { Award, ArrowUp, ArrowDown, X, Tag, Truck, Gift } from "lucide-react";

// Mock data for  Points history
const gofyPointsHistory = [
  {
    id: 1,
    date: "19 Aug, 2025",
    description: "Points earned from order #1003",
    points: 219,
    type: "earned",
  },
  {
    id: 2,
    date: "18 Aug, 2025",
    description: "Points earned from order #1002",
    points: 89,
    type: "earned",
  },
  {
    id: 3,
    date: "19 Aug, 2025",
    description: "Points used for discount on order #1001",
    points: -100, // Negative value for points used
    type: "used",
  },
  {
    id: 4,
    date: "16 Aug, 2025",
    description: "Bonus points for account verification",
    points: 50,
    type: "earned",
  },
  {
    id: 5,
    date: "15 Aug, 2025",
    description: "Points used on a special accessory",
    points: -75,
    type: "used",
  },
  {
    id: 6,
    date: "14 Aug, 2025",
    description: "Points earned from order #1006",
    points: 35,
    type: "earned",
  },
];

const GofyPoints = () => {
  const [showRedeemModal, setShowRedeemModal] = useState(false);

  const totalPoints = gofyPointsHistory.reduce(
    (sum, transaction) => sum + transaction.points,
    0
  );

  const handleRedeemClick = () => {
    setShowRedeemModal(true);
  };

  const handleCloseModal = () => {
    setShowRedeemModal(false);
  };

  const RedeemModal = () => (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Redeem Your Points
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
            {totalPoints} pts
          </div>
        </div>

        <h4 className="font-semibold text-gray-700 mb-2">Select a Reward:</h4>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                <Tag size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-900">$10 Off Coupon</div>
                <div className="text-sm text-gray-500">
                  For any order over $50
                </div>
              </div>
            </div>
            <button className="bg-orange-500 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-orange-600 transition-colors">
              100 pts
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                <Truck size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-900">Free Shipping</div>
                <div className="text-sm text-gray-500">
                  Standard shipping for one order
                </div>
              </div>
            </div>
            <button className="bg-teal-500 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-teal-600 transition-colors">
              50 pts
            </button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                <Gift size={20} />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  Exclusive Gofy Toy
                </div>
                <div className="text-sm text-gray-500">
                  Receive a special gift with your next order
                </div>
              </div>
            </div>
            <button className="bg-purple-500 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-purple-600 transition-colors">
              250 pts
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-6">
        {/* Gofy Points Balance Card */}
        <div className="bg-white rounded-lg p-6 flex justify-between items-center shadow-sm border border-gray-200">
          <div>
            <h2 className="text-xl font-semibold mb-1 text-gray-900 flex items-center gap-2">
              <Award size={24} className="text-teal-500" />
              Gofy Points
            </h2>
            <div className="text-3xl font-bold text-teal-600">
              {totalPoints} pts
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Your current reward point balance
            </div>
          </div>
          <div>
            <button
              onClick={handleRedeemClick}
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Redeem Now
            </button>
          </div>
        </div>

        {/* --- */}

        {/* Gofy Point History Table */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] leading-[24px] font-semibold text-black">
              Point History
            </h2>
            <select className="w-full md:w-48 rounded-md border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 cursor-pointer">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All History</option>
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
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {gofyPointsHistory.map((entry) => {
                  const isEarned = entry.type === "earned";
                  const pointsColor = isEarned ? "teal" : "orange";
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
                        className={`px-6 py-4 text-sm font-bold text-${pointsColor}-600`}
                      >
                        {isEarned ? `+${entry.points}` : `${entry.points}`} pts
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`bg-${pointsColor}-100 text-${pointsColor}-600 px-2 py-1 rounded text-sm font-medium`}
                        >
                          {isEarned ? "Credited" : "Used"}
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

      {/* Conditionally render the modal */}
      {showRedeemModal && <RedeemModal />}
    </div>
  );
};

export default GofyPoints;
