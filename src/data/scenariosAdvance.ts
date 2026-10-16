import { Scenario } from '../types';

export const scenariosAdvance: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "Executive Job Interview & Retention Analytics",
      description: "A formal executive interview focusing on churn modeling and predictive data analytics.",
      transcript: "[M1]Good morning, Ms. Rahman. Thank you for coming in today. Let me start by asking about your experience at DataFlow Analytics. You were there for two years as a junior data analyst, is that correct? [F2]That's correct. I joined in January twenty-twenty-two and left in December twenty-twenty-three. During my time there, I primarily worked on customer segmentation projects using Python and SQL. [M1]Can you give me a specific example of a project where your analysis led to a measurable business outcome? [F2]Certainly. In my second year, I led a churn prediction model that identified customers likely to cancel their subscriptions within the next three months. The model achieved eighty-seven percent accuracy, and by targeting those customers with personalised retention offers, we reduced the monthly churn rate from four point two percent to three point one percent. [M1]That's impressive. What about your experience with data visualisation tools? [F2]I'm proficient in Tableau and Power BI. At DataFlow, I built executive dashboards that were reviewed weekly by the C-suite. Regarding salary expectations, what range are you looking for? Based on my research and experience, I'm looking for a range of seventy to eighty-five thousand annually, but I'm flexible depending on the benefits package and growth opportunities.",
      questions: [
        {
          id: "adv_s1_q1",
          text: "What was the accuracy of the churn prediction model developed by the candidate?",
          options: ["75%", "80%", "87%", "92%"],
          correct: "87%",
          category: "numbers",
          explanation: "The candidate states that the model achieved eighty-seven percent accuracy."
        },
        {
          id: "adv_s1_q2",
          text: "By how much did the company's monthly churn rate decrease as a result of the model?",
          options: ["From 4.2% to 3.1%", "From 5.0% to 3.1%", "From 4.2% to 2.5%", "From 3.1% to 4.2%"],
          correct: "From 4.2% to 3.1%",
          category: "numbers",
          explanation: "The transcript mentions reducing monthly churn from four point two percent to three point one percent."
        },
        {
          id: "adv_s1_q3",
          text: "What annual salary range did the candidate specify during the interview?",
          options: ["$60K–$75K", "$70K–$85K", "$80K–$95K", "$85K–$100K"],
          correct: "$70K–$85K",
          category: "numbers",
          explanation: "The candidate stated she was looking for a range of seventy to eighty-five thousand annually."
        }
      ]
    }
  ],
  "Section 2": [
    {
      title: "Research Methodology — Empirical vs Theoretical Paradigms",
      description: "A university seminar examining quantitative versus qualitative research methodologies.",
      transcript: "[M5]Today we're going to discuss the critical distinction between qualitative and quantitative research methodologies, and more importantly, when and why you should choose one over the other. Quantitative research deals with numbers and measurable variables. It uses statistical analysis to test hypotheses and establish patterns across large sample sizes. The gold standard here is the randomised controlled trial, but in social sciences, we more commonly use surveys with Likert scales or structured observational coding. The strength of quantitative methods is generalisability. If you survey a representative sample of five hundred people, you can statistically infer findings to a population of millions, typically with a margin of error of plus or minus four to five percent at a ninety-five percent confidence level. Qualitative research, on the other hand, focuses on understanding meaning, context, and process. Methods include in-depth interviews, focus groups, ethnographic observation, and thematic analysis of texts. Sample sizes are deliberately small, often between twelve and thirty participants, because the goal is not statistical generalisation but rather analytical generalisation, meaning you develop theoretical insights that can apply to similar contexts. The most robust approach is often mixed methods, where you use qualitative findings to generate hypotheses and then test them quantitatively, or vice versa.",
      questions: [
        {
          id: "adv_s2_q1",
          text: "What is described by the lecturer as the gold standard in quantitative research?",
          options: ["Survey research", "Case studies", "Randomised controlled trial", "Ethnography"],
          correct: "Randomised controlled trial",
          category: "factual",
          explanation: "The lecturer mentions that the gold standard in quantitative research is the randomised controlled trial."
        },
        {
          id: "adv_s2_q2",
          text: "What is the typical participant sample size range for qualitative research studies?",
          options: ["5–10", "12–30", "50–100", "200–500"],
          correct: "12–30",
          category: "numbers",
          explanation: "The speaker indicates that qualitative sample sizes are deliberately small, often between twelve and thirty participants."
        },
        {
          id: "adv_s2_q3",
          text: "In qualitative research methodology, what type of generalisation is the primary objective?",
          options: ["Statistical", "Analytical", "Demographic", "Predictive"],
          correct: "Analytical",
          category: "inference",
          explanation: "The goal in qualitative research is stated as analytical generalisation, developing transferable theoretical insights rather than statistical generalisation."
        }
      ]
    }
  ],
  "Section 3": [
    {
      title: "Corporate Fiscal Review & Capital Expenditure Allocation",
      description: "Executive discussion on quarterly earnings, operating margin expansion, and automated fulfillment investments.",
      transcript: "[F1]Good afternoon, members of the board. In reviewing our third-quarter fiscal performance, operating margins expanded by three hundred and forty basis points, reaching twenty-two point eight percent. [M2]That represents significant progress, Evelyn. Where were those efficiency gains primarily generated? [F1]Primarily through software vendor consolidation and automated inventory processing. Looking forward into fiscal year twenty-twenty-seven, our proposed capital expenditure budget designates forty-two million dollars for automated fulfillment hubs across the Midwest. We anticipate this investment will yield eighteen percent operational savings over a three-year payback horizon. [M2]And how are we handling the inflationary wage increases in customer support? [F1]Wage increases were entirely counterbalanced by consolidating redundant enterprise software licenses and migrating legacy workloads to unified serverless cloud tiers.",
      questions: [
        {
          id: "adv_s3_q1",
          text: "By how many basis points did the company's operating margin expand in the third quarter?",
          options: ["220 basis points", "340 basis points", "410 basis points", "480 basis points"],
          correct: "340 basis points",
          category: "numbers",
          explanation: "The speaker mentions that operating margins expanded by three hundred and forty basis points."
        },
        {
          id: "adv_s3_q2",
          text: "What capital expenditure amount is allocated for automated fulfillment hubs?",
          options: ["$25 million", "$34 million", "$42 million", "$55 million"],
          correct: "$42 million",
          category: "numbers",
          explanation: "The CFO specifies forty-two million dollars for automated fulfillment hubs."
        },
        {
          id: "adv_s3_q3",
          text: "How did the executive team offset inflationary customer support wage pressures?",
          options: ["Through workforce reductions", "Through software consolidation", "By increasing retail prices", "By deferring dividend payouts"],
          correct: "Through software consolidation",
          category: "factual",
          explanation: "Wage pressures were counterbalanced by consolidating redundant enterprise software licenses."
        }
      ]
    }
  ],
  "Section 4": [
    {
      title: "Supply Chain Nearshoring & Maritime Disruption",
      description: "Logistics directors discuss ocean freight delays and moving manufacturing closer to domestic markets.",
      transcript: "[M3]Rachel, our component lead times from overseas suppliers surged from twenty-eight days up to sixty-five days due to maritime choke points in the Malacca Strait. [F3]I've reviewed the numbers, Marcus. Freight container spot rates also spiked by ninety percent. My proposal is to nearshore thirty-five percent of our tier-one subassembly production to Monterrey, Mexico. [M3]What will that do to unit manufacturing costs? [F3]It carries a seven percent manufacturing cost premium per unit. However, shipping transit time drops dramatically from sixty-five days on the water to just six days via overland freight. That frees up eighteen million dollars in safety stock inventory and reduces supply chain fragility.",
      questions: [
        {
          id: "adv_s4_q1",
          text: "To what duration did overseas component lead times surge during the maritime disruption?",
          options: ["42 days", "50 days", "65 days", "80 days"],
          correct: "65 days",
          category: "numbers",
          explanation: "Marcus points out that lead times surged from twenty-eight days up to sixty-five days."
        },
        {
          id: "adv_s4_q2",
          text: "What proportion of tier-one manufacturing is proposed to be nearshored to Mexico?",
          options: ["20%", "35%", "50%", "65%"],
          correct: "35%",
          category: "numbers",
          explanation: "Rachel proposes nearshoring thirty-five percent of tier-one subassembly production."
        },
        {
          id: "adv_s4_q3",
          text: "Why is nearshoring deemed advantageous despite the 7% manufacturing cost premium?",
          options: ["It reduces raw material tariff duties", "It eliminates domestic tax requirements", "It shortens shipping transit to just 6 days", "It guarantees zero equipment maintenance"],
          correct: "It shortens shipping transit to just 6 days",
          category: "inference",
          explanation: "Shipping transit decreases from sixty-five days to just six days via overland trucking."
        }
      ]
    }
  ],
  "Section 5": [
    {
      title: "Clinical Pharmacovigilance & Phase III Trial Outcomes",
      description: "Pharmaceutical researchers evaluate oncology clinical trial efficacy and regulatory approvals.",
      transcript: "[F2]Welcome, everyone. We have assembled the multi-center Phase Three data for monoclonal antibody ABX-409, encompassing two thousand four hundred enrolled oncology patients. [M4]Dr. Chen, could you address the safety profile and adverse incident rates? [F2]Certainly. Severe adverse incidents occurred in three point two percent of the treatment group, compared with two point nine percent in the placebo control cohort, indicating acceptable tolerability. More critically, biomarker surveillance confirmed a forty-four percent reduction in tumor progression at the eighteen-month milestone. [M4]That is exceptional clinical efficacy. What is our next regulatory milestone? [F2]The FDA reviewed the interim survival statistics and granted expedited breakthrough therapy designation, allowing us to file the Biologics License Application six months ahead of schedule.",
      questions: [
        {
          id: "adv_s5_q1",
          text: "How many patients were enrolled across the Phase III clinical trial for ABX-409?",
          options: ["1,200", "1,800", "2,400", "3,600"],
          correct: "2,400",
          category: "numbers",
          explanation: "Dr. Chen specifies encompassing two thousand four hundred enrolled oncology patients."
        },
        {
          id: "adv_s5_q2",
          text: "What reduction in tumor progression was observed at the 18-month evaluation mark?",
          options: ["28%", "36%", "44%", "52%"],
          correct: "44%",
          category: "numbers",
          explanation: "Biomarker surveillance confirmed a forty-four percent reduction in tumor progression."
        },
        {
          id: "adv_s5_q3",
          text: "What regulatory milestone was granted to the drug candidate by the FDA?",
          options: ["Standard market approval", "Expedited breakthrough designation", "Emergency use authorization", "Conditional investigational waiver"],
          correct: "Expedited breakthrough designation",
          category: "factual",
          explanation: "The FDA granted expedited breakthrough therapy designation based on the survival statistics."
        }
      ]
    }
  ],
  "Section 6": [
    {
      title: "Urban Mobility & Public Transit Electrification",
      description: "Municipal transit officials present capital requirements and environmental targets for clean bus fleets.",
      transcript: "[M5]City transit commissioners, our strategic objective is the full decarbonization of the municipal bus network by twenty-thirty-two. Transitioning all eight hundred and fifty diesel coaches to battery electric and hydrogen fuel cells entails an initial capital layout of one hundred and eighty million dollars, amortized over fifteen years. [F1]What infrastructure challenges do our primary bus maintenance depots face? [M5]The primary constraint is electrical substation capacity. Our four main transit depots will require forty-five megawatts of dedicated grid connectivity to support overnight fast charging. Once fully commissioned, the zero-emission fleet will eliminate eighty-five thousand metric tons of greenhouse gas emissions annually across the metropolitan basin.",
      questions: [
        {
          id: "adv_s6_q1",
          text: "By what target year does the municipal transport authority plan to complete fleet decarbonization?",
          options: ["2028", "2030", "2032", "2035"],
          correct: "2032",
          category: "numbers",
          explanation: "The strategic objective is full decarbonization of the bus network by twenty-thirty-two (2032)."
        },
        {
          id: "adv_s6_q2",
          text: "How much dedicated electrical grid capacity will the four primary bus depots require?",
          options: ["25 megawatts", "35 megawatts", "45 megawatts", "60 megawatts"],
          correct: "45 megawatts",
          category: "numbers",
          explanation: "The speaker states that the four main transit depots will require forty-five megawatts of dedicated grid connectivity."
        },
        {
          id: "adv_s6_q3",
          text: "What is the projected annual reduction in metropolitan carbon emissions?",
          options: ["45,000 metric tons", "65,000 metric tons", "85,000 metric tons", "110,000 metric tons"],
          correct: "85,000 metric tons",
          category: "numbers",
          explanation: "The zero-emission fleet will eliminate eighty-five thousand metric tons of emissions annually."
        }
      ]
    }
  ],
  "Section 7": [
    {
      title: "Venture Capital Pitch & SaaS Unit Economics",
      description: "A startup founder pitches enterprise software metrics and series A financing terms to investors.",
      transcript: "[F3]Good morning, partners. SentinelCloud provides automated regulatory compliance verification for enterprise banking. Over the past twelve months, our customer acquisition cost averaged four thousand two hundred dollars, while our customer lifetime value reached twenty-five thousand two hundred dollars. [M1]That equates to a compelling six-to-one LTV to CAC ratio. What does your retention look like? [F3]Our net revenue retention rate currently stands at one hundred and twenty-four percent, driven by seat expansion and API volume upselling. We generated one hundred and ninety-five thousand dollars in monthly recurring revenue last month. We are raising a six million dollar Series A round to double our technical sales engineering team.",
      questions: [
        {
          id: "adv_s7_q1",
          text: "What is the startup's current Customer Lifetime Value to Customer Acquisition Cost (LTV:CAC) ratio?",
          options: ["3:1", "4:1", "6:1", "8:1"],
          correct: "6:1",
          category: "numbers",
          explanation: "The investor acknowledges the ratio: 'That equates to a compelling six-to-one LTV to CAC ratio.'"
        },
        {
          id: "adv_s7_q2",
          text: "What Net Revenue Retention (NRR) rate did the founder present to the venture partners?",
          options: ["108%", "115%", "124%", "135%"],
          correct: "124%",
          category: "numbers",
          explanation: "The founder reports: 'Our net revenue retention rate currently stands at one hundred and twenty-four percent.'"
        },
        {
          id: "adv_s7_q3",
          text: "How much capital is the startup seeking in its Series A financing round?",
          options: ["$3 million", "$4.5 million", "$6 million", "$8.5 million"],
          correct: "$6 million",
          category: "numbers",
          explanation: "The founder states they are raising a six million dollar Series A round."
        }
      ]
    }
  ],
  "Section 8": [
    {
      title: "Enterprise Cybersecurity & Zero-Trust Architecture",
      description: "A CISO explains the shift from legacy perimeter security to zero-trust micro-segmentation.",
      transcript: "[M1]Following last quarter's spear-phishing incident, our executive committee approved an immediate transition to Zero-Trust Network Architecture. Under the traditional castle-and-moat model, anyone inside the internal VPN had broad network visibility. [F4]How are we implementing identity verification at the device level, David? [M1]We are micro-segmenting one hundred and forty virtual private clouds and enforcing hardware FIDO2 authentication keys for all three thousand five hundred employees. Furthermore, continuous telemetry authentication has reduced our security operations center's mean time to detect anomalous lateral movement from forty-eight hours down to just twelve minutes.",
      questions: [
        {
          id: "adv_s8_q1",
          text: "How many virtual private clouds (VPCs) will undergo micro-segmentation?",
          options: ["80", "110", "140", "180"],
          correct: "140",
          category: "numbers",
          explanation: "The CISO specifies micro-segmenting one hundred and forty virtual private clouds."
        },
        {
          id: "adv_s8_q2",
          text: "What authentication mechanism was mandated for the entire workforce?",
          options: ["SMS one-time passwords", "Hardware FIDO2 security keys", "Biometric facial scans", "Email verification links"],
          correct: "Hardware FIDO2 security keys",
          category: "factual",
          explanation: "David mentions enforcing hardware FIDO2 authentication keys for all three thousand five hundred employees."
        },
        {
          id: "adv_s8_q3",
          text: "To what duration was the security team's mean time to detect (MTTD) reduced?",
          options: ["12 minutes", "35 minutes", "2 hours", "6 hours"],
          correct: "12 minutes",
          category: "numbers",
          explanation: "Continuous telemetry reduced mean time to detect from forty-eight hours down to just twelve minutes."
        }
      ]
    }
  ],
  "Section 9": [
    {
      title: "Renewable Energy Grid Balancing & Battery Storage",
      description: "Utility commissioners discuss replacing fossil-fuel peaker plants with large-scale battery storage.",
      transcript: "[F2]To stabilize grid frequency and absorb surplus midday solar generation, we are authorizing a three hundred megawatt-hour lithium-iron-phosphate battery energy storage installation. [M3]Will this facility allow us to decommission legacy fossil-fuel peaker units? [F2]Yes, Commissioner. It will directly replace three gas-fired peaker turbines that previously operated during the critical evening demand ramp from six PM to ten PM. The battery facility achieves an eighty-nine percent round-trip thermodynamic efficiency, saving ratepayers fourteen point five million dollars annually by avoiding wholesale natural gas price spikes.",
      questions: [
        {
          id: "adv_s9_q1",
          text: "What is the total storage capacity of the planned lithium-iron-phosphate battery facility?",
          options: ["150 megawatt-hours", "220 megawatt-hours", "300 megawatt-hours", "450 megawatt-hours"],
          correct: "300 megawatt-hours",
          category: "numbers",
          explanation: "The speaker confirms authorizing a three hundred megawatt-hour battery storage installation."
        },
        {
          id: "adv_s9_q2",
          text: "During which hours is the battery system designed to discharge power onto the grid?",
          options: ["2 PM to 5 PM", "6 PM to 10 PM", "8 PM to midnight", "4 AM to 8 AM"],
          correct: "6 PM to 10 PM",
          category: "numbers",
          explanation: "The facility replaces units operating during the evening demand ramp from six PM to ten PM."
        },
        {
          id: "adv_s9_q3",
          text: "What round-trip energy efficiency does the battery storage facility achieve?",
          options: ["78%", "82%", "89%", "95%"],
          correct: "89%",
          category: "numbers",
          explanation: "The battery facility achieves an eighty-nine percent round-trip thermodynamic efficiency."
        }
      ]
    }
  ],
  "Section 10": [
    {
      title: "Corporate ESG Audit & Scope 3 Carbon Emissions",
      description: "An environmental auditor analyzes carbon emissions reductions and water recycling across manufacturing plants.",
      transcript: "[M4]We have completed our third-party ESG audit evaluating sixteen global manufacturing plants. Scope One direct emissions and Scope Two purchased electricity emissions fell by twenty-one percent year-over-year due to onsite rooftop photovoltaic arrays. [F1]What about Scope Three indirect emissions throughout our logistics chain? [M4]Scope Three emissions actually rose by six percent. That unexpected uptick occurred because regional shipping lane disruptions necessitated temporary air-freight diversions. On the water stewardship front, our closed-loop wastewater recycling system now reclaims seventy-eight percent of industrial effluent, meeting European CSRD compliance standards.",
      questions: [
        {
          id: "adv_s1_0q1",
          text: "By what percentage did the company reduce its combined Scope 1 and Scope 2 emissions?",
          options: ["12%", "17%", "21%", "29%"],
          correct: "21%",
          category: "numbers",
          explanation: "Scope One and Scope Two emissions fell by twenty-one percent year-over-year."
        },
        {
          id: "adv_s1_0q2",
          text: "What factor caused the unintended 6% increase in Scope 3 indirect emissions?",
          options: ["Increased factory operating hours", "Emergency air-freight diversions", "Expansion of retail storefronts", "Packaging material degradation"],
          correct: "Emergency air-freight diversions",
          category: "factual",
          explanation: "The speaker explains that shipping lane disruptions necessitated temporary air-freight diversions."
        },
        {
          id: "adv_s1_0q3",
          text: "What proportion of industrial wastewater is reclaimed through the closed-loop system?",
          options: ["65%", "72%", "78%", "85%"],
          correct: "78%",
          category: "numbers",
          explanation: "The closed-loop recycling system now reclaims seventy-eight percent of industrial effluent."
        }
      ]
    }
  ],
  "Section 11": [
    {
      title: "Intellectual Property Arbitration & Patent Scope",
      description: "Legal counsel argues a patent infringement dispute regarding ceramic separator membranes.",
      transcript: "[F4]Arbitrator, the core claim in patent US-nine-four-two-eight-one-seven-two concerns a nano-porous ceramic coating between two and four microns thick applied to battery separator films. [M2]Counsel for the respondent claims that a Japanese patent published in twenty-fifteen constitutes invalidating prior art. How do you respond? [F4]We have entered into evidence lab notebooks and a certified priority patent filing submitted to the Munich patent office in November twenty-fourteen. Because our priority filing date precedes the respondent's publication by eight months, the prior art defense fails as a matter of law.",
      questions: [
        {
          id: "adv_s1_1q1",
          text: "What ceramic coating thickness range is claimed in the disputed patent?",
          options: ["0.5 to 1.5 microns", "2 to 4 microns", "5 to 8 microns", "10 to 12 microns"],
          correct: "2 to 4 microns",
          category: "numbers",
          explanation: "Counsel specifies a nano-porous ceramic coating between two and four microns thick."
        },
        {
          id: "adv_s1_1q2",
          text: "What argument did the respondent raise to contest the validity of the patent?",
          options: ["Lack of commercial utility", "Prior art from a 2015 Japanese publication", "Ambiguous drafting terminology", "Failure to pay annual maintenance fees"],
          correct: "Prior art from a 2015 Japanese publication",
          category: "factual",
          explanation: "The respondent claimed that a Japanese patent published in twenty-fifteen constituted invalidating prior art."
        },
        {
          id: "adv_s1_1q3",
          text: "How did claimant's counsel conclusively defeat the prior art challenge?",
          options: ["By licensing the technology to competitors", "With an earlier German priority filing from November 2014", "By hiring independent academic experts", "By altering the chemical formula in court"],
          correct: "With an earlier German priority filing from November 2014",
          category: "factual",
          explanation: "Counsel submitted a certified priority patent filing from Munich in November twenty-fourteen (2014), preceding the publication."
        }
      ]
    }
  ],
  "Section 12": [
    {
      title: "Cognitive Ergonomics & Asynchronous Workflows",
      description: "An organizational psychologist reports on notification fatigue and focus blocks among remote developers.",
      transcript: "[F3]We conducted a six-month ergonomic study tracking one thousand two hundred remote software engineers across eight time zones. The primary finding was the severe toll of asynchronous fragmentation: constant messaging notifications and notification pings reduced unbroken deep flow state duration from forty-five minutes down to an average of eleven minutes. [M5]What programmatic intervention did your team test? [F3]We instituted mandatory focus blocks between nine AM and twelve PM, during which all corporate messaging tools were silenced and calendar invitations prohibited. Post-intervention survey metrics revealed a thirty-eight percent reduction in cognitive exhaustion scores and a twenty-two percent gain in code review velocity.",
      questions: [
        {
          id: "adv_s1_2q1",
          text: "To what duration did continuous messaging alerts reduce software developers' flow state sessions?",
          options: ["5 minutes", "11 minutes", "18 minutes", "24 minutes"],
          correct: "11 minutes",
          category: "numbers",
          explanation: "The researcher notes flow sessions dropped from forty-five minutes down to an average of eleven minutes."
        },
        {
          id: "adv_s1_2q2",
          text: "During which timeframe were mandatory notification-free focus blocks scheduled?",
          options: ["8 AM to 10 AM", "9 AM to 12 PM", "1 PM to 3 PM", "2 PM to 5 PM"],
          correct: "9 AM to 12 PM",
          category: "numbers",
          explanation: "Mandatory focus blocks were instituted between nine AM and twelve PM."
        },
        {
          id: "adv_s1_2q3",
          text: "By what percentage did cognitive exhaustion scores decline after introducing focus blocks?",
          options: ["22%", "30%", "38%", "46%"],
          correct: "38%",
          category: "numbers",
          explanation: "The post-intervention metrics revealed a thirty-eight percent reduction in cognitive exhaustion scores."
        }
      ]
    }
  ],
  "Section 13": [
    {
      title: "Engineering Curriculum Accreditation & Industry Alignment",
      description: "University faculty discuss reforming computer engineering curricula to meet ABET standards.",
      transcript: "[M1]Dean Watson, during our ABET accreditation review, several evaluating commissioners recommended updating our computer engineering capstone sequence. Historically, students wrote theoretical research treatises that lacked practical systems integration. [F2]What concrete changes did the curriculum committee enact? [M1]We replaced the theoretical thesis with a project where student teams build scalable microservices deployed to public cloud platforms. We also established an advisory council comprising fourteen tech firms. In our most recent employment audit, industry hiring managers rated graduate workplace readiness at ninety-one percent, up from sixty-two percent two years ago.",
      questions: [
        {
          id: "adv_s1_3q1",
          text: "What core reform was introduced for the engineering capstone requirement?",
          options: ["Writing 100-page academic dissertations", "Building cloud-deployed microservices", "Completing mandatory uncredited internships", "Passing standardized pencil-and-paper tests"],
          correct: "Building cloud-deployed microservices",
          category: "factual",
          explanation: "The theoretical thesis was replaced with building scalable microservices deployed to public cloud platforms."
        },
        {
          id: "adv_s1_3q2",
          text: "How many technology companies serve on the department's industry advisory council?",
          options: ["8 companies", "11 companies", "14 companies", "20 companies"],
          correct: "14 companies",
          category: "numbers",
          explanation: "The speaker mentions establishing an advisory council comprising fourteen tech firms."
        },
        {
          id: "adv_s1_3q3",
          text: "To what percentage did employer-evaluated graduate job readiness increase?",
          options: ["74%", "83%", "91%", "98%"],
          correct: "91%",
          category: "numbers",
          explanation: "Hiring managers rated graduate workplace readiness at ninety-one percent, up from sixty-two percent."
        }
      ]
    }
  ],
  "Section 14": [
    {
      title: "Central Bank Monetary Policy & Yield Curve Inversion",
      description: "An economist analyzes bond market signals, sticky inflation figures, and policy interest rate decisions.",
      transcript: "[M5]In today's macroeconomic analysis, the sovereign bond yield curve remains inverted, with two-year treasury yields exceeding ten-year yields by forty-five basis points. Historically, such inversion signals tightening lending standards across commercial banks. Core personal consumption expenditures inflation printed at three point four percent, well above the central bank's statutory two percent mandate. In response, the monetary policy committee signaled an interest rate pause, maintaining the benchmark federal funds target range at five point two five to five point five zero percent to ensure monetary restraint.",
      questions: [
        {
          id: "adv_s1_4q1",
          text: "By how many basis points was the 2-year and 10-year Treasury yield curve inverted?",
          options: ["25 basis points", "35 basis points", "45 basis points", "60 basis points"],
          correct: "45 basis points",
          category: "numbers",
          explanation: "The economist notes two-year yields exceeding ten-year yields by forty-five basis points."
        },
        {
          id: "adv_s1_4q2",
          text: "What was the reported core personal consumption expenditures (PCE) inflation figure?",
          options: ["2.4%", "3.0%", "3.4%", "4.1%"],
          correct: "3.4%",
          category: "numbers",
          explanation: "Core PCE inflation printed at three point four percent."
        },
        {
          id: "adv_s1_4q3",
          text: "What benchmark interest rate range did the monetary policy committee resolve to maintain?",
          options: ["4.50% to 4.75%", "4.75% to 5.00%", "5.00% to 5.25%", "5.25% to 5.50%"],
          correct: "5.25% to 5.50%",
          category: "numbers",
          explanation: "The committee maintained the benchmark target range at five point two five to five point five zero percent (5.25% to 5.50%)."
        }
      ]
    }
  ],
  "Section 15": [
    {
      title: "Architectural Conservation & Seismic Retrofitting",
      description: "Structural engineers detail seismic reinforcement of a century-old masonry cathedral using base isolators.",
      transcript: "[F1]Colleagues, our seismic rehabilitation project involves a one hundred and eighteen-year-old unreinforced masonry cathedral. In an unreinforced structure of this scale, lateral shear stress during seismic shaking poses catastrophic collapse risks. [M3]What engineering techniques are being implemented to preserve historic aesthetics while meeting modern building codes? [F1]We are installing thirty-two elastomeric base isolators under the sub-foundation footings and applying carbon-fiber-reinforced polymer wraps to internal brick archways. This allows the building to safely decouple from horizontal ground shaking up to zero point four five g acceleration, while preserving ninety-six percent of the historic facade masonry.",
      questions: [
        {
          id: "adv_s1_5q1",
          text: "How old is the historic masonry cathedral undergoing seismic rehabilitation?",
          options: ["85 years", "102 years", "118 years", "145 years"],
          correct: "118 years",
          category: "numbers",
          explanation: "The engineer describes a one hundred and eighteen-year-old unreinforced masonry cathedral."
        },
        {
          id: "adv_s1_5q2",
          text: "How many elastomeric base isolators are being installed beneath the foundations?",
          options: ["16", "24", "32", "48"],
          correct: "32",
          category: "numbers",
          explanation: "The project team is installing thirty-two elastomeric base isolators under the sub-foundation footings."
        },
        {
          id: "adv_s1_5q3",
          text: "What peak ground acceleration level can the retrofitted cathedral safely withstand?",
          options: ["0.25g", "0.35g", "0.45g", "0.60g"],
          correct: "0.45g",
          category: "numbers",
          explanation: "The retrofitted design allows the structure to decouple from shaking up to zero point four five g acceleration."
        }
      ]
    }
  ],
  "Section 16": [
    {
      title: "Public Health Genomic Wastewater Surveillance",
      description: "Epidemiologists discuss tracking emerging respiratory pathogen variants through municipal sewage sampling.",
      transcript: "[F2]Our state epidemiological team expanded high-throughput genomic wastewater surveillance across nine municipal drainage catchments. Over a three-week monitoring period, the relative prevalence of an immune-evasive respiratory syncytial virus variant rose rapidly from three percent to thirty-seven percent of sequenced viral fragments. [M4]Did this genomic signal correlate with hospital emergency room admissions? [F2]Yes, the wastewater concentration peak preceded clinical hospital admissions by eleven days. This early warning gave public health clinics sufficient lead time to distribute prophylactic monoclonal antibodies to high-risk nursing facilities before patient admissions peaked.",
      questions: [
        {
          id: "adv_s1_6q1",
          text: "Across how many municipal drainage catchments was genomic wastewater surveillance conducted?",
          options: ["5 catchments", "7 catchments", "9 catchments", "12 catchments"],
          correct: "9 catchments",
          category: "numbers",
          explanation: "Surveillance was expanded across nine municipal drainage catchments."
        },
        {
          id: "adv_s1_6q2",
          text: "By how many days did the wastewater viral signal precede hospital patient admissions?",
          options: ["5 days", "8 days", "11 days", "16 days"],
          correct: "11 days",
          category: "numbers",
          explanation: "The wastewater concentration peak preceded clinical hospital admissions by eleven days."
        },
        {
          id: "adv_s1_6q3",
          text: "What targeted preventive measure was implemented for high-risk nursing facilities?",
          options: ["Universal curfew restrictions", "Prophylactic monoclonal antibody administration", "Immediate facility evacuation", "Temporary water supply shutdown"],
          correct: "Prophylactic monoclonal antibody administration",
          category: "factual",
          explanation: "Clinics distributed prophylactic monoclonal antibodies to high-risk nursing facilities based on the early warning."
        }
      ]
    }
  ],
  "Section 17": [
    {
      title: "Consumer Neuromarketing & E-Commerce Optimization",
      description: "UX researchers review eye-tracking and skin conductance data to optimize online checkout conversion rates.",
      transcript: "[F3]In our behavioral usability laboratory, four hundred and fifty participants completed purchase simulations wearing mobile eye-tracking glasses coupled with galvanic skin conductance monitors. We observed severe visual friction on the payment screen: participants hesitated over third-party payment badges that were placed far from input fields. [M2]What happened when you repositioned those security indicators? [F3]Moving the reassurance badges directly adjacent to the credit card entry form boosted overall checkout completion by fourteen point eight percent. Furthermore, displaying explicit calendar delivery dates instead of generic business-day ranges reduced fixation dwell time on shipping terms from four point two seconds down to one point one seconds.",
      questions: [
        {
          id: "adv_s1_7q1",
          text: "How many participants were evaluated in the eye-tracking and usability laboratory study?",
          options: ["250", "320", "450", "600"],
          correct: "450",
          category: "numbers",
          explanation: "The researcher states four hundred and fifty participants completed purchase simulations."
        },
        {
          id: "adv_s1_7q2",
          text: "By what percentage did checkout completion increase when reassurance badges were repositioned?",
          options: ["8.4%", "11.2%", "14.8%", "19.5%"],
          correct: "14.8%",
          category: "numbers",
          explanation: "Moving the badges adjacent to the payment form boosted checkout completion by fourteen point eight percent."
        },
        {
          id: "adv_s1_7q3",
          text: "To what duration did participant fixation dwell time drop after displaying clear delivery dates?",
          options: ["0.5 seconds", "1.1 seconds", "2.3 seconds", "3.0 seconds"],
          correct: "1.1 seconds",
          category: "numbers",
          explanation: "Fixation dwell time dropped from four point two seconds down to one point one seconds."
        }
      ]
    }
  ],
  "Section 18": [
    {
      title: "Corporate Restructuring & ERP Platform Consolidation",
      description: "Operations directors assess post-merger integration timelines and enterprise software cost synergies.",
      transcript: "[M1]Ten months following our merger, our IT transformation task force is working to decommission three disparate legacy enterprise resource planning platforms and migrate all global logistical inventory to SAP S/4HANA. [F4]Are we still on schedule to meet the fourteen-month deadline? [M1]Yes, we remain on track for complete cutover within fourteen months. From a financial perspective, annualized operational synergies have reached twenty-eight point four million dollars, outperforming our initial twenty-five million dollar guidance. Most importantly, client account retention was preserved at ninety-eight point two percent throughout the platform transition.",
      questions: [
        {
          id: "adv_s1_8q1",
          text: "What is the targeted total timeframe for completing the unified ERP migration?",
          options: ["10 months", "14 months", "18 months", "24 months"],
          correct: "14 months",
          category: "numbers",
          explanation: "The executive confirms they remain on track for complete cutover within fourteen months."
        },
        {
          id: "adv_s1_8q2",
          text: "What annual cost synergy figure was achieved, surpassing initial guidance?",
          options: ["$19.5 million", "$22.0 million", "$25.0 million", "$28.4 million"],
          correct: "$28.4 million",
          category: "numbers",
          explanation: "Annualized operational synergies reached twenty-eight point four million dollars."
        },
        {
          id: "adv_s1_8q3",
          text: "What client account retention rate was maintained during the enterprise system transition?",
          options: ["94.5%", "96.8%", "98.2%", "99.5%"],
          correct: "98.2%",
          category: "numbers",
          explanation: "The speaker notes client account retention was preserved at ninety-eight point two percent."
        }
      ]
    }
  ],
  "Section 19": [
    {
      title: "Precision Agriculture & Telemetric Water Management",
      description: "Agronomists review autonomous drone multispectral imaging and LoRaWAN soil telemetry in commercial orchards.",
      transcript: "[M3]Across four thousand five hundred hectares of commercial almond orchards in the Central Valley, we deployed high-resolution multispectral drone surveying combined with LoRaWAN underground soil moisture sensors. [F1]How significantly did automated variable-rate drip irrigation reduce water extraction? [M3]By correlating canopy transpiration with soil root-zone moisture in real time, groundwater pumping decreased by thirty-one percent compared to historical benchmarks. Furthermore, canopy hydration variance stayed under four percent across all orchards, and our inaugural harvest yield rose by eight point five percent per hectare.",
      questions: [
        {
          id: "adv_s1_9q1",
          text: "What total land area was covered by the drone surveying and underground sensor network?",
          options: ["2,200 hectares", "3,500 hectares", "4,500 hectares", "6,000 hectares"],
          correct: "4,500 hectares",
          category: "numbers",
          explanation: "The telemetry system was deployed across four thousand five hundred hectares."
        },
        {
          id: "adv_s1_9q2",
          text: "By what percentage was groundwater pumping reduced through precision drip irrigation?",
          options: ["18%", "24%", "31%", "39%"],
          correct: "31%",
          category: "numbers",
          explanation: "The agronomist reports that groundwater pumping decreased by thirty-one percent."
        },
        {
          id: "adv_s1_9q3",
          text: "What increase in crop yield per hectare was recorded during the inaugural harvest?",
          options: ["5.2%", "8.5%", "11.4%", "14.0%"],
          correct: "8.5%",
          category: "numbers",
          explanation: "Inaugural harvest yield rose by eight point five percent per hectare."
        }
      ]
    }
  ],
  "Section 20": [
    {
      title: "Aerospace Propulsion & Cryogenic Turbopump Performance",
      description: "Propulsion engineers analyze high-pressure staged combustion test data for liquid hydrogen rocket engines.",
      transcript: "[M4]Flight test directors, we have validated telemetry from yesterday's hot-fire test of our staged-combustion cryogenic rocket engine. The main liquid oxygen and liquid hydrogen turbopump operated at sixty-eight thousand revolutions per minute, sustaining a main combustion chamber pressure of two hundred and fifteen bar. [F2]Did the thrust chamber and nozzle extension show any structural thermal ablation? [M4]Zero measurable throat degradation was detected after four hundred and twenty seconds of sustained firing. Vacuum specific impulse was measured at four hundred and fifty-three seconds, beating our design requirement by six seconds and validating our regenerative cooling channel geometry.",
      questions: [
        {
          id: "adv_s2_0q1",
          text: "What chamber pressure was sustained during the staged-combustion hot-fire test?",
          options: ["175 bar", "195 bar", "215 bar", "240 bar"],
          correct: "215 bar",
          category: "numbers",
          explanation: "The propulsion engineer states the engine sustained a chamber pressure of two hundred and fifteen bar."
        },
        {
          id: "adv_s2_0q2",
          text: "What vacuum specific impulse was experimentally achieved by the rocket engine?",
          options: ["435 seconds", "447 seconds", "453 seconds", "462 seconds"],
          correct: "453 seconds",
          category: "numbers",
          explanation: "Vacuum specific impulse was measured at four hundred and fifty-three seconds."
        },
        {
          id: "adv_s2_0q3",
          text: "For how many seconds was continuous engine firing sustained during the static test?",
          options: ["300 seconds", "360 seconds", "420 seconds", "500 seconds"],
          correct: "420 seconds",
          category: "numbers",
          explanation: "The engine was fired for four hundred and twenty seconds of sustained firing without throat degradation."
        }
      ]
    }
  ]
};
