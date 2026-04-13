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

const PROFILE_DIRECTORY_DETAILS = {
  "III": { website: "https://www.3i.com/", hq: "1 Knightsbridge, London, SW1X 7LX, United Kingdom" },
  "ADM": { website: "https://www.admiralgroup.co.uk/", hq: "Capital Tower, Greyfriars Road, Cardiff, CF10 3AZ, Wales, United Kingdom" },
  "AAF": { website: "https://airtel.africa/", hq: "53-54 Grosvenor Street, London, W1K 3HU, United Kingdom" },
  "ALW": { website: "https://www.alliancewitan.com/", hq: "River Court, 5 West Victoria Dock Road, Dundee, DD1 3JT, United Kingdom" },
  "AAL": { website: "https://www.angloamerican.com/", hq: "17 Charterhouse Street, London, EC1N 6RA, United Kingdom" },
  "ANTO": { website: "https://www.antofagasta.co.uk/", hq: "103 Mount Street, London, W1K 2TJ, United Kingdom" },
  "AHT": { website: "https://www.ashtead-group.com/", hq: "100 Cheapside, London, United Kingdom" },
  "ABF": { website: "https://www.abf.co.uk/", hq: "Weston Centre, 10 Grosvenor Street, London, W1K 4QY, United Kingdom" },
  "AZN": { website: "https://www.astrazeneca.com/", hq: "1 Francis Crick Avenue, Cambridge Biomedical Campus, Cambridge, CB2 0AA, United Kingdom" },
  "AUTO": { website: "https://plc.autotrader.co.uk/", hq: "No.3 Circle Square, Manchester, United Kingdom" },
  "AV": { website: "https://www.aviva.com/", hq: "80 Fenchurch Street, London, EC3M 4AE, United Kingdom" },
  "BAB": { website: "https://www.babcockinternational.com/", hq: "33 Wigmore Street, London, W1U 1QX, United Kingdom" },
  "BA": { website: "https://www.baesystems.com/", hq: "6 Carlton Gardens, London, SW1Y 5AD, United Kingdom" },
  "BARC": { website: "https://home.barclays/", hq: "1 Churchill Place, London, E14 5HP, United Kingdom" },
  "BDEV": { website: "https://www.barrattdevelopments.co.uk/", hq: "Barratt House, Cartwright Way, Forest Business Park, Bardon Hill, Coalville, Leicestershire, LE67 1UF, United Kingdom" },
  "BEZ": { website: "https://www.beazley.com/", hq: "22 Bishopsgate, London, EC2N 4BQ, United Kingdom" },
  "BKG": { website: "https://www.berkeleygroup.co.uk/", hq: "Berkeley House, 19 Portsmouth Road, Cobham, Surrey, KT11 1JG, United Kingdom" },
  "BP": { website: "https://www.bp.com/", hq: "1 St James's Square, London, SW1Y 4PD, United Kingdom" },
  "BATS": { website: "https://www.bat.com/", hq: "Globe House, 4 Temple Place, London, WC2R 2PG, United Kingdom" },
  "BLND": { website: "https://www.britishland.com/", hq: "York House, 45 Seymour Street, London, W1H 7LX, United Kingdom" },
  "BT.A": { website: "https://www.bt.com/", hq: "1 Braham Street, London, E1 8EE, United Kingdom" },
  "BNZL": { website: "https://www.bunzl.com/", hq: "York House, 45 Seymour Street, London, W1H 7JT, United Kingdom" },
  "BRBY": { website: "https://www.burberryplc.com/", hq: "Horseferry House, Horseferry Road, London, SW1P 2AW, United Kingdom" },
  "CNA": { website: "https://www.centrica.com/", hq: "Millstream, Maidenhead Road, Windsor, Berkshire, SL4 5GD, United Kingdom" },
  "CCH": { website: "https://www.coca-colahellenic.com/", hq: "Turmstrasse 26, Zug, 6300, Switzerland" },
  "CPG": { website: "https://www.compass-group.com/", hq: "Compass House, Guildford Street, Chertsey, Surrey, KT16 9BQ, United Kingdom" },
  "CTEC": { website: "https://www.convatecgroup.com/", hq: "7th Floor, 20 Eastbourne Terrace, London, W2 6LG, United Kingdom" },
  "CRDA": { website: "https://www.croda.com/", hq: "Cowick Hall, Snaith, Goole, East Yorkshire, DN14 9AA, United Kingdom" },
  "DCC": { website: "https://www.dcc.ie/", hq: "DCC House, Leopardstown Road, Foxrock, Dublin 18, D18 PK00, Ireland" },
  "DGE": { website: "https://www.diageo.com/", hq: "Lakeside Drive, Park Royal, London, NW10 7HQ, United Kingdom" },
  "DPLM": { website: "https://www.diplomaplc.com/", hq: "10-11 Charterhouse Square, London, EC1M 6EE, United Kingdom" },
  "EDV": { website: "https://www.endeavourmining.com/", hq: "5 Young Street, London, W8 5EH, United Kingdom" },
  "ENT": { website: "https://entaingroup.com/", hq: "Alexandra House, 1 St Katherine's Way, London, E1W 1UY, United Kingdom" },
  "EZJ": { website: "https://www.easyjet.com/en/", hq: "Hangar 89, London Luton Airport, Luton, Bedfordshire, LU2 9PF, United Kingdom" },
  "EXPN": { website: "https://www.experianplc.com/", hq: "Newenham House, Northern Cross, Malahide Road, Dublin 17, D17 AY61, Ireland" },
  "FCIT": { website: "https://www.fandc.com/", hq: "80 George Street, Edinburgh, EH2 3BU, United Kingdom" },
  "FRES": { website: "https://www.fresnilloplc.com/", hq: "21 Upper Brook Street, London, W1K 7PY, United Kingdom" },
  "GAW": { website: "https://investor.games-workshop.com/", hq: "Willow Road, Lenton, Nottingham, NG7 2WS, United Kingdom" },
  "GLEN": { website: "https://www.glencore.com/", hq: "Baarermattstrasse 3, CH-6340 Baar, Switzerland" },
  "GSK": { website: "https://www.gsk.com/", hq: "79 New Oxford Street, London, WC1A 1DG, United Kingdom" },
  "HLN": { website: "https://www.haleon.com/", hq: "Building 5, First Floor The Heights, Weybridge, Surrey, KT13 0NY, United Kingdom" },
  "HLMA": { website: "https://www.halma.com/", hq: "Misbourne Court, Rectory Way, Amersham, Buckinghamshire, HP7 0DE, United Kingdom" },
  "HL": { website: "https://www.hl.co.uk/", hq: "One College Square South, Anchor Road, Bristol, BS1 5HL, United Kingdom" },
  "HIK": { website: "https://www.hikma.com/", hq: "13 Hanover Square, London, W1S 1HW, United Kingdom" },
  "HSX": { website: "https://www.hiscoxgroup.com/", hq: "1 Great St Helen's, London, EC3A 6HX, United Kingdom" },
  "HWDN": { website: "https://www.howdenjoinerygroup.com/", hq: "105 Wigmore Street, London, W1U 1QY, United Kingdom" },
  "HSBC": { website: "https://www.hsbc.com/", hq: "8 Canada Square, London, E14 5HQ, United Kingdom" },
  "IMI": { website: "https://www.imiplc.com/", hq: "Lakeside, Solihull Parkway, Birmingham Business Park, Birmingham, B37 7XZ, United Kingdom" },
  "IMB": { website: "https://www.imperialbrandsplc.com/", hq: "121 Winterstoke Road, Bristol, BS3 2LL, United Kingdom" },
  "INF": { website: "https://www.informa.com/", hq: "5 Howick Place, London, SW1P 1WG, United Kingdom" },
  "IHG": { website: "https://www.ihgplc.com/", hq: "1 Windsor Dials, Arthur Road, Windsor, Berkshire, SL4 1RS, United Kingdom" },
  "ICG": { website: "https://www.icgam.com/", hq: "Procession House, 55 Ludgate Hill, London, EC4M 7JW, United Kingdom" },
  "ITRK": { website: "https://www.intertek.com/", hq: "33 Cavendish Square, London, W1G 0PS, United Kingdom" },
  "IAG": { website: "https://www.iairgroup.com/", hq: "Harmsworth House, 13-15 Bouverie Street, London, EC4Y 8DP, United Kingdom" },
  "JD": { website: "https://www.jdplc.com/", hq: "JD Sports House, Hollinsbrook Way, Pilsworth, Bury, Lancashire, BL9 8RR, United Kingdom" },
  "KGF": { website: "https://www.kingfisher.com/", hq: "3 Sheldon Square, London, W2 6PX, United Kingdom" },
  "LAND": { website: "https://landsec.com/", hq: "100 Victoria Street, London, SW1E 5JL, United Kingdom" },
  "LGEN": { website: "https://group.legalandgeneral.com/", hq: "One Coleman Street, London, EC2R 5AA, United Kingdom" },
  "LLOY": { website: "https://www.lloydsbankinggroup.com/", hq: "25 Gresham Street, London, EC2V 7HN, United Kingdom" },
  "LMP": { website: "https://www.londonmetric.com/", hq: "22 Manchester Square, London, W1U 3PY, United Kingdom" },
  "LSEG": { website: "https://www.lseg.com/", hq: "10 Paternoster Square, London, EC4M 7LS, United Kingdom" },
  "MNG": { website: "https://www.mandg.com/", hq: "10 Fenchurch Avenue, London, EC3M 5AG, United Kingdom" },
  "MKS": { website: "https://corporate.marksandspencer.com/", hq: "Waterside House, 35 North Wharf Road, London, W2 1NW, United Kingdom" },
  "MRO": { website: "https://www.melroseplc.net/", hq: "11th Floor, The Colmore Building, 20 Colmore Circus Queensway, Birmingham, B4 6AT, United Kingdom" },
  "MNDI": { website: "https://www.mondigroup.com/", hq: "Building 1, 1st Floor, Aviator Park, Station Road, Addlestone, Surrey, KT15 2PG, United Kingdom" },
  "NG": { website: "https://www.nationalgrid.com/", hq: "1-3 Strand, London, WC2N 5EH, United Kingdom" },
  "NWG": { website: "https://investors.natwestgroup.com/", hq: "250 Bishopsgate, London, EC2M 4AA, United Kingdom" },
  "NXT": { website: "https://www.nextplc.co.uk/", hq: "Desford Road, Enderby, Leicester, LE19 4AT, United Kingdom" },
  "PSON": { website: "https://plc.pearson.com/", hq: "80 Strand, London, WC2R 0RL, United Kingdom" },
  "PSN": { website: "https://www.persimmonhomes.com/", hq: "Persimmon House, Fulford, York, YO19 4FE, United Kingdom" },
  "PHNX": { website: "https://www.thephoenixgroup.com/", hq: "1 Wythall Green Way, Wythall, Birmingham, B47 6WG, United Kingdom" },
  "PRU": { website: "https://www.prudentialplc.com/", hq: "1 Angel Court, London, EC2R 7AG, United Kingdom" },
  "RKT": { website: "https://www.reckitt.com/", hq: "103-105 Bath Road, Slough, Berkshire, SL1 3UH, United Kingdom" },
  "REL": { website: "https://www.relx.com/", hq: "1-3 Strand, London, WC2N 5JR, United Kingdom" },
  "RTO": { website: "https://www.rentokil-initial.com/", hq: "Riverbank, Meadows Business Park, Blackwater, Camberley, Surrey, GU17 9AB, United Kingdom" },
  "RMV": { website: "https://plc.rightmove.co.uk/", hq: "Wheat Wharf, 27a Shad Thames, London, SE1 2XY, United Kingdom" },
  "RIO": { website: "https://www.riotinto.com/", hq: "6 St James's Square, London, SW1Y 4AD, United Kingdom" },
  "RR": { website: "https://www.rolls-royce.com/", hq: "62 Buckingham Gate, London, SW1E 6AT, United Kingdom" },
  "SGE": { website: "https://www.sage.com/", hq: "North Park, Newcastle upon Tyne, NE13 9AA, United Kingdom" },
  "SBRY": { website: "https://www.about.sainsburys.co.uk/", hq: "33 Holborn, London, EC1N 2HT, United Kingdom" },
  "SDR": { website: "https://www.schroders.com/", hq: "1 London Wall Place, London, EC2Y 5AU, United Kingdom" },
  "SMT": { website: "https://www.scottishmortgageinvestmenttrust.com/", hq: "Atria One, 144 Morrison Street, Edinburgh, EH3 8EX, United Kingdom" },
  "SGRO": { website: "https://www.segro.com/", hq: "234 Bath Road, Slough, Berkshire, SL1 4EE, United Kingdom" },
  "SVT": { website: "https://www.severntrent.com/", hq: "Severn Trent Centre, 2 St John's Street, Coventry, CV1 2LZ, United Kingdom" },
  "SHEL": { website: "https://www.shell.com/", hq: "Shell Centre, London, SE1 7NA, United Kingdom" },
  "SN": { website: "https://www.smith-nephew.com/", hq: "15 Adam Street, London, WC2N 6LA, United Kingdom" },
  "SMIN": { website: "https://www.smiths.com/", hq: "4th Floor, 11-12 St James's Square, London, SW1Y 4LB, United Kingdom" },
  "SPX": { website: "https://www.spiraxsarcoengineering.com/", hq: "Charlton House, Cirencester Road, Cheltenham, Gloucestershire, GL53 8ER, United Kingdom" },
  "SSE": { website: "https://www.sse.com/", hq: "Inveralmond House, 200 Dunkeld Road, Perth, PH1 3AQ, United Kingdom" },
  "STJ": { website: "https://www.sjp.co.uk/", hq: "St. James's Place House, 1 Tetbury Road, Cirencester, Gloucestershire, GL7 1FP, United Kingdom" },
  "STAN": { website: "https://www.sc.com/", hq: "1 Basinghall Avenue, London, EC2V 5DD, United Kingdom" },
  "TW": { website: "https://www.taylorwimpey.co.uk/", hq: "Gate House, Turnpike Road, High Wycombe, Buckinghamshire, HP12 3NR, United Kingdom" },
  "TSCO": { website: "https://www.tescoplc.com/", hq: "Tesco House, Shire Park, Kestrel Way, Welwyn Garden City, Hertfordshire, AL7 1GA, United Kingdom" },
  "ULVR": { website: "https://www.unilever.com/", hq: "100 Victoria Embankment, London, EC4Y 0DY, United Kingdom" },
  "UTG": { website: "https://www.unite-group.co.uk/", hq: "1 St Ann's Place, Canons House, Bristol, BS2 9BA, United Kingdom" },
  "UU": { website: "https://www.unitedutilities.com/", hq: "Haweswater House, Lingley Mere Business Park, Lingley Green Avenue, Great Sankey, Warrington, WA5 3LP, United Kingdom" },
  "VOD": { website: "https://www.vodafone.com/", hq: "Vodafone House, The Connection, Newbury, Berkshire, RG14 2FN, United Kingdom" },
  "WEIR": { website: "https://www.global.weir/", hq: "16 West Nile Street, Glasgow, G1 2RQ, United Kingdom" },
  "WTB": { website: "https://www.whitbread.co.uk/", hq: "Whitbread Court, Houghton Hall Business Park, Porz Avenue, Dunstable, Bedfordshire, LU5 5XE, United Kingdom" },
  "WPP": { website: "https://www.wpp.com/", hq: "9-12 Waterloo Place, London, SW1Y 4BE, United Kingdom" }
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
  },
  "DPLM": {
    summary: "Diploma is a value-add distributor supplying specialized products and services across a range of industrial end markets. Its model focuses on niche, high-margin distribution with technical support capabilities.",
    marketCap: "Approximately GBP 8.96 billion",
    founded: "Incorporated on December 24, 1999"
  },
  "EDV": {
    summary: "Endeavour Mining is a gold producer with a concentrated operational footprint in West Africa, focused on large-scale, low-cost mining assets.",
    marketCap: "Approximately GBP 11.80 billion",
    founded: "Incorporated on March 21, 2021"
  },
  "ENT": {
    summary: "Entain is a global sports betting and gaming group operating across online platforms and retail betting outlets, with a diversified geographic presence.",
    marketCap: "Approximately GBP 3.37 billion",
    founded: "Incorporated on January 5, 2010"
  },
  "EZJ": {
    summary: "easyJet is a low-cost airline focused on short-haul passenger travel across Europe, operating a high-frequency, point-to-point route network.",
    marketCap: "Approximately GBP 2.77 billion",
    founded: "Incorporated on March 24, 2000"
  },
  "EXPN": {
    summary: "Experian is a global information services company providing credit data, analytics, and decisioning solutions to businesses and consumers. Its offerings support risk management, identity verification, and financial inclusion.",
    marketCap: "Approximately GBP 22.91 billion",
    founded: "Incorporated on June 30, 2006"
  },
  "FCIT": {
    summary: "F&C Investment Trust is a closed-ended investment company designed to deliver long-term capital growth through a diversified portfolio of global equities.",
    marketCap: "Approximately GBP 5.98 billion",
    founded: "Incorporated on March 15, 1879"
  },
  "FRES": {
    summary: "Fresnillo is a precious metals mining company focused on the production of silver and gold, with core operations located in Mexico.",
    marketCap: "Approximately GBP 26.03 billion",
    founded: "Incorporated on August 15, 2007"
  },
  "GAW": {
    summary: "Games Workshop is a designer and manufacturer of miniature wargaming products, supported by a strong intellectual property portfolio and licensing activities Games Workshop is our bet performing company reaching an Exposure Score of only 15.1%.",
    marketCap: "Approximately GBP 6.29 billion",
    founded: "Incorporated on December 9, 1991"
  },
  "GLEN": {
    summary: "Glencore is a global commodities group engaged in both the production and marketing of natural resources, with integrated industrial and trading operations.",
    marketCap: "Approximately GBP 66.24 billion",
    founded: "Incorporated on March 14, 2011"
  },
  "GSK": {
    summary: "GSK is a global biopharmaceutical company focused on developing medicines and vaccines across major therapeutic areas, with a strong emphasis on innovation and global health.",
    marketCap: "Approximately GBP 86.59 billion",
    founded: "Incorporated on December 6, 1999"
  },
  "HLN": {
    summary: "Haleon is a consumer healthcare company focused on everyday health products, spanning categories such as oral health, vitamins and supplements, pain relief, respiratory, digestive, and skin health.",
    marketCap: "Approximately GBP 32.35 billion",
    founded: "Incorporated on October 20, 2021"
  },
  "HLMA": {
    summary: "Halma is a technology group specializing in life-saving products and solutions across safety, environmental monitoring, and healthcare applications.",
    marketCap: "Approximately GBP 15.77 billion",
    founded: "Incorporated on April 13, 1894"
  },
  "HL": {
    summary: "Hargreaves Lansdown is a UK-based investment and savings platform serving retail investors with brokerage, fund distribution, and wealth management services. The company has transitioned to private ownership and therefore does not currently have a public market capitalization.",
    marketCap: "No current public market capitalization",
    founded: "Incorporated on April 10, 1987"
  },
  "HIK": {
    summary: "Hikma Pharmaceuticals is a multinational pharmaceutical company producing generic, branded, and specialty medicines, with key segments including injectables, branded products, and generics.",
    marketCap: "Approximately GBP 3.77 billion",
    founded: "Incorporated on September 8, 2005"
  },
  "HSX": {
    summary: "Hiscox is an international specialist insurer underwriting a broad range of personal and commercial risks, with a focus on high-value and complex insurance segments.",
    marketCap: "Approximately GBP 5.08 billion",
    founded: "Incorporation date not yet verified"
  },
  "HWDN": {
    summary: "Howden Joinery Group is a supplier of kitchens and joinery products, primarily serving trade professionals through a nationwide depot network.",
    marketCap: "Approximately GBP 4.41 billion",
    founded: "Incorporated on May 7, 1987"
  },
  "HSBC": {
    summary: "HSBC Holdings is a global banking and financial services group, offering retail banking, commercial banking, investment banking, and wealth management services across international markets.",
    marketCap: "Approximately GBP 226.90 billion",
    founded: "Incorporated on January 1, 1959"
  },
  "IMI": {
    summary: "IMI is a specialist engineering company focused on fluid and motion control technologies, serving industrial, energy, and process markets.",
    marketCap: "Approximately GBP 6.76 billion",
    founded: "Incorporated on February 2, 1962"
  },
  "IMB": {
    summary: "Imperial Brands is a global tobacco company producing and distributing a range of nicotine products, including traditional combustibles and next-generation alternatives.",
    marketCap: "Approximately GBP 24.20 billion",
    founded: "Incorporated on August 6, 1996"
  },
  "INF": {
    summary: "Informa is a business services company providing market intelligence, academic publishing, and events platforms across a range of industries.",
    marketCap: "Approximately GBP 9.80 billion",
    founded: "Incorporated on January 24, 2014"
  },
  "IHG": {
    summary: "InterContinental Hotels Group is a global hospitality company operating a portfolio of hotel brands across multiple market segments, including luxury, premium, and midscale.",
    marketCap: "Approximately USD 20.65 billion",
    founded: "Incorporated on May 21, 2004"
  },
  "ICG": {
    summary: "ICG (Intermediate Capital Group) is an alternative asset manager specializing in private debt, credit, and structured capital solutions.",
    marketCap: "Approximately GBP 4.86 billion",
    founded: "Incorporated on March 23, 1988"
  },
  "ITRK": {
    summary: "Intertek Group is a provider of assurance, testing, inspection, and certification services supporting quality and compliance across global industries.",
    marketCap: "Approximately GBP 5.77 billion",
    founded: "Incorporated on August 9, 2001"
  },
  "IAG": {
    summary: "International Consolidated Airlines Group (IAG) is a holding company for a portfolio of airline and aviation-related businesses, including full-service and low-cost carriers.",
    marketCap: "Approximately GBP 16.97 billion",
    founded: "Incorporated on December 17, 2009"
  },
  "JD": {
    summary: "JD Sports Fashion is a specialty retailer focused on sportswear and athleisure products, operating both physical stores and digital platforms across international markets.",
    marketCap: "Approximately GBP 3.62 billion",
    founded: "Incorporated on February 21, 1985"
  },
  "KGF": {
    summary: "Kingfisher is an international home improvement retailer operating multiple brands across Europe, serving both DIY consumers and trade professionals.",
    marketCap: "Approximately GBP 4.63 billion",
    founded: "Incorporated on September 16, 1982"
  },
  "LAND": {
    summary: "Land Securities is a UK real estate investment trust with a portfolio focused on urban office, retail, and mixed-use developments.",
    marketCap: "Approximately GBP 4.24 billion",
    founded: "Incorporated on February 7, 2002"
  },
  "LGEN": {
    summary: "Legal & General is a financial services group providing retirement solutions, asset management, insurance, and institutional investment services.",
    marketCap: "Approximately GBP 13.54 billion",
    founded: "Incorporated on February 27, 1979"
  },
  "LLOY": {
    summary: "Lloyds Banking Group is a UK-focused financial services provider offering retail and commercial banking, along with insurance, pensions, and investment products. Lloyds is our worst performing company reaching an Exposure Score of 80.2%.",
    marketCap: "Approximately GBP 58.20 billion",
    founded: "Incorporated on October 21, 1985"
  },
  "LMP": {
    summary: "LondonMetric Property is a real estate investment trust focused on long-term, triple net lease assets across logistics, healthcare, convenience retail, and leisure sectors.",
    marketCap: "Approximately GBP 4.97 billion",
    founded: "Incorporated on January 13, 2010"
  },
  "MNG": {
    summary: "M&G is a UK-based asset management and insurance group offering investment, savings, and retirement solutions across retail and institutional markets.",
    marketCap: "Approximately GBP 7.42 billion",
    founded: "Incorporated on January 3, 2017"
  },
  "MKS": {
    summary: "Marks & Spencer is a leading UK retailer focused on clothing, food, and home products, with a strong domestic presence and a well-established consumer brand.",
    marketCap: "Approximately GBP 5.12 billion",
    founded: "Incorporated on December 12, 1932"
  },
  "MRO": {
    summary: "Melrose Industries is an engineering group specializing in aerospace and automotive components, with a business model centered on owning and improving industrial assets.",
    marketCap: "Approximately GBP 3.21 billion",
    founded: "Incorporated on March 28, 2003"
  },
  "MNDI": {
    summary: "Mondi is an international packaging and paper group serving both consumer and industrial markets through a broad portfolio of packaging solutions and paper products.",
    marketCap: "Approximately GBP 12.45 billion",
    founded: "Incorporated on November 10, 2007"
  },
  "NG": {
    summary: "National Grid is a utilities company focused on electricity and gas transmission infrastructure, with major operations in both the UK and the United States.",
    marketCap: "Approximately GBP 53.82 billion",
    founded: "Incorporated on May 2, 1995"
  },
  "NWG": {
    summary: "NatWest Group is a UK banking group providing retail and commercial banking services, with a business centered on domestic personal and business customers.",
    marketCap: "Approximately GBP 45.67 billion",
    founded: "Incorporated on December 19, 1999"
  },
  "NXT": {
    summary: "Next is a British retailer of clothing, footwear, and home products, with a significant online presence alongside its store network.",
    marketCap: "Approximately GBP 15.33 billion",
    founded: "Incorporated on February 5, 1986"
  },
  "PSON": {
    summary: "Pearson is an education company providing learning content, assessment tools, and educational services across academic and professional markets.",
    marketCap: "Approximately GBP 4.12 billion",
    founded: "Incorporated on October 5, 1948"
  },
  "PSH": {
    summary: "Pershing Square Holdings is an investment holding company that serves as the listed hedge fund vehicle for Pershing Square's concentrated investment strategy.",
    marketCap: "Approximately GBP 1.80 billion",
    founded: "Incorporated in Jersey on May 25, 2012"
  },
  "PSN": {
    summary: "Persimmon is a UK housebuilder focused on residential construction and large-scale home development across the domestic housing market.",
    marketCap: "Approximately GBP 8.90 billion",
    founded: "Incorporated on June 30, 1972"
  },
  "PHNX": {
    summary: "Phoenix Group is an insurance holding company specializing in life insurance and long-term pensions and retirement products.",
    marketCap: "Approximately GBP 8.25 billion",
    founded: "Incorporated on January 28, 2000"
  },
  "PRU": {
    summary: "Prudential is an international insurance group with a strong presence across Asia and Africa, offering life insurance, health insurance, and long-term savings products.",
    marketCap: "Approximately GBP 29.12 billion",
    founded: "Incorporated on October 5, 1914"
  },
  "RKT": {
    summary: "Reckitt Benckiser is a global consumer goods company focused on health, hygiene, and home products through a portfolio of widely recognized household brands.",
    marketCap: "Approximately GBP 35.47 billion",
    founded: "Incorporated on January 18, 1999"
  },
  "REL": {
    summary: "RELX is an information and analytics company providing data-driven tools and decision-support services across scientific, legal, risk, and business markets.",
    marketCap: "Approximately GBP 44.23 billion",
    founded: "Incorporated on March 23, 2013"
  },
  "RTO": {
    summary: "Rentokil Initial is a global commercial services group best known for pest control, hygiene, and workplace-related support services.",
    marketCap: "Approximately GBP 7.84 billion",
    founded: "Incorporated on April 22, 1980"
  },
  "RMV": {
    summary: "Rightmove is an online property portal focused on residential real estate listings, connecting estate agents, developers, and home seekers through its digital platform.",
    marketCap: "Approximately GBP 6.53 billion",
    founded: "Incorporated on March 11, 2000"
  },
  "RIO": {
    summary: "Rio Tinto is a global mining group producing metals and minerals through a geographically diversified portfolio of large-scale operations.",
    marketCap: "Approximately GBP 72.18 billion",
    founded: "Incorporated on November 25, 1962"
  },
  "RR": {
    summary: "Rolls-Royce is an aerospace and defense engineering company best known for aircraft engines and power systems serving civil and military markets.",
    marketCap: "Approximately GBP 5.18 billion",
    founded: "Incorporated on May 21, 1906"
  },
  "SGE": {
    summary: "Sage Group is a software company specializing in accounting, payroll, and business management tools for small and mid-sized enterprises.",
    marketCap: "Approximately GBP 7.16 billion",
    founded: "Incorporated on May 24, 1981"
  },
  "SBRY": {
    summary: "Sainsbury's is a major UK supermarket group selling groceries, food products, and general merchandise through a nationwide retail network.",
    marketCap: "Approximately GBP 7.34 billion",
    founded: "Incorporated on August 16, 1924"
  },
  "SDR": {
    summary: "Schroders is an asset management company providing investment management, wealth management, and fund solutions across institutional and private client markets.",
    marketCap: "Approximately GBP 12.03 billion",
    founded: "Incorporated on January 20, 1895"
  },
  "SMT": {
    summary: "Scottish Mortgage Trust is an investment trust focused on long-term growth through a globally diversified portfolio of public and private equities.",
    marketCap: "Approximately GBP 10.24 billion",
    founded: "Incorporated on August 16, 1909"
  },
  "SGRO": {
    summary: "Segro is a European real estate investment trust focused on industrial and warehouse properties, with a portfolio geared toward logistics and modern urban distribution infrastructure.",
    marketCap: "Approximately GBP 10.11 billion",
    founded: "Incorporated on November 27, 1920"
  },
  "SVT": {
    summary: "Severn Trent is a UK water utility company responsible for water supply, wastewater treatment, and related infrastructure services.",
    marketCap: "Approximately GBP 7.57 billion",
    founded: "Incorporated on December 18, 1989"
  },
  "SHEL": {
    summary: "Shell is a global energy and petrochemicals company with operations spanning upstream production, downstream refining and marketing, chemicals, and lower-carbon energy initiatives.",
    marketCap: "Approximately GBP 137.82 billion",
    founded: "UK corporate lineage dates to March 18, 1907"
  },
  "SN": {
    summary: "Smith & Nephew is a medical technology company focused on orthopaedics, wound care, and sports medicine products used across hospital and clinical settings.",
    marketCap: "Approximately GBP 6.14 billion",
    founded: "Incorporated on May 7, 1856"
  },
  "SMIN": {
    summary: "Smiths Group is an engineering company serving industrial, energy, security, and medical markets through a portfolio of specialized technology businesses.",
    marketCap: "Approximately GBP 4.39 billion",
    founded: "Incorporated on January 23, 1851"
  },
  "SPX": {
    summary: "Spirax-Sarco is an industrial engineering company specializing in steam-system solutions, thermal energy management, and process-control technologies.",
    marketCap: "Approximately GBP 7.93 billion",
    founded: "Incorporated on February 8, 1890"
  },
  "SSE": {
    summary: "SSE is an electricity and gas utility group with operations spanning energy networks, power generation, and retail-related activities.",
    marketCap: "Approximately GBP 22.47 billion",
    founded: "Incorporated on November 11, 1975"
  },
  "STJ": {
    summary: "St. James's Place is a wealth management and financial services group serving clients through a large adviser-led distribution network.",
    marketCap: "Approximately GBP 8.82 billion",
    founded: "Incorporated on September 3, 1992"
  },
  "STAN": {
    summary: "Standard Chartered is an international banking group with a strong footprint across Asia, Africa, and the Middle East, providing corporate, institutional, and retail banking services.",
    marketCap: "Approximately GBP 61.35 billion",
    founded: "Incorporated on March 10, 1969"
  },
  "TW": {
    summary: "Taylor Wimpey is a British housebuilder focused on residential construction, delivering large-scale housing developments across the UK.",
    marketCap: "Approximately GBP 5.04 billion",
    founded: "Incorporated on October 12, 2007"
  },
  "TSCO": {
    summary: "Tesco is a leading UK retailer offering groceries, general merchandise, and online services, supported by a nationwide store network and digital platforms.",
    marketCap: "Approximately GBP 22.15 billion",
    founded: "Incorporated on September 3, 1919"
  },
  "ULVR": {
    summary: "Unilever is a multinational consumer goods company producing a broad range of food, home, and personal care products sold across global markets.",
    marketCap: "Approximately GBP 94.27 billion",
    founded: "Incorporated on June 7, 1929"
  },
  "UTG": {
    summary: "Unite Group is a UK-based real estate investment trust specializing in purpose-built student accommodation, serving university markets across the country.",
    marketCap: "Approximately GBP 4.39 billion",
    founded: "Incorporated on August 7, 1991"
  },
  "UU": {
    summary: "United Utilities is a UK water and wastewater services provider responsible for critical infrastructure supporting residential and commercial customers.",
    marketCap: "Approximately GBP 8.11 billion",
    founded: "Incorporated on June 6, 1989"
  },
  "VOD": {
    summary: "Vodafone Group is a global telecommunications operator providing mobile, broadband, and digital services across multiple international markets.",
    marketCap: "Approximately GBP 29.50 billion",
    founded: "Incorporated on February 19, 1991"
  },
  "WEIR": {
    summary: "Weir Group is an engineering company supplying equipment and services to mining, oil, and gas industries, with a focus on critical infrastructure and process technologies.",
    marketCap: "Approximately GBP 3.23 billion",
    founded: "Incorporated on January 12, 1871"
  },
  "WTB": {
    summary: "Whitbread is a hospitality company operating hotels, restaurants, and related services, with a strong presence in the UK lodging market.",
    marketCap: "Approximately GBP 7.05 billion",
    founded: "Incorporated on October 6, 1742"
  },
  "WPP": {
    summary: "WPP is a global marketing and communications company providing advertising, media investment, public relations, and data-driven marketing services to clients worldwide.",
    marketCap: "Approximately GBP 14.32 billion",
    founded: "Incorporated on July 29, 1971"
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

function getProfileDirectoryDetails(ticker) {
  return PROFILE_DIRECTORY_DETAILS[String(ticker).toUpperCase()] || null;
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

function renderProfileDirectoryDetails(company) {
  const websiteEl = document.getElementById("profileWebsite");
  const hqEl = document.getElementById("profileHq");
  const details = getProfileDirectoryDetails(company.Ticker);

  if (websiteEl) {
    if (details?.website) {
      websiteEl.innerHTML = `<a href="${details.website}" target="_blank" rel="noopener noreferrer" class="section-link">Visit website</a>`;
    } else {
      websiteEl.textContent = "Not yet added";
    }
  }

  if (hqEl) {
    hqEl.textContent = details?.hq || "Not yet added";
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
  renderProfileDirectoryDetails(company);
  renderStats(company);
  renderBars(company);
  renderComparisonChart(company);
  renderRelativeChart(company);
}

document.addEventListener("DOMContentLoaded", initProfilePage);
