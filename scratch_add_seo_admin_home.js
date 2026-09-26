const fs = require('fs');

let adminContent = fs.readFileSync('src/app/admin/home/page.tsx', 'utf8');

// 1. Add fields to HomeSettingsContent interface
adminContent = adminContent.replace(
    /footerSocialLinks: SocialLink\[\]\r?\n\}/,
    `footerSocialLinks: SocialLink[]
  
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  seoCanonical: string
  seoAuthor: string
  seoPublisher: string
}`
);

// 2. Add defaults to DEFAULT_HOME_SETTINGS
adminContent = adminContent.replace(
    /footerSocialLinks: \[\],?\r?\n\}/,
    `footerSocialLinks: [],
  
  seoTitle: "Apex Packaging Solutions | Premium Sustainable Packaging",
  seoDescription: "Apex Packaging Solutions is a leading manufacturer of innovative, sustainable packaging solutions including corrugated boxes, flexible packaging, and rigid containers.",
  seoKeywords: "Packaging Manufacturer, Corrugated Boxes, Flexible Packaging, Sustainable Packaging",
  seoCanonical: "",
  seoAuthor: "Apex Packaging",
  seoPublisher: "Apex Packaging"
}`
);

// 3. Add SEO Section UI before footer section
const seoUI = `
          {/* SECTION: SEO SETTINGS */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 relative overflow-hidden space-y-6 animate-in fade-in">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0067D9] to-[#00C6F7]"></div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#020B1C] flex items-center gap-2">
                <Globe className="text-[#0067D9]" size={20} /> SEO Settings (Home Page)
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">SEO Title</label>
                <input type="text" value={formData.seoTitle || ''} onChange={(e) => setFormData({...formData, seoTitle: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">SEO Description</label>
                <textarea rows={3} value={formData.seoDescription || ''} onChange={(e) => setFormData({...formData, seoDescription: e.target.value})} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">SEO Keywords (comma separated)</label>
                <input type="text" value={formData.seoKeywords || ''} onChange={(e) => setFormData({...formData, seoKeywords: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Canonical URL</label>
                  <input type="text" value={formData.seoCanonical || ''} onChange={(e) => setFormData({...formData, seoCanonical: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Author</label>
                  <input type="text" value={formData.seoAuthor || ''} onChange={(e) => setFormData({...formData, seoAuthor: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Publisher</label>
                  <input type="text" value={formData.seoPublisher || ''} onChange={(e) => setFormData({...formData, seoPublisher: e.target.value})} className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium" />
                </div>
              </div>
            </div>
          </div>
`;

adminContent = adminContent.replace(
    /\{\/\* SECTION 11: FOOTER \*\/\}/,
    seoUI + '\n          {/* SECTION 11: FOOTER */}'
);

fs.writeFileSync('src/app/admin/home/page.tsx', adminContent);
