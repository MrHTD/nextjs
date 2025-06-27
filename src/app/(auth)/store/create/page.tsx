import React from "react";
import CreateStore from "./create";

export default async function page() {
    return (
        <div className="flex flex-row justify-start bg-backgroundcolor">
            <CreateStore />
        </div>
    );
}
