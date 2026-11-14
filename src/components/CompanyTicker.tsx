// Companies and clients I've worked with, shown as an infinite scrolling strip
// along the bottom of the hero.
//
// Logos live in /public/companies/ and show in their original colours.
// `logoDark` is a version for the dark theme (black parts turned white so they
// stay visible); `invertInDark` does the same with CSS for all-black logos.
// `withName` shows the company name next to icon-only marks.
// `height` is a Tailwind height class tuned per logo so they look balanced.
type Company = {
  name: string;
  logo?: string;
  logoDark?: string;
  invertInDark?: boolean;
  height?: string;
  withName?: boolean;
};

const companies: Company[] = [
  {
    name: "Edusproute",
    logo: "/companies/edusproute.svg",
    logoDark: "/companies/edusproute-dark.svg",
    height: "h-7",
  },
  {
    name: "Vikidemy Hub",
    logo: "/companies/vikidemy-hub.png",
    logoDark: "/companies/vikidemy-hub-dark.png",
    height: "h-8",
    withName: true,
  },
  {
    name: "Velocity Digital",
    logo: "/companies/velocity-digital.png",
    logoDark: "/companies/velocity-digital-dark.png",
    height: "h-8",
  },
  { name: "JACS Farm", logo: "/companies/jacs-farm.svg", height: "h-9" },
  {
    name: "Swipas",
    logo: "/companies/swipas.svg",
    invertInDark: true,
    height: "h-7",
    withName: true,
  },
];

// Repeat the list inside each loop copy so the strip never shows a gap
// before the loop restarts.
const REPEAT = 2;
const loopItems = Array.from({ length: REPEAT }, () => companies).flat();

function Logo({ company }: { company: Company }) {
  const size = `${company.height ?? "h-8"} w-auto transition-transform duration-300 group-hover/item:scale-105`;
  const alt = company.withName ? "" : company.name;
  const hidden = company.withName ? true : undefined;
  /* eslint-disable @next/next/no-img-element */
  if (company.logoDark) {
    // Original logo in light mode, dark-theme version in dark mode
    return (
      <>
        <img
          src={company.logo}
          alt={alt}
          aria-hidden={hidden}
          className={`${size} dark:hidden`}
        />
        <img
          src={company.logoDark}
          alt={alt}
          aria-hidden={hidden}
          className={`${size} hidden dark:block`}
        />
      </>
    );
  }
  return (
    <img
      src={company.logo}
      alt={alt}
      aria-hidden={hidden}
      className={`${size} ${company.invertInDark ? "dark:invert" : ""}`}
    />
  );
  /* eslint-enable @next/next/no-img-element */
}

function Item({ company }: { company: Company }) {
  const showName = !company.logo || company.withName;
  return (
    // margin (not flex gap) keeps both copies exactly equal width, so the -50% loop is seamless
    <li className="group/item mr-10 flex shrink-0 items-center gap-10">
      <span className="flex items-center gap-3">
        {company.logo && <Logo company={company} />}
        {showName && (
          <span className="font-display-serif text-[26px] leading-none whitespace-nowrap text-[var(--muted)] italic transition-colors duration-300 group-hover/item:text-[var(--text)]">
            {company.name}
          </span>
        )}
      </span>
      <span
        aria-hidden
        className="block h-1 w-1 rounded-full bg-[var(--accent)] opacity-60"
      />
    </li>
  );
}

export default function CompanyTicker() {
  return (
    <div
      aria-label="Companies I've worked with"
      role="region"
      className="w-full border-t border-[var(--border)] pt-7"
    >
      <p className="font-mono-custom mb-4 text-[10px] tracking-[3px] text-[var(--muted)] uppercase">
        Worked with
      </p>
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max py-1 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <ul className="flex items-center">
            {loopItems.map((c, i) => (
              <Item key={i} company={c} />
            ))}
          </ul>
          {/* Duplicate copy for the seamless loop; hidden from screen readers */}
          <ul className="flex items-center" aria-hidden>
            {loopItems.map((c, i) => (
              <Item key={i} company={c} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
