const zoneId = "TON_ZONE_ID";
const email = "TON_EMAIL";
const apiKey = "TA_GLOBAL_API_KEY";

fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
  method: "POST",
  headers: {
    "X-Auth-Email": email,
    "X-Auth-Key": apiKey,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ purge_everything: true }),
})
.then(() => console.log("🚀 Cache Cloudflare purgé avec succès !"))
.catch((err) => console.error("❌ Erreur de purge :", err));