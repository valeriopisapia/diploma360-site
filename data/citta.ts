export type City = {
  slug: string
  nome: string
  titoloSeo: string
  descSeo: string
  provinciaLabel: string
  zonaHero: string[]
  zonaFull: string[]
  zonaParagraph: string
  /** Optional: overrides the middle part of the zone intro sentence (only Roma). */
  zonaIntroMid?: string
}

export const citta: City[] = [
  {
    slug: 'ancona',
    nome: 'Ancona',
    titoloSeo: 'Recupero anni scolastici a Ancona | Diploma360',
    descSeo:
      'Recupero anni scolastici a Ancona con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'provincia di Ancona',
    zonaHero: ['Ancona centro', 'Piano', 'Torrette', 'Pinocchio', 'Tavernelle'],
    zonaFull: ['Ancona centro', 'Piano', 'Torrette', 'Pinocchio', 'Tavernelle', 'Senigallia', 'Jesi', 'Falconara Marittima', 'Osimo', 'Chiaravalle'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Ancona — dai quartieri centrali fino ai comuni come Senigallia, Jesi, Falconara Marittima e Osimo.',
  },
  {
    slug: 'bari',
    nome: 'Bari',
    titoloSeo: 'Recupero anni scolastici a Bari | Diploma360',
    descSeo:
      'Recupero anni scolastici a Bari con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Bari',
    zonaHero: ['Bari centro', 'Murat', 'Libertà', 'Carrassi', 'Poggiofranco', 'Japigia'],
    zonaFull: ['Bari centro', 'Murat', 'Libertà', 'Carrassi', 'Poggiofranco', 'Japigia', 'Modugno', 'Bitonto', 'Molfetta', 'Altamura', 'Monopoli'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Bari — dai quartieri centrali fino ai comuni come Modugno, Bitonto, Molfetta e Altamura.',
  },
  {
    slug: 'bergamo',
    nome: 'Bergamo',
    titoloSeo: 'Recupero anni scolastici a Bergamo | Diploma360',
    descSeo:
      'Recupero anni scolastici a Bergamo con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'provincia di Bergamo',
    zonaHero: ['Bergamo centro', 'Città Alta', 'Borgo Santa Caterina', 'Longuelo', 'Colognola', 'Redona'],
    zonaFull: ['Bergamo centro', 'Città Alta', 'Borgo Santa Caterina', 'Longuelo', 'Colognola', 'Redona', 'Treviglio', 'Seriate', 'Dalmine', 'Albino', 'Caravaggio'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Bergamo — dai quartieri centrali fino ai comuni come Treviglio, Seriate, Dalmine e Albino.',
  },
  {
    slug: 'bologna',
    nome: 'Bologna',
    titoloSeo: 'Recupero anni scolastici a Bologna | Diploma360',
    descSeo:
      'Recupero anni scolastici a Bologna con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Bologna',
    zonaHero: ['Bologna centro', 'Bolognina', 'San Donato', 'Saragozza', 'Santo Stefano', 'Navile'],
    zonaFull: ['Bologna centro', 'Bolognina', 'San Donato', 'Saragozza', 'Santo Stefano', 'Navile', 'Casalecchio di Reno', 'San Lazzaro di Savena', 'Imola', 'Castel Maggiore', 'Zola Predosa'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Bologna — dai quartieri centrali fino ai comuni come Casalecchio di Reno, San Lazzaro di Savena, Imola e Castel Maggiore.',
  },
  {
    slug: 'cagliari',
    nome: 'Cagliari',
    titoloSeo: 'Recupero anni scolastici a Cagliari | Diploma360',
    descSeo:
      'Recupero anni scolastici a Cagliari con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Cagliari',
    zonaHero: ['Cagliari centro', 'Pirri', 'Poetto', 'Genneruxi', 'San Benedetto', 'Is Mirrionis'],
    zonaFull: ['Cagliari centro', 'Pirri', 'Poetto', 'Genneruxi', 'San Benedetto', 'Is Mirrionis', "Quartu Sant'Elena", 'Selargius', 'Assemini', 'Monserrato', 'Capoterra'],
    zonaParagraph: "Seguiamo studenti, lavoratori e famiglie di tutta Cagliari — dai quartieri centrali fino ai comuni come Quartu Sant'Elena, Selargius, Assemini e Monserrato.",
  },
  {
    slug: 'catania',
    nome: 'Catania',
    titoloSeo: 'Recupero anni scolastici a Catania | Diploma360',
    descSeo:
      'Recupero anni scolastici a Catania con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Catania',
    zonaHero: ['Catania centro', 'Borgo', 'Picanello', 'Nesima', 'Librino', 'Ognina'],
    zonaFull: ['Catania centro', 'Borgo', 'Picanello', 'Nesima', 'Librino', 'Ognina', 'Misterbianco', 'Acireale', 'Paternò', 'Gravina di Catania', 'Mascalucia'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Catania — dai quartieri centrali fino ai comuni come Misterbianco, Acireale, Paternò e Gravina di Catania.',
  },
  {
    slug: 'firenze',
    nome: 'Firenze',
    titoloSeo: 'Recupero anni scolastici a Firenze | Diploma360',
    descSeo:
      'Recupero anni scolastici a Firenze con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Firenze',
    zonaHero: ['Firenze centro', 'Campo di Marte', 'Novoli', 'Rifredi', 'Isolotto', 'Gavinana'],
    zonaFull: ['Firenze centro', 'Campo di Marte', 'Novoli', 'Rifredi', 'Isolotto', 'Gavinana', 'Scandicci', 'Sesto Fiorentino', 'Empoli', 'Bagno a Ripoli', 'Pontassieve'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Firenze — dai quartieri centrali fino ai comuni come Scandicci, Sesto Fiorentino, Empoli e Bagno a Ripoli.',
  },
  {
    slug: 'genova',
    nome: 'Genova',
    titoloSeo: 'Recupero anni scolastici a Genova | Diploma360',
    descSeo:
      'Recupero anni scolastici a Genova con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Genova',
    zonaHero: ['Genova centro', 'Sampierdarena', 'Sestri Ponente', 'Nervi', 'Marassi', 'Sturla'],
    zonaFull: ['Genova centro', 'Sampierdarena', 'Sestri Ponente', 'Nervi', 'Marassi', 'Sturla', 'Rapallo', 'Chiavari', 'Arenzano', 'Cogoleto', 'Recco'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Genova — dai quartieri centrali fino ai comuni come Rapallo, Chiavari, Arenzano e Cogoleto.',
  },
  {
    slug: 'latina',
    nome: 'Latina',
    titoloSeo: 'Recupero anni scolastici a Latina | Diploma360',
    descSeo:
      'Recupero anni scolastici a Latina con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'provincia di Latina',
    zonaHero: ['Latina centro', 'Latina Scalo', 'Latina nord', 'Latina sud'],
    zonaFull: ['Latina centro', 'Latina Scalo', 'Latina nord', 'Latina sud', 'Aprilia', 'Cisterna di Latina', 'Terracina', 'Sabaudia', 'Sezze'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Latina — dai quartieri centrali fino ai comuni come Aprilia, Cisterna di Latina, Terracina e Sabaudia.',
  },
  {
    slug: 'milano',
    nome: 'Milano',
    titoloSeo: 'Recupero anni scolastici a Milano | Diploma360',
    descSeo:
      'Recupero anni scolastici a Milano con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Milano',
    zonaHero: ['Milano centro', 'Navigli', 'Porta Romana', 'Città Studi', 'Isola', 'Bicocca'],
    zonaFull: ['Milano centro', 'Navigli', 'Porta Romana', 'Città Studi', 'Isola', 'Bicocca', 'Lambrate', 'Sesto San Giovanni', 'Cinisello Balsamo', 'Rho', 'Cologno Monzese', 'San Donato Milanese'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Milano — dai quartieri centrali fino ai comuni come Sesto San Giovanni, Cinisello Balsamo, Rho e Cologno Monzese.',
  },
  {
    slug: 'napoli',
    nome: 'Napoli',
    titoloSeo: 'Recupero anni scolastici a Napoli | Diploma360',
    descSeo:
      'Recupero anni scolastici a Napoli con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Napoli',
    zonaHero: ['Napoli centro', 'Vomero', 'Fuorigrotta', 'Chiaia', 'Posillipo', 'Soccavo'],
    zonaFull: ['Napoli centro', 'Vomero', 'Fuorigrotta', 'Chiaia', 'Posillipo', 'Soccavo', 'Pozzuoli', 'Giugliano in Campania', 'Casoria', 'Portici', 'Afragola'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Napoli — dai quartieri centrali fino ai comuni come Pozzuoli, Giugliano in Campania, Casoria e Portici.',
  },
  {
    slug: 'padova',
    nome: 'Padova',
    titoloSeo: 'Recupero anni scolastici a Padova | Diploma360',
    descSeo:
      'Recupero anni scolastici a Padova con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'provincia di Padova',
    zonaHero: ['Padova centro', 'Arcella', 'Stanga', 'Brusegana', 'Mortise'],
    zonaFull: ['Padova centro', 'Arcella', 'Stanga', 'Brusegana', 'Mortise', 'Albignasego', 'Selvazzano Dentro', 'Vigonza', 'Abano Terme', 'Cittadella'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Padova — dai quartieri centrali fino ai comuni come Albignasego, Selvazzano Dentro, Vigonza e Abano Terme.',
  },
  {
    slug: 'palermo',
    nome: 'Palermo',
    titoloSeo: 'Recupero anni scolastici a Palermo | Diploma360',
    descSeo:
      'Recupero anni scolastici a Palermo con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Palermo',
    zonaHero: ['Palermo centro', 'Libertà', 'Politeama', 'Brancaccio', 'Zisa', 'Mondello'],
    zonaFull: ['Palermo centro', 'Libertà', 'Politeama', 'Brancaccio', 'Zisa', 'Mondello', 'Monreale', 'Bagheria', 'Carini', 'Partinico', 'Misilmeri'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Palermo — dai quartieri centrali fino ai comuni come Monreale, Bagheria, Carini e Partinico.',
  },
  {
    slug: 'perugia',
    nome: 'Perugia',
    titoloSeo: 'Recupero anni scolastici a Perugia | Diploma360',
    descSeo:
      'Recupero anni scolastici a Perugia con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'provincia di Perugia',
    zonaHero: ['Perugia centro', 'Fontivegge', 'Ponte San Giovanni', 'San Sisto', 'Madonna Alta'],
    zonaFull: ['Perugia centro', 'Fontivegge', 'Ponte San Giovanni', 'San Sisto', 'Madonna Alta', 'Foligno', 'Città di Castello', 'Assisi', 'Bastia Umbra', 'Corciano'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Perugia — dai quartieri centrali fino ai comuni come Foligno, Città di Castello, Assisi e Bastia Umbra.',
  },
  {
    slug: 'pescara',
    nome: 'Pescara',
    titoloSeo: 'Recupero anni scolastici a Pescara | Diploma360',
    descSeo:
      'Recupero anni scolastici a Pescara con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'provincia di Pescara',
    zonaHero: ['Pescara centro', 'Pescara nord', 'Colli', 'Porta Nuova', 'Zona Universitaria'],
    zonaFull: ['Pescara centro', 'Pescara nord', 'Colli', 'Porta Nuova', 'Zona Universitaria', 'Montesilvano', 'Spoltore', "Città Sant'Angelo", 'Chieti', 'Francavilla al Mare'],
    zonaParagraph: "Seguiamo studenti, lavoratori e famiglie di tutta Pescara — dai quartieri centrali fino ai comuni come Montesilvano, Spoltore, Città Sant'Angelo e Chieti.",
  },
  {
    slug: 'roma',
    nome: 'Roma',
    titoloSeo: 'Recupero anni scolastici a Roma | Diploma360',
    descSeo:
      'Recupero anni scolastici a Roma con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Roma Capitale',
    zonaHero: ['Roma centro', 'Roma nord', 'Roma est', 'Roma sud', 'EUR', 'Tuscolana'],
    zonaFull: ['Roma centro', 'Prati', 'Montesacro', 'Tuscolano', 'EUR', 'Ostia', 'Roma nord', 'Roma est', 'Guidonia', 'Pomezia', 'Tivoli', 'Fiumicino'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Roma — dai quartieri centrali fino ai comuni come Guidonia, Pomezia, Tivoli, Fiumicino e Aprilia.',
    zonaIntroMid: "in centro, a Roma nord, sul Tuscolano, all'EUR o in un comune della provincia",
  },
  {
    slug: 'salerno',
    nome: 'Salerno',
    titoloSeo: 'Recupero anni scolastici a Salerno | Diploma360',
    descSeo:
      'Recupero anni scolastici a Salerno con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'provincia di Salerno',
    zonaHero: ['Salerno centro', 'Torrione', 'Pastena', 'Mercatello', 'Fratte'],
    zonaFull: ['Salerno centro', 'Torrione', 'Pastena', 'Mercatello', 'Fratte', 'Battipaglia', "Cava de' Tirreni", 'Nocera Inferiore', 'Eboli', 'Scafati'],
    zonaParagraph: "Seguiamo studenti, lavoratori e famiglie di tutta Salerno — dai quartieri centrali fino ai comuni come Battipaglia, Cava de' Tirreni, Nocera Inferiore e Eboli.",
  },
  {
    slug: 'torino',
    nome: 'Torino',
    titoloSeo: 'Recupero anni scolastici a Torino | Diploma360',
    descSeo:
      'Recupero anni scolastici a Torino con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'Città Metropolitana di Torino',
    zonaHero: ['Torino centro', 'San Salvario', 'Crocetta', 'Mirafiori', 'Barriera di Milano', 'Santa Rita'],
    zonaFull: ['Torino centro', 'San Salvario', 'Crocetta', 'Mirafiori', 'Barriera di Milano', 'Santa Rita', 'Moncalieri', 'Collegno', 'Rivoli', 'Settimo Torinese', 'Nichelino'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Torino — dai quartieri centrali fino ai comuni come Moncalieri, Collegno, Rivoli e Settimo Torinese.',
  },
  {
    slug: 'verona',
    nome: 'Verona',
    titoloSeo: 'Recupero anni scolastici a Verona | Diploma360',
    descSeo:
      'Recupero anni scolastici a Verona con Diploma360: studi online, sostieni l\'esame in una sede convenzionata vicino a te. Tutor dedicati, diploma di Stato riconosciuto, rate da 72,68€/mese.',
    provinciaLabel: 'provincia di Verona',
    zonaHero: ['Verona centro', 'Borgo Trento', 'Borgo Roma', 'San Michele', 'Golosine'],
    zonaFull: ['Verona centro', 'Borgo Trento', 'Borgo Roma', 'San Michele', 'Golosine', 'San Giovanni Lupatoto', 'Villafranca di Verona', 'Legnago', 'Bussolengo', 'San Bonifacio'],
    zonaParagraph: 'Seguiamo studenti, lavoratori e famiglie di tutta Verona — dai quartieri centrali fino ai comuni come San Giovanni Lupatoto, Villafranca di Verona, Legnago e Bussolengo.',
  },
]

export function getCitta(slug: string): City | undefined {
  return citta.find((c) => c.slug === slug)
}

export function allCittaSlugs(): string[] {
  return citta.map((c) => c.slug)
}
