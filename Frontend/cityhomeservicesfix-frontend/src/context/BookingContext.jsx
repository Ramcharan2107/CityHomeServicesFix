import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {

    const [booking, setBooking] = useState({
        customerId: null,

        serviceId: null,
        serviceName: "",
        servicePrice: 0,

        addressId: null,

        bookingDate: "",
        bookingTime: "",

        paymentMethod: "",

        total: 0
    });

    const updateBooking = (updates) => {
        setBooking(prev => {
            const updated = {
                ...prev,
                ...updates
            };

            // Keep total synchronized with service price
            if (
                updates.servicePrice !== undefined &&
                updates.total === undefined
            ) {
                updated.total = Number(updates.servicePrice) || 0;
            }

            return updated;
        });
    };

    const clearBooking = () => {
        setBooking({
            customerId: null,
            serviceId: null,
            serviceName: "",
            servicePrice: 0,
            addressId: null,
            bookingDate: "",
            bookingTime: "",
            paymentMethod: "",
            total: 0
        });
    };

    return (
        <BookingContext.Provider
            value={{
                booking,
                setBooking,
                updateBooking,
                clearBooking
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () =>
    useContext(BookingContext);