const NODE_LIBRARY = [
  {
    name: "Tensor Ops",
    items: [
      { type: "UOpConst", label: "Constant", inputs: [], outputs: ["value"], params: [{ key: "value", type: "number", default: 1 }], description: "Create a scalar tensor" },
      { type: "UOpPlaceholder", label: "Placeholder", inputs: [], outputs: ["out"], params: [{ key: "shape", type: "text", default: "1,3,224,224" }], description: "Input tensor placeholder" },
      { type: "UOpAdd", label: "Add", inputs: ["a", "b"], outputs: ["out"], params: [], description: "Elementwise addition" },
      { type: "UOpMul", label: "Multiply", inputs: ["a", "b"], outputs: ["out"], params: [], description: "Elementwise multiplication" },
      { type: "UOpMatMul", label: "MatMul", inputs: ["left", "right"], outputs: ["out"], params: [], description: "Matrix multiplication" },
      { type: "UOpConv2d", label: "Conv2D", inputs: ["x", "weight", "bias"], outputs: ["out"], params: [
        { key: "kernel", type: "text", default: "3x3" },
        { key: "stride", type: "text", default: "1" },
        { key: "padding", type: "text", default: "same" }
      ], description: "2D convolution" },
      { type: "UOpRelu", label: "ReLU", inputs: ["x"], outputs: ["out"], params: [], description: "ReLU activation" },
      { type: "UOpLayerNorm", label: "LayerNorm", inputs: ["x"], outputs: ["out"], params: [{ key: "eps", type: "number", default: 1e-5 }], description: "Layer normalization" }
    ],
  },
  {
    name: "Graph Control",
    items: [
      { type: "UOpConcat", label: "Concat", inputs: ["a", "b"], outputs: ["out"], params: [{ key: "axis", type: "number", default: 1 }], description: "Concatenate tensors" },
      { type: "UOpSplit", label: "Split", inputs: ["x"], outputs: ["out1", "out2"], params: [{ key: "axis", type: "number", default: 1 }], description: "Split tensor" },
      { type: "UOpGraph", label: "Graph", inputs: ["inputs"], outputs: ["outputs"], params: [{ key: "subgraph", type: "text", default: "" }], description: "Wrap a nested graph" },
      { type: "UOpGrad", label: "Grad", inputs: ["fn", "inputs"], outputs: ["grad"], params: [{ key: "mode", type: "select", default: "reverse", options: ["reverse", "forward"] }], description: "Gradient transform" },
      { type: "UOpJit", label: "JIT", inputs: ["fn"], outputs: ["compiled"], params: [{ key: "optimizations", type: "text", default: "fuse, simplify" }], description: "Graph rewrite/compile" },
      { type: "UOpVmap", label: "Vmap", inputs: ["fn", "axis"], outputs: ["batched"], params: [{ key: "axis", type: "number", default: 0 }], description: "Vectorize over axis" },
      { type: "UOpPmap", label: "Pmap", inputs: ["fn", "devices"], outputs: ["distributed"], params: [{ key: "devices", type: "text", default: "cpu:0,cpu:1" }], description: "Parallel map" }
    ],
  },
  {
    name: "Model Blocks",
    items: [
      { type: "ConvBlock", label: "Conv Block", inputs: ["x"], outputs: ["out"], params: [{ key: "filters", type: "number", default: 64 }, { key: "kernel", type: "text", default: "3x3" }], description: "Conv → BN → ReLU" },
      { type: "CSPBlock", label: "CSP Block", inputs: ["x"], outputs: ["out"], params: [{ key: "stages", type: "number", default: 3 }], description: "Cross Stage Partial block" },
      { type: "TransformerEncoder", label: "Transformer Encoder", inputs: ["x"], outputs: ["out"], params: [{ key: "heads", type: "number", default: 8 }, { key: "depth", type: "number", default: 6 }], description: "Multi-head attention stack" },
      { type: "DetectionHead", label: "Detection Head", inputs: ["features"], outputs: ["boxes", "scores"], params: [{ key: "classes", type: "number", default: 80 }], description: "Prediction heads" },
      { type: "Loss", label: "Loss", inputs: ["pred", "target"], outputs: ["value"], params: [{ key: "type", type: "select", default: "focal", options: ["focal", "l1", "giou"] }], description: "Loss computation" },
      { type: "Optimizer", label: "Optimizer", inputs: ["params", "grad"], outputs: ["updated"], params: [{ key: "kind", type: "select", default: "adamw", options: ["adamw", "sgd", "lion"] }, { key: "lr", type: "number", default: 1e-4 }], description: "Optimizer step" },
      { type: "DataLoader", label: "Data Loader", inputs: [], outputs: ["batch"], params: [{ key: "source", type: "text", default: "coco/train" }, { key: "batch_size", type: "number", default: 4 }], description: "Dataset reader" }
    ],
  }
];

const TEMPLATE_LIBRARY = {
  rtdetr: {
    name: "RT-DETR (Roboflow)",
    description: "Transformer-based detector blueprint for Roboflow's RT-DETR.",
    template: {
      nodes: [
        { type: "DataLoader", position: { x: 120, y: 80 }, overrides: { label: "COCO Loader" } },
        { type: "ConvBlock", position: { x: 360, y: 40 }, overrides: { label: "Stem Conv" } },
        { type: "CSPBlock", position: { x: 600, y: 40 }, overrides: { label: "Stage 1" } },
        { type: "CSPBlock", position: { x: 840, y: 40 }, overrides: { label: "Stage 2", params: { stages: 4 } } },
        { type: "TransformerEncoder", position: { x: 1080, y: 60 }, overrides: { label: "Encoder" } },
        { type: "DetectionHead", position: { x: 1320, y: 40 }, overrides: { label: "RT-DETR Head", params: { classes: 80 } } },
        { type: "Loss", position: { x: 1560, y: 20 }, overrides: { label: "Detection Loss" } },
        { type: "Optimizer", position: { x: 1800, y: 40 }, overrides: { label: "AdamW" } }
      ],
      edges: [
        [0, "batch", 1, "x"],
        [1, "out", 2, "x"],
        [2, "out", 3, "x"],
        [3, "out", 4, "x"],
        [4, "out", 5, "features"],
        [5, "boxes", 6, "pred"],
        [5, "scores", 6, "pred"],
        [6, "value", 7, "grad"],
        [3, "out", 7, "params"]
      ],
    },
  },
  yolov8: {
    name: "YOLOv8", 
    description: "One-shot detector inspired by examples/yolov8.py.",
    template: {
      nodes: [
        { type: "DataLoader", position: { x: 120, y: 200 }, overrides: { label: "YOLO Loader", params: { source: "coco/train" } } },
        { type: "ConvBlock", position: { x: 360, y: 160 }, overrides: { label: "Backbone Stem", params: { filters: 48, kernel: "3x3" } } },
        { type: "CSPBlock", position: { x: 600, y: 160 }, overrides: { label: "CSP Stack", params: { stages: 4 } } },
        { type: "ConvBlock", position: { x: 840, y: 200 }, overrides: { label: "Neck", params: { filters: 96, kernel: "1x1" } } },
        { type: "DetectionHead", position: { x: 1080, y: 180 }, overrides: { label: "YOLO Head", params: { classes: 80 } } },
        { type: "Loss", position: { x: 1320, y: 160 }, overrides: { label: "YOLO Loss", params: { type: "giou" } } },
        { type: "Optimizer", position: { x: 1560, y: 180 }, overrides: { label: "SGD", params: { kind: "sgd", lr: 0.01 } } }
      ],
      edges: [
        [0, "batch", 1, "x"],
        [1, "out", 2, "x"],
        [2, "out", 3, "x"],
        [3, "out", 4, "features"],
        [4, "boxes", 5, "pred"],
        [4, "scores", 5, "pred"],
        [0, "batch", 5, "target"],
        [5, "value", 6, "grad"],
        [3, "out", 6, "params"]
      ],
    },
  },
  rf_rtdr: {
    name: "RF-RTDR",
    description: "Roboflow real-time detector (RF-RTDR) quickstart layout.",
    template: {
      nodes: [
        { type: "DataLoader", position: { x: 120, y: 360 }, overrides: { label: "RF-RTDR Loader", params: { source: "roboflow/train" } } },
        { type: "ConvBlock", position: { x: 360, y: 320 }, overrides: { label: "Focus Stem", params: { filters: 64, kernel: "3x3" } } },
        { type: "CSPBlock", position: { x: 600, y: 320 }, overrides: { label: "Backbone Stage", params: { stages: 5 } } },
        { type: "TransformerEncoder", position: { x: 840, y: 340 }, overrides: { label: "Spatial Encoder", params: { heads: 6, depth: 3 } } },
        { type: "TransformerEncoder", position: { x: 1080, y: 340 }, overrides: { label: "Hybrid Decoder", params: { heads: 4, depth: 2 } } },
        { type: "DetectionHead", position: { x: 1320, y: 320 }, overrides: { label: "RF-RTDR Head", params: { classes: 80 } } },
        { type: "Loss", position: { x: 1560, y: 300 }, overrides: { label: "Detection Loss", params: { type: "focal" } } },
        { type: "Optimizer", position: { x: 1800, y: 320 }, overrides: { label: "AdamW", params: { kind: "adamw", lr: 5e-4 } } }
      ],
      edges: [
        [0, "batch", 1, "x"],
        [1, "out", 2, "x"],
        [2, "out", 3, "x"],
        [3, "out", 4, "x"],
        [4, "out", 5, "features"],
        [5, "boxes", 6, "pred"],
        [5, "scores", 6, "pred"],
        [0, "batch", 6, "target"],
        [6, "value", 7, "grad"],
        [4, "out", 7, "params"]
      ],
    },
  },
};

const TEMPLATE_ORDER = ["rtdetr", "yolov8", "rf_rtdr"];

const state = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  connecting: null,
  nextId: 1,
};

const paletteListEl = document.getElementById("palette-list");
const inspectorEl = document.getElementById("inspector");
const previewEl = document.getElementById("graph-preview");
const canvasEl = document.getElementById("canvas");
const searchEl = document.getElementById("palette-search-input");
const selectionPillEl = document.getElementById("selection-pill");
const statusMessageEl = document.getElementById("status-message");
const templateSelectEl = document.getElementById("template-select");
const loadTemplateBtn = document.getElementById("load-template-btn");

function buildPalette(items) {
  paletteListEl.innerHTML = "";
  for (const group of NODE_LIBRARY) {
    const filtered = group.items.filter((item) => item.label.toLowerCase().includes(items));
    if (filtered.length === 0) continue;
    const groupEl = document.createElement("div");
    groupEl.className = "palette-group";
    groupEl.innerHTML = `<h3>${group.name}</h3>`;
    for (const item of filtered) {
      const el = document.createElement("div");
      el.className = "palette-item";
      el.draggable = true;
      el.dataset.type = item.type;
      el.innerHTML = `<strong>${item.label}</strong><span>${item.description}</span>`;
      el.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("application/x-node", item.type);
        e.dataTransfer.effectAllowed = "copy";
      });
      el.addEventListener("dblclick", () => {
        const rect = canvasEl.getBoundingClientRect();
        addNode(item.type, { x: rect.width / 2 + canvasEl.scrollLeft, y: rect.height / 2 + canvasEl.scrollTop });
      });
      groupEl.appendChild(el);
    }
    paletteListEl.appendChild(groupEl);
  }
}

function updateTemplateSelectTitle() {
  if (!templateSelectEl) return;
  const entry = TEMPLATE_LIBRARY[templateSelectEl.value];
  templateSelectEl.title = entry?.description ?? "Choose a starter architecture";
}

function populateTemplateSelect() {
  if (!templateSelectEl) return;
  templateSelectEl.innerHTML = "";
  for (const key of TEMPLATE_ORDER) {
    const entry = TEMPLATE_LIBRARY[key];
    if (!entry) continue;
    const option = document.createElement("option");
    option.value = key;
    option.textContent = entry.name;
    templateSelectEl.appendChild(option);
  }
  if (templateSelectEl.options.length > 0) templateSelectEl.value = TEMPLATE_ORDER[0];
  updateTemplateSelectTitle();
}

function libraryLookup(type) {
  for (const group of NODE_LIBRARY) {
    for (const item of group.items) {
      if (item.type === type) return item;
    }
  }
  return null;
}

function addNode(type, position, overrides = {}) {
  const def = libraryLookup(type);
  if (!def) return;
  const id = state.nextId++;
  const params = {};
  for (const param of def.params) params[param.key] = overrides.params?.[param.key] ?? param.default ?? "";
  const node = {
    id,
    type,
    label: overrides.label ?? def.label,
    position: { x: position.x, y: position.y },
    inputs: def.inputs,
    outputs: def.outputs,
    params,
  };
  state.nodes.push(node);
  selectNode(id);
  renderGraph();
  statusMessageEl.textContent = `Added ${node.label}`;
  return node;
}

function removeNode(nodeId) {
  const node = state.nodes.find((n) => n.id === nodeId);
  if (!node) return;
  state.edges = state.edges.filter((edge) => edge.from.node !== nodeId && edge.to.node !== nodeId);
  state.nodes = state.nodes.filter((n) => n.id !== nodeId);
  if (state.selectedNodeId === nodeId) state.selectedNodeId = null;
  renderInspector();
  renderGraph();
  statusMessageEl.textContent = `Removed ${node.label}`;
}

function selectNode(nodeId) {
  state.selectedNodeId = nodeId;
  renderInspector();
  renderGraph();
}

function addEdge(fromNodeId, fromPort, toNodeId, toPort) {
  if (fromNodeId === toNodeId) return;
  const existing = state.edges.find((edge) => edge.to.node === toNodeId && edge.to.port === toPort);
  if (existing) {
    state.edges = state.edges.filter((edge) => edge !== existing);
  }
  state.edges.push({
    id: `${fromNodeId}:${fromPort}->${toNodeId}:${toPort}`,
    from: { node: fromNodeId, port: fromPort },
    to: { node: toNodeId, port: toPort },
  });
  state.connecting = null;
  renderGraph();
  statusMessageEl.textContent = `Connected ${fromNodeId}.${fromPort} → ${toNodeId}.${toPort}`;
}

function detachPort(nodeId, portName) {
  state.edges = state.edges.filter((edge) => !(edge.to.node === nodeId && edge.to.port === portName));
  renderGraph();
}

function renderGraph() {
  canvasEl.innerHTML = "<svg id='edge-layer'></svg>";
  const svg = canvasEl.querySelector("#edge-layer");
  const viewBox = canvasEl.getBoundingClientRect();
  svg.setAttribute("width", viewBox.width);
  svg.setAttribute("height", viewBox.height);

  for (const node of state.nodes) {
    const nodeEl = document.createElement("div");
    nodeEl.className = "node" + (node.id === state.selectedNodeId ? " selected" : "");
    nodeEl.style.left = `${node.position.x}px`;
    nodeEl.style.top = `${node.position.y}px`;
    nodeEl.dataset.id = node.id;

    nodeEl.innerHTML = `
      <div class="node-header">
        <span class="node-type">${node.label}</span>
        <button class="delete-node" title="Delete node">×</button>
      </div>
      <div class="node-body">
        <div class="ports">
          <div class="port-group inputs">
            ${node.inputs.map((input) => `<div class="port input" data-port="${input}"><span class="port-circle"></span><span class="port-label">${input}</span></div>`).join("")}
          </div>
          <div class="port-group outputs">
            ${node.outputs.map((output) => `<div class="port output" data-port="${output}"><span class="port-label">${output}</span><span class="port-circle"></span></div>`).join("")}
          </div>
        </div>
        <div>
          <span>Params:</span>
          <span>${Object.keys(node.params).length ? Object.entries(node.params).map(([k, v]) => `${k}: ${v}`).join(", ") : "—"}</span>
        </div>
      </div>
    `;

    nodeEl.querySelector(".delete-node").addEventListener("click", (ev) => {
      ev.stopPropagation();
      removeNode(node.id);
    });

    nodeEl.addEventListener("mousedown", () => selectNode(node.id));

    const header = nodeEl.querySelector(".node-header");
    header.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      header.setPointerCapture(ev.pointerId);
      const startX = ev.clientX;
      const startY = ev.clientY;
      const initial = { x: node.position.x, y: node.position.y };
      const move = (moveEv) => {
        const dx = moveEv.clientX - startX;
        const dy = moveEv.clientY - startY;
        node.position.x = Math.max(10, initial.x + dx);
        node.position.y = Math.max(10, initial.y + dy);
        nodeEl.style.left = `${node.position.x}px`;
        nodeEl.style.top = `${node.position.y}px`;
        drawEdges(svg);
      };
      const up = () => {
        header.removeEventListener("pointermove", move);
        header.removeEventListener("pointerup", up);
      };
      header.addEventListener("pointermove", move);
      header.addEventListener("pointerup", up, { once: true });
    });

    const inputs = nodeEl.querySelectorAll(".port.input");
    inputs.forEach((portEl) => {
      const portName = portEl.dataset.port;
      portEl.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (state.connecting) {
          addEdge(state.connecting.nodeId, state.connecting.portName, node.id, portName);
        } else {
          detachPort(node.id, portName);
        }
      });
    });

    const outputs = nodeEl.querySelectorAll(".port.output");
    outputs.forEach((portEl) => {
      const portName = portEl.dataset.port;
      portEl.addEventListener("click", (ev) => {
        ev.stopPropagation();
        state.connecting = { nodeId: node.id, portName };
        renderGraph();
      });
      if (state.connecting && state.connecting.nodeId === node.id && state.connecting.portName === portName) {
        portEl.classList.add("active");
      }
    });

    canvasEl.appendChild(nodeEl);
  }

  drawEdges(svg);
  updatePreview();
  if (state.connecting) {
    statusMessageEl.textContent = `Connecting ${state.connecting.nodeId}.${state.connecting.portName} → select an input port.`;
  } else if (state.nodes.length === 0) {
    statusMessageEl.textContent = "Drag nodes from the palette to begin.";
  }
}

function drawEdges(svg) {
  svg.innerHTML = "";
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
  marker.setAttribute("id", "arrow");
  marker.setAttribute("viewBox", "0 0 10 10");
  marker.setAttribute("refX", "8");
  marker.setAttribute("refY", "5");
  marker.setAttribute("markerWidth", "6");
  marker.setAttribute("markerHeight", "6");
  marker.setAttribute("orient", "auto-start-reverse");
  const markerPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  markerPath.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
  markerPath.setAttribute("fill", "rgba(255,255,255,0.75)");
  marker.appendChild(markerPath);
  defs.appendChild(marker);
  svg.appendChild(defs);

  for (const edge of state.edges) {
    const fromNodeEl = canvasEl.querySelector(`.node[data-id="${edge.from.node}"] .port.output[data-port="${edge.from.port}"]`);
    const toNodeEl = canvasEl.querySelector(`.node[data-id="${edge.to.node}"] .port.input[data-port="${edge.to.port}"]`);
    if (!fromNodeEl || !toNodeEl) continue;
    const fromRect = fromNodeEl.getBoundingClientRect();
    const toRect = toNodeEl.getBoundingClientRect();
    const canvasRect = canvasEl.getBoundingClientRect();
    const startX = fromRect.right - canvasRect.left;
    const startY = fromRect.top + fromRect.height / 2 - canvasRect.top;
    const endX = toRect.left - canvasRect.left;
    const endY = toRect.top + toRect.height / 2 - canvasRect.top;

    const curveX = (endX - startX) / 2;

    const shadow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    shadow.setAttribute("d", `M ${startX} ${startY} C ${startX + curveX} ${startY}, ${endX - curveX} ${endY}, ${endX} ${endY}`);
    shadow.setAttribute("class", "edge-shadow");
    svg.appendChild(shadow);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${startX} ${startY} C ${startX + curveX} ${startY}, ${endX - curveX} ${endY}, ${endX} ${endY}`);
    path.setAttribute("class", "edge");
    path.setAttribute("marker-end", "url(#arrow)");
    svg.appendChild(path);
  }
}

function renderInspector() {
  inspectorEl.innerHTML = "";
  const node = state.nodes.find((n) => n.id === state.selectedNodeId);
  selectionPillEl.textContent = node ? `Node ${node.id}: ${node.label}` : "No selection";

  if (!node) {
    inspectorEl.innerHTML = '<div class="inspector-empty">Select a node to edit parameters.\nTip: click an output then an input to connect nodes.</div>';
    return;
  }

  const sectionIdentity = document.createElement("section");
  sectionIdentity.innerHTML = `
    <h3>Identity</h3>
    <label>Display label<input type="text" value="${node.label}"></label>
  `;
  const labelInput = sectionIdentity.querySelector("input");
  labelInput.addEventListener("input", (ev) => {
    node.label = ev.target.value;
    renderGraph();
  });
  inspectorEl.appendChild(sectionIdentity);

  if (node.params && Object.keys(node.params).length) {
    const sectionParams = document.createElement("section");
    sectionParams.innerHTML = `<h3>Parameters</h3>`;
    for (const param of libraryLookup(node.type)?.params ?? []) {
      const wrapper = document.createElement("label");
      wrapper.textContent = param.key;
      let control;
      if (param.type === "select") {
        control = document.createElement("select");
        for (const opt of param.options ?? []) {
          const optionEl = document.createElement("option");
          optionEl.value = opt;
          optionEl.textContent = opt;
          if (node.params[param.key] === opt) optionEl.selected = true;
          control.appendChild(optionEl);
        }
      } else {
        control = document.createElement("input");
        control.type = param.type === "number" ? "number" : "text";
        control.value = node.params[param.key] ?? "";
        if (param.type === "number") control.step = "any";
      }
      control.addEventListener("input", (ev) => {
        node.params[param.key] = param.type === "number" ? parseFloat(ev.target.value) : ev.target.value;
        updatePreview();
        renderGraph();
      });
      wrapper.appendChild(control);
      sectionParams.appendChild(wrapper);
    }
    inspectorEl.appendChild(sectionParams);
  }

  const sectionMetadata = document.createElement("section");
  sectionMetadata.innerHTML = `
    <h3>Metadata</h3>
    <label>Notes<textarea placeholder="Implementation notes" data-role="notes"></textarea></label>
  `;
  const notesEl = sectionMetadata.querySelector("textarea");
  notesEl.value = node.notes ?? "";
  notesEl.addEventListener("input", (ev) => {
    node.notes = ev.target.value;
    updatePreview();
  });
  inspectorEl.appendChild(sectionMetadata);

  const sectionActions = document.createElement("section");
  sectionActions.innerHTML = `
    <h3>Actions</h3>
    <button class="detach-btn">Detach inputs</button>
    <button class="duplicate-btn">Duplicate</button>
    <button class="delete-btn">Delete node</button>
  `;
  sectionActions.querySelector(".detach-btn").addEventListener("click", () => {
    for (const input of node.inputs) detachPort(node.id, input);
  });
  sectionActions.querySelector(".duplicate-btn").addEventListener("click", () => {
    const clone = addNode(node.type, { x: node.position.x + 60, y: node.position.y + 40 }, {
      label: `${node.label} copy`,
      params: { ...node.params },
    });
    clone.notes = node.notes;
  });
  sectionActions.querySelector(".delete-btn").addEventListener("click", () => removeNode(node.id));
  inspectorEl.appendChild(sectionActions);
}

function updatePreview() {
  const graph = state.nodes.map((node) => ({
    id: node.id,
    type: node.type,
    label: node.label,
    position: node.position,
    params: node.params,
    notes: node.notes,
    inputs: node.inputs,
    outputs: node.outputs,
  }));
  const edges = state.edges.map((edge) => ({
    from: edge.from,
    to: edge.to,
  }));
  previewEl.textContent = JSON.stringify({ nodes: graph, edges }, null, 2);
}

function clearGraph() {
  state.nodes = [];
  state.edges = [];
  state.selectedNodeId = null;
  state.connecting = null;
  state.nextId = 1;
  renderInspector();
  renderGraph();
}

function loadTemplate(templateKey) {
  const entry = TEMPLATE_LIBRARY[templateKey];
  if (!entry) {
    statusMessageEl.textContent = "Template not found";
    return;
  }
  clearGraph();
  const template = entry.template;
  for (const item of template.nodes) {
    const node = addNode(item.type, item.position, item.overrides ?? {});
    if (item.overrides?.params) {
      node.params = { ...node.params, ...item.overrides.params };
    }
  }
  for (const [fromIdx, fromPort, toIdx, toPort] of template.edges) {
    const fromNode = state.nodes[fromIdx];
    const toNode = state.nodes[toIdx];
    if (fromNode && toNode) {
      state.edges.push({
        id: `${fromNode.id}:${fromPort}->${toNode.id}:${toPort}`,
        from: { node: fromNode.id, port: fromPort },
        to: { node: toNode.id, port: toPort },
      });
    }
  }
  renderGraph();
  if (templateSelectEl) {
    templateSelectEl.value = templateKey;
    updateTemplateSelectTitle();
  }
  statusMessageEl.textContent = `Loaded ${entry.name} template`;
}

function exportGraph() {
  const data = previewEl.textContent;
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tinyuop_builder.json";
  a.click();
  URL.revokeObjectURL(url);
}

canvasEl.addEventListener("dragover", (ev) => {
  if (ev.dataTransfer.types.includes("application/x-node")) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
  }
});

canvasEl.addEventListener("drop", (ev) => {
  const type = ev.dataTransfer.getData("application/x-node");
  if (!type) return;
  ev.preventDefault();
  const rect = canvasEl.getBoundingClientRect();
  addNode(type, { x: ev.clientX - rect.left, y: ev.clientY - rect.top });
});

canvasEl.addEventListener("click", (ev) => {
  if (ev.target === canvasEl || ev.target === canvasEl.querySelector("svg")) {
    state.selectedNodeId = null;
    state.connecting = null;
    renderInspector();
    renderGraph();
  }
});

searchEl.addEventListener("input", (ev) => {
  buildPalette(ev.target.value.toLowerCase());
});

window.addEventListener("keydown", (ev) => {
  if ((ev.key === "Delete" || ev.key === "Backspace") && state.selectedNodeId != null) {
    removeNode(state.selectedNodeId);
  }
  if (ev.key === "Escape") {
    state.connecting = null;
    renderGraph();
  }
});

document.getElementById("reset-graph-btn").addEventListener("click", () => {
  clearGraph();
  statusMessageEl.textContent = "Canvas cleared";
});

document.getElementById("export-graph-btn").addEventListener("click", exportGraph);

if (templateSelectEl && loadTemplateBtn) {
  templateSelectEl.addEventListener("change", updateTemplateSelectTitle);
  loadTemplateBtn.addEventListener("click", () => {
    if (!templateSelectEl.value) {
      statusMessageEl.textContent = "Select a template to load.";
      return;
    }
    loadTemplate(templateSelectEl.value);
  });
  populateTemplateSelect();
}

buildPalette("");
renderInspector();
renderGraph();
