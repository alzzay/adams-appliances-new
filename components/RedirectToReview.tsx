"use client";

import { useEffect } from "react";
import { business } from "../lib/business";

export default function RedirectToReview() {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = business.leaveReviewUrl;
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ color: "var(--brass)", fontSize: "2rem", letterSpacing: "4px", marginBottom: 12 }}>★★★★★</div>
      <h1 className="h2" style={{ marginInline: "auto" }}>Thanks for choosing Adams!</h1>
      <p className="lede" style={{ marginInline: "auto" }}>
        Taking you to Google to leave a review… it only takes a moment and it genuinely helps a local family business.
      </p>
      <a href={business.leaveReviewUrl} className="btn btn-primary" style={{ marginTop: 8 }}>
        Leave a Google review →
      </a>
    </div>
  );
}
