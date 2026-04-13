function mean(arr) {
  if (!arr.length) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function fmtPct(num) {
  return (Number(num) * 100).toFixed(1) + '%';
}

const PROFILE_CONTACTS = {
  "III": { irEmail: "investor.relations@3i.com" },
  "ADM": { irEmail: "investorrelationssupport@admiralgroup.co.uk" },
  "AAF": { irEmail: "Investor.relations@africa.airtel.com" },
  "ALW": { irEmail: "investor@alliancewitan.com" },
  "AAL": { irEmail: "tyler.broda@angloamerican.com" },
  "ANTO": { irEmail: "investorrelations@antofagasta.co.uk" },
  "AHT": { irEmail: "kevin.powers@sunbeltrentals.com" },
  "ABF": { irPhone: "+44 (0)20 7404 5959" },
  "AV": { irEmail: "IR@aviva.com" },
  "AZN": { irEmail: "ir@astrazeneca.com" },
  "AUTO": { irEmail: "ir@autotrader.co.uk" },
  "BAB": { irEmail: "BabcockIR@babcockinternational.com" },
  "BA": { irEmail: "investors@baesystems.com" },
  "BARC": { irEmail: "marina.shchukina@barclays.com" },
  "BDEV": { irEmail: "john.messenger@barrattredrow.co.uk" },
  "BEZ": { irEmail: "sarah.booth@beazley.com" },
  "BKG": { irEmail: "shareholderenquiries@cm.mpms.mufg.com" },
  "BP": { irEmail: "ir@bp.com" },
  "BATS": { irEmail: "IR_team@bat.com" },
  "BLND": { irEmail: "investor.relations@britishland.com" },
  "BT.A": { irEmail: "ir@bt.com" },
  "BNZL": { irEmail: "investor@bunzl.com" },
  "BRBY": { irEmail: "investor.relations@burberry.com" },
  "CNA": { irEmail: "ir@centrica.com" },
  "CCH": { irEmail: "investor.relations@cchellenic.com" },
  "CPG": { irEmail: "investor.relations@compass-group.com" },
  "CTEC": { irEmail: "ir@convatec.com" },
  "CRDA": { irEmail: "investor.relations@croda.com" },
  "DCC": { irEmail: "investorrelations@dcc.ie" },
  "DGE": { irEmail: "investor.relations@diageo.com" },
  "DPLM": { irEmail: "investors@diplomaplc.com" },
  "EDV": { irEmail: "investor@endeavourmining.com" },
  "ENT": { irEmail: "investors@entaingroup.com" },
  "EZJ": { irEmail: "investor.relations@easyJet.com" },
  "EXPN": { irEmail: "investors@experian.com" },
  "FCIT": { irEmail: "campbell.hood@columbiathreadneedle.com" },
  "FRES": { irEmail: "ir@fresnilloplc.com" },
  "GAW": { irEmail: "investorrelations@gwplc.com" },
  "GLEN": { irEmail: "martin.fewings@glencore.com" },
  "GSK": { irEmail: "GSK.Investor-Relations@gsk.com" },
  "HLN": { irEmail: "investor-relations@haleon.com" },
  "HL": { irPhone: "+44 (0)384 2030" },
  "HLMA": { irEmail: "investor.relations@halma.com" },
  "HSX": { irEmail: "yana.osullivan@hiscox.com" },
  "HWDN": { irEmail: "IR@howdens.com" },
  "HIK": { irPhone: "+44 (0) 20 7399 2760" },
  "HSBC": { irEmail: "investorrelations@hsbc.com" },
  "IMI": { irEmail: "edward.hann@imiplc.com" },
  "IMB": { irEmail: "ir@impbrands.com" },
  "INF": { irEmail: "investorrelations@informa.com" },
  "IHG": { irEmail: "investors@ihg.com" },
  "ICG": { irEmail: "shareholder.relations@icgam.com" },
  "ITRK": { irEmail: "investor@intertek.com" },
  "IAG": { irEmail: "investor.relations@iairgroup.com" },
  "JD": { irEmail: "investor.relations@jdplc.com" },
  "KGF": { irEmail: "investorenquiries@kingfisher.com" },
  "LAND": { irEmail: "ShareholderEnquiries@landsec.com" },
  "LGEN": { irEmail: "Investor.Relations@group.landg.com" },
  "LLOY": { irEmail: "investor.relations@lloydsbanking.com" },
  "LMP": { irEmail: "info@londonmetric.com" },
  "LSEG": { irEmail: "ir@lseg.com" },
  "MNG": { irEmail: "luca.gagliardi@mandg.com" },
  "MKS": { irEmail: "mandsinvestorrelations@marks-and-spencer.com" },
  "MRO": { irEmail: "ir@melroseplc.net" },
  "MNDI": { irEmail: "ir@mondigroup.com" },
  "NG": { irEmail: "investor.relations@nationalgrid.com" },
  "NWG": { irEmail: "investor.relations@natwest.com" },
  "NXT": { irEmail: "investors@next.co.uk" },
  "PSON": { irEmail: "ir@pearson.com" },
  "PHNX": { irEmail: "claire.hawkins@standardlife.com" },
  "PSN": { irEmail: "feedback@persimmonhomes.com" },
  "PRU": { irEmail: "investor.relations@prudentialplc.com" },
  "RKT": { irEmail: "IR@reckitt.com" },
  "REL": { irEmail: "investor.relations@relx.com" },
  "RTO": { irEmail: "investor@rentokil-initial.com" },
  "RMV": { irEmail: "investor.relations@rightmove.co.uk" },
  "RIO": { irEmail: "investorenquiries@riotinto.com" },
  "RR": { irEmail: "investor.relations@rolls-royce.com" },
  "SGE": { irEmail: "investor.relations@sage.com" },
  "SBRY": { irEmail: "sainsburys@cm.mpms.mufg.com" },
  "SDR": { irEmail: "investorrelations@schroders.com" },
  "SMT": { irEmail: "enquiries@bailliegifford.com" },
  "SGRO": { irEmail: "SEGRO.Investor.Relations@segro.com" },
  "SVT": { irEmail: "investorrelations@severntrent.co.uk" },
  "SHEL": { irEmail: "ir-europe@shell.com" },
  "SN": { irEmail: "InvestorRelations.Global@smith-nephew.com" },
  "SMIN": { irEmail: "investor.relations@smiths.com" },
  "SPX": { irEmail: "Mal.Patel@spiraxgroup.com" },
  "SSE": { irEmail: "ir@sse.com" },
  "STJ": { irEmail: "hugh.taylor@sjp.co.uk" },
  "STAN": { irEmail: "Investor.Relations@sc.com" },
  "TW": { irEmail: "TaylorWimpey-LON@fgsglobal.com" },
  "TSCO": { irEmail: "Investor.Relations@tesco.com" },
  "ULVR": { irEmail: "investor.relations@unilever.com" },
  "UTG": { irEmail: "ir@unitestudents.com" },
  "UU": { irEmail: "chris.laybutt@uuplc.co.uk" },
  "VOD": { irEmail: "ir@vodafone.co.uk" },
  "WEIR": { irEmail: "investor-relations@weir.co.uk" },
  "WTB": { irEmail: "investorrelations@whitbread.com" },
  "WPP": { irEmail: "irteam@wpp.com" }
};

const PROFILE_CONTENT = {
  "III": {
    summary: "3i Group is a listed investment company specializing in private equity and infrastructure, with a primary focus on investments across Europe and North America. Structured as a closed-ended investment company, it operates through a long-term capital deployment model.",
    marketCap: "Approximately £26.8 billion",
    founded: "Incorporated on November 1, 1973"
  },
  "ADM": {
    summary: "Admiral Group is a financial services provider focused on insurance and consumer lending, offering products across motor, household, travel, and pet insurance alongside its Admiral Money lending platform. Its operations span UK insurance, European insurance, and consumer finance.",
    marketCap: "Approximately £10.0 billion",
    founded: "Formation date not yet verified"
  },
  "AAF": {
    summary: "Airtel Africa is a telecommunications and mobile money provider operating across key African markets, including Nigeria, East Africa, and Francophone Africa. In addition to core telecom services, it has a growing mobile money segment supporting financial inclusion.",
    marketCap: "Approximately £3.7 billion",
    founded: "Formation date not yet verified"
  },
  "ALW": {
    summary: "Alliance Witan is an investment trust positioned as a core long-term holding, targeting real returns through capital growth and a progressively rising dividend. It invests broadly in global equities across sectors.",
    marketCap: "Approximately £4.72 billion",
    founded: "Formation date not yet verified"
  },
  "AAL": {
    summary: "Anglo American is a global mining company focused on key commodities including copper, premium iron ore, and crop nutrients. Its operations and development projects span multiple geographies and resource types.",
    marketCap: "Approximately £37.38 billion",
    founded: "Incorporated on May 14, 1998"
  },
  "ANTO": {
    summary: "Antofagasta is a mining group primarily focused on copper production, supplemented by by-products, with integrated operations including mining assets and a transport division supporting logistics.",
    marketCap: "Approximately £36.71 billion",
    founded: "Incorporated on April 7, 1982"
  },
  "AHT": {
    summary: "Ashtead Group is an international equipment rental company operating primarily under the Sunbelt Rentals brand. Its business is concentrated in North America and the UK, providing both general tool and specialty equipment rental services.",
    marketCap: "Approximately £21.76 billion",
    founded: "Incorporated on April 11, 1984"
  },
  "ABF": {
    summary: "Associated British Foods is a diversified group with operations spanning food production, ingredients, agriculture, and retail, most notably through its Primark brand. Its portfolio also includes grocery, sugar, and feed-related businesses.",
    marketCap: "Approximately £13.07 billion",
    founded: "Incorporated on October 20, 1934"
  },
  "AZN": {
    summary: "AstraZeneca is a global, science-led biopharmaceutical company focused on the research, development, and commercialization of prescription medicines. Its portfolio is centered on oncology and other specialty therapeutic areas, supported by a broad international distribution footprint.",
    marketCap: "Approximately £233.15 billion",
    founded: "Incorporated on June 17, 1992"
  },
  "AUTO": {
    summary: "Auto Trader Group operates a leading digital automotive marketplace, providing advertising and data-driven services to facilitate vehicle transactions. Its business includes its core Auto Trader platform and Autorama, which focuses on leasing.",
    marketCap: "Approximately £3.85 billion",
    founded: "Incorporated on February 13, 2015"
  },
  "AV": {
    summary: "Aviva is a diversified insurance, wealth, and retirement services provider, offering general insurance products alongside long-term savings and investment management through Aviva Investors.",
    marketCap: "Approximately £18.88 billion",
    founded: "Incorporated on February 9, 1990"
  },
  "BAB": {
    summary: "Babcock International is a provider of engineering services supporting defense, aerospace, and security sectors. Its operations are organized across Marine, Nuclear, Land, and Aviation segments.",
    marketCap: "Approximately £6.16 billion",
    founded: "Incorporated on February 1, 1989"
  },
  "BA": {
    summary: "BAE Systems is a global defense, aerospace, and security company delivering advanced technology-led solutions. Its operations span electronic systems, air and maritime platforms, cyber and intelligence, and services.",
    marketCap: "Approximately £64.67 billion",
    founded: "Incorporated on May 19, 1999"
  },
  "BARC": {
    summary: "Barclays is a diversified international bank with operations across retail banking, corporate banking, investment banking, private banking, and wealth management, as well as a US consumer banking division.",
    marketCap: "Approximately £59.93 billion",
    founded: "Incorporated on July 20, 1948"
  },
  "BDEV": {
    summary: "Barratt Redrow is a UK-based housebuilder and residential property developer operating multiple brands, including Barratt, David Wilson, Redrow, and Barratt London. Its activities focus on large-scale residential development across the UK.",
    marketCap: "Approximately £3.63 billion",
    founded: "Incorporated on May 16, 1958"
  },
  "BEZ": {
    summary: "Beazley is a global specialist insurer and reinsurer, underwriting across diverse risk categories including cyber, marine, property, and specialty risks.",
    marketCap: "Approximately £7.52 billion",
    founded: "Incorporated on April 2, 1986"
  },
  "BKG": {
    summary: "Berkeley Group is a residential-led property developer focused on building homes and mixed-use developments, with a strong emphasis on brownfield regeneration in London and southern England.",
    marketCap: "Approximately £3.24 billion",
    founded: "Incorporated on July 7, 2004"
  },
  "BP": {
    summary: "BP is an integrated energy company with operations spanning oil and gas production, low-carbon energy initiatives, energy trading, and downstream customer-facing businesses including retail fuels and EV charging.",
    marketCap: "Approximately £89.73 billion",
    founded: "Incorporated on April 14, 1909"
  },
  "BATS": {
    summary: "British American Tobacco is a global consumer goods company focused on tobacco and nicotine products, including traditional combustibles as well as newer categories such as vapor, heated products, and oral nicotine.",
    marketCap: "Approximately £95.28 billion",
    founded: "Incorporated on July 23, 1997"
  },
  "BLND": {
    summary: "British Land is a UK real estate company focused on high-quality commercial property assets, including London campuses, retail parks, and urban logistics properties.",
    marketCap: "Approximately £3.75 billion",
    founded: "Incorporated on February 26, 1959"
  },
  "BT.A": {
    summary: "BT Group is a telecommunications and digital services provider offering fixed-line, mobile, and broadband services. Its operations are structured across consumer, business, international, and Openreach infrastructure divisions.",
    marketCap: "Approximately £21.01 billion",
    founded: "Incorporated on March 30, 2001"
  },
  "BNZL": {
    summary: "Bunzl is an international distribution and services group supplying essential non-food consumables and operational goods across sectors such as grocery, healthcare, cleaning, and safety.",
    marketCap: "Approximately £7.55 billion",
    founded: "Incorporated on January 22, 1940"
  },
  "BRBY": {
    summary: "Burberry is a global luxury goods company engaged in the design, manufacture, and sale of apparel and accessories, operating across retail, wholesale, and licensing channels.",
    marketCap: "Approximately £4.06 billion",
    founded: "Incorporated on October 30, 1997"
  },
  "CNA": {
    summary: "Centrica is an integrated energy company providing retail energy supply, energy services, trading and optimization, and upstream-related activities. Its offerings span residential and business customers.",
    marketCap: "Approximately £9.62 billion",
    founded: "Incorporated on March 16, 1995"
  },
  "CCH": {
    summary: "Coca-Cola HBC is a Switzerland-based bottling partner of The Coca-Cola Company, producing and distributing non-alcoholic beverages across a wide range of international markets.",
    marketCap: "Approximately £16.08 billion",
    founded: "Current corporate structure dates to 2013"
  },
  "CPG": {
    summary: "Compass Group is a global provider of food and support services, serving sectors including business, healthcare, education, sports and leisure, and remote environments.",
    marketCap: "Approximately $46.04 billion",
    founded: "Incorporated on September 29, 2000"
  },
  "CTEC": {
    summary: "ConvaTec is a medical technology company focused on products for chronic condition management, including wound care, ostomy care, continence care, and infusion therapies.",
    marketCap: "Approximately £4.52 billion",
    founded: "Incorporated on September 6, 2016"
  },
  "CRDA": {
    summary: "Croda International is a specialty chemicals company producing performance ingredients and technologies used across consumer care, life sciences, and industrial applications.",
    marketCap: "Approximately £4.08 billion",
    founded: "Incorporated on May 22, 1925"
  },
  "DCC": {
    summary: "DCC is an international sales, marketing, and support services group with operations spanning energy distribution and technology services.",
    marketCap: "Approximately £4.33 billion",
    founded: "Founded in 1976"
  },
  "DGE": {
    summary: "Diageo is a global leader in premium alcoholic beverages, producing and distributing a wide portfolio of spirits and beer brands across major international markets.",
    marketCap: "Approximately £31.88 billion",
    founded: "Incorporated on October 21, 1886"
  }
};

function getProfileTicker() {
  const params = new URLSearchParams(window.location.search);
  return params.get("ticker");
}

function getCompanyByTicker(ticker) {
  return cappedData.find(d => String(d.Ticker).toUpperCase() === String(ticker).toUpperCase());
}

function getSectorRows(sector) {
  return cappedData.filter(d => d.Sector === sector);
}

function rankOfTicker(scoreKey, ticker) {
  const ranked = rankSortedBy(scoreKey);
  const row = ranked.find(d => String(d.Ticker).toUpperCase() === String(ticker).toUpperCase());
  return row ? row.rank : null;
}

function profileRankTone(rank, total = cappedData.length) {
  if (!rank || total <= 1) return "rank-medium";

  const ratio = (Number(rank) - 1) / Math.max(1, total - 1);
  if (ratio < 1 / 3) return "rank-good";
  if (ratio < 2 / 3) return "rank-medium";
  return "rank-bad";
}

function sectorRankOfTicker(scoreKey, ticker, sector) {
  const rows = getSectorRows(sector)
    .slice()
    .sort((a, b) => a[scoreKey] - b[scoreKey]);

  const idx = rows.findIndex(d => String(d.Ticker).toUpperCase() === String(ticker).toUpperCase());
  return idx >= 0 ? idx + 1 : null;
}

function getProfileContact(ticker) {
  return PROFILE_CONTACTS[String(ticker).toUpperCase()] || null;
}

function getProfileContent(ticker) {
  return PROFILE_CONTENT[String(ticker).toUpperCase()] || null;
}

function renderProfileContacts(company) {
  const contactBlock = document.getElementById("profileContactBlock");
  const irEmailLink = document.getElementById("profileIrEmail");
  const contact = getProfileContact(company.Ticker);

  if (!contactBlock || !irEmailLink) return;

  if (!contact || (!contact.irEmail && !contact.irPhone)) {
    contactBlock.hidden = true;
    irEmailLink.textContent = "";
    irEmailLink.removeAttribute("href");
    return;
  }

  if (contact.irPhone) {
    const telHref = `tel:${contact.irPhone.replace(/\s+/g, "")}`;
    irEmailLink.textContent = contact.irPhone;
    irEmailLink.href = telHref;
  } else {
    irEmailLink.textContent = contact.irEmail;
    irEmailLink.href = `mailto:${contact.irEmail}`;
  }

  contactBlock.hidden = false;
}

function renderProfileOverview(company) {
  const content = getProfileContent(company.Ticker);
  const summaryEl = document.getElementById("profileBusinessSummary");
  const marketCapEl = document.getElementById("profileMarketCap");
  const foundedEl = document.getElementById("profileFounded");

  if (summaryEl) {
    summaryEl.textContent = content
      ? content.summary
      : "Company background for this profile has not been added yet.";
  }

  if (marketCapEl) {
    marketCapEl.textContent = content
      ? content.marketCap
      : "Not yet added";
  }

  if (foundedEl) {
    foundedEl.textContent = content
      ? content.founded
      : "Not yet added";
  }
}

function renderProfileHeader(company) {
  const logo = document.getElementById("profileLogo");
  const logoShell = document.getElementById("profileLogoShell");

  document.getElementById("profileCompanyName").textContent = company.Company;
  document.getElementById("profileTicker").textContent = company.Ticker;
  const content = getProfileContent(company.Ticker);

  document.getElementById("profileIntro").textContent =
    content
      ? content.summary
      : `${company.Company} is classified in ${company.Sector}. The profile below shows its Environment, Social, and composite ESG exposure analytics under the current public-facing model.`;

  document.getElementById("profileMetaText").textContent =
    `${company.Company} · ${company.Ticker} · ${company.Sector}`;

  if (logo && logoShell) {
    logo.src = `assets/images/${String(company.Ticker).toUpperCase()}.png`;
    logo.alt = `${company.Company} logo`;
    logo.onload = () => {
      logoShell.hidden = false;
    };
    logo.onerror = () => {
      logoShell.hidden = true;
    };
    logoShell.hidden = false;
  }

  renderProfileContacts(company);

  const overallRank = rankOfTicker("ESG_Score", company.Ticker);
  const envRank = rankOfTicker("Environment_Score", company.Ticker);
  const socRank = rankOfTicker("Social_Score", company.Ticker);

  document.getElementById("profileSignalList").innerHTML = `
    <div class="signal">
      <span class="name">Overall ESG rank</span>
      <span class="tag ${profileRankTone(overallRank)}">#${overallRank}</span>
    </div>
    <div class="signal">
      <span class="name">Environment rank</span>
      <span class="tag ${profileRankTone(envRank)}">#${envRank}</span>
    </div>
    <div class="signal">
      <span class="name">Social rank</span>
      <span class="tag ${profileRankTone(socRank)}">#${socRank}</span>
    </div>
  `;
}

function renderStats(company) {
  const grid = document.getElementById("profileStatsGrid");
  if (!grid) return;

  grid.innerHTML = `
    <div class="stat">
      <div class="stat-value">${fmtPct(company.Environment_Score)}</div>
      <div class="stat-label">Environment</div>
    </div>
    <div class="stat">
      <div class="stat-value">${fmtPct(company.Social_Score)}</div>
      <div class="stat-label">Social</div>
    </div>
    <div class="stat">
      <div class="stat-value">${fmtPct(company.ESG_Score)}</div>
      <div class="stat-label">Composite ESG</div>
    </div>
    <div class="stat">
      <div class="stat-value">${company.Sector}</div>
      <div class="stat-label">Sector</div>
    </div>
  `;
}

function renderBars(company) {
  const mapping = [
    ["e1Pill", "e1Bar", company.Climate_Targets],
    ["e2Pill", "e2Bar", company.Investment_Transition],
    ["e3Pill", "e3Bar", company.Climate_Reporting],
    ["s1Pill", "s1Bar", company.DEI_Targets_Representation],
    ["s2Pill", "s2Bar", company.DEI_Programmes_Memberships],
    ["s3Pill", "s3Bar", company.Social_Incentives]
  ];

  mapping.forEach(([pillId, barId, value]) => {
    const pill = document.getElementById(pillId);
    const bar = document.getElementById(barId);
    if (pill) pill.textContent = fmtPct(value);
    if (bar) bar.style.width = `${value * 100}%`;
  });
}

function renderComparisonChart(company) {
  const sectorRows = getSectorRows(company.Sector);
  const sectorAvgEnv = mean(sectorRows.map(d => d.Environment_Score));
  const sectorAvgSoc = mean(sectorRows.map(d => d.Social_Score));
  const sectorAvgESG = mean(sectorRows.map(d => d.ESG_Score));

  const overallAvgEnv = mean(cappedData.map(d => d.Environment_Score));
  const overallAvgSoc = mean(cappedData.map(d => d.Social_Score));
  const overallAvgESG = mean(cappedData.map(d => d.ESG_Score));

  Plotly.newPlot(
    "profileComparisonChart",
    [
      {
        type: "bar",
        name: company.Company,
        x: ["Environment", "Social", "ESG"],
        y: [company.Environment_Score, company.Social_Score, company.ESG_Score],
        marker: { color: "#2f8b57" }
      },
      {
        type: "bar",
        name: "Sector Avg",
        x: ["Environment", "Social", "ESG"],
        y: [sectorAvgEnv, sectorAvgSoc, sectorAvgESG],
        marker: { color: "#4867c9" }
      },
      {
        type: "bar",
        name: "Index Avg",
        x: ["Environment", "Social", "ESG"],
        y: [overallAvgEnv, overallAvgSoc, overallAvgESG],
        marker: { color: "#c6872f" }
      }
    ],
    {
      barmode: "group",
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { l: 50, r: 20, t: 10, b: 40 },
      yaxis: { title: "Score" }
    },
    {
      responsive: true,
      displayModeBar: false
    }
  );
}

function renderRelativeChart(company) {
  const overallESGRank = rankOfTicker("ESG_Score", company.Ticker);
  const overallEnvRank = rankOfTicker("Environment_Score", company.Ticker);
  const overallSocRank = rankOfTicker("Social_Score", company.Ticker);

  const sectorESGRank = sectorRankOfTicker("ESG_Score", company.Ticker, company.Sector);
  const sectorEnvRank = sectorRankOfTicker("Environment_Score", company.Ticker, company.Sector);
  const sectorSocRank = sectorRankOfTicker("Social_Score", company.Ticker, company.Sector);

  Plotly.newPlot(
    "profileRelativeChart",
    [
      {
        type: "bar",
        name: "Overall Rank",
        x: ["ESG", "Environment", "Social"],
        y: [overallESGRank, overallEnvRank, overallSocRank],
        marker: { color: "#6d4cc4" }
      },
      {
        type: "bar",
        name: "Sector Rank",
        x: ["ESG", "Environment", "Social"],
        y: [sectorESGRank, sectorEnvRank, sectorSocRank],
        marker: { color: "#d95d5d" }
      }
    ],
    {
      barmode: "group",
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
      margin: { l: 50, r: 20, t: 10, b: 40 },
      yaxis: {
        title: "Rank",
        autorange: "reversed"
      }
    },
    {
      responsive: true,
      displayModeBar: false
    }
  );
}

function initProfilePage() {
  if (!Array.isArray(cappedData)) {
    console.error("cappedData is not available.");
    return;
  }

  const ticker = getProfileTicker();
  if (!ticker) {
    document.getElementById("profileCompanyName").textContent = "Profile Not Found";
    document.getElementById("profileTicker").textContent = "";
    document.getElementById("profileIntro").textContent =
      "No company ticker was provided in the URL.";
    return;
  }

  const company = getCompanyByTicker(ticker);
  if (!company) {
    document.getElementById("profileCompanyName").textContent = "Profile Not Found";
    document.getElementById("profileTicker").textContent = ticker;
    document.getElementById("profileIntro").textContent =
      "The selected company could not be found in the current data set.";
    return;
  }

  renderProfileHeader(company);
  renderProfileOverview(company);
  renderStats(company);
  renderBars(company);
  renderComparisonChart(company);
  renderRelativeChart(company);
}

document.addEventListener("DOMContentLoaded", initProfilePage);
