import { useEffect, useState } from "react";
import userService from "../../services/userService";

import ProfileHeader from "../../components/customer/profile/ProfileHeader";
import PersonalInformation from "../../components/customer/profile/PersonalInformation";
import AdditionalInformation from "../../components/customer/profile/AdditionalInformation";
import AccountStatus from "../../components/customer/profile/AccountStatus";
import ChangePasswordCard from "../../components/customer/profile/ChangePasswordCard";
import PageContainer from "../../components/common/PageContainer";

import "./CustomerProfile.css";


function CustomerProfile() {

    const [profile, setProfile] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");

    const [messageType, setMessageType] = useState("info");


    /* =====================================================
       LOAD PROFILE
    ===================================================== */

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            setLoading(true);

            setMessage("");

            const data =
                await userService.getMyProfile();

            setProfile(data);

        }
        catch (error) {

            console.error(
                "Failed to load profile:",
                error
            );

            setMessage(
                "Failed to load profile."
            );

            setMessageType("danger");

        }
        finally {

            setLoading(false);

        }

    };


    /* =====================================================
       HANDLE INPUT CHANGE
    ===================================================== */

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setProfile(prev => ({

            ...prev,

            [name]: value

        }));

    };


    /* =====================================================
       SAVE PROFILE
    ===================================================== */

    const saveProfile = async () => {

        try {

            setSaving(true);

            setMessage("");

            const updated = await userService.updateProfile(profile);

            if (updated && typeof updated === "object") {
                const nextProfile = updated?.data || updated?.result || updated;
                if (nextProfile && typeof nextProfile === "object") {
                    setProfile(prev => ({ ...prev, ...nextProfile }));
                }
            }

            setMessage("Profile updated successfully.");

            setMessageType("success");

        }
        catch (error) {

            console.error(
                "Failed to update profile:",
                error
            );

            setMessage(
                error?.response?.data?.message ||
                error?.response?.data?.title ||
                "Unable to save your profile. Please try again."
            );

            setMessageType("danger");

        }
        finally {

            setSaving(false);

        }

    };


    /* =====================================================
       ACCOUNT ACTIONS
    ===================================================== */

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    };

    const deactivateAccount = async () => {
        if (!profile || saving) return;

        const confirmed = window.confirm(
            "Are you sure you want to deactivate your account? You can contact support to reactivate it later."
        );

        if (!confirmed) return;

        try {
            setSaving(true);
            setMessage("");

            const updated = await userService.updateProfile({
                ...profile,
                isActive: false
            });

            const nextProfile =
                updated?.data ||
                updated?.result ||
                updated;

            if (nextProfile && typeof nextProfile === "object") {
                setProfile(prev => ({ ...prev, ...nextProfile }));
            } else {
                setProfile(prev => ({ ...prev, isActive: false }));
            }

            setMessage("Your account has been deactivated successfully.");
            setMessageType("success");
        }
        catch (error) {
            console.error("Failed to deactivate account:", error);

            setMessage(
                error?.response?.data?.message ||
                error?.response?.data?.title ||
                "Unable to deactivate your account. Please try again."
            );

            setMessageType("danger");
        }
        finally {
            setSaving(false);
        }
    };

    /* =====================================================
       LOADING
    ===================================================== */

    if (loading) {

        return (

            <div className="customer-profile-page">

                <PageContainer>

                    <div className="customer-profile-loading">

                        <div className="profile-loading-icon">

                            <i className="bi bi-person-circle"></i>

                        </div>

                        <div className="spinner-border text-warning"></div>

                        <h5>
                            Loading Profile...
                        </h5>

                        <p>
                            Preparing your account information.
                        </p>

                    </div>

                </PageContainer>

            </div>

        );

    }


    /* =====================================================
       PROFILE NOT FOUND
    ===================================================== */

    if (!profile) {

        return (

            <div className="customer-profile-page">

                <PageContainer>

                    <div className="profile-error-card">

                        <div className="profile-error-icon">

                            <i className="bi bi-person-x-fill"></i>

                        </div>

                        <h3>
                            Profile Not Available
                        </h3>

                        <p>
                            We couldn't load your profile information.
                            Please try again.
                        </p>

                        <button
                            type="button"
                            className="profile-retry-btn"
                            onClick={loadProfile}
                        >

                            <i className="bi bi-arrow-clockwise"></i>

                            Try Again

                        </button>

                    </div>

                </PageContainer>

            </div>

        );

    }


    return (

        <div className="customer-profile-page">

            <PageContainer>


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <section className="customer-profile-heading" aria-labelledby="profile-page-title">

                    <div className="customer-profile-hero-content">
                        <span className="profile-section-label">
                            CUSTOMER ACCOUNT
                        </span>

                        <h1 id="profile-page-title">
                            My Profile
                        </h1>

                        <p>
                            Manage your personal information, account details,
                            security and preferences from one place.
                        </p>

                        <div className="profile-hero-meta">
                            <span>
                                <i className="bi bi-shield-check"></i>
                                Secure account
                            </span>
                            <span>
                                <i className="bi bi-person-check"></i>
                                Profile management
                            </span>
                        </div>
                    </div>

                    <div className="customer-profile-hero-actions">
                        <button
                            type="button"
                            className="profile-hero-action profile-hero-action-light"
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = "/";
                            }}
                        >
                            <i className="bi bi-box-arrow-right"></i>
                            Logout
                        </button>
                    </div>

                </section>


                {/* =================================================
                    MESSAGE
                ================================================= */}

                {message && (

                    <div
                        className={`profile-message profile-message-${messageType}`}
                    >

                        <div className="profile-message-icon">

                            <i
                                className={
                                    messageType === "success"
                                        ? "bi bi-check-circle-fill"
                                        : "bi bi-info-circle-fill"
                                }
                            ></i>

                        </div>

                        <span>
                            {message}
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                setMessage("")
                            }
                        >

                            <i className="bi bi-x"></i>

                        </button>

                    </div>

                )}


                {/* =================================================
                    PROFILE HEADER
                ================================================= */}

                <section className="profile-section-card profile-overview-card">

                    <div className="profile-overview-actions">
                        <button
                            type="button"
                            className="profile-overview-btn profile-overview-logout"
                            onClick={logout}
                            title="Sign out of your account"
                        >
                            <i className="bi bi-box-arrow-right"></i>
                            Logout
                        </button>

                        <button
                            type="button"
                            className="profile-overview-btn profile-overview-deactivate"
                            onClick={deactivateAccount}
                            disabled={saving || profile?.isActive === false}
                            title={
                                profile?.isActive === false
                                    ? "Account is already inactive"
                                    : "Deactivate your account"
                            }
                        >
                            <i className="bi bi-person-x"></i>
                            {profile?.isActive === false ? "Deactivated" : "Deactivate"}
                        </button>
                    </div>

                    <ProfileHeader profile={profile} />

                </section>


                {/* =================================================
                    MAIN PROFILE CONTENT
                ================================================= */}

                <div className="profile-main-grid">

                    <section className="profile-section-card profile-content-card profile-personal-card">
                        <div className="profile-card-heading">
                            <span className="profile-card-step">01</span>

                            <div className="profile-card-heading-icon">
                                <i className="bi bi-person-lines-fill"></i>
                            </div>

                            <div>
                                <h3>Personal Information</h3>
                                <p>Update your basic account information.</p>
                            </div>
                        </div>

                        <PersonalInformation
                            profile={profile}
                            onChange={handleChange}
                        />
                    </section>

                    <section className="profile-section-card profile-content-card profile-status-card">
                        <div className="profile-card-heading profile-card-heading-status">
                            <span className="profile-card-step">03</span>

                            <div className="profile-card-heading-icon">
                                <i className="bi bi-activity"></i>
                            </div>

                            <div>
                                <h3>Account Status</h3>
                                <p>Current account activity and status.</p>
                            </div>
                        </div>

                        <AccountStatus profile={profile} />
                    </section>

                    <section className="profile-section-card profile-content-card profile-additional-card">
                        <div className="profile-card-heading">
                            <span className="profile-card-step">02</span>

                            <div className="profile-card-heading-icon">
                                <i className="bi bi-card-text"></i>
                            </div>

                            <div>
                                <h3>Additional Information</h3>
                                <p>Manage additional details associated with your account.</p>
                            </div>
                        </div>

                        <AdditionalInformation
                            profile={profile}
                            onChange={handleChange}
                        />
                    </section>

                    <section className="profile-section-card profile-content-card profile-security-card">
                        <div className="profile-card-heading">
                            <span className="profile-card-step">04</span>

                            <div className="profile-card-heading-icon">
                                <i className="bi bi-shield-lock-fill"></i>
                            </div>

                            <div>
                                <h3>Security</h3>
                                <p>Keep your account secure by maintaining a strong password.</p>
                            </div>
                        </div>

                        <ChangePasswordCard />
                    </section>

                </div>


                {/* =================================================
                    SAVE
                ================================================= */}

                <div className="profile-save-section">

                    <div className="profile-save-info">

                        <i className="bi bi-shield-check"></i>

                        <div>

                            <strong>
                                Keep your information up to date
                            </strong>

                            <span>
                                Changes will be saved to your account.
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="profile-save-btn"
                        onClick={saveProfile}
                        disabled={saving}
                    >

                        {saving ? (

                            <>
                                <span
                                    className="spinner-border spinner-border-sm"
                                ></span>

                                Saving...

                            </>

                        ) : (

                            <>
                                <i className="bi bi-check2-circle"></i>

                                Save Profile

                            </>

                        )}

                    </button>

                </div>


            </PageContainer>

        </div>

    );

}


export default CustomerProfile;