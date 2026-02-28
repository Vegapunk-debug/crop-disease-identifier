const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, 'data', 'treatments.db');

const seedTreatments = [
  {
    common_name: 'Apple Scab',
    symptoms: 'Olive-green to dark, velvety lesions on leaves and fruit, followed by cracking and deformation on severe infections.',
    cultural_control: 'Prune canopy for airflow, remove fallen leaves, avoid overhead irrigation, and prioritize scab-tolerant cultivars where possible.',
    chemical_control: 'Use protectant fungicides beginning at green-tip through early fruit set; rotate FRAC groups and follow local pre-harvest intervals.'
  },
  {
    common_name: 'Black Rot',
    symptoms: 'Circular leaf spots with purple margins and fruit rot that develops dark concentric rings and shriveling.',
    cultural_control: 'Sanitize mummified fruit, remove cankers during dormancy, and reduce prolonged leaf wetness with pruning and spacing.',
    chemical_control: 'Apply labeled fungicides preventively from bloom onward in wet conditions, alternating active ingredients to reduce resistance risk.'
  },
  {
    common_name: 'Cedar Apple Rust',
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
    common_name: 'Tomato Spider Mites Two-Spotted Spider Mite',
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
  },
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
  }
];

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

function getTreatmentByCommonName(commonName) {
  return db.prepare('SELECT id, common_name, symptoms, cultural_control, chemical_control FROM treatments WHERE common_name = ?').get(commonName) || null;
}

module.exports = {
  getTreatmentByCommonName
}
