export type Diploma = {
  slug: string
  nome: string
  categoria: 'liceo' | 'tecnico' | 'professionale'
  titoloSeo: string
  descSeo: string
}

// Groupings derived from materiale/sito-vetrina-diploma360-v3/diplomi.html
// Licei: section "Licei" (8 entries)
// Istituti Tecnici: section "Istituti Tecnici" (8 entries)
// Istituti Professionali: section "Istituti Professionali" (4 entries)

export const diplomi: Diploma[] = [
  // ── Licei ──────────────────────────────────────────────────────────────────
  {
    slug: 'liceo-scientifico',
    nome: 'Liceo Scientifico',
    categoria: 'liceo',
    titoloSeo: 'Liceo Scientifico | Diploma360',
    descSeo:
      'Scegli una formazione scientifica per il tuo futuro. Programma, materie, sbocchi e iscrizioni — Liceo Scientifico con Diploma360.',
  },
  {
    slug: 'liceo-classico',
    nome: 'Liceo Classico',
    categoria: 'liceo',
    titoloSeo: 'Liceo Classico | Diploma360',
    descSeo:
      'La formazione più completa per chi vuole imparare a pensare. Programma, materie, sbocchi e iscrizioni — Liceo Classico con Diploma360.',
  },
  {
    slug: 'liceo-scienze-applicate',
    nome: 'Liceo Scientifico Scienze Applicate',
    categoria: 'liceo',
    titoloSeo: 'Liceo Scientifico Scienze Applicate | Diploma360',
    descSeo:
      'Una formazione scientifica con focus su informatica e laboratorio. Programma, materie, sbocchi e iscrizioni — Liceo Scientifico Scienze Applicate con Diploma360.',
  },
  {
    slug: 'liceo-sportivo',
    nome: 'Liceo Scientifico Indirizzo Sportivo',
    categoria: 'liceo',
    titoloSeo: 'Liceo Scientifico Indirizzo Sportivo | Diploma360',
    descSeo:
      'Per chi vuole unire studio scientifico e passione per lo sport. Programma, materie, sbocchi e iscrizioni — Liceo Scientifico Indirizzo Sportivo con Diploma360.',
  },
  {
    slug: 'liceo-linguistico',
    nome: 'Liceo Linguistico',
    categoria: 'liceo',
    titoloSeo: 'Liceo Linguistico | Diploma360',
    descSeo:
      'Tre lingue straniere per un futuro internazionale. Programma, materie, sbocchi e iscrizioni — Liceo Linguistico con Diploma360.',
  },
  {
    slug: 'liceo-scienze-umane',
    nome: 'Liceo Scienze Umane',
    categoria: 'liceo',
    titoloSeo: 'Liceo Scienze Umane | Diploma360',
    descSeo:
      'Esplora il mondo della cultura e della società. Programma, materie, sbocchi e iscrizioni — Liceo Scienze Umane con Diploma360.',
  },
  {
    slug: 'liceo-economico-sociale',
    nome: 'Liceo Economico-Sociale (LES)',
    categoria: 'liceo',
    titoloSeo: 'Liceo Economico-Sociale (LES) | Diploma360',
    descSeo:
      'Discipline umane integrate con economia e diritto. Programma, materie, sbocchi e iscrizioni — Liceo Economico-Sociale (LES) con Diploma360.',
  },
  {
    slug: 'liceo-artistico',
    nome: 'Liceo Artistico',
    categoria: 'liceo',
    titoloSeo: 'Liceo Artistico | Diploma360',
    descSeo:
      'Per chi vede il mondo con occhi creativi. Programma, materie, sbocchi e iscrizioni — Liceo Artistico con Diploma360.',
  },

  // ── Istituti Tecnici ────────────────────────────────────────────────────────
  {
    slug: 'afm',
    nome: 'Amministrazione, Finanza e Marketing',
    categoria: 'tecnico',
    titoloSeo: 'Amministrazione, Finanza e Marketing | Diploma360',
    descSeo:
      'Le competenze chiave per il mondo aziendale. Programma, materie, sbocchi e iscrizioni — Amministrazione, Finanza e Marketing con Diploma360.',
  },
  {
    slug: 'rim',
    nome: 'Relazioni Internazionali per il Marketing (RIM)',
    categoria: 'tecnico',
    titoloSeo: 'Relazioni Internazionali per il Marketing (RIM) | Diploma360',
    descSeo:
      'Marketing e business in un contesto globale. Programma, materie, sbocchi e iscrizioni — Relazioni Internazionali per il Marketing (RIM) con Diploma360.',
  },
  {
    slug: 'turismo',
    nome: 'Turismo (I.T.E.)',
    categoria: 'tecnico',
    titoloSeo: 'Turismo (I.T.E.) | Diploma360',
    descSeo:
      'Competenze turistiche, economiche e linguistiche. Programma, materie, sbocchi e iscrizioni — Turismo (I.T.E.) con Diploma360.',
  },
  {
    slug: 'meccanica',
    nome: 'Meccanica, Meccatronica ed Energia',
    categoria: 'tecnico',
    titoloSeo: 'Meccanica, Meccatronica ed Energia | Diploma360',
    descSeo:
      'Costruire, progettare, automatizzare. Programma, materie, sbocchi e iscrizioni — Meccanica, Meccatronica ed Energia con Diploma360.',
  },
  {
    slug: 'elettronica',
    nome: 'Elettronica ed Elettrotecnica',
    categoria: 'tecnico',
    titoloSeo: 'Elettronica ed Elettrotecnica | Diploma360',
    descSeo:
      'Dalle reti elettriche ai sistemi embedded. Programma, materie, sbocchi e iscrizioni — Elettronica ed Elettrotecnica con Diploma360.',
  },
  {
    slug: 'informatica',
    nome: 'Informatica e Telecomunicazioni',
    categoria: 'tecnico',
    titoloSeo: 'Informatica e Telecomunicazioni | Diploma360',
    descSeo:
      'Coding, reti e sistemi: le competenze del futuro. Programma, materie, sbocchi e iscrizioni — Informatica e Telecomunicazioni con Diploma360.',
  },
  {
    slug: 'grafica',
    nome: 'Grafica e Comunicazione',
    categoria: 'tecnico',
    titoloSeo: 'Grafica e Comunicazione | Diploma360',
    descSeo:
      'Progettare e comunicare nell\'era digitale. Programma, materie, sbocchi e iscrizioni — Grafica e Comunicazione con Diploma360.',
  },
  {
    slug: 'chimica',
    nome: 'Chimica, Materiali e Biotecnologie',
    categoria: 'tecnico',
    titoloSeo: 'Chimica, Materiali e Biotecnologie | Diploma360',
    descSeo:
      'Scienze applicate al servizio dell\'industria. Programma, materie, sbocchi e iscrizioni — Chimica, Materiali e Biotecnologie con Diploma360.',
  },

  // ── Istituti Professionali ──────────────────────────────────────────────────
  {
    slug: 'servizi-commerciali',
    nome: 'Servizi Commerciali',
    categoria: 'professionale',
    titoloSeo: 'Servizi Commerciali | Diploma360',
    descSeo:
      'Pronto per il mondo del lavoro in tempi rapidi. Programma, materie, sbocchi e iscrizioni — Servizi Commerciali con Diploma360.',
  },
  {
    slug: 'enogastronomia',
    nome: 'Enogastronomia e Ospitalità Alberghiera',
    categoria: 'professionale',
    titoloSeo: 'Enogastronomia e Ospitalità Alberghiera | Diploma360',
    descSeo:
      'Cucina, sala e accoglienza per il mondo dell\'hospitality. Programma, materie, sbocchi e iscrizioni — Enogastronomia e Ospitalità Alberghiera con Diploma360.',
  },
  {
    slug: 'sanita',
    nome: 'Servizi per la Sanità e l\'Assistenza Sociale',
    categoria: 'professionale',
    titoloSeo: 'Servizi per la Sanità e l\'Assistenza Sociale | Diploma360',
    descSeo:
      'Per chi vuole occuparsi delle persone. Programma, materie, sbocchi e iscrizioni — Servizi per la Sanità e l\'Assistenza Sociale con Diploma360.',
  },
  {
    slug: 'agricoltura',
    nome: 'Servizi per l\'Agricoltura e lo Sviluppo Rurale',
    categoria: 'professionale',
    titoloSeo: 'Servizi per l\'Agricoltura e lo Sviluppo Rurale | Diploma360',
    descSeo:
      'Agricoltura moderna e gestione del territorio. Programma, materie, sbocchi e iscrizioni — Servizi per l\'Agricoltura e lo Sviluppo Rurale con Diploma360.',
  },
]

export function getDiploma(slug: string): Diploma | undefined {
  return diplomi.find((d) => d.slug === slug)
}

export function allDiplomaSlugs(): string[] {
  return diplomi.map((d) => d.slug)
}
