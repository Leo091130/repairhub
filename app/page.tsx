"use client";

import { useState } from "react";

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
  { name: "Fix a loose headphone jack", level: "BEGINNER", time: "15 MIN", icon: "◉" },
  { name: "Replace a backpack zipper pull", level: "BEGINNER", time: "10 MIN", icon: "⌁" },
  { name: "Clean a sticky game controller", level: "EASY", time: "20 MIN", icon: "✣" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedRepair, setSelectedRepair] = useState(0);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const startRepair = (index = selectedRepair) => {
    setSelectedRepair(index);
    setNotice(`Guide ready: ${repairs[index].name}`);
    document.getElementById("try-it")?.scrollIntoView({ behavior: "smooth" });
  };

  const runSearch = () => {
    setNotice(
      query.trim()
        ? `We found beginner-friendly guides for “${query.trim()}”.`
        : "Type the name of something you want to repair.",
    );
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
        <button className="nav-cta" onClick={() => startRepair(0)}>Try RepairHub <span>↗</span></button>
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
            <button className="button button-dark" onClick={() => startRepair(0)}>Start your first repair <span>↗</span></button>
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
          <p>Search by product or scan a QR code to jump straight into a beginner-friendly guide.</p>
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
          <button className="scan-button" onClick={() => setNotice("QR scanner opened — point your camera at a product code.")}>
            <span>⌗</span> Scan a QR code
          </button>
          {notice && <div className="notice" role="status">{notice}</div>}
        </div>
        <div className="repair-list">
          <p className="list-label">POPULAR FIRST REPAIRS</p>
          {repairs.map((repair, index) => (
            <button
              className={`repair-item ${selectedRepair === index ? "selected" : ""}`}
              key={repair.name}
              onClick={() => startRepair(index)}
            >
              <i>{repair.icon}</i>
              <span><b>{repair.name}</b><small>{repair.level} · {repair.time}</small></span>
              <strong>↗</strong>
            </button>
          ))}
        </div>
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
          <div className="progress-top"><span>YOUR JOURNEY</span><b>12 / 100</b></div>
          <div className="big-progress"><i /></div>
          <div className="progress-milestones"><span className="done">●<small>START</small></span><span>●<small>25</small></span><span>●<small>50</small></span><span>●<small>75</small></span><span className="pro">★<small>PRO</small></span></div>
          <div className="progress-message"><b>88 repairs to go</b><span>Every fix builds your skills—and a more sustainable future.</span></div>
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
          <button onClick={() => startRepair(0)}>Start repairing <span>↗</span></button>
        </div>
        <div className="footer-bottom"><span>© 2026 REPAIRHUB — DE PROJECT 3</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
