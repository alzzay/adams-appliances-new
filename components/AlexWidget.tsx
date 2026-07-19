"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "../lib/business";

type Msg = { who: "a" | "u"; text: string };

const CONTACT = `Call ${business.phoneDisplay}, WhatsApp 0424 612 927, or email ${business.email}.`;
const CHECK = `Best to check that one with the team directly — ${CONTACT}`;
const GREET =
  "Hi! I'm Alex, the Adams Appliances assistant. I can help with stock, repairs, hours, delivery, directions and more — what do you need?";

// Scripted knowledge base — the live assistant is designed to answer ~90% of common questions from this.
const KB: { k: string[]; a: string }[] = [
  { k: ["hour", "open", "close", "trading", "what time"], a: "We're open Mon–Fri 9am–5pm and Sat 9am–2pm, closed Sundays and public holidays." },
  { k: ["where", "address", "located", "location", "find you", "punchbowl", "direction"], a: "We're at 95 Wattle St, Punchbowl NSW 2196 — about 20km from the CBD, with parking out front." },
  { k: ["park"], a: "Yes, there's parking right out front on Wattle St, plus street parking nearby." },
  { k: ["nespresso"], a: "Yes — we're an authorised Nespresso repairer, Original and Vertuo machines. Bring it in or call to book." },
  { k: ["delonghi", "de'longhi", "de longhi"], a: "De'Longhi is our biggest repair line and we're authorised for it — genuine parts, warranty-safe, most faults diagnosed same day." },
  { k: ["kenwood"], a: "Yes — authorised Kenwood repairs: Chef, Cooking Chef, kMix stand mixers and food processors." },
  { k: ["braun"], a: "Yes — authorised Braun repairs, mainly MultiQuick hand blenders and food processors." },
  { k: ["sunbeam"], a: "Yes — authorised Sunbeam repairs, including Mixmaster mixers and Café Series coffee machines." },
  { k: ["fridge repair", "oven repair", "washing machine repair", "washer repair", "dryer repair", "cooktop repair", "fix my fridge", "fix my oven", "fix my wash", "repair my fridge"], a: "We repair coffee & small kitchen appliances only — not fridges, ovens, cooktops, washers or dryers. But we do sell those, so I can help you find a replacement!" },
  { k: ["how long", "turnaround", "take to fix", "take to repair", "ready by"], a: "Many faults are diagnosed the same day. Turnaround then depends on parts, but common jobs are usually back with you within the week." },
  { k: ["quote", "estimate", "diagnose", "diagnosis", "assess"], a: "We diagnose the machine first and give you a clear price before any work starts — no surprises, and no charge for honest advice on whether a repair is worth it." },
  { k: ["genuine part", "real part", "original part"], a: "Always. As an authorised repairer we fit genuine manufacturer parts, which keeps the repair reliable and your warranty valid." },
  { k: ["spare part", "buy part", "sell part", "need a part"], a: `For spare-parts enquiries it's best to give us a ring — ${CONTACT}` },
  { k: ["repair", "fix", "broken", "not working", "service", "fault"], a: "We're a manufacturer-authorised repairer for De'Longhi, Kenwood, Braun, Sunbeam and Nespresso. What machine do you have, and what's it doing?" },
  { k: ["difference", "new vs", "brand new or"], a: "New appliances are retail-ready with no marks. Factory seconds have a minor cosmetic mark but are fully functional, unused and tested. Both perform the same — seconds just cost significantly less." },
  { k: ["factory second", "second", "cosmetic", "scratch", "dent", "mark"], a: "A factory second is an appliance with a minor cosmetic mark — otherwise fully functional, tested and warranty-backed. Same appliance, significantly less." },
  { k: ["extended warranty", "good guys", "harvey", "bing lee", "myer", "jb hi", "jb-hi", "jbhifi"], a: "Yes — we're an approved extended-warranty service agent for The Good Guys, Harvey Norman, Bing Lee, Myer and JB Hi-Fi." },
  { k: ["warranty"], a: "Factory seconds come with manufacturer warranty (ask us for the exact terms on a unit). We're also an approved extended-warranty service agent for The Good Guys, Harvey Norman, Bing Lee, Myer and JB Hi-Fi." },
  { k: ["deliver", "delivery", "ship", "freight", "drop off to me"], a: "Yes, we deliver across Sydney through our local courier partner. Fees vary by suburb — give us a call and we'll work it out." },
  { k: ["pick up", "pickup", "collect", "in store"], a: "Absolutely — you're welcome to collect in store at 95 Wattle St, Punchbowl during trading hours." },
  { k: ["reserve", "how do i buy", "how to buy", "purchase", "order", "hold it", "put aside"], a: "Tap Reserve on any product (WhatsApp, call or email) and we'll hold the exact unit for you. There's no online payment — you pay and collect in store." },
  { k: ["pay", "payment", "eftpos", "credit card", "afterpay", "zip", "cash", "layby"], a: `You can sort payment with us in store. For specific options, ${CHECK.toLowerCase()}` },
  { k: ["trade", "old appliance", "sell my", "buy my", "take my old"], a: CHECK },
  { k: ["install", "installation", "take away", "remove old", "disposal"], a: CHECK },
  { k: ["commercial", "business use", "cafe machine", "office"], a: `We focus on domestic appliances. For commercial machines it's best to call and we'll let you know if we can help — ${CONTACT}` },
  { k: ["price", "cost", "how much", "cheap", "deal", "discount"], a: "Prices vary by item — the Shop page lists everything with current pricing and the saving. Tell me what you're after and I'll point you the right way." },
  { k: ["brand", "stock", "do you sell", "do you have", "samsung", "electrolux", "westinghouse", "aeg", "kelvinator", "gorenje", "chef", "daniella"], a: "We stock plenty of trusted brands — Samsung, Electrolux, Westinghouse, Kelvinator, AEG, Chef, Gorenje, Daniella and Nespresso, plus De'Longhi, Kenwood, Braun & Sunbeam." },
  { k: ["history", "how long have", "family", "started", "since 2000", "years", "who are you", "about"], a: "Adams has been family-run since 2000 — we started in Bankstown, then Kingsgrove, and today trade from Punchbowl. Same family, same honest approach." },
  { k: ["contact", "phone", "call", "number", "whatsapp", "email", "reach you"], a: CONTACT },
  { k: ["thank", "cheers", "appreciate"], a: "No worries at all! Anything else I can help with?" },
];
const FALLBACK = `I'm not certain on that one — the team can help best. ${CONTACT}`;
const QUICKS = ["Opening hours", "Do you repair my brand?", "What's a factory second?", "Do you deliver?"];

function reply(q: string): string {
  const s = q.toLowerCase().trim();
  if (/^(hi|hey|hello|yo|g'?day|good (morning|afternoon|evening))\b/.test(s)) return GREET;
  for (const item of KB) {
    for (const key of item.k) {
      if (s.indexOf(key) > -1) return item.a;
    }
  }
  return FALLBACK;
}

export default function AlexWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) setMessages([{ who: "a", text: GREET }]);
  }, [open, messages.length]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages]);

  function send(q: string) {
    const text = q.trim();
    if (!text) return;
    setMessages((m) => [...m, { who: "u", text }]);
    setInput("");
    setTimeout(() => setMessages((m) => [...m, { who: "a", text: reply(text) }]), 400);
  }

  if (!open) {
    return (
      <button className="alexbtn" onClick={() => setOpen(true)} aria-label="Chat with Alex">
        <span className="av">A</span> Ask Alex
      </button>
    );
  }

  return (
    <div className="alexwin" role="dialog" aria-label="Chat with Alex">
      <div className="alexhd">
        <span className="av">A</span>
        <div><b>Alex</b><small>Adams Appliances assistant</small></div>
        <button className="x" onClick={() => setOpen(false)} aria-label="Close">&times;</button>
      </div>
      <div className="alexbody" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.who}`}>{m.text}</div>
        ))}
      </div>
      <div className="quick">
        {QUICKS.map((q) => (
          <button key={q} onClick={() => send(q)}>{q}</button>
        ))}
      </div>
      <div className="alexin">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
          placeholder="Ask about stock, repairs, hours..."
          aria-label="Message Alex"
        />
        <button onClick={() => send(input)}>Send</button>
      </div>
      <div className="alexnote">Assistant answers loaded from Adams&rsquo; business info</div>
    </div>
  );
}
