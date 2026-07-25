"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = decodeURIComponent(hash.replace("#", ""));
        
        // Try scrolling immediately
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // If the element is not in DOM yet (due to rendering lag), retry after a short delay
          const timer = setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 300);
          return () => clearTimeout(timer);
        }
      }
    };

    // Run scroll check on mount or path change
    handleScroll();

    // Listen for manual hash changes (e.g. clicking ToC links)
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, [pathname]);

  return null;
}
