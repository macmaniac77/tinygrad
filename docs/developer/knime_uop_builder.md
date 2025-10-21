# TinyUOp Builder for KNIME

This document captures the high-level specification for a KNIME extension that exposes tinygrad's UOp primitives as composable workflow nodes. The goal is to provide a visual, testable environment for composing differentiable programs, reproducing research architectures, and integrating LLM-driven automation.

## Goals
- Deliver a production-ready KNIME extension named **TinyUOp Builder** that mirrors tinygrad's transparency while offering a visual workflow editor.
- Support the full model lifecycle (build, train, infer, track, and evaluate) with reusable node templates.
- Integrate external LLM tooling to scaffold new nodes, interpret research papers, and iteratively refine workflows.
- Ensure every node and composite workflow remains unit-testable outside KNIME using pytest-compatible harnesses.

## Core Features
### Build and Modify
- Provide a searchable palette of atomic nodes (e.g., `UOp Add`, `UOp Conv2D`) and higher-level composites (e.g., `Conv Block`, `Transformer Encoder`).
- Allow parameter editing through KNIME configuration dialogs with validation hooks.
- Enable hierarchical modeling using KNIME Components so users can group and reuse subgraphs (e.g., an "RT-DETR Backbone" component).

### Inference and Training
- Implement dedicated "Run Inference" and "Train Model" nodes that compile connected UOp graphs and execute them via tinygrad.
- Surface training hyperparameters (epochs, batch size, optimizer, scheduler) with sensible defaults and provenance tracking.
- Provide optional quantization/export steps (e.g., ONNX) for downstream deployment workflows.

### Tracking and Evaluation
- Integrate real-time dashboards for loss/metric curves using Matplotlib or KNIME native views.
- Offer evaluation nodes for cross-validation, confusion matrices, ROC curves, and detection metrics such as mAP.
- Persist experiment metadata for reproducibility and comparison.

### Paper Recreation and Automation
- Include an "Import Paper" node that leverages Paper2Code-style agents to translate PDFs/URLs into draft UOp graphs.
- Provide a "Generate Block" interaction that prompts an LLM to scaffold a new node (code + tests), re-running on errors via captured tracebacks.
- Add an "Optimize Architecture" node that runs DSPy-like loops to propose architecture tweaks, subject to human approval gates.

## Architecture Overview
- **Node Implementations**: Build with KNIME's pure-Python node API, wrapping tinygrad UOps for execution. Each node exposes clear input/output port schemas and optional control ports for events (e.g., training start/stop).
- **Execution Engine**: Convert KNIME tables/images into tinygrad buffers, execute the UOp graph, and return results as KNIME data structures.
- **LLM Integration Layer**: Central service that receives prompts, invokes external APIs (Claude, GPT-4o, etc.), and returns candidate code patches alongside quick validation results.
- **Testing Harness**: Pytest modules that simulate node execution using KNIME's testing utilities to ensure portability and maintainability.

## Development Workflow
1. **Specification**: Translate feature requests or research papers into structured prompts for the LLM scaffolding service.
2. **Generation**: Use LLMs to draft node implementations, accompanying unit tests, and documentation snippets.
3. **Execution**: Run pytest and KNIME workflow tests locally or in CI, capturing logs for trace-driven refinement.
4. **Iteration**: Feed failures back into the LLM prompts until tests pass, then review and merge.
5. **Validation**: Benchmark critical workflows (e.g., RT-DETR on COCO) to confirm parity with published results.

## Roadmap Highlights
- **MVP (Weeks 1-2)**: Implement core atomic UOp nodes, inference, and training nodes. Validate with simple CNN workflows.
- **Paper Reproduction (Weeks 3-4)**: Build composite nodes for RT-DETR, integrate dataset readers, and verify mAP benchmarks.
- **Automation (Weeks 5-6)**: Add paper import, LLM scaffolding loops, and self-improving architecture proposals with human-in-the-loop approvals.

## Open Questions
- How should we package and distribute the KNIME extension for both desktop and server deployments?
- Which subset of tinygrad optimizations (e.g., graph rewrites) should be exposed as configurable options within KNIME nodes?
- What safeguards are necessary when executing LLM-generated code inside KNIME workflows?

## Next Steps
- Prototype a **UOp JIT** node that wraps tinygrad's graph rewriting pipeline and exposes compile-time diagnostics inside KNIME.
- Draft pytest-based fixtures to simulate KNIME execution contexts for standalone CI runs.
- Exercise the **TinyUOp Builder GUI** (served from `python tinygrad/viz/serve.py` → `http://localhost:8000/builder` by default) to sketch RT-DETR style graphs, then iterate on the node palette to match real UOp coverage.
- Coordinate with the documentation team to produce tutorials and screen recordings once the MVP nodes stabilize.
