import type { Metadata } from "next";
import RedirectToReview from "../../components/RedirectToReview";

// Short, memorable URL to put on receipts / QR codes → bounces to Google reviews.
export const metadata: Metadata = {
  title: "Leave a review",
  robots: { index: false, follow: false }, // internal link, keep out of search
};

export default function Page() {
  return (
    <main className="section">
      <div className="wrap" style={{ paddingBlock: "50px" }}>
        <RedirectToReview />
      </div>
    </main>
  );
}
