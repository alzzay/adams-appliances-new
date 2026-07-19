import type { Metadata } from "next";
import { business } from "../../lib/business";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact & Find Us | Adams Appliances, Punchbowl Sydney",
  description: "Contact Adams Appliances in Punchbowl, Sydney. Call, WhatsApp or email for repairs, factory seconds and enquiries. 95 Wattle St. Mon–Fri 9–5, Sat 9–2.",
  alternates: { canonical: `${business.domain}/contact` },
};

const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${business.street} ${business.suburb} ${business.state} ${business.postcode}`)}`;

export default function ContactPage() {
  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="kicker">Get in touch · {business.suburb}, Sydney</div>
          <h1 className="h1">Contact <span>us.</span></h1>
          <p className="sub">Repair, purchase or a general question — reach us whichever way suits you. Call or WhatsApp during trading hours, or send a message and we&rsquo;ll get back to you.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="cgrid">
            <ContactForm />

            <div>
              <div className="eye">Reach us</div>
              <h2 className="h2">{business.name}</h2>
              <div className="info">
                <div className="irow"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.5a2 2 0 0 1-.6 1.9L7.6 9.4a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 1.9-.6l2.5.5a2 2 0 0 1 1.7 2z" /></svg></div><div><h3>Phone</h3><a className="big" href={business.phoneTel}>{business.phoneDisplay}</a></div></div>
                <div className="irow"><div className="ic"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2z" /></svg></div><div><h3>WhatsApp</h3><a className="big" href={`https://wa.me/${business.whatsappNumber}`} target="_blank" rel="noopener noreferrer">0424 612 927</a></div></div>
                <div className="irow"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></div><div><h3>Email</h3><a className="big" href={`mailto:${business.email}`}>{business.email}</a></div></div>
                <div className="irow"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div><div><h3>Address</h3><div className="big">{business.street}, {business.suburb} {business.state} {business.postcode}</div></div></div>
                <div className="irow"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></div><div style={{ flex: 1 }}><h3>Trading hours</h3><ul className="hours">{business.hours.map((h) => (<li key={h.days}><span>{h.days}</span><span>{h.time}</span></li>))}</ul></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="eye">Find us</div>
          <h2 className="h2" style={{ marginBottom: 24 }}>Drop in at {business.suburb}</h2>
          <iframe
            title="Map to Adams Appliances"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(`${business.street} ${business.suburb} ${business.state} ${business.postcode}`)}&output=embed`}
            style={{ width: "100%", height: 340, border: 0, borderRadius: 14 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p style={{ marginTop: 14 }}><a className="btn p" href={mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a></p>
        </div>
      </section>
    </main>
  );
}
