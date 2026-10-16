import { Scenario } from '../types';

export const scenariosPro: Record<string, Scenario[]> = {
  "Section 1": [
    {
      title: "Thermodynamic Feedback Loops in Arctic Systems",
      description: "A professor delivers a guest lecture on nonlinear climate dynamics.",
      transcript: "[M5]Good afternoon. Today I want to walk you through one of the most critical yet underappreciated mechanisms in climate science: the nonlinear feedback loops operating in Arctic systems. The first feedback mechanism is the ice-albedo feedback. Sea ice has an albedo of roughly zero point six to zero point eight, meaning it reflects sixty to eighty percent of incoming solar radiation. Open ocean water, by contrast, has an albedo of about zero point zero six. So as sea ice retreats, the exposed dark water absorbs dramatically more solar energy, which in turn warms the water further, melting more ice. This is a positive feedback loop. What makes this particularly dangerous is its threshold behaviour. The second mechanism is permafrost carbon feedback. The Arctic permafrost contains approximately fifteen hundred gigatons of organic carbon, nearly twice the amount currently in the atmosphere. Microbial decomposition of this formerly frozen organic matter releases both carbon dioxide and methane. Methane is roughly eighty times more potent as a greenhouse gas over a twenty-year horizon compared to CO2. Recent field studies from the Siberian Arctic suggest that methane emissions from thawing permafrost may be thirty to forty percent higher than our current models predict, because they fail to account for abrupt thaw processes like thermokarst lake formation. The interaction between these two feedbacks makes Arctic systems genuinely unpredictable.",
      questions: [
        { id: "pr1s1q1", text: "What is the approximate albedo of open ocean water?", options: ["0.06", "0.20", "0.40", "0.60"], correct: "0.06", category: "numbers" },
        { id: "pr1s1q2", text: "How much organic carbon does Arctic permafrost contain?", options: ["500 gigatons", "1000 gigatons", "1500 gigatons", "2000 gigatons"], correct: "1500 gigatons", category: "numbers" },
        { id: "pr1s1q3", text: "Why are current methane emission models likely underestimating actual releases?", options: ["They ignore microbial activity entirely", "They fail to account for abrupt thaw processes like thermokarst lakes", "They overestimate soil moisture levels", "They use incorrect temperature baselines"], correct: "They fail to account for abrupt thaw processes like thermokarst lakes", category: "inference" }
      ]
    }
  ],
  "Section 2": [
    {
      title: "Synaptic Plasticity and Memory Consolidation",
      description: "A neuroscience researcher presents findings.",
      transcript: "[F2]What I'd like to present today is a synthesis of our lab's recent work on how transient experiences become durable memories at the synaptic level. The foundational concept here is long-term potentiation, or LTP, first demonstrated by Bliss and Lomo in nineteen seventy-three. The molecular cascade is well-established. High-frequency glutamatergic activation of AMPA receptors depolarises the postsynaptic membrane, displacing the magnesium block from NMDA receptors. Calcium then floods through these NMDA channels, activating calcium-calmodulin-dependent protein kinase two, CaMKII for short. CaMKII autophosphorylates, meaning it becomes active even after calcium levels normalise, and this sustained kinase activity drives AMPA receptor insertion into the postsynaptic membrane. Our recent work investigated how this process interacts with sleep. Using in vivo two-photon calcium imaging in mice, we found that during slow-wave sleep, dendritic spines that were potentiated during wakefulness undergo a second wave of structural enlargement. Crucially, this only occurs for spines that were co-activated with other spines on the same dendritic branch during the waking experience. Spines potentiated in isolation actually showed slight retraction during sleep. This explains why spaced learning is more effective than massed learning.",
      questions: [
        { id: "pr1s2q1", text: "What role does the magnesium block play in LTP?", options: ["It prevents glutamate release", "It blocks NMDA receptors until membrane depolarisation", "It activates CaMKII directly", "It causes AMPA receptor internalisation"], correct: "It blocks NMDA receptors until membrane depolarisation", category: "factual" },
        { id: "pr1s2q2", text: "What happens to spines potentiated in isolation during slow-wave sleep?", options: ["They enlarge further", "They remain unchanged", "They show slight retraction", "They migrate to other dendrites"], correct: "They show slight retraction", category: "factual" },
        { id: "pr1s2q3", text: "According to the research, why is spaced learning more effective?", options: ["It creates stronger individual spines", "It allows sleep-dependent linking of correlated patterns between sessions", "It increases NMDA receptor density", "It reduces interference from competing memories"], correct: "It allows sleep-dependent linking of correlated patterns between sessions", category: "inference" }
      ]
    }
  ],
  "Section 3": [
    {
      title: "Quantum Decoherence and Error Mitigation",
      description: "A physicist explains decoherence timescales and quantum error correction codes.",
      transcript: "[M1]Welcome back. Today we examine the fundamental barrier to scalable quantum computing: environmental decoherence. In superconducting transmon qubits, energy relaxation time T1 and phase coherence time T2 typically range between eighty and one hundred and twenty microseconds at operating temperatures of fifteen millikelvin. Environmental noise, particularly 1/f magnetic flux noise and dielectric loss in substrate interfaces, causes superposition states to degrade into classical statistical mixtures. To protect quantum information, surface code architectures distribute one logical qubit across a two-dimensional lattice of physical qubits. For a distance-seven surface code, which requires ninety-seven physical data and syndrome qubits, the theoretical threshold for physical gate error rate is approximately one percent. However, to achieve a logical error rate below ten to the negative twelve—necessary for running Shor's algorithm on RSA-2048 keys—physical two-qubit gate fidelities must exceed ninety-nine point nine percent. Recent pulse-shaping protocols using DRAG techniques have suppressed phase leakage by nearly forty-two percent.",
      questions: [
        { id: "pr1s3q1", text: "At what operating temperature are the transmon qubits typically maintained?", options: ["4 Kelvin", "15 millikelvin", "77 millikelvin", "1.2 Kelvin"], correct: "15 millikelvin", category: "numbers" },
        { id: "pr1s3q2", text: "How many physical qubits does a distance-seven surface code require?", options: ["49", "64", "97", "128"], correct: "97", category: "numbers" },
        { id: "pr1s3q3", text: "What primary factor causes superposition states to degrade into classical mixtures?", options: ["Laser pulse drift", "Environmental noise such as flux noise and dielectric loss", "Excessive physical qubit distances", "Spontaneous optical emission"], correct: "Environmental noise such as flux noise and dielectric loss", category: "inference" }
      ]
    }
  ],
  "Section 4": [
    {
      title: "CRISPR-Cas Off-Target Cleavage Dynamics",
      description: "A geneticist presents kinetics of guide RNA mismatch tolerance.",
      transcript: "[F2]In today's seminar, we evaluate the kinetic constraints governing Cas9 off-target cleavage. Wild-type SpCas9 relies on a twenty-nucleotide single-guide RNA that recognizes targets adjacent to a 5-prime NGG protospacer adjacent motif, or PAM. Our high-throughput sequencing assays, utilizing GUIDE-seq across twelve human cell lines, revealed that single-base mismatches within the seed region—the eight to twelve nucleotides adjacent to the PAM—reduce cleavage affinity by ninety-five to ninety-nine percent. Conversely, mismatches located toward the 5-prime distal end of the guide often permit cleavage rates up to sixty-four percent of on-target efficacy. To overcome this promiscuity, we engineered high-fidelity variants such as eSpCas9 and SpCas9-HF1 by neutralizing non-specific positively charged residues in the DNA-binding groove. In comparative trials on human T-cells, these engineered nucleases maintained over ninety percent of on-target editing efficiency while decreasing detectable off-target chromosomal translocations from three point eight percent down to zero point zero five percent.",
      questions: [
        { id: "pr1s4q1", text: "By how much do single-base mismatches in the seed region reduce cleavage affinity?", options: ["50% to 60%", "70% to 80%", "85% to 90%", "95% to 99%"], correct: "95% to 99%", category: "numbers" },
        { id: "pr1s4q2", text: "What modification was made to create the high-fidelity Cas9 variants?", options: ["Neutralizing positive charges in the DNA-binding groove", "Shortening the guide RNA sequence to ten nucleotides", "Replacing the magnesium cofactor with zinc", "Deleting the PAM recognition domain entirely"], correct: "Neutralizing positive charges in the DNA-binding groove", category: "factual" },
        { id: "pr1s4q3", text: "What was the reduced rate of chromosomal translocations achieved in human T-cells?", options: ["0.5%", "0.05%", "0.15%", "0.005%"], correct: "0.05%", category: "numbers" }
      ]
    }
  ],
  "Section 5": [
    {
      title: "Deep-Sea Hydrothermal Chemosynthesis",
      description: "A marine biogeochemist details metabolic pathways of benthic vent ecosystems.",
      transcript: "[M5]At abyssal depths exceeding two thousand five hundred metres, hydrothermal vent ecosystems thrive completely decoupled from solar photosynthesis. The thermodynamic foundation of these communities rests on sulfur-oxidizing and methane-oxidizing chemolithoautotrophic bacteria. In giant tube worms of the species Riftia pachyptila, which lack a mouth and digestive tract entirely, trophosome tissue houses endosymbiotic bacteria at densities exceeding ten to the tenth cells per gram of wet weight. These endosymbionts utilize hydrogen sulfide emitted at hydrothermal fluid temperatures of up to three hundred and eighty degrees Celsius, oxidizing it with dissolved oceanic oxygen to synthesize carbohydrates via the Calvin-Benson cycle. The free energy yield of this sulfide oxidation reaction is approximately seven hundred and ninety-seven kilojoules per mole of hydrogen sulfide. Carbon isotope ratio measurements show delta thirteen carbon values averaging minus eleven per mil, distinct from minus twenty-two per mil in typical photosynthetic phytoplankton, definitively demonstrating an independent carbon fixation pathway.",
      questions: [
        { id: "pr1s5q1", text: "What is the bacterial density found in the trophosome tissue of Riftia pachyptila?", options: ["10^6 cells per gram", "10^8 cells per gram", "10^10 cells per gram", "10^12 cells per gram"], correct: "10^10 cells per gram", category: "numbers" },
        { id: "pr1s5q2", text: "What is the approximate free energy yield per mole of hydrogen sulfide oxidation?", options: ["450 kilojoules", "620 kilojoules", "797 kilojoules", "915 kilojoules"], correct: "797 kilojoules", category: "numbers" },
        { id: "pr1s5q3", text: "What do the distinct delta thirteen carbon values confirm?", options: ["The presence of high hydrostatic pressure", "An independent, non-photosynthetic carbon fixation pathway", "Rapid breakdown of ribosomal RNA", "Nutrient contamination from surface waters"], correct: "An independent, non-photosynthetic carbon fixation pathway", category: "inference" }
      ]
    }
  ],
  "Section 6": [
    {
      title: "Macroeconomic Central Bank Balance Sheet Normalization",
      description: "An economist analyzes liquidity contraction and bond yield curves.",
      transcript: "[F4]Good morning colleagues. Today we analyze the macroeconomic ramifications of central bank quantitative tightening. Following the unprecedented liquidity expansion that expanded the Federal Reserve's balance sheet to almost nine trillion dollars by early twenty-twenty-two, the subsequent runoff policy capped monthly portfolio reductions at ninety-five billion dollars—sixty billion in Treasury securities and thirty-five billion in agency mortgage-backed securities. This contractionary vector exerted substantial upward pressure on term premiums, shifting the ten-year Treasury yield from one point five percent to a peak of five point zero two percent in October twenty-twenty-three. The reverse repurchase facility usage contracted sharply from two point five five trillion dollars down to less than four hundred billion, signaling that excess banking reserves were reabsorbing sovereign issuance. Econometric vector autoregressions indicate that every trillion dollars of balance sheet roll-off produces an interest rate tightening equivalent to approximately twenty-eight to thirty-four basis points on the policy rate.",
      questions: [
        { id: "pr1s6q1", text: "What was the monthly cap on Treasury security reductions during quantitative tightening?", options: ["$35 billion", "$60 billion", "$95 billion", "$120 billion"], correct: "$60 billion", category: "numbers" },
        { id: "pr1s6q2", text: "What peak yield did the ten-year Treasury reach in October 2023?", options: ["4.25%", "4.80%", "5.02%", "5.35%"], correct: "5.02%", category: "numbers" },
        { id: "pr1s6q3", text: "What policy rate equivalent tightening does each trillion dollars of balance sheet reduction represent?", options: ["10–15 basis points", "18–22 basis points", "28–34 basis points", "40–50 basis points"], correct: "28–34 basis points", category: "numbers" }
      ]
    }
  ],
  "Section 7": [
    {
      title: "Perovskite Photovoltaic Degradation Mechanisms",
      description: "A materials scientist explains ion migration and moisture-induced phase segregation.",
      transcript: "[M3]Despite lead-halide perovskite solar cells achieving certified laboratory power conversion efficiencies exceeding twenty-six percent, operational stability remains the primary impediment to commercial deployment. Under continuous one-sun illumination at sixty-five degrees Celsius, methylammonium lead iodide undergoes rapid degradation. The intrinsic vulnerability stems from low activation energy for halide ion migration—typically zero point two five to zero point five eight electron volts. When biased, iodide anions accumulate at the electron transport layer interface, generating internal screening electric fields that diminish open-circuit voltage by up to eighty millivolts. Furthermore, atmospheric moisture ingress triggers irreversible hydration, transforming the black photoactive alpha phase into a wide-bandgap yellow monohydrate phase within forty-eight hours. By substituting formamidinium and incorporating two-dimensional phenethylammonium capping layers, our consortium reduced interfacial trap density by seventy-four percent and maintained ninety-one percent of initial efficiency over eighteen hundred hours of unencapsulated damp-heat testing.",
      questions: [
        { id: "pr1s7q1", text: "What is the typical activation energy range for halide ion migration in perovskite cells?", options: ["0.10 to 0.20 eV", "0.25 to 0.58 eV", "0.85 to 1.10 eV", "1.45 to 1.75 eV"], correct: "0.25 to 0.58 eV", category: "numbers" },
        { id: "pr1s7q2", text: "What structural transformation occurs when the material reacts with atmospheric moisture?", options: ["Transformation from black alpha phase into yellow monohydrate phase", "Decomposition into pure metallic lead crystals", "Expansion of the conductive valence band", "Immediate vaporization of halide salts"], correct: "Transformation from black alpha phase into yellow monohydrate phase", category: "factual" },
        { id: "pr1s7q3", text: "How much initial efficiency was maintained after 1800 hours using capping layers?", options: ["82%", "88%", "91%", "96%"], correct: "91%", category: "numbers" }
      ]
    }
  ],
  "Section 8": [
    {
      title: "Stellar Nucleosynthesis and the r-Process",
      description: "An astrophysicist explains rapid neutron capture in kilonova mergers.",
      transcript: "[F1]The cosmic synthesis of elements heavier than iron requires extreme neutron flux environments, known as the r-process, or rapid neutron-capture process. In these regimes, the rate of neutron capture by atomic nuclei is far higher than the rate of beta-minus decay. Until recently, core-collapse supernovae were presumed to be the primary site. However, the multi-messenger detection of gravitational wave event GW170817, paired with optical observations of the kilonova AT2017gfo, verified that binary neutron star mergers are the dominant cosmic forge for heavy lanthanides and actinides. Spectroscopic modeling of the ejecta revealed an expansion velocity of zero point one to zero point three times the speed of light, yielding approximately ten to the minus two solar masses of r-process material—including an estimated ten to fifteen Earth masses of pure gold and platinum. The radioactive decay of these heavy isotopes powered a quasi-blackbody thermal light curve peaking at an absolute magnitude of minus fifteen point eight over twelve days.",
      questions: [
        { id: "pr1s8q1", text: "Which astrophysical event verified binary neutron star mergers as the dominant forge for r-process elements?", options: ["Supernova SN1987A", "Gravitational wave event GW170817", "Black hole merger GW150914", "Pulsar PSR B1919+21"], correct: "Gravitational wave event GW170817", category: "factual" },
        { id: "pr1s8q2", text: "What expansion velocity was observed in the kilonova ejecta?", options: ["0.01 to 0.05 times the speed of light", "0.1 to 0.3 times the speed of light", "0.5 to 0.7 times the speed of light", "Equal to the speed of light"], correct: "0.1 to 0.3 times the speed of light", category: "numbers" },
        { id: "pr1s8q3", text: "Why is neutron capture termed 'rapid' in the r-process?", options: ["It operates faster than nuclear fusion", "It occurs faster than the rate of beta-minus decay", "It takes place in less than one nanosecond", "It cools the ambient gas immediately"], correct: "It occurs faster than the rate of beta-minus decay", category: "inference" }
      ]
    }
  ],
  "Section 9": [
    {
      title: "Transformer Attention Complexity and Linear Scaling",
      description: "A computer science researcher dissects quadratic self-attention bottlenecks.",
      transcript: "[M1]The foundational self-attention mechanism in the standard Transformer scales quadratically with sequence length N, requiring O(N squared) memory and compute complexity due to the full attention matrix multiplication Q K-transpose. When context lengths expand to one hundred and twenty-eight thousand tokens, computing thirty-two attention heads with head dimension sixty-four demands over twenty-four gigabytes of activation memory per layer alone. To mitigate this computational bottleneck without sacrificing modeling expressivity, linear attention formulations replace the softmax operation with kernelized feature maps, decomposing attention into associative matrix multiplications that evaluate in O(N) linear time. Alternatively, FlashAttention reorganizes GPU memory access, tiling softmax computations into static SRAM blocks to reduce High Bandwidth Memory read-writes by up to four-fold. Benchmark evaluations across eight thousand token sequences show FlashAttention achieves a three point two times wall-clock speedup while reducing peak GPU memory footprint by sixty-eight percent.",
      questions: [
        { id: "pr1s9q1", text: "What is the theoretical memory and compute complexity of standard self-attention?", options: ["O(N)", "O(N log N)", "O(N squared)", "O(N cubed)"], correct: "O(N squared)", category: "factual" },
        { id: "pr1s9q2", text: "By how much does FlashAttention reduce High Bandwidth Memory read-writes?", options: ["Two-fold", "Three-fold", "Up to four-fold", "Six-fold"], correct: "Up to four-fold", category: "numbers" },
        { id: "pr1s9q3", text: "What wall-clock speedup was observed for eight thousand token sequences?", options: ["1.8 times", "2.5 times", "3.2 times", "4.6 times"], correct: "3.2 times", category: "numbers" }
      ]
    }
  ],
  "Section 10": [
    {
      title: "Microbiome-Gut-Brain Axis and Neuroinflammation",
      description: "A neuroimmunologist details vagus nerve signaling and short-chain fatty acid metabolites.",
      transcript: "[F2]Bidirectional communication along the microbiome-gut-brain axis operates via three primary pathways: autonomic vagal innervation, neuroendocrine signaling through the hypothalamic-pituitary-adrenal axis, and circulating microbial metabolites. Enteric fermentation of dietary soluble fiber produces short-chain fatty acids—predominantly acetate, propionate, and butyrate in a molar ratio of approximately sixty to twenty to twenty. Butyrate serves not only as the primary energetic substrate for colonocytes but also acts as an endogenous histone deacetylase inhibitor, suppressing pro-inflammatory cytokine expression. In germ-free murine models, the blood-brain barrier exhibits pronounced structural permeability, marked by a seventy-five percent downregulation of the tight junction proteins claudin-5 and occludin. When germ-free mice receive monocolonization with Clostridium orbiscindens, or supplementation with physiological doses of sodium butyrate, microglial maturation normalizes and blood-brain barrier transendothelial electrical resistance restores to baseline within seventy-two hours.",
      questions: [
        { id: "pr1s10q1", text: "What is the typical molar ratio of acetate, propionate, and butyrate produced by gut fermentation?", options: ["40:40:20", "50:30:20", "60:20:20", "70:15:15"], correct: "60:20:20", category: "numbers" },
        { id: "pr1s10q2", text: "What biological effect occurs to the blood-brain barrier in germ-free mice?", options: ["It thickens by fifty percent", "It displays increased permeability due to down-regulated tight junction proteins", "It calcifies rapidly", "It blocks glucose transport entirely"], correct: "It displays increased permeability due to down-regulated tight junction proteins", category: "inference" },
        { id: "pr1s10q3", text: "How quickly does transendothelial electrical resistance restore after butyrate supplementation?", options: ["24 hours", "48 hours", "72 hours", "96 hours"], correct: "72 hours", category: "numbers" }
      ]
    }
  ],
  "Section 11": [
    {
      title: "Magnetohydrodynamics in Tokamak Fusion Reactors",
      description: "A plasma physicist explains neoclassical tearing modes and magnetic confinement.",
      transcript: "[M5]Achieving net energy gain in magnetic confinement fusion requires sustaining high-beta plasmas while suppressing magnetohydrodynamic instabilities. In advanced tokamak designs, such as ITER, the core plasma reaches ion temperatures of one hundred and fifty million Kelvin, confined by a toroidal magnetic field of five point three Tesla. However, when the normalized plasma pressure beta-N exceeds approximately two point eight, neoclassical tearing modes, or NTMs, are destabilized. These helical magnetic islands tear and reconnect the nested magnetic flux surfaces, degrading energy confinement time by up to forty-five percent and threatening sudden plasma disruption. To stabilize these islands, modern tokamaks inject localized electron cyclotron current drive, or ECCD, targeting the rational magnetic surfaces q equals two or three-halves. Experiments on the DIII-D and ASDEX Upgrade facilities demonstrate that injecting just two point four megawatts of steerable gyrotron microwave power at one hundred and seventy gigahertz reduces island width by eighty-two percent, restoring high-confinement mode operation.",
      questions: [
        { id: "pr1s11q1", text: "What is the core toroidal magnetic field strength designed for ITER?", options: ["2.4 Tesla", "3.8 Tesla", "5.3 Tesla", "7.1 Tesla"], correct: "5.3 Tesla", category: "numbers" },
        { id: "pr1s11q2", text: "How much energy confinement time can be lost due to neoclassical tearing modes?", options: ["Up to 20%", "Up to 30%", "Up to 45%", "Up to 60%"], correct: "Up to 45%", category: "numbers" },
        { id: "pr1s11q3", text: "What mechanism is deployed to actively suppress magnetic island growth?", options: ["Localized electron cyclotron current drive using microwave power", "Increasing cryogenic cooling of the divertor plates", "Injecting neutral argon gas into the vacuum vessel", "Lowering the core plasma temperature below one million Kelvin"], correct: "Localized electron cyclotron current drive using microwave power", category: "factual" }
      ]
    }
  ],
  "Section 12": [
    {
      title: "Epigenetic Clocks and DNA Methylation Biomarkers",
      description: "A biogerontologist examines DNA methylation algorithms estimating biological age.",
      transcript: "[F4]Over the past decade, epigenetic clocks based on DNA methylation arrays have emerged as the most accurate molecular biomarkers of human chronological and biological aging. The seminal Horvath multi-tissue clock interrogates three hundred and fifty-three specific CpG dinucleotides across thirty-six distinct somatic cell types, exhibiting an exceptional Pearson correlation of zero point nine six with chronological age and a median absolute error of three point six years. Second-generation clocks, such as GrimAge and PhenoAge, incorporate plasma protein surrogates and mortality risk phenotypes rather than pure chronological age alone. GrimAge tracks one thousand and thirty CpG sites and predicts remaining lifespan and hazard ratios for age-related cardiovascular morbidity with an area under the receiver operating characteristic curve of zero point eight four. In clinical trials evaluating caloric restriction and senolytic therapies, individuals showing accelerated epigenetic aging—where DNAm age exceeds chronological age by five or more years—experienced a statistically significant forty-eight percent higher all-cause mortality rate over a fifteen-year tracking window.",
      questions: [
        { id: "pr1s12q1", text: "How many CpG dinucleotides are analyzed by the original Horvath multi-tissue clock?", options: ["180", "265", "353", "512"], correct: "353", category: "numbers" },
        { id: "pr1s12q2", text: "What is the median absolute error of the Horvath epigenetic clock?", options: ["1.8 years", "2.5 years", "3.6 years", "5.0 years"], correct: "3.6 years", category: "numbers" },
        { id: "pr1s12q3", text: "What elevated mortality rate was found in individuals with accelerated epigenetic aging exceeding five years?", options: ["24%", "35%", "48%", "62%"], correct: "48%", category: "numbers" }
      ]
    }
  ],

  "Section 13": [
    {
      title: "Neuromorphic Architectures & Spiking Neural Dynamics",
      description: "A cognitive systems architect lectures on asynchronous event-driven computing and synaptic plasticity.",
      transcript: "[M5]Today we delve into non-von Neumann neuromorphic architectures, specifically large-scale asynchronous spiking neural networks. Conventional deep learning accelerators suffer from the memory wall, dissipating tens of milliwatts per multiply-accumulate operation. In contrast, neuromorphic silicon like Intel's Loihi 2 operates event-driven, with leak-integrate-and-fire neurons communicating via sparse, binary voltage spikes. At rest, static power dissipation drops below five microwatts. Each synaptic update consumes approximately twenty-two femtojoules, which is four orders of magnitude more energy-efficient than state-of-the-art graphics processing units. Synaptic plasticity is governed on-chip through local spike-timing-dependent plasticity, or STDP, adjusting connection weights based on millisecond-level spike arrival intervals within a twenty-millisecond temporal window. When deployed on closed-loop robotic tactile sensing arrays, this architecture demonstrated ninety-four point six percent gesture classification accuracy with an end-to-end latency of only two point eight milliseconds.",
      questions: [
        {
          id: "pr1s13q1",
          text: "What is the approximate energy consumed per synaptic update on the neuromorphic chip?",
          options: ["22 femtojoules", "150 picojoules", "5 nanojoules", "12 microjoules"],
          correct: "22 femtojoules",
          category: "numbers",
          explanation: "The lecturer highlights that each synaptic update consumes approximately 22 femtojoules, four orders of magnitude lower than conventional GPUs."
        },
        {
          id: "pr1s13q2",
          text: "Which mechanism modulates synaptic connection weights on-chip?",
          options: ["Global stochastic gradient descent", "Backpropagation through time (BPTT)", "Local spike-timing-dependent plasticity (STDP)", "External flash memory refresh cycles"],
          correct: "Local spike-timing-dependent plasticity (STDP)",
          category: "factual",
          explanation: "Plasticity is governed locally by spike-timing-dependent plasticity (STDP) based on millisecond-level spike arrival timing."
        },
        {
          id: "pr1s13q3",
          text: "What end-to-end processing latency was achieved in robotic tactile sensing?",
          options: ["0.8 milliseconds", "2.8 milliseconds", "14.5 milliseconds", "28.0 milliseconds"],
          correct: "2.8 milliseconds",
          category: "numbers",
          explanation: "The transcript explicitly notes a robotic tactile sensing end-to-end latency of 2.8 milliseconds."
        }
      ]
    }
  ],
  "Section 14": [
    {
      title: "Gravitational Wave Interferometry & Quantum Squeezing",
      description: "An astrophysicist discusses quantum noise mitigation in advanced laser interferometers.",
      transcript: "[F4]The detection of gravitational radiation by advanced laser interferometers requires measuring differential arm-length fluctuations smaller than one ten-thousandth the diameter of a proton, on the order of ten to the minus nineteen metres. At this extreme precision, sensitivity is fundamentally constrained by quantum vacuum fluctuations entering the dark port of the beam splitter. Above one hundred Hertz, photon shot noise dominates; below fifty Hertz, photon radiation pressure noise drives mirror suspension jitter. To surpass the standard quantum limit, we implemented frequency-dependent squeezed vacuum injection. By coupling a sub-threshold optical parametric oscillator with a three-hundred-metre Fabry-Perot filter cavity, we continuously rotate the squeezing quadrature angle across the detection spectrum. This technique reduces quantum noise by three point five decibels across the key astrophysical observation band between forty Hertz and three kilohertz, expanding the cosmic detection volume for binary neutron star inspirals by sixty-two percent, equivalent to an observational horizon reaching one hundred and seventy-eight megaparsecs.",
      questions: [
        {
          id: "pr1s14q1",
          text: "By how much was the cosmic detection volume expanded via frequency-dependent squeezing?",
          options: ["25%", "42%", "62%", "85%"],
          correct: "62%",
          category: "numbers",
          explanation: "Frequency-dependent squeezed vacuum injection expanded the cosmic detection volume for binary neutron star mergers by 62%."
        },
        {
          id: "pr1s14q2",
          text: "What optical element facilitates rotating the squeezing quadrature angle across different frequencies?",
          options: ["A 300-metre Fabry-Perot filter cavity", "A high-power neodymium-YAG amplifier", "An array of silica fused prism splitters", "A cryogenic beryllium mirror coating"],
          correct: "A 300-metre Fabry-Perot filter cavity",
          category: "factual",
          explanation: "The speaker explains that coupling the optical parametric oscillator with a 300-metre Fabry-Perot filter cavity allows rotation of the squeezing angle."
        },
        {
          id: "pr1s14q3",
          text: "What type of noise primarily limits sensitivity below fifty Hertz?",
          options: ["Thermal coating noise", "Photon radiation pressure noise", "Atmospheric seismic coupling", "Laser frequency jitter"],
          correct: "Photon radiation pressure noise",
          category: "inference",
          explanation: "The physicist notes that photon shot noise dominates at high frequencies, whereas below fifty Hertz, photon radiation pressure noise drives mirror jitter."
        }
      ]
    }
  ],
  "Section 15": [
    {
      title: "Cryo-Electron Microscopy & Macromolecular Reconstruction",
      description: "A structural biologist examines sample vitrification and sub-two-angstrom single-particle analysis.",
      transcript: "[M3]Cryogenic electron microscopy has revolutionized structural biology by resolving asymmetric macromolecular assemblies without the need for crystal formation. The essential prerequisite is rapid plunge-freezing into liquid ethane cooled by liquid nitrogen to minus one hundred and eighty-three degrees Celsius. This cooling rate, exceeding one hundred thousand Kelvin per second, prevents ice crystallization, trapping the biological specimen in vitreous, amorphous ice of uniform ten to thirty nanometre thickness. Imaging is performed under cryogenic conditions with direct electron detectors utilizing electron counting mode. To minimize radiation radiolysis of aliphatic and peptide bonds, the total electron cumulative exposure is tightly restricted to twenty-eight electrons per square angstrom, fractionated across forty movie frames. Motion correction algorithms align these beam-induced drift frames, and contrast transfer function fitting eliminates phase distortions. Using this pipeline on human heterodimeric transport receptors, we achieved a reconstructed density map with a gold-standard Fourier shell correlation resolution of one point seven five angstroms, unambiguously revealing water networks and coordinated magnesium cofactors.",
      questions: [
        {
          id: "pr1s15q1",
          text: "What is the maximum cumulative electron exposure permitted to prevent radiation damage?",
          options: ["12 electrons per square angstrom", "28 electrons per square angstrom", "50 electrons per square angstrom", "85 electrons per square angstrom"],
          correct: "28 electrons per square angstrom",
          category: "numbers",
          explanation: "The total electron cumulative exposure is tightly restricted to 28 electrons per square angstrom to minimize radiation radiolysis."
        },
        {
          id: "pr1s15q2",
          text: "Why is aqueous specimen vitrification performed in liquid ethane rather than liquid nitrogen alone?",
          options: ["Liquid ethane has higher thermal conductivity preventing boiling Leidenfrost effects", "Ethane is chemically inert toward lipid bilayers", "Liquid nitrogen dissolves macromolecular hydration shells", "Ethane acts as a protective cryoprotectant dye"],
          correct: "Liquid ethane has higher thermal conductivity preventing boiling Leidenfrost effects",
          category: "inference",
          explanation: "Rapid plunge-freezing in liquid ethane exceeds 100,000 K/s, preventing the insulating vapor blanket and crystal lattice formation typical of slower nitrogen freezing."
        },
        {
          id: "pr1s15q3",
          text: "What gold-standard map resolution was achieved for the heterodimeric transport receptor?",
          options: ["1.75 angstroms", "2.40 angstroms", "3.10 angstroms", "4.25 angstroms"],
          correct: "1.75 angstroms",
          category: "numbers",
          explanation: "The researcher explicitly states achieving a Fourier shell correlation resolution of 1.75 angstroms."
        }
      ]
    }
  ],
  "Section 16": [
    {
      title: "Electrocatalytic Ambient Nitrogen Reduction",
      description: "A chemical engineer outlines sustainable ammonia synthesis and parasitic hydrogen suppression.",
      transcript: "[F1]Industrial ammonia synthesis via the thermochemical Haber-Bosch process consumes approximately two percent of global fossil energy and generates more than four hundred million metric tons of carbon dioxide annually, operating at four hundred and fifty degrees Celsius and two hundred atmospheres. Electrochemical nitrogen reduction under ambient temperature and pressure offers a green paradigm, but remains bottlenecked by the extreme stability of the nitrogen-nitrogen triple bond, with a dissociation enthalpy of nine hundred and forty-five kilojoules per mole. Furthermore, in aqueous media, the competing hydrogen evolution reaction rapidly dominates the cathode surface. To overcome this limitation, our laboratory synthesized single-atom ruthenium anchored on defective graphitic carbon nitride nanosheets. The localized coordination geometry polarizes the adsorbed nitrogen molecule, significantly lowering the activation barrier for the initial protonation step to zero point four eight electron volts. In continuous flow cell testing at minus zero point two five volts versus the reversible hydrogen electrode, the catalyst attained an ammonia Faradaic efficiency of thirty-six point eight percent and a mass-normalized yield rate of one hundred and eighteen micrograms per hour per milligram of catalyst.",
      questions: [
        {
          id: "pr1s16q1",
          text: "What is the bond dissociation energy of molecular nitrogen mentioned in the presentation?",
          options: ["412 kilojoules per mole", "620 kilojoules per mole", "945 kilojoules per mole", "1250 kilojoules per mole"],
          correct: "945 kilojoules per mole",
          category: "numbers",
          explanation: "The dissociation enthalpy of the stable nitrogen-nitrogen triple bond is stated as 945 kilojoules per mole."
        },
        {
          id: "pr1s16q2",
          text: "What is the primary parasitic reaction competing with electrochemical nitrogen reduction in aqueous electrolytes?",
          options: ["Oxygen evolution reaction", "Hydrogen evolution reaction (HER)", "Carbon monoxide disproportionation", "Nitrate oxidation"],
          correct: "Hydrogen evolution reaction (HER)",
          category: "factual",
          explanation: "The competitive hydrogen evolution reaction (HER) rapidly consumes protons and dominates the cathode surface in aqueous media."
        },
        {
          id: "pr1s16q3",
          text: "What Faradaic efficiency for ammonia production was achieved at minus 0.25 volts?",
          options: ["18.2%", "26.5%", "36.8%", "49.1%"],
          correct: "36.8%",
          category: "numbers",
          explanation: "In continuous flow cell testing at -0.25 V vs RHE, the single-atom ruthenium catalyst achieved a Faradaic efficiency of 36.8%."
        }
      ]
    }
  ],
  "Section 17": [
    {
      title: "Majorana Zero Modes in Topological Superconductors",
      description: "A theoretical physicist explores non-Abelian anyons and fault-tolerant quantum hardware.",
      transcript: "[M5]Topological quantum computing promises intrinsic protection against environmental decoherence by encoding quantum information non-locally in pairs of Majorana zero modes. These exotic quasiparticles represent their own antiparticles and obey non-Abelian exchange statistics. The canonical experimental platform consists of semiconductor nanowires with strong Rashba spin-orbit coupling, such as indium antimonide, proximitized by an epitaxial aluminum superconducting shell. When an external magnetic field applied parallel to the wire exceeds the critical topological threshold—where Zeeman splitting exceeds the sum of the chemical potential and the superconducting pairing gap—the wire transitions into a topological phase. At the nanowire ends, spatially separated Majorana zero modes emerge, characterized by a quantized zero-bias conductance anomaly of two e-squared over h at zero temperature. In our dilution refrigerator measurements conducted at twenty-five millikelvin, tunneling spectroscopy revealed robust zero-bias peaks persisting up to magnetic fields of one point eight Tesla, with energy splitting oscillations remaining damped below two micro-electron volts.",
      questions: [
        {
          id: "pr1s17q1",
          text: "What theoretical quantized conductance value characterizes the zero-bias Majorana peak?",
          options: ["e²/h", "2e²/h", "4e²/h", "e²/2h"],
          correct: "2e²/h",
          category: "numbers",
          explanation: "Spatially separated Majorana zero modes exhibit a quantized zero-bias conductance anomaly of 2e²/h."
        },
        {
          id: "pr1s17q2",
          text: "What temperature was maintained in the dilution refrigerator during tunneling spectroscopy?",
          options: ["25 millikelvin", "150 millikelvin", "1.2 Kelvin", "4.2 Kelvin"],
          correct: "25 millikelvin",
          category: "numbers",
          explanation: "The measurements were conducted in a dilution refrigerator at a cryogenic temperature of 25 millikelvin."
        },
        {
          id: "pr1s17q3",
          text: "Why are Majorana zero modes advantageous for quantum computing compared to standard qubits?",
          options: ["They eliminate the need for dilution refrigeration", "They process optical photons without laser amplifiers", "They store quantum information non-locally, conferring topological fault tolerance", "They operate at terahertz clock frequencies without synchronization"],
          correct: "They store quantum information non-locally, conferring topological fault tolerance",
          category: "inference",
          explanation: "Majorana zero modes store quantum information non-locally across spatially separated quasiparticles, protecting it from local environmental perturbations."
        }
      ]
    }
  ],
  "Section 18": [
    {
      title: "Immunometabolic Exhaustion in Tumor Microenvironments",
      description: "An oncological immunologist examines mitochondrial dysfunction and epigenetic exhaustion in T cells.",
      transcript: "[F4]Within solid neoplastic tissues, persistent antigenic stimulation combined with profound nutrient deprivation drives cytotoxic CD8+ T lymphocytes into a state of progressive epigenetic exhaustion. The core of poorly vascularized tumors exhibits severe hypoxia, with oxygen tension dropping below zero point five percent, alongside extracellular lactate accumulation exceeding twenty-six millimolar. Under these hostile conditions, tumor-infiltrating lymphocytes suffer loss of mitochondrial cristae morphology and a seventy-two percent reduction in mitochondrial spare respiratory capacity. Concurrently, high-mobility group box transcription factor TOX is upregulated, remodeling chromatin accessibility and locking inhibitory receptors PD-1, TIM-3, and LAG-3 into permanent expression. In murine melanoma models, combining anti-PD-1 checkpoint inhibition with an activator of mitochondrial pyruvate carrier complex restored oxidative phosphorylation, increased interferon-gamma secretion by two point nine fold, and delayed median tumor progression from fourteen days to forty-one days.",
      questions: [
        {
          id: "pr1s18q1",
          text: "What level of extracellular lactate concentration is typical in the hypoxic tumor core?",
          options: ["Below 5 millimolar", "10 to 15 millimolar", "Exceeding 26 millimolar", "Over 75 millimolar"],
          correct: "Exceeding 26 millimolar",
          category: "numbers",
          explanation: "The tumor core exhibits severe hypoxia alongside extracellular lactate accumulation exceeding 26 millimolar."
        },
        {
          id: "pr1s18q2",
          text: "Which transcription factor acts as the central epigenetic driver locking T cells into exhaustion?",
          options: ["NF-kappaB", "TOX", "STAT3", "FOXP3"],
          correct: "TOX",
          category: "factual",
          explanation: "High-mobility group box transcription factor TOX remodels chromatin and locks inhibitory receptors into sustained expression."
        },
        {
          id: "pr1s18q3",
          text: "What therapeutic effect resulted from combining anti-PD-1 with mitochondrial metabolic rescue?",
          options: ["Immediate lysis of all tumor vessels", "Interferon-gamma secretion increased by 2.9-fold and delayed tumor progression", "Complete suppression of antibody production", "Permanent loss of memory T cell precursors"],
          correct: "Interferon-gamma secretion increased by 2.9-fold and delayed tumor progression",
          category: "factual",
          explanation: "The dual therapy restored oxidative phosphorylation, increased IFN-gamma secretion by 2.9-fold, and delayed tumor progression from 14 to 41 days."
        }
      ]
    }
  ],
  "Section 19": [
    {
      title: "Offshore Wind Turbine Wake Aerodynamics & Yaw Steering",
      description: "An aerospace engineer presents large-eddy simulations of wake deflection in multi-gigawatt wind farms.",
      transcript: "[M3]In large-scale offshore wind turbine arrays, downstream power generation is severely penalized by wake turbulence deficits. When an upstream fifteen-megawatt rotor with a two-hundred-and-thirty-metre diameter extracts kinetic energy, it leaves behind an expanding helical vortex wake. Wind velocity directly behind the rotor is reduced by up to forty percent, and measurable velocity deficits persist as far as twelve to fourteen rotor diameters downwind. In traditionally aligned turbine rows, downstream turbines experience a thirty-two percent drop in power output and an eighteen percent increase in structural fatigue loading due to high turbulence kinetic energy. To mitigate these inter-array losses, we deployed active yaw steering across a sixty-turbine offshore cluster. By intentionally misaligning the upstream turbines by fifteen to eighteen degrees relative to the mean inflow vector, the turbulent wake core is laterally deflected into free-stream channels between downstream columns. Field measurements confirmed that while the yawed upstream turbines suffered a four percent individual power loss, downstream row generation increased by nineteen percent, yielding a net wind farm power increase of seven point six percent.",
      questions: [
        {
          id: "pr1s19q1",
          text: "How far downstream do measurable wind velocity deficits persist behind large rotors?",
          options: ["2 to 4 rotor diameters", "5 to 7 rotor diameters", "12 to 14 rotor diameters", "20 to 25 rotor diameters"],
          correct: "12 to 14 rotor diameters",
          category: "numbers",
          explanation: "The speaker states that measurable velocity deficits persist as far as 12 to 14 rotor diameters downwind."
        },
        {
          id: "pr1s19q2",
          text: "What yaw misalignment angle was introduced to steer the wake away from downstream turbines?",
          options: ["3 to 5 degrees", "8 to 10 degrees", "15 to 18 degrees", "25 to 30 degrees"],
          correct: "15 to 18 degrees",
          category: "numbers",
          explanation: "Upstream turbines were intentionally misaligned by 15 to 18 degrees relative to the mean wind direction."
        },
        {
          id: "pr1s19q3",
          text: "What net overall power increase was achieved for the entire wind park under active yaw steering?",
          options: ["3.2%", "7.6%", "12.4%", "19.0%"],
          correct: "7.6%",
          category: "numbers",
          explanation: "Despite a minor 4% loss on upstream units, downstream gains yielded a net aggregate power increase of 7.6%."
        }
      ]
    }
  ],
  "Section 20": [
    {
      title: "Automated Market Maker Arbitrage & Loss-Versus-Rebalancing",
      description: "A financial engineer analyzes impermanent loss, toxic arbitrage flow, and dynamic fees in decentralized exchanges.",
      transcript: "[F1]Constant function market makers have revolutionized decentralized asset exchanges, yet passive liquidity providers consistently underperform simple buy-and-hold benchmarks. Traditional analyses attributed this shortfall to impermanent loss, but recent quantitative frameworks recognize that the true economic cost is loss-versus-rebalancing, or LVR. LVR quantifies the deterministic wealth transfer from passive automated pools to latency arbitrageurs who exploit price discrepancies between decentralized pools and centralized limit order books before local liquidity can adjust. Within block confirmation intervals of twelve seconds, cross-market arbitrage bots extract maximal extractable value through atomic sandwich bundles. Empirical backtesting on ether-USDC liquidity pools over a two-year horizon showed that arbitrageurs extracted sixty-one percent of all trading fees earned by liquidity providers, resulting in a cumulative net negative return of five point eight percent annualized for passive depositors. Implementing dynamic swap fees indexed to thirty-minute realized volatility reduced toxic order flow by forty-four percent, restoring positive net returns for providers.",
      questions: [
        {
          id: "pr1s20q1",
          text: "What metric accurately captures the deterministic wealth transfer to latency arbitrageurs?",
          options: ["Sharpe ratio divergence", "Loss-versus-rebalancing (LVR)", "Value at risk (VaR)", "Order book slippage delta"],
          correct: "Loss-versus-rebalancing (LVR)",
          category: "factual",
          explanation: "The speaker clarifies that the accurate metric quantifying wealth transfer to arbitrageurs is loss-versus-rebalancing (LVR)."
        },
        {
          id: "pr1s20q2",
          text: "What proportion of collected trading fees was extracted by latency arbitrageurs in empirical backtests?",
          options: ["25%", "38%", "61%", "80%"],
          correct: "61%",
          category: "numbers",
          explanation: "The backtest revealed that cross-market arbitrageurs extracted 61% of all trading fees collected by liquidity providers."
        },
        {
          id: "pr1s20q3",
          text: "How did implementing dynamic fees based on realized volatility benefit liquidity providers?",
          options: ["It eliminated network gas fees entirely", "It reduced toxic order flow by 44% and restored net profitability", "It pegged the price of ether directly to gold reserves", "It restricted trading exclusively to centralized market makers"],
          correct: "It reduced toxic order flow by 44% and restored net profitability",
          category: "inference",
          explanation: "Dynamic swap fees indexed to realized volatility curtailed toxic flow by 44%, turning passive provider returns positive."
        }
      ]
    }
  ],
  "Section 21": [
    {
      title: "Solid-State Electrolyte Interfacial Dynamics & Dendritic Growth",
      description: "A materials electrochemist details critical current density limits and interphase engineering in solid-state batteries.",
      transcript: "[M5]All-solid-state lithium metal batteries represent the frontier of high-energy storage, targeting cell-level specific energies above five hundred watt-hours per kilogram. Replacing organic liquid electrolytes with superionic solid conductors like sulfide-based lithium germanium phosphorus sulfide, or LGPS, achieves bulk ionic conductivities of twelve millisiemens per centimetre at room temperature. However, commercialization is impeded by electro-chemo-mechanical degradation at the lithium-electrolyte boundary. During rapid electrodeposition, non-uniform current distribution causes lithium nucleation at grain boundaries once the critical current density exceeds one point eight milliamperes per square centimetre. These metallic filaments propagate intergranularly across the ceramic pellet, inducing catastrophic short-circuits within seventy to eighty cycles. To suppress dendrite penetration, we deposited a four-nanometre conformal zinc-doped alumina interlayer via atomic layer deposition and applied an isostatic stack pressure of five megapascals. This engineering interface promoted homogeneous planar lithium dissolution and plating, extending operational lifespan to twelve hundred cycles at three C-rate while retaining eighty-eight point seven percent of initial capacity.",
      questions: [
        {
          id: "pr1s21q1",
          text: "What room-temperature ionic conductivity is exhibited by the sulfide solid electrolyte LGPS?",
          options: ["1.2 millisiemens per centimetre", "4.5 millisiemens per centimetre", "12 millisiemens per centimetre", "25 millisiemens per centimetre"],
          correct: "12 millisiemens per centimetre",
          category: "numbers",
          explanation: "LGPS achieves bulk ionic conductivities of 12 millisiemens per centimetre at room temperature."
        },
        {
          id: "pr1s21q2",
          text: "What phenomenon occurs when the current density exceeds 1.8 milliamperes per square centimetre?",
          options: ["Rapid evaporation of the solid ceramic separator", "Lithium dendrite nucleation and intergranular filament propagation", "Electrode phase transformation into metallic zinc", "Immediate thermal runaway above 600°C"],
          correct: "Lithium dendrite nucleation and intergranular filament propagation",
          category: "factual",
          explanation: "Exceeding the critical current density triggers lithium nucleation at grain boundaries and intergranular filament short-circuiting."
        },
        {
          id: "pr1s21q3",
          text: "What capacity retention was maintained after 1200 cycles using the engineered ALD interlayer?",
          options: ["72.4%", "81.0%", "88.7%", "95.2%"],
          correct: "88.7%",
          category: "numbers",
          explanation: "With the protective interlayer and stack pressure, the battery retained 88.7% of initial capacity after 1,200 cycles."
        }
      ]
    }
  ],
  "Section 22": [
    {
      title: "Paleogenomics & Archaic Hominin Introgression",
      description: "An evolutionary geneticist discusses Neanderthal and Denisovan haplotype survival in the human genome.",
      transcript: "[F4]High-coverage sequencing of archaic hominin genomes from late Pleistocene fossil remains has revolutionized our understanding of modern human evolutionary history. Through D-statistic formalisms, or ABBA-BABA tests, we can rigorously detect gene flow events between divergent lineages. Contemporary non-African human populations carry between one point eight and two point four percent Neanderthal-derived genomic ancestry as a consequence of interbreeding encounters in the Near East roughly fifty-five thousand years ago. In addition, indigenous populations of Melanesia and Island Southeast Asia carry four to six percent Denisovan ancestry. While natural selection purged the majority of introgressed alleles due to hybrid incompatibilities—particularly across the X chromosome where archaic ancestry is depleted by more than eighty percent—certain archaic loci conferred decisive adaptive advantages. Notably, modern Tibetans inherited a distinctive five-SNP haplotype in the EPAS1 gene from Denisovans, enabling hypoxia adaptation at altitudes exceeding four thousand metres without polycythemia. Furthermore, archaic alleles in toll-like receptor genes TLR1, TLR6, and TLR10 reinforced innate pathogen resistance across Eurasian populations.",
      questions: [
        {
          id: "pr1s22q1",
          text: "What percentage of Neanderthal-derived DNA is typically found in modern non-African genomes?",
          options: ["0.2% to 0.5%", "1.8% to 2.4%", "4.0% to 6.0%", "8.5% to 10.0%"],
          correct: "1.8% to 2.4%",
          category: "numbers",
          explanation: "Contemporary non-African human genomes retain between 1.8% and 2.4% Neanderthal ancestry."
        },
        {
          id: "pr1s22q2",
          text: "Which gene acquired from Denisovan introgression allows modern Tibetans to adapt to high altitudes?",
          options: ["FOXP2", "EPAS1", "BRCA1", "APOE4"],
          correct: "EPAS1",
          category: "factual",
          explanation: "A distinctive haplotype in the EPAS1 gene was inherited from Denisovans, conferring hypoxia tolerance at high altitudes."
        },
        {
          id: "pr1s22q3",
          text: "Why is archaic hominin ancestry significantly depleted on the human X chromosome?",
          options: ["The X chromosome did not exist during the late Pleistocene", "Purifying natural selection eliminated alleles causing hybrid incompatibilities", "Ancient DNA cannot be recovered from sex chromosomes", "X-linked genes mutated into repetitive non-coding satellites"],
          correct: "Purifying natural selection eliminated alleles causing hybrid incompatibilities",
          category: "inference",
          explanation: "Natural selection actively purged introgressed alleles on the X chromosome due to strong hybrid incompatibilities."
        }
      ]
    }
  ]

};
