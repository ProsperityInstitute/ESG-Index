function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function median(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle];
}

function fmtPct(num) {
  return (Number(num) * 100).toFixed(1) + '%';
}

function fmtWholePct(num) {
  return Math.round(Number(num) * 100) + '%';
}

function buildDistributionBins(values, start = 0, end = 1, binCount = 10) {
  const binSize = (end - start) / binCount;
  const bins = Array.from({ length: binCount }, (_, index) => {
    const binStart = start + index * binSize;
    const binEnd = binStart + binSize;
    return {
      start: binStart,
      end: binEnd,
      center: binStart + binSize / 2,
      count: 0
    };
  });

  values.forEach((value) => {
    const clamped = Math.min(end, Math.max(start, Number(value) || 0));
    const rawIndex = Math.floor((clamped - start) / binSize);
    const index = Math.min(binCount - 1, Math.max(0, rawIndex));
    bins[index].count += 1;
  });

  return bins;
}

function buildDistributionSubtitle(bins) {
  if (!bins.length) return "";

  let bestWindow = { start: 0, total: -1 };
  for (let i = 0; i <= bins.length - 3; i += 1) {
    const total = bins[i].count + bins[i + 1].count + bins[i + 2].count;
    if (total > bestWindow.total) bestWindow = { start: i, total };
  }

  const clusterStart = bins[bestWindow.start]?.start ?? 0;
  const clusterEnd = bins[Math.min(bestWindow.start + 2, bins.length - 1)]?.end ?? 1;
  const outlierCount = bins
    .filter(bin => bin.end <= 0.2 || bin.start >= 0.8)
    .reduce((sum, bin) => sum + bin.count, 0);

  return `${fmtWholePct(clusterStart)}-${fmtWholePct(clusterEnd)} holds the main cluster.<br>Only ${outlierCount} companies sit below 20% or above 80%.`;
}

function getDistributionChartSizing() {
  const width = window.innerWidth;

  if (width <= 640) {
    return {
      height: 280,
      titleSize: 18,
      subtitleSize: 12,
      axisTitleSize: 12,
      axisTickSize: 11,
      annotationSize: 11,
      topMargin: 104
    };
  }

  if (width <= 980) {
    return {
      height: 320,
      titleSize: 21,
      subtitleSize: 13,
      axisTitleSize: 13,
      axisTickSize: 12,
      annotationSize: 11,
      topMargin: 114
    };
  }

  return {
    height: 360,
    titleSize: 24,
    subtitleSize: 14,
    axisTitleSize: 14,
    axisTickSize: 12,
    annotationSize: 12,
    topMargin: 126
  };
}

let distributionResizeBound = false;
let distributionResizeTimer = null;
let activeIndexView = "esg";
let explorerSortCol = "rank";
let explorerSortAsc = true;

const INDEX_VIEWS = {
  esg: {
    label: "Full ESG",
    title: "Full ESG Index",
    scoreLabel: "ESG Exposure",
    scoreKey: "ESG_Score",
    rankLabel: "ESG Rank",
    text: "Start with the full composite view, then switch into the domain mini indices for a closer look.",
    columns: [
      { key: "Environment_Score", label: "Environment" },
      { key: "Social_Score", label: "Social" },
      { key: "ESG_Score", label: "ESG Score", bold: true }
    ]
  },
  environment: {
    label: "Environment",
    title: "Environment Mini Index",
    scoreLabel: "Environment Exposure",
    scoreKey: "Environment_Score",
    rankLabel: "Env. Rank",
    text: "A closer look at climate targets, transition investment, and climate reporting exposure.",
    columns: [
      { key: "Climate_Targets", label: "Climate Targets" },
      { key: "Investment_Transition", label: "Investment & Transition" },
      { key: "Climate_Reporting", label: "Climate Reporting" },
      { key: "Environment_Score", label: "Environment Score", bold: true }
    ]
  },
  social: {
    label: "Social",
    title: "Social Mini Index",
    scoreLabel: "Social Exposure",
    scoreKey: "Social_Score",
    rankLabel: "Social Rank",
    text: "A closer look at DEI targets and representation, programmes and memberships, and social incentives.",
    columns: [
      { key: "DEI_Targets_Representation", label: "DEI Targets" },
      { key: "DEI_Programmes_Memberships", label: "Programmes & Memberships" },
      { key: "Social_Incentives", label: "Social Incentives" },
      { key: "Social_Score", label: "Social Score", bold: true }
    ]
  },
  governance: {
    label: "Governance",
    title: "Governance Reference Index",
    scoreLabel: "Governance Reference Exposure",
    scoreKey: "Governance_Reference_Score",
    rankLabel: "Gov. Rank",
    text: "A reference view of governance-related signals embedded in reporting, assurance, oversight, and incentives.",
    columns: [
      { key: "Governance_Reporting_Assurance_Score", label: "Reporting & Assurance" },
      { key: "Governance_Oversight_Incentives_Score", label: "Oversight & Incentives" },
      { key: "Governance_Reference_Score", label: "Reference Score", bold: true }
    ]
  }
};

function buildSectorAverages(data) {
  const grouped = {};

  data.forEach((row) => {
    const sector = row.Sector || "Unclassified";
    if (!grouped[sector]) grouped[sector] = [];
    grouped[sector].push(row);
  });

  return Object.entries(grouped)
    .map(([sector, rows]) => ({
      sector,
      avgESG: mean(rows.map(r => r.ESG_Score))
    }))
    .sort((a, b) => a.avgESG - b.avgESG);
}

function getActiveIndexConfig() {
  return INDEX_VIEWS[activeIndexView] || INDEX_VIEWS.esg;
}

function gradientColor(v) {
  const x = Math.max(0, Math.min(1, Number(v) || 0));

  if (x < 0.33) return "#4f9b63";
  if (x < 0.66) return "#c6872f";
  return "#d95d5d";
}

function metricMarkup(v, bold = false) {
  const value = Math.max(0, Math.min(1, Number(v) || 0));
  const color = gradientColor(value);

  return `
    <div class="metric-stack">
      <div class="tiny-track">
        <div class="tiny-fill" style="width:${value * 100}%; background:${color};"></div>
      </div>
      <div class="${bold ? "score-value" : "pct"}" style="color:${color}">
        ${fmtPct(value)}
      </div>
    </div>
  `;
}

function rankRowsBy(data, scoreKey) {
  return [...data]
    .sort((a, b) => (Number(a[scoreKey]) || 0) - (Number(b[scoreKey]) || 0))
    .map((row, index) => ({ ...row, rank: index + 1 }));
}

function setupIndexFilters(data) {
  const sectorFilter = document.getElementById("indexSectorFilter");
  const searchInput = document.getElementById("indexSearchInput");
  const tierFilter = document.getElementById("indexTierFilter");

  if (sectorFilter && sectorFilter.options.length <= 1) {
    uniqueSectors().forEach(sector => {
      const opt = document.createElement("option");
      opt.value = sector;
      opt.textContent = sector;
      sectorFilter.appendChild(opt);
    });
  }

  [searchInput, sectorFilter, tierFilter].forEach(control => {
    control?.addEventListener("input", () => renderIndexExplorer(data));
    control?.addEventListener("change", () => renderIndexExplorer(data));
  });
}

function setupIndexViewButtons(data) {
  document.querySelectorAll("[data-index-view]").forEach(button => {
    button.addEventListener("click", () => {
      const nextView = button.dataset.indexView;
      if (!INDEX_VIEWS[nextView]) return;

      activeIndexView = nextView;
      explorerSortCol = "rank";
      explorerSortAsc = true;
      renderSelectedIndex(data);

      document.getElementById("indexExplorer")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function filteredExplorerRows(data, config) {
  const q = document.getElementById("indexSearchInput")?.value.toLowerCase().trim() || "";
  const sector = document.getElementById("indexSectorFilter")?.value || "";
  const tier = document.getElementById("indexTierFilter")?.value || "";

  const ranked = rankRowsBy(data, config.scoreKey).filter(row => {
    const score = Number(row[config.scoreKey]) || 0;
    const matchesQuery =
      !q ||
      row.Company.toLowerCase().includes(q) ||
      row.Ticker.toLowerCase().includes(q);
    const matchesSector = !sector || row.Sector === sector;
    const matchesTier = !tier || tierKey(score) === tier;

    return matchesQuery && matchesSector && matchesTier;
  });

  return ranked.sort((a, b) => {
    const av = explorerSortCol === "tier"
      ? tierLabel(a[config.scoreKey])
      : explorerSortCol === "rank"
        ? a.rank
        : a[explorerSortCol];
    const bv = explorerSortCol === "tier"
      ? tierLabel(b[config.scoreKey])
      : explorerSortCol === "rank"
        ? b.rank
        : b[explorerSortCol];

    if (!isNaN(Number(av)) && !isNaN(Number(bv)) && av !== "" && bv !== "") {
      return explorerSortAsc ? Number(av) - Number(bv) : Number(bv) - Number(av);
    }

    return explorerSortAsc
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av));
  });
}

function renderIndexExplorer(data) {
  const config = getActiveIndexConfig();
  const title = document.getElementById("indexExplorerTitle");
  const text = document.getElementById("indexExplorerText");
  const headRow = document.getElementById("indexExplorerHeadRow");
  const body = document.getElementById("indexExplorerBody");

  if (title) title.textContent = config.title;
  if (text) text.textContent = config.text;
  if (!headRow || !body) return;

  const headers = [
    { key: "rank", label: config.rankLabel },
    { key: "Company", label: "Company" },
    { key: "Ticker", label: "Ticker" },
    { key: "Sector", label: "Sector" },
    ...config.columns,
    { key: "tier", label: "Tier" }
  ];

  headRow.innerHTML = headers.map(header => `
    <th>
      <button class="header-cell" type="button" data-sort="${header.key}">
        ${header.label}
      </button>
    </th>
  `).join("");

  headRow.querySelectorAll("[data-sort]").forEach(button => {
    button.addEventListener("click", () => {
      const col = button.dataset.sort;
      if (explorerSortCol === col) {
        explorerSortAsc = !explorerSortAsc;
      } else {
        explorerSortCol = col;
        explorerSortAsc = col === "rank" || col === config.scoreKey;
      }
      renderIndexExplorer(data);
    });
  });

  const rows = filteredExplorerRows(data, config);
  body.innerHTML = rows.map(row => {
    const score = Number(row[config.scoreKey]) || 0;
    const tier = tierKey(score);

    return `
      <tr class="ranking-row" onclick="window.location.href='profile.html?ticker=${encodeURIComponent(row.Ticker)}'">
        <td><div class="rank-cell"><div class="rank-badge rank-tier-${tier}">${row.rank}</div></div></td>
        <td>
          <div class="company-cell">
            <div class="company-name">
              <img src="assets/images/${row.Ticker.toUpperCase()}.png" alt="${row.Company} logo" class="company-logo" onerror="this.style.display='none'">
              <span>${row.Company}</span>
            </div>
          </div>
        </td>
        <td><div class="ticker-cell"><span class="ticker-badge">${row.Ticker}</span></div></td>
        <td><div class="sector-cell"><span class="sector-name">${row.Sector}</span></div></td>
        ${config.columns.map(column => `
          <td><div class="metric-cell">${metricMarkup(row[column.key], column.bold)}</div></td>
        `).join("")}
        <td><div class="tier-cell"><span class="tier-pill tier-${tier}">${tierLabel(score)}</span></div></td>
      </tr>
    `;
  }).join("");
}

function renderSelectedIndex(data) {
  const config = getActiveIndexConfig();

  document.querySelectorAll(".index-view-tab").forEach(button => {
    const isActive = button.dataset.indexView === activeIndexView;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelectorAll(".pillar-card-button").forEach(button => {
    button.classList.toggle("active", button.dataset.indexView === activeIndexView);
  });

  const leaderboardText = document.getElementById("overviewLeaderboardText");
  if (leaderboardText) {
    leaderboardText.textContent = `The top 3 companies with the least and most ${config.scoreLabel.toLowerCase()} under the selected view.`;
  }

  renderIndexExplorer(data);
  renderLeaderboard(data, config);
  renderDistributionChart(data, config);
}

function setupCompanySearch(data) {
  const form = document.getElementById("companySearchForm");
  const input = document.getElementById("companySearchInput");
  const options = document.getElementById("companySearchOptions");
  const feedback = document.getElementById("companySearchFeedback");

  if (!form || !input || !options || !feedback) return;

  const searchEntries = data
    .map(row => ({
      company: row.Company,
      ticker: row.Ticker,
      label: `${row.Company} (${row.Ticker})`
    }))
    .sort((a, b) => a.company.localeCompare(b.company));

  options.innerHTML = searchEntries
    .map(entry => `<option value="${entry.label}"></option>`)
    .join("");

  const findMatch = (rawValue) => {
    const value = String(rawValue || "").trim().toLowerCase();
    if (!value) return null;

    return searchEntries.find(entry =>
      entry.label.toLowerCase() === value ||
      entry.company.toLowerCase() === value ||
      entry.ticker.toLowerCase() === value
    ) || searchEntries.find(entry =>
      entry.company.toLowerCase().includes(value) ||
      entry.ticker.toLowerCase() === value
    );
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const match = findMatch(input.value);

    if (!match) {
      feedback.textContent = "No matching company found. Try the company name or ticker.";
      return;
    }

    feedback.textContent = "";
    window.location.href = `profile.html?ticker=${encodeURIComponent(match.ticker)}`;
  });

  input.addEventListener("input", () => {
    if (feedback.textContent) feedback.textContent = "";
  });
}

function renderOverviewIntro(data) {
  const introEl = document.getElementById("overviewIntroText");
  if (!introEl || !data.length) return;

  const sorted = [...data].sort((a, b) => a.ESG_Score - b.ESG_Score);
  const sectors = [...new Set(data.map(d => d.Sector))].length;
  const avgESG = mean(data.map(d => d.ESG_Score));
  const lowest = sorted[0];
  const highest = sorted[sorted.length - 1];

  introEl.textContent = `The ShareReaction Index is a high-level guide to how FTSE 100 companies prioritise ESG initiatives over shareholder interests. It brings together ${data.length} companies across ${sectors} sectors, combines the live Environment and Social modules into one composite score, and highlights where exposure is concentrated across the market. On the current public model, the average ESG exposure is ${fmtPct(avgESG)}, ranging from ${lowest.Ticker} at ${fmtPct(lowest.ESG_Score)} to ${highest.Ticker} at ${fmtPct(highest.ESG_Score)}.`;
}

function renderHeroSignals(data) {
  const el = document.getElementById("heroSignalList");
  if (!el) return;

  const sorted = [...data].sort((a, b) => a.ESG_Score - b.ESG_Score);
  const lowest = sorted[0];
  const highest = sorted[sorted.length - 1];
  const bestSector = buildSectorAverages(data)[0];

  el.innerHTML = `
    <div class="signal">
      <span class="name">Low score</span>
      <span class="tag">${fmtPct(lowest.ESG_Score)}</span>
    </div>
    <div class="signal">
      <span class="name">High score</span>
      <span class="tag" style="background:rgba(240,120,120,0.12);color:#f0a0a0;">${fmtPct(highest.ESG_Score)}</span>
    </div>
    <div class="signal">
      <span class="name">Best avg sector</span>
      <span class="tag">${bestSector.sector}</span>
    </div>
  `;
}

function renderOverviewStats(data) {
  const grid = document.getElementById("overviewStatsGrid");
  if (!grid) return;

  const sorted = [...data].sort((a, b) => a.ESG_Score - b.ESG_Score);
  const sectors = [...new Set(data.map(d => d.Sector))].length;
  const lowest = sorted[0];
  const highest = sorted[sorted.length - 1];
  const avgESG = mean(data.map(d => d.ESG_Score));

  grid.innerHTML = `
    <div class="stat">
      <div class="stat-value"><a href="companies.html" style="color: inherit; text-decoration: none;">${data.length}</a></div>
      <div class="stat-label">Companies covered</div>
    </div>
    <div class="stat">
      <div class="stat-value"><a href="sectors.html" style="color: inherit; text-decoration: none;">${sectors}</a></div>
      <div class="stat-label">Sectors covered</div>
    </div>
    <div class="stat">
      <div class="stat-value"><a href="profile.html?ticker=${encodeURIComponent(highest.Ticker)}" style="color: inherit; text-decoration: none; border-bottom: 2px solid var(--red);">${highest.Ticker}</a></div>
      <div class="stat-label">Highest ESG Exposure</div>
    </div>
    <div class="stat">
      <div class="stat-value"><a href="profile.html?ticker=${encodeURIComponent(lowest.Ticker)}" style="color: inherit; text-decoration: none; border-bottom: 2px solid var(--green);">${lowest.Ticker}</a></div>
      <div class="stat-label">Lowest ESG Exposure</div>
    </div>
    <div class="stat">
      <div class="stat-value"><a href="esg.html" style="color: inherit; text-decoration: none;">${fmtPct(avgESG)}</a></div>
      <div class="stat-label">Avg. ESG Exposure</div>
    </div>
  `;
}

function renderBreakdownCards(data) {
  const envAvg = mean(data.map(d => d.Environment_Score));
  const socAvg = mean(data.map(d => d.Social_Score));
  const govAvg = mean(data.map(d => d.Governance_Reference_Score));
  const esgAvg = mean(data.map(d => d.ESG_Score));

  const envAvgPill = document.getElementById("envAvgPill");
  const socAvgPill = document.getElementById("socAvgPill");
  const govAvgPill = document.getElementById("govAvgPill");
  const esgAvgPill = document.getElementById("esgAvgPill");

  const envAvgBar = document.getElementById("envAvgBar");
  const socAvgBar = document.getElementById("socAvgBar");
  const govAvgBar = document.getElementById("govAvgBar");
  const esgAvgBar = document.getElementById("esgAvgBar");

  if (envAvgPill) envAvgPill.textContent = `${fmtPct(envAvg)} avg.`;
  if (socAvgPill) socAvgPill.textContent = `${fmtPct(socAvg)} avg.`;
  if (govAvgPill) govAvgPill.textContent = `${fmtPct(govAvg)} avg.`;
  if (esgAvgPill) esgAvgPill.textContent = `${fmtPct(esgAvg)} avg.`;

  if (envAvgBar) envAvgBar.style.width = `${envAvg * 100}%`;
  if (socAvgBar) socAvgBar.style.width = `${socAvg * 100}%`;
  if (govAvgBar) govAvgBar.style.width = `${govAvg * 100}%`;
  if (esgAvgBar) esgAvgBar.style.width = `${esgAvg * 100}%`;
}

function renderLeaderboard(data, config = getActiveIndexConfig()) {
  const wrap = document.getElementById("overviewLeaderboard");
  if (!wrap) return;

  const scoreKey = config.scoreKey;
  const ranked = rankRowsBy(data, scoreKey);
  const lowest = [...ranked]
    .sort((a, b) => a[scoreKey] - b[scoreKey])
    .slice(0, 3);

  const highest = [...ranked]
    .sort((a, b) => b[scoreKey] - a[scoreKey])
    .slice(0, 3);

  wrap.innerHTML = `
    <div class="leaderboard-section worst-section">
      <h3>Worst Performers</h3>
      ${highest.map((d) => `
        <a href="profile.html?ticker=${encodeURIComponent(d.Ticker)}" style="text-decoration: none; color: inherit;">
          <div class="lb-row" style="cursor: pointer;">
            <div class="lb-rank worst-rank">${d.rank}</div>
            <div class="lb-company">
              <img src="assets/images/${d.Ticker.toUpperCase()}.png" alt="${d.Company} logo" class="lb-logo" onerror="this.style.display='none'">
              <div class="name">${d.Company}</div>
              <div class="meta">${d.Sector}</div>
            </div>
            <div class="lb-score">
              <div class="value worst-value">${fmtPct(d[scoreKey])}</div>
              <div class="ticker">${d.Ticker}</div>
            </div>
          </div>
        </a>
      `).join("")}
    </div>
    <div class="leaderboard-section best-section">
      <h3>Best Performers</h3>
      ${lowest.map((d) => `
        <a href="profile.html?ticker=${encodeURIComponent(d.Ticker)}" style="text-decoration: none; color: inherit;">
          <div class="lb-row" style="cursor: pointer;">
            <div class="lb-rank best-rank">${d.rank}</div>
            <div class="lb-company">
              <img src="assets/images/${d.Ticker.toUpperCase()}.png" alt="${d.Company} logo" class="lb-logo" onerror="this.style.display='none'">
              <div class="name">${d.Company}</div>
              <div class="meta">${d.Sector}</div>
            </div>
            <div class="lb-score">
              <div class="value best-value">${fmtPct(d[scoreKey])}</div>
              <div class="ticker">${d.Ticker}</div>
            </div>
          </div>
        </a>
      `).join("")}
    </div>
  `;
}

function renderDistributionChart(data, config = getActiveIndexConfig()) {
  const chartEl = document.getElementById("overviewDistributionChart");
  const chartTitleEl = document.getElementById("overviewDistributionTitle");
  const chartSubtitleEl = document.getElementById("overviewDistributionSubtitle");
  if (!chartEl) return;

  const scores = data.map(d => Number(d[config.scoreKey]) || 0);
  const avgScore = mean(scores);
  const medianScore = median(scores);
  const bins = buildDistributionBins(scores, 0, 1, 10);
  const subtitle = buildDistributionSubtitle(bins);
  const sizing = getDistributionChartSizing();
  const maxCount = Math.max(...bins.map(bin => bin.count), 0);
  const meanAndMedianAreClose = Math.abs(avgScore - medianScore) < 0.08;
  const avgLabelY = maxCount + 0.42;
  const medianLabelY = meanAndMedianAreClose ? Math.max(maxCount - 1.2, 0.95) : Math.max(maxCount - 0.4, 1);

  if (chartTitleEl) chartTitleEl.textContent = `Distribution of ${config.scoreLabel}`;
  if (chartSubtitleEl) chartSubtitleEl.innerHTML = subtitle;

  Plotly.react(
    chartEl,
    [
      {
        type: "bar",
        x: bins.map(bin => bin.center),
        y: bins.map(bin => bin.count),
        width: bins.map(() => 0.092),
        customdata: bins.map(bin => [
          fmtWholePct(bin.start),
          fmtWholePct(bin.end),
          bin.count
        ]),
        marker: {
          color: bins.map(bin => (bin.center >= avgScore ? "#246847" : "#2f8b57")),
          opacity: 0.85,
          line: {
            color: "rgba(16, 25, 43, 0.12)",
            width: 1
          }
        },
        hovertemplate: `%{customdata[0]}-%{customdata[1]} ${config.scoreLabel.toLowerCase()}<br>%{customdata[2]} companies<extra></extra>`
      }
    ],
    {
      annotations: [
        {
          x: avgScore,
          y: avgLabelY,
          xanchor: meanAndMedianAreClose ? "right" : "left",
          yanchor: "bottom",
          showarrow: false,
          text: `Average: ${fmtPct(avgScore)}`,
          font: {
            size: sizing.annotationSize,
            color: "#24553a"
          },
          bgcolor: "rgba(220, 236, 223, 0.96)",
          bordercolor: "rgba(47, 139, 87, 0.22)",
          borderwidth: 1,
          borderpad: 5
        },
        {
          x: medianScore,
          y: medianLabelY,
          xanchor: "left",
          yanchor: "bottom",
          showarrow: false,
          text: `Median: ${fmtPct(medianScore)}`,
          font: {
            size: sizing.annotationSize,
            color: "#4e5b72"
          },
          bgcolor: "rgba(255, 255, 255, 0.96)",
          bordercolor: "rgba(152, 162, 179, 0.35)",
          borderwidth: 1,
          borderpad: 5
        }
      ],
      shapes: [
        {
          type: "line",
          x0: avgScore,
          x1: avgScore,
          y0: 0,
          y1: maxCount + 0.75,
          line: {
            color: "#2f8b57",
            width: 2,
            dash: "solid"
          }
        },
        {
          type: "line",
          x0: medianScore,
          x1: medianScore,
          y0: 0,
          y1: maxCount + 0.75,
          line: {
            color: "#98a2b3",
            width: 2,
            dash: "dot"
          }
        }
      ],
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      height: sizing.height,
      margin: { l: 56, r: 18, t: 28, b: 56 },
      bargap: 0.06,
      hoverlabel: {
        bgcolor: "#ffffff",
        bordercolor: "rgba(16, 25, 43, 0.08)",
        font: {
          color: "#171b24",
          size: sizing.axisTickSize
        }
      },
      xaxis: {
        title: {
          text: `${config.scoreLabel} Score`,
          font: {
            size: sizing.axisTitleSize,
            color: "#667085"
          }
        },
        range: [0, 1],
        tickvals: [0, 0.2, 0.4, 0.6, 0.8, 1],
        tickformat: ".0%",
        tickfont: {
          size: sizing.axisTickSize,
          color: "#344054"
        },
        showgrid: false,
        zeroline: false,
        showline: false,
        linecolor: "rgba(16, 25, 43, 0.12)",
        ticks: "outside"
      },
      yaxis: {
        title: {
          text: "Number of Companies",
          font: {
            size: sizing.axisTitleSize,
            color: "#667085"
          }
        },
        rangemode: "tozero",
        range: [0, maxCount + 1.2],
        tickfont: {
          size: sizing.axisTickSize,
          color: "#344054"
        },
        gridcolor: "rgba(16, 25, 43, 0.08)",
        griddash: "dot",
        zeroline: false
      }
    },
    {
      responsive: true,
      displayModeBar: false
    }
  );

  if (!distributionResizeBound) {
    window.addEventListener("resize", () => {
      window.clearTimeout(distributionResizeTimer);
      distributionResizeTimer = window.setTimeout(() => renderDistributionChart(data, getActiveIndexConfig()), 120);
    });
    distributionResizeBound = true;
  }
}

function initOverviewPage() {
  if (!Array.isArray(cappedData)) {
    console.error("cappedData is not available.");
    return;
  }

  renderOverviewIntro(cappedData);
  setupCompanySearch(cappedData);
  renderHeroSignals(cappedData);
  renderOverviewStats(cappedData);
  renderBreakdownCards(cappedData);
  setupIndexFilters(cappedData);
  setupIndexViewButtons(cappedData);
  renderSelectedIndex(cappedData);
}

document.addEventListener("DOMContentLoaded", initOverviewPage);
