-- ============================================================================
-- QWIKI SEED DATA — PASTE THIS IN SUPABASE SQL EDITOR AND RUN
-- This script ONLY inserts articles. Run this after the main setup script.
-- Safe to re-run: ON CONFLICT DO NOTHING skips existing articles.
-- ============================================================================

insert into public.wiki_articles (slug, title, excerpt, category, author, tags, stars, reading_time, content)
values

(
  'quantum-mechanics',
  'Quantum Mechanics: The Physics of the Microscopic World',
  'A fundamental theory in physics that describes the physical properties of nature at the scale of atoms and subatomic particles.',
  'Fundamentals', 'QWiki Team',
  array['fundamentals', 'physics', 'quantum-theory'],
  1432, 6,
  E'## Introduction\n\nQuantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics including quantum chemistry, quantum field theory, quantum technology, and quantum information science.\n\n## Key Postulates\n\n- **Wavefunction:** The state of a system is described by a wave function containing all knowable information.\n- **Born Rule:** The probability of finding a particle at a position is proportional to the square magnitude of its wavefunction.\n- **Schrodinger Equation:** The temporal evolution of the wavefunction is governed by this equation.\n\n## Key Phenomena\n\n1. **Quantization:** Energy levels are discrete.\n2. **Superposition:** Systems can exist in multiple states simultaneously until measured.\n3. **Entanglement:** Particles can be correlated over arbitrary distances.\n4. **Tunneling:** Particles can pass through classically forbidden barriers.'
),
(
  'wave-particle-duality',
  'Wave-Particle Duality: Light and Matter as Both Waves and Particles',
  'Explore the core tenet of quantum mechanics stating that every particle or quantum entity may be described as either a particle or a wave.',
  'Fundamentals', 'QWiki Team',
  array['waves', 'particles', 'duality', 'interference'],
  925, 4,
  E'## Introduction\n\nWave-particle duality is the concept in quantum mechanics that every particle or quantum entity may be described as either a particle or a wave.\n\n## Historical Milestones\n\n- **Einstein and Photons (1905):** Albert Einstein explained the Photoelectric Effect by proposing that light is composed of discrete packets of energy called photons.\n- **De Broglie Hypothesis (1924):** Louis de Broglie proposed that matter exhibits wave-like behavior. The wavelength is: lambda = h/p, where h is Planck''s constant and p is momentum.\n- **Davisson-Germer Experiment (1927):** Demonstrated the wave-like property of electrons via diffraction patterns.\n\n## The Double-Slit Experiment\n\nThe classic demonstration of duality:\n1. Particles fired one at a time through two slits create an **interference pattern** on a detector screen.\n2. When a detector monitors which slit each particle passes through, the interference pattern disappears.'
),
(
  'uncertainty-principle',
  'The Heisenberg Uncertainty Principle: Limits of Measurement',
  'An introduction to Werner Heisenberg''s mathematical limit on the precision with which certain pairs of physical properties can be known.',
  'Fundamentals', 'QWiki Team',
  array['measurement', 'uncertainty', 'heisenberg'],
  1105, 5,
  E'## Introduction\n\nIntroduced by Werner Heisenberg in 1927, the Uncertainty Principle states there is a fundamental limit to the precision with which certain pairs of physical properties of a particle can be known simultaneously.\n\n## Mathematical Formulation\n\nThe most famous pair is position (x) and momentum (p):\n\n  sigma_x * sigma_p >= hbar/2\n\nwhere sigma_x is the standard deviation of position, sigma_p is the standard deviation of momentum, and hbar = h/2pi is the reduced Planck constant.\n\nAnother common conjugate pair is energy (E) and time (t):\n\n  Delta_E * Delta_t >= hbar/2\n\n## Interpretation\n\nThis is **not** about limitations of instruments. It is a fundamental property of wave-like systems. Localizing a wave packet requires mixing multiple frequencies, which increases momentum uncertainty.'
),

(
  'qubits',
  'Qubits: The Quantum Bit Explained',
  'The fundamental unit of quantum information, capable of representing 0, 1, or both states simultaneously.',
  'Quantum Computing', 'QWiki Team',
  array['computing', 'qubits', 'superposition'],
  1589, 5,
  E'## Introduction\n\nA quantum bit, or **qubit**, is the basic unit of quantum information — the quantum analogue of the classical bit.\n\n## Mathematical Representation\n\nA qubit state is a superposition of the two basis states |0> and |1>:\n\n  |psi> = alpha|0> + beta|1>\n\nwhere alpha and beta are complex probability amplitudes satisfying:\n\n  |alpha|^2 + |beta|^2 = 1\n\n## The Bloch Sphere\n\nAny pure qubit state can be visualized as a point on the surface of a unit sphere (the Bloch Sphere):\n- North pole: |0>\n- South pole: |1>\n- Equator: equal superpositions\n\n## Key Differences from Classical Bits\n\n1. **Superposition:** Qubits can represent a blend of 0 and 1 until measured.\n2. **Measurement Collapse:** Measuring collapses the superposition into |0> or |1>.\n3. **Entanglement:** Multiple qubits can be entangled, giving exponential information capacity.'
),
(
  'quantum-gates',
  'Quantum Gates: Operators of the Quantum Circuit',
  'An explanation of quantum logic gates, represented by unitary matrices, which manipulate qubit states.',
  'Quantum Computing', 'QWiki Team',
  array['gates', 'circuits', 'operators'],
  1040, 5,
  E'## Introduction\n\nQuantum gates are the building blocks of quantum circuits, analogous to classical logic gates but always **reversible**. They are represented as unitary matrices U satisfying U†U = I.\n\n## Common Single-Qubit Gates\n\n- **Pauli-X (NOT):** Flips |0> to |1> and vice versa.\n- **Pauli-Z:** Flips the phase of |1>, leaving |0> unchanged.\n- **Hadamard (H):** Creates an equal superposition from a basis state: H|0> = (|0> + |1>)/sqrt(2).\n\n## Multi-Qubit Gates\n\n- **CNOT:** Flips the target qubit if and only if the control qubit is |1>.\n- **Toffoli (CCNOT):** Flips the target if both control qubits are |1>. Enables universal reversible classical computation.\n\n## Universality\n\nThe set {H, T, CNOT} is universal — any quantum operation can be approximated by combining these gates.'
),
(
  'quantum-circuits',
  'Quantum Circuits: Designing Quantum Operations',
  'How quantum gates are arranged chronologically to process quantum information and perform computations.',
  'Quantum Computing', 'QWiki Team',
  array['circuits', 'algorithms', 'schematics'],
  880, 4,
  E'## Introduction\n\nA quantum circuit is a sequence of quantum gates applied to a set of qubits. It is the primary model for quantum computation.\n\n## Reading a Circuit Diagram\n\n- **Horizontal wires:** Each wire represents one qubit.\n- **Time flows left to right.**\n- **Boxes/symbols on wires:** Quantum gates acting on those qubits.\n- **Meter icons:** Measurement operations.\n\n## Universality\n\nA gate set is **universal** if any unitary operation can be approximated to arbitrary accuracy using only those gates. A common universal set includes:\n1. The CNOT gate\n2. Single-qubit rotations (Hadamard, Phase, T-gate)\n\n## Circuit Depth\n\nCircuit depth is the number of sequential gate layers. Deeper circuits are more powerful but accumulate more noise on real hardware — a key challenge in the NISQ era.'
),
(
  'error-correction',
  'Quantum Error Correction: Stabilizing the Qubit',
  'Discover the techniques used to protect quantum information from decoherence and environmental noise.',
  'Quantum Computing', 'QWiki Team',
  array['noise', 'decoherence', 'error-correction', 'surface-code'],
  1220, 6,
  E'## The Challenge of Noise\n\nQubits are extremely sensitive to environmental noise. Interaction with the environment causes **decoherence**, corrupting quantum states and causing errors.\n\n## Constraints Unique to Quantum Systems\n\n1. **No-Cloning Theorem:** An unknown quantum state cannot be copied.\n2. **Measurement Collapse:** Checking a qubit for errors destroys its superposition.\n3. **Two Error Types:** Bit-flip errors (|0> <-> |1>) and phase-flip errors.\n\n## The Solution: Logical Qubits\n\nQEC encodes one **logical qubit** across many **physical qubits** using entanglement. Errors on individual physical qubits can be detected and corrected without measuring the logical qubit directly.\n\n- **Shor Code (1995):** First QEC code — 1 logical qubit encoded into 9 physical qubits.\n- **Surface Codes:** Arrange qubits on a 2D grid with ~1% error threshold, making them the leading architecture for fault-tolerant quantum computers.'
),

(
  'shors-algorithm',
  'Shor''s Algorithm: Breaking Classical Cryptography',
  'A detailed review of Peter Shor''s polynomial-time algorithm for integer factorization.',
  'Algorithms', 'QWiki Team',
  array['algorithms', 'cryptography', 'shors', 'rsa'],
  1650, 7,
  E'## Introduction\n\nShor''s algorithm, formulated by Peter Shor in 1994, finds the prime factors of an integer N in polynomial time — a task believed to be intractable on classical computers and the security foundation of RSA encryption.\n\n## Complexity\n\n- **Classical (GNFS):** Sub-exponential time: O(exp(c * (ln N)^(1/3) * (ln ln N)^(2/3)))\n- **Quantum (Shor):** Polynomial time: O((log N)^3)\n\n## How It Works\n\n1. **Reduction:** Factoring N is reduced to finding the period r of f(x) = a^x mod N.\n2. **Quantum Period Finding:**\n   - Prepare a superposition of inputs.\n   - Apply the Quantum Fourier Transform (QFT) to extract the period r.\n3. **Classical Post-Processing:** Use r to compute gcd(a^(r/2) ± 1, N) to find the factors.\n\n## Cryptographic Implications\n\nShor''s algorithm threatens RSA and elliptic-curve cryptography. This has driven global migration to **Post-Quantum Cryptography (PQC)** standards.'
),
(
  'grovers-algorithm',
  'Grover''s Algorithm: Unstructured Database Search',
  'Explore the quantum search algorithm that provides a quadratic speedup over classical searches.',
  'Algorithms', 'QWiki Team',
  array['algorithms', 'search', 'grovers', 'speedup'],
  1140, 5,
  E'## Introduction\n\nGrover''s algorithm (1996) searches an unstructured database of N entries in O(sqrt(N)) steps, providing a quadratic speedup over the classical O(N) linear search.\n\n## Core Steps\n\n1. **Initialize:** Create an equal superposition of all N database indices.\n2. **Grover Iteration** (repeated ~(pi/4)*sqrt(N) times):\n   - **Oracle:** Marks the target state by flipping its phase.\n   - **Diffusion (Inversion about the mean):** Amplifies the marked amplitude and suppresses all others.\n3. **Measure:** The target index is returned with near-certainty.\n\n## Applications\n\n- Searching unsorted databases\n- Inverting cryptographic hash functions\n- Solving NP problems with quadratic speedup\n\n## Optimality\n\nGrover''s algorithm is **provably optimal** — no quantum algorithm can search an unstructured database faster than O(sqrt(N)).'
),
(
  'vqe',
  'Variational Quantum Eigensolver (VQE)',
  'A hybrid quantum-classical algorithm optimized for finding the ground state energy of molecules on NISQ devices.',
  'Algorithms', 'QWiki Team',
  array['algorithms', 'chemistry', 'nisq', 'vqe'],
  990, 5,
  E'## Introduction\n\nThe Variational Quantum Eigensolver (VQE) is a hybrid algorithm for finding the minimum eigenvalue of a Hamiltonian — typically the ground state energy of a molecule. It is designed for NISQ hardware.\n\n## Variational Principle\n\nFor any trial state |psi(theta)>, the expectation value of H is always greater than or equal to the true ground state energy E0:\n\n  <psi(theta)|H|psi(theta)> >= E0\n\nVQE minimizes the left side to approximate E0.\n\n## Hybrid Architecture\n\n1. **Quantum Processor:** Prepares the parameterized ansatz state |psi(theta)> and measures Hamiltonian expectation values.\n2. **Classical Optimizer:** Uses gradient-based or gradient-free methods (COBYLA, Adam) to update theta, minimizing the energy.\n3. This loop repeats until convergence.\n\n## Applications\n\n- Quantum chemistry (molecular ground states)\n- Materials science\n- Drug discovery'
),

(
  'superconducting-qubits',
  'Superconducting Qubits: The Silicon of Quantum Tech',
  'An introduction to qubits constructed using superconducting electronic circuits, the dominant hardware choice of tech giants.',
  'Hardware', 'QWiki Team',
  array['hardware', 'superconducting', 'transmon', 'josephson'],
  1280, 6,
  E'## Introduction\n\nSuperconducting qubits are fabricated on silicon or sapphire chips and operate at millikelvin temperatures. They are used by IBM, Google, and Rigetti — the dominant technology in quantum computing today.\n\n## The Josephson Junction\n\nA simple LC resonator has evenly-spaced energy levels, making it unsuitable as a qubit. Superconducting qubits use a **Josephson Junction** (two superconductors separated by a thin insulating barrier) as a nonlinear inductor, introducing anharmonicity that isolates the lowest two energy levels (|0> and |1>) as a qubit.\n\n## The Transmon\n\nThe **Transmon** qubit shunts the Josephson junction with a large capacitor to reduce sensitivity to charge noise, extending coherence times from nanoseconds to hundreds of microseconds.\n\n## Challenges\n\n- Requires dilution refrigerators cooling to ~15 millikelvin\n- Fabrication variations between qubits\n- Crosstalk between neighboring qubits'
),
(
  'photonic-qubits',
  'Photonic Qubits: Computing at the Speed of Light',
  'Explore linear optical quantum computing where photons serve as information carriers, offering scalability and room-temperature operation.',
  'Hardware', 'QWiki Team',
  array['hardware', 'optics', 'photons', 'silicon-photonics'],
  1050, 5,
  E'## Introduction\n\nPhotonic quantum computing uses individual photons as qubits. Optical components (beam splitters, phase shifters, mirrors) on silicon photonic chips process quantum information.\n\n## Advantages\n\n1. **Room Temperature Qubits:** Photons do not couple to thermal vibrations, eliminating the need for cryogenics at the qubit level.\n2. **Low Decoherence:** Photons rarely interact with their environment.\n3. **Native Networking:** Photons are the ideal quantum communication medium — photonic computers integrate naturally into quantum networks.\n\n## Challenges\n\nPhotons do not interact with each other, making two-qubit gates extremely difficult. Solutions include:\n- **Linear Optical Quantum Computing (LOQC):** Uses beam splitters and photon detectors with post-selection to implement probabilistic gates.\n- **Measurement-Based (MBQC):** Large entangled cluster states are prepared first; computation proceeds by measuring individual photons.'
),
(
  'trapped-ions',
  'Trapped Ion Qubits: Precision Atoms',
  'How individual charged atoms suspended in vacuum by electromagnetic fields serve as identical, highly stable qubits.',
  'Hardware', 'QWiki Team',
  array['hardware', 'trapped-ions', 'lasers', 'vacuum'],
  1190, 6,
  E'## Introduction\n\nTrapped-ion quantum computing uses individual charged atoms (ions) — typically Ytterbium (Yb+) or Calcium (Ca+) — suspended in vacuum by electromagnetic fields. Lasers manipulate their internal electronic states to encode and process quantum information.\n\n## The Paul Trap\n\nIons are confined by a **Paul Trap**, which uses oscillating radiofrequency electric fields to create a stable trapping potential in an ultra-high vacuum chamber. Ions arrange themselves in a linear chain.\n\n## Advantages\n\n1. **Identical Qubits:** Every atom of the same isotope is physically identical by nature.\n2. **High Coherence:** Coherence times of seconds to hours in specialized setups.\n3. **All-to-All Connectivity:** Any two ions in the chain can be directly coupled via shared phonon modes, enabling native all-to-all gate connectivity.\n\n## Two-Qubit Gates\n\nTwo-qubit gates are performed by applying laser forces that drive the collective vibrational motion (phonons) of the ion chain, creating entanglement between target ions.'
),

(
  'quantum-advantage',
  'Quantum Advantage: Surpassing Classical Computers',
  'The historical milestone where a quantum computer performs a calculation that is practically impossible for any classical supercomputer.',
  'Research', 'QWiki Team',
  array['research', 'supremacy', 'advantage', 'sycamore'],
  1350, 6,
  E'## Definition\n\nQuantum Advantage (historically "Quantum Supremacy") is when a programmable quantum device solves a computational problem beyond the practical reach of any classical supercomputer.\n\n## Key Milestones\n\n- **Google Sycamore (2019):** 53-qubit processor completed a random circuit sampling task in 200 seconds, estimated to take a classical supercomputer ~10,000 years.\n- **USTC Jiuzhang (2020):** Photonic quantum computer demonstrated advantage via Boson Sampling.\n- **IBM & Classical Counter-Claims:** Classical tensor-network algorithms have since reduced the estimated classical time for Sycamore''s task, showing the "advantage" target is a moving frontier.\n\n## Beyond Toy Problems\n\nEarly demonstrations used abstract tasks with no practical value. The ongoing research challenge is **practical quantum advantage** — solving industrially relevant problems in chemistry, optimization, or logistics faster than classical alternatives.'
),
(
  'nisq-era',
  'The NISQ Era: Computing in the Presence of Noise',
  'Coined by John Preskill, NISQ refers to the current generation of noisy, mid-sized quantum devices lacking error correction.',
  'Research', 'QWiki Team',
  array['research', 'nisq', 'noise', 'algorithms'],
  970, 5,
  E'## Coining the Term\n\nIn 2018, physicist John Preskill coined **NISQ** to describe today''s quantum hardware:\n- **Noisy:** Qubits are error-prone and sensitive to environmental disturbances.\n- **Intermediate-Scale:** Qubit counts range from 50 to a few thousand physical qubits.\n- **No Quantum Error Correction:** Insufficient qubit counts and error rates to support full fault-tolerant operation.\n\n## Why FTQC is Not Yet Viable\n\nFault-Tolerant Quantum Computing (FTQC) requires thousands of physical qubits per logical qubit. Current devices cannot sustain this overhead.\n\n## NISQ Algorithm Strategies\n\nAlgorithms must be short (shallow circuit depth) to avoid error accumulation:\n1. **Hybrid Algorithms (VQE, QAOA):** Short quantum circuits evaluated many times with classical optimization.\n2. **Error Mitigation:** Statistical techniques that run varied circuits and extrapolate to a zero-noise result without full error correction.'
)

on conflict (slug) do nothing;
