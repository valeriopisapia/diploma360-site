const PARTNERS = [
  { src: '/assets-vetrina/partner/cdp.png', alt: 'CDP' },
  { src: '/assets-vetrina/partner/coop.png', alt: 'Coop' },
  { src: '/assets-vetrina/partner/edenred.png', alt: 'Edenred' },
  { src: '/assets-vetrina/partner/edison.png', alt: 'Edison' },
  { src: '/assets-vetrina/partner/epassi.png', alt: 'Epassi' },
  { src: '/assets-vetrina/partner/jointly.png', alt: 'Jointly' },
  { src: '/assets-vetrina/partner/marsh.png', alt: 'Marsh' },
  { src: '/assets-vetrina/partner/nana_bianca.png', alt: 'Nana Bianca' },
]

export function PartnerCarousel() {
  return (
    <section className="partner-mq" aria-label="Partner">
      <div className="wrap">
        <p className="lead">Aziende e realtà che collaborano con noi</p>
        <div className="marquee">
          <div className="marquee-track">
            {PARTNERS.map(p => (
              <img
                key={p.alt}
                className="p-logo"
                src={p.src}
                alt={p.alt}
                loading="lazy"
                width={600}
                height={300}
              />
            ))}
            {PARTNERS.map(p => (
              <img
                key={`${p.alt}-dup`}
                className="p-logo"
                src={p.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                width={600}
                height={300}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
