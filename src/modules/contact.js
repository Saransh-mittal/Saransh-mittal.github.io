// ============================================================
// Contact — large serif outro + email + CTA buttons
// ============================================================
import { splitLine } from '../utils/dom.js';

export function initContact(siteData) {
  const content = document.getElementById('contact-content');
  if (!content) return;

  const { personal } = siteData;

  content.innerHTML = `
    <h2 class="lead reveal">
      <span class="sub-line">${splitLine("Let's build")}</span>
      <span class="sub-line"><span class="it">${splitLine('something.')}</span></span>
    </h2>
    <div class="reveal">
      <a class="email-link" href="mailto:${personal.email}">${personal.email} <span aria-hidden="true">↗</span></a>
    </div>
    <div class="cta-row reveal">
      <a href="${personal.links.github}" target="_blank" rel="noopener" class="btn">GitHub <span class="arr">↗</span></a>
      <a href="${personal.links.linkedin}" target="_blank" rel="noopener" class="btn">LinkedIn <span class="arr">↗</span></a>
      <a href="${personal.resumeUrl}" class="btn primary">Resume <span class="arr">↗</span></a>
    </div>
  `;
}
