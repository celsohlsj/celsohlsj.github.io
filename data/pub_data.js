/* ============================================================
   PUBLICATIONS — verified from Lattes/CNPq (April 2026)
   Citation counts from Google Scholar (March 2026)
   Updated automatically by fetch_scholar.py + GitHub Actions
   ============================================================ */
const STATIC_PAPERS = [
  {year:2018,journal:'Nature Communications',cat:'nature',
   title:'21st Century drought-related fires counteract the decline of Amazon deforestation carbon emissions',
   authors:'Aragão, L. E. O. C.; Anderson, L. O.; Fonseca, M. G.; Rosan, T. M.; Vedovato, L. B.; Wagner, F. H.; Silva, C. V. J.; <strong>Silva-Junior, C. H. L.</strong>; Arai, E.; Aguiar, A. P.; et al.',
   cited_by:615, link:'https://scholar.google.com/scholar?q=21st+century+drought+related+fires+counteract+Amazon'},

  {year:2020,journal:'Nature Ecology & Evolution',cat:'nature',
   title:'The Brazilian Amazon deforestation rate in 2020 is the greatest of the decade',
   authors:'<strong>Silva-Junior, C. H. L.</strong>; Pessôa, A. C. M.; Carvalho, N. S.; Reis, J. B. C.; Anderson, L. O.; Aragão, L. E. O. C.',
   cited_by:306, link:'https://scholar.google.com/scholar?q=Brazilian+Amazon+deforestation+rate+2020+greatest+decade'},

  {year:2020,journal:'Science Advances',cat:'other',
   title:'Persistent collapse of biomass in Amazonian forest edges following deforestation leads to unaccounted carbon losses',
   authors:'<strong>Silva-Junior, C. H. L.</strong>; Aragão, L. E. O. C.; Anderson, L. O.; Fonseca, M. G.; Shimabukuro, Y. E.; Vancutsem, C.; Achard, F.; Beuchle, R.; Numata, I.; Silva, C. A.; Maeda, E. E.; Longo, M.; Saatchi, S. S.',
   cited_by:131, link:'https://scholar.google.com/scholar?q=Persistent+collapse+biomass+Amazonian+forest+edges'},

  {year:2021,journal:'Nature Communications',cat:'nature',
   title:'Large carbon sink potential of Secondary Forests in the Brazilian Amazon to mitigate climate change',
   authors:'Heinrich, V. H. A.; Dalagnol, R.; Cassol, H. L. G.; Rosan, T. M.; Almeida, C. T.; <strong>Silva-Junior, C. H. L.</strong>; Campanharo, W. A.; House, J. I.; Sitch, S.; Hales, T. C.; Adam, M.; Anderson, L. O.; Aragão, L. E. O. C.',
   cited_by:201, link:'https://scholar.google.com/scholar?q=Large+carbon+sink+potential+Secondary+Forests+Brazilian+Amazon'},

  {year:2021,journal:'Nature Geoscience',cat:'nature',
   title:'Amazonian forest degradation must be incorporated into the COP26 agenda',
   authors:'<strong>Silva-Junior, C. H. L.</strong>; Carvalho, N. S.; Pessoa, A. C. M.; Reis, J. B. C.; Pontes-Lopes, A.; Doblas, J.; Heinrich, V.; Campanharo, W.; Alencar, A.; Silva, C.; Lapola, D. M.; Armenteras, D.; Matricardi, E. A. T.; Berenguer, E.; et al.',
   cited_by:48, link:'https://scholar.google.com/scholar?q=Amazonian+forest+degradation+COP26+agenda'},

  {year:2023,journal:'Science',cat:'science',
   title:'The drivers and impacts of Amazon forest degradation',
   authors:'Lapola, D. M.; Pinho, P.; Barlow, J.; Aragão, L. E. O. C.; Berenguer, E.; Carmenta, R.; Liddy, H. M.; Seixas, H.; Silva, C. V. J.; <strong>Silva-Junior, C. H. L.</strong>; Alencar, A. A. C.; Anderson, L. O.; et al.',
   cited_by:401, link:'https://scholar.google.com/scholar?q=drivers+impacts+Amazon+forest+degradation+Lapola+2023'},

  {year:2023,journal:'Nature',cat:'nature',
   title:'The carbon sink of secondary and degraded humid tropical forests',
   authors:'Heinrich, V.; Vancutsem, C.; Dalagnol, R.; Rosan, T. M.; Fawcett, D.; <strong>Silva-Junior, C. H. L.</strong>; Cassol, H.; Achard, F.; Jucker, T.; Silva, C.; House, J.; Sitch, S.; Hales, T.; Aragão, L. E. O. C.',
   cited_by:121, link:'https://scholar.google.com/scholar?q=carbon+sink+secondary+degraded+humid+tropical+forests+Heinrich+2023'},

  {year:2023,journal:'Remote Sensing of Environment',cat:'other',
   title:'Mapping tropical forest degradation with deep learning and Planet NICFI data',
   authors:'Dalagnol, R.; Wagner, F. H.; Galvão, L. S.; Braga, D.; Osborn, F.; Sagang, L. B.; da Conceição Bispo, P.; Payne, M.; <strong>Silva-Junior, C. H. L.</strong>; Favrichon, S.; Anderson, L. O.; Aragão, L. E. O. C.; Saatchi, S.',
   cited_by:63, link:'https://scholar.google.com/scholar?q=Mapping+tropical+forest+degradation+deep+learning+Planet+NICFI'},

  {year:2025,journal:'Nature Climate Change',cat:'nature',
   title:'Protect young secondary forests for optimum carbon removal',
   authors:'Robinson, N.; Drever, C. R.; Gibbs, D. A.; Lister, K.; Esquivel-Muelbert, A.; Heinrich, V.; Ciais, P.; <strong>Silva-Junior, C. H. L.</strong>; Liu, Z.; Pugh, T. A. M.; Saatchi, S.; Xu, Y.; Cook-Patton, S. C.',
   cited_by:16, link:'https://scholar.google.com/scholar?q=Protect+young+secondary+forests+optimum+carbon+removal'},

  {year:2020,journal:'Scientific Data',cat:'nature',
   title:'Benchmark maps of 33 years of secondary forest age for Brazil',
   authors:'<strong>Silva-Junior, C. H. L.</strong>; Heinrich, V. H. A.; Freire, A. T. G.; Broggio, I. S.; Rosan, T. M.; Doblas, J.; Anderson, L. O.; Rousseau, G. X.; Shimabukuro, Y. E.; Silva, C. A.; House, J. I.; Aragão, L. E. O. C.',
   cited_by:67, link:'https://scholar.google.com/scholar?q=Benchmark+maps+33+years+secondary+forest+age+Brazil'},

  // --- Additional papers for full publications page ---
  {year:2022,journal:'Nature Ecology & Evolution',cat:'nature',
   title:'Record-breaking fires in the Brazilian Amazon associated with uncontrolled deforestation',
   authors:'Mataveli, G.; de Oliveira, G.; <strong>Silva-Junior, C. H. L.</strong>; Stark, S. C.; Carvalho, N.; Anderson, L. O.; Gatti, L. V.; Aragão, L. E. O. C.',
   cited_by:26, link:'https://scholar.google.com/scholar?q=Record-breaking+fires+Brazilian+Amazon+uncontrolled+deforestation'},

  {year:2022,journal:'Global Ecology and Biogeography',cat:'other',
   title:'Amazon fires in the 21st century: The year of 2020 in evidence',
   authors:'Silveira, M. V. F.; <strong>Silva-Junior, C. H. L.</strong>; Anderson, L. O.; Aragão, L. E. O. C.',
   cited_by:57, link:'https://scholar.google.com/scholar?q=Amazon+fires+21st+century+2020+evidence'},

  {year:2022,journal:'Global Change Biology',cat:'other',
   title:'Declining Amazon biomass due to deforestation and subsequent degradation losses exceeding gains',
   authors:'Fawcett, D.; Sitch, S.; Ciais, P.; Wigneron, J. P.; <strong>Silva-Junior, C. H. L.</strong>; Heinrich, V.; Vancutsem, C.; Achard, F.; Bastos, A.; Yang, H.; Li, X.; Albergel, C.; Friedlingstein, P.; Aragão, L. E. O. C.',
   cited_by:39, link:'https://scholar.google.com/scholar?q=Declining+Amazon+biomass+deforestation+degradation'},

  {year:2023,journal:'Scientific Reports',cat:'nature',
   title:'Brazilian Amazon indigenous territories under deforestation pressure',
   authors:'<strong>Silva-Junior, C. H. L.</strong>; Silva, F. B.; Arisi, B. M.; Mataveli, G.; Pessôa, A. C. M.; Carvalho, N. S.; Reis, J. B. C.; et al.',
   cited_by:48, link:'https://scholar.google.com/scholar?q=Brazilian+Amazon+indigenous+territories+deforestation+pressure'},

  {year:2023,journal:'Ecological Economics',cat:'other',
   title:'Protected areas are effective on curbing fires in the Amazon',
   authors:'Pessôa, A. C. M.; Morello, T. F.; <strong>Silva-Junior, C. H. L.</strong>; Doblas, J.; Carvalho, N. S.; Aragão, L. E. O. C.; Anderson, L. O.',
   cited_by:11, link:'https://scholar.google.com/scholar?q=Protected+areas+effective+curbing+fires+Amazon'},

  {year:2024,journal:'Nature Ecology & Evolution',cat:'nature',
   title:'Overlooking vegetation loss outside forests imperils the Brazilian Cerrado and other non-forest biomes',
   authors:'Bispo, P. C.; Picoli, M. C.; Marimon, B. S.; Marimon Junior, B. H.; Peres, C. A.; Menor, I. O.; Silva, D. E.; Machado, F. F.; Alencar, A. A. C.; Almeida, C. A.; Anderson, L. O.; Aragão, L. E. O. C.; Breunig, F. M.; Bustamante, M.; Dalagnol, R.; <strong>Silva-Junior, C. H. L.</strong>; et al.',
   cited_by:29, link:'https://scholar.google.com/scholar?q=Overlooking+vegetation+loss+outside+forests+Brazilian+Cerrado'},

  {year:2024,journal:'Environmental Research Letters',cat:'other',
   title:'Quantifying landscape fragmentation and forest carbon dynamics over 35 years in the Brazilian Atlantic Forest',
   authors:'Broggio, I. S.; <strong>Silva-Junior, C. H. L.</strong>; Nascimento, M. T.; Villela, D. M.; Aragão, L. E. O. C.',
   cited_by:19, link:'https://scholar.google.com/scholar?q=landscape+fragmentation+forest+carbon+dynamics+Atlantic+Forest'},

  {year:2024,journal:'ISPRS Journal of Photogrammetry and Remote Sensing',cat:'other',
   title:"Revealing the spatial variation in biomass uptake rates of Brazil's secondary forests",
   authors:'Chen, N.; Tsendbazar, N.; Suarez, D. R.; <strong>Silva-Junior, C. H. L.</strong>; Verbesselt, J.; Herold, M.',
   cited_by:10, link:'https://scholar.google.com/scholar?q=spatial+variation+biomass+uptake+rates+Brazil+secondary+forests'},

  {year:2021,journal:'LAND',cat:'other',
   title:'Roads in the Southwestern Amazon, State of Acre, between 2007 and 2019',
   authors:'Nascimento, E. S.; Silva, S. S.; Bordignon, L.; Melo, A. W. F.; Brandão, A.; Souza, C. M.; <strong>Silva-Junior, C. H. L.</strong>',
   cited_by:21, link:'https://scholar.google.com/scholar?q=Roads+Southwestern+Amazon+Acre+2007+2019'},

  {year:2021,journal:'Proceedings of the Royal Society B',cat:'other',
   title:'Drought-driven wildfire impacts on structure and dynamics in a wet Central Amazonian forest',
   authors:'Pontes-Lopes, A.; Silva, C. V. J.; Barlow, J.; Rincon, L. M.; Campanharo, W. A.; Nunes, C. A.; Almeida, C. T.; <strong>Silva-Junior, C. H. L.</strong>; Cassol, H. L. G.; Dalagnol, R.; Stark, S. C.; Graça, P. M. L. A.; Aragão, L. E. O. C.',
   cited_by:44, link:'https://scholar.google.com/scholar?q=Drought+wildfire+impacts+Central+Amazonian+forest'},

  {year:2020,journal:'Land Use Policy',cat:'other',
   title:'Amazon forest on the edge of collapse in the Maranhão State, Brazil',
   authors:'<strong>Silva-Junior, C. H. L.</strong>; Celentano, D.; Rousseau, G. X.; Moura, E. G.; Varga, I. V. D.; Martinez, C.; Martins, M. B.',
   cited_by:49, link:'https://scholar.google.com/scholar?q=Amazon+forest+edge+collapse+Maranhao+State'},

  {year:2019,journal:'Frontiers in Earth Science',cat:'other',
   title:'Fire Responses to the 2010 and 2015/2016 Amazonian Droughts',
   authors:'<strong>Silva-Junior, C. H. L.</strong>; Anderson, L. O.; Silva, A. L.; Almeida, C. T.; Dalagnol, R.; Pletsch, M. A. J. S.; Penha, T. V.; Paloschi, R. A.; Aragão, L. E. O. C.',
   cited_by:61, link:'https://scholar.google.com/scholar?q=Fire+Responses+2010+2015+Amazonian+Droughts'},

  {year:2018,journal:'Forests',cat:'other',
   title:'Deforestation-Induced Fragmentation Increases Forest Fire Occurrence in Central Brazilian Amazonia',
   authors:'<strong>Silva-Junior, C. H. L.</strong>; Aragão, L. E. O. C.; Fonseca, M. G.; Almeida, C. T.; Vedovato, L. B.; Anderson, L. O.',
   cited_by:96, link:'https://scholar.google.com/scholar?q=Deforestation+Fragmentation+Forest+Fire+Occurrence+Central+Brazilian+Amazonia'},

  {year:2022,journal:'Fire',cat:'other',
   title:'Forest Fragmentation and Fires in the Eastern Brazilian Amazon — Maranhão State, Brazil',
   authors:'<strong>Silva-Junior, C. H. L.</strong>; Buna, A. T. M.; Bezerra, D. S.; Costa, O. S.; Santos, A. L.; Basson, L. O. D.; Santos, A. L. S.; Alvarado, S. T.; Almeida, C. T.; Freire, A. T. G.; Rousseau, G. X.; Celentano, D.; Silva, F. B.; Pinheiro, M. S. S.; Amaral, S.; Kampel, M.; Vedovato, L. B.; Anderson, L. O.; Aragão, L. E. O. C.',
   cited_by:25, link:'https://scholar.google.com/scholar?q=Forest+Fragmentation+Fires+Eastern+Brazilian+Amazon+Maranhao'},

  {year:2021,journal:'Science',cat:'science',
   title:"Northeast Brazil's imperiled Cerrado",
   authors:"<strong>Silva-Junior, C. H. L.</strong>; Alvarado, S. T.; Celentano, D.; Rousseau, G. X.; Hernández, L. M.; Ferraz, T. M.; Silva, F. B.; de Melo, M. H. F.; Rodrigues, T. C. S.; Viegas, J. C.; Souza, U. D. V.; Santos, A. L. S.; Bezerra, D.",
   cited_by:11, link:'https://scholar.google.com/scholar?q=Northeast+Brazil+imperiled+Cerrado'},

  {year:2022,journal:'Conservation Letters',cat:'other',
   title:'Science-based planning can support law enforcement actions to curb deforestation in the Brazilian Amazon',
   authors:'Mataveli, G.; de Oliveira, G.; Chaves, M. E. D.; Dalagnol, R.; Wagner, F. H.; Ipia, A. H. S.; <strong>Silva-Junior, C. H. L.</strong>; Aragão, L. E. O. C.',
   cited_by:12, link:'https://scholar.google.com/scholar?q=Science-based+planning+law+enforcement+deforestation+Brazilian+Amazon'},

  {year:2026,journal:'Communications Earth & Environment',cat:'nature',
   title:'Forest connectivity boosts carbon recovery in regenerating Atlantic Forests',
   authors:'Rosan, T. M.; Vedovato, L. B.; Heinrich, V. H. A.; <strong>Silva-Junior, C. H. L.</strong>; Brancalion, P. H. S.; Sitch, S.; Aragão, L. E. O. C.',
   cited_by:0, link:'https://scholar.google.com/scholar?q=Forest+connectivity+boosts+carbon+recovery+Atlantic+Forests'},

  {year:2025,journal:'Environmental Research Letters',cat:'other',
   title:'Climate benefits of Amazon secondary forests — recent advances and research needs',
   authors:'Baker, J. C. A.; Adami, M.; <strong>Silva-Junior, C. H. L.</strong>; Sadeck, L.; Smith, C.; Heinrich, V.; Barlow, J.; Ferreira, J.; Cassol, H.; Anderson, L. O.; Aragão, L. E. O. C.; Sitch, S.; Spracklen, D. V.',
   cited_by:2, link:'https://scholar.google.com/scholar?q=Climate+benefits+Amazon+secondary+forests+recent+advances'},
];
