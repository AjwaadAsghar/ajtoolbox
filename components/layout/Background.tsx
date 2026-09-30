/** Site-wide ambient background. Pure CSS (no JS, no WebGL) so it's free on tool pages. */
export function Background() {
  return (
    <div className="bg-aurora" aria-hidden="true">
      <div className="bg-aurora__blob bg-aurora__blob--a" />
      <div className="bg-aurora__blob bg-aurora__blob--b" />
      <div className="bg-aurora__blob bg-aurora__blob--c" />
      <div className="bg-aurora__grid" />
      <div className="bg-aurora__grain" />
    </div>
  );
}
