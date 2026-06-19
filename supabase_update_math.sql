-- ============================================================================
-- Update Shor's Algorithm content to use KaTeX math formatting
-- Run this in your Supabase SQL Editor
-- ============================================================================

UPDATE public.wiki_articles
SET content = E'## Introduction\n\nShor''s algorithm, formulated by Peter Shor in 1994, finds the prime factors of an integer N in polynomial time — a task believed to be intractable on classical computers and the security foundation of RSA encryption.\n\n## Complexity\n\n- **Classical (GNFS):** Sub-exponential time: $$\\mathcal{O}\\left(\\exp\\left(c \\sqrt[3]{\\ln N (\\ln \\ln N)^2}\\right)\\right)$$\n- **Quantum (Shor):** Polynomial time: $$\\mathcal{O}((\\log N)^3)$$\n\n## How It Works\n\n1. **Reduction:** Factoring N is reduced to finding the period r of $f(x) = a^x \\mod N$.\n2. **Quantum Period Finding:**\n   - Prepare a superposition of inputs.\n   - Apply the Quantum Fourier Transform (QFT) to extract the period r.\n3. **Classical Post-Processing:** Use r to compute $\\gcd(a^{r/2} \\pm 1, N)$ to find the factors.\n\n## Cryptographic Implications\n\nShor''s algorithm threatens RSA and elliptic-curve cryptography. This has driven global migration to **Post-Quantum Cryptography (PQC)** standards.'
WHERE slug = 'shors-algorithm';
