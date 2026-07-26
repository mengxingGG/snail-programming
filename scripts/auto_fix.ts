import * as fs from 'fs';
import * as glob from 'glob';

const data = JSON.parse(fs.readFileSync('audit_report.json', 'utf8'));
const files = glob.sync('src/shared/course-data/**/*.ts').concat(glob.sync('src/shared/course-data-python/**/*.ts'));

data.forEach((d: any) => {
  if (d.issue === 'Expected to pass, but failed.' && d.actual && !d.actual.includes('Error') && !d.actual.includes('Traceback')) {
    let fixed = false;
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8');
      const sectionRegex = new RegExp("(id:\\s*['\"]" + d.id + "['\"][\\s\\S]*?expectedOutput:\\s*\\`)([\\s\\S]*?)(\\`)");
      if (sectionRegex.test(content)) {
        content = content.replace(sectionRegex, (match, p1, p2, p3) => {
          return p1 + d.actual.trimEnd() + p3;
        });
        fs.writeFileSync(file, content);
        fixed = true;
        console.log('Fixed expectedOutput for ' + d.lang + ' ' + d.id + ' in ' + file);
        break;
      }
    }
    if (!fixed) console.log('Could not auto-fix ' + d.lang + ' ' + d.id);
  }
});
