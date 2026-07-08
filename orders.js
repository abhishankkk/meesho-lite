/* ============================================================
   MEESHO LITE — /api/orders
   Vercel serverless order engine. Accepts a POST payload:
     { name, village, landmark, mobile }
   Validates server-side (name + village mandatory, landmark
   optional, mobile exactly 10 digits). Returns 400 with the
   failing field keys, or 200 with a digits-only sequential
   Order ID and the structural delivery pipeline milestones.
   ============================================================ */

// Per-warm-instance sequence counter: gives the ID a sequential
// tail while the timestamp head keeps IDs unique across instances.
let sequence = 0;

function makeOrderId() {
  sequence = (sequence + 1) % 100;
  const stamp = String(Date.now() % 1000000).padStart(6, "0"); // 6 digits, rolling
  return "4" + stamp.slice(0, 5) + String(sequence).padStart(2, "0"); // 8 digits, starts with 4
}

function readBody(req) {
  // Vercel parses JSON bodies automatically when the Content-Type
  // header is application/json; fall back to manual parsing so the
  // endpoint also tolerates text/plain payloads from odd clients.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  return (body && typeof body === "object") ? body : {};
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  const body     = readBody(req);
  const name     = String(body.name     || "").trim();
  const village  = String(body.village  || "").trim(); // village/town + pincode line (mandatory)
  const landmark = String(body.landmark || "").trim(); // landmark line (explicitly optional)
  const mobile   = String(body.mobile   || "").trim();

  const errors = [];
  if (name.length === 0)          errors.push("name");
  if (village.length === 0)       errors.push("village");
  if (!/^\d{10}$/.test(mobile))   errors.push("mobile");

  if (errors.length > 0) {
    res.status(400).json({ ok: false, errors });
    return;
  }

  const placedAt = new Date();

  res.status(200).json({
    ok: true,
    orderId: makeOrderId(),
    cod: true,
    placedAt: placedAt.toISOString(),
    customer: {
      name,
      village,
      landmark: landmark.length > 0 ? landmark : null,
      mobile
    },
    // Structural pipeline: the frontend owns the vernacular wording,
    // the backend owns the logistics structure and day offsets.
    milestones: [
      { key: "confirmed",      offsetDays: 0, hub: null },
      { key: "shipped",        offsetDays: 2, hub: "Indore" },
      { key: "outForDelivery", offsetDays: 4, hub: "Bengaluru" }
    ]
  });
}
