import React, { useRef, useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// === CONFIGURE YOUR GITHUB REPO INFO HERE ===
const githubRepoOwner = "primate686293297679030"; // <-- change this
const githubRepoName = "HamraGrodor";    // <-- change this
const githubDefaultBranch = "main";      // or "master" or your branch

// === PROJECT DATA: Each project now has 'introText' and 'introImage' fields ===
const projects = [
  {
    title: "Project One",
    image: "/hgr.png",
    description: "HamraGrodor, sort of a wack a mole game that was a part of my LIA",
       introText:[ 
"  I worked on this project for 4 months and it was a 100% solo project besides creation of most graphics ",
"Things worth to mention is:",
" That the project was organized within Unitys UI framework",
"And then combined with this: float currentAspect = (float)Screen.width / Screen.height;",
"So that the game can be played on different phones that varies in screensizes  ",
"",
"It contains animations that mostly utilize the DOtween library.",
"It has a save function for your different scores, by using unityprefs",
"It has 8 buffs 4 which give a negative effect and 4 which gives a positive effect.",
"The sun is a shader I assembled with the help of ChatGPT.",

       ],introImage: "/project1-header.jpg", // Optional, can be omitted
     presentations: [
      {
        videoSrc: "/MyVideo_12.mp4",
        label: "PulsatingTouch",
        codeFiles: [
          {
            githubFilePath: "Assets/Scripts/GameManager.cs",
            githubLine: "351-415",
            language: "csharp",
            label: "GameManager.cs (Lines 351-415)"
          }
        ]
      },
      {
        videoSrc: "/MyVideo_13.mp4",
        label: "BubbleAnimation",
        codeFiles: [
          {
            githubFilePath: "Assets/Scripts/GameAI.cs",
            githubLine: "10-25",
            language: "csharp",
            label: "GameAI.cs (Lines 10-25)"
          },
          {
            githubFilePath: "Assets/Scripts/GameManager.cs",
            githubLine: "400-415",
            language: "csharp",
            label: "GameManager.cs (Lines 400-415)"
          }
        ]
      }
    ]
  },
   {
    title: "",
    image: "_Z75OQ.png",
    description: "Game Project 2",
    introText: "Gameproject 3 at futuregames",
    // introImage: "/project2-header.jpg", // You can add this if you have an image
    presentations: [
      {
        videoSrc: "/MyVideo_13.mp4",
        label: "Physics",
        codeFiles: [
          {
            githubFilePath: "Assets/Scripts/AnotherManager.cs",
            githubLine: 22,
            language: "csharp",
            label: "AnotherManager.cs (Line 22)"
          }
        ]
      }
    ]
  },
  {
    title: "",
    image: "/11hQRA.png",
    description: "Game Project 3",
    introText: "Gameproject 3 at futuregames",
    // introImage: "/project2-header.jpg", // You can add this if you have an image
    presentations: [
      {
        videoSrc: "/MyVideo_13.mp4",
        label: "Physics",
        codeFiles: [
          {
            githubFilePath: "Assets/Scripts/AnotherManager.cs",
            githubLine: 22,
            language: "csharp",
            label: "AnotherManager.cs (Line 22)"
          }
        ]
      }
    ]
  },
 
   {
    title: "",
    image: "/swa_UZ.png",
    description: "Game Project 4.",
    introText: "Gameproject 3 at futuregames",
    // introImage: "/project2-header.jpg", // You can add this if you have an image
    presentations: [
      {
        videoSrc: "/MyVideo_13.mp4",
        label: "Physics",
        codeFiles: [
          {
            githubFilePath: "Assets/Scripts/AnotherManager.cs",
            githubLine: 22,
            language: "csharp",
            label: "AnotherManager.cs (Line 22)"
          }
        ]
      }
    ]
  },
   {
    title: "",
    image: "/ecsSpacegame.png",
    description: "Unity Entity Component System.",
    introText: "Gameproject 3 at futuregames",
    // introImage: "/project2-header.jpg", // You can add this if you have an image
    presentations: [
      {
        videoSrc: "/MyVideo_13.mp4",
        label: "Physics",
        codeFiles: [
          {
            githubFilePath: "Assets/Scripts/AnotherManager.cs",
            githubLine: 22,
            language: "csharp",
            label: "AnotherManager.cs (Line 22)"
          }
        ]
      }
    ]
  }
];

// --- Utility functions ---
function getGitHubBlobUrl({ githubFilePath, githubLine }) {
  if (!githubFilePath) return null;
  let url = `https://github.com/${githubRepoOwner}/${githubRepoName}/blob/${githubDefaultBranch}/${githubFilePath}`;
  if (githubLine) {
    if (typeof githubLine === "number" || /^\d+$/.test(githubLine)) {
      url += `#L${githubLine}`;
    } else if (typeof githubLine === "string" && /^\d+-\d+$/.test(githubLine)) {
      const [start, end] = githubLine.split("-");
      url += `#L${start}-L${end}`;
    }
  }
  return url;
}
function getRawGitHubUrl({ githubFilePath }) {
  if (!githubFilePath) return null;
  return `https://raw.githubusercontent.com/${githubRepoOwner}/${githubRepoName}/${githubDefaultBranch}/${githubFilePath}`;
}
function getHighlightLines(githubLine) {
  if (!githubLine) return [];
  if (typeof githubLine === "number" || /^\d+$/.test(githubLine)) {
    return [parseInt(githubLine, 10)];
  }
  if (typeof githubLine === "string" && /^\d+-\d+$/.test(githubLine)) {
    const [start, end] = githubLine.split("-").map(Number);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  return [];
}
function getLinesFromCode(code, start, end) {
  const lines = code.split('\n');
  return lines.slice(start - 1, end).join('\n');
}


// --- Project Presentation Card ---
function ProjectPresentation({ project, onBack }) {
  const [presentationIndex, setPresentationIndex] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [codeIndex, setCodeIndex] = useState(0);
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [loadedSnippets, setLoadedSnippets] = useState([]);
  const [codeErrors, setCodeErrors] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const videoRef = useRef(null);

  const presentation = project.presentations[presentationIndex];
  const codeFiles = presentation.codeFiles;

  useEffect(() => {
    setShowCode(false);
    setCodeIndex(0);
    setIsPlaying(false);
    setIsLooping(false);
    setCodeSnippets(Array(codeFiles.length).fill(""));
    setLoadedSnippets(Array(codeFiles.length).fill(false));
    setCodeErrors(Array(codeFiles.length).fill(null));
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    // eslint-disable-next-line
  }, [presentationIndex, codeFiles.length]);

  useEffect(() => {
    if (!showCode) return;
    if (!loadedSnippets[codeIndex]) {
      const codeMeta = codeFiles[codeIndex];
      const url = getRawGitHubUrl(codeMeta);
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Code file not found on GitHub.");
          return res.text();
        })
        .then((text) => {
          setCodeSnippets((prev) => {
            const next = [...prev];
            next[codeIndex] = text;
            return next;
          });
          setLoadedSnippets((prev) => {
            const next = [...prev];
            next[codeIndex] = true;
            return next;
          });
          setCodeErrors((prev) => {
            const next = [...prev];
            next[codeIndex] = null;
            return next;
          });
        })
        .catch((err) => {
          setCodeErrors((prev) => {
            const next = [...prev];
            next[codeIndex] = err.message;
            return next;
          });
        });
    }
    // eslint-disable-next-line
  }, [showCode, codeIndex, codeFiles]);

  // Video and code navigation handlers
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleLoop = () => {
    if (!videoRef.current) return;
    const newLoop = !isLooping;
    videoRef.current.loop = newLoop;
    setIsLooping(newLoop);
  };
  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  const nextCode = () => setCodeIndex((i) => (i + 1) % codeFiles.length);
  const prevCode = () => setCodeIndex((i) => (i - 1 + codeFiles.length) % codeFiles.length);

  // For line range display
  const currentCodeMeta = codeFiles[codeIndex];
  let codeToShow = codeSnippets[codeIndex] || "// Loading code…";
  let startLine = 1;
  if (typeof currentCodeMeta.githubLine === "string" && /^\d+-\d+$/.test(currentCodeMeta.githubLine)) {
    const [start, end] = currentCodeMeta.githubLine.split("-").map(Number);
    codeToShow = getLinesFromCode(codeToShow, start, end);
    startLine = start;
  } else if (typeof currentCodeMeta.githubLine === "number" || /^\d+$/.test(currentCodeMeta.githubLine)) {
    const line = Number(currentCodeMeta.githubLine);
    codeToShow = getLinesFromCode(codeToShow, line, line);
    startLine = line;
  }
  const currentGitHubBlobUrl = getGitHubBlobUrl(currentCodeMeta);

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "#181c1f" }}>
      <button
        onClick={onBack}
        style={{
          margin: "32px 0 0 0",
          padding: "8px 18px",
          borderRadius: "8px",
          background: "#272822",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontSize: "1.05em",
          fontWeight: "bold",
          boxShadow: "0 1px 4px #0002"
        }}
      >
        &larr; Back to projects
      </button>
      <div
        className="video-card"
        style={{
          background: "#23272e",
          borderRadius: "14px",
          boxShadow: "0 2px 24px #0008",
          maxWidth: "950px",
          width: "96vw",
          margin: "32px auto 0 auto",
          padding: 0,
          position: "relative"
        }}
      >
        {/* --- Intro Section: SHOWN ABOVE VIDEO PREVIEW --- */}
        {(project.introText || project.introImage) && (
          <div style={{ padding: "32px 24px 0 24px", textAlign: "center" }}>
            {project.introImage && (
              <img
                src={project.introImage}
                alt={project.title + " header"}
                style={{ maxWidth: 280, borderRadius: 10, marginBottom: 12 }}
              />
            )}
            {project.introText && (
  <div style={{ color: "#fff", fontSize: "1.15em", marginBottom: 12, textAlign: "left" }}>
    {Array.isArray(project.introText)
      ? project.introText.map((para, idx) => (
         <p key={idx} style={{ margin: "8px 0", minHeight: "1em" }}>{para}</p>
        ))
      : <div>{project.introText}</div>
    }
  </div>
)}
          </div>
        )}

        {/* Top bar with arrows/label */}
        <div
          className="video-top-bar"
          style={{
            background: "#23272e",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            borderBottom: "1px solid #343942",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px 24px",
            fontSize: "1.1em",
            gap: "24px"
          }}
        >
          <button
            onClick={() => setPresentationIndex((i) => (i - 1 + project.presentations.length) % project.presentations.length)}
            style={{ fontSize: "1.5em" }}
            aria-label="Previous presentation"
          >&larr;</button>
          <span style={{ color: "#fff" }}>
            <b>{project.title}</b>
            <span style={{ color: "#b2b2b2", fontWeight: 400, fontSize: "0.95em" }}>&nbsp;&ndash;&nbsp;{presentation.label}</span>
          </span>
          <button
            onClick={() => setPresentationIndex((i) => (i + 1) % project.presentations.length)}
            style={{ fontSize: "1.5em" }}
            aria-label="Next presentation"
          >&rarr;</button>
        </div>

        {/* Video */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#23272e" }}>
          <video
            ref={videoRef}
            width="640"
            height="360"
            src={presentation.videoSrc}
            controls={false}
            loop={isLooping}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            style={{ borderRadius: "10px", margin: "24px 0 0 0", boxShadow: "0 2px 8px #0005" }}
          />
        </div>
        <div className="video-bottom-bar" style={{ background: "#23272e", borderBottomLeftRadius: "14px", borderBottomRightRadius: "14px", borderTop: "1px solid #343942", display: "flex", alignItems: "center", justifyContent: "center", gap: "24px", padding: "16px 0", fontSize: "1.05em" }}>
          <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
          <button onClick={handleLoop}>{isLooping ? "Loop: On" : "Loop: Off"}</button>
          <button onClick={() => setShowCode((show) => !show)}>{showCode ? "Hide Code" : "Code"}</button>
        </div>
        {showCode && (
          <div className="code-block" style={{ width: "92vw", maxWidth: "900px", margin: "18px auto 0 auto", background: "#23272e", borderRadius: "8px", boxShadow: "0 2px 6px #0003", padding: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "4px", justifyContent: "space-between" }}>
                <div>
                  {codeFiles.length > 1 && (
                    <>
                      <button onClick={prevCode}>&larr;</button>
                      <span style={{ margin: "0 8px" }}>
                        {codeIndex + 1} / {codeFiles.length}
                      </span>
                      <button onClick={nextCode}>&rarr;</button>
                    </>
                  )}
                  <span style={{ marginLeft: 8, fontSize: "1em", color: "#b2b2b2" }}>{currentCodeMeta.label}</span>
                </div>
                {currentGitHubBlobUrl && (
                  <a href={currentGitHubBlobUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#4078c0", textDecoration: "underline", fontWeight: "bold" }}>
                    View on GitHub
                  </a>
                )}
              </div>
              {codeErrors[codeIndex] && (
                <div style={{ color: "red", marginBottom: 8 }}>{codeErrors[codeIndex]}</div>
              )}
              <div style={{ width: "100%", overflowX: "auto" }}>
                <SyntaxHighlighter
                  language={currentCodeMeta.language || "csharp"}
                  style={oneDark}
                  wrapLongLines={false}
                  showLineNumbers
                  startingLineNumber={startLine}
                  customStyle={{
                    minHeight: "120px",
                    fontSize: "1.08em",
                    background: "#23272e",
                    borderRadius: "8px"
                  }}
                >
                  {codeToShow}
                </SyntaxHighlighter>
              </div>
            </div>
        )}
      </div>
    </div>
  );
}

// --- Main Projects Menu ---
const Projects = () => {
  // null = menu, else index of selected project
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  return selectedProjectIndex !== null ? (
    <ProjectPresentation
      project={projects[selectedProjectIndex]}
      onBack={() => setSelectedProjectIndex(null)}
    />
  ) : (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "#181c1f", paddingTop: 32 }}>
      <h1 style={{ color: "#fff", marginBottom: "24px" }}>My Projects</h1>
      <div
        className="projects-menu"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "32px",
          justifyContent: "center"
        }}
      >
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="project-thumb-card"
            style={{
              width: 320,
              background: "#23272e",
              borderRadius: 14,
              boxShadow: "0 2px 12px #0006",
              padding: "24px 18px 18px 18px",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s"
            }}
            onClick={() => setSelectedProjectIndex(idx)}
          >
            <div style={{ fontWeight: "bold", color: "#fff", fontSize: "1.22em", marginBottom: 12 }}>{proj.title}</div>
            <img
              src={proj.image}
              alt={proj.title + " thumbnail"}
              style={{
                width: "100%",
                height: 175,
                objectFit: "cover",
                borderRadius: 10,
                marginBottom: 14,
                boxShadow: "0 2px 6px #0003"
              }}
            />
            <div style={{ color: "#b2b2b2", fontSize: "1em", minHeight: 54 }}>{proj.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;