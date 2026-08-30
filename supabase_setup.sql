-- ============================================================================
-- QWIKI DATABASE INITIALIZATION SCRIPT
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================================

-- 1. Enable the pgvector extension for semantic/embedding searches
create extension if not exists vector;

-- 2. Create the wiki_articles table
create table if not exists public.wiki_articles (
    id uuid default gen_random_uuid() primary key,
    slug text not null unique,
    title text not null,
    excerpt text not null,
    content text not null,
    category text not null,
    author text not null default 'QWiki Team',
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    published boolean default true not null,
    tags text[] default '{}'::text[] not null,
    stars integer default 0 not null,
    reading_time integer default 0 not null,
    embedding vector(1536), -- 1536 dimensions for embeddings
    
    -- Automatically updated full-text search (FTS) column indexing title, excerpt, and content
    fts tsvector generated always as (
        to_tsvector('english', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, ''))
    ) stored
);

-- 2.5 Ensure columns exist if the table was already created previously
alter table public.wiki_articles add column if not exists embedding vector(1536);
drop index if exists public.wiki_articles_fts_idx;
alter table public.wiki_articles drop column if exists fts;
alter table public.wiki_articles add column fts tsvector generated always as (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, ''))
) stored;

-- 3. Create full-text search index (GIN index for fast text matching)
create index if not exists wiki_articles_fts_idx on public.wiki_articles using gin(fts);

-- 4. Create vector similarity index (HNSW index for fast vector searching)
create index if not exists wiki_articles_embedding_idx on public.wiki_articles using hnsw (embedding vector_cosine_ops);

-- 5. Create the wiki_contributions table to handle user submissions
create table if not exists public.wiki_contributions (
    id uuid default gen_random_uuid() primary key,
    type text not null check (type in ('new', 'edit')),
    title text not null,
    slug text not null,
    category text not null,
    tags text[] default '{}'::text[] not null,
    content text not null,
    author_name text not null default 'Anonymous',
    author_note text,
    target_slug text,
    status text not null default 'pending_review' check (status in ('pending_review', 'approved', 'rejected')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Enable Row Level Security (RLS) to protect data integrity
alter table public.wiki_articles enable row level security;
alter table public.wiki_contributions enable row level security;

-- 7. Define RLS Security Policies
-- Drop existing policies first to allow re-running this script
drop policy if exists "Allow public read access for published articles" on public.wiki_articles;
drop policy if exists "Allow public inserts for submissions" on public.wiki_contributions;
drop policy if exists "Allow public read access for submissions" on public.wiki_contributions;

-- Everyone (anonymous and authenticated) can select published articles
create policy "Allow public read access for published articles"
on public.wiki_articles
for select
using (published = true);

-- Anyone can submit a new contribution
create policy "Allow public inserts for submissions"
on public.wiki_contributions
for insert
with check (true);

-- Anyone can read contributions (allows building status dashboards or tracking submissions)
create policy "Allow public read access for submissions"
on public.wiki_contributions
for select
using (true);

-- 8. Define pgvector search helper function (RPC)
create or replace function public.match_articles (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  slug text,
  title text,
  excerpt text,
  category text,
  reading_time int,
  updated_at timestamp with time zone,
  similarity float
)
language plpgsql stable
as $$
begin
  return query
  select
    wiki_articles.id,
    wiki_articles.slug,
    wiki_articles.title,
    wiki_articles.excerpt,
    wiki_articles.category,
    wiki_articles.reading_time,
    wiki_articles.updated_at,
    1 - (wiki_articles.embedding <=> query_embedding) as similarity
  from wiki_articles
  where wiki_articles.published = true
    and 1 - (wiki_articles.embedding <=> query_embedding) > match_threshold
  order by wiki_articles.embedding <=> query_embedding
  limit match_count;
end;
$$;


-- ============================================================================
-- SEED DATA (WIKI ARTICLES)
-- Inserts initial articles to populate the wiki's categories and sidebar
-- ============================================================================

insert into public.wiki_articles (slug, title, excerpt, category, author, tags, stars, reading_time, content)
values
(
  'quantum-mechanics',
  'Quantum Mechanics: The Physics of the Microscopic World',
  'A fundamental theory in physics that describes the physical properties of nature at the scale of atoms and subatomic particles.',
  'Fundamentals',
  'QWiki Team',
  array['fundamentals', 'physics', 'quantum-theory'],
  1432,
  6,
  '## Introduction

Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.

## History and Key Postulates

Classical physics, which describes the universe at human scales, fails when applied to subatomic particles. In the late 19th and early 20th centuries, physicists discovered that energy, momentum, angular momentum, and other quantities of a bound system are often restricted to discrete values (quantization).

Key postulates include:
- **Wavefunction Representation:** The state of a physical system is represented by a wave function $\psi(x,t)$, which contains all knowable information about the system.
- **Born Rule:** The probability of finding a particle at a given position is proportional to the square magnitude of its wavefunction $|\psi(x,t)|^2$.
- **Schrödinger Equation:** The temporal evolution of the wavefunction is governed by the Schrödinger equation:
  $$i\hbar \frac{\partial}{\partial t}\psi(x,t) = \hat{H}\psi(x,t)$$

## Key Phenomena

1. **Quantization:** Energy levels are discrete. Electrons in an atom inhabit specific shells rather than a continuous spectrum.
2. **Superposition:** Systems can exist in multiple physical states simultaneously until a measurement is performed.
3. **Entanglement:** Multiple particles can link states in a way that remains correlated over arbitrary distances.
4. **Tunneling:** Particles can pass through barriers that they lack the classical energy to surmount.'
),
(
  'wave-particle-duality',
  'Wave-Particle Duality: Light and Matter as Both Waves and Particles',
  'Explore the core tenet of quantum mechanics stating that every particle or quantum entity may be described as either a particle or a wave.',
  'Fundamentals',
  'QWiki Team',
  array['waves', 'particles', 'duality', 'interference'],
  925,
  4,
  '## Introduction

Wave-particle duality is the concept in quantum mechanics that every particle or quantum entity may be described as either a particle or a wave. It addresses the inability of classical concepts like "particle" or "wave" to fully describe the behavior of quantum-scale objects.

## Historical Milestones

- **Einstein and Photons (1905):** Albert Einstein explained the Photoelectric Effect by proposing that light is composed of discrete packets of energy, which we now call photons.
- **De Broglie Hypothesis (1924):** Louis de Broglie proposed that matter also exhibits wave-like behavior, associating a wavelength $\lambda$ to any moving particle:
  $$\lambda = \frac{h}{p}$$
  where $h$ is Planck''s constant and $p$ is the particle''s momentum.
- **Davisson-Germer Experiment (1927):** Conclusively demonstrated the wave-like property of electrons by reflecting them off nickel crystals and observing diffraction patterns.

## The Double-Slit Experiment

The double-slit experiment is the classic demonstration of wave-particle duality:
1. When particles (e.g., electrons or photons) are fired one at a time through two slits, they build up an **interference pattern** on a detector screen behind the slits, characteristic of wave interference.
2. If we place a detector to monitor which slit each particle passes through, the interference pattern disappears, and the particles behave purely like classical bullets.'
),
(
  'uncertainty-principle',
  'The Heisenberg Uncertainty Principle: Limits of Measurement',
  'An introduction to Werner Heisenberg''s mathematical limit on the precision with which certain pairs of physical properties can be known.',
  'Fundamentals',
  'QWiki Team',
  array['measurement', 'uncertainty', 'heisenberg'],
  1105,
  5,
  '## Introduction

Introduced by German physicist Werner Heisenberg in 1927, the Uncertainty Principle states that there is a fundamental limit to the precision with which certain pairs of physical properties of a particle, known as complementary variables, can be known.

## Mathematical Formulation

The most famous pair of complementary variables is position ($x$) and momentum ($p$). The uncertainty relation is formulated as:
$$\sigma_x \sigma_p \ge \frac{\hbar}{2}$$
where:
- $\sigma_x$ is the standard deviation of position.
- $\sigma_p$ is the standard deviation of momentum.
- $\hbar = h / 2\pi$ is the reduced Planck constant.

Another common conjugate pair is energy ($E$) and time ($t$):
$$\Delta E \Delta t \ge \frac{\hbar}{2}$$

## Interpretation

The uncertainty principle is **not** a statement about the limitations of experimental instruments or human observation. Instead, it is a fundamental property of wave-like systems. Because particles behave like wave packets in quantum mechanics, localizing the position of a wave packet necessarily requires mixing multiple wave frequencies (momenta), which increases momentum uncertainty.'
),
(
  'quantum-entanglement',
  'Quantum Entanglement: Spooky Action at a Distance',
  'Explore how two particles can share quantum states regardless of the distance separating them.',
  'Fundamentals',
  'QWiki Team',
  array['entanglement', 'bell-states', 'EPR', 'foundations'],
  1204,
  5,
  '## Introduction

Quantum entanglement is a phenomenon in quantum mechanics where two or more particles become **correlated** in such a way that the quantum state of each particle cannot be described independently of the others, even when separated by large distances.

## Mathematical Description

For a two-qubit system, an entangled state (Bell state) is written as:
$$|\Phi^+\rangle = \frac{1}{\sqrt{2}}(|00\rangle + |11\rangle)$$

This state cannot be factored into a product of individual qubit states, which is the defining characteristic of entanglement.

## EPR Paradox

In 1935, Einstein, Podolsky, and Rosen (EPR) published a thought experiment challenging quantum mechanics. They argued that if quantum mechanics were complete, it would violate the principle of **local realism**.

## Bell''s Theorem

John Bell (1964) devised a mathematical inequality (Bell inequalities) that, if violated, would rule out local hidden variable theories. Experiments by Aspect et al. (1982) and modern loophole-free tests conclusively demonstrated these violations, proving Einstein''s "spooky action at a distance" is a physical reality.

## Applications

- **Quantum Cryptography:** Quantum key distribution (QKD) using entangled photons.
- **Quantum Teleportation:** Transfer of quantum states using entanglement + classical communication.
- **Quantum Computing:** Entanglement as a computational resource for quantum speedup.'
),

(
  'qubits',
  'Qubits: The Quantum Bit Explained',
  'The fundamental unit of quantum information, capable of representing 0, 1, or both states simultaneously.',
  'Quantum Computing',
  'QWiki Team',
  array['computing', 'qubits', 'superposition'],
  1589,
  5,
  '## Introduction

A quantum bit, or **qubit**, is the basic unit of quantum information. It is the quantum analogue of the classical binary bit (which can only be in a state representing 0 or 1).

## Mathematical Representation

A qubit is a two-state quantum system. Mathematically, it is represented as a vector in a two-dimensional Hilbert space. The standard basis states are $|0\rangle$ and $|1\rangle$ (Dirac notation).

A qubit state $|\psi\rangle$ is written as a linear combination (superposition) of these states:
$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$$
where $\alpha$ and $\beta$ are complex numbers representing probability amplitudes, satisfying the normalization condition:
$$|\alpha|^2 + |\beta|^2 = 1$$

## The Bloch Sphere

Qubits are geometrically visualized using the **Bloch Sphere**. Any pure qubit state can be mapped to a point on the surface of a unit sphere:
- The north pole represents $|0\rangle$.
- The south pole represents $|1\rangle$.
- Points on the equator represent equal superpositions, such as:
  $$|+\rangle = \frac{|0\rangle + |1\rangle}{\sqrt{2}}$$

## Key Differences from Classical Bits

1. **Superposition:** Qubits can represent a blend of 0 and 1 until measured.
2. **Measurement Collapse:** Measuring a qubit collapses its superposition into either $|0\rangle$ or $|1\rangle$ with probabilities $|\alpha|^2$ and $|\beta|^2$.
3. **Entanglement:** Qubits can be entangled to form multi-qubit systems with exponential information capacity ($2^N$ states for $N$ qubits).'
),
(
  'quantum-gates',
  'Quantum Gates: Operators of the Quantum Circuit',
  'An explanation of quantum logic gates, represented by unitary matrices, which manipulate qubit states.',
  'Quantum Computing',
  'QWiki Team',
  array['gates', 'circuits', 'operators'],
  1040,
  5,
  '## Introduction

In quantum computing, a quantum logic gate (or simply a quantum gate) is a basic quantum circuit operating on a small number of qubits. They are the building blocks of quantum circuits, analogous to classical logic gates.

## Mathematical Nature of Gates

Unlike classical gates, quantum gates are **reversible**. Mathematically, they are represented as **unitary matrices** $U$ of size $2^N \times 2^N$ (where $N$ is the number of qubits). A matrix is unitary if:
$$U^\dagger U = I$$
where $U^\dagger$ is the conjugate transpose of $U$, and $I$ is the identity matrix.

## Single-Qubit Gates

- **Pauli-X Gate (NOT Gate):** Flips the qubit state.
  $$X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$$
- **Pauli-Y Gate:** Performs a rotation around the Y-axis.
  $$Y = \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix}$$
- **Pauli-Z Gate:** Flips the phase of $|1\rangle$.
  $$Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$
- **Hadamard Gate (H):** Creates an equal superposition from a basis state.
  $$H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$$

## Multi-Qubit Gates

- **Controlled-NOT (CNOT):** Flips the target qubit if the control qubit is $|1\rangle$.
- **Toffoli Gate (CCNOT):** Flips the target qubit if both control qubits are $|1\rangle$. Essential for reversible classical computation.'
),
(
  'quantum-circuits',
  'Quantum Circuits: Designing Quantum Operations',
  'How quantum gates are arranged chronologically to process quantum information and perform computations.',
  'Quantum Computing',
  'QWiki Team',
  array['circuits', 'algorithms', 'schematics'],
  880,
  4,
  '## Introduction

A quantum circuit is a model for quantum computation in which a computation is a sequence of quantum gates, which are reversible transformations on a quantum mechanical analog of an n-bit register.

## Structure of a Circuit

In a quantum circuit diagram:
- **Wires:** Horizontal lines represent qubits (or classical bits for measurements).
- **Time Flow:** Flows from left to right.
- **Boxes/Symbols:** Represent quantum gates acting on the qubits.
- **Meter Icons:** Represent measurement operations.

## Universality

A set of gates is called **universal** if any unitary operation on a finite number of qubits can be approximated to arbitrary accuracy by a circuit composed of gates only from this set. A common universal gate set consists of:
1. The **CNOT** gate (multi-qubit).
2. Single-qubit rotations (specifically **Hadamard**, **Phase**, and **T-gates**).'
),
(
  'error-correction',
  'Quantum Error Correction: Stabilizing the Qubit',
  'Discover the techniques used to protect quantum information from decoherence and environmental noise.',
  'Quantum Computing',
  'QWiki Team',
  array['noise', 'decoherence', 'error-correction', 'surface-code'],
  1220,
  6,
  '## The Challenge of Noise

Quantum computers are extremely sensitive to environmental noise. Interaction with the environment leads to **decoherence**, where qubits lose their fragile quantum states, causing computational errors.

## Classical vs. Quantum Error Correction

Classical systems correct errors by copying data (e.g., majority voting). However, quantum systems face unique constraints:
1. **No-Cloning Theorem:** It is impossible to make an identical copy of an unknown quantum state.
2. **Measurement Collapse:** Measuring a qubit to check for errors collapses its superposition.
3. **Phase Errors:** Qubits suffer from both bit-flip errors ($|0\rangle \leftrightarrow |1\rangle$) and phase-flip errors ($|0\rangle + |1\rangle \leftrightarrow |0\rangle - |1\rangle$).

## The Solution: Active Correction

Quantum Error Correction (QEC) works by encoding one **logical qubit** into an entangled state of multiple **physical qubits**. 

- **Shor Code (1995):** The first QEC code, encoding 1 logical qubit into 9 physical qubits, capable of correcting arbitrary single-qubit errors.
- **Surface Codes:** Modern topological codes that arrange physical qubits on a 2D grid. They feature a high fault-tolerance threshold (nearly 1% error rate per gate), making them the primary architecture of modern industrial efforts.'
),

(
  'shors-algorithm',
  'Shor''s Algorithm: Breaking Classical Cryptography',
  'A detailed review of Peter Shor''s polynomial-time algorithm for integer factorization.',
  'Algorithms',
  'QWiki Team',
  array['algorithms', 'cryptography', 'shors', 'rsa'],
  1650,
  7,
  '## Introduction

Shor''s algorithm, formulated by Peter Shor in 1994, is a quantum algorithm for finding the prime factors of an integer $N$. On a classical computer, factoring large integers is believed to be computationally intractable, forming the security foundation of modern encryption (RSA).

## Complexity Comparison

- **Classical:** The best-known classical algorithm is the General Number Field Sieve (GNFS), which operates in sub-exponential time:
  $$\mathcal{O}\left(\exp\left(c \sqrt[3]{\ln N (\ln \ln N)^2}\right)\right)$$
- **Quantum:** Shor''s algorithm solves the problem in polynomial time:
  $$\mathcal{O}((\log N)^3)$$

## How It Works

Shor''s algorithm reduces the factoring problem to a **period-finding problem** on a group, which can be solved efficiently using a quantum computer.

1. **Classical Reduction:** Factoring $N$ is shown to be equivalent to finding the period $r$ of the function $f(x) = a^x \pmod N$.
2. **Quantum Period Finding:**
   - Create a superposition of states.
   - Evaluate $f(x)$ in parallel.
   - Apply the **Quantum Fourier Transform (QFT)** to extract the period $r$ from the interference pattern.
3. **Classical Calculation:** Use the period $r$ to calculate the greatest common divisor $\gcd(a^{r/2} \pm 1, N)$ to find the factors.

## Cryptographic Implications

Shor''s algorithm renders RSA and elliptic-curve cryptography vulnerable once large-scale, fault-tolerant quantum computers are constructed. This has driven the global migration to **Post-Quantum Cryptography (PQC)**.'
),
(
  'grovers-algorithm',
  'Grover''s Algorithm: Unstructured Database Search',
  'Explore the quantum search algorithm that provides a quadratic speedup over classical searches.',
  'Algorithms',
  'QWiki Team',
  array['algorithms', 'search', 'grovers', 'speedup'],
  1140,
  5,
  '## Introduction

Grover''s algorithm, designed by Lov Grover in 1996, is a quantum algorithm that solves the problem of searching an unstructured database or solving an inverted function with $N$ entries in $\mathcal{O}(\sqrt{N})$ steps.

## The Speedup

- **Classical:** Searching an unsorted database of size $N$ requires checking entries one by one, resulting in a linear time complexity of $\mathcal{O}(N)$ on average.
- **Quantum:** Grover''s algorithm solves this in $\mathcal{O}(\sqrt{N})$ evaluations, representing a **quadratic speedup**.

## Core Steps

Grover''s algorithm does not look at all entries at once, but rather amplifies the probability amplitude of the correct state through iterative geometry:

1. **State Initialization:** Prepare an equal superposition of all database indices.
2. **Grover Iteration (repeated $\approx \frac{\pi}{4}\sqrt{N}$ times):**
   - **Oracle:** Flips the phase of the target state ($|w\rangle \to -|w\rangle$).
   - **Diffusion Operator (Inversion about the mean):** Reflects all amplitudes about the average amplitude, amplifying the target and dampening the others.
3. **Measurement:** Measures the register, yielding the target index with near-100% probability.'
),
(
  'vqe',
  'Variational Quantum Eigensolver (VQE)',
  'A hybrid quantum-classical algorithm optimized for finding the ground state energy of molecules on NISQ devices.',
  'Algorithms',
  'QWiki Team',
  array['algorithms', 'chemistry', 'nisq', 'vqe'],
  990,
  5,
  '## Introduction

The Variational Quantum Eigensolver (VQE) is a hybrid quantum-classical algorithm designed to find the eigenvalues of a large matrix, specifically the ground state energy of a molecular Hamiltonian. It is highly optimized for Noisy Intermediate-Scale Quantum (NISQ) computers.

## Variational Principle

VQE is based on the variational method in quantum mechanics. For any ansatz state $|\psi(\vec{\theta})\rangle$ parameterized by classical parameters $\vec{\theta}$, the expectation value of the Hamiltonian $H$ is always greater than or equal to the ground state energy $E_0$:
$$\langle H \rangle_{\vec{\theta}} = \frac{\langle\psi(\vec{\theta})|H|\psi(\vec{\theta})\rangle}{\langle\psi(\vec{\theta})|\psi(\vec{\theta})\rangle} \ge E_0$$

## Hybrid Architecture

VQE delegates work between quantum and classical processors:
1. **Quantum Processor:** Prepares the parameterized state $|\psi(\vec{\theta})\rangle$ and measures the expectation values of the Hamiltonian terms.
2. **Classical Processor:** Evaluates the energy and uses classical optimization algorithms (e.g., COBYLA, Adam) to update the parameters $\vec{\theta}$ to minimize the energy.
3. This loop repeats until convergence is reached.'
),

(
  'superconducting-qubits',
  'Superconducting Qubits: The Silicon of Quantum Tech',
  'An introduction to qubits constructed using superconducting electronic circuits, the dominant hardware choice of tech giants.',
  'Hardware',
  'QWiki Team',
  array['hardware', 'superconducting', 'transmon', 'josephson'],
  1280,
  6,
  '## Introduction

Superconducting qubits are electronic circuits fabricated on silicon or sapphire chips, operating at microkelvin temperatures. They are currently the leading technology used by major quantum computing developers, including IBM, Google, and Rigetti.

## The Josephson Junction

A simple LC resonator circuit behaves like a harmonic oscillator, having evenly spaced energy levels. This makes it unsuitable as a qubit, as a photon pulse would drive transitions to higher states ($|1\rangle \to |2\rangle$) instead of remaining in the $|0\rangle \leftrightarrow |1\rangle$ subspace.

To solve this, superconducting qubits use a **Josephson Junction** (a thin insulating barrier between two superconductors). The junction acts as a non-linear inductor, introducing anharmonicity. This spreads the energy spacing, isolating the lowest two energy levels ($|0\rangle$ and $|1\rangle$) for use as a qubit.

## The Transmon Qubit

The most common design is the **Transmon** (Transmission line shunted plasma oscillation qubit). It shunts the Josephson junction with a large capacitor to drastically reduce the qubit''s sensitivity to charge noise, extending coherence times from nanoseconds to hundreds of microseconds.'
),
(
  'photonic-qubits',
  'Photonic Qubits: Computing at the Speed of Light',
  'Explore linear optical quantum computing where photons serve as information carriers, offering scalability and room-temperature operation.',
  'Hardware',
  'QWiki Team',
  array['hardware', 'optics', 'photons', 'silicon-photonics'],
  1050,
  5,
  '## Introduction

Photonic quantum computing uses light particles (photons) as the qubits. Optical components like beam splitters, phase shifters, and mirrors are arranged on silicon photonic chips to process quantum information.

## Advantages

1. **No Cryogenics Needed for Qubits:** Photons do not interact with the thermal environment, meaning the qubits themselves can operate at room temperature.
2. **Low Decoherence:** Photons rarely interact with each other or the environment, avoiding decoherence.
3. **Networking Integration:** Photons are the ideal medium for quantum communication, making photonic computers natively ready for quantum networks.

## The Challenges

Because photons do not interact with each other, creating **two-qubit gates** (which require state interaction) is extremely difficult. Photonic architectures overcome this using:
- **Measurement-Based Quantum Computation (MBQC):** Large entangled states of light (cluster states) are prepared, and computation is carried out by sequentially measuring individual photons.'
),
(
  'trapped-ions',
  'Trapped Ion Qubits: Precision Atoms',
  'How individual charged atoms suspended in vacuum by electromagnetic fields serve as identical, highly stable qubits.',
  'Hardware',
  'QWiki Team',
  array['hardware', 'trapped-ions', 'lasers', 'vacuum'],
  1190,
  6,
  '## Introduction

Trapped ion quantum computing uses individual charged atoms (ions), typically Ytterbium ($Yb^+$) or Calcium ($Ca^+$), suspended in vacuum by electromagnetic fields. Lasers are then used to manipulate their internal electronic states.

## The Paul Trap

To isolate the ions, researchers use a **Paul Trap** (radiofrequency quadrupole trap) which creates a dynamic electric potential that holds a linear chain of ions in place in an ultra-high vacuum chamber.

## Advantages

1. **Identical Qubits:** Unlike synthetic qubits (e.g., superconducting circuits), every atom of a given isotope is perfectly identical by nature.
2. **High Coherence:** Trapped ions can maintain their quantum coherence for seconds, or even hours in specialized configurations.
3. **High Gate Fidelity:** Trapped ion systems regularly demonstrate some of the highest single- and two-qubit gate fidelities in the industry.

## Gates and Manipulation

Qubits are manipulated by shining focused laser beams on specific ions. Two-qubit gates are mediated by the **collective vibrational motion** (phonons) of the ion chain, driven by laser forces.'
),

(
  'quantum-advantage',
  'Quantum Advantage: Surpassing Classical Computers',
  'The historical milestone where a quantum computer performs a calculation that is practically impossible for any classical supercomputer.',
  'Research',
  'QWiki Team',
  array['research', 'supremacy', 'advantage', 'sycamore'],
  1350,
  6,
  '## Definition

Quantum Advantage (historically called "Quantum Supremacy") refers to the demonstration that a programmable quantum device can solve a computational problem that is beyond the reach of the most powerful classical supercomputers within a reasonable timeframe.

## Key Milestones

- **Google Sycamore (2019):** Google claimed quantum advantage using a 53-qubit superconducting processor called Sycamore. It performed a random circuit sampling calculation in 200 seconds, which they estimated would take a classical supercomputer 10,000 years.
- **USTC Jiuzhang (2020):** Demonstrated quantum advantage using a photonic quantum computer performing Boson Sampling.
- **Subsequent Classical Counter-Claims:** Classical researchers frequently design improved tensor-network simulation algorithms that reduce the classical computing time, leading to an ongoing race between quantum hardware and classical algorithms.

## Beyond Toy Problems

Early demonstrations of quantum advantage focused on abstract, mathematically constructed tasks with no immediate practical application. Current research is directed at achieving **practical quantum advantage**—solving real-world problems in chemistry, optimization, or materials science faster or cheaper than classical alternatives.'
),
(
  'nisq-era',
  'The NISQ Era: Computing in the Presence of Noise',
  'Coined by John Preskill, NISQ refers to the current generation of noisy, mid-sized quantum devices lacking error correction.',
  'Research',
  'QWiki Team',
  array['research', 'nisq', 'noise', 'algorithms'],
  970,
  5,
  '## Coining the Term

In 2018, physicist John Preskill coined the term **NISQ** to describe the current state of quantum hardware:
- **Noisy:** Qubits are prone to environmental errors and gate inaccuracies.
- **Intermediate-Scale:** Qubit counts range from 50 to a few hundred physical qubits.

## Why Error Correction is Not Yet Viable

True Fault-Tolerant Quantum Computing (FTQC) requires thousands of physical qubits to build a single error-corrected logical qubit. Modern devices do not have enough qubits or low enough error rates to support this overhead.

## Algorithm Strategies for NISQ

Because gates fail after a short depth, algorithms in the NISQ era must be short and resilient:
1. **Hybrid Quantum-Classical Algorithms:** Algorithms like VQE or QAOA run short quantum circuits, measure results, and optimize classical parameters.
2. **Error Mitigation:** Statistical techniques that run multiple circuit variations to estimate and subtract noise effects from the final data.'
)
on conflict (slug) do nothing;
