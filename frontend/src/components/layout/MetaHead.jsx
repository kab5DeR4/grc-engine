import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_META = {
  '/': {
    title: 'GRC Engine — Compliance, Grounded in Verifiable Evidence',
    description: 'Continuous compliance and automated governance platform. Connect controls directly to infrastructure telemetry with cryptographic evidence records.',
  },
  '/login': {
    title: 'Sign In — GRC Engine',
    description: 'Access your continuous compliance, risk management, and evidence verification workspace.',
  },
  '/dashboard': {
    title: 'Executive Dashboard — GRC Engine',
    description: 'Real-time overview of compliance posture, framework readiness, and priority finding queues.',
  },
  '/dashboard/integrations': {
    title: 'Connected Ecosystem — GRC Engine',
    description: 'Manage active telemetry sources across AWS, Azure, GCP, GitHub, and Kubernetes.',
  },
  '/assets': {
    title: 'Asset Inventory — GRC Engine',
    description: 'Continuous asset discovery, classification, and technical posture tracking.',
  },
  '/architecture': {
    title: 'System Architecture — GRC Engine',
    description: 'Explore the code-first architectural model of GRC Engine and its evidence collection pipeline.',
  },
  '/controls': {
    title: 'Control Frameworks — GRC Engine',
    description: 'Automated compliance control mappings across SOC 2, ISO 27001, NIST 800-53, and PCI-DSS.',
  },
  '/archive': {
    title: 'Evidence Vault — GRC Engine',
    description: 'Cryptographically hashed and audit-ready evidence record repository.',
  },
  '/scans': {
    title: 'Automated Scans — GRC Engine',
    description: 'Continuous automated policy scans and infrastructure evaluation runs.',
  },
  '/findings': {
    title: 'Findings & Remediations — GRC Engine',
    description: 'Track policy deviations, risk levels, and automated remediation workflows.',
  },
  '/reports': {
    title: 'Audit Reports — GRC Engine',
    description: 'Generate verified audit reports for SOC 2 Type II, ISO 27001, and custom compliance frameworks.',
  },
  '/settings': {
    title: 'Settings — GRC Engine',
    description: 'Configure tenant parameters, notification hooks, scanner schedules, and API access.',
  },
  '/contact': {
    title: 'Contact Engineering — GRC Engine',
    description: 'Get in touch with the GRC Engine security engineering team or schedule an architecture demo.',
  },
  '/features': {
    title: 'Platform Capabilities — GRC Engine',
    description: 'In-depth overview of technical features: evidence harvesting, continuous scanning, and automated reporting.',
  },
  '/docs': {
    title: 'Documentation — GRC Engine',
    description: 'Developer guides, API references, control rule specifications, and deployment docs.',
  },
  '/integrations': {
    title: 'Integrations Catalog — GRC Engine',
    description: 'Connect your cloud providers, version control, CI/CD pipelines, and identity management systems.',
  },
  '/privacy': {
    title: 'Privacy Policy — GRC Engine',
    description: 'Read how GRC Engine safeguards telemetry data and maintains strict privacy standards.',
  },
  '/terms': {
    title: 'Terms of Service — GRC Engine',
    description: 'Review the terms and conditions governing the use of GRC Engine software and platform APIs.',
  },
};

export default function MetaHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Standardize route path lookup
    const currentMeta = ROUTE_META[pathname] || {
      title: 'GRC Engine — Automated Compliance & Governance',
      description: 'Continuous compliance automation grounded in verifiable technical evidence.',
    };

    // Update Page Title
    document.title = currentMeta.title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', currentMeta.description);

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentMeta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentMeta.description);

    // Dynamic Canonical URL Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    const origin = window.location.origin || 'https://grcengine.dev';
    canonicalLink.setAttribute('href', `${origin}${pathname}`);
  }, [pathname]);

  return null;
}
