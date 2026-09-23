import { aliases, sections, themeUsage, type Locale, type Section } from '../lib/commands';
import { copy } from '../lib/i18n';
import { profile } from '../lib/profile';
import { biography, certificates, projectLinks, skills, tools } from '../lib/biography';
import type { Certificate } from '../lib/credentials';
import GithubPanel from './GithubPanel';
import styles from './Terminal.module.css';

function CredentialList({ locale, items = certificates, related = false }: { locale: Locale; items?: Certificate[]; related?: boolean }) {
  const t = copy[locale];
  return <section className={styles.credentials}>
    <div className={styles.credentialHeading}><div><span className={styles.kicker}>{t.learningLabel}</span><h3>{related ? t.relatedLearning : biography[locale].certificatesLabel}</h3></div><span className={styles.countBadge}>{String(items.length).padStart(2, '0')}</span></div>
    {!related && <p>{t.credentialsIntro}</p>}
    <ul className={styles.credentialGrid}>{items.map(certificate => <li key={certificate.href}>
      <a data-credential href={certificate.href} target="_blank" rel="noopener noreferrer">
        <span className={styles.credentialTop}><span className={styles.issuerMark} aria-hidden="true">{certificate.issuer.slice(0, 2).toUpperCase()}</span><span>{certificate.issuer}</span><span className={styles.externalArrow} aria-hidden="true">↗</span></span>
        <strong>{certificate.name}</strong><span className={styles.credentialAction}>{t.viewCredential}<span aria-hidden="true"> ⤴</span></span>
      </a>
    </li>)}</ul>
  </section>;
}

function ProjectArtwork({ kind, label }: { kind: 'quality' | 'patient'; label: string }) {
  return <div className={styles.projectArtwork} data-project={kind} aria-hidden="true">
    <span className={styles.artworkLabel}>{kind === 'quality' ? 'QP / INTELLIGENCE' : 'VP / HEALTHCARE'}</span>
    {kind === 'quality' ? <svg viewBox="0 0 420 200" fill="none">
      <path className={styles.artworkTrace} d="M46 100H115M155 100H215M255 100H292V45H343M292 100H343M292 100V155H343" />
      <rect x="28" y="82" width="36" height="36" rx="8" /><path d="M39 94H53M39 101H49M39 108H53" />
      <rect x="110" y="75" width="50" height="50" rx="12" /><path d="M122 109V96H129V103H136V90H146" />
      <rect className={styles.artworkCore} x="205" y="70" width="60" height="60" rx="16" /><path d="M224 87H244V97H224ZM235 97V111M225 111H245M225 111V117M245 111V117" />
      <circle cx="356" cy="45" r="15" /><circle cx="356" cy="100" r="15" /><circle cx="356" cy="155" r="15" />
      <path d="M350 45L354 49L362 40M350 100L354 104L362 95M350 155L354 159L362 150" />
      <circle className={styles.artworkPulse} cx="185" cy="100" r="3" />
    </svg> : <svg viewBox="0 0 420 200" fill="none">
      <rect x="142" y="16" width="120" height="170" rx="18" /><path d="M179 27H225" />
      <rect className={styles.artworkCore} x="171" y="47" width="62" height="55" rx="12" /><path d="M197 61H207V70H216V80H207V89H197V80H188V70H197Z" />
      <path className={styles.artworkTrace} d="M72 133H140L152 121L167 149L184 114L198 136H249L261 124L278 141L288 133H346" />
      <path d="M183 168H220M94 58H120M107 45V71M306 70H328M317 59V81" />
      <circle cx="82" cy="133" r="5" /><circle cx="340" cy="133" r="5" />
    </svg>}
    <span className={styles.artworkCaption}>{label}</span>
  </div>;
}

export default function Content({ section, locale, inResume = false }: { section: Section; locale: Locale; inResume?: boolean }) {
  const t = copy[locale];
  const bio = biography[locale];
  const stats = [
    { value: bio.experience.length, label: bio.statsLabels.employers },
    { value: certificates.length, label: bio.statsLabels.certificates },
    { value: 2, label: bio.statsLabels.projects },
    { value: '3.70', label: bio.statsLabels.gpa },
  ];
  return <div className={styles.content}>
    <h2>{t.labels[section]}<span className={styles.headingDot} aria-hidden="true">.</span></h2>
    {section === 'help' ? <>
      <p>{t.help}</p>
      <dl className={styles.help}>
        {sections.map(id => <div key={id}><dt><code>{id}</code></dt><dd>{t.labels[id]} <span className={styles.aliases}>{aliases[id].join(' / ')}</span></dd></div>)}
        <div><dt><code>clear</code></dt><dd>{t.clear}</dd></div>
        <div><dt><code>{themeUsage}</code></dt><dd>{t.themeHelp}</dd></div>
        <div><dt><code>lang [tr|en|de]</code></dt><dd>{t.langHelp}</dd></div>
      </dl>
      <p>{t.keyboard}</p>
    </> : section === 'about' ? <>
      <p className={styles.identity}>{profile.name} <span>— {profile.title}</span></p>
      <p>{bio.intro}</p><p>{bio.about}</p><p>{profile.location}</p>
      <h3>{bio.educationLabel}</h3><p>{bio.education}</p><p>{bio.community}</p>
      <h3>{bio.awardsLabel}</h3><p>{bio.award}</p>
    </> : section === 'experience' ? <>
      <p className={styles.sectionIntro}>{t.experienceIntro}</p>
      <div className={styles.timeline}>{bio.experience.map((job, index) => <article className={styles.experienceItem} key={job.company}>
        <div className={styles.jobHeader}><span className={styles.companyMark} aria-hidden="true">{['G', 'F', 'B'][index]}</span><div><span className={styles.jobPeriod}>{job.period} · {job.location}</span><h3>{job.company}</h3><p className={styles.identity}>{job.role}</p></div><span className={styles.jobIndex} aria-hidden="true">0{index + 1}</span></div>
        <ul>{job.details.slice(0, 3).map(detail => <li key={detail}>{detail}</li>)}</ul>
        {job.details.length > 3 && <details className={styles.disclosure}>
          <summary>{bio.moreExperience}<span aria-hidden="true"> +</span></summary>
          <ul>{job.details.slice(3).map(detail => <li key={detail}>{detail}</li>)}</ul>
        </details>}
      </article>)}</div>
      {!inResume && <CredentialList locale={locale} related items={certificates.filter(item => item.category === 'engineering' || item.category === 'cloud')} />}
    </> : section === 'skills' ? <>
      <p className={styles.sectionIntro}>{t.skillsIntro}</p>
      <div className={styles.skillGroups}>
        {Object.entries(skills).map(([label, value], index) => <div key={label} className={styles.skillGroup}><span className={styles.skillSymbol} aria-hidden="true">{index ? '{ }' : '</>'}</span><h3>{label}</h3><div className={styles.tags}>{value.split(', ').map(skill => <span key={skill}>{skill}</span>)}</div></div>)}
        <div className={styles.skillGroup}><span className={styles.skillSymbol} aria-hidden="true">⌘</span><h3>{bio.toolsLabel}</h3><div className={styles.tags}>{tools.split(', ').map(tool => <span key={tool}>{tool}</span>)}</div></div>
      </div>
      <div className={styles.skillNotes}><div><h3>{bio.interpersonalLabel}</h3><p>{bio.interpersonal}</p></div><div><h3>{bio.languagesLabel}</h3><p>{bio.languages}</p><h3>{bio.otherLabel}</h3><p>{bio.other}</p></div></div>
      <CredentialList locale={locale} />
    </> : section === 'projects' ? <>
      <p className={styles.sectionIntro}>{bio.projectsIntro}</p>
      <div className={styles.projectArchive}><span>{t.projectArchive}</span><span aria-hidden="true">↙</span></div>
      <div className={styles.projects}>
        <article><ProjectArtwork kind="quality" label={t.conceptVisual} /><div className={styles.projectBody}>
          <div className={styles.caseMeta}><span>01 / QUALITY POOL</span><span>TÜBİTAK 2209-B</span></div><h3>Quality Pool</h3>
          <p>{bio.qualityPool}</p><div className={styles.tags}>{bio.projectTags.qualityPool.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div></article>
        <article><ProjectArtwork kind="patient" label={t.conceptVisual} /><div className={styles.projectBody}>
          <div className={styles.caseMeta}><span>02 / VIRTUAL PATIENT</span><span>ESOGÜ</span></div><h3>Virtual Patient</h3>
          <p>{bio.virtualPatient}</p><div className={styles.tags}>{bio.projectTags.virtualPatient.map(tag => <span key={tag}>{tag}</span>)}</div>
          <div className={styles.projectLinks}>{projectLinks.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}</div>
        </div></article>
      </div>
      {!inResume && <CredentialList locale={locale} related items={certificates.filter(item => item.category === 'engineering' || item.category === 'ai')} />}
    </> : section === 'github' ? <>
      <p className={styles.sectionIntro}>{bio.githubIntro}</p>
      <GithubPanel locale={locale} />
      <div className={styles.projectLinks}>
        <a href={profile.github}>GitHub · Tzesh</a>
        {projectLinks.filter(link => link.href.startsWith('https://github.com/')).map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
      </div>
    </> : section === 'stats' ? <>
      <p className={styles.sectionIntro}>{bio.statsIntro}</p>
      <dl className={styles.metrics}>{stats.map(stat => <div className={styles.metric} key={stat.label}>
        <dt>{stat.label}</dt><dd>{stat.value}</dd>
      </div>)}</dl>
    </> : section === 'contact' ? <>
      <p>{profile.location}</p><ul>
        <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
        <li><a href={profile.website}>ugurdindar.com</a></li>
        <li><a href={profile.linkedin}>LinkedIn</a></li>
        <li><a href={profile.github}>GitHub · Tzesh</a></li>
      </ul>
    </> : section === 'resume' ? <>
      <p>{bio.resumeNote}</p><a className={styles.resumeDownload} href={profile.resumePdf} download>{bio.pdfLabel}<span aria-hidden="true"> ↓</span></a>
      {(['about', 'experience', 'skills', 'projects', 'contact'] as const).map(id => <Content key={id} section={id} locale={locale} inResume />)}
    </> : <p>{t.unavailable}</p>}
  </div>;
}
