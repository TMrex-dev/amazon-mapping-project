import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "./PurchasePage.css";

const DeliveryCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Ensure dates are in the correct format
    const possibleDeliveryDates = [
        new Date("2024-11-25"),
        new Date("2024-11-26"),
        new Date("2024-11-30"),
    ];

    return (
        <div className="calendar-container">
            <Flatpickr
                options={{
                    enable: possibleDeliveryDates, // Highlight specific dates
                }}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="date-picker-input"
            />
        </div>
    );
};

export default DeliveryCalendar;
