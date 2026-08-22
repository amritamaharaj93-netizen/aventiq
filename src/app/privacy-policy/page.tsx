export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
        <h1 className="text-4xl font-bold text-[#102A43] mb-8">Privacy Policy</h1>
        <p className="text-[#475569] mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="space-y-6 text-[#475569]">
          <p>At Aventiq, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our software development services.</p>
          <h2 className="text-2xl font-bold text-[#102A43] mt-8">Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect via the Site includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal Data (Name, email, phone number) when you submit a project inquiry.</li>
            <li>Usage Data (IP address, browser type, pages visited) for analytics purposes.</li>
          </ul>
          <h2 className="text-2xl font-bold text-[#102A43] mt-8">How We Use Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We use your data specifically to communicate with you regarding your project requirements and to improve our website.</p>
        </div>
      </div>
    </div>
  )
}
