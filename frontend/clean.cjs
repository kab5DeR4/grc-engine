const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/rnale/Desktop/grcui/frontend/src/pages';
const files = ['StudyPage.jsx', 'ScansPage.jsx', 'ReportsPage.jsx', 'PracticePage.jsx', 'FindingsPage.jsx', 'DrawingPage.jsx', 'ControlsPage.jsx', 'ArchivePage.jsx', 'CataloguePage.jsx'];

files.forEach(file => {
  const filepath = path.join(dir, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    content = content.replace(/import StudioNav from '\.\.\/components\/layout\/StudioNav';\r?\n?/g, '');
    content = content.replace(/import StudioFooter from '\.\.\/components\/layout\/StudioFooter';\r?\n?/g, '');
    content = content.replace(/<StudioNav \/>\r?\n?/g, '');
    content = content.replace(/<StudioFooter \/>\r?\n?/g, '');
    content = content.replace(/className="mt-\[60px\] /g, 'className="');
    content = content.replace(/className="w-full min-h-screen/g, 'className="w-full h-full');
    fs.writeFileSync(filepath, content);
  }
});
console.log('Done cleaning headers/footers.');
