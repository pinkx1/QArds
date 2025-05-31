import React from "react";

export function AccountPage({ userEmail }: { userEmail: string | null }) {
	return (
		<div style={{ padding: "2rem" }}>
			<h1>👤 Account</h1>
			<p>Email: {userEmail || "Unknown"}</p>
		</div>
	);
}
