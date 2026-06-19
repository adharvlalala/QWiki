"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, Loader2, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatDate, truncate } from "@/lib/utils";

interface WikiArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  updated_at: string;
  published: boolean;
  tags: string[];
  stars: number;
  reading_time?: number;
}

interface Props {
  initialArticles: WikiArticle[];
  dbCategoryName: string;
  limit: number;
}

export default function CategoryArticlesClient({
  initialArticles,
  dbCategoryName,
  limit,
}: Props) {
  const [articles, setArticles] = useState<WikiArticle[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialArticles.length === limit);

  const loadMore = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl || supabaseUrl === "your-supabase-url") {
        // Dev mode fallback — no more database items to load
        setHasMore(false);
        return;
      }

      const supabase = createClient();
      const start = page * limit;
      const end = start + limit - 1;

      const { data, error } = await supabase
        .from("wiki_articles")
        .select("id, slug, title, excerpt, category, author, updated_at, published, tags, stars, reading_time")
        .eq("published", true)
        .eq("category", dbCategoryName)
        .order("title", { ascending: true })
        .range(start, end);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setArticles((prev) => [...prev, ...(data as WikiArticle[])]);
        setPage((prev) => prev + 1);
        setHasMore(data.length === limit);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load more articles:", err);
    } finally {
      setLoading(false);
    }
  };

  if (articles.length === 0) {
    return (
      <div 
        className="flex flex-col items-center justify-center text-center py-20 px-6 border border-dashed border-[#E5E5E5] bg-[#fafafa]"
        style={{ borderRadius: "0px" }}
      >
        <BookOpen size={48} className="text-[#999999] mb-4" />
        <h3 
          className="text-lg font-semibold text-black mb-2" 
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          No articles found
        </h3>
        <p 
          className="text-[#666666] text-sm max-w-sm mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          There are currently no published articles in this category. Be the first to start the knowledge flow.
        </p>
        <Link
          href="/contribute"
          className="bg-black text-white px-6 py-3 text-[13px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#303030] transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Contribute an Article
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            href={`/wiki/${article.slug}`}
            key={article.id}
            className="floating-card p-6 flex flex-col justify-between cursor-pointer h-full min-h-[240px] group"
          >
            <div>
              <div className="flex justify-between items-start mb-4 gap-2">
                <span 
                  className="px-2 py-0.5 border border-[#a855f7]/25 text-[#6900b3] bg-[#a855f7]/8 uppercase text-[10px] tracking-wider font-semibold shrink-0"
                  style={{ fontFamily: "'Inter', sans-serif", borderRadius: "0px" }}
                >
                  {article.category}
                </span>
                <span className="text-[11px] text-[#999999] flex items-center gap-1 shrink-0">
                  <Calendar size={12} />
                  {formatDate(article.updated_at)}
                </span>
              </div>
              <h3 
                className="text-[18px] font-semibold text-[#1b1b1b] mb-2 leading-snug group-hover:text-[#a855f7] transition-colors duration-200" 
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {article.title}
              </h3>
              <p 
                className="text-[#666666] text-sm leading-relaxed mb-6 font-normal line-clamp-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {truncate(article.excerpt, 140)}
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-[#f3f3f3] pt-4 mt-auto">
              <div className="flex gap-4 text-xs text-[#666666]">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {article.reading_time || 5} min
                </span>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#000000] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read
                <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-14">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-black text-white px-8 py-4 text-[13px] leading-[100%] tracking-[0.02em] font-medium uppercase hover:bg-[#303030] disabled:bg-[#cccccc] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif", borderRadius: "0px" }}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Load More Articles"
            )}
          </button>
        </div>
      )}
    </>
  );
}
