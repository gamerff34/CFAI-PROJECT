# Algorithm & Data Structure Performance Analyzer

### Byline
Mini Project demonstrating practical runtime differences between algorithms and data structures.

---

## Overview
This application allows users to compare sorting, searching, and membership operations while visualizing execution time and theoretical complexities. The tool acts as an interactive playground to help students and developers understand how theoretical big-O complexities manifest in practical wall-clock time.

---

## Tech Stack
* **Frontend**: HTML5, CSS3 (Vanilla Glassmorphism), JavaScript (ES6+), Chart.js (v4.x)
* **Backend**: Python 3, Flask, Gunicorn (production server)

---

## Project Progress Checklist
- [x] Initial Project Setup
- [x] Backend Sorting Algorithms
- [x] Backend Searching Algorithms
- [x] Backend Membership Benchmark
- [x] Core Flask API Endpoints
- [x] Glassmorphism Responsive UI
- [x] Client-side Form Handling & Validation
- [x] Chart.js Visualizations
- [x] Automated Tests Suite
- [ ] Final Deployment & Benchmarking

---

## Future Work
* **Heap Sort**: Add heap sort implementation and compare with Merge/Quick sort.
* **Graph Algorithms**: Visualizing BFS, DFS, and topological sort.
* **AVL Tree Visualization**: Interactive AVL tree insertion, deletion, and rotation.
* **Dijkstra Algorithm**: Shortest path visualizer on custom grids or nodes.
* **Performance Benchmark Dashboard**: Persistent stats tracking and download report feature.

---

## Team
* **ANSHUL**
* **RAJVEER**

---

## GitHub Commit Strategy
To foster clean development and modular pull requests, the project will be developed using small incremental changes. Below is a suggested road-map of **105 commits** spread over a 10-day period.

### Day 1: Project Setup & Core Environment (Commits 1-10)
1. `chore: initialize project directory structure`
2. `chore: add project requirements.txt for dependencies`
3. `docs: create initial README.md layout and details`
4. `chore: add .gitignore file for Python and local environments`
5. `setup: create standard folder layout templates/ and static/`
6. `setup: create algorithms/ package initialization`
7. `test: initialize unittest suite framework in test_algorithms.py`
8. `chore: add configuration files for local dev server settings`
9. `docs: update documentation regarding team responsibilities`
10. `setup: verify dev environment packages run correctly`

### Day 2: Sorting Module Development - Part 1 (Commits 11-20)
11. `feat(sort): implement helper logic to parse number arrays`
12. `feat(sort): implement standard Bubble Sort algorithm`
13. `test(sort): add unit tests for Bubble Sort correctness`
14. `feat(sort): implement standard Merge Sort algorithm`
15. `test(sort): add unit tests for Merge Sort correctness`
16. `feat(sort): implement Quick Sort algorithm with middle pivot`
17. `test(sort): add unit tests for Quick Sort correctness`
18. `test(sort): add edge cases (empty list, single element) to sort tests`
19. `refactor(sort): optimize Bubble Sort with swap flag`
20. `test(sort): add sorting test cases for negative and decimal numbers`

### Day 3: Sorting Module Development - Part 2 (Commits 21-30)
21. `feat(sort): create run_sorting_comparison execution wrapper`
22. `feat(sort): integrate time.perf_counter() for sorting runtime measurements`
23. `feat(sort): add theoretical complexity mapping for sorting algorithms`
24. `feat(sort): implement fastest-algorithm identifier logic`
25. `test(sort): add performance wrapper unit tests`
26. `refactor(sort): clean up sorting docstrings and comments`
27. `test(sort): add tests with large size sorting array`
28. `refactor(sort): improve Quick Sort pivot handling for sorted lists`
29. `perf(sort): reduce memory footprint of Merge Sort slice copies`
30. `test(sort): check all sorting tests pass successfully`

### Day 4: Searching Module Development (Commits 31-45)
31. `feat(search): implement standard Linear Search algorithm`
32. `test(search): add unit tests for Linear Search correctness`
33. `feat(search): implement standard Binary Search algorithm`
34. `test(search): add unit tests for Binary Search correctness`
35. `test(search): add searching edge cases (target at boundary, target missing)`
36. `feat(search): create search performance comparison wrapper`
37. `feat(search): integrate time.perf_counter() for search runtime measurements`
38. `feat(search): add sorting precondition execution for Binary Search`
39. `feat(search): exclude sorting overhead time from Binary Search benchmark`
40. `test(search): verify searching comparison wrapper returns correct index`
41. `refactor(search): optimize Binary Search using iterative loop`
42. `refactor(search): clean up searching module code structure`
43. `test(search): add tests for search on float array values`
44. `perf(search): ensure Linear Search terminates immediately on target find`
45. `test(search): ensure all search unit tests run successfully`

### Day 5: Membership Module Development (Commits 46-55)
46. `feat(membership): implement list membership lookup logic`
47. `feat(membership): implement set membership lookup logic`
48. `feat(membership): create run_membership_comparison wrapper`
49. `feat(membership): implement loop iterations for stable performance checks`
50. `test(membership): add unit tests for membership runtimes`
51. `feat(membership): add winner evaluation logic`
52. `refactor(membership): handle non-existent targets in membership benchmarks`
53. `test(membership): run membership benchmarks with large duplicate sizes`
54. `refactor(membership): document set vs list theoretical complexity difference`
55. `test(membership): verify membership test coverage passes`

### Day 6: Flask API Endpoints (Commits 56-65)
56. `feat(backend): initialize main Flask application in app.py`
57. `feat(backend): configure template and static directory routes`
58. `feat(backend): implement base index.html page routing`
59. `feat(backend): create POST endpoint /api/sort for sorting comparisons`
60. `feat(backend): add input validation and error handling for /api/sort`
61. `feat(backend): create POST endpoint /api/search for searching benchmarks`
62. `feat(backend): add input validation and error handling for /api/search`
63. `feat(backend): create POST endpoint /api/membership for membership checks`
64. `feat(backend): add input validation and error handling for /api/membership`
65. `refactor(backend): add global exception handlers for API routes`

### Day 7: HTML Front-End Structure (Commits 66-75)
66. `feat(frontend): create base layout index.html`
67. `feat(frontend): import Google Fonts (Outfit, JetBrains Mono)`
68. `feat(frontend): implement responsive header and navbar design`
69. `feat(frontend): add logo elements and interactive nav-links`
70. `feat(frontend): add main container and hero banner`
71. `feat(frontend): construct Sorting module markup with form inputs`
72. `feat(frontend): construct Searching module markup with target fields`
73. `feat(frontend): construct Membership module markup with iterations slider`
74. `feat(frontend): build footer component with copyright and credits`
75. `docs(frontend): add descriptive structural comments to index.html`

### Day 8: CSS Styling & Glassmorphic Design (Commits 76-88)
76. `style: initialize style.css reset and modern variables`
77. `style: create glowing background orbs with blur filters`
78. `style: implement glassmorphic card styles (.glass-card)`
79. `style: design responsive grid layout for inputs and results`
80. `style: style custom scrollbars for dark mode`
81. `style: customize textarea and input fields with focus glow`
82. `style: implement premium gradient buttons and hover effects`
83. `style: style results placeholders and loading state views`
84. `style: design table styling for complexity metrics`
85. `style: add CSS media queries for tablet and mobile views`
86. `style: create winner badge styles and highlight rows`
87. `style: add custom utility classes for text sizes`
88. `style: polish typography spacing and layout margins`

### Day 9: Frontend JavaScript & Charts (Commits 89-98)
89. `feat(javascript): implement tab-pane toggling and active links`
90. `feat(javascript): write random number generator helper logic`
91. `feat(javascript): bind click events for data generation`
92. `feat(javascript): implement fetch-API handler for Sorting benchmarks`
93. `feat(javascript): implement Chart.js initialization for Sorting`
94. `feat(javascript): implement fetch-API handler for Searching benchmarks`
95. `feat(javascript): implement Chart.js initialization for Searching`
96. `feat(javascript): implement fetch-API handler for Membership benchmarks`
97. `feat(javascript): implement Chart.js initialization for Membership`
98. `style(javascript): integrate loading spinner on benchmarking actions`

### Day 10: Validation, Optimization & Release (Commits 99-105)
99. `refactor(javascript): ensure old Chart.js instances are destroyed properly`
100. `style: refine chart margins and color matching`
101. `docs: write helpful instructions in results cards`
102. `fix: correct index.html formatting errors`
103. `refactor: optimize random generator size options`
104. `test: execute comprehensive test suite verification`
105. `release: finalized version 1.0.0 of performance analyzer`
