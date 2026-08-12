import { useEffect, useState } from "react";
import addressService from "../../services/addressService";
import PageContainer from "../../components/common/PageContainer";
import "./Addresses.css";

const emptyForm = {
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
};

function Addresses() {

    const [addresses, setAddresses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [deletingId, setDeletingId] = useState(null);

    const [defaultId, setDefaultId] = useState(null);

    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingAddress, setEditingAddress] = useState(null);

    const [form, setForm] = useState(emptyForm);


    /* =====================================================
       LOAD ADDRESSES
    ===================================================== */

    useEffect(() => {

        loadAddresses();

    }, []);


    const loadAddresses = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await addressService.getAll();

            setAddresses(data || []);

        }
        catch (err) {

            console.error(err);

            setError(
                "Unable to load your saved addresses."
            );

        }
        finally {

            setLoading(false);

        }

    };


    /* =====================================================
       OPEN ADD MODAL
    ===================================================== */

    const openAddModal = () => {

        setEditingAddress(null);

        setForm({
            ...emptyForm,
            isDefault: addresses.length === 0
        });

        setShowModal(true);

    };


    /* =====================================================
       OPEN EDIT MODAL
    ===================================================== */

    const openEditModal = (address) => {

        setEditingAddress(address);

        setForm({
            addressType:
                address.addressType || "Home",

            addressLine1:
                address.addressLine1 || "",

            addressLine2:
                address.addressLine2 || "",

            city:
                address.city || "",

            state:
                address.state || "",

            country:
                address.country || "India",

            postalCode:
                address.postalCode || "",

            latitude:
                address.latitude ?? "",

            longitude:
                address.longitude ?? "",

            isDefault:
                Boolean(address.isDefault)
        });

        setShowModal(true);

    };


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    const closeModal = () => {

        if (saving) {
            return;
        }

        setShowModal(false);

        setEditingAddress(null);

        setForm(emptyForm);

    };


    /* =====================================================
       FORM CHANGE
    ===================================================== */

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));

    };


    /* =====================================================
       SAVE ADDRESS
    ===================================================== */

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !form.addressLine1.trim() ||
            !form.city.trim() ||
            !form.state.trim() ||
            !form.postalCode.trim()
        ) {

            alert(
                "Please fill all required address details."
            );

            return;

        }


        try {

            setSaving(true);

            const payload = {
                addressType:
                    form.addressType,

                addressLine1:
                    form.addressLine1.trim(),

                addressLine2:
                    form.addressLine2.trim(),

                city:
                    form.city.trim(),

                state:
                    form.state.trim(),

                country:
                    form.country.trim(),

                postalCode:
                    form.postalCode.trim(),

                latitude:
                    form.latitude === ""
                        ? null
                        : Number(form.latitude),

                longitude:
                    form.longitude === ""
                        ? null
                        : Number(form.longitude),

                isDefault:
                    Boolean(form.isDefault)
            };


            if (editingAddress) {

                await addressService.update(
                    editingAddress.addressId,
                    payload
                );

            }
            else {

                await addressService.create(
                    payload
                );

            }


            await loadAddresses();

            setShowModal(false);

            setEditingAddress(null);

            setForm(emptyForm);

        }
        catch (err) {

            console.error(err);

            alert(
                editingAddress
                    ? "Unable to update address."
                    : "Unable to add address."
            );

        }
        finally {

            setSaving(false);

        }

    };


    /* =====================================================
       DELETE ADDRESS
    ===================================================== */

    const deleteAddress = async (address) => {

        if (
            !window.confirm(
                `Delete your ${address.addressType || "saved"} address?`
            )
        ) {

            return;

        }


        try {

            setDeletingId(address.addressId);

            await addressService.remove(
                address.addressId
            );

            await loadAddresses();

        }
        catch (err) {

            console.error(err);

            alert(
                "Unable to delete address."
            );

        }
        finally {

            setDeletingId(null);

        }

    };


    /* =====================================================
       SET DEFAULT
    ===================================================== */

    const makeDefault = async (address) => {

        if (address.isDefault) {
            return;
        }

        try {

            setDefaultId(address.addressId);

            await addressService.setDefault(
                address.addressId,
                true
            );

            await loadAddresses();

        }
        catch (err) {

            console.error(err);

            alert(
                "Unable to set this address as default."
            );

        }
        finally {

            setDefaultId(null);

        }

    };


    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <div className="addresses-page">

                <PageContainer>

                    <div className="addresses-state">

                        <div className="addresses-state-icon">

                            <i className="bi bi-geo-alt-fill"></i>

                        </div>

                        <div className="spinner-border text-warning"></div>

                        <h4>
                            Loading your addresses
                        </h4>

                        <p>
                            Please wait while we fetch your saved locations.
                        </p>

                    </div>

                </PageContainer>

            </div>

        );

    }


    /* =====================================================
       ERROR
    ===================================================== */

    if (error) {

        return (

            <div className="addresses-page">

                <PageContainer>

                    <div className="addresses-state error-state">

                        <div className="addresses-error-icon">

                            <i className="bi bi-exclamation-triangle-fill"></i>

                        </div>

                        <h4>
                            Something went wrong
                        </h4>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            className="primary-address-btn"
                            onClick={loadAddresses}
                        >

                            <i className="bi bi-arrow-clockwise"></i>

                            Try Again

                        </button>

                    </div>

                </PageContainer>

            </div>

        );

    }


    const defaultCount = addresses.filter(
        (address) => address.isDefault
    ).length;


    return (

        <div className="addresses-page">

            <PageContainer>

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="addresses-header">

                    <div className="addresses-title-area">

                        <div className="addresses-title-icon">

                            <i className="bi bi-geo-alt-fill"></i>

                        </div>

                        <div>

                            <span className="page-eyebrow">
                                MY ACCOUNT
                            </span>

                            <h1>
                                My Addresses
                            </h1>

                            <p>
                                Save and manage your preferred service locations.
                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="primary-address-btn"
                        onClick={openAddModal}
                    >

                        <i className="bi bi-plus-lg"></i>

                        Add New Address

                    </button>

                </div>


                {/* =================================================
                    SUMMARY
                ================================================= */}

                <div className="address-summary">

                    <div className="summary-card">

                        <div className="summary-icon orange">

                            <i className="bi bi-geo-alt-fill"></i>

                        </div>

                        <div>

                            <span>
                                SAVED
                            </span>

                            <strong>
                                {addresses.length}
                            </strong>

                            <small>
                                Addresses
                            </small>

                        </div>

                    </div>


                    <div className="summary-card">

                        <div className="summary-icon navy">

                            <i className="bi bi-star-fill"></i>

                        </div>

                        <div>

                            <span>
                                DEFAULT
                            </span>

                            <strong>
                                {defaultCount}
                            </strong>

                            <small>
                                Primary Address
                            </small>

                        </div>

                    </div>


                    <div className="summary-message">

                        <div className="summary-message-icon">

                            <i className="bi bi-lightning-charge-fill"></i>

                        </div>

                        <div>

                            <strong>
                                Faster service booking
                            </strong>

                            <p>
                                Keep your frequently used locations saved
                                so you can book services faster.
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    SECTION TITLE
                ================================================= */}

                <div className="address-section-title">

                    <div>

                        <span>
                            SAVED LOCATIONS
                        </span>

                        <h2>
                            Your Service Addresses
                        </h2>

                    </div>

                    <div className="section-line"></div>

                </div>


                {/* =================================================
                    EMPTY STATE
                ================================================= */}

                {addresses.length === 0 ? (

                    <div className="empty-address">

                        <div className="empty-address-icon">

                            <i className="bi bi-house-add-fill"></i>

                        </div>

                        <span>
                            NO SAVED LOCATIONS
                        </span>

                        <h3>
                            Add your first address
                        </h3>

                        <p>
                            Save your home, work or other frequently used
                            location for a faster booking experience.
                        </p>

                        <button
                            type="button"
                            className="primary-address-btn"
                            onClick={openAddModal}
                        >

                            <i className="bi bi-plus-lg"></i>

                            Add Address

                        </button>

                    </div>

                ) : (

                    /* =================================================
                       ADDRESS CARDS
                    ================================================= */

                    <div className="addresses-grid">

                        {addresses.map((address) => (

                            <article
                                className={`address-card ${
                                    address.isDefault
                                        ? "is-default"
                                        : ""
                                }`}
                                key={address.addressId}
                            >

                                {/* Card Header */}

                                <div className="address-card-header">

                                    <div className="address-label">

                                        <div className="address-label-icon">

                                            <i
                                                className={
                                                    address.addressType === "Work"
                                                        ? "bi bi-briefcase-fill"
                                                        : address.addressType === "Other"
                                                            ? "bi bi-geo-alt-fill"
                                                            : "bi bi-house-door-fill"
                                                }
                                            ></i>

                                        </div>

                                        <div>

                                            <h3>
                                                {address.addressType || "Address"}
                                            </h3>

                                            <span>
                                                Saved Service Location
                                            </span>

                                        </div>

                                    </div>


                                    {address.isDefault ? (

                                        <span className="default-badge">

                                            <i className="bi bi-check-circle-fill"></i>

                                            Default

                                        </span>

                                    ) : (

                                        <button
                                            type="button"
                                            className="make-default-btn"
                                            disabled={
                                                defaultId ===
                                                address.addressId
                                            }
                                            onClick={() =>
                                                makeDefault(address)
                                            }
                                        >

                                            {defaultId ===
                                            address.addressId ? (

                                                <>
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                    Saving
                                                </>

                                            ) : (

                                                <>
                                                    <i className="bi bi-star"></i>
                                                    Set Default
                                                </>

                                            )}

                                        </button>

                                    )}

                                </div>


                                {/* Main Address */}

                                <div className="address-main">

                                    <div className="address-row">

                                        <i className="bi bi-pin-map-fill"></i>

                                        <div>

                                            <span>
                                                ADDRESS
                                            </span>

                                            <p>
                                                {address.addressLine1}
                                            </p>

                                            {address.addressLine2 && (

                                                <p>
                                                    {address.addressLine2}
                                                </p>

                                            )}

                                        </div>

                                    </div>


                                    <div className="address-row">

                                        <i className="bi bi-buildings-fill"></i>

                                        <div>

                                            <span>
                                                CITY & STATE
                                            </span>

                                            <p>
                                                {address.city},{" "}
                                                {address.state}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="address-row">

                                        <i className="bi bi-globe2"></i>

                                        <div>

                                            <span>
                                                COUNTRY
                                            </span>

                                            <p>
                                                {address.country || "India"}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="address-row">

                                        <i className="bi bi-mailbox2"></i>

                                        <div>

                                            <span>
                                                POSTAL CODE
                                            </span>

                                            <p>
                                                {address.postalCode}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Booking indicator */}

                                {address.isDefault && (

                                    <div className="booking-ready">

                                        <i className="bi bi-check2-circle"></i>

                                        <span>
                                            Ready to use for bookings
                                        </span>

                                    </div>

                                )}


                                {/* Actions */}

                                <div className="address-actions">

                                    <button
                                        type="button"
                                        className="edit-address-btn"
                                        onClick={() =>
                                            openEditModal(address)
                                        }
                                    >

                                        <i className="bi bi-pencil-square"></i>

                                        Edit Address

                                    </button>


                                    <button
                                        type="button"
                                        className="delete-address-btn"
                                        disabled={
                                            deletingId ===
                                            address.addressId
                                        }
                                        onClick={() =>
                                            deleteAddress(address)
                                        }
                                    >

                                        {deletingId ===
                                        address.addressId ? (

                                            <>
                                                <span className="spinner-border spinner-border-sm"></span>
                                                Deleting
                                            </>

                                        ) : (

                                            <>
                                                <i className="bi bi-trash3"></i>
                                                Delete
                                            </>

                                        )}

                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                )}

            </PageContainer>


            {/* =====================================================
                ADD / EDIT MODAL
            ===================================================== */}

            {showModal && (

                <div
                    className="address-modal-backdrop"
                    onMouseDown={(e) => {

                        if (
                            e.target ===
                            e.currentTarget
                        ) {
                            closeModal();
                        }

                    }}
                >

                    <div
                        className="address-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="addressModalTitle"
                    >

                        <div className="address-modal-header">

                            <div className="modal-title-area">

                                <div className="modal-icon">

                                    <i
                                        className={
                                            editingAddress
                                                ? "bi bi-pencil-square"
                                                : "bi bi-house-add-fill"
                                        }
                                    ></i>

                                </div>

                                <div>

                                    <span>
                                        {editingAddress
                                            ? "UPDATE LOCATION"
                                            : "NEW LOCATION"}
                                    </span>

                                    <h2 id="addressModalTitle">

                                        {editingAddress
                                            ? "Edit Address"
                                            : "Add New Address"}

                                    </h2>

                                </div>

                            </div>


                            <button
                                type="button"
                                className="modal-close"
                                onClick={closeModal}
                                disabled={saving}
                                aria-label="Close"
                            >

                                <i className="bi bi-x-lg"></i>

                            </button>

                        </div>


                        <form onSubmit={handleSubmit}>

                            <div className="address-modal-body">

                                {/* Address Type */}

                                <div className="form-group">

                                    <label>
                                        Address Type
                                    </label>

                                    <div className="address-type-options">

                                        {["Home", "Work", "Other"].map(
                                            (type) => (

                                                <button
                                                    type="button"
                                                    key={type}
                                                    className={`type-option ${
                                                        form.addressType === type
                                                            ? "selected"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setForm(
                                                            (prev) => ({
                                                                ...prev,
                                                                addressType:
                                                                    type
                                                            })
                                                        )
                                                    }
                                                >

                                                    <i
                                                        className={
                                                            type === "Home"
                                                                ? "bi bi-house-door-fill"
                                                                : type === "Work"
                                                                    ? "bi bi-briefcase-fill"
                                                                    : "bi bi-geo-alt-fill"
                                                        }
                                                    ></i>

                                                    {type}

                                                </button>

                                            )
                                        )}

                                    </div>

                                </div>


                                <div className="form-row">

                                    <div className="form-group full">

                                        <label htmlFor="addressLine1">
                                            Address Line 1
                                            <span>*</span>
                                        </label>

                                        <div className="input-with-icon">

                                            <i className="bi bi-signpost-2-fill"></i>

                                            <input
                                                id="addressLine1"
                                                name="addressLine1"
                                                value={form.addressLine1}
                                                onChange={handleChange}
                                                placeholder="House / Flat / Building / Street"
                                                required
                                            />

                                        </div>

                                    </div>

                                </div>


                                <div className="form-row">

                                    <div className="form-group full">

                                        <label htmlFor="addressLine2">
                                            Address Line 2
                                        </label>

                                        <div className="input-with-icon">

                                            <i className="bi bi-map-fill"></i>

                                            <input
                                                id="addressLine2"
                                                name="addressLine2"
                                                value={form.addressLine2}
                                                onChange={handleChange}
                                                placeholder="Landmark / Area (Optional)"
                                            />

                                        </div>

                                    </div>

                                </div>


                                <div className="form-row">

                                    <div className="form-group">

                                        <label htmlFor="city">
                                            City
                                            <span>*</span>
                                        </label>

                                        <input
                                            id="city"
                                            name="city"
                                            value={form.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            required
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label htmlFor="state">
                                            State
                                            <span>*</span>
                                        </label>

                                        <input
                                            id="state"
                                            name="state"
                                            value={form.state}
                                            onChange={handleChange}
                                            placeholder="State"
                                            required
                                        />

                                    </div>

                                </div>


                                <div className="form-row">

                                    <div className="form-group">

                                        <label htmlFor="country">
                                            Country
                                        </label>

                                        <input
                                            id="country"
                                            name="country"
                                            value={form.country}
                                            onChange={handleChange}
                                            placeholder="Country"
                                        />

                                    </div>


                                    <div className="form-group">

                                        <label htmlFor="postalCode">
                                            Postal Code
                                            <span>*</span>
                                        </label>

                                        <input
                                            id="postalCode"
                                            name="postalCode"
                                            value={form.postalCode}
                                            onChange={handleChange}
                                            placeholder="Postal Code"
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Optional coordinates */}

                                <details className="coordinates-section">

                                    <summary>
                                        <i className="bi bi-crosshair2"></i>

                                        Advanced Location Details

                                    </summary>

                                    <div className="coordinates-fields">

                                        <div className="form-group">

                                            <label htmlFor="latitude">
                                                Latitude
                                            </label>

                                            <input
                                                id="latitude"
                                                name="latitude"
                                                type="number"
                                                step="any"
                                                value={form.latitude}
                                                onChange={handleChange}
                                                placeholder="Optional"
                                            />

                                        </div>


                                        <div className="form-group">

                                            <label htmlFor="longitude">
                                                Longitude
                                            </label>

                                            <input
                                                id="longitude"
                                                name="longitude"
                                                type="number"
                                                step="any"
                                                value={form.longitude}
                                                onChange={handleChange}
                                                placeholder="Optional"
                                            />

                                        </div>

                                    </div>

                                </details>


                                {/* Default */}

                                <label className="default-checkbox">

                                    <input
                                        type="checkbox"
                                        name="isDefault"
                                        checked={form.isDefault}
                                        onChange={handleChange}
                                    />

                                    <span className="custom-check">

                                        <i className="bi bi-check"></i>

                                    </span>

                                    <span>

                                        <strong>
                                            Make this my default address
                                        </strong>

                                        <small>
                                            Use this location automatically
                                            when booking a service.
                                        </small>

                                    </span>

                                </label>

                            </div>


                            <div className="address-modal-footer">

                                <button
                                    type="button"
                                    className="modal-cancel-btn"
                                    onClick={closeModal}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="modal-save-btn"
                                    disabled={saving}
                                >

                                    {saving ? (

                                        <>
                                            <span className="spinner-border spinner-border-sm"></span>

                                            Saving...
                                        </>

                                    ) : (

                                        <>
                                            <i className="bi bi-check2"></i>

                                            {editingAddress
                                                ? "Update Address"
                                                : "Save Address"}
                                        </>

                                    )}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Addresses;