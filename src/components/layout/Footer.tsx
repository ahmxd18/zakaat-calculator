/**
 * Footer.tsx
 * Shared page footer with brand, quick links, social icons, and disclaimer with i18n support.
 * Note: Lucide removed brand icons (Twitter/Instagram/etc.) so we use inline SVGs.
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Moon, Heart } from "lucide-react";
import { Container } from "./Container";
import { useT } from "../../contexts/i18n";
import { INVARIANT_CONSTANTS } from "../../constants/invariants";

// Simple inline SVG social icons (brand-safe, no dependency on lucide brand icons)
const SocialIcons: Record<string, React.FC<{ className?: string }>> = {
  twitter: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
  instagram: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  facebook: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  youtube: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export function Footer() {
  const t = useT();
  
  const socialLinks = [
    { label: 'Twitter', href: INVARIANT_CONSTANTS.social.twitter, icon: 'twitter' },
    { label: 'Instagram', href: INVARIANT_CONSTANTS.social.instagram, icon: 'instagram' },
    { label: 'Facebook', href: INVARIANT_CONSTANTS.social.facebook, icon: 'facebook' },
    { label: 'YouTube', href: INVARIANT_CONSTANTS.social.youtube, icon: 'youtube' },
  ];
  
  const quickLinks = [
    { label: t.nav.links.calculate, path: '/calculate' },
    { label: t.nav.links.faqs, path: '/faqs' },
    { label: t.nav.links.references, path: '/references' },
    { label: t.nav.links.about, path: '/about' },
    { label: t.nav.links.contact, path: '/contact' },
    { label: t.nav.links.donate, path: '/donate' },
  ];
  return (
    <footer className="bg-charcoal-800 text-cream-200">
      {/* ── Top ornamental stripe ── */}
      <div className="h-1 w-full bg-gradient-to-r from-sage-500 via-blush-300 to-sage-500 opacity-60" />

      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 shadow-sm">
                <Moon className="h-4 w-4 text-cream-50 fill-cream-50" strokeWidth={1.5} />
              </div>
              <span
                className="text-xl font-semibold text-cream-50"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.nav.brand}
              </span>
            </Link>
            <p className="text-sm text-charcoal-300 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map(social => {
                const Icon = SocialIcons[social.icon];
                return (
                  <motion.a
                    key={social.icon}
                    href={social.href}
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-charcoal-700 text-charcoal-300 hover:bg-sage-600 hover:text-cream-50 transition-colors duration-200"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* ── Quick links ── */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal-400">
              {t.footer.quickLinksTitle}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-charcoal-300 hover:text-sage-300 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Disclaimer ── */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-charcoal-400">
              {t.footer.disclaimerTitle}
            </h3>
            <p className="text-sm text-charcoal-400 leading-relaxed">
              {t.footer.disclaimer}
            </p>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-8 border-t border-charcoal-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-charcoal-500">
            © {INVARIANT_CONSTANTS.copyright.year} {INVARIANT_CONSTANTS.copyright.entity}. {t.footer.copyright}
          </p>
          <p className="text-xs text-charcoal-500 flex items-center gap-1">
            {t.footer.madeWith} <Heart className="h-3 w-3 text-blush-400 fill-blush-400 mx-0.5" /> {t.footer.forUmmah}
          </p>
        </div>
      </Container>
    </footer>
  );
}
