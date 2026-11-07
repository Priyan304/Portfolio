// Project content lives here so descriptions, status labels, and links are easy to update.
export const projects = [
  {
    id: 'vault', title: 'Vault', category: 'Full-stack development / Knowledge management', filters: ['software', 'ai'], featured: true,
    tagline: 'A home for everything worth keeping.', status: 'In development', preview: 'vault',
    summary: 'A local-first knowledge and resource manager exploring structured organization, search, and AI-assisted retrieval.',
    problem: 'Useful notes, links, and resources are easy to collect and hard to find again. Vault explores how to organize that information without losing control over sensitive data.',
    approach: 'A React and Vite interface with Supabase authentication and data management. The data model organizes profiles, resources, tags, and resource-tag relationships with Row Level Security policies.',
    details: ['Resource organization and tagging.', 'Exploring embeddings, RAG, and local language models.', 'Investigating a hybrid approach: keep sensitive data local and use external models for selected tasks.'],
    stack: ['React', 'Vite', 'JavaScript', 'Supabase', 'SQL', 'Ollama', 'Qwen', 'Nomic Embeddings', 'Gemini API'],
    note: 'In development and experimentation. Local AI and hybrid retrieval are exploration areas.', repo: 'https://github.com/Priyan304/Vault'
  },
  {
    id: 'pera', title: 'PerA — Lonely Companion', category: 'Conversational AI / Human–computer interaction', filters: ['ai', 'software'], featured: true,
    tagline: 'An AI companion that brings conversations to life.', status: 'Experimental', preview: 'pera',
    summary: 'Conversational AI meets an animated virtual character, exploring more expressive and personalized interactions.',
    problem: 'Text alone leaves a lot of room to explore in human–AI interaction. PerA experiments with a conversational interface that also has visual expression and continuity.',
    approach: 'A Python backend connects AI interactions and memory-management logic to a JavaScript Live2D character interface. The project explores voice interaction and a mix of local language models and external AI APIs.',
    details: ['An animated Live2D virtual character.', 'Memory-management experiments for conversational continuity.', 'Frontend and backend integration, with voice-enabled interaction under exploration.'],
    stack: ['Python', 'HTML', 'CSS', 'JavaScript', 'Live2D Cubism', 'Ollama', 'Gemini API'],
    note: 'Ongoing development and experimentation. A virtual interaction project with no claimed clinical benefits or measured mental-health outcomes.', repo: 'https://github.com/Priyan304/Lonely-companion'
  },
  {
    id: 'flood', title: 'Urban Flood Analysis', category: 'Artificial intelligence / Climate resilience', filters: ['ai'], featured: true,
    tagline: 'Looking at urban resilience through a different lens.', status: 'Hackathon prototype', preview: 'flood',
    summary: 'An urban flood prediction prototype exploring AI-assisted interpretation of map and satellite imagery.',
    problem: 'Disaster preparedness depends on understanding environmental conditions. This project investigates how visual and geographical information could support urban flood analysis.',
    approach: 'Experimenting with Python, geospatial imagery, and Gemini API capabilities to interpret flood-related visual information and explore applications for climate resilience.',
    details: ['AI-assisted image analysis of map or satellite information.', 'Exploring environmental context for disaster preparedness.', 'Investigating the limits of generative AI for this use case.'],
    stack: ['Python', 'Gemini API', 'Geospatial imagery', 'AI-assisted image analysis'],
    note: 'Hackathon prototype. It is not a validated forecasting system or a production-ready disaster warning service.'
  },
  {
    id: 'misaki', title: 'Misaki', category: 'Local AI / Privacy-conscious computing', filters: ['ai'], featured: true,
    tagline: 'Exploring AI that runs closer to your data.', status: 'Currently developing', preview: 'misaki',
    summary: 'An evolving local AI project, also described as Local Mind, exploring locally controlled language-model workflows.',
    problem: 'Working with personal information raises questions about where AI runs and how applications interact with models. Misaki is my space to investigate those questions.',
    approach: 'Exploring local inference, model configuration, and application integration with Python and Ollama. The architecture and features are evolving through experiments.',
    details: ['Experimenting with locally hosted language models.', 'Investigating privacy-conscious AI workflows.', 'Connecting local model capabilities to useful application ideas.'],
    stack: ['Python', 'Ollama', 'Local language models', 'AI APIs', 'Git', 'GitHub'],
    note: 'Currently developing. Features and architecture are exploratory; no performance benchmarks or completed deployment are claimed.'
  },
  {
    id: 'quackathon', title: 'Quackathon', category: 'AI-assisted development / Hackathon', filters: ['software', 'ai'],
    tagline: 'Connecting design context, memory, and code generation.', status: 'Hackathon project',
    summary: 'Sentient Workspace: a prototype orchestration pipeline that turns reference websites and user constraints into memory-backed generation prompts.',
    problem: 'AI coding workflows can lose track of design specifications and architectural constraints between steps. This project explores keeping that context available during generation.',
    approach: 'A Next.js interface sends prompts to a Python FastAPI orchestrator. A TypeScript MCP service scrapes a reference URL with Firecrawl and analyzes it with Gemini. Design notes and user constraints go into Parcle Memory, then retrieved context is combined into a prompt for Enter CLI.',
    details: ['Separate frontend, orchestrator, and MCP perception service.', 'Project-specific memory namespaces for design and architecture context.', 'Scrape validation and a feedback-aware design-analysis tool in the MCP service.'],
    stack: ['TypeScript', 'Python', 'Next.js', 'React', 'Tailwind CSS', 'FastAPI', 'MCP', 'Firecrawl', 'Gemini', 'Parcle Memory', 'Enter CLI'],
    note: 'A hackathon integration prototype connecting several external services. The pipeline is experimental and depends on service credentials and local configuration.', repo: 'https://github.com/RehaanJohn/Quackathon'
  },
  {
    id: 'synapse', title: 'Synapse Agents', category: 'AI agents / Distributed systems', filters: ['ai', 'software'],
    tagline: 'Exploring how agents reason, execute, and audit together.', status: 'Experimental project',
    summary: 'A multi-agent prototype connecting reasoning, execution, and audit agents with peer messaging and testnet infrastructure.',
    problem: 'An autonomous workflow needs ways to divide responsibilities, communicate decisions, and track execution. Synapse explores these concerns across three distinct agents.',
    approach: 'Python agents ARIA, APEX, and AIDEN divide reasoning, execution, and audit responsibilities. The repository includes AXL peer messaging, KeeperHub integration, 0G compute and memory experiments, Solidity registry and NFT contracts, and a Next.js dashboard.',
    details: ['Separates reasoning, execution, and audit roles across agents.', 'Includes a Go-based AXL networking layer and Python integrations, with local messaging fallbacks.', 'Provides a dashboard and smart contracts for exploring agent activity and registration. Some dashboard data is illustrative.'],
    stack: ['Python', 'TypeScript', 'Next.js', 'React', 'Flask', 'Go', 'Solidity', 'Hardhat', 'AXL', 'KeeperHub', '0G'],
    note: 'An experimental implementation with simulated execution paths, mock inference fallbacks, and local memory fallbacks. These support development and demonstrations; they do not establish successful on-chain execution or production readiness.', repo: 'https://github.com/Nixon-CSE/synapse-agents'
  },
  {
    id: 'herdle', title: 'Herdle', category: 'Software / Social impact', filters: ['software'],
    tagline: 'Thinking about livestock safety through technology.', status: 'Project concept',
    summary: 'A concept exploring practical applications of software and technology to livestock safety challenges.',
    problem: 'Livestock-related safety challenges offer an opportunity to investigate how practical technology could help.',
    approach: 'Exploring the problem space and potential applications of software. Implementation details and the final technology stack have not been specified.',
    details: ['Livestock safety as a real-world problem area.', 'Practical, socially useful technology as a design goal.'],
    stack: [], note: 'At the concept stage, with the implementation and technology choices still to be defined.'
  },
  {
    id: 'geneius', title: 'Geneius Society', category: 'Java development / Educational technology', filters: ['software'],
    tagline: 'Making academic resources easier to find.', status: 'Student project',
    summary: 'A question paper bank application built with Java Swing to organize academic papers and improve access to learning resources.',
    problem: 'Students and juniors benefit from having past question papers organized in an accessible place.',
    approach: 'A Java Swing application focused on organizing and accessing question paper resources for an educational use case.',
    details: ['A desktop interface built with Java Swing.', 'Organization and access to academic question papers.'],
    stack: ['Java', 'Java Swing'], note: 'A student application focused on organizing academic resources.'
  },
  {
    id: 'rc-car', title: 'AI RC Car', category: 'Embedded systems / Robotics', filters: ['hardware'],
    tagline: 'Taking software off the screen.', status: 'Experimental project',
    summary: 'A hardware experiment exploring software and embedded programming in a remotely controlled car.',
    problem: 'A remote-controlled car provides a hands-on way to understand how software connects to physical systems.',
    approach: 'Exploring ESP32, Arduino, and embedded programming in a robotics context.',
    details: ['Software and hardware integration.', 'Microcontroller programming and hands-on robotics experimentation.'],
    stack: ['ESP32', 'Arduino', 'Embedded programming'], note: 'A hardware experiment focused on embedded programming and remote control. AI integration remains an exploration area.'
  },
  {
    id: 'ornithopter', title: '3D Ornithopter', category: '3D design / Engineering', filters: ['hardware'],
    tagline: 'A little engineering inspiration from nature.', status: 'Design exploration',
    summary: 'An engineering-oriented exploration of an ornithopter: a flying machine inspired by the flapping motion of birds.',
    problem: 'Bird-inspired movement offers an interesting intersection of physical design, engineering concepts, and experimentation.',
    approach: 'Exploring 3D design and engineering concepts around a flapping-wing machine, with Blender and related design tools where applicable.',
    details: ['Bird-inspired physical design.', 'An intersection of 3D modeling, mechanics, and experimentation.'],
    stack: ['Blender', '3D design'], note: 'A design and engineering exploration of bird-inspired movement.'
  }
];

export const skillGroups = [
  ['Programming languages', ['Java', 'Python', 'C', 'C++', 'SQL', 'JavaScript']],
  ['AI & machine learning', ['TensorFlow Lite', 'Ultralytics YOLO', 'NumPy', 'Pandas', 'SciPy', 'Jupyter', 'Computer vision', 'Generative AI', 'RAG concepts']],
  ['Web & applications', ['React', 'Vite', 'Node.js', 'Express.js', 'Supabase', 'Java Swing', 'Oracle APEX']],
  ['Cloud & DevOps', ['AWS fundamentals', 'Amazon S3', 'Git & GitHub', 'Vercel', 'Linux', 'Cloud deployment', 'CI/CD learning']],
  ['Data & AI infrastructure', ['Oracle SQL', 'Supabase', 'Vector embeddings', 'Similarity search', 'Ollama', 'Nomic Embeddings', 'Qwen', 'Gemini API']],
  ['Game development & 3D', ['Unreal Engine', 'Blender']],
  ['Hardware & embedded', ['Arduino', 'ESP32', 'Microcontrollers', 'Embedded programming']]
];
