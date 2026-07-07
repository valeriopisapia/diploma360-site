import { brand } from '@/lib/brand'

export function FaqAccordion() {
  return (
    <div className="faq cols2">
      <details open>
        <summary>
          Come ci si iscrive a {brand.name} e cosa serve?
          <span className="chev">+</span>
        </summary>
        <div className="a">
          <p>
            Per iscriversi, è necessario aver definito il percorso scolastico che si desidera
            seguire e i dettagli da includere nel modulo di iscrizione. Ecco le informazioni
            richieste: Informazioni relative al piano di studi
          </p>
          <ol>
            <li>Indirizzo di studio scelto</li>
            <li>Piano di assistenza allo studio selezionato: Basic, Pro o Max</li>
            <li>
              Seconda lingua straniera prevista dal piano di studi: la prima lingua è sempre
              inglese, la seconda può essere francese o spagnolo
            </li>
            <li>Percorso di studi già effettuato, se sono stati completati anni di scuola superiore</li>
            <li>
              Modalità di recupero e classi da conseguire: ad esempio, recupero classi 1ª+2ª o
              recupero 2ª+3ª+4ª classe
            </li>
          </ol>
          <p>
            <strong>Informazioni personali</strong>
            <br />
            Nome e cognome, recapito telefonico e indirizzo email
          </p>
          <p>
            <strong>Modalità di pagamento:</strong> soluzione unica, rate semestrali o pagamento
            rateale
          </p>
          <p>
            <strong>Indirizzo di residenza</strong>, se diverso da quello riportato sulla carta
            d&apos;identità
          </p>
          <p>
            <strong>Indirizzo e nominativo</strong> per la spedizione del kit didattico, se diverso
            da quello di residenza
          </p>
          <p>
            Eventuali note utili per i tutor e il percorso didattico.
            <br />
            Oltre a queste informazioni, sarà necessario fornire una copia di un documento
            d&apos;identità e il codice fiscale. Questi dettagli permetteranno di completare
            l&apos;iscrizione in modo accurato e veloce, garantendo che tutte le necessità
            dell&apos;alunno siano prese in considerazione.
          </p>
        </div>
      </details>

      <details>
        <summary>
          Cosa succede se mi bocciano?
          <span className="chev">+</span>
        </summary>
        <div className="a">
          <p>
            I percorsi offerti da {brand.name} sono il risultato di anni di esperienza nel settore,
            innovazione continua e un impegno totale per garantire la soddisfazione di tutti a fine
            anno. Tuttavia, può succedere che le cose non vadano per il verso giusto se non si
            seguono i consigli di tutor e docenti, se non ci si affida ai nostri consulenti, se si
            tenta di fare troppo in fretta o se non ci si applica con un minimo di costanza. Le
            scuole che promettono percentuali di promozione del 100% non sono trasparenti e
            probabilmente ti stanno dicendo il falso. Nel 2023/2024, la percentuale nazionale di
            promozioni è stata:
          </p>
          <ul>
            <li>Istituti Tecnici: 79,9%</li>
            <li>Licei: 81,2%</li>
            <li>Istituti Professionali: 79%</li>
            <li>{brand.name}: 97%</li>
          </ul>
          <p>
            Se, per uno dei motivi sopra citati, le cose non dovessero andare come previsto e
            dovesse arrivare una non promozione, offriamo diverse formule e garanzie di qualità a
            seconda del percorso scelto:
          </p>
          <ul>
            <li>
              Con {brand.name} Plus e Max hai la Garanzia PROMOSSO o RIPREPARATO gratuita, ciò
              significa che se dovessi essere bocciato ti riprepariamo gratuitamente e senza nessun
              tipo di spesa extra.
            </li>
            <li>
              Con {brand.name} Basic hai la Garanzia PROMOSSO o RIPREPARATO a soli 500€, ciò
              significa che se dovessi essere bocciato ti riprepariamo con la sola spesa di 500€.
              In questo modo, siamo certi di offrire ai nostri studenti le migliori opportunità
              per completare il loro percorso di studi con successo.
            </li>
          </ul>
        </div>
      </details>

      <details>
        <summary>
          Quale corso di studi scegliere?
          <span className="chev">+</span>
        </summary>
        <div className="a">
          <p>
            Definire il percorso più adatto alle esigenze di ogni studente è un servizio che
            offriamo gratuitamente attraverso la nostra consulenza personalizzata. Se non hai
            ancora prenotato la tua consulenza, fallo subito!
          </p>
          <p>
            La scelta dell&apos;indirizzo scolastico è una parte cruciale di questo processo.
            Livello di difficoltà, attitudini personali, esperienze precedenti e obiettivi del
            diploma sono tutti fattori che consideriamo per aiutarti a fare la scelta migliore.
            Quali sono gli indirizzi di studio disponibili? Non tutti gli indirizzi scolastici
            sono adatti all&apos;insegnamento online, e noi di {brand.name} lo sappiamo bene. Abbiamo
            selezionato percorsi che siano compatibili con le risorse offerte dalla scuola digitale.
            Qui di seguito trovi tutti gli indirizzi disponibili. Cliccando su ciascuno, potrai
            visualizzare una pagina dedicata che contenente un approfondimento del percorso di
            studio scelto:
          </p>
          <p>
            <strong>I licei:</strong>
          </p>
          <p>
            Liceo Scienze Umane (Difficoltà 8/10)
            <br />
            Liceo opzione Economico Sociale (Difficoltà 8/10)
            <br />
            Liceo Linguistico (Difficoltà 9/10)
            <br />
            Liceo Scientifico (Difficoltà 10/10)
            <br />
            Liceo opzione Scienze Applicate (Difficoltà 9/10)
            <br />
            Liceo Sportivo (Difficoltà 7/10)
          </p>
          <p>
            <strong>Gli indirizzi tecnici:</strong>
          </p>
          <p>
            I.T.E. Turistico (Difficoltà 7/10)
            <br />
            I.T.E. AFM Amministrazione Finanza e Marketing (Difficoltà 7/10)
            <br />
            I.T.E. SIA Sistemi Informativi Aziendali (Difficoltà 7/10)
            <br />
            IPSSAS Servizi Sanità e Assistenza Sociale (Difficoltà 6/10)
            <br />
            I.P.S.E.O.A. Enogastronomia e Osp. Alberghiera (Difficoltà 6/10)
            <br />
            I.P.S. Commerciali (Difficoltà 7/10)
          </p>
          <p>
            Tuttavia, ognuno di noi ha predisposizioni naturali verso determinate materie
            (dominanza cerebrale), quindi un percorso apparentemente più difficile potrebbe
            risultare più facile per qualcuno.
          </p>
        </div>
      </details>

      <details>
        <summary>
          Quali sono le sedi in cui svolgerò l&apos;esame?
          <span className="chev">+</span>
        </summary>
        <div className="a">
          <p>
            Il nostro centro studi ha instaurato collaborazioni con numerosi istituti paritari
            presenti in varie regioni del paese.
          </p>
        </div>
      </details>

      <details>
        <summary>
          Il Diploma è valido e riconosciuto?
          <span className="chev">+</span>
        </summary>
        <div className="a">
          <p>
            Assolutamente sì! Al termine del percorso, otterrai un diploma di scuola superiore
            riconosciuto dallo Stato, emesso da una scuola statale secondo le normative vigenti
            sugli esami.
          </p>
          <p>
            <strong>
              Questo titolo di studio è valido per partecipare a tutti i concorsi pubblici in
              Italia
            </strong>
            , iscriversi all&apos;università e per le selezioni lavorative che richiedono un
            diploma di scuola superiore.
          </p>
          <p>
            È fondamentale essere consapevoli del fatto che molte persone sono state truffate da
            istituti poco seri, con diplomi annullati e scuole chiuse, che promettevano percorsi
            troppo facili e a basso costo.
          </p>
          <p>
            Per evitare queste trappole e ottenere il tuo diploma in modo sicuro e affidabile,
            contatta subito uno dei nostri consulenti.
          </p>
        </div>
      </details>

      <details>
        <summary>
          E&apos; possibile diplomarsi in un anno?
          <span className="chev">+</span>
        </summary>
        <div className="a">
          <p>
            Una delle domande che ci viene posta più spesso riguarda la possibilità di sostenere
            l&apos;esame di maturità in anticipo. La risposta è che sì, è possibile, ma non sempre
            è la soluzione più pratica. Non voglio scoraggiarti, ma è importante capire il processo
            e valutare le alternative più sostenibili e intelligenti.
          </p>
          <p>
            Se decidi di affrontare il primo esame di maturità disponibile, dobbiamo presentare la
            tua domanda al provveditorato agli studi della tua Regione. Saranno loro a decidere e
            ad assegnarti a una scuola per sostenere gli esami finali di Stato.
          </p>
          <p>
            A maggio, dovrai presentare, in un&apos;unica sessione d&apos;esame, il programma di
            tutte le materie per gli anni che ti mancano. Questo approccio può essere molto
            impegnativo e stressante.
          </p>
          <p>
            Se qualcuno ti dice che c&apos;è un modo più semplice o veloce, fai attenzione:
            potrebbe non essere sincero o operare illegalmente. Meglio valutare bene e prendere
            decisioni informate. Per un percorso più sicuro e pratico verso il tuo diploma,
            contatta uno dei nostri consulenti. Siamo qui per aiutarti a raggiungere il tuo
            obiettivo in modo efficace e senza complicazioni.
          </p>
        </div>
      </details>

      <details>
        <summary>
          Fino a quando è possibile iscriversi?
          <span className="chev">+</span>
        </summary>
        <div className="a">
          <p>
            Le iscrizioni per il recupero degli anni scolastici e l&apos;ottenimento del Diploma di
            Maturità sono possibili durante tutto l&apos;anno. Tuttavia, i termini di presentazione
            delle domande sono soggetti alle scadenze stabilite dal Ministero per tutte le scuole,
            sia pubbliche che private. Per questo motivo, ti consigliamo di fissare quanto prima un
            incontro informativo gratuito, per poter organizzare al meglio l&apos;iter burocratico
            necessario.
          </p>
        </div>
      </details>

      <details>
        <summary>
          Il Diploma che rilascia {brand.name} è legalmente riconosciuto?
          <span className="chev">+</span>
        </summary>
        <div className="a">
          <p>
            Sì. Collaboriamo unicamente con istituti paritari accreditati dal Ministero della
            Pubblica Istruzione. I Diplomi che questi istituti rilasciano possiedono lo stesso
            valore legale di quelli emessi dalle scuole pubbliche.
          </p>
        </div>
      </details>

      <details>
        <summary>
          Posso iscrivermi all&apos;università con il diploma di {brand.name}?
          <span className="chev">+</span>
        </summary>
        <div className="a">
          <p>
            Sì, poiché i diplomi ottenuti presso istituti paritari accreditati dal Ministero della
            Pubblica Istruzione hanno lo stesso valore legale di quelli rilasciati dalle scuole
            pubbliche. Pertanto, questi diplomi permettono l&apos;accesso all&apos;università e a
            qualsiasi concorso pubblico.
          </p>
        </div>
      </details>
    </div>
  )
}
