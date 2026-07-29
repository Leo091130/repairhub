"use client";

import { useEffect, useMemo, useState } from "react";

const team = [
  "Yifan Han",
  "Machid Nasiri",
  "Sophie Poutanen",
  "Eaton Li",
  "Kian Sidhu",
  "Jeffrey Ren",
  "Leo Chen",
  "Shirley He",
];

const features = [
  {
    number: "01",
    icon: "▶",
    title: "Step-by-step guides",
    text: "Short, clear videos and interactive tutorials turn complicated repairs into doable steps.",
  },
  {
    number: "02",
    icon: "✦",
    title: "AI repair guidance",
    text: "Ask questions as you work and get support tailored to your product and skill level.",
  },
  {
    number: "03",
    icon: "⌁",
    title: "Search or scan",
    text: "Find the right guide by searching for your product or scanning its QR code.",
  },
  {
    number: "04",
    icon: "↗",
    title: "Progress & rewards",
    text: "Build a repair streak, earn badges, and unlock RepairHub Pro after 100 completed repairs.",
  },
];

const repairs = [
  {
    id: "headphones",
    name: "Fix a loose headphone jack",
    level: "BEGINNER",
    time: "15 MIN",
    icon: "🎧",
    tags: ["headphones", "audio", "jack", "wire"],
    intro: "Diagnose crackling audio and secure a loose 3.5 mm connection.",
    steps: ["Test the cable and audio source", "Clean the jack safely", "Secure and retest the connection"],
  },
  {
    id: "backpack",
    name: "Replace a backpack zipper pull",
    level: "BEGINNER",
    time: "10 MIN",
    icon: "🎒",
    tags: ["backpack", "bag", "zipper", "school"],
    intro: "Make a broken zipper easy to grip again with a simple replacement pull.",
    steps: ["Check the zipper slider", "Attach the new pull", "Test and tighten it"],
  },
  {
    id: "controller",
    name: "Clean a sticky game controller",
    level: "EASY",
    time: "20 MIN",
    icon: "🎮",
    tags: ["controller", "gaming", "buttons", "console"],
    intro: "Clean sticky buttons without damaging the electronics inside.",
    steps: ["Power off and unplug", "Clean around each button", "Dry fully and test"],
  },
  {
    id: "bike-chain",
    name: "Fix a slipped bike chain",
    level: "EASY",
    time: "12 MIN",
    icon: "🚲",
    tags: ["bike", "bicycle", "chain", "wheel"],
    intro: "Put a slipped chain back on and check that it moves smoothly.",
    steps: ["Move the bike to a safe position", "Guide the chain onto the gear", "Turn the pedal and inspect"],
  },
  {
    id: "phone-port",
    name: "Clean a phone charging port",
    level: "BEGINNER",
    time: "8 MIN",
    icon: "📱",
    tags: ["phone", "charging", "port", "cable"],
    intro: "Remove pocket lint safely so the charging cable can connect properly.",
    steps: ["Power the phone off", "Inspect with a bright light", "Clean gently and reconnect"],
  },
  {
    id: "shirt-button",
    name: "Sew on a missing shirt button",
    level: "BEGINNER",
    time: "10 MIN",
    icon: "🧵",
    tags: ["shirt", "clothing", "button", "sewing"],
    intro: "Learn a durable hand stitch that keeps a replacement button secure.",
    steps: ["Thread and knot the needle", "Align and stitch the button", "Tie off and test"],
  },
];

const STORAGE_KEY = "repairhub-demo-progress-v1";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedRepair, setSelectedRepair] = useState(repairs[0].id);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [watchProgress, setWatchProgress] = useState(0);
  const [watching, setWatching] = useState(false);
  const [watchedRepairs, setWatchedRepairs] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});
  const [completedRepairs, setCompletedRepairs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const activeRepair = repairs.find((repair) => repair.id === selectedRepair) ?? repairs[0];
  const activeSteps = completedSteps[activeRepair.id] ?? [];
  const allStepsDone = activeSteps.length === activeRepair.steps.length;
  const hasWatched = watchedRepairs.includes(activeRepair.id);
  const repairFinished = completedRepairs.includes(activeRepair.id);
  const repairTotal = 12 + completedRepairs.length;
  const stepTotal = Object.values(completedSteps).reduce((sum, steps) => sum + steps.length, 0);
  const xp = 240 + watchedRepairs.length * 10 + stepTotal * 5 + completedRepairs.length * 40;
  const badges = 4 + Math.floor(completedRepairs.length / 2);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!searchPerformed || !term) return repairs.slice(0, 3);
    return repairs.filter((repair) =>
      [repair.name, repair.level, ...repair.tags].join(" ").toLowerCase().includes(term),
    );
  }, [query, searchPerformed]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const progress = JSON.parse(saved);
        setWatchedRepairs(progress.watchedRepairs ?? []);
        setCompletedSteps(progress.completedSteps ?? {});
        setCompletedRepairs(progress.completedRepairs ?? []);
      }
    } catch {
      // A blocked or malformed local value should never stop the demo.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ watchedRepairs, completedSteps, completedRepairs }),
    );
  }, [hydrated, watchedRepairs, completedSteps, completedRepairs]);

  useEffect(() => {
    setWatching(false);
    setWatchProgress(watchedRepairs.includes(activeRepair.id) ? 100 : 0);
  }, [activeRepair.id, watchedRepairs]);

  useEffect(() => {
    if (!watching) return;
    const timer = window.setInterval(() => {
      setWatchProgress((current) => {
        const next = Math.min(current + 10, 100);
        if (next === 100) {
          setWatching(false);
          setWatchedRepairs((items) =>
            items.includes(activeRepair.id) ? items : [...items, activeRepair.id],
          );
          setNotice("Video watched — you earned +10 XP!");
        }
        return next;
      });
    }, 280);
    return () => window.clearInterval(timer);
  }, [watching, activeRepair.id]);

  const startRepair = (repairId = selectedRepair) => {
    const repair = repairs.find((item) => item.id === repairId) ?? repairs[0];
    setSelectedRepair(repair.id);
    setGuideOpen(true);
    setNotice(`Guide ready: ${repair.name}`);
    document.getElementById("try-it")?.scrollIntoView({ behavior: "smooth" });
  };

  const runSearch = () => {
    setSearchPerformed(true);
    setGuideOpen(false);
    const term = query.trim().toLowerCase();
    const count = term
      ? repairs.filter((repair) =>
          [repair.name, repair.level, ...repair.tags].join(" ").toLowerCase().includes(term),
        ).length
      : repairs.length;
    setNotice(term ? `${count} repair guide${count === 1 ? "" : "s"} found for “${query.trim()}”.` : "Showing popular beginner repairs.");
  };

  const searchExample = (term: string) => {
    setQuery(term);
    setSearchPerformed(true);
    setGuideOpen(false);
    setNotice(`Showing repair guides for “${term}”.`);
  };

  const toggleStep = (stepIndex: number) => {
    if (repairFinished) return;
    setCompletedSteps((current) => {
      const steps = current[activeRepair.id] ?? [];
      const checked = steps.includes(stepIndex);
      return {
        ...current,
        [activeRepair.id]: checked ? steps.filter((step) => step !== stepIndex) : [...steps, stepIndex],
      };
    });
    if (!activeSteps.includes(stepIndex)) setNotice("Step complete — you earned +5 XP!");
  };

  const completeRepair = () => {
    if (!hasWatched || !allStepsDone || repairFinished) return;
    setCompletedRepairs((items) => [...items, activeRepair.id]);
    setNotice("Repair complete! +1 repair and +40 XP. Great work!");
  };

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="RepairHub home">
          <span className="brand-mark"><i /><b>R</b></span>
          <span>Repair<span>Hub</span></span>
        </a>
        <button
          className="menu-button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#problem" onClick={() => setMenuOpen(false)}>The problem</a>
          <a href="#solution" onClick={() => setMenuOpen(false)}>Our solution</a>
          <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
          <a href="#team" onClick={() => setMenuOpen(false)}>Team</a>
        </div>
        <button className="nav-cta" onClick={() => startRepair()}>Try RepairHub <span>↗</span></button>
      </nav>

      <section className="hero" id="top">
        <div className="hero-noise" />
        <div className="hero-copy">
          <div className="eyebrow"><span>●</span> Built by youth, for youth</div>
          <h1>DON&apos;T<br />REPLACE IT.<br /><em>REPAIR IT.</em></h1>
          <p>
            The hands-on learning app that gives young people the confidence,
            skills, and support to fix the products they use every day.
          </p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={() => startRepair()}>Start your first repair <span>↗</span></button>
            <a className="text-link" href="#solution">See how it works <span>↓</span></a>
          </div>
        </div>

        <div className="hero-visual" aria-label="RepairHub app preview">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="sticker sticker-one">FIX IT!</div>
          <div className="sticker sticker-two">+1 SKILL</div>
          <div className="tool tool-one">⌕</div>
          <div className="tool tool-two">✦</div>
          <div className="phone">
            <div className="phone-top"><span>9:41</span><b>RepairHub</b><span>•••</span></div>
            <div className="phone-content">
              <small>GOOD AFTERNOON</small>
              <h3>What will you fix today?</h3>
              <div className="mini-search">Search a product <span>⌁</span></div>
              <div className="phone-card">
                <div className="phone-card-art">🎧<span>⌕</span></div>
                <small>CONTINUE REPAIR</small>
                <strong>Headphone jack</strong>
                <div className="mini-progress"><i /></div>
                <span>3 of 5 steps</span>
              </div>
              <div className="phone-stats">
                <div><b>12</b><small>REPAIRS</small></div>
                <div><b>4</b><small>BADGES</small></div>
                <div><b>7</b><small>DAY STREAK</small></div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-ticker" aria-hidden="true">
          <span>LEARN IT</span><b>✦</b><span>FIX IT</span><b>✦</b><span>OWN IT</span><b>✦</b><span>REPEAT</span><b>✦</b>
        </div>
      </section>

      <section className="hmw section-pad" id="problem">
        <div className="section-label"><span>01</span> Our challenge</div>
        <div className="hmw-grid">
          <h2>HOW MIGHT WE...</h2>
          <blockquote>
            empower young people to understand and repair the products they use
            by creating more <mark>sustainable</mark>, <mark>customizable</mark>,
            and <mark>adaptable</mark> experiences?
          </blockquote>
        </div>
      </section>

      <section className="problem section-pad">
        <div className="problem-number">13<span>—</span>18<small>THE AGE GROUP<br />WE&apos;RE DESIGNING FOR</small></div>
        <div className="problem-copy">
          <div className="section-label light"><span>02</span> The problem</div>
          <h2>USE IT.<br />BREAK IT.<br /><em>THROW IT AWAY?</em></h2>
          <p>
            Many young people don&apos;t have the knowledge, tools, or trusted
            support to repair everyday products. Items that could be fixed get
            replaced instead—creating unnecessary waste and a missed chance to
            build valuable hands-on skills.
          </p>
          <div className="consequence-row">
            <div><span>01</span><b>More waste</b><p>Repairable products end up in landfills.</p></div>
            <div><span>02</span><b>Lost skills</b><p>Youth miss practical, confidence-building experiences.</p></div>
            <div><span>03</span><b>Environmental harm</b><p>More pollution, extraction, and resource depletion.</p></div>
          </div>
        </div>
      </section>

      <section className="solution section-pad" id="solution">
        <div className="section-label"><span>03</span> Our solution</div>
        <div className="solution-heading">
          <h2>MEET <em>REPAIRHUB.</em></h2>
          <p>Everything a young fixer needs—in one encouraging, easy-to-use place.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <div className="feature-meta"><span>{feature.number}</span><i>{feature.icon}</i></div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="try-section section-pad" id="try-it">
        <div className="try-copy">
          <div className="section-label light"><span>04</span> Try the idea</div>
          <h2>FIND YOUR<br />NEXT <em>FIX.</em></h2>
          <p>Search by product, open a video guide, complete each step, and watch your RepairHub rewards grow.</p>
          <div className="search-box">
            <label htmlFor="repair-search">What do you want to repair?</label>
            <div>
              <input
                id="repair-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runSearch()}
                placeholder="e.g. headphones, backpack..."
              />
              <button aria-label="Search repairs" onClick={runSearch}>↗</button>
            </div>
          </div>
          <div className="search-examples" aria-label="Example searches">
            <span>TRY:</span>
            {["headphones", "backpack", "bike", "phone"].map((term) => (
              <button key={term} onClick={() => searchExample(term)}>{term}</button>
            ))}
          </div>
          <button className="scan-button" onClick={() => setNotice("QR scanner opened — try searching “controller” for this demo.")}>
            <span>⌗</span> Scan a QR code
          </button>
          {notice && <div className="notice" role="status">{notice}</div>}
        </div>
        <div className="repair-list">
          <div className="results-heading">
            <p className="list-label">{searchPerformed ? "SEARCH RESULTS" : "POPULAR FIRST REPAIRS"}</p>
            <span>{results.length} guides</span>
          </div>
          {results.map((repair) => (
            <button
              className={`repair-item ${selectedRepair === repair.id && guideOpen ? "selected" : ""}`}
              key={repair.id}
              onClick={() => startRepair(repair.id)}
            >
              <i>{repair.icon}</i>
              <span>
                <b>{repair.name}</b>
                <small>{repair.level} · {repair.time}</small>
                <em>{repair.intro}</em>
              </span>
              <strong>↗</strong>
            </button>
          ))}
          {results.length === 0 && (
            <div className="search-empty">
              <b>No exact match yet.</b>
              <p>Try “headphones”, “bike”, “phone”, “controller”, “shirt”, or “backpack”.</p>
            </div>
          )}
        </div>

        {guideOpen && (
          <article className="guide-panel" aria-live="polite">
            <div className="guide-video">
              <div className={`video-stage ${watching ? "playing" : ""}`}>
                <span className="video-icon">{activeRepair.icon}</span>
                <div className="video-rings"><i /><i /><i /></div>
                <button
                  className="play-button"
                  onClick={() => !hasWatched && setWatching(!watching)}
                  disabled={hasWatched}
                  aria-label={hasWatched ? "Video watched" : watching ? "Pause demo video" : "Play demo video"}
                >
                  {hasWatched ? "✓" : watching ? "Ⅱ" : "▶"}
                </button>
                <div className="video-caption">
                  <span>REPAIR VIDEO · {activeRepair.time}</span>
                  <b>{activeRepair.name}</b>
                </div>
              </div>
              <div className="video-progress"><i style={{ width: `${watchProgress}%` }} /></div>
              <div className="video-status">
                <span>{hasWatched ? "Watched · +10 XP earned" : watching ? `Watching… ${watchProgress}%` : "Watch the demo to earn +10 XP"}</span>
                <b>{watchProgress}%</b>
              </div>
            </div>

            <div className="guide-steps">
              <div className="guide-title">
                <div>
                  <small>INTERACTIVE GUIDE</small>
                  <h3>{activeRepair.name}</h3>
                </div>
                <span>{activeSteps.length}/{activeRepair.steps.length} steps</span>
              </div>
              <p>{activeRepair.intro}</p>
              <div className="step-checklist">
                {activeRepair.steps.map((step, index) => {
                  const checked = activeSteps.includes(index) || repairFinished;
                  return (
                    <button
                      key={step}
                      className={checked ? "checked" : ""}
                      onClick={() => toggleStep(index)}
                      disabled={repairFinished}
                    >
                      <i>{checked ? "✓" : index + 1}</i>
                      <span>{step}<small>{checked ? "+5 XP earned" : "Tap when complete"}</small></span>
                    </button>
                  );
                })}
              </div>
              <button
                className={`complete-button ${repairFinished ? "finished" : ""}`}
                disabled={!hasWatched || !allStepsDone || repairFinished}
                onClick={completeRepair}
              >
                {repairFinished ? "Repair completed ✓" : "Complete this repair"}
                <span>{repairFinished ? "+1 saved" : "+40 XP · +1 repair"}</span>
              </button>
              {!repairFinished && (!hasWatched || !allStepsDone) && (
                <small className="unlock-hint">Watch the video and finish all three steps to unlock completion.</small>
              )}
            </div>
          </article>
        )}
      </section>

      <section className="reward section-pad">
        <div className="reward-copy">
          <div className="section-label"><span>05</span> The big reward</div>
          <h2>100 REPAIRS.<br /><em>PRO UNLOCKED.</em></h2>
          <p>
            RepairHub rewards commitment. Complete 100 repairs to unlock the Pro
            experience—ad-free learning plus one-on-one meetings with an
            experienced community member.
          </p>
          <div className="pro-perks"><span>✓ No ads</span><span>✓ 1:1 expert support</span><span>✓ Pro status</span></div>
        </div>
        <div className="progress-card">
          <div className="reward-live"><span>● LIVE PROGRESS</span><small>Updates as you complete the guide above</small></div>
          <div className="reward-stats">
            <div><b>{repairTotal}</b><span>REPAIRS</span></div>
            <div><b>{xp}</b><span>XP EARNED</span></div>
            <div><b>{badges}</b><span>BADGES</span></div>
          </div>
          <div className="progress-top"><span>YOUR PRO JOURNEY</span><b>{repairTotal} / 100</b></div>
          <div className="big-progress"><i style={{ width: `${Math.min(repairTotal, 100)}%` }} /></div>
          <div className="progress-milestones"><span className="done">●<small>START</small></span><span>●<small>25</small></span><span>●<small>50</small></span><span>●<small>75</small></span><span className="pro">★<small>PRO</small></span></div>
          <div className="progress-message"><b>{Math.max(100 - repairTotal, 0)} repairs to go</b><span>Every video, step, and completed repair now moves your account forward.</span></div>
        </div>
      </section>

      <section className="impact section-pad" id="impact">
        <div className="impact-head">
          <div className="section-label light"><span>06</span> The impact</div>
          <h2>SMALL FIXES.<br /><em>REAL CHANGE.</em></h2>
        </div>
        <div className="impact-path">
          <div><span>01</span><b>Youth learn to repair</b><p>Practical knowledge replaces uncertainty.</p></div>
          <i>→</i>
          <div><span>02</span><b>Products last longer</b><p>Repair becomes the first choice, not the last.</p></div>
          <i>→</i>
          <div><span>03</span><b>Less waste is created</b><p>Fewer usable items are sent to landfills.</p></div>
          <i>→</i>
          <div><span>04</span><b>A repair culture grows</b><p>Sustainable habits become the new normal.</p></div>
        </div>
        <p className="impact-statement">
          We&apos;re building toward a cleaner, more sustainable future where
          young people feel capable of caring for what they own—and inspired to
          pass that mindset on.
        </p>
      </section>

      <section className="team section-pad" id="team">
        <div className="section-label"><span>07</span> The team</div>
        <div className="team-heading"><h2>DE PROJECT 3</h2><p>Eight minds. One mission. A future worth fixing.</p></div>
        <div className="team-grid">
          {team.map((member, index) => (
            <div className="member" key={member}><span>{String(index + 1).padStart(2, "0")}</span><b>{member}</b><i>↗</i></div>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-main">
          <div className="footer-word">REPAIR<span>HUB</span></div>
          <p>Learn it. Fix it. Own it.</p>
          <button onClick={() => startRepair()}>Start repairing <span>↗</span></button>
        </div>
        <div className="footer-bottom"><span>© 2026 REPAIRHUB — DE PROJECT 3</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
