import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_CONTENT } from "@/content/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes image URLs: strips broken Behance links and auto-converts Cloudinary .heic URLs to .jpg
 * so web browsers never fail to display them.
 */
export function getSafeImageUrl(
  url?: string,
  fallback: string = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85"
): string {
  if (!url || typeof url !== "string") return fallback;
  let trimmed = url.trim();
  if (!trimmed || trimmed.includes("behance.net/gallery/")) return fallback;
  if (trimmed.toLowerCase().endsWith(".heic") && trimmed.includes("cloudinary.com")) {
    trimmed = trimmed.replace(/\.heic$/i, ".jpg");
  }
  return trimmed;
}

/**
 * Builds a clean WhatsApp outbound URL with prefilled enquiry message.
 */
export function buildWhatsAppUrl(details: {
  occasion?: string;
  palette?: string;
  style?: string;
  name?: string;
  service?: string;
  date?: string;
  notes?: string;
}) {
  const phone = SITE_CONTENT.brand.whatsappNumber.replace(/[^0-9]/g, "");

  // Format message cleanly
  const lines: string[] = [
    `*Hello Jensi & THE PETAL MUSE Atelier,*`,
    `I am reaching out regarding a bespoke floral enquiry.`,
    ``,
  ];

  if (details.name) lines.push(`• *Client Name:* ${details.name}`);
  if (details.service) lines.push(`• *Enquiry Type:* ${details.service}`);
  if (details.occasion) lines.push(`• *Occasion:* ${details.occasion}`);
  if (details.palette) lines.push(`• *Chosen Palette:* ${details.palette}`);
  if (details.style) lines.push(`• *Style / Scale:* ${details.style}`);
  if (details.date) lines.push(`• *Preferred Date:* ${details.date}`);
  if (details.notes) {
    lines.push(``);
    lines.push(`*Notes & Vision:*`);
    lines.push(details.notes);
  }

  lines.push(``);
  lines.push(`_Sent via thepetalmuse.com interactive workshop_`);

  const encodedMessage = encodeURIComponent(lines.join("\n"));

  // If phone placeholder is still active, prompt or use clean link
  if (!phone || phone === "ADD_PHONE_HERE" || phone.length < 5) {
    return `https://wa.me/?text=${encodedMessage}`;
  }

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

/**
 * Builds the official Instagram Direct Message URL (mobile app deep-link / web DM).
 */
export function buildInstagramDmUrl(handle?: string): string {
  const rawHandle = handle || SITE_CONTENT.brand.instagramHandle || "the.petalmusee";
  const cleanHandle = rawHandle.replace(/[@/]/g, "").trim();
  return `https://ig.me/m/${cleanHandle}`;
}

/**
 * Formats a bespoke inquiry message for copying to clipboard before opening Instagram DM.
 */
export function formatInquiryMessage(details: {
  title?: string;
  category?: string;
  occasion?: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  palette?: string;
  style?: string;
  date?: string;
  notes?: string;
  details?: string;
  [key: string]: any;
}): string {
  const lines: string[] = [
    `Hello Jensi & THE PETAL MUSE Atelier! ✨`,
    `I would love to enquire regarding a bespoke creation:`,
    ``,
  ];

  if (details.title) lines.push(`• Creation: ${details.title}`);
  if (details.category) lines.push(`• Category: ${details.category}`);
  if (details.occasion) lines.push(`• Occasion / Milestone: ${details.occasion}`);
  if (details.name) lines.push(`• Client Name: ${details.name}`);
  if (details.email) lines.push(`• Email: ${details.email}`);
  if (details.phone) lines.push(`• Phone: ${details.phone}`);
  if (details.service) lines.push(`• Service Type: ${details.service}`);
  if (details.palette) lines.push(`• Color Palette: ${details.palette}`);
  if (details.style) lines.push(`• Style: ${details.style}`);
  if (details.date) lines.push(`• Preferred Date: ${details.date}`);
  const extraNotes = details.notes || details.details;
  if (extraNotes) {
    lines.push(``);
    lines.push(`Notes & Vision:`);
    lines.push(extraNotes);
  }

  lines.push(``);
  lines.push(`— Sent via thepetalmuse.com`);
  return lines.join("\n");
}

/**
 * Copies the inquiry details to the user's clipboard and immediately opens Instagram DM.
 */
export async function openInstagramInquiry(details: {
  title?: string;
  category?: string;
  occasion?: string;
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  palette?: string;
  style?: string;
  date?: string;
  notes?: string;
  details?: string;
  handle?: string;
  [key: string]: any;
}): Promise<void> {
  const message = formatInquiryMessage(details);
  const dmUrl = buildInstagramDmUrl(details.handle);

  if (typeof window !== "undefined") {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
      }
    } catch { }

    window.dispatchEvent(
      new CustomEvent("the_petal_muse_toast", {
        detail: {
          message: "Enquiry details copied! Opening Instagram DM with @the.petalmusee...",
          type: "success",
        },
      })
    );

    setTimeout(() => {
      window.open(dmUrl, "_blank", "noopener,noreferrer");
    }, 300);
  }
}

/**
 * Mailto generator fallback for contact submissions
 */
export function buildMailtoUrl(details: {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date?: string;
  notes?: string;
}) {
  const targetEmail = SITE_CONTENT.brand.contactEmail === "ADD_EMAIL_HERE"
    ? "contact@thepetalmuse.com"
    : SITE_CONTENT.brand.contactEmail;

  const subject = encodeURIComponent(`Bespoke Floral Enquiry: ${details.service} - ${details.name}`);
  const body = encodeURIComponent(
    `Hello Jensi Dholariya & THE PETAL MUSE,\n\n` +
    `Client Name: ${details.name}\n` +
    `Email: ${details.email}\n` +
    `Phone: ${details.phone || "Not specified"}\n` +
    `Enquiry Type: ${details.service}\n` +
    `Preferred Date: ${details.date || "Not specified"}\n\n` +
    `Message / Vision:\n${details.notes || "None provided"}\n\n` +
    `Sent from THE PETAL MUSE Website`
  );

  return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
}

