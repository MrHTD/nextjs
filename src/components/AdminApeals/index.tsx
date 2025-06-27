"use client";
import React from "react";
import Tabs from "../Base/Tab";
import AdminAffiliateApealsuser from "../AdminAffiliateApealsuser";
import AdminVendorAppealUser from "../AdminVendorAppealUser";

const AdminApealsPage = () => {

    const tabData = [
        { label: 'Affiliate Appeals', content: <AdminAffiliateApealsuser /> },
        { label: 'Vendors Appeals', content: <AdminVendorAppealUser /> },
    ];
    return (
        <div className="p-4 sm:p-6">
            <Tabs tabs={tabData} type="span" />
        </div>

    );
};

export default AdminApealsPage;
