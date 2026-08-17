export default function IntegrationHeader() {
  return (
    <div className="mb-12 pb-6 hairline-b">
      <div className="mono-label text-[#9B3418] mb-2 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#9B3418] inline-block"></span>
        SYSTEM INTEGRATIONS & ECOSYSTEM
      </div>
      <h1 className="serif-heading text-[36px] md:text-[54px] text-[#1A1917]">
        Connection <span className="serif-italic-pigment">Management</span>
      </h1>
      <p className="mono-body text-[13px] text-[#4A4741] mt-3 max-w-3xl">
        Configure telemetry ingress points, CI/CD policy enforcements, and downstream workflow alerts. Manage API credentials and verify live connection health.
      </p>
    </div>
  );
}
