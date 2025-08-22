import React, { useState } from "react";
import { X } from "lucide-react";
import NoNotificationImage from "../assets/no-notifications.png";

const Notifications = ({ show, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your order #1234 has been shipped!",
      timestamp: "2 hours ago",
      image: "https://via.placeholder.com/150/00bbae/ffffff?text=Shipped",
    },
    {
      id: 2,
      message: "New product alert: Check out our latest collection!",
      timestamp: "1 day ago",
      image: "https://via.placeholder.com/150/b3d4f4/000000?text=New+Product",
    },
    {
      id: 3,
      message: "Your wishlist item 'Bluetooth Speaker' is now in stock.",
      timestamp: "3 days ago",
      image: "https://via.placeholder.com/150/d3d3d3/000000?text=In+Stock",
    },
    {
      id: 4,
      message: "Don't miss out! Flash sale ends tonight.",
      timestamp: "5 days ago",
      image: "https://via.placeholder.com/150/ff6347/ffffff?text=Sale",
    },
  ]);

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div
      className={`fixed right-0 top-0 w-[80%] sm:w-[450px] bg-white lg:w-96 h-full sm:h-screen z-50 transition-transform duration-300 ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-between w-full items-center p-4">
          <div className="flex gap-3 items-center">
            <div className="w-7 h-7 p-1 rounded-full bg-[#00bbae] flex items-center justify-center">
              <p className="text-white text-[13px] leading-[13px] font-semibold">
                {notifications.length}
              </p>
            </div>
            <p className="text-[#001430] text-[18px] leading-[36px] font-bold">
              Notifications
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <p
              onClick={clearAllNotifications}
              className="text-[14px] leading-[20px] cursor-pointer font-medium text-gray-600 transition-colors duration-300 hover:text-[#00bbae]"
            >
              Clear All
            </p>
            <div
              onClick={onClose}
              className="w-8 h-8 cursor-pointer flex items-center justify-center p-1 rounded-md border border-gray-400 bg-gray-200 transition-colors duration-300 text-black hover:text-white hover:bg-[#00bbae]"
            >
              <X className="w-6 h-6" />
            </div>
          </div>
        </div>
        <hr className="w-full h-[1px] bg-gray-300 border-none" />
        <div className="w-full p-5 flex-grow overflow-y-auto hide-scrollbar">
          <div className="flex flex-col gap-3 w-full">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  className="flex justify-between items-start w-full bg-gray-50 p-3 rounded-lg shadow-sm"
                  key={notification.id}
                >
                  <div className="flex items-start gap-4 w-full pr-4">
                    {notification.image && (
                      <img
                        src={notification.image}
                        alt="Notification"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-[16px] leading-[24px] text-[#001430] font-medium">
                        {notification.message}
                      </p>
                      <p className="text-[12px] leading-[18px] text-gray-500">
                        {notification.timestamp}
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-8 h-8 cursor-pointer flex items-center justify-center p-1 rounded-md transition-colors duration-300 text-black hover:text-white hover:bg-red-500"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X className="w-5 h-5" />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-5 text-center text-gray-500 font-semibold">
                <img
                  src={NoNotificationImage}
                  alt="No notifications"
                  className="w-full h-auto mb-4"
                />
                {/* <p>No new notifications.</p> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
