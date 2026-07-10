import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { createPublicClient } from "@/lib/supabase/public";
import CategoryArticlesClient from "@/components/CategoryArticlesClient";
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
  params: Promise<{ category: string }>;
}
export const CATEGORY_SLUG_MAP: Record<string, string> = {
  fundamentals: "Fundamentals",
  computing: "Quantum Computing",
  "quantum-computing": "Quantum Computing",
  algorithms: "Algorithms",
  hardware: "Hardware",
  research: "Research",
  applications: "Applications",
  photonics: "Photonics",
  cryptography: "Cryptography",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Fundamentals": "Core principles of quantum mechanics, wavefunctions, and the physical foundations of quantum state behavior.",
  "Quantum Computing": "Qubits, quantum registers, and the architectural principles of processing quantum information.",
  "Algorithms": "Quantum computational algorithms leveraging superposition, interference, and entanglement for exponential speedups.",
  "Hardware": "Superconducting circuits, trapped ions, photonics, and physical platforms engineered to realize physical qubits.",
  "Research": "The experimental frontier, milestones in quantum advantage, and noisy intermediate-scale quantum (NISQ) technology.",
  "Applications": "Real-world use cases of quantum technology, from quantum simulations to materials science and optimization.",
  "Photonics": "Manipulating light at the single-photon level for linear optical quantum computation and networking.",
  "Cryptography": "Secure communication protocols, quantum key distribution (QKD), and post-quantum cryptographic standards.",
};

const LIMIT = 12;
const MOCK_ARTICLES: Record<string, WikiArticle[]> = {
  "Fundamentals": [
    {
      id: "mock-qm",
      slug: "quantum-mechanics",
      title: "Quantum Mechanics: The Physics of the Microscopic World",
      excerpt: "A fundamental theory in physics that describes the physical properties of nature at the scale of atoms and subatomic particles.",
      category: "Fundamentals",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["fundamentals", "physics", "quantum-theory"],
      stars: 1432,
      reading_time: 6
    },
    {
      id: "mock-wp",
      slug: "wave-particle-duality",
      title: "Wave-Particle Duality: Light and Matter",
      excerpt: "The concept that every particle or quantum entity may be described as either a particle or a wave.",
      category: "Fundamentals",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["fundamentals", "physics", "duality"],
      stars: 924,
      reading_time: 5
    },
    {
      id: "mock-up",
      slug: "uncertainty-principle",
      title: "The Uncertainty Principle: Heisenberg's Legacy",
      excerpt: "Heisenberg's statement that the position and momentum of a particle cannot be simultaneously measured with arbitrarily high precision.",
      category: "Fundamentals",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["fundamentals", "heisenberg", "physics"],
      stars: 1102,
      reading_time: 5
    }
  ],
  "Quantum Computing": [
    {
      id: "mock-qubits",
      slug: "qubits",
      title: "Qubits: The Quantum Bit Explained",
      excerpt: "The fundamental unit of quantum information, capable of representing 0, 1, or both states simultaneously.",
      category: "Quantum Computing",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["computing", "qubits", "superposition"],
      stars: 1589,
      reading_time: 5
    },
    {
      id: "mock-gates",
      slug: "quantum-gates",
      title: "Quantum Gates: Manipulating Superpositions",
      excerpt: "Basic quantum circuits operating on a small number of qubits, acting as the building blocks of quantum algorithms.",
      category: "Quantum Computing",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["computing", "gates", "circuits"],
      stars: 1205,
      reading_time: 6
    }
  ],
  "Algorithms": [
    {
      id: "mock-shor",
      slug: "shors-algorithm",
      title: "Shor's Algorithm: Breaking Classical Cryptography",
      excerpt: "A detailed review of Peter Shor's polynomial-time algorithm for integer factorization.",
      category: "Algorithms",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["algorithms", "cryptography", "shors"],
      stars: 1650,
      reading_time: 7
    },
    {
      id: "mock-grover",
      slug: "grovers-algorithm",
      title: "Grover's Algorithm: Quadratic Search Speedup",
      excerpt: "Lov Grover's quantum algorithm for searching an unsorted database with quadratic speedup.",
      category: "Algorithms",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["algorithms", "search", "grover"],
      stars: 1320,
      reading_time: 5
    }
  ],
  "Hardware": [
    {
      id: "mock-sc",
      slug: "superconducting-qubits",
      title: "Superconducting Qubits: The Silicon of Quantum Tech",
      excerpt: "An introduction to qubits constructed using superconducting electronic circuits, the dominant hardware choice of tech giants.",
      category: "Hardware",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["hardware", "superconducting", "transmon"],
      stars: 1280,
      reading_time: 6
    },
    {
      id: "mock-photonic",
      slug: "photonic-qubits",
      title: "Photonic Qubits: Computing at the Speed of Light",
      excerpt: "Explore linear optical quantum computing where photons serve as information carriers, offering scalability and room-temperature operation.",
      category: "Hardware",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["hardware", "optics", "photons"],
      stars: 1050,
      reading_time: 5
    },
    {
      id: "mock-ions",
      slug: "trapped-ions",
      title: "Trapped Ion Qubits: Precision Atoms",
      excerpt: "How individual charged atoms suspended in vacuum by electromagnetic fields serve as identical, highly stable qubits.",
      category: "Hardware",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["hardware", "trapped-ions", "lasers"],
      stars: 1190,
      reading_time: 6
    }
  ],
  "Research": [
    {
      id: "mock-advantage",
      slug: "quantum-advantage",
      title: "Quantum Advantage: Surpassing Classical Computers",
      excerpt: "The historical milestone where a quantum computer performs a calculation that is practically impossible for any classical supercomputer.",
      category: "Research",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["research", "supremacy", "advantage"],
      stars: 1350,
      reading_time: 6
    },
    {
      id: "mock-nisq",
      slug: "nisq-era",
      title: "The NISQ Era: Computing in the Presence of Noise",
      excerpt: "Coined by John Preskill, NISQ refers to the current generation of noisy, mid-sized quantum devices lacking error correction.",
      category: "Research",
      author: "QWiki Team",
      updated_at: new Date().toISOString(),
      published: true,
      tags: ["research", "nisq", "noise"],
      stars: 970,
      reading_time: 5
    }
  ]
};
export function generateStaticParams() {
  return [
    { category: "fundamentals" },
    { category: "computing" },
    { category: "algorithms" },
    { category: "hardware" },
    { category: "research" },
    { category: "applications" },
    { category: "photonics" },
    { category: "cryptography" },
  ];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const dbCategoryName = CATEGORY_SLUG_MAP[category.toLowerCase()];

  if (!dbCategoryName) {
    return { title: "Category Not Found — QWiki" };
  }

  return {
    title: `${dbCategoryName} Articles — QWiki`,
    description: CATEGORY_DESCRIPTIONS[dbCategoryName] || `Explore QWiki articles related to ${dbCategoryName}.`,
  };
}
export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const dbCategoryName = CATEGORY_SLUG_MAP[category.toLowerCase()];
  if (!dbCategoryName) {
    notFound();
  }

  const description = CATEGORY_DESCRIPTIONS[dbCategoryName] || "Exploring the frontiers of quantum science.";
  let initialArticles: WikiArticle[] = [];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && supabaseUrl !== "your-supabase-url") {
    try {
      const supabase = createPublicClient();
      const { data, error } = await supabase
        .from("wiki_articles")
        .select("id, slug, title, excerpt, category, author, updated_at, published, tags, stars, reading_time")
        .eq("published", true)
        .eq("category", dbCategoryName)
        .order("title", { ascending: true })
        .limit(LIMIT);

      if (error) {
        throw error;
      }
      initialArticles = (data ?? []) as WikiArticle[];
    } catch (err) {
      console.error(`Error fetching articles for category ${dbCategoryName}:`, err);
      initialArticles = MOCK_ARTICLES[dbCategoryName] ?? [];
    }
  } else {
    initialArticles = MOCK_ARTICLES[dbCategoryName] ?? [];
  }

  return (
    <>
      <Navbar />

      <main 
        className="min-h-screen pt-28 px-8 pb-20 relative overflow-hidden" 
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Glowing visual effect matching category */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.06) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto w-full">
          {/* Breadcrumb Navigation */}
          <nav 
            aria-label="Breadcrumb" 
            className="flex items-center gap-2 text-[12px] text-[#999999] mb-8" 
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#000000] transition-colors focus-visible:outline-none focus-visible:underline">Home</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <Link href="/wiki" className="hover:text-[#000000] transition-colors focus-visible:outline-none focus-visible:underline">Wiki</Link>
            <ChevronRight size={12} aria-hidden="true" />
            <span className="text-[#1b1b1b] font-medium">{dbCategoryName}</span>
          </nav>

          {/* Category Header */}
          <header className="mb-14 max-w-2xl">
            <Link 
              href="/wiki" 
              className="inline-flex items-center gap-1 text-xs text-[#666666] hover:text-[#000000] transition-colors mb-4 uppercase tracking-[0.05em]"
            >
              <ArrowLeft size={12} />
              Back to wiki
            </Link>
            <h1 
              className="text-[48px] leading-[110%] font-semibold text-black tracking-[-0.03em] mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {dbCategoryName}
            </h1>
            <p 
              className="text-[16px] leading-[160%] text-[#5e5e5e]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {description}
            </p>
          </header>

          {/* Interactive Articles Grid and Pagination */}
          <CategoryArticlesClient 
            initialArticles={initialArticles} 
            dbCategoryName={dbCategoryName} 
            limit={LIMIT} 
          />
        </div>
      </main>
    </>
  );
}
