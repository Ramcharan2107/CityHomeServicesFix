import { useEffect, useState } from "react";
import userService from "../../services/userService";

import ProfileHeader from "../../components/customer/profile/ProfileHeader";
import PersonalInformation from "../../components/customer/profile/PersonalInformation";
import AdditionalInformation from "../../components/customer/profile/AdditionalInformation";
import AccountStatus from "../../components/customer/profile/AccountStatus";
import ChangePasswordCard from "../../components/customer/profile/ChangePasswordCard";
import QuickActions from "../../components/customer/profile/QuickActions";
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

            await userService.updateProfile(
                profile
            );


            setMessage(
                "Profile updated successfully."
            );

            setMessageType("success");

        }
        catch (error) {

            console.error(
                "Failed to update profile:",
                error
            );

            setMessage(
                "Failed to update profile."
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

                <div className="customer-profile-heading">

                    <div>

                        <span className="profile-section-label">
                            ACCOUNT
                        </span>

                        <h1>
                            My Profile
                        </h1>

                        <p>
                            Manage your personal information
                            and account preferences.
                        </p>

                    </div>

                </div>


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

                <div className="profile-section-card">

                    <ProfileHeader
                        profile={profile}
                    />

                </div>


                {/* =================================================
                    MAIN PROFILE CONTENT
                ================================================= */}

                <div className="row g-4 mt-1">


                    {/* =================================================
                        LEFT COLUMN
                    ================================================= */}

                    <div className="col-lg-8">


                        <div className="profile-section-card">

                            <div className="profile-card-heading">

                                <div className="profile-card-heading-icon">

                                    <i className="bi bi-person-lines-fill"></i>

                                </div>

                                <div>

                                    <h3>
                                        Personal Information
                                    </h3>

                                    <p>
                                        Update your basic account
                                        information.
                                    </p>

                                </div>

                            </div>

                            <PersonalInformation
                                profile={profile}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="profile-section-card mt-4">

                            <div className="profile-card-heading">

                                <div className="profile-card-heading-icon">

                                    <i className="bi bi-card-text"></i>

                                </div>

                                <div>

                                    <h3>
                                        Additional Information
                                    </h3>

                                    <p>
                                        Manage additional details
                                        associated with your account.
                                    </p>

                                </div>

                            </div>

                            <AdditionalInformation
                                profile={profile}
                                onChange={handleChange}
                            />

                        </div>


                    </div>


                    {/* =================================================
                        RIGHT COLUMN
                    ================================================= */}

                    <div className="col-lg-4">


                        <div className="profile-section-card">

                            <AccountStatus
                                profile={profile}
                            />

                        </div>


                        <div className="profile-section-card mt-4">

                            <div className="profile-card-heading">

                                <div className="profile-card-heading-icon">

                                    <i className="bi bi-lightning-charge-fill"></i>

                                </div>

                                <div>

                                    <h3>
                                        Quick Actions
                                    </h3>

                                    <p>
                                        Frequently used account actions.
                                    </p>

                                </div>

                            </div>

                            <QuickActions />

                        </div>


                    </div>

                </div>


                {/* =================================================
                    CHANGE PASSWORD
                ================================================= */}

                <div className="profile-section-card mt-4">

                    <div className="profile-card-heading">

                        <div className="profile-card-heading-icon">

                            <i className="bi bi-shield-lock-fill"></i>

                        </div>

                        <div>

                            <h3>
                                Security
                            </h3>

                            <p>
                                Keep your account secure by
                                maintaining a strong password.
                            </p>

                        </div>

                    </div>

                    <ChangePasswordCard />

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