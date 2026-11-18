import { MessageCircle, Phone } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import styles from "./hero.module.css";

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.96V9.19h2.97ZM6.44 7.88a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.31 10.87h-2.97V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.47V9.19h2.85v1.31h.04a3.13 3.13 0 0 1 2.81-1.54c3 0 3.58 1.98 3.58 4.55Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.57 9.57 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

const { contact } = portfolio;
const links = [
  { label: "LinkedIn", href: contact.linkedin, icon: <LinkedInIcon />, external: true },
  { label: "GitHub", href: contact.github, icon: <GitHubIcon />, external: true },
  { label: `Call ${contact.phone.label}`, href: contact.phone.href, icon: <Phone size={17} aria-hidden="true" />, external: false },
  { label: "WhatsApp", href: contact.whatsapp, icon: <MessageCircle size={18} aria-hidden="true" />, external: true },
];

export function SocialLinks() {
  return (
    <ul aria-label="Social and contact links" className={styles.socials}>
      {links.map(({ label, href, icon, external }) => (
        <li key={label} data-motion-hero-social>
          <a
            href={href}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            title={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={styles.social}
          >
            {icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
