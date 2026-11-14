import type { IconType } from "react-icons";
import {
  LuAtom,
  LuBraces,
  LuCreditCard,
  LuDatabase,
  LuFileCode,
  LuGauge,
  LuGitBranch,
  LuLayers,
  LuMonitorSmartphone,
  LuServer,
  LuTriangle,
  LuWebhook,
} from "react-icons/lu";
import ScrollReveal from "./ScrollReveal";

type Skill = { name: string; icon: IconType };

// Plain outline icons throughout, to match the reference design
const skills: Skill[] = [
  { name: "React", icon: LuAtom },
  { name: "Next.js", icon: LuLayers },
  { name: "TypeScript", icon: LuFileCode },
  { name: "JavaScript", icon: LuBraces },
  { name: "Node.js", icon: LuServer },
  { name: "Supabase", icon: LuDatabase },
  { name: "REST APIs", icon: LuWebhook },
  { name: "Paystack Integration", icon: LuCreditCard },
  { name: "Git & GitHub", icon: LuGitBranch },
  { name: "Vercel", icon: LuTriangle },
  { name: "Responsive Design", icon: LuMonitorSmartphone },
  { name: "Performance Optimization", icon: LuGauge },
];

const PER_ROW_DESKTOP = 4;
const rows = Array.from(
  { length: Math.ceil(skills.length / PER_ROW_DESKTOP) },
  (_, i) => skills.slice(i * PER_ROW_DESKTOP, (i + 1) * PER_ROW_DESKTOP),
);

export default function CoreExpertise() {
  return (
    <section
      id="expertise"
      className="bg-gradient-to-b from-[var(--expertise-from)] to-[var(--expertise-to)]"
    >
      <div className="mx-auto max-w-[1100px] px-6 py-24 md:py-28">
        <ScrollReveal>
          <div className="mb-10 text-center md:mb-11">
            <h2 className="text-[clamp(36px,4.2vw,46px)] leading-[1.1] font-bold tracking-[-1.5px] text-[var(--text)]">
              Core Expertise
            </h2>
            <p className="mt-2 text-[16px] text-[var(--text)] md:text-[17px]">
              Key skills and technologies
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {/* Cards size to their content and sit in centered rows.
              Desktop: explicit rows of 4. Smaller screens: the row wrappers
              become `display: contents`, so all cards simply wrap. */}
          <div
            role="list"
            className="flex flex-wrap justify-center gap-3 md:gap-[18px] lg:flex-col lg:items-center"
          >
            {rows.map((row, r) => (
              <div key={r} className="contents lg:flex lg:gap-[18px]">
                {row.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    role="listitem"
                    className="group flex cursor-default items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-3 shadow-[0_1px_4px_rgba(15,23,42,0.06)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:z-10 hover:-translate-y-1 hover:scale-[1.06] hover:border-[var(--accent-border)] hover:shadow-[0_12px_28px_-8px_var(--accent-border)] md:px-6 motion-reduce:transition-none motion-reduce:hover:transform-none dark:shadow-none dark:hover:shadow-[0_12px_28px_-8px_var(--accent-border)]"
                  >
                    <Icon
                      aria-hidden
                      className="shrink-0 text-[20px] text-[var(--accent)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.2] group-hover:-rotate-6 motion-reduce:transition-none"
                    />
                    <span className="text-[15px] leading-6 font-bold whitespace-nowrap text-[var(--text)] md:text-[17px]">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
