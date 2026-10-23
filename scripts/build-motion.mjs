// Builds the Trinity motion token files from tokens/source/figma-motion.json
// Source = read-only pull of the Figma "Motion" collection (its own collection — not Primitives, not Layout).
//   tokens/1-primitives/primitives-motion.css  ← scale: duration/* (ms) + easing/* (unquoted keywords)
//   tokens/2-style-layout/motion.css           ← component groups, each an alias → var(--duration-*) / var(--easing-*)
//   tokens/source/motion.json                  ← data for the Foundation/Motion pages
// Re-run after re-pulling from Figma:  node scripts/build-motion.mjs
// Figma stores durations as FLOAT whole milliseconds → exported as `ms`, never `px`.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const src = JSON.parse(readFileSync(ROOT + 'tokens/source/figma-motion.json', 'utf8'));
const cssName = (name) => '--' + name.trim().toLowerCase().replace(/[\/\s]+/g, '-');
const isScale = (v) => /^(duration|easing)\//.test(v.name);
const group = (name) => {
  const parts = name.split('/');
  return parts[0] === 'nav' ? parts.slice(0, 2).join('/') : parts[0]; // nav uses its existing subgroups (nav/link, nav/section…)
};
const raw = (v) => (v.type === 'FLOAT' ? `${v.value}ms` : String(v.value));

// Who handles each group's motion (from Trinity-motion-tokens-review-v2/v3). Atoms define the look; the
// molecule/organism that contains them handles motion — except the integral-motion atoms marked `exception`.
const OWNERS = {
  button: { owners: 'Button', level: 'molecule' },
  checkbox: { owners: 'Checkbox', level: 'molecule', look: '_checkboxInput' },
  spinner: { owners: 'Spinner', level: 'atom', exception: true },
  chip: { owners: 'Chip', level: 'atom', exception: true },
  'nav/link': { owners: 'Nav Link Item', level: 'atom', exception: true },
  tooltip: { owners: 'Tooltip', level: 'atom', exception: true },
  'progress bar': { owners: 'Progress Bar', level: 'atom', exception: true },
  radiobutton: { owners: 'Radio Button Field', level: 'molecule', look: 'Radio Button Input' },
  toggle: { owners: 'Toggle, Toggle Item', level: 'molecule' },
  accordion: { owners: 'Accordion, Accordion Header', level: 'molecule' },
  slider: { owners: 'Slider, Slider-Range, Slider Thumb', level: 'molecule' },
  table: { owners: 'Table Row, Table_Cell', level: 'molecule' },
  card: { owners: 'Card, Status Card, Input Card Header', level: 'organism', look: 'card content' },
  'nav/section': { owners: 'Nav Accordion Section', level: 'molecule' },
  'nav/sidebar': { owners: 'Side Navigation', level: 'organism' },
  'nav/topbar': { owners: 'Top Navigation Mobile', level: 'organism' },
  'nav-accordion-header': { owners: 'NavAccordionHeader', level: 'molecule' },
  'nav-button-option': { owners: 'NavButtonOption', level: 'molecule' },
  tabs: { owners: 'Tabs', level: 'organism', look: '_tabItem' },
  'alternate-button': { owners: 'Alternate Button', level: 'molecule' },
  'icon-only-button': { owners: 'Icon Only Button', level: 'molecule' },
  'breadcrumb-item': { owners: 'Hub BreadcrumbItem', level: 'molecule' },
  'menu-item': { owners: 'Menu Item', level: 'organism' },
  'menu-container': { owners: 'Menu Container', level: 'organism' },
  input: { owners: 'Input, Select, Search', level: 'molecule' },
  'input-field': { owners: 'Input Field', level: 'molecule' },
  'text-area': { owners: 'Text Area', level: 'molecule' },
  'date-picker': { owners: 'Date Picker, Date Time Field', level: 'molecule', look: 'Calendar Day' },
  dropdown: { owners: 'Select Field, Multi-Select Field, Dropdown Button', level: 'molecule' },
  modal: { owners: 'Modal / Drawer', level: 'organism', look: 'Modal Footer, _Modal Content Light' },
  notification: { owners: 'Notification', level: 'organism' },
  banner: { owners: 'Banner', level: 'molecule' },
};

// ---------- checks (fail loudly rather than export something wrong) ----------
const problems = [];
const byName = Object.fromEntries(src.variables.map(v => [v.name, v]));
for (const v of src.variables) {
  if (isScale(v)) {
    if (v.alias) problems.push(`${v.name}: scale value should be raw, found alias → ${v.alias}`);
    if (v.name.startsWith('duration/') && (v.type !== 'FLOAT' || !Number.isInteger(v.value))) problems.push(`${v.name}: duration must be a whole-ms FLOAT`);
    if (v.name.startsWith('easing/') && v.type !== 'STRING') problems.push(`${v.name}: easing must be a STRING`);
  } else {
    if (!v.alias) problems.push(`${v.name}: component token must alias the scale`);
    else if (!byName[v.alias] || !isScale(byName[v.alias])) problems.push(`${v.name}: alias → ${v.alias} is not a Motion scale token`);
    if (!OWNERS[group(v.name)]) problems.push(`${v.name}: group "${group(v.name)}" has no owner entry`);
  }
}
if (problems.length) { console.error('build-motion: NOT written —\n  ' + problems.join('\n  ')); process.exit(1); }

const header = (title, tier, note) => `/* ============================================================================
   TRINITY DESIGN SYSTEM — ${title}
   Tier: ${tier}
   Source: Figma "${src.meta.file}" (${src.meta.fileKey}) → collection "${src.meta.collection}", pulled ${src.meta.pulled}
   GENERATED by scripts/build-motion.mjs — do not edit by hand.
   ${note}
   ============================================================================ */\n\n:root {\n`;

// ---------- scale ----------
const scale = src.variables.filter(isScale);
let prim = header('PRIMITIVES: MOTION', '1 · Primitives (raw values, single mode)',
  'Durations are whole milliseconds (Figma FLOAT → ms). Easings are CSS keywords (Figma STRING → unquoted).');
for (const g of ['duration', 'easing']) {
  prim += `\n  /* ---- ${g} ---- */\n`;
  for (const v of scale.filter(v => v.name.startsWith(g + '/'))) prim += `  ${cssName(v.name)}: ${raw(v)};\n`;
}
writeFileSync(ROOT + 'tokens/1-primitives/primitives-motion.css', prim + '}\n');

// ---------- component groups ----------
const comps = src.variables.filter(v => !isScale(v));
const groups = [...new Set(comps.map(v => group(v.name)))];
let mot = header('COMPONENT MOTION', '2 · Component-scoped (aliases of the motion scale)',
  'Atoms define the look; the molecule/organism that contains them handles motion. Exceptions (integral-motion atoms) are marked.');
for (const g of groups) {
  const o = OWNERS[g];
  mot += `\n  /* ---- ${g} — ${o.owners} (${o.level}${o.exception ? ', motion exception' : ''})${o.look ? ` · look only: ${o.look}` : ''} ---- */\n`;
  for (const v of comps.filter(v => group(v.name) === g)) mot += `  ${cssName(v.name)}: var(${cssName(v.alias)});\n`;
}
writeFileSync(ROOT + 'tokens/2-style-layout/motion.css', mot + '}\n');

// ---------- data for the docs ----------
const usedBy = (n) => comps.filter(v => v.alias === n).map(v => v.name);
const json = {
  meta: src.meta,
  scale: scale.map(v => ({ figma: v.name, css: cssName(v.name), kind: v.name.split('/')[0], type: v.type, value: v.value, out: raw(v), description: v.description, usedBy: usedBy(v.name) })),
  groups: groups.map(g => ({
    group: g, ...OWNERS[g],
    tokens: comps.filter(v => group(v.name) === g).map(v => ({ figma: v.name, css: cssName(v.name), alias: v.alias, aliasCss: cssName(v.alias), out: raw(v) })),
  })),
};
writeFileSync(ROOT + 'tokens/source/motion.json', JSON.stringify(json, null, 1) + '\n');
console.log(`build-motion: ${scale.length} scale + ${comps.length} component tokens in ${groups.length} groups → primitives-motion.css, motion.css, motion.json`);
