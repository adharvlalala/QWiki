"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface StarButtonProps {
  articleId: string;
  articleSlug: string;
  initialStars: number;
}

export default function StarButton({
  articleId,
  articleSlug,
  initialStars,
}: StarButtonProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [starsCount, setStarsCount] = useState(initialStars);
  const [isPending, setIsPending] = useState(false);

  // 1. Initial load: Check localStorage and sync with Supabase if logged in
  useEffect(() => {
    const checkDbStatus = async () => {
      // Check localStorage first for instant visual response
      const localStarred = localStorage.getItem(`qwiki_starred_${articleSlug}`) === "true";
      if (localStarred) {
        setIsStarred(true);
      }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl === "your-supabase-url") return;

      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const { data, error } = await supabase
            .from("article_stars")
            .select("id")
            .eq("user_id", session.user.id)
            .eq("article_id", articleId)
            .maybeSingle();

          if (!error) {
            const dbStarred = !!data;
            setIsStarred(dbStarred);
            if (dbStarred) {
              localStorage.setItem(`qwiki_starred_${articleSlug}`, "true");
            } else {
              localStorage.removeItem(`qwiki_starred_${articleSlug}`);
            }
          }
        }
      } catch (err) {
        console.error("Failed to check db star status:", err);
      }
    };

    checkDbStatus();
  }, [articleId, articleSlug]);

  // 2. Handle click toggle
  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPending) return;

    setIsPending(true);
    const nextStarred = !isStarred;
    const increment = nextStarred ? 1 : -1;

    // Optimistic UI updates
    setIsStarred(nextStarred);
    setStarsCount((prev) => Math.max(0, prev + increment));
    
    if (nextStarred) {
      localStorage.setItem(`qwiki_starred_${articleSlug}`, "true");
    } else {
      localStorage.removeItem(`qwiki_starred_${articleSlug}`);
    }

    // Database updates (if Supabase is configured)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && supabaseUrl !== "your-supabase-url") {
      try {
        const supabase = createClient();
        const { data: newCount, error } = await supabase.rpc("toggle_article_star", {
          article_slug: articleSlug,
          increment_amount: increment,
        });

        if (error) {
          throw error;
        }

        if (newCount !== null && newCount !== undefined) {
          setStarsCount(newCount);
        }
      } catch (err) {
        console.error("Failed to sync star status with database:", err);
        // Revert optimistic updates on error
        setIsStarred(isStarred);
        setStarsCount(starsCount);
        if (isStarred) {
          localStorage.setItem(`qwiki_starred_${articleSlug}`, "true");
        } else {
          localStorage.removeItem(`qwiki_starred_${articleSlug}`);
        }
      }
    }

    setIsPending(false);
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 text-sm text-[#666666] hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7e22ce] px-2 py-1 rounded bg-transparent border-none cursor-pointer select-none"
      aria-label={`${starsCount} stars. ${isStarred ? "Starred" : "Unstarred"}. Click to toggle.`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Star
        size={14}
        className={cn(
          "transition-all duration-200",
          isStarred 
            ? "fill-[#7e22ce] text-[#7e22ce] scale-110 filter drop-shadow-[0_0_2px_rgba(126,34,206,0.3)]" 
            : "text-[#666666] hover:scale-105"
        )}
        aria-hidden="true"
      />
      <span className="font-medium text-[#5e5e5e] hover:text-black">
        {starsCount.toLocaleString()}
      </span>
    </button>
  );
}
