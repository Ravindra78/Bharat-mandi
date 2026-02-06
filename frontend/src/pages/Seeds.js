// src/pages/Seeds.js
import React, { useEffect } from "react";

export default function Seeds() {
    useEffect(() => {
        console.log("Seeds mounted");
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Seeds Page — debug</h1>
            <p>If you see this, the Seeds route and component are working.</p>
        </div>
    );
}
