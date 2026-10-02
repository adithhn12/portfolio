import type { Project } from '../types';

export const PERSONAL_INFO = {
  name: "Adith H N",
  username: "adithhn12",
  role: "MCA Student · Software & AI",
  degree: "Master of Computer Applications (MCA)",
  semester: "Sem 3",
  location: "BMSCE, Bengaluru, India",
  githubUrl: "https://github.com/adithhn12",
  avatarUrl: "https://avatars.githubusercontent.com/u/278432269?v=4",
  bio: "MCA student at BMSCE, Bengaluru, exploring AI/ML, software development, computer vision, and creative projects through hands-on work.",
  stats: [
    { label: "Public Repositories", value: "6" },
    { label: "Live Cloud Deploys", value: "5" },
    { label: "Core Domains", value: "AI/CV • Systems • Web" },
    { label: "Degree Track", value: "MCA (Sem 3)" }
  ],
  skills: {
    ai_ml: ["ResNet50V2", "TensorFlow / Keras", "Test-Time Augmentation (TTA)", "Grad-CAM", "LangChain", "Groq Llama 3.2", "HuggingFace Embeddings", "FAISS Vector Search", "OpenCV", "Uncertainty Calibration"],
    web_systems: ["TypeScript", "React", "Next.js", "Vite", "Tailwind CSS", "Node.js", "Python", "Streamlit", "HTML5 / CSS3", "REST APIs"],
    backend_cloud: ["Firebase", "Supabase", "Git & GitHub", "Vercel", "GitHub Pages", "LocalStorage Session API"],
    interactive_game: ["Godot Engine", "GDScript", "2D Physics Controller", "TileMaps", "WebGL Export", "Score Persistor"]
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "satellite-classification",
    name: "Satellite Land Cover Classification",
    tagline: "ResNet50V2 2-Stage Transfer Learning & Spatial Grid Classifier on EuroSAT Imagery",
    category: "AI_CV",
    categoryName: "Computer Vision & Remote Sensing",
    problem: "Monitoring land-use transformation, urban expansion, and environmental reserves requires high-accuracy automated satellite image classification with robust out-of-distribution generalization and spatial boundary preservation.",
    solution: "Built a 2-stage ResNet50V2 deep learning architecture on 10 EuroSAT land cover categories. Features multi-crop scale-preserving Test-Time Augmentation (TTA - 5 crops), overlapping grid slicing with 3x3 Gaussian neighborhood smoothing, Grad-CAM saliency visualizers, uncertainty calibration (flagging confidence <45%), and PDF reporting.",
    builtDetails: [
      "2-Stage Transfer Learning: Stage 1 head warmup (lr=1e-3) + Stage 2 top 30 layer fine-tuning (lr=1e-5)",
      "Multi-crop Test-Time Augmentation (TTA) ensembling 5 crops (Center + 4 Corners) for images >128x128px",
      "Overlapping regional grid classification with 3x3 Gaussian probability neighborhood smoothing",
      "Uncertainty calibration engine flagging predictions with peak confidence <45% or small margins (<12%)"
    ],
    techStack: ["Python", "TensorFlow", "Keras", "ResNet50V2", "Grad-CAM", "EuroSAT", "OpenCV", "NumPy"],
    githubUrl: "https://github.com/adithhn12/Satellite-Land-Classification",
    featured: true,
    metrics: [
      { label: "Model Architecture", value: "ResNet50V2 2-Stage" },
      { label: "EuroSAT Categories", value: "10 Land Cover Classes" },
      { label: "Generalization", value: "TTA 5-Crop Ensembling" }
    ],
    architecture: {
      inputs: ["Sentinel-2 Multispectral Tile", "Arbitrary Regional Composite (>128x128px)"],
      coreEngine: "ResNet50V2 Fine-Tuned Layers -> 5-Crop TTA Assembly -> 3x3 Gaussian Smoothing",
      outputs: ["EuroSAT Land Cover Class", "Calibrated Confidence & Grad-CAM Heatmap", "PDF Spatial Report"]
    },
    highlights: [
      "Grad-CAM saliency heatmaps highlighting exact spatial activation boundaries",
      "Robust handling of satellite camera orientation via spatial rotations (0°, 90°, 180°, 270°)",
      "Uncertainty calibration preventing uncalibrated softmax errors on noisy sensors"
    ],
    codeSnippet: {
      language: "python",
      title: "resnet50v2_eurosat_pipeline.py",
      code: `import tensorflow as tf
from tensorflow.keras.applications import ResNet50V2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, Rescaling
from tensorflow.keras.models import Model

def build_eurosat_resnet50v2(input_shape=(64, 64, 3), num_classes=10):
    inputs = tf.keras.Input(shape=input_shape)
    x = Rescaling(scale=2.0, offset=-1.0)(inputs)  # Rescale to [-1, 1] range
    
    base_model = ResNet50V2(weights='imagenet', include_top=False, input_tensor=x)
    base_model.trainable = False  # Stage 1: Head warmup
    
    head = GlobalAveragePooling2D()(base_model.output)
    head = Dense(256, activation='relu')(head)
    head = Dropout(0.3)(head)
    outputs = Dense(num_classes, activation='softmax')(head)
    
    model = Model(inputs=inputs, outputs=outputs)
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
                  loss='categorical_crossentropy', metrics=['accuracy'])
    return model`
    }
  },
  {
    id: "docuchat",
    name: "DocuChat",
    tagline: "Context-Aware RAG Document Query Engine with HuggingFace & Groq Llama 3.2",
    category: "AI_CV",
    categoryName: "Generative AI & RAG",
    problem: "Extracting precise answers from complex multi-format documents (PDFs, TXT, DOCX) is tedious and prone to LLM hallucination when using unconstrained AI prompts.",
    solution: "Engineered a Retrieval-Augmented Generation (RAG) platform. Combines HuggingFace sentence transformer embeddings ('all-MiniLM-L6-v2'), in-memory FAISS vector indexing, and Groq's Llama 3.2 engine to deliver context-bound, hallucination-free answers with exact document citations.",
    builtDetails: [
      "Multi-format document text extraction and character chunking pipeline",
      "384-dimensional dense vector embeddings using HuggingFace 'all-MiniLM-L6-v2'",
      "In-memory FAISS vector similarity search achieving sub-50ms retrieval lookup times",
      "Groq Llama 3.2 LLM integration delivering sub-second response generation with exact source citations"
    ],
    techStack: ["Python", "Streamlit", "LangChain", "HuggingFace Embeddings", "FAISS", "Groq API", "Llama 3.2"],
    githubUrl: "https://github.com/adithhn12/DocuChat",
    liveUrl: "https://adith-docuchat.streamlit.app/",
    featured: true,
    metrics: [
      { label: "Vector Store", value: "FAISS Sub-50ms Search" },
      { label: "Embedding Engine", value: "all-MiniLM-L6-v2 (384d)" },
      { label: "LLM Provider", value: "Groq Llama 3.2" }
    ],
    architecture: {
      inputs: ["User Ingested Document (PDF/TXT/DOCX)", "Natural Language Query"],
      coreEngine: "HuggingFace Embedding -> FAISS Vector Store -> Top-K Document Chunks -> Groq Llama 3.2 Context Synthesis",
      outputs: ["Context-Grounded Answer", "Exact Source Citations", "Similarity Distance Score"]
    },
    highlights: [
      "Sub-second end-to-end response generation powered by Groq LPU inference",
      "Zero-hallucination policy constraining Llama 3.2 to strictly retrieved context",
      "Live cloud deployment on Streamlit Community Cloud"
    ],
    codeSnippet: {
      language: "python",
      title: "rag_pipeline.py",
      code: `from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq

def create_docuchat_pipeline(raw_text):
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    chunks = splitter.split_text(raw_text)
    
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = FAISS.from_texts(chunks, embedding=embeddings)
    
    llm = ChatGroq(model_name="llama-3.2-11b-vision-preview", temperature=0.2)
    return vectorstore, llm`
    }
  },
  {
    id: "aquasphere",
    name: "AquaSphere AI",
    tagline: "Role-Based Water Resource Management Platform for Citizens, Field Workers & BWSSB Managers",
    category: "SMART_SYSTEMS",
    categoryName: "Smart Infrastructure & Municipal Systems",
    problem: "Municipal water management suffers from fragmented communication, delayed incident reporting, manual task tracking for field workers, and lack of operational visibility for municipal managers.",
    solution: "Created a unified water management platform supporting role-based access for Citizens, Field Workers/Drivers, BWSSB Managers, and Guests. Enables citizens to report issues, field workers to receive task dispatches, and BWSSB managers to oversee regional water operations.",
    builtDetails: [
      "Role-Based Access Control (RBAC) tailored for Citizens, Field Workers, BWSSB Managers, and Guests",
      "Citizen incident reporting portal for logging water leaks, contamination, and supply issues",
      "Field Worker module for receiving, managing, and resolving operational tasks in real time",
      "BWSSB Manager Dashboard for real-time regional oversight, issue monitoring, and workforce coordination"
    ],
    techStack: ["TypeScript", "React", "Vite", "Firebase", "BWSSB RBAC", "Tailwind CSS"],
    githubUrl: "https://github.com/adithhn12/AquaSphere",
    liveUrl: "https://aquasphereai.vercel.app",
    featured: true,
    metrics: [
      { label: "Target Organization", value: "BWSSB Water Operations" },
      { label: "Role Portals", value: "4 Distinct Access Modes" },
      { label: "Deployment", value: "Vercel Platform" }
    ],
    architecture: {
      inputs: ["Citizen Water Reports", "Sensor Telemetry Data", "Role Credentials"],
      coreEngine: "Role-Based Portal Router -> Realtime Firebase Sync -> BWSSB Operational Manager Board",
      outputs: ["Field Technician Dispatches", "Water Incident Maps", "Manager Operations Metrics"]
    },
    highlights: [
      "Designed specifically for BWSSB water governance and field operations",
      "Role-specific portals tailored for citizens, field drivers, and municipal directors",
      "Deployed live on Vercel"
    ]
  },
  {
    id: "orderflow",
    name: "OrderFlow",
    tagline: "AI-Powered Manufacturing Order & Operations Management via Natural Language",
    category: "SMART_SYSTEMS",
    categoryName: "Generative AI & Enterprise Ops",
    problem: "Small and medium manufacturing companies struggle with expensive workflow tools, relying on manual order entry, spreadsheet tracking, email miscommunications, and delayed bottleneck identification.",
    solution: "Built an AI-powered manufacturing order management platform allowing buyers and operations teams to create and update production orders using simple natural language prompts (e.g., 'Need 50 stainless steel brackets by next Friday', 'Update order ID123 to Accepted', 'Add quality note: surface scratches found').",
    builtDetails: [
      "Natural language order creation parsing quantity, material, product name, and target deadline",
      "AI-driven order status updates and quality inspection note attachment ('surface scratches found')",
      "Real-time operations dashboard tracking active orders, material stocks, and workflow bottlenecks",
      "Role-based access tailored for buyers and manufacturing operations teams"
    ],
    techStack: ["TypeScript", "React", "Gemini API", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/adithhn12/OrderFlow",
    liveUrl: "https://whisper-ops.lovable.app",
    featured: true,
    metrics: [
      { label: "AI Engine", value: "Natural Language Parser" },
      { label: "Database", value: "Supabase Relational Store" },
      { label: "Deployment", value: "Lovable Cloud" }
    ],
    architecture: {
      inputs: ["Natural Language Prompt (e.g. 'Need 50 steel brackets by Friday')", "Operations Commands"],
      coreEngine: "Gemini AI Entity Extractor -> Supabase Workflow Engine -> Real-time Operations Dashboard",
      outputs: ["Structured Order Payload", "Quality Note Audit Trail", "Workflow Status Updates"]
    },
    highlights: [
      "Eliminates manual form filling via conversational order creation",
      "Instant extraction of material specs, quantities, and delivery deadlines",
      "Live deployment on Lovable platform"
    ]
  },
  {
    id: "skyrunner",
    name: "SkyRunner",
    tagline: "2D Platformer Engine & Exploration Game built with Godot & GDScript",
    category: "GAMES_WEB",
    categoryName: "Interactive Systems & Game Engine",
    problem: "Building a responsive 2D platformer requires custom GDScript player physics, collectible collision handling, level progression, high-score tracking, and browser WebGL optimization.",
    solution: "Developed SkyRunner in Godot Engine using GDScript. Features 2D exploration-based levels, collectible coin tracking (`coin.gd`), local high-score saving (`high_scores.gd`), animated player state machines (`player.gd`), and an HTML5 WebGL export hosted on GitHub Pages.",
    builtDetails: [
      "Custom player character controller in GDScript (`player.gd`) with responsive jump & movement physics",
      "Collectible coin logic (`coin.gd`) updating real-time score counters during exploration",
      "Local high-score tracking & disk persistor (`high_scores.gd`) for score saving",
      "Optimized WebGL HTML5 export deployed on GitHub Pages for instant browser playability"
    ],
    techStack: ["Godot Engine", "GDScript", "2D Physics", "WebGL HTML5", "GitHub Pages"],
    githubUrl: "https://github.com/adithhn12/SkyRunner",
    liveUrl: "https://adithhn12.github.io/SkyRunner/",
    featured: true,
    metrics: [
      { label: "Engine", value: "Godot Engine" },
      { label: "Language", value: "GDScript (player.gd, coin.gd)" },
      { label: "Export Target", value: "Browser WebGL (GitHub Pages)" }
    ],
    architecture: {
      inputs: ["Keyboard Controls", "TileMap Collisions"],
      coreEngine: "Godot 2D Physics Loop -> GDScript Character & Collectible Logic -> High Score Saver",
      outputs: ["Rendered WebGL Canvas (60FPS)", "Collectible State", "Local High Scores"]
    },
    highlights: [
      "Playable directly in any modern web browser via WebGL export",
      "Local high-score tracking and persistent save system",
      "Hosted live on GitHub Pages"
    ],
    codeSnippet: {
      language: "gdscript",
      title: "player.gd",
      code: `extends CharacterBody2D

const SPEED = 220.0
const JUMP_VELOCITY = -400.0
const GRAVITY = 980.0

var double_jump_available = true

func _physics_process(delta):
	if not is_on_floor():
		velocity.y += GRAVITY * delta
	else:
		double_jump_available = true

	if Input.is_action_just_pressed("ui_accept"):
		if is_on_floor():
			velocity.y = JUMP_VELOCITY
		elif double_jump_available:
			velocity.y = JUMP_VELOCITY * 0.85
			double_jump_available = false

	var direction = Input.get_axis("ui_left", "ui_right")
	if direction:
		velocity.x = move_toward(velocity.x, direction * SPEED, 25.0)
	else:
		velocity.x = move_toward(velocity.x, 0, 30.0)

	move_and_slide()`
    }
  },
  {
    id: "retrosneaks",
    name: "RetroSneaks",
    tagline: "Modern Sneaker E-Commerce Website with LocalStorage Auth, Cart & UPI Checkout",
    category: "GAMES_WEB",
    categoryName: "Web Development & E-Commerce",
    problem: "Creating a fast e-commerce platform requires seamless sneaker collection browsing, client-side session management, persistent cart updates, and direct UPI/QR payment flows.",
    solution: "Engineered RetroSneaks using semantic HTML5, CSS3, and vanilla JavaScript. Features sneaker collections (Travis Scott, Nike Dunks, Air Jordans, Air Force 1, Adidas), client-side user authentication stored in LocalStorage, cart management, and a dedicated checkout flow with UPI/QR payment integration.",
    builtDetails: [
      "Curated sneaker collections: Travis Scott, Nike Dunks, Air Jordans, Air Force 1, and Adidas",
      "Client-side user registration, login, and session management using browser LocalStorage",
      "Interactive cart drawer (quantity adjustment, subtotal calculation, item deletion) saved via LocalStorage",
      "Dedicated checkout flow requiring authenticated session before redirecting to UPI/QR payment page"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript (ES6+)", "LocalStorage API", "UPI Payment Flow"],
    githubUrl: "https://github.com/adithhn12/RetroSneaks",
    liveUrl: "https://retrosneaks.site.je",
    featured: false,
    metrics: [
      { label: "Collections", value: "Jordans, Dunks, Yeezy, Travis Scott" },
      { label: "Session Store", value: "Browser LocalStorage API" },
      { label: "Live Domain", value: "retrosneaks.site.je" }
    ],
    architecture: {
      inputs: ["Catalog Selection", "User Auth Credentials", "Cart Modifications"],
      coreEngine: "Vanilla DOM Engine -> LocalStorage Session & Cart Manager -> UPI Checkout Router",
      outputs: ["Zero-Latency Catalog Views", "Persisted User Sessions", "UPI / QR Payment Page"]
    },
    highlights: [
      "Zero framework overhead with pure vanilla JavaScript",
      "LocalStorage session management for authentication and cart state",
      "Integrated UPI/QR code payment checkout screen"
    ]
  }
];
