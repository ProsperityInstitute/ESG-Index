function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function fmtPct(num) {
  return (Number(num) * 100).toFixed(1) + "%";
}

function getSectorName() {
  const params = new URLSearchParams(window.location.search);
  return params.get("sector");
}

function getSectorRows(sector) {
  return cappedData
    .filter(row => row.Sector === sector)
    .sort((a, b) => a.ESG_Score - b.ESG_Score);
}

function buildSectorSummary(sector, rows) {
  const avgESG = mean(rows.map(row => row.ESG_Score));
  const avgEnvironment = mean(rows.map(row => row.Environment_Score));
  const avgSocial = mean(rows.map(row => row.Social_Score));
  const best = rows[0];
  const worst = rows[rows.length - 1];
  const range = worst.ESG_Score - best.ESG_Score;

  return {
    sector,
    rows,
    avgESG,
    avgEnvironment,
    avgSocial,
    best,
    worst,
    range
  };
}

function renderHeader(summary) {
  const indexAvgESG = mean(cappedData.map(row => row.ESG_Score));
  const metaEl = document.getElementById("sectorProfileMetaText");
  const introEl = document.getElementById("sectorProfileIntro");
  const titleEl = document.getElementById("sectorProfileName");
  const signalsEl = document.getElementById("sectorProfileSignalList");

  document.title = `${summary.sector} Sector Profile | FTSE 100 ESG Exposure Index`;
  titleEl.textContent = summary.sector;

  introEl.textContent = `${summary.sector} contains ${summary.rows.length} FTSE 100 companies in the current public model. This profile brings together average Environment, Social, and composite ESG exposure signals alongside the ranked company list for the sector.`;
  metaEl.textContent = `${summary.sector} averages ${fmtPct(summary.avgESG)} on the public ESG exposure model, versus ${fmtPct(indexAvgESG)} for the full index.`;

  signalsEl.innerHTML = `
    <div class="signal">
      <span class="name">Companies</span>
      <span class="tag">${summary.rows.length}</span>
    </div>
    <div class="signal">
      <span class="name">Best performer</span>
      <span class="tag">${summary.best.Ticker}</span>
    </div>
    <div class="signal">
      <span class="name">Worst performer</span>
      <span class="tag" style="background:rgba(240,120,120,0.12);color:#f0a0a0;">${summary.worst.Ticker}</span>
    </div>
  `;
}

function renderStats(summary) {
  const grid = document.getElementById("sectorProfileStatsGrid");
  if (!grid) return;

  grid.innerHTML = `
    <div class="stat">
      <div class="stat-value">${summary.rows.length}</div>
      <div class="stat-label">Companies in sector</div>
    </div>
    <div class="stat">
      <div class="stat-value">${fmtPct(summary.avgESG)}</div>
      <div class="stat-label">Average ESG exposure</div>
    </div>
    <div class="stat">
      <div class="stat-value">${summary.best.Ticker}</div>
      <div class="stat-label">Lowest ESG exposure</div>
    </div>
    <div class="stat">
      <div class="stat-value">${summary.worst.Ticker}</div>
      <div class="stat-label">Highest ESG exposure</div>
    </div>
    <div class="stat">
      <div class="stat-value">${fmtPct(summary.range)}</div>
      <div class="stat-label">Sector spread</div>
    </div>
  `;
}

function renderComparisonChart(summary) {
  const indexAvgEnvironment = mean(cappedData.map(row => row.Environment_Score));
  const indexAvgSocial = mean(cappedData.map(row => row.Social_Score));
  const indexAvgESG = mean(cappedData.map(row => row.ESG_Score));

  Plotly.newPlot(
    "sectorProfileComparisonChart",
    [
      {
        type: "bar",
        name: summary.sector,
        x: ["Environment", "Social", "ESG"],
        y: [summary.avgEnvironment, summary.avgSocial, summary.avgESG],
        marker: { color: "#2f8b57" }
      },
      {
        type: "bar",
        name: "Index Avg",
        x: ["Environment", "Social", "ESG"],
        y: [indexAvgEnvironment, indexAvgSocial, indexAvgESG],
        marker: { color: "#4867c9" }
      }
    ],
    {
      barmode: "group",
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { l: 50, r: 20, t: 10, b: 40 },
      yaxis: {
        title: "Score",
        tickformat: ".0%"
      }
    },
    {
      responsive: true,
      displayModeBar: false
    }
  );
}

function renderLeaderboard(summary) {
  const wrap = document.getElementById("sectorProfileLeaderboard");
  if (!wrap) return;

  const lowest = summary.rows.slice(0, Math.min(3, summary.rows.length));
  const highest = [...summary.rows].slice(-Math.min(3, summary.rows.length)).reverse();

  const renderRows = (rows, title, valueClass, rankClass, rankLabel) => `
    <div class="leaderboard-section ${valueClass === "best-value" ? "best-section" : "worst-section"}">
      <h3>${title}</h3>
      ${rows.map((row, index) => `
        <a href="profile.html?ticker=${encodeURIComponent(row.Ticker)}" style="text-decoration: none; color: inherit;">
          <div class="lb-row" style="cursor: pointer;">
            <div class="lb-rank ${rankClass}">${rankLabel(index)}</div>
            <div class="lb-company">
              <img src="assets/images/${String(row.Ticker).toUpperCase()}.png" alt="${row.Company} logo" class="lb-logo" onerror="this.style.display='none'">
              <div class="name">${row.Company}</div>
              <div class="meta">${row.Ticker}</div>
            </div>
            <div class="lb-score">
              <div class="value ${valueClass}">${fmtPct(row.ESG_Score)}</div>
              <div class="ticker">${summary.sector}</div>
            </div>
          </div>
        </a>
      `).join("")}
    </div>
  `;

  wrap.innerHTML = `
    ${renderRows(highest, "Highest Exposure", "worst-value", "worst-rank", index => index + 1)}
    ${renderRows(lowest, "Lowest Exposure", "best-value", "best-rank", index => index + 1)}
  `;
}

function renderCompanyChart(summary) {
  Plotly.newPlot(
    "sectorProfileCompanyChart",
    [
      {
        type: "bar",
        x: summary.rows.map(row => row.Company),
        y: summary.rows.map(row => row.ESG_Score),
        text: summary.rows.map(row => row.Ticker),
        textposition: "outside",
        cliponaxis: false,
        marker: {
          color: summary.rows.map((_, index) => {
            const ratio = summary.rows.length <= 1 ? 0 : index / (summary.rows.length - 1);
            const hue = 130 - ratio * 130;
            return `hsl(${hue}, 58%, 52%)`;
          })
        },
        customdata: summary.rows.map(row => row.Ticker),
        hovertemplate: "<b>%{x}</b><br>Ticker: %{customdata}<br>ESG Exposure: %{y:.3f}<extra></extra>"
      }
    ],
    {
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { l: 60, r: 20, t: 10, b: 130 },
      yaxis: {
        title: "ESG Exposure",
        tickformat: ".0%"
      },
      xaxis: {
        tickangle: -28,
        automargin: true,
        showgrid: false,
        zeroline: false
      }
    },
    {
      responsive: true,
      displayModeBar: false
    }
  );

  const chart = document.getElementById("sectorProfileCompanyChart");
  if (chart && !chart.dataset.boundClick) {
    chart.on("plotly_click", (event) => {
      const ticker = event?.points?.[0]?.customdata;
      if (ticker) {
        window.location.href = `profile.html?ticker=${encodeURIComponent(ticker)}`;
      }
    });
    chart.dataset.boundClick = "true";
  }
}

function renderTable(summary) {
  const tbody = document.getElementById("sectorProfileTableBody");
  if (!tbody) return;

  tbody.innerHTML = summary.rows.map((row, index) => `
    <tr>
      <td class="num-cell">${index + 1}</td>
      <td class="sector-name-cell"><a href="profile.html?ticker=${encodeURIComponent(row.Ticker)}">${row.Company}</a></td>
      <td><span class="ticker-badge">${row.Ticker}</span></td>
      <td class="num-cell">${fmtPct(row.ESG_Score)}</td>
      <td class="num-cell">${fmtPct(row.Environment_Score)}</td>
      <td class="num-cell">${fmtPct(row.Social_Score)}</td>
    </tr>
  `).join("");
}

function renderNotFound(message) {
  document.getElementById("sectorProfileName").textContent = "Sector Not Found";
  document.getElementById("sectorProfileIntro").textContent = message;
  document.getElementById("sectorProfileMetaText").textContent = "The requested sector could not be loaded from the current data set.";
}

function initSectorProfilePage() {
  if (!Array.isArray(cappedData)) {
    console.error("cappedData is not available.");
    return;
  }

  const sector = getSectorName();
  if (!sector) {
    renderNotFound("No sector was provided in the URL.");
    return;
  }

  const rows = getSectorRows(sector);
  if (!rows.length) {
    renderNotFound("The selected sector could not be found in the current data set.");
    return;
  }

  const summary = buildSectorSummary(sector, rows);
  renderHeader(summary);
  renderStats(summary);
  renderComparisonChart(summary);
  renderLeaderboard(summary);
  renderCompanyChart(summary);
  renderTable(summary);
}

document.addEventListener("DOMContentLoaded", initSectorProfilePage);
