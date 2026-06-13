import Script from "next/script";

/**
 * HubSpot tracking script — loads only when NEXT_PUBLIC_HUBSPOT_PORTAL_ID is set.
 * Portal ID from your embed code: //js-na2.hs-scripts.com/246483144.js → 246483144
 * This is for page analytics/tracking only; join form submissions use POST /api/join (HubSpot only).
 */
export function HubSpotTracking() {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  if (!portalId) return null;

  return (
    <Script
      id="hs-script-loader"
      src={`//js-na2.hs-scripts.com/${portalId}.js`}
      strategy="afterInteractive"
    />
  );
}
