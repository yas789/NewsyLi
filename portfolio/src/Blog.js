import React, { useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import './Blog.css';

const Blog = ({ setPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  const blogPosts = [
    {
      id: 'prime-spiral-analysis',
      title: 'The Prime Spiral: Visualizing Number Theory',
      category: 'number-theory',
      date: '2024-01-15',
      readTime: '8 min read',
      excerpt: 'An exploration of prime number distribution through polar coordinate visualization, revealing unexpected patterns in the seemingly random sequence of primes.',
      tags: ['Prime Numbers', 'Visualization', 'Number Theory'],
      demoPage: 'prime-spiral',
      content: `
# The Prime Spiral: Visualizing Number Theory

## Introduction

The distribution of prime numbers has fascinated mathematicians for centuries. While the Prime Number Theorem tells us about their asymptotic density, visualizing primes in different coordinate systems can reveal surprising patterns and structures.

## The Spiral Construction

We map the sequence of prime numbers to polar coordinates using:

$$r_n = k\\sqrt{n}, \\quad \\theta_n = n \\cdot c$$

where $n$ is the index of the prime, $k$ is a scaling factor, and $c$ is the spiral constant.

## Mathematical Background

### Prime Counting Function
The prime counting function $\\pi(x)$ counts the number of primes less than or equal to $x$:

$$\\pi(x) \\sim \\frac{x}{\\ln x}$$

This asymptotic formula, known as the Prime Number Theorem, shows that primes become sparser as numbers grow larger.

### Gaps Between Primes
The $n$-th prime gap is defined as:

$$g_n = p_{n+1} - p_n$$

where $p_n$ is the $n$-th prime. These gaps grow on average, but irregularly, creating the visual patterns we observe.

## Observed Patterns

### Galactic Arms
The spiral reveals apparent "galactic arms" - curved rays where primes seem to cluster. This is partly due to:

1. **Modular arithmetic constraints**: Primes (except 2) are odd, eliminating half the spiral
2. **Divisibility patterns**: Numbers divisible by small primes create regular gaps
3. **Visual perception**: Our pattern recognition amplifies apparent structures

### Self-Similarity
At different zoom levels, similar structures appear, suggesting a fractal-like quality to prime distribution, though this is not rigorously fractal.

## Computational Implementation

The algorithm iterates through integers, testing primality:

\`\`\`python
def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    for i in range(3, int(sqrt(n)) + 1, 2):
        if n % i == 0: return False
    return True
\`\`\`

## Connection to Research

This visualization technique connects to several areas of current mathematical research:

- **Twin prime conjecture**: Pairs of primes differing by 2
- **Goldbach's conjecture**: Every even integer > 2 is the sum of two primes
- **Riemann hypothesis**: The distribution of prime-counting function zeros

## Conclusion

While the prime spiral doesn't reveal new mathematical truths, it provides intuitive insight into prime distribution and demonstrates how visualization can make abstract concepts accessible.
      `
    },
    {
      id: 'mandelbrot-deep-dive',
      title: 'The Mandelbrot Set: Beauty in Complex Dynamics',
      category: 'complex-analysis',
      date: '2024-01-10',
      readTime: '12 min read',
      excerpt: 'A comprehensive exploration of the Mandelbrot set, from its mathematical definition to its computational challenges and connection to chaos theory.',
      tags: ['Complex Numbers', 'Fractals', 'Chaos Theory'],
      demoPage: 'fractal-explorer',
      content: `
# The Mandelbrot Set: Beauty in Complex Dynamics

## Definition and Mathematical Foundation

The Mandelbrot set $M$ is defined as the set of complex numbers $c$ for which the sequence:

$$z_0 = 0, \\quad z_{n+1} = z_n^2 + c$$

remains bounded as $n \\to \\infty$.

## The Escape Time Algorithm

To visualize the set, we use the escape time algorithm:

1. For each point $c$ in the complex plane
2. Iterate $z_{n+1} = z_n^2 + c$ starting with $z_0 = 0$
3. Stop when $|z_n| > 2$ (proven escape radius) or max iterations reached
4. Color based on escape time

### Why Radius 2?

If $|z_n| > 2$ for some $n$, then:
$$|z_{n+1}| = |z_n^2 + c| \\geq |z_n|^2 - |c| > 4 - |c|$$

Since we're testing points with $|c| \\leq 2$, we get $|z_{n+1}| > 2$, ensuring divergence.

## Key Properties

### Connectedness
**Theorem** (Douady-Hubbard): The Mandelbrot set is connected.

This remarkable result means there's a path within the set between any two points.

### Self-Similarity
The set contains infinitely many smaller copies of itself, visible at various scales and orientations.

### Fractal Dimension
The boundary has Hausdorff dimension 2, making it a fractal curve that fills space.

## Connection to Julia Sets

For each complex parameter $c$, the Julia set $J_c$ is defined by iterating $z_{n+1} = z_n^2 + c$ with varying initial conditions $z_0$.

**Key relationship**: $c \\in M$ if and only if the Julia set $J_c$ is connected.

## Computational Challenges

### Precision Requirements
Deep zooms require arbitrary precision arithmetic. At zoom level $10^{14}$, standard floating-point arithmetic fails.

### Optimization Techniques

1. **Symmetry**: The set is symmetric about the real axis
2. **Cardioid detection**: The main body can be detected analytically
3. **Periodicity checking**: Detect cycles to avoid infinite iteration
4. **Perturbation theory**: For deep zooms, compute relative to a reference point

## Advanced Topics

### Renormalization Theory
The Mandelbrot set exhibits universal behavior under renormalization, connecting to chaos theory and dynamical systems.

### Polynomial Dynamics
The quadratic family $f_c(z) = z^2 + c$ is the simplest case of polynomial dynamics, making it a fundamental object of study.

## Applications

### Computer Graphics
Real-time fractal rendering drives GPU computing advances and parallel algorithm development.

### Dynamical Systems
The Mandelbrot set provides a concrete example of complex dynamical behavior, chaos, and strange attractors.

### Number Theory
Connections exist to analytic number theory through L-functions and the Riemann hypothesis.

## Open Questions

1. **MLC Conjecture**: Is the Mandelbrot set locally connected?
2. **Hyperbolicity**: Are non-hyperbolic parameters dense?
3. **Computational complexity**: What's the exact complexity of membership testing?

## Conclusion

The Mandelbrot set bridges pure mathematics and computational science, continuing to inspire research in complex dynamics, computer graphics, and mathematical visualization.
      `
    },
    {
      id: 'fourier-epicycles',
      title: 'Fourier Epicycles: From Circles to Complex Waveforms',
      category: 'analysis',
      date: '2024-01-05',
      readTime: '10 min read',
      excerpt: 'Understanding how rotating circles can approximate any periodic function through Fourier series, with geometric intuition and mathematical rigor.',
      tags: ['Fourier Analysis', 'Signal Processing', 'Approximation Theory'],
      demoPage: 'fourier-epicycles',
      content: `
# Fourier Epicycles: From Circles to Complex Waveforms

## The Geometric Intuition

Fourier series decompose periodic functions into sums of sines and cosines. Epicycles provide geometric intuition: each term becomes a rotating circle.

## Mathematical Foundation

### Complex Exponential Form
A Fourier series can be written as:

$$f(t) = \\sum_{n=-\\infty}^{\\infty} c_n e^{int}$$

where the Fourier coefficients are:

$$c_n = \\frac{1}{2\\pi} \\int_0^{2\\pi} f(t) e^{-int} dt$$

### Geometric Interpretation
Each term $c_n e^{int}$ represents:
- A circle of radius $|c_n|$
- Rotating at frequency $n$
- With initial phase $\\arg(c_n)$

## The Epicycle Construction

Starting from the origin, we attach circles end-to-end:

1. **Center circle**: Radius $|c_0|$ (DC component)
2. **First epicycle**: Radius $|c_1|$, frequency 1
3. **Second epicycle**: Radius $|c_2|$, frequency 2
4. Continue for higher harmonics...

The tip of the final circle traces out the approximation to $f(t)$.

## Square Wave Example

For a square wave with period $2\\pi$:

$$f(t) = \\begin{cases} 
1 & \\text{if } 0 < t < \\pi \\\\
-1 & \\text{if } \\pi < t < 2\\pi
\\end{cases}$$

The Fourier series is:

$$f(t) = \\frac{4}{\\pi} \\sum_{n=1,3,5,...} \\frac{\\sin(nt)}{n}$$

Only odd harmonics appear, creating the characteristic stepped approximation.

## Convergence Properties

### Dirichlet Conditions
A function has a convergent Fourier series if:
1. It's bounded
2. Has finitely many discontinuities
3. Has finitely many maxima and minima

### Gibbs Phenomenon
Near discontinuities, the Fourier series overshoots by approximately 9%, regardless of the number of terms.

## Applications

### Signal Processing
Digital filters decompose signals into frequency components using discrete Fourier transforms (FFT).

### Image Compression
JPEG compression uses 2D discrete cosine transforms, a variant of Fourier analysis.

### Differential Equations
Fourier methods solve PDEs by transforming to frequency domain, solving algebraically, then transforming back.

## Computational Implementation

The epicycle visualization computes:

\`\`\`python
def fourier_coefficients(f, N):
    coefficients = []
    for n in range(-N, N+1):
        # Numerical integration for c_n
        integral = integrate(lambda t: f(t) * exp(-1j * n * t), 0, 2*pi)
        coefficients.append(integral / (2 * pi))
    return coefficients

def epicycle_position(coefficients, t):
    position = 0
    for n, c_n in enumerate(coefficients):
        position += c_n * exp(1j * (n - N) * t)
    return position
\`\`\`

## Advanced Topics

### Fourier Transform
For non-periodic functions, the Fourier transform extends the concept:

$$\\hat{f}(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i\\omega t} dt$$

### Discrete Fourier Transform
For digital signals, the DFT provides finite approximations:

$$X_k = \\sum_{n=0}^{N-1} x_n e^{-2\\pi i kn/N}$$

### Fast Fourier Transform
The FFT algorithm computes DFTs in $O(N \\log N)$ time instead of $O(N^2)$, revolutionizing digital signal processing.

## Physical Interpretation

Epicycles model:
- **Planetary motion**: Historical astronomical models
- **Wave interference**: Superposition of circular waves
- **Quantum mechanics**: Wave function decomposition
- **Crystallography**: X-ray diffraction patterns

## Conclusion

Fourier epicycles bridge geometric intuition and analytical rigor, demonstrating how mathematical abstraction connects to physical reality through elegant visualization.
      `
    },
    {
      id: 'modular-arithmetic',
      title: 'Modular Arithmetic Visualization: Patterns in Remainders',
      category: 'number-theory',
      date: '2023-12-28',
      readTime: '6 min read',
      excerpt: 'Exploring modular arithmetic through matrix visualization, revealing hidden structures in remainder patterns and their applications to cryptography.',
      tags: ['Modular Arithmetic', 'Matrices', 'Cryptography'],
      demoPage: 'modulo-matrix',
      content: `
# Modular Arithmetic Visualization: Patterns in Remainders

## Introduction to Modular Arithmetic

Modular arithmetic, sometimes called "clock arithmetic," deals with remainders after division. For integers $a$ and $n > 0$:

$$a \\equiv b \\pmod{n} \\iff n | (a - b)$$

## The Remainder Matrix

We visualize modular arithmetic by creating a matrix where entry $(m,n)$ contains $n \\bmod m$:

$$R_{m,n} = n \\bmod m$$

This reveals patterns in remainder structures and divisibility relationships.

## Key Observations

### Diagonal Patterns
- **Main diagonal**: Always 0 (every number divides itself)
- **Super-diagonals**: Create regular patterns based on modular classes

### Color Coding
Different remainders receive distinct colors, revealing:
- **Zero patterns**: Highlight divisibility
- **Periodic structures**: Modular arithmetic's cyclical nature
- **Prime relationships**: Gaps and patterns in prime moduli

## Mathematical Properties

### Modular Arithmetic Rules
For any integers $a, b$ and modulus $m$:

$$\\begin{align}
(a + b) \\bmod m &= ((a \\bmod m) + (b \\bmod m)) \\bmod m \\\\
(a \\cdot b) \\bmod m &= ((a \\bmod m) \\cdot (b \\bmod m)) \\bmod m
\\end{align}$$

### Chinese Remainder Theorem
If $\\gcd(m_1, m_2) = 1$, then the system:
$$\\begin{align}
x &\\equiv a_1 \\pmod{m_1} \\\\
x &\\equiv a_2 \\pmod{m_2}
\\end{align}$$

has a unique solution modulo $m_1 m_2$.

## Applications

### Cryptography
RSA encryption relies on modular exponentiation:
$$c \\equiv m^e \\pmod{n}$$

The security depends on the difficulty of factoring large moduli.

### Hash Functions
Modular arithmetic creates uniform distributions for hash tables:
$$h(k) = k \\bmod m$$

### Random Number Generation
Linear congruential generators use:
$$X_{n+1} = (aX_n + c) \\bmod m$$

## Computational Considerations

### Efficient Algorithms
- **Fast modular exponentiation**: $O(\\log n)$ using binary expansion
- **Extended Euclidean algorithm**: Finds modular inverses
- **Montgomery reduction**: Optimizes repeated modular multiplication

### Implementation Notes
\`\`\`python
def mod_matrix(m_max, n_max):
    matrix = []
    for m in range(2, m_max + 1):
        row = []
        for n in range(2, n_max + 1):
            remainder = n % m
            row.append(remainder)
        matrix.append(row)
    return matrix
\`\`\`

## Pattern Recognition

### Periodicity
Row $m$ has period $m$: the pattern repeats every $m$ columns.

### Symmetries
Certain moduli exhibit symmetrical patterns, especially powers of 2.

### Prime Moduli
Prime moduli create the most "random-looking" patterns, important for cryptographic applications.

## Advanced Topics

### Quadratic Residues
For prime $p$, the Legendre symbol determines if $a$ is a quadratic residue:
$$\\left(\\frac{a}{p}\\right) = a^{(p-1)/2} \\pmod{p}$$

### Modular Forms
Higher-level mathematics studies functions with modular transformation properties, connecting to number theory and algebraic geometry.

## Conclusion

Modular arithmetic visualization reveals the deep structure underlying remainder patterns, connecting elementary number theory to advanced applications in cryptography and computer science.
      `
    },
    {
      id: 'd4-symmetries',
      title: 'D4 Symmetries: Group Theory in Action',
      category: 'algebra',
      date: '2023-12-20',
      readTime: '9 min read',
      excerpt: 'Interactive exploration of the dihedral group D4, demonstrating how abstract algebra manifests in geometric transformations of a square.',
      tags: ['Group Theory', 'Symmetry', 'Abstract Algebra'],
      demoPage: 'd4-symmetries',
      content: `
# D4 Symmetries: Group Theory in Action

## Introduction to Dihedral Groups

The dihedral group $D_4$ consists of symmetries of a square: 4 rotations and 4 reflections, forming an 8-element group.

## Group Elements

### Rotations
- $r^0 = e$ (identity): $0°$ rotation
- $r^1$: $90°$ counterclockwise rotation  
- $r^2$: $180°$ rotation
- $r^3$: $270°$ counterclockwise rotation

### Reflections
- $s_v$: vertical reflection (left-right flip)
- $s_h$: horizontal reflection (top-bottom flip)
- $s_d$: diagonal reflection (main diagonal)
- $s_{d'}$: anti-diagonal reflection

## Group Structure

### Presentation
$D_4$ has the presentation:
$$D_4 = \\langle r, s \\mid r^4 = s^2 = (rs)^2 = e \\rangle$$

where $r$ is rotation by $90°$ and $s$ is any reflection.

### Multiplication Table
The group operation is composition of transformations:

| ∘ | e | r | r² | r³ | s_v | s_h | s_d | s_d' |
|---|---|---|----|----|-----|-----|-----|------|
| e | e | r | r² | r³ | s_v | s_h | s_d | s_d' |
| r | r | r²| r³ | e  | s_d'| s_d | s_h | s_v  |
| ⋮ | ⋮ | ⋮ | ⋮  | ⋮  | ⋮   | ⋮   | ⋮   | ⋮    |

## Mathematical Properties

### Subgroups
$D_4$ contains several notable subgroups:
- $\\{e\\}$: trivial subgroup
- $\\{e, r^2\\}$: rotations by multiples of $180°$
- $\\{e, r, r^2, r^3\\}$: all rotations (cyclic group $C_4$)
- $\\{e, s_v\\}$, $\\{e, s_h\\}$, etc.: reflection groups

### Normal Subgroups
The rotation subgroup $\\{e, r, r^2, r^3\\}$ is normal in $D_4$:
$$D_4 / C_4 \\cong \\mathbb{Z}_2$$

### Conjugacy Classes
Elements are conjugate if they're the same "type" of transformation:
- $\\{e\\}$: identity
- $\\{r^2\\}$: $180°$ rotation  
- $\\{r, r^3\\}$: $90°$ and $270°$ rotations
- $\\{s_v, s_h\\}$: axis-aligned reflections
- $\\{s_d, s_{d'}\\}$: diagonal reflections

## Geometric Interpretation

### Matrix Representations
Each symmetry corresponds to a $2 \\times 2$ orthogonal matrix:

$$r = \\begin{pmatrix} \\cos(90°) & -\\sin(90°) \\\\ \\sin(90°) & \\cos(90°) \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$$

$$s_v = \\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$$

### Fixed Points
- **Rotations**: Center of square is fixed
- **Reflections**: Points on reflection axis are fixed

## Applications

### Crystallography
$D_4$ describes the symmetries of square crystal lattices, important in materials science.

### Computer Graphics
Texture mapping and procedural generation use symmetry groups for pattern creation.

### Physics
Symmetry groups govern conservation laws through Noether's theorem.

## Group Actions

$D_4$ acts on various sets:

### Action on Vertices
Permutes the four corners of the square, giving a homomorphism:
$$D_4 \\to S_4$$

### Action on Edges
Permutes the four edges, providing another representation.

### Orbit-Stabilizer Theorem
For any vertex $v$:
$$|D_4| = |\\text{Orbit}(v)| \\cdot |\\text{Stabilizer}(v)|$$
$$8 = 4 \\cdot 2$$

## Advanced Topics

### Character Theory
The irreducible representations of $D_4$ over $\\mathbb{C}$ are:
- 4 one-dimensional representations
- 1 two-dimensional representation

### Galois Theory Connection
$D_4$ appears as the Galois group of certain quartic polynomials, connecting group theory to field theory.

### Higher Dimensional Analogs
$D_4$ generalizes to:
- $D_n$: symmetries of regular $n$-gons
- Hyperoctahedral groups: symmetries of hypercubes

## Computational Implementation

The interactive demo implements group operations:

\`\`\`python
class D4Element:
    def __init__(self, rotation, reflection):
        self.rotation = rotation % 4  # 0, 1, 2, 3
        self.reflection = reflection   # True/False
    
    def compose(self, other):
        if self.reflection:
            new_rotation = (self.rotation - other.rotation) % 4
        else:
            new_rotation = (self.rotation + other.rotation) % 4
        new_reflection = self.reflection ^ other.reflection
        return D4Element(new_rotation, new_reflection)
\`\`\`

## Conclusion

The dihedral group $D_4$ demonstrates how abstract algebraic concepts manifest in concrete geometric transformations, bridging pure mathematics with practical applications in science and engineering.
      `
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'number-theory', name: 'Number Theory', count: blogPosts.filter(p => p.category === 'number-theory').length },
    { id: 'complex-analysis', name: 'Complex Analysis', count: blogPosts.filter(p => p.category === 'complex-analysis').length },
    { id: 'analysis', name: 'Analysis', count: blogPosts.filter(p => p.category === 'analysis').length },
    { id: 'algebra', name: 'Algebra', count: blogPosts.filter(p => p.category === 'algebra').length }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
  };

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    return (
      <MathJaxContext config={config}>
        <div className="blog-container">
          <div className="blog-post-view">
            <button 
              className="back-button"
              onClick={() => setSelectedPost(null)}
            >
              ← Back to Blog
            </button>
            
            <article className="blog-post-content">
              <header className="post-header">
                <div className="post-meta">
                  <span className="post-category">{post.category}</span>
                  <span className="post-date">{post.date}</span>
                  <span className="post-read-time">{post.readTime}</span>
                </div>
                <h1 className="post-title">{post.title}</h1>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="post-tag">{tag}</span>
                  ))}
                </div>
                {post.demoPage && (
                  <button 
                    className="demo-link-button"
                    onClick={() => setPage(post.demoPage)}
                  >
                    🎮 Try Interactive Demo
                  </button>
                )}
              </header>
              
              <div className="post-content">
                <MathJax>
                  <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
                </MathJax>
              </div>
            </article>
          </div>
        </div>
      </MathJaxContext>
    );
  }

  return (
    <MathJaxContext config={config}>
      <div className="blog-container">
        <div className="blog-header">
          <h2 className="blog-title">Mathematical Explorations</h2>
          <p className="blog-subtitle">
            Deep dives into the mathematical concepts behind the interactive demonstrations
          </p>
        </div>

        <div className="blog-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className="blog-posts">
          {filteredPosts.map(post => (
            <article key={post.id} className="blog-post-card">
              <div className="post-card-header">
                <div className="post-card-meta">
                  <span className="post-card-category">{post.category}</span>
                  <span className="post-card-date">{post.date}</span>
                </div>
                <h3 className="post-card-title">{post.title}</h3>
                <p className="post-card-excerpt">{post.excerpt}</p>
              </div>
              
              <div className="post-card-footer">
                <div className="post-card-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="post-card-tag">{tag}</span>
                  ))}
                </div>
                <div className="post-card-actions">
                  <span className="post-card-read-time">{post.readTime}</span>
                  {post.demoPage && (
                    <button 
                      className="demo-button"
                      onClick={() => setPage(post.demoPage)}
                      title="Try interactive demo"
                    >
                      🎮
                    </button>
                  )}
                  <button 
                    className="read-more-button"
                    onClick={() => setSelectedPost(post.id)}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MathJaxContext>
  );
};

export default Blog;