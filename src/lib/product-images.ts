export const PRODUCT_IMAGES: Record<string, string[]> = {
  "wildflower-linen-shirt": ["/images/verdant/shirt.webp", "/images/verdant/hero-field.webp"],
  "meadow-drift-trousers": ["/images/verdant/trousers.webp", "/images/verdant/hero-field.webp"],
  "hill-field-knit-sweater": ["/images/verdant/knitwear.webp", "/images/verdant/atelier.webp"],
  "backlit-grass-maxi-dress": ["/images/verdant/dress.webp", "/images/verdant/lookbook-dress.webp"],
  "straw-field-hat": ["/images/verdant/hat.webp", "/images/verdant/hero-field.webp"],
  "tall-grass-trench": ["/images/verdant/hero-field.webp", "/images/verdant/atelier.webp"],
  "pasture-slip-dress": ["/images/verdant/lookbook-dress.webp", "/images/verdant/dress.webp"],
  "wild-meadow-scarf": ["/images/verdant/atelier.webp", "/images/verdant/hero-field.webp"],
};

export function imagesForProduct(slug: string, fallback: string[] = []) {
  return PRODUCT_IMAGES[slug] || fallback;
}
