"use client";

import { useState } from "react";
import { business } from "../lib/business";

const topics = ["Repair enquiry", "Factory second / product", "General question"];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [details, setDetails] = useState("");

  const subject = `${topic}${name ? ` — ${name}` : ""}`;
  const body = [name ? `Name: ${name}` : "", `Topic: ${topic}`, "", details || "(add your message here)"].filter(Boolean).join("\n");

  const mailto = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const whatsapp = `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(`${subject}\n\n${details}`)}`;

  return (
    <div>
      <div className="eye">Send a message</div>
      <h2 className="h2">Tell us what you need</h2>
      <p className="lede" style={{ marginBottom: 22 }}>Fill this in and it&rsquo;ll open a ready-to-send message with the details filled in. Nothing is stored on this site.</p>

      <div className="field"><label htmlFor="nm">Your name</label><input id="nm" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" /></div>
      <div className="field"><label htmlFor="tp">What&rsquo;s it about?</label>
        <select id="tp" value={topic} onChange={(e) => setTopic(e.target.value)}>{topics.map((t) => <option key={t}>{t}</option>)}</select>
      </div>
      <div className="field"><label htmlFor="dt">Details</label><textarea id="dt" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Tell us the appliance and what's happening — e.g. 'De'Longhi Magnifica S, not pumping water.'" /></div>

      <div className="formbtns">
        <a className="btn wa" href={whatsapp} target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20z" /></svg>
          Send on WhatsApp
        </a>
        <a className="btn p" href={mailto}>Send email</a>
        <a className="btn s" href={business.phoneTel}>Call instead</a>
      </div>
      <p className="note">&ldquo;Send&rdquo; opens WhatsApp or your email app with everything typed in — just hit send.</p>
    </div>
  );
}
