import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { LeadForm } from '@/components/forms/LeadForm'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import { getDiploma, allDiplomaSlugs, type MatArea } from '@/data/diplomi'
import './diploma.css'

/* ── Static params: generate one route per diploma ── */
export function generateStaticParams() {
  return allDiplomaSlugs().map((slug) => ({ slug }))
}

// Only pre-render the 20 known diploma pages; everything else is a 404.
export const dynamicParams = false

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const d = getDiploma(slug)
  if (!d) return {}
  return buildMetadata({
    title: d.titoloSeo,
    description: d.descSeo,
    path: '/diplomi/' + slug,
  })
}

/* ── Helpers ── */
function categoriaLabel(cat: string): string {
  if (cat === 'liceo') return 'Liceo'
  if (cat === 'tecnico') return 'Istituto Tecnico'
  return 'Istituto Professionale'
}

function categoriaEyebrow(cat: string): string {
  return 'Indirizzi · ' + categoriaLabel(cat)
}

function famigliaVal(cat: string): string {
  if (cat === 'liceo') return 'Liceo'
  if (cat === 'tecnico') return 'Tecnico'
  return 'Professionale'
}

/* SVG icons per mat-card style */
const MAT_ICONS: Record<MatArea['style'], React.ReactNode> = {
  scien: (
    <svg viewBox="0 0 24 24">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  umani: (
    <svg viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  lingue: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20" />
    </svg>
  ),
  altro: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.07 7.07l4.24 4.24M1 12h6m10 0h6" />
    </svg>
  ),
}

/* ── Page ── */
export default async function DiplomaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const d = getDiploma(slug)
  if (!d) notFound()

  const eyebrow = categoriaEyebrow(d.categoria)
  const famiglia = famigliaVal(d.categoria)
  // tagline = first sentence of descSeo
  const tagline = d.descSeo.split('.')[0] + '.'

  /* ── JSON-LD: Course + BreadcrumbList ── */
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: d.nome,
    description: d.descSeo,
    inLanguage: 'it',
    url: `${brand.domain}/diplomi/${slug}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: brand.name,
      url: `${brand.domain}/`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${brand.domain}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Diplomi',
        item: `${brand.domain}/diplomi/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: d.nome,
        item: `${brand.domain}/diplomi/${slug}/`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── Hero ── */}
      <section className="ind-hero">
        <div className="wrap">
          <div className="ind-hero-copy">
            <span className="eyebrow-b">{eyebrow}</span>
            <h1>{d.nome}</h1>
            <p className="tagline">{tagline}</p>
            <div className="ind-chips">
              <span>📅 <b>5 anni</b></span>
              <span>🎓 Diploma di Stato riconosciuto</span>
              {d.chips.map((chip, i) => (
                <span key={i} dangerouslySetInnerHTML={{ __html: chip }} />
              ))}
            </div>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="/#lead">Richiedi informazioni</a>
              <Link className="btn btn-out btn-lg" href="/come-funziona">Scopri il metodo</Link>
            </div>
          </div>
          <div className="ind-photo">
            <Image
              src={d.heroImgSrc}
              alt={d.nome}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <span className="tag-ind">{d.nome}</span>
            <div className="info-overlay">
              <div>
                <div className="lbl">Famiglia</div>
                <div className="val">{famiglia}</div>
              </div>
              <div>
                <div className="lbl">Durata</div>
                <div className="val">5 anni</div>
              </div>
              <div>
                <div className="lbl">Materie cardine</div>
                <div className="val">{d.materiCardine}</div>
              </div>
              <div>
                <div className="lbl">Dopo</div>
                <div className="val">{d.dopoVal}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cosa imparerai ── */}
      <section className="ind-section">
        <div className="wrap">
          <div className="ind-split">
            <div className="ind-split-text">
              <span className="eyebrow-b">Cosa imparerai</span>
              <h3>
                {d.nome}:{' '}
                <span className="hl">{tagline.replace(/\.$/, '')}</span>
              </h3>
              <p dangerouslySetInnerHTML={{ __html: d.descP1 }} />
              <p dangerouslySetInnerHTML={{ __html: d.descP2 }} />
            </div>
            <div className="ind-split-photo">
              <Image
                src={d.splitPhotoSrc}
                alt={d.splitPhotoAlt}
                fill
                style={{ objectFit: 'cover' }}
              />
              <span className="ph-cap">{d.splitPhotoCap}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Materie ── */}
      <section className="ind-section alt">
        <div className="wrap">
          <div className="ind-section-head">
            <span className="eyebrow-b">Cosa studierai</span>
            <h2>
              Quattro aree, <span className="hl">tutte le materie del percorso</span>.
            </h2>
            <p>
              Tutte le materie sono presenti per i 5 anni del percorso. Le trovi raggruppate per
              area di competenza, così vedi subito dove sta il cuore di questo indirizzo.
            </p>
          </div>
          <div className="ind-mat">
            {d.matAreas.map((area, i) => (
              <div key={i} className={`ind-mat-card ${area.style}`}>
                <span className="icbox">{MAT_ICONS[area.style]}</span>
                <div className="mbody">
                  <h3>{area.title}</h3>
                  <div className="sub">{area.sub}</div>
                  <p>{area.desc}</p>
                  <ul>
                    {area.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dopo il diploma ── */}
      <section className="ind-section">
        <div className="wrap">
          <div className="ind-split reverse">
            <div className="ind-split-text">
              <span className="eyebrow-b">Dopo il diploma</span>
              <h3>
                Quale lavoro potrai svolgere <span className="hl">dopo il diploma</span>.
              </h3>
              <p dangerouslySetInnerHTML={{ __html: d.dopoP1 }} />
              <p dangerouslySetInnerHTML={{ __html: d.dopoP2 }} />
            </div>
            <div className="ind-split-photo">
              <Image
                src={d.dopoPhotoSrc}
                alt={d.dopoPhotoAlt}
                fill
                style={{ objectFit: 'cover' }}
              />
              <span className="ph-cap">{d.dopoPhotoCap}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Galleria sbocchi ── */}
      <section className="ind-section alt">
        <div className="wrap">
          <div className="ind-section-head">
            <span className="eyebrow-b">Dove arriverai</span>
            <h2>
              Le porte che <span className="hl">si aprono dopo</span>.
            </h2>
          </div>
          <div className="ind-gallery">
            {d.gallery.map((g, i) => (
              <div key={i} className="ind-gc">
                <Image src={g.imgSrc} alt={g.alt} fill style={{ objectFit: 'cover' }} />
                <div className="ovr">
                  <div className="lbl">{g.lbl}</div>
                  <div className="nm">{g.nm}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="ind-uni">
            <h3>Con il Diploma {d.nome} potrai:</h3>
            <ul>
              <li>
                accedere a <strong>tutte le facoltà universitarie</strong>
              </li>
              <li>
                accedere alle{' '}
                <strong>scuole di istruzione e formazione tecnica superiore</strong> (ITS Academy)
              </li>
              <li>
                accedere a corsi di <strong>formazione professionale post diploma</strong>
              </li>
              <li>
                partecipare a <strong>concorsi pubblici</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ind-section">
        <div className="wrap">
          <div className="ind-cta-photo">
            <Image
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1400&q=80"
              alt="Diploma in mano"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="cta-inner" id="lead">
              <h2>Vuoi recuperare il {d.nome}?</h2>
              <p>
                Parla con una coordinatrice del percorso: consulenza gratuita, senza impegno. Ti
                diciamo in chiaro quanti anni puoi recuperare, in quanto tempo e a che costo.
              </p>
              <div className="actions">
                <LeadForm origine="vetrina" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
