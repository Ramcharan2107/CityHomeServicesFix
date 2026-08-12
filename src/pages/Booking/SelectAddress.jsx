import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import addressService from "../../services/addressService";
import { useBooking } from "../../context/BookingContext";

function SelectAddress() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [saving, setSaving] = useState(false);

    const { setBooking } = useBooking();

    const [form, setForm] = useState({
        addressType: "Home",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "India",
        postalCode: "",
        latitude: "",
        longitude: "",
        isDefault: false
    });

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {

        try {

            setLoading(true);

            const data = await addressService.getAll();

            setAddresses(data);

            const defaultAddress =
                data.find(x => x.isDefault);

            if (defaultAddress) {
                setSelectedAddress(defaultAddress);
            }

        }
        catch (err) {

            console.error("Unable to load addresses:", err);

        }
        finally {

            setLoading(false);

        }
    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };

    const handleAddAddress = async (e) => {

        e.preventDefault();

        if (!form.addressLine1 ||
            !form.city ||
            !form.state ||
            !form.postalCode) {

            alert(
                "Please fill Address, City, State and Postal Code."
            );

            return;
        }

        try {

            setSaving(true);

            const customerId = localStorage.getItem("customerId");

            const payload = {
                customerId: Number(customerId),

                addressType: form.addressType,
                addressLine1: form.addressLine1,
                addressLine2: form.addressLine2 || null,
                city: form.city,
                state: form.state,
                country: form.country,
                postalCode: form.postalCode,
                latitude: form.latitude
                    ? Number(form.latitude)
                    : null,
                longitude: form.longitude
                    ? Number(form.longitude)
                    : null,
                isDefault: form.isDefault
            };

            await addressService.create(payload);

            setShowAddressForm(false);

            setForm({
                addressType: "Home",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                country: "India",
                postalCode: "",
                latitude: "",
                longitude: "",
                isDefault: false
            });

            await loadAddresses();

            alert("Address added successfully.");

        }
        catch (err) {

            console.error(
                "Create address error:",
                err
            );

            alert(
                err?.response?.data?.message ||
                "Unable to add address."
            );

        }
        finally {

            setSaving(false);

        }
    };

    const handleContinue = () => {

        if (!selectedAddress) {
            alert("Please select an address.");
            return;
        }

        setBooking(prev => ({
            ...prev,
            customerId: selectedAddress.customerId,
            addressId: selectedAddress.addressId
        }));

        navigate(`/booking/schedule/${id}`);
    };

    if (loading) {

        return (
            <div className="container py-5 text-center">
                Loading addresses...
            </div>
        );
    }

    return (
        <div className="container py-5">

            <h2
                className="fw-bold mb-4"
                style={{ color: "#0B1F3A" }}
            >
                Select Address
            </h2>

            <div className="row">

                <div className="col-lg-8">

                    {addresses.length === 0 && (
                        <div className="alert alert-info">
                            No saved addresses found.
                            Add an address to continue.
                        </div>
                    )}

                    {addresses.map(address => (

                        <div
                            key={address.addressId}
                            className={`card mb-3 shadow-sm ${
                                selectedAddress?.addressId ===
                                address.addressId
                                    ? "border-warning border-2"
                                    : ""
                            }`}
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                setSelectedAddress(address)
                            }
                        >

                            <div className="card-body">

                                <div className="form-check">

                                    <input
                                        type="radio"
                                        checked={
                                            selectedAddress?.addressId ===
                                            address.addressId
                                        }
                                        readOnly
                                        className="form-check-input"
                                    />

                                    <label className="form-check-label">

                                        <strong>
                                            {address.addressType}
                                        </strong>

                                        <br />

                                        {address.addressLine1}

                                        {address.addressLine2 && (
                                            <>
                                                <br />
                                                {address.addressLine2}
                                            </>
                                        )}

                                        <br />

                                        {address.city},{" "}
                                        {address.state}

                                        <br />

                                        {address.country} -{" "}
                                        {address.postalCode}

                                    </label>

                                </div>

                            </div>

                        </div>

                    ))}

                    {/* ADD ADDRESS BUTTON */}

                    <button
                        type="button"
                        className="btn btn-outline-warning mt-2"
                        onClick={() =>
                            setShowAddressForm(true)
                        }
                    >
                        + Add New Address
                    </button>

                </div>

                <div className="col-lg-4">

                    <div className="card shadow">

                        <div
                            className="card-header"
                            style={{
                                background: "#F4B400",
                                color: "#0B1F3A"
                            }}
                        >
                            Booking
                        </div>

                        <div className="card-body">

                            <button
                                className="btn w-100"
                                style={{
                                    background: "#0B1F3A",
                                    color: "#fff"
                                }}
                                disabled={!selectedAddress}
                                onClick={handleContinue}
                            >
                                Continue
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* ================= ADDRESS MODAL ================= */}

            {showAddressForm && (

                <div
                    className="modal d-block"
                    tabIndex="-1"
                    style={{
                        backgroundColor:
                            "rgba(0,0,0,0.5)"
                    }}
                >

                    <div className="modal-dialog modal-lg modal-dialog-centered">

                        <div className="modal-content">

                            <div
                                className="modal-header"
                                style={{
                                    background: "#F4B400",
                                    color: "#0B1F3A"
                                }}
                            >

                                <h5 className="modal-title">
                                    Add New Address
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() =>
                                        setShowAddressForm(false)
                                    }
                                />

                            </div>

                            <form
                                onSubmit={handleAddAddress}
                            >

                                <div className="modal-body">

                                    <div className="row">

                                        {/* Address Type */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Address Type
                                            </label>

                                            <select
                                                name="addressType"
                                                className="form-select"
                                                value={form.addressType}
                                                onChange={handleChange}
                                            >

                                                <option value="Home">
                                                    Home
                                                </option>

                                                <option value="Work">
                                                    Work
                                                </option>

                                                <option value="Office">
                                                    Office
                                                </option>

                                                <option value="Other">
                                                    Other
                                                </option>

                                            </select>

                                        </div>

                                        {/* Postal Code */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Postal Code *
                                            </label>

                                            <input
                                                name="postalCode"
                                                className="form-control"
                                                value={form.postalCode}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        {/* Address Line 1 */}

                                        <div className="col-12 mb-3">

                                            <label className="form-label">
                                                Address Line 1 *
                                            </label>

                                            <input
                                                name="addressLine1"
                                                className="form-control"
                                                value={form.addressLine1}
                                                onChange={handleChange}
                                                placeholder="House / Flat / Street"
                                                required
                                            />

                                        </div>

                                        {/* Address Line 2 */}

                                        <div className="col-12 mb-3">

                                            <label className="form-label">
                                                Address Line 2
                                            </label>

                                            <input
                                                name="addressLine2"
                                                className="form-control"
                                                value={form.addressLine2}
                                                onChange={handleChange}
                                                placeholder="Apartment, landmark, etc."
                                            />

                                        </div>

                                        {/* City */}

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                City *
                                            </label>

                                            <input
                                                name="city"
                                                className="form-control"
                                                value={form.city}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        {/* State */}

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                State *
                                            </label>

                                            <input
                                                name="state"
                                                className="form-control"
                                                value={form.state}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        {/* Country */}

                                        <div className="col-md-4 mb-3">

                                            <label className="form-label">
                                                Country *
                                            </label>

                                            <input
                                                name="country"
                                                className="form-control"
                                                value={form.country}
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        {/* Default */}

                                        <div className="col-12">

                                            <div className="form-check">

                                                <input
                                                    type="checkbox"
                                                    name="isDefault"
                                                    className="form-check-input"
                                                    checked={
                                                        form.isDefault
                                                    }
                                                    onChange={handleChange}
                                                />

                                                <label className="form-check-label">
                                                    Set as default address
                                                </label>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowAddressForm(false)
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn"
                                        style={{
                                            background: "#F7941D",
                                            color: "#fff"
                                        }}
                                        disabled={saving}
                                    >
                                        {saving
                                            ? "Saving..."
                                            : "Save Address"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default SelectAddress;