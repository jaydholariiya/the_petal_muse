import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_CONTENT } from "@/content/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

