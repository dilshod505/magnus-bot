"use client";

import React from "react";
import Footer from "@/app/Footer/Footer";
import PromaKod from "@/components/proma";

function Page() {
    return (
        <div>
            <PromaKod/>
            <Footer cartItemCount={0}/>
        </div>
    );
}

export default Page;