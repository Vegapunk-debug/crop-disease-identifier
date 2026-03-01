const path = require('path');
const Database = require('better-sqlite3');
const manifest = require('./plant_manifest.json');

const DB_PATH = path.join(__dirname, 'data', 'treatments.db');

// ─── Treatment data for all 38 disease classes ───────────────────────────────
const seedTreatments = [
  // ── Apple (indices 0-3) ──
  {
    common_name: 'Apple Apple Scab',
    symptoms: 'Olive-green to dark, velvety lesions on leaves and fruit, followed by cracking and deformation on severe infections.',
    cultural_control: 'Prune canopy for airflow, remove fallen leaves, avoid overhead irrigation, and prioritize scab-tolerant cultivars where possible.',
    chemical_control: 'Use protectant fungicides beginning at green-tip through early fruit set; rotate FRAC groups and follow local pre-harvest intervals.'
  },
  {
    common_name: 'Apple Black Rot',
    symptoms: 'Circular leaf spots with purple margins and fruit rot that develops dark concentric rings and shriveling.',
    cultural_control: 'Sanitize mummified fruit, remove cankers during dormancy, and reduce prolonged leaf wetness with pruning and spacing.',
    chemical_control: 'Apply labeled fungicides preventively from bloom onward in wet conditions, alternating active ingredients to reduce resistance risk.'
  },
  {
    common_name: 'Apple Cedar Apple Rust',
    symptoms: 'Bright yellow-orange leaf spots that later develop cup-like structures on the undersides of leaves.',
    cultural_control: 'Remove nearby juniper hosts when practical, improve airflow, and collect infected leaf litter to limit inoculum pressure.',
    chemical_control: 'Apply rust-targeted fungicides from pink bud through petal fall where disease pressure is historically high.'
  },
  {
    common_name: 'Apple Healthy',
    symptoms: 'No disease symptoms detected; foliage and fruit appear physiologically normal.',
    cultural_control: 'Continue routine scouting, balanced fertility, pruning for light penetration, and irrigation scheduling to avoid plant stress.',
    chemical_control: 'No curative treatment needed; maintain preventive programs only when forecast and regional pressure justify applications.'
  },

  // ── Blueberry (index 4) ──
  {
    common_name: 'Blueberry Healthy',
    symptoms: 'No disease symptoms detected; plant appears vigorous with normal leaf and fruit development.',
    cultural_control: 'Maintain proper soil pH (4.5-5.5), ensure adequate mulching, provide consistent irrigation, and practice annual pruning.',
    chemical_control: 'No treatment required; continue preventive monitoring during growing season.'
  },

  // ── Cherry Including Sour (indices 5-6) ──
  {
    common_name: 'Cherry Including Sour Powdery Mildew',
    symptoms: 'White powdery fungal growth on leaf surfaces, curling and distortion of new growth, and premature leaf drop.',
    cultural_control: 'Improve air circulation through pruning, avoid excessive nitrogen fertilization, and select resistant varieties when available.',
    chemical_control: 'Apply sulfur-based or systemic fungicides at first sign of infection; rotate FRAC groups to prevent resistance.'
  },
  {
    common_name: 'Cherry Including Sour Healthy',
    symptoms: 'No disease symptoms detected; tree shows normal foliage and fruit development.',
    cultural_control: 'Continue proper pruning, balanced fertilization, and pest monitoring throughout the growing season.',
    chemical_control: 'No treatment required; maintain dormant spray programs if historically needed.'
  },

  // ── Corn Maize (indices 7-10) ──
  {
    common_name: 'Corn Maize Cercospora Leaf Spot Gray Leaf Spot',
    symptoms: 'Rectangular, gray to tan lesions running parallel to leaf veins, leading to significant leaf blight under humid conditions.',
    cultural_control: 'Rotate away from corn, use resistant hybrids, reduce surface residue through tillage, and avoid continuous corn cropping.',
    chemical_control: 'Apply foliar fungicides at VT-R1 growth stages when disease pressure is high; use products with multiple modes of action.'
  },
  {
    common_name: 'Corn Maize Common Rust',
    symptoms: 'Small, circular to elongated reddish-brown pustules on both leaf surfaces, releasing powdery spores when ruptured.',
    cultural_control: 'Plant resistant hybrids, ensure adequate plant spacing for airflow, and scout fields regularly during warm humid weather.',
    chemical_control: 'Apply fungicides if rust is detected before tasseling and conditions favor rapid spread; rotate FRAC groups.'
  },
  {
    common_name: 'Corn Maize Northern Leaf Blight',
    symptoms: 'Large, cigar-shaped grayish-green to tan lesions on leaves, starting from lower canopy and progressing upward.',
    cultural_control: 'Use resistant hybrids, rotate crops, manage residue to reduce inoculum, and maintain adequate plant nutrition.',
    chemical_control: 'Apply foliar fungicides preventively when weather conditions favor disease and susceptible hybrids are planted.'
  },
  {
    common_name: 'Corn Maize Healthy',
    symptoms: 'No disease symptoms detected; plant shows normal growth, leaf color, and ear development.',
    cultural_control: 'Maintain proper fertility, adequate stand density, and continue scouting for pest and disease pressure.',
    chemical_control: 'No treatment required; follow integrated pest management practices.'
  },

  // ── Grape (indices 11-14) ──
  {
    common_name: 'Grape Black Rot',
    symptoms: 'Circular tan leaf spots with dark margins; fruit shrivels into hard, black mummies with characteristic surface texture.',
    cultural_control: 'Remove mummified berries and infected canes during dormant pruning, improve canopy airflow, and manage floor vegetation.',
    chemical_control: 'Apply protective fungicides from early shoot growth through veraison, especially during wet springs.'
  },
  {
    common_name: 'Grape Esca Black Measles',
    symptoms: 'Interveinal leaf chlorosis and necrosis creating a tiger-stripe pattern; dark streaking in wood; sudden vine collapse in severe cases.',
    cultural_control: 'Avoid large pruning wounds, protect cuts with wound sealant, remove severely affected vines, and reduce vine stress.',
    chemical_control: 'No consistently effective chemical control; focus on preventive wound protection and cultural management.'
  },
  {
    common_name: 'Grape Leaf Blight Isariopsis Leaf Spot',
    symptoms: 'Irregular dark brown to black spots on leaves, often with yellow halos, leading to premature defoliation.',
    cultural_control: 'Remove infected leaves and debris, improve air circulation through canopy management, and avoid overhead irrigation.',
    chemical_control: 'Apply fungicides preventively during periods of high humidity and leaf wetness.'
  },
  {
    common_name: 'Grape Healthy',
    symptoms: 'No disease symptoms detected; vines show normal growth, leaf color, and fruit development.',
    cultural_control: 'Continue canopy management, balanced nutrition, proper training, and regular scouting.',
    chemical_control: 'No treatment required; maintain standard preventive spray program based on regional disease pressure.'
  },

  // ── Orange (index 15) ──
  {
    common_name: 'Orange Haunglongbing Citrus Greening',
    symptoms: 'Asymmetric blotchy mottling of leaves, lopsided and bitter fruit, premature fruit drop, and progressive tree decline.',
    cultural_control: 'Control Asian citrus psyllid vector aggressively, remove infected trees promptly, use certified disease-free nursery stock.',
    chemical_control: 'No cure exists; focus on systemic insecticides for psyllid control and nutritional support to extend tree productivity.'
  },

  // ── Peach (indices 16-17) ──
  {
    common_name: 'Peach Bacterial Spot',
    symptoms: 'Angular water-soaked leaf lesions that turn dark, leaf shot-holing, and pitted or cracked fruit with dark sunken spots.',
    cultural_control: 'Plant resistant cultivars, avoid overhead irrigation, improve airflow with proper pruning, and manage nitrogen carefully.',
    chemical_control: 'Apply copper-based bactericides during early growth; use oxytetracycline where labeled for severe pressure.'
  },
  {
    common_name: 'Peach Healthy',
    symptoms: 'No disease symptoms detected; tree shows normal leaf and fruit development.',
    cultural_control: 'Continue proper pruning, thinning, fertility management, and regular pest scouting.',
    chemical_control: 'No treatment required; maintain dormant and early-season spray schedules as preventive measures.'
  },

  // ── Pepper Bell (indices 18-19) ──
  {
    common_name: 'Pepper Bell Bacterial Spot',
    symptoms: 'Small dark lesions on leaves and fruit, often with yellow halos; severe cases cause defoliation and sunken fruit spots.',
    cultural_control: 'Use certified seed, avoid working plants when wet, rotate away from solanaceous crops, use drip irrigation.',
    chemical_control: 'Apply copper-based bactericides with labeled protectants early; rotate modes of action.'
  },
  {
    common_name: 'Pepper Bell Healthy',
    symptoms: 'No disease symptoms detected; plant shows vigorous growth and normal fruit development.',
    cultural_control: 'Maintain balanced nutrition, adequate spacing, and consistent moisture levels.',
    chemical_control: 'No treatment required; continue IPM practices and regular monitoring.'
  },

  // ── Potato (indices 20-22) ──
  {
    common_name: 'Potato Early Blight',
    symptoms: 'Brown lesions with concentric rings on older leaves leading to progressive defoliation in warm conditions.',
    cultural_control: 'Rotate away from potatoes, destroy cull piles, and avoid prolonged leaf wetness through irrigation timing.',
    chemical_control: 'Begin preventive fungicides before canopy closure and rotate FRAC groups across the season.'
  },
  {
    common_name: 'Potato Late Blight',
    symptoms: 'Rapidly expanding water-soaked lesions with potential white growth on leaf undersides in humid weather.',
    cultural_control: 'Use certified seed, kill volunteer plants, and remove infected foliage promptly to reduce inoculum.',
    chemical_control: 'Apply late-blight-active fungicides on short intervals during cool, wet periods and rotate active ingredients.'
  },
  {
    common_name: 'Potato Healthy',
    symptoms: 'No disease indicators observed; foliage and stems are healthy for current growth stage.',
    cultural_control: 'Maintain scouting cadence, balanced fertilization, and proper hilling and irrigation management.',
    chemical_control: 'No disease-specific chemical treatment required; continue preventive practices based on forecast risk.'
  },

  // ── Raspberry (index 23) ──
  {
    common_name: 'Raspberry Healthy',
    symptoms: 'No disease symptoms detected; canes and foliage appear healthy and vigorous.',
    cultural_control: 'Remove spent floricanes after harvest, thin primocanes for airflow, maintain proper fertility and weed control.',
    chemical_control: 'No treatment required; continue preventive lime-sulfur dormant sprays if historically needed.'
  },

  // ── Soybean (index 24) ──
  {
    common_name: 'Soybean Healthy',
    symptoms: 'No disease symptoms detected; plants show uniform growth, green foliage, and normal pod set.',
    cultural_control: 'Rotate crops, use quality seed with seed treatments, scout regularly, and manage drainage.',
    chemical_control: 'No treatment required; apply preventive foliar fungicides only if regional disease advisories warrant.'
  },

  // ── Squash (index 25) ──
  {
    common_name: 'Squash Powdery Mildew',
    symptoms: 'White, powdery fungal spots on upper leaf surfaces spreading to cover entire leaves, causing yellowing and reduced yield.',
    cultural_control: 'Plant resistant varieties, space plants for good airflow, avoid overhead watering, and remove severely infected leaves.',
    chemical_control: 'Apply sulfur-based or systemic fungicides at first sign of disease; alternate between FRAC groups to reduce resistance.'
  },

  // ── Strawberry (indices 26-27) ──
  {
    common_name: 'Strawberry Leaf Scorch',
    symptoms: 'Irregular dark purple spots on leaves that enlarge, causing leaf margins to dry and curl upward, reducing photosynthesis.',
    cultural_control: 'Remove infected debris, renovate beds after harvest, use drip irrigation, and select resistant cultivars.',
    chemical_control: 'Apply labeled fungicides in early spring when new leaves emerge; continue through the growing season during wet weather.'
  },
  {
    common_name: 'Strawberry Healthy',
    symptoms: 'No disease symptoms detected; plants show vigorous growth with healthy green foliage and normal fruit set.',
    cultural_control: 'Maintain weed control, proper runner management, adequate fertility, and consistent irrigation.',
    chemical_control: 'No treatment required; continue preventive practices.'
  },

  // ── Tomato (indices 28-37) ──
  {
    common_name: 'Tomato Bacterial Spot',
    symptoms: 'Small dark lesions on leaves and fruit, often with yellow halos; severe cases cause defoliation and fruit spotting.',
    cultural_control: 'Use certified seed, avoid working plants when wet, rotate out of solanaceous crops, and use drip irrigation to reduce splash spread.',
    chemical_control: 'Apply copper-based bactericides with labeled protectants early in the cycle; begin before rapid spread and rotate modes where available.'
  },
  {
    common_name: 'Tomato Early Blight',
    symptoms: 'Target-like concentric lesions on older leaves with progressive yellowing and defoliation.',
    cultural_control: 'Mulch to reduce soil splash, stake plants for airflow, remove lower infected leaves, and rotate fields for at least 2 years.',
    chemical_control: 'Apply preventive fungicides at first risk period and rotate FRAC groups throughout the season.'
  },
  {
    common_name: 'Tomato Late Blight',
    symptoms: 'Water-soaked lesions that rapidly turn dark-brown to black; white sporulation may appear under humid conditions.',
    cultural_control: 'Eliminate volunteer hosts, maximize airflow, and destroy infected plants quickly to contain outbreak spread.',
    chemical_control: 'Use late-blight-specific fungicides immediately at first detection and maintain tight spray intervals during cool, wet weather.'
  },
  {
    common_name: 'Tomato Leaf Mold',
    symptoms: 'Yellow blotches on upper leaf surfaces with olive-green to gray mold growth underneath in humid environments.',
    cultural_control: 'Lower greenhouse humidity, improve ventilation, avoid excessive nitrogen, and prune for canopy openness.',
    chemical_control: 'Apply registered fungicides targeting leaf mold and alternate chemistry classes to limit resistance development.'
  },
  {
    common_name: 'Tomato Septoria Leaf Spot',
    symptoms: 'Numerous small circular spots with dark margins and tan centers, often beginning on lower leaves.',
    cultural_control: 'Remove infected debris, rotate crops, irrigate at soil level, and avoid overcrowding to limit humidity.',
    chemical_control: 'Start protectant fungicides early after transplant and continue based on weather-driven infection risk.'
  },
  {
    common_name: 'Tomato Spider Mites Two Spotted Spider Mite',
    symptoms: 'Fine stippling and bronzing on leaves with webbing in severe infestations, typically under hot and dry conditions.',
    cultural_control: 'Reduce dust, conserve beneficial predators, and maintain plant vigor to reduce stress-related susceptibility.',
    chemical_control: 'Apply selective miticides when thresholds are reached and rotate IRAC groups between applications.'
  },
  {
    common_name: 'Tomato Target Spot',
    symptoms: 'Brown lesions with concentric rings on leaves and fruit, commonly expanding during warm and humid weather.',
    cultural_control: 'Improve canopy airflow, use clean transplants, and remove infected residues after harvest.',
    chemical_control: 'Use labeled fungicides preventively in high-risk periods with strict mode-of-action rotation.'
  },
  {
    common_name: 'Tomato Tomato Yellow Leaf Curl Virus',
    symptoms: 'Upward leaf curling, yellowing, stunting, and reduced fruit set linked to whitefly-mediated viral infection.',
    cultural_control: 'Use virus-free transplants, install reflective mulch, control weeds, and manage whitefly vectors aggressively.',
    chemical_control: 'No direct curative chemistry for virus; focus on whitefly suppression with rotating insecticide classes and integrated controls.'
  },
  {
    common_name: 'Tomato Tomato Mosaic Virus',
    symptoms: 'Mosaic mottling, leaf distortion, and reduced vigor; fruit may show uneven ripening and deformities.',
    cultural_control: 'Sanitize tools, remove infected plants, avoid tobacco contamination, and use resistant cultivars when available.',
    chemical_control: 'No curative treatment for viral infection; protect healthy plants through sanitation and vector exclusion practices.'
  },
  {
    common_name: 'Tomato Healthy',
    symptoms: 'No disease symptoms detected; canopy, stems, and fruit appear normal for growth stage.',
    cultural_control: 'Continue scouting, maintain balanced nutrition, and keep foliage dry with drip irrigation and pruning.',
    chemical_control: 'No treatment required unless disease pressure increases; maintain preventive IPM schedule based on local advisories.'
  }
];

// ─── Initialize DB ──────────────────────────────────────────────────────────
const fs = require('fs');
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS treatments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    common_name TEXT UNIQUE NOT NULL,
    symptoms TEXT NOT NULL,
    cultural_control TEXT NOT NULL,
    chemical_control TEXT NOT NULL
  )
`);

const upsert = db.prepare(`
  INSERT INTO treatments (common_name, symptoms, cultural_control, chemical_control)
  VALUES (@common_name, @symptoms, @cultural_control, @chemical_control)
  ON CONFLICT(common_name) DO UPDATE SET
    symptoms = excluded.symptoms,
    cultural_control = excluded.cultural_control,
    chemical_control = excluded.chemical_control
`);

const seedTransaction = db.transaction((records) => {
  for (const record of records) {
    upsert.run(record);
  }
});

seedTransaction(seedTreatments);
console.log(`✅ Database seeded with ${seedTreatments.length} treatment records`);

// ─── Query functions ────────────────────────────────────────────────────────
function getTreatmentByCommonName(commonName) {
  return db.prepare(
    'SELECT id, common_name, symptoms, cultural_control, chemical_control FROM treatments WHERE common_name = ?'
  ).get(commonName) || null;
}

function getSpeciesList() {
  return Object.keys(manifest).map(key => ({
    key,
    label: key
      .replace(/_/g, ' ')
      .replace(/[(),]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase()),
    diseases: Object.keys(manifest[key]).map(d => ({
      key: d,
      label: d
        .replace(/_/g, ' ')
        .replace(/[(),]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, c => c.toUpperCase()),
      index: manifest[key][d]
    }))
  }));
}

module.exports = {
  getTreatmentByCommonName,
  getSpeciesList
};
