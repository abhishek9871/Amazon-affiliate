// A mapping of country codes to Amazon top-level domains (TLDs)
const TLD_MAP: { [key: string]: string } = {
  US: "com",
  GB: "co.uk",
  CA: "ca",
  AU: "com.au",
  DE: "de",
  FR: "fr",
  ES: "es",
  IT: "it",
  JP: "co.jp",
  CN: "cn",
  IN: "in",
  NL: "nl",
  BR: "com.br",
  MX: "com.mx",
};

/**
 * Gets the appropriate Amazon TLD based on the user's country code.
 * Defaults to 'com' for US and other regions.
 * @param {string} countryCode - The 2-letter country code (e.g., 'IN', 'US').
 * @returns {string} The Amazon TLD (e.g., 'in', 'co.uk', 'com').
 */
const getAmazonDomain = (countryCode: string): string => {
  return TLD_MAP[countryCode.toUpperCase()] || "com"; // Default to .com
};

/**
 * Generates a geo-targeted Amazon affiliate link for a given ASIN.
 * @param {string} asin - The Amazon Standard Identification Number of the product.
 * @param {string | null} countryCode - The user's 2-letter country code from IP lookup.
 * @returns {string} The full, localized Amazon product URL with an affiliate tag.
 */
export const generateAffiliateLink = (asin: string, countryCode: string | null): string => {
  const domain = getAmazonDomain(countryCode || 'US');
  const affiliateTag = "yourtag-20"; // IMPORTANT: Replace with your actual Amazon Associate's tag
  return `https://www.amazon.${domain}/dp/${asin}/?tag=${affiliateTag}`;
};
