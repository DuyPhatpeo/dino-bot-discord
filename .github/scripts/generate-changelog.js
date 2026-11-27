const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function getCommits() {
  const currentTag = process.env.GITHUB_REF_NAME || '';
  
  // Retrieve tags sorted by creation date
  let previousTag = '';
  try {
    const tagsOutput = execSync('git tag --sort=-creatordate', { encoding: 'utf8' }).trim();
    const tags = tagsOutput ? tagsOutput.split('\n').map(t => t.trim()).filter(Boolean) : [];
    
    if (currentTag && tags.includes(currentTag)) {
      const idx = tags.indexOf(currentTag);
      if (idx + 1 < tags.length) {
        previousTag = tags[idx + 1];
      }
    } else if (!currentTag && tags.length > 1) {
      previousTag = tags[1];
    }
  } catch (e) {
    // Ignore error if git tag fails
  }

  const logFormat = '%h|%s|%an';
  const logCommand = previousTag
    ? `git log ${previousTag}..HEAD --pretty=format:"${logFormat}"`
    : `git log --pretty=format:"${logFormat}"`;

  const logs = execSync(logCommand, { encoding: 'utf8' }).trim();
  if (!logs) return [];

  return logs.split('\n').map(line => {
    const parts = line.split('|');
    const hash = parts[0];
    const subject = parts[1] ? parts[1].trim() : '';
    const author = parts[2] ? parts[2].trim() : '';
    return { hash, subject, author };
  }).filter(c => c.subject);
}

function generateMarkdown(commits) {
  const categories = {
    feat: { title: '🚀 Tính năng mới (Features)', items: [] },
    fix: { title: '🐛 Sửa lỗi (Bug Fixes)', items: [] },
    perf: { title: '⚡ Tối ưu hiệu năng (Performance)', items: [] },
    style: { title: '🎨 Giao diện & Hiển thị (UI/UX)', items: [] },
    refactor: { title: '♻️ Tái cấu trúc mã nguồn (Refactoring)', items: [] },
    docs: { title: '📝 Tài liệu (Documentation)', items: [] },
    chore: { title: '🧰 Cấu hình & CI/CD (Maintenance)', items: [] },
    other: { title: '📦 Thay đổi khác (Other Changes)', items: [] }
  };

  for (const commit of commits) {
    const sub = commit.subject;
    const lower = sub.toLowerCase();

    if (lower.startsWith('feat')) {
      categories.feat.items.push(commit);
    } else if (lower.startsWith('fix')) {
      categories.fix.items.push(commit);
    } else if (lower.startsWith('perf')) {
      categories.perf.items.push(commit);
    } else if (lower.startsWith('style')) {
      categories.style.items.push(commit);
    } else if (lower.startsWith('refactor')) {
      categories.refactor.items.push(commit);
    } else if (lower.startsWith('docs')) {
      categories.docs.items.push(commit);
    } else if (lower.startsWith('chore') || lower.startsWith('ci') || lower.startsWith('build')) {
      categories.chore.items.push(commit);
    } else {
      categories.other.items.push(commit);
    }
  }

  let md = `## 🦕 DinoBot Discord - Release Notes\n\n`;

  for (const key of Object.keys(categories)) {
    const cat = categories[key];
    if (cat.items.length > 0) {
      md += `### ${cat.title}\n\n`;
      for (const item of cat.items) {
        md += `* ${item.subject} ([${item.hash}](https://github.com/DuyPhatpeo/dino-bot-discord/commit/${item.hash}))\n`;
      }
      md += `\n`;
    }
  }

  return md;
}

const commits = getCommits();
const markdown = generateMarkdown(commits);
const outputPath = path.resolve(process.cwd(), 'RELEASE_NOTES.md');
fs.writeFileSync(outputPath, markdown, 'utf8');
console.log(`Generated release notes with ${commits.length} commits at ${outputPath}`);
