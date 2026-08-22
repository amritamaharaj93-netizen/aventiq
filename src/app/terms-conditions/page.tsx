export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
        <h1 className="text-4xl font-bold text-[#102A43] mb-8">Terms & Conditions</h1>
        <p className="text-[#475569] mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="space-y-6 text-[#475569]">
          <p>These Terms and Conditions constitute a legally binding agreement made between you and Aventiq, concerning your access to and use of the aventiq.com website.</p>
          <h2 className="text-2xl font-bold text-[#102A43] mt-8">Intellectual Property Rights</h2>
          <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site are owned or controlled by us.</p>
          <h2 className="text-2xl font-bold text-[#102A43] mt-8">User Representations</h2>
          <p>By using the Site, you represent and warrant that: all registration information you submit will be true, accurate, current, and complete.</p>
        </div>
      </div>
    </div>
  )
}
