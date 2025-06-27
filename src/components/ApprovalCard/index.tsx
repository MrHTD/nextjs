import React from "react";
import AdminApprovalCard from "../AdminApprovalCard";
import AdminPendingCard from "../AdminPendingCard";
import Heading from "../Base/Heading";
import Tabs from "../Base/Tab";

const ApprovalCard = () => {

    const tabData = [
        { label: 'Approved', content: <AdminApprovalCard /> },
        { label: 'Pending', content: <AdminPendingCard /> },
    ];
    return (
        <div className="p-4 sm:p-6">
            <Heading level={3} className="text-lg sm:text-xl font-medium text-black mb-4 text-center sm:text-left">
                Pending Affiliates
            </Heading>
            <Tabs tabs={tabData} type="Button" />
        </div>

    );
};

export default ApprovalCard;
