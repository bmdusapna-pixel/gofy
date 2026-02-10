import React, { useContext } from "react";
import { LocationContext } from "../Context/LocationContext";

export default function CurrentLocation() {
  const { location, loading, error, detectLocation } =
    useContext(LocationContext);

  return (
    <div style={{ padding: "10px", fontSize: "14px" }}>
      {location ? (
        <div>
          📍 Delivering to{" "}
          <strong>
            {location.city}, {location.pincode}
          </strong>
        </div>
      ) : (
        <button onClick={detectLocation} disabled={loading}>
          {loading ? "Detecting location..." : "📍 Use current location"}
        </button>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "6px" }}>
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
