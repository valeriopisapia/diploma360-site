import './home-schoolr.css'
import Image from 'next/image'
import { brand } from '@/lib/brand'

/**
 * HomeSchoolr — Schoolr → LaScuola360 rebrand-announcement landing, ported 1:1 from
 * `materiale/consegna-valerio/Schoolr Rebrand.dc.html`. Self-contained: own header/footer
 * (site chrome is hidden for the schoolr brand by ChromeGate), no lead form — every CTA
 * routes to lascuola360.it or the shared phone/WhatsApp contacts. The source is
 * inline-style-based, so the port keeps styles inline (React `style={{…}}` objects); the
 * only bespoke CSS lives in `home-schoolr.css` (responsive rules + the `.sr-logo-word`
 * wordmark that replaces the missing `logo-schoolr.png`).
 */

const CheckGreen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2.5} style={{ width: 15, height: 15 }}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const CheckCurrent = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} style={{ width: 15, height: 15 }}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const PhoneIcon = () => (
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
)

const WhatsAppPath = () => (
  <path d="M17.5 14.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.64.72.23 1.38.2 1.9.12.58-.09 1.75-.72 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35z" />
)

export function HomeSchoolr() {
  return (
    <div
      style={{
        fontFamily: "'Inter',sans-serif",
        color: '#1F1F1F',
        fontSize: '15.5px',
        lineHeight: 1.6,
        WebkitFontSmoothing: 'antialiased',
        background:
          'radial-gradient(1200px circle at 96% -8%, rgba(236,137,192,0.26), transparent 46%),radial-gradient(1000px circle at -6% 10%, rgba(228,130,103,0.20), transparent 42%),radial-gradient(950px circle at 55% 128%, rgba(236,137,192,0.12), transparent 52%),#FFF1EA',
        minHeight: '100vh',
      }}
    >
      {/* ============ HEADER ============ */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 66,
          background: 'rgba(255,255,255,.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #ECE6E0',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="sr-header-inner"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div className="sr-hd-logos" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span className="sr-logo-word" style={{ fontSize: 26 }}>
              Schoolr
            </span>
            <svg
              className="sr-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C7B7AD"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 16, height: 16 }}
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
            <img
              src="/schoolr/logo-lascuola360.svg"
              alt="LaScuola360"
              width={130}
              height={26}
              style={{ height: 26, width: 'auto', display: 'block' }}
            />
          </div>
          <div className="sr-hd-right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href={brand.contacts.telHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                color: '#1F1F1F',
                textDecoration: 'none',
                fontFamily: "'Inter',sans-serif",
                fontWeight: 700,
                fontSize: '13.5px',
                whiteSpace: 'nowrap',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C7674E"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 16, height: 16 }}
              >
                <PhoneIcon />
              </svg>
              <span className="sr-lbl">{brand.contacts.telDisplay}</span>
            </a>
            <a
              href={brand.contacts.whatsappUrl}
              aria-label="WhatsApp"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                color: '#128C4B',
                textDecoration: 'none',
                fontFamily: "'Inter',sans-serif",
                fontWeight: 700,
                fontSize: '13.5px',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: '#25D366',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 24 24" fill="#fff" style={{ width: 16, height: 16 }}>
                  <WhatsAppPath />
                </svg>
              </span>
              <span className="sr-lbl">WhatsApp</span>
            </a>
            <a
              href="https://www.lascuola360.it/"
              className="sr-cta-hd"
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 600,
                fontSize: '13.5px',
                color: '#fff',
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                textDecoration: 'none',
                padding: '11px 22px',
                borderRadius: 999,
                boxShadow: '0 4px 12px rgba(228,130,103,.32)',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="sr-cta-full">Vai a LaScuola360 →</span>
              <span className="sr-cta-short">Entra →</span>
            </a>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="sr-section" style={{ maxWidth: 1180, margin: '0 auto', padding: '70px 32px 20px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <div
            className="sr-hero-logos"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, marginBottom: 38 }}
          >
            <span className="sr-logo-word sr-l1" style={{ fontSize: 42 }}>
              Schoolr
            </span>
            <svg
              className="sr-transit sr-arrow2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C7674E"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 34, height: 34, flexShrink: 0 }}
            >
              <line x1="4" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
            <img
              src="/schoolr/logo-lascuola360.svg"
              alt="LaScuola360"
              className="sr-l2"
              width={150}
              height={44}
              style={{ height: 44, width: 'auto', display: 'block' }}
            />
          </div>

          <h1
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(38px,5.6vw,58px)',
              lineHeight: 1.03,
              letterSpacing: '-.03em',
              margin: '0 0 22px',
            }}
          >
            Siamo sempre noi.
            <br />
            Ora ci chiamiamo{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              LaScuola360
            </span>
            .
          </h1>
          <p style={{ fontSize: 19, color: '#5A626D', lineHeight: 1.6, margin: '0 auto 34px', maxWidth: 600 }}>
            Le ripetizioni che conosci non vanno da nessuna parte:{' '}
            <strong style={{ color: '#1F1F1F', fontWeight: 700 }}>
              diventano parte di qualcosa di più grande
            </strong>
            . Da oggi siamo una vera scuola online — un unico posto per ripetizioni, diploma e strumenti di
            studio.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
              <a
                href="https://www.lascuola360.it/ripetizioni"
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  color: '#fff',
                  background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                  textDecoration: 'none',
                  padding: '16px 32px',
                  borderRadius: 999,
                  boxShadow: '0 10px 28px rgba(228,130,103,.34)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                Entra in LaScuola360 <span style={{ fontSize: 18 }}>→</span>
              </a>
              <a
                href="https://app.schoolr.net/"
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  color: '#C7674E',
                  background: '#fff',
                  border: '1.5px solid #E4C3B6',
                  textDecoration: 'none',
                  padding: '14.5px 30.5px',
                  borderRadius: 999,
                  boxShadow: '0 6px 18px rgba(228,130,103,.12)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 18, height: 18 }}
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Accedi
              </a>
            </div>
            <span style={{ fontSize: 14, color: '#5A626D' }}>
              Il tuo account resta lo stesso: accedi come hai sempre fatto.
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px 12px',
              marginTop: 42,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                background: '#fff',
                border: '1px solid #D9D2CC',
                padding: '8px 15px',
                borderRadius: 99,
              }}
            >
              <CheckGreen />
              Stesso team e tutor
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                background: '#fff',
                border: '1px solid #D9D2CC',
                padding: '8px 15px',
                borderRadius: 99,
              }}
            >
              <CheckGreen />
              Stesso account e credenziali
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                background: '#fff',
                border: '1px solid #D9D2CC',
                padding: '8px 15px',
                borderRadius: 99,
              }}
            >
              <CheckGreen />
              Ripetizioni invariate
            </span>
          </div>
        </div>
      </section>

      {/* ============ TRUST STATS ============ */}
      <section className="sr-section" style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 32px 20px' }}>
        <div
          className="sr-4stat"
          style={{
            background: '#fff',
            border: '1px solid #ECE6E0',
            borderRadius: 24,
            padding: '36px 32px',
            boxShadow: '0 1px 2px rgba(91,55,40,.05),0 8px 24px rgba(91,55,40,.07)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 20,
          }}
        >
          <div style={{ textAlign: 'center', padding: '0 10px' }}>
            <div
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 800,
                fontSize: 40,
                lineHeight: 1,
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              +20.000
            </div>
            <div style={{ fontSize: '13.5px', color: '#5A626D', marginTop: 9 }}>studenti seguiti</div>
          </div>
          <div style={{ textAlign: 'center', padding: '0 10px', borderLeft: '1px solid #ECE6E0' }}>
            <div
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 800,
                fontSize: 40,
                lineHeight: 1,
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              +3.000
            </div>
            <div style={{ fontSize: '13.5px', color: '#5A626D', marginTop: 9 }}>tutor qualificati</div>
          </div>
          <div style={{ textAlign: 'center', padding: '0 10px', borderLeft: '1px solid #ECE6E0' }}>
            <div
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 800,
                fontSize: 40,
                lineHeight: 1,
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              1.500
            </div>
            <div style={{ fontSize: '13.5px', color: '#5A626D', marginTop: 9 }}>materie disponibili</div>
          </div>
          <div style={{ textAlign: 'center', padding: '0 10px', borderLeft: '1px solid #ECE6E0' }}>
            <div
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 800,
                fontSize: 40,
                lineHeight: 1,
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              4,7<span style={{ fontSize: 22 }}>/5</span>
            </div>
            <div style={{ fontSize: '13.5px', color: '#5A626D', marginTop: 9 }}>su Trustpilot</div>
          </div>
        </div>
      </section>

      {/* ============ PERCHÉ ============ */}
      <section className="sr-section" style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 32px' }}>
        <div
          style={{
            background: '#fff',
            border: '1px solid #ECE6E0',
            borderRadius: 24,
            padding: '52px 48px',
            boxShadow: '0 1px 2px rgba(91,55,40,.04),0 10px 30px rgba(91,55,40,.06)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              fontFamily: "'Poppins',sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: '#C7674E',
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
              }}
            />
            Perché abbiamo cambiato nome
          </div>
          <h2
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 800,
              fontSize: 34,
              lineHeight: 1.14,
              letterSpacing: '-.02em',
              margin: '0 auto 18px',
              maxWidth: '22ch',
            }}
          >
            Da un servizio di ripetizioni a una{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              vera scuola online
            </span>
            .
          </h2>
          <p style={{ fontSize: 17, color: '#5A626D', lineHeight: 1.68, margin: '0 auto', maxWidth: '66ch' }}>
            In questi anni Schoolr ha aiutato oltre 20.000 studenti a superare le proprie insufficienze. Ma i
            nostri studenti ci chiedevano di più: non solo una mano su una materia, ma un percorso completo.
            Così abbiamo unito le nostre due anime — le ripetizioni di Schoolr e il diploma online — sotto un
            solo nome: <strong style={{ color: '#1F1F1F', fontWeight: 700 }}>LaScuola360</strong>. Un unico
            posto, un unico account, un intero percorso di studio.
          </p>
        </div>
      </section>

      {/* ============ COSA RESTA UGUALE ============ */}
      <section className="sr-section" style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 32px 34px' }}>
        <div style={{ textAlign: 'center', maxWidth: '60ch', margin: '0 auto 36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#2A8E64',
              fontFamily: "'Poppins',sans-serif",
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            <CheckCurrent />
            Nulla di cui preoccuparsi
          </div>
          <h2
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 800,
              fontSize: 32,
              lineHeight: 1.14,
              letterSpacing: '-.02em',
              margin: 0,
            }}
          >
            Cambia il nome. <span style={{ color: '#C7674E' }}>Resta tutto il resto.</span>
          </h2>
        </div>
        <div className="sr-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ECE6E0',
              borderRadius: 20,
              padding: 30,
              boxShadow: '0 1px 2px rgba(91,55,40,.04),0 2px 8px rgba(91,55,40,.05)',
            }}
          >
            <span
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: '#FCE6DE',
                color: '#C7674E',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 18,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 24, height: 24 }}
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: '18.5px', fontWeight: 700, margin: '0 0 8px' }}>
              Lo stesso team e gli stessi tutor
            </h3>
            <p style={{ fontSize: '14.5px', color: '#5A626D', lineHeight: 1.58, margin: 0 }}>
              Le persone dietro Schoolr sono le stesse di LaScuola360. I nostri +3.000 tutor qualificati
              continuano a seguirti come prima.
            </p>
          </div>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ECE6E0',
              borderRadius: 20,
              padding: 30,
              boxShadow: '0 1px 2px rgba(91,55,40,.04),0 2px 8px rgba(91,55,40,.05)',
            }}
          >
            <span
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: '#F8DDE7',
                color: '#A8366D',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 18,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 24, height: 24 }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: '18.5px', fontWeight: 700, margin: '0 0 8px' }}>
              Il tuo account resta valido
            </h3>
            <p style={{ fontSize: '14.5px', color: '#5A626D', lineHeight: 1.58, margin: 0 }}>
              Stesse credenziali, stesso storico lezioni, stessi tutor preferiti. Accedi con l&apos;email di
              sempre — non devi rifare nulla.
            </p>
          </div>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ECE6E0',
              borderRadius: 20,
              padding: 30,
              boxShadow: '0 1px 2px rgba(91,55,40,.04),0 2px 8px rgba(91,55,40,.05)',
            }}
          >
            <span
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                background: '#FCE6DE',
                color: '#C7674E',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 18,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 24, height: 24 }}
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </span>
            <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: '18.5px', fontWeight: 700, margin: '0 0 8px' }}>
              Le ripetizioni non cambiano
            </h3>
            <p style={{ fontSize: '14.5px', color: '#5A626D', lineHeight: 1.58, margin: 0 }}>
              Stesse materie, stessa aula virtuale, stessi prezzi. Il servizio che conosci continua identico —
              semplicemente dentro LaScuola360.
            </p>
          </div>
        </div>
      </section>

      {/* ============ NOVITÀ · DIPLOMA ============ */}
      <section className="sr-section" style={{ maxWidth: 1180, margin: '0 auto', padding: '50px 32px 30px' }}>
        <div
          className="sr-2col"
          style={{ display: 'grid', gridTemplateColumns: '1.02fr .98fr', gap: 52, alignItems: 'center' }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: 26,
                overflow: 'hidden',
                boxShadow: '0 16px 50px rgba(91,55,40,.16)',
                aspectRatio: '4/3.4',
              }}
            >
              <Image
                src="/schoolr/studentessa.jpg"
                alt="Studentessa LaScuola360"
                width={720}
                height={612}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            <div
              className="sr-hide-sm"
              style={{
                position: 'absolute',
                right: -16,
                bottom: 32,
                background: '#fff',
                borderRadius: 14,
                padding: '14px 18px',
                boxShadow: '0 12px 40px rgba(91,55,40,.16)',
                border: '1px solid #ECE6E0',
              }}
            >
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 800,
                  fontSize: 28,
                  lineHeight: 1,
                  background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                97%
              </div>
              <div style={{ fontSize: 12, color: '#5A626D', marginTop: 4 }}>promossi all&apos;esame</div>
            </div>
          </div>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                color: '#fff',
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                padding: '6px 14px',
                borderRadius: 999,
                marginBottom: 20,
              }}
            >
              Novità con LaScuola360
            </div>
            <h2
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 800,
                fontSize: 36,
                lineHeight: 1.12,
                letterSpacing: '-.025em',
                margin: '0 0 16px',
              }}
            >
              Ora puoi arrivare fino al{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Diploma di Stato
              </span>
              .
            </h2>
            <p style={{ fontSize: '16.5px', color: '#5A626D', lineHeight: 1.65, margin: '0 0 24px', maxWidth: '48ch' }}>
              Oltre alle ripetizioni, con LaScuola360 recuperi gli anni persi e ottieni un diploma riconosciuto
              a tutti gli effetti di legge. Un percorso completo, con tutor reali e un coordinatore che ti
              segue fino all&apos;esame.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: '#FCE6DE',
                    color: '#C7674E',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <CheckCurrent />
                </span>
                <div>
                  <strong style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '15.5px' }}>
                    Recupero di più anni in uno
                  </strong>
                  <div style={{ fontSize: 14, color: '#5A626D' }}>
                    Torni in pari e recuperi il tempo perso, al tuo ritmo.
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: '#FCE6DE',
                    color: '#C7674E',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <CheckCurrent />
                </span>
                <div>
                  <strong style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '15.5px' }}>
                    Diploma di Stato riconosciuto
                  </strong>
                  <div style={{ fontSize: 14, color: '#5A626D' }}>Sedi d&apos;esame convenzionate in tutta Italia.</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: '#FCE6DE',
                    color: '#C7674E',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <CheckCurrent />
                </span>
                <div>
                  <strong style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '15.5px' }}>
                    Tutor per materia + coordinatore
                  </strong>
                  <div style={{ fontSize: 14, color: '#5A626D' }}>Non sei mai solo: qualcuno tiene la rotta con te.</div>
                </div>
              </div>
            </div>
            <a
              href="https://www.lascuola360.it/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 600,
                fontSize: '15.5px',
                color: '#C7674E',
                textDecoration: 'none',
              }}
            >
              Scopri il percorso Diploma{' '}
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: '#FCE6DE',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ============ NOVITÀ · STRUMENTI ============ */}
      <section className="sr-section" style={{ maxWidth: 1180, margin: '0 auto', padding: '50px 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: '64ch', margin: '0 auto 40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '11.5px',
              fontWeight: 700,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: '#A8366D',
              background: '#FBE6F2',
              padding: '6px 14px',
              borderRadius: 999,
              marginBottom: 16,
            }}
          >
            Novità con LaScuola360
          </div>
          <h2
            style={{
              fontFamily: "'Poppins',sans-serif",
              fontWeight: 800,
              fontSize: 34,
              lineHeight: 1.14,
              letterSpacing: '-.02em',
              margin: '0 auto 16px',
              maxWidth: '22ch',
            }}
          >
            Da ogni lezione,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              4 strumenti per ripassare
            </span>
            .
          </h2>
          <p style={{ fontSize: '16.5px', color: '#5A626D', lineHeight: 1.62, margin: '0 auto', maxWidth: '60ch' }}>
            Appena finisce la lezione hai già pronti riassunto, podcast, quiz e flashcard. Niente appunti da
            riscrivere, niente materiale da preparare — tutto già al tuo posto.
          </p>
        </div>

        {/* feature: quiz screenshot + text */}
        <div
          className="sr-2col"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr .85fr',
            gap: 44,
            alignItems: 'center',
            marginBottom: 26,
          }}
        >
          <div
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 16px 46px rgba(91,55,40,.16)',
              border: '1px solid #ECE6E0',
              background: '#fff',
            }}
          >
            <div
              style={{
                height: 32,
                background: '#F3EEE9',
                borderBottom: '1px solid #ECE6E0',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 14px',
              }}
            >
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#E48267' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#E6C34D' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#9CCB7A' }} />
            </div>
            <Image
              src="/schoolr/mock-quiz.png"
              alt="Quiz LaScuola360"
              width={720}
              height={480}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: '#993C1D',
                marginBottom: 10,
              }}
            >
              Quiz
            </div>
            <h3
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 800,
                fontSize: 26,
                lineHeight: 1.2,
                letterSpacing: '-.01em',
                margin: '0 0 12px',
              }}
            >
              Ti verifichi prima della verifica.
            </h3>
            <p style={{ fontSize: '15.5px', color: '#5A626D', lineHeight: 1.62, margin: 0 }}>
              Domande generate sui punti chiave della lezione. Scopri cosa hai capito davvero e dove tornare a
              ripassare, prima che sia troppo tardi.
            </p>
          </div>
        </div>

        {/* row: podcast + flashcard + riassunto */}
        <div className="sr-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ECE6E0',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 1px 2px rgba(91,55,40,.04),0 4px 14px rgba(91,55,40,.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Image
              src="/schoolr/mock-podcast.png"
              alt="Podcast della lezione"
              width={520}
              height={360}
              style={{ width: '100%', height: 'auto', display: 'block', borderBottom: '1px solid #F0E4DC' }}
            />
            <div style={{ padding: '22px 24px 24px' }}>
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#A8366D',
                  marginBottom: 8,
                }}
              >
                Podcast
              </div>
              <h3
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  lineHeight: 1.28,
                  margin: '0 0 7px',
                }}
              >
                Riascolti la lezione mentre cammini.
              </h3>
              <p style={{ fontSize: 14, color: '#5A626D', lineHeight: 1.55, margin: 0 }}>
                Versione audio con voce naturale, perfetta per i tempi morti.
              </p>
            </div>
          </div>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ECE6E0',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 1px 2px rgba(91,55,40,.04),0 4px 14px rgba(91,55,40,.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Image
              src="/schoolr/mock-flashcard.png"
              alt="Flashcard di ripasso"
              width={520}
              height={360}
              style={{ width: '100%', height: 'auto', display: 'block', borderBottom: '1px solid #F0E4DC' }}
            />
            <div style={{ padding: '22px 24px 24px' }}>
              <div
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: '#993C1D',
                  marginBottom: 8,
                }}
              >
                Flashcard
              </div>
              <h3
                style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  lineHeight: 1.28,
                  margin: '0 0 7px',
                }}
              >
                I concetti chiave in 5 minuti al giorno.
              </h3>
              <p style={{ fontSize: 14, color: '#5A626D', lineHeight: 1.55, margin: 0 }}>
                Carte con domanda e risposta a ripetizione spaziata, già pronte.
              </p>
            </div>
          </div>
          <div
            style={{
              background: 'linear-gradient(180deg,#FBD9C2,#FCE6DE)',
              border: '1px solid #FBD9C2',
              borderRadius: 20,
              padding: '26px 26px 28px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              style={{
                width: 48,
                height: 48,
                borderRadius: 13,
                background: '#fff',
                color: '#C7674E',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 16,
                boxShadow: '0 4px 12px rgba(199,103,78,.18)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 23, height: 23 }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="14" y2="17" />
              </svg>
            </span>
            <div
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: '#993C1D',
                marginBottom: 8,
              }}
            >
              Riassunto
            </div>
            <h3
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 700,
                fontSize: 18,
                lineHeight: 1.28,
                margin: '0 0 7px',
                color: '#1F1F1F',
              }}
            >
              Un&apos;ora di lezione, in 3 minuti.
            </h3>
            <p style={{ fontSize: 14, color: '#5A2E1E', lineHeight: 1.55, margin: 0, opacity: 0.85 }}>
              I concetti chiave estratti e ordinati per importanza, pronti da rileggere prima di una verifica.
            </p>
          </div>
        </div>
      </section>

      {/* ============ CONTINUITÀ / TRUST ============ */}
      <section
        className="sr-section"
        style={{
          background: 'linear-gradient(180deg,#fff,#FFF7F1)',
          borderTop: '1px solid rgba(0,0,0,.06)',
          borderBottom: '1px solid rgba(0,0,0,.06)',
          padding: '60px 0',
        }}
      >
        <div
          className="sr-2col"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '0 32px',
            display: 'grid',
            gridTemplateColumns: '1.1fr .9fr',
            gap: 44,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Poppins',sans-serif",
                fontSize: '11.5px',
                fontWeight: 700,
                color: '#C7674E',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#E48267' }} />
              La stessa società di sempre
            </div>
            <h2
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontSize: 28,
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: '-.02em',
                margin: '0 0 14px',
              }}
            >
              Schoolr e LaScuola360 sono <span style={{ color: '#C7674E' }}>lo stesso servizio</span>.
            </h2>
            <p style={{ fontSize: '15.5px', color: '#5A626D', lineHeight: 1.66, margin: 0, maxWidth: '56ch' }}>
              Dietro entrambi c&apos;è <strong style={{ color: '#1F1F1F', fontWeight: 700 }}>Classme S.r.l.</strong>,
              attiva nell&apos;istruzione online dal 2018 — P.IVA 15441141007. La reputazione, le recensioni e la
              fiducia costruite con Schoolr continuano, identiche, con LaScuola360.
            </p>
          </div>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ECE6E0',
              borderRadius: 22,
              padding: '30px 32px',
              boxShadow: '0 1px 2px rgba(91,55,40,.04),0 10px 30px rgba(91,55,40,.08)',
            }}
          >
            <div style={{ color: '#E3A15A', letterSpacing: 2, fontSize: 16, marginBottom: 14 }}>★★★★★</div>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                color: '#1F1F1F',
                margin: '0 0 18px',
                fontFamily: 'Georgia,serif',
                fontStyle: 'italic',
              }}
            >
              Una delle migliori piattaforme per la didattica online. Disponibili, organizzati e con insegnanti
              davvero preparati.
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                paddingTop: 16,
                borderTop: '1px solid #ECE6E0',
              }}
            >
              <Image
                src="/schoolr/testimonial-giulia.jpg"
                alt=""
                width={40}
                height={40}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Recensione verificata</div>
                <div style={{ fontSize: '12.5px', color: '#9CA3AF' }}>Fonte: Trustpilot</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LEAD / CTA ============ */}
      <section
        id="lead"
        className="sr-section"
        style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 32px', scrollMarginTop: 82 }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: "'Poppins',sans-serif",
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                color: '#C7674E',
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                }}
              />
              Inizia da qui
            </div>
            <h2
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 800,
                fontSize: 38,
                lineHeight: 1.1,
                letterSpacing: '-.025em',
                margin: '0 0 16px',
              }}
            >
              Continua a studiare, ora su{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                LaScuola360
              </span>
              .
            </h2>
            <p style={{ fontSize: 17, color: '#5A626D', lineHeight: 1.65, margin: '0 auto 28px', maxWidth: '46ch' }}>
              Stesse persone, stesso account, tanto di più. Entra nella tua area LaScuola360 o contattaci — la
              prima lezione è gratuita e senza impegno.
            </p>
            <a
              href="https://www.lascuola360.it/"
              style={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: 600,
                fontSize: 16,
                color: '#fff',
                background: 'linear-gradient(135deg,#E3815A,#EC89C0)',
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: 999,
                boxShadow: '0 10px 28px rgba(228,130,103,.34)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 30,
              }}
            >
              Vai a LaScuola360 <span style={{ fontSize: 18 }}>→</span>
            </a>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                maxWidth: 340,
                margin: '0 auto',
                textAlign: 'left',
              }}
            >
              <a
                href={brand.contacts.telHref}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 13, textDecoration: 'none', color: '#1F1F1F' }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#FCE6DE',
                    color: '#C7674E',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 20, height: 20 }}
                  >
                    <PhoneIcon />
                  </svg>
                </span>
                <span>
                  <b style={{ display: 'block', fontFamily: "'Poppins',sans-serif", fontSize: 16 }}>
                    {brand.contacts.telDisplay}
                  </b>
                  <span style={{ fontSize: 13, color: '#5A626D' }}>Chiamaci, ti rispondiamo subito</span>
                </span>
              </a>
              <a
                href={brand.contacts.whatsappUrl}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 13, textDecoration: 'none', color: '#1F1F1F' }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#DCFCE7',
                    color: '#15803D',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                    <WhatsAppPath />
                    <path d="M12 2a10 10 0 0 0-8.53 15.24L2 22l4.87-1.28A10 10 0 1 0 12 2zm0 18.13c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-2.9.76.77-2.83-.2-.3A8.13 8.13 0 1 1 12 20.13z" />
                  </svg>
                </span>
                <span>
                  <b style={{ display: 'block', fontFamily: "'Poppins',sans-serif", fontSize: 16 }}>
                    WhatsApp 351 721 4644
                  </b>
                  <span style={{ fontSize: 13, color: '#5A626D' }}>Scrivici quando vuoi</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: '#1F242B', color: '#9AA0A8', padding: '34px 0' }}>
        <div
          className="sr-footer-inner"
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 13,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* La Scuola360 brand mark — reuses the design-system .brand-mark
               (gradient circle) + .brand-name from styles/site.css so it matches
               the La Scuola360 footer logo exactly; forced white on the dark bg. */}
            <span className="brand-mark">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M21 22v-6h-6" />
                <path d="M3 12a9 9 0 0 0 15 6.7L21 16" />
              </svg>
            </span>
            <span className="brand-name" style={{ color: '#fff' }}>
              La Scuola360
            </span>
          </div>
          <div style={{ color: '#80868F' }}>© 2026 Classme S.r.l. · P.IVA 15441141007 · Viale Castrense 5, 00182 Roma</div>
        </div>
      </footer>
    </div>
  )
}
