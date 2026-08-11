import StudioNav from '../components/layout/StudioNav';
import StudioFooter from '../components/layout/StudioFooter';
import { Check, Minus } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'STARTER',
      price: '$49',
      desc: 'Perfect for small teams getting started with continuous compliance.',
      cta: 'START TRIAL',
      highlighted: false,
    },
    {
      name: 'PROFESSIONAL',
      price: '$199',
      desc: 'Advanced telemetry and reporting for growing organizations.',
      cta: 'SUBSCRIBE',
      highlighted: true,
    },
    {
      name: 'ENTERPRISE',
      price: 'CUSTOM',
      desc: 'Dedicated support and custom integrations for massive scale.',
      cta: 'CONTACT SALES',
      highlighted: false,
    }
  ];

  const features = [
    { name: 'Number of Users', tiers: ['Up to 5', 'Up to 50', 'Unlimited'] },
    { name: 'Cloud Accounts', tiers: ['1', 'Up to 10', 'Unlimited'] },
    { name: 'Data Retention', tiers: ['30 Days', '1 Year', '7 Years (Audit Ready)'] },
    { name: 'Frameworks (NIST, SOC2)', tiers: ['1 Included', 'All Included', 'All + Custom'] },
    { name: 'Continuous Telemetry', tiers: [true, true, true] },
    { name: 'Kinematic Topology', tiers: [false, true, true] },
    { name: 'API Access', tiers: [false, 'Standard', 'High Rate Limits'] },
    { name: 'Custom Integrations', tiers: [false, false, true] },
    { name: 'Dedicated Support', tiers: [false, false, true] },
    { name: 'SSO / SAML', tiers: [false, true, true] },
  ];

  const faqs = [
    { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time from your billing dashboard. Changes take effect immediately.' },
    { q: 'What counts as a "Cloud Account"?', a: 'A cloud account is a single AWS Account ID, Azure Subscription, or GCP Project. You can mix and match providers.' },
    { q: 'Do you offer custom compliance frameworks?', a: 'Yes, on the Enterprise plan you can define your own proprietary frameworks and map them to your controls using Policy as Code.' },
    { q: 'Is there a free trial?', a: 'We offer a 14-day full-featured trial of the Professional plan so you can experience the power of continuous telemetry.' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#E7E3DA] text-[#1A1917] font-mono flex flex-col">
      <StudioNav />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-32 pb-20 px-6 md:px-12 text-center">
        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 text-[#1A1917]">Transparent Pricing</h1>
        <p className="max-w-xl text-[14px] text-[#4A4741] leading-relaxed mb-12">
          Studio-grade governance doesn't have to cost a fortune. Choose the plan that fits your engineering team's scale.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full text-left">
          {plans.map((plan, i) => (
            <div key={i} className={`p-8 border flex flex-col bg-[#F2F0EB] relative ${plan.highlighted ? 'border-[#9B3418] border-2' : 'border-[#6E6A61]/30'}`}>
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-[#9B3418] text-[#E7E3DA] px-3 py-1 text-[10px] mono-label transform translate-x-2 -translate-y-2">RECOMMENDED</div>
              )}
              <h3 className={`mono-label mb-2 ${plan.highlighted ? 'text-[#9B3418]' : 'text-[#1A1917]'}`}>{plan.name}</h3>
              <div className="text-4xl font-serif mb-4 mt-2">
                {plan.price}
                {plan.price !== 'CUSTOM' && <span className="text-sm font-mono text-[#6E6A61]">/mo</span>}
              </div>
              <p className="text-[12px] text-[#4A4741] mb-8 flex-1 leading-relaxed">{plan.desc}</p>
              <button className={`w-full py-3 mono-label transition-colors text-[12px] ${
                plan.highlighted 
                  ? 'bg-[#9B3418] text-[#E7E3DA] hover:bg-[#7a2913]' 
                  : 'border border-[#1A1917] text-[#1A1917] hover:bg-[#1A1917] hover:text-[#E7E3DA]'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 px-6 md:px-12 bg-[#F2F0EB] border-t border-[#6E6A61]/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-[#1A1917] mono-label text-[#6E6A61] w-1/4">FEATURE</th>
                  <th className="p-4 border-b-2 border-[#1A1917] mono-label text-[#1A1917] text-center w-1/4">STARTER</th>
                  <th className="p-4 border-b-2 border-[#1A1917] mono-label text-[#9B3418] text-center w-1/4">PROFESSIONAL</th>
                  <th className="p-4 border-b-2 border-[#1A1917] mono-label text-[#1A1917] text-center w-1/4">ENTERPRISE</th>
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {features.map((f, i) => (
                  <tr key={i} className="border-b border-[#6E6A61]/20 hover:bg-[#E7E3DA]/50 transition-colors">
                    <td className="p-4 font-bold text-[#4A4741]">{f.name}</td>
                    {f.tiers.map((tier, j) => (
                      <td key={j} className="p-4 text-center text-[#1A1917]">
                        {typeof tier === 'boolean' ? (
                          tier ? <Check size={18} className="mx-auto text-green-600" /> : <Minus size={18} className="mx-auto text-[#6E6A61]" />
                        ) : (
                          tier
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, i) => (
              <div key={i} className="p-6 bg-[#F2F0EB] border border-[#6E6A61]/20">
                <h4 className="font-bold mb-3 text-[14px]">{faq.q}</h4>
                <p className="text-[12px] text-[#4A4741] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StudioFooter />
    </div>
  );
}
