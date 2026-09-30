/**
 * AJ Toolbox logo, traced from public/brand/logo-original.png as SVG so it stays crisp at any size.
 * The "AJ" letters are cut-outs filled with the page ink colour.
 */

const LIME = "var(--color-accent)";
const INK = "var(--color-ink)";

// Shared shapes (source coordinates from the 1536×1024 artwork)
const HANDLE =
  "M666 282V225Q666 133 760 133H1060Q1148 133 1148 220V282ZM735 293V228Q735 197 767 197H1048Q1080 197 1080 228V293Z";
const LID = "M530 281H1283Q1365 281 1365 360V387Q1365 397 1355 397H450Q440 397 440 387V370Q440 281 530 281Z";
const BODY = "M440 435L1350 433Q1362 433 1360 447L1340 745Q1335 838 1235 838H505Q415 838 416 760Z";
const LETTERS =
  "M543 775L738 478H848L975 692H1000Q1034 692 1034 655V478H1148V655Q1148 775 1010 775H903L795 585L748 657H818L833 683L810 717H710L677 775Z";
// Speed lines (the top and bottom ones join the body)
const SPEED =
  "M205 435H440L433 479H205Q182 479 182 457Q182 435 205 435ZM221 657H424L418 700H221Q199 700 199 678Q199 657 221 657ZM103 551H352Q374 551 374 572Q374 594 352 594H103Q81 594 81 572Q81 551 103 551ZM330 326H391Q406 326 406 341Q406 357 391 357H330Q315 357 315 341Q315 326 330 326Z";

function Shapes({ speed }: { speed: boolean }) {
  return (
    <>
      <path d={HANDLE} fill={LIME} fillRule="evenodd" />
      <path d={LID} fill={LIME} />
      <path d={BODY} fill={LIME} />
      {speed && <path d={SPEED} fill={LIME} />}
      <path d={LETTERS} fill={INK} />
    </>
  );
}

/** Full logo with speed lines (header/footer). Size it by height, e.g. className="h-8 w-auto". */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="70 120 1310 730" className={className} aria-hidden="true">
      <Shapes speed />
    </svg>
  );
}

/** Compact square mark: just the toolbox. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="398 -10 990 990" className={className} aria-hidden="true">
      <Shapes speed={false} />
    </svg>
  );
}
