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
      { type: "UOpLayerNorm", label: "LayerNorm", inputs: ["x"], outputs: ["out"], params: [{ key: "eps", type: "number", default: 1e-5 }], description: "Layer normalization" },
      { type: "UOpReshape", label: "Reshape", inputs: ["x"], outputs: ["out"], params: [{ key: "shape", type: "text", default: "1,64,112,112" }], description: "Reshape tensor" },
      { type: "UOpTranspose", label: "Transpose", inputs: ["x"], outputs: ["out"], params: [{ key: "perm", type: "text", default: "0,2,3,1" }], description: "Reorder tensor axes" },
      { type: "UOpBroadcast", label: "Broadcast", inputs: ["x"], outputs: ["out"], params: [{ key: "shape", type: "text", default: "match" }], description: "Broadcast to new shape" },
      { type: "UOpReduceSum", label: "Reduce Sum", inputs: ["x"], outputs: ["out"], params: [{ key: "axis", type: "text", default: "-1" }], description: "Sum over axes" },
      { type: "UOpReduceMax", label: "Reduce Max", inputs: ["x"], outputs: ["out"], params: [{ key: "axis", type: "text", default: "-1" }], description: "Max over axes" },
      { type: "UOpReduceMean", label: "Reduce Mean", inputs: ["x"], outputs: ["out"], params: [{ key: "axis", type: "text", default: "-1" }], description: "Mean over axes" }
    ],
  },
  {
    name: "Activations & Regularization",
    items: [
      { type: "UOpSoftmax", label: "Softmax", inputs: ["x"], outputs: ["out"], params: [{ key: "axis", type: "text", default: "-1" }], description: "Softmax activation" },
      { type: "UOpSigmoid", label: "Sigmoid", inputs: ["x"], outputs: ["out"], params: [], description: "Sigmoid activation" },
      { type: "UOpTanh", label: "Tanh", inputs: ["x"], outputs: ["out"], params: [], description: "Hyperbolic tangent activation" },
      { type: "UOpGelu", label: "GELU", inputs: ["x"], outputs: ["out"], params: [], description: "Gaussian error linear unit" },
      { type: "UOpSilu", label: "SiLU", inputs: ["x"], outputs: ["out"], params: [], description: "Sigmoid linear unit" },
      { type: "UOpDropout", label: "Dropout", inputs: ["x"], outputs: ["out"], params: [{ key: "rate", type: "number", default: 0.1 }], description: "Drop activations for regularization" }
    ],
  },
  {
    name: "Spatial Ops",
    items: [
      { type: "UOpMaxPool2d", label: "MaxPool2D", inputs: ["x"], outputs: ["out"], params: [
        { key: "kernel", type: "text", default: "2x2" },
        { key: "stride", type: "text", default: "2" }
      ], description: "Max pooling" },
      { type: "UOpAvgPool2d", label: "AvgPool2D", inputs: ["x"], outputs: ["out"], params: [
        { key: "kernel", type: "text", default: "2x2" },
        { key: "stride", type: "text", default: "2" }
      ], description: "Average pooling" },
      { type: "UOpUpsample", label: "Upsample", inputs: ["x"], outputs: ["out"], params: [
        { key: "scale", type: "text", default: "2" },
        { key: "mode", type: "select", default: "nearest", options: ["nearest", "bilinear"] }
      ], description: "Increase spatial resolution" }
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
      { type: "UOpPmap", label: "Pmap", inputs: ["fn", "devices"], outputs: ["distributed"], params: [{ key: "devices", type: "text", default: "cpu:0,cpu:1" }], description: "Parallel map" },
      { type: "UOpCond", label: "Cond", inputs: ["pred", "true", "false"], outputs: ["out"], params: [], description: "Conditional branch" },
      { type: "UOpScan", label: "Scan", inputs: ["fn", "init", "xs"], outputs: ["out"], params: [{ key: "axis", type: "number", default: 0 }], description: "Prefix scan transform" },
      { type: "UOpWhile", label: "While", inputs: ["cond", "body", "state"], outputs: ["out"], params: [], description: "While loop" },
      { type: "UOpAllReduce", label: "AllReduce", inputs: ["x"], outputs: ["out"], params: [{ key: "op", type: "select", default: "sum", options: ["sum", "mean", "max"] }], description: "Collective reduction" },
      { type: "UOpAllGather", label: "AllGather", inputs: ["x"], outputs: ["out"], params: [], description: "Collective gather" },
      { type: "UOpReduceScatter", label: "ReduceScatter", inputs: ["x"], outputs: ["out"], params: [{ key: "op", type: "select", default: "sum", options: ["sum", "mean"] }], description: "Reduce then scatter" }
    ],
  },
  {
    name: "Model Blocks",
    items: [
      { type: "ConvBlock", label: "Conv Block", inputs: ["x"], outputs: ["out"], params: [{ key: "filters", type: "number", default: 64 }, { key: "kernel", type: "text", default: "3x3" }], description: "Conv -> BN -> ReLU" },
      { type: "CSPBlock", label: "CSP Block", inputs: ["x"], outputs: ["out"], params: [{ key: "stages", type: "number", default: 3 }], description: "Cross Stage Partial block" },
      { type: "TransformerEncoder", label: "Transformer Encoder", inputs: ["x"], outputs: ["out"], params: [{ key: "heads", type: "number", default: 8 }, { key: "depth", type: "number", default: 6 }], description: "Multi-head attention stack" },
      { type: "DetectionHead", label: "Detection Head", inputs: ["features"], outputs: ["boxes", "scores"], params: [{ key: "classes", type: "number", default: 80 }], description: "Prediction heads" },
      { type: "Loss", label: "Loss", inputs: ["pred", "target"], outputs: ["value"], params: [{ key: "type", type: "select", default: "focal", options: ["focal", "l1", "giou", "cross_entropy", "dice"] }], description: "Loss computation" },
      { type: "Optimizer", label: "Optimizer", inputs: ["params", "grad"], outputs: ["updated"], params: [{ key: "kind", type: "select", default: "adamw", options: ["adamw", "sgd", "lion"] }, { key: "lr", type: "number", default: 1e-4 }], description: "Optimizer step" },
      { type: "DataLoader", label: "Data Loader", inputs: [], outputs: ["batch"], params: [{ key: "source", type: "text", default: "coco/train" }, { key: "batch_size", type: "number", default: 4 }], description: "Dataset reader" },
      { type: "ResidualBlock", label: "Residual Block", inputs: ["x"], outputs: ["out"], params: [{ key: "filters", type: "number", default: 64 }, { key: "stride", type: "text", default: "1" }], description: "Residual bottleneck block" },
      { type: "GlobalAvgPool", label: "Global Avg Pool", inputs: ["x"], outputs: ["out"], params: [], description: "Spatial average pooling" },
      { type: "ClassificationHead", label: "Classification Head", inputs: ["features"], outputs: ["logits"], params: [{ key: "classes", type: "number", default: 1000 }], description: "Linear classifier" },
      { type: "PatchEmbed", label: "Patch Embed", inputs: ["x"], outputs: ["tokens"], params: [{ key: "patch_size", type: "text", default: "16" }, { key: "embed_dim", type: "number", default: 768 }], description: "Image patches to tokens" },
      { type: "PositionalEncoding", label: "Positional Encoding", inputs: ["tokens"], outputs: ["out"], params: [{ key: "mode", type: "select", default: "sinusoidal", options: ["sinusoidal", "learned"] }], description: "Add position information" },
      { type: "MLPBlock", label: "MLP Block", inputs: ["x"], outputs: ["out"], params: [{ key: "hidden_dim", type: "number", default: 3072 }], description: "Transformer MLP" },
      { type: "UNetEncoder", label: "UNet Encoder", inputs: ["x"], outputs: ["down", "skip"], params: [{ key: "depth", type: "number", default: 4 }], description: "Downsample pathway" },
      { type: "UNetDecoder", label: "UNet Decoder", inputs: ["x", "skip"], outputs: ["out"], params: [{ key: "depth", type: "number", default: 4 }], description: "Upsample pathway" },
      { type: "SegmentationHead", label: "Segmentation Head", inputs: ["features"], outputs: ["mask"], params: [{ key: "classes", type: "number", default: 21 }], description: "Pixel classification" }
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
  resnet50: {
    name: "ResNet-50",
    description: "ImageNet-style residual network baseline.",
    template: {
      nodes: [
        { type: "DataLoader", position: { x: 120, y: 520 }, overrides: { label: "ImageNet Loader", params: { source: "imagenet/train", batch_size: 128 } } },
        { type: "ConvBlock", position: { x: 360, y: 500 }, overrides: { label: "Stem", params: { filters: 64, kernel: "7x7" } } },
        { type: "ResidualBlock", position: { x: 600, y: 500 }, overrides: { label: "Stage 1", params: { filters: 256, stride: "1" } } },
        { type: "ResidualBlock", position: { x: 840, y: 500 }, overrides: { label: "Stage 2", params: { filters: 512, stride: "2" } } },
        { type: "ResidualBlock", position: { x: 1080, y: 500 }, overrides: { label: "Stage 3", params: { filters: 1024, stride: "2" } } },
        { type: "ResidualBlock", position: { x: 1320, y: 500 }, overrides: { label: "Stage 4", params: { filters: 2048, stride: "2" } } },
        { type: "GlobalAvgPool", position: { x: 1560, y: 520 }, overrides: { label: "Global Average Pool" } },
        { type: "ClassificationHead", position: { x: 1800, y: 500 }, overrides: { label: "Classifier", params: { classes: 1000 } } },
        { type: "Loss", position: { x: 2040, y: 480 }, overrides: { label: "Cross Entropy", params: { type: "cross_entropy" } } },
        { type: "Optimizer", position: { x: 2280, y: 500 }, overrides: { label: "SGD Momentum", params: { kind: "sgd", lr: 0.1 } } }
      ],
      edges: [
        [0, "batch", 1, "x"],
        [1, "out", 2, "x"],
        [2, "out", 3, "x"],
        [3, "out", 4, "x"],
        [4, "out", 5, "x"],
        [5, "out", 6, "x"],
        [6, "out", 7, "features"],
        [7, "logits", 8, "pred"],
        [0, "batch", 8, "target"],
        [8, "value", 9, "grad"],
        [5, "out", 9, "params"]
      ],
    },
  },
  vit_b16: {
    name: "ViT-B/16",
    description: "Vision Transformer base model with patch embeddings.",
    template: {
      nodes: [
        { type: "DataLoader", position: { x: 120, y: 680 }, overrides: { label: "ImageNet Loader", params: { source: "imagenet/train", batch_size: 256 } } },
        { type: "PatchEmbed", position: { x: 360, y: 660 }, overrides: { label: "Patch Embed", params: { patch_size: "16", embed_dim: 768 } } },
        { type: "PositionalEncoding", position: { x: 600, y: 660 }, overrides: { label: "Position Encode", params: { mode: "sinusoidal" } } },
        { type: "TransformerEncoder", position: { x: 840, y: 660 }, overrides: { label: "Encoder", params: { heads: 12, depth: 12 } } },
        { type: "MLPBlock", position: { x: 1080, y: 660 }, overrides: { label: "MLP Head", params: { hidden_dim: 3072 } } },
        { type: "ClassificationHead", position: { x: 1320, y: 640 }, overrides: { label: "CLS Head", params: { classes: 1000 } } },
        { type: "Loss", position: { x: 1560, y: 620 }, overrides: { label: "Cross Entropy", params: { type: "cross_entropy" } } },
        { type: "Optimizer", position: { x: 1800, y: 640 }, overrides: { label: "AdamW", params: { kind: "adamw", lr: 5e-4 } } }
      ],
      edges: [
        [0, "batch", 1, "x"],
        [1, "tokens", 2, "tokens"],
        [2, "out", 3, "x"],
        [3, "out", 4, "x"],
        [4, "out", 5, "features"],
        [5, "logits", 6, "pred"],
        [0, "batch", 6, "target"],
        [6, "value", 7, "grad"],
        [3, "out", 7, "params"]
      ],
    },
  },
  unet: {
    name: "UNet",
    description: "Encoder-decoder segmentation scaffold.",
    template: {
      nodes: [
        { type: "DataLoader", position: { x: 120, y: 840 }, overrides: { label: "Segmentation Loader", params: { source: "segmentation/train", batch_size: 8 } } },
        { type: "ConvBlock", position: { x: 360, y: 820 }, overrides: { label: "Input Stem", params: { filters: 32, kernel: "3x3" } } },
        { type: "UNetEncoder", position: { x: 600, y: 820 }, overrides: { label: "Encoder", params: { depth: 4 } } },
        { type: "UNetDecoder", position: { x: 840, y: 820 }, overrides: { label: "Decoder", params: { depth: 4 } } },
        { type: "SegmentationHead", position: { x: 1080, y: 820 }, overrides: { label: "Seg Head", params: { classes: 21 } } },
        { type: "Loss", position: { x: 1320, y: 800 }, overrides: { label: "Dice Loss", params: { type: "dice" } } },
        { type: "Optimizer", position: { x: 1560, y: 820 }, overrides: { label: "AdamW", params: { kind: "adamw", lr: 1e-4 } } }
      ],
      edges: [
        [0, "batch", 1, "x"],
        [1, "out", 2, "x"],
        [2, "down", 3, "x"],
        [2, "skip", 3, "skip"],
        [3, "out", 4, "features"],
        [4, "mask", 5, "pred"],
        [0, "batch", 5, "target"],
        [5, "value", 6, "grad"],
        [3, "out", 6, "params"]
      ],
    },
  },
};

const TEMPLATE_ORDER = ["rtdetr", "yolov8", "rf_rtdr", "resnet50", "vit_b16", "unet"];
const CUSTOM_TEMPLATES_KEY = "tinyuop.builder.customTemplates";

const state = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  connecting: null,
  nextId: 1,
};

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80);
}

function snapshotCurrentGraph() {
  const indexById = new Map();
  const nodes = state.nodes.map((node, index) => {
    indexById.set(node.id, index);
    const templateNode = {
      type: node.type,
      position: { x: node.position.x, y: node.position.y },
    };
    const def = libraryLookup(node.type);
    const overrides = {};
    if (!def || node.label !== def.label) overrides.label = node.label;
    const paramOverrides = {};
    if (node.params) {
      if (def) {
        for (const param of def.params) {
          const defaultValue = param.default ?? "";
          const currentValue = node.params[param.key];
          if (currentValue !== undefined && currentValue !== defaultValue) {
            paramOverrides[param.key] = currentValue;
          }
        }
        for (const key of Object.keys(node.params)) {
          if (!def.params.some((param) => param.key === key)) {
            paramOverrides[key] = node.params[key];
          }
        }
      } else {
        Object.assign(paramOverrides, node.params);
      }
    }
    if (Object.keys(paramOverrides).length) overrides.params = paramOverrides;
    if (node.notes) overrides.notes = node.notes;
    if (Object.keys(overrides).length) templateNode.overrides = overrides;
    return templateNode;
  });
  const edges = state.edges
    .map((edge) => {
      const fromIdx = indexById.get(edge.from.node);
      const toIdx = indexById.get(edge.to.node);
      if (fromIdx == null || toIdx == null) return null;
      return [fromIdx, edge.from.port, toIdx, edge.to.port];
    })
    .filter(Boolean);
  return { nodes, edges };
}

function persistCustomTemplates() {
  if (!window.localStorage) return;
  const customEntries = TEMPLATE_ORDER.filter((key) => TEMPLATE_LIBRARY[key]?.custom).map((key) => ({
    key,
    data: TEMPLATE_LIBRARY[key],
  }));
  try {
    window.localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(customEntries));
  } catch (err) {
    console.warn("Unable to persist custom templates", err);
  }
}

function loadCustomTemplates() {
  if (!window.localStorage) return;
  try {
    const raw = window.localStorage.getItem(CUSTOM_TEMPLATES_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const { key, data } = entry;
      if (!key || !data || !data.template) continue;
      TEMPLATE_LIBRARY[key] = { ...data, custom: true };
      if (!TEMPLATE_ORDER.includes(key)) TEMPLATE_ORDER.push(key);
    }
  } catch (err) {
    console.warn("Unable to load custom templates", err);
  }
}

const paletteListEl = document.getElementById("palette-list");
const inspectorEl = document.getElementById("inspector");
const previewEl = document.getElementById("graph-preview");
const canvasEl = document.getElementById("canvas");
const searchEl = document.getElementById("palette-search-input");
const selectionPillEl = document.getElementById("selection-pill");
const statusMessageEl = document.getElementById("status-message");
const templateSelectEl = document.getElementById("template-select");
const loadTemplateBtn = document.getElementById("load-template-btn");
const saveTemplateBtn = document.getElementById("save-template-btn");

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
  const previous = templateSelectEl.value;
  templateSelectEl.innerHTML = "";
  for (const key of TEMPLATE_ORDER) {
    const entry = TEMPLATE_LIBRARY[key];
    if (!entry) continue;
    const option = document.createElement("option");
    option.value = key;
    option.textContent = entry.name;
    templateSelectEl.appendChild(option);
  }
  if (templateSelectEl.options.length === 0) {
    templateSelectEl.value = "";
  } else if (previous && TEMPLATE_LIBRARY[previous]) {
    templateSelectEl.value = previous;
  } else {
    templateSelectEl.value = templateSelectEl.options[0].value;
  }
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
    notes: overrides.notes ?? "",
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
  statusMessageEl.textContent = `Connected ${fromNodeId}.${fromPort} -> ${toNodeId}.${toPort}`;
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
        <button class="delete-node" title="Delete node">x</button>
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
          <span>${Object.keys(node.params).length ? Object.entries(node.params).map(([k, v]) => `${k}: ${v}`).join(", ") : "--"}</span>
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
    statusMessageEl.textContent = `Connecting ${state.connecting.nodeId}.${state.connecting.portName} -> select an input port.`;
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
    if (item.overrides?.notes) node.notes = item.overrides.notes;
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

loadCustomTemplates();

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

if (saveTemplateBtn) {
  saveTemplateBtn.addEventListener("click", () => {
    if (state.nodes.length === 0) {
      statusMessageEl.textContent = "Add nodes to the canvas before saving a template.";
      return;
    }
    const nameInput = window.prompt("Template name", "Custom template");
    if (!nameInput || !nameInput.trim()) {
      statusMessageEl.textContent = "Template save canceled.";
      return;
    }
    const name = nameInput.trim();
    const slug = slugify(name);
    if (!slug) {
      statusMessageEl.textContent = "Template name must include letters or numbers.";
      return;
    }
    const descriptionInput = window.prompt("Template description", "");
    const description = descriptionInput != null ? descriptionInput.trim() : "";
    const existing = TEMPLATE_LIBRARY[slug];
    if (existing && !existing.custom) {
      statusMessageEl.textContent = "Built-in templates cannot be replaced.";
      return;
    }
    if (existing && existing.custom) {
      const shouldReplace = window.confirm(`Replace the existing template named "${existing.name}"?`);
      if (!shouldReplace) {
        statusMessageEl.textContent = "Template save canceled.";
        return;
      }
    }
    const snapshot = snapshotCurrentGraph();
    if (snapshot.nodes.length === 0) {
      statusMessageEl.textContent = "Templates require at least one node.";
      return;
    }
    TEMPLATE_LIBRARY[slug] = {
      name,
      description: description || "Custom TinyUOp graph",
      template: snapshot,
      custom: true,
    };
    if (!TEMPLATE_ORDER.includes(slug)) {
      TEMPLATE_ORDER.push(slug);
    }
    persistCustomTemplates();
    populateTemplateSelect();
    if (templateSelectEl) {
      templateSelectEl.value = slug;
      updateTemplateSelectTitle();
    }
    statusMessageEl.textContent = `Saved ${name} template.`;
  });
}

buildPalette("");
renderInspector();
renderGraph();
