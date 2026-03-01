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
    chemical_control: 'Use protectant fungicides beginning at green-tip through early fruit set; rotate FRAC groups and follow local pre-harvest intervals.',
    biological_control: 'Apply Bacillus subtilis-based biocontrol agents during bloom period; consider Trichoderma spp. soil drenches to suppress overwintering inoculum.',
    prevention: 'Plant scab-resistant varieties (e.g., Liberty, Enterprise), maintain orchard sanitation by removing fallen leaves in autumn, and apply urea foliar sprays post-harvest to accelerate leaf decomposition.'
  },
  {
    common_name: 'Apple Black Rot',
    symptoms: 'Circular leaf spots with purple margins and fruit rot that develops dark concentric rings and shriveling.',
    cultural_control: 'Sanitize mummified fruit, remove cankers during dormancy, and reduce prolonged leaf wetness with pruning and spacing.',
    chemical_control: 'Apply labeled fungicides preventively from bloom onward in wet conditions, alternating active ingredients to reduce resistance risk.',
    biological_control: 'Use Trichoderma harzianum applications to compete with pathogen on pruning wounds and bark surfaces.',
    prevention: 'Remove all mummified fruit from trees and ground during dormant season, prune out cankers promptly, and maintain vigorous tree health through balanced fertilization.'
  },
  {
    common_name: 'Apple Cedar Apple Rust',
    symptoms: 'Bright yellow-orange leaf spots that later develop cup-like structures on the undersides of leaves.',
    cultural_control: 'Remove nearby juniper hosts when practical, improve airflow, and collect infected leaf litter to limit inoculum pressure.',
    chemical_control: 'Apply rust-targeted fungicides from pink bud through petal fall where disease pressure is historically high.',
    biological_control: 'Limited biocontrol options; focus on reducing juniper alternate host density within a 2-mile radius of orchards.',
    prevention: 'Plant rust-resistant apple cultivars, eliminate nearby Eastern red cedar and juniper trees, and scout for galls on junipers during late winter for removal.'
  },
  {
    common_name: 'Apple Healthy',
    symptoms: 'No disease symptoms detected; foliage and fruit appear physiologically normal.',
    cultural_control: 'Continue routine scouting, balanced fertility, pruning for light penetration, and irrigation scheduling to avoid plant stress.',
    chemical_control: 'No curative treatment needed; maintain preventive programs only when forecast and regional pressure justify applications.',
    biological_control: 'Maintain beneficial insect habitat and consider annual applications of compost tea to bolster phyllosphere microbial diversity.',
    prevention: 'Continue integrated pest management practices, regular soil testing, proper dormant pruning, and maintain tree vigor through balanced nutrition.'
  },

  // ── Blueberry (index 4) ──
  {
    common_name: 'Blueberry Healthy',
    symptoms: 'No disease symptoms detected; plant appears vigorous with normal leaf and fruit development.',
    cultural_control: 'Maintain proper soil pH (4.5-5.5), ensure adequate mulching, provide consistent irrigation, and practice annual pruning.',
    chemical_control: 'No treatment required; continue preventive monitoring during growing season.',
    biological_control: 'Encourage mycorrhizal associations through organic mulch applications; avoid excessive soil disturbance.',
    prevention: 'Test soil pH annually, use pine bark or sawdust mulch, prune oldest canes to maintain productive growth, and ensure adequate pollinator habitat.'
  },

  // ── Cherry Including Sour (indices 5-6) ──
  {
    common_name: 'Cherry Including Sour Powdery Mildew',
    symptoms: 'White powdery fungal growth on leaf surfaces, curling and distortion of new growth, and premature leaf drop.',
    cultural_control: 'Improve air circulation through pruning, avoid excessive nitrogen fertilization, and select resistant varieties when available.',
    chemical_control: 'Apply sulfur-based or systemic fungicides at first sign of infection; rotate FRAC groups to prevent resistance.',
    biological_control: 'Apply Bacillus amyloliquefaciens or potassium bicarbonate sprays as a preventive measure during early growth stages.',
    prevention: 'Avoid planting in shaded or low-airflow locations, moderate nitrogen application rates, remove water sprouts, and maintain open tree canopy architecture.'
  },
  {
    common_name: 'Cherry Including Sour Healthy',
    symptoms: 'No disease symptoms detected; tree shows normal foliage and fruit development.',
    cultural_control: 'Continue proper pruning, balanced fertilization, and pest monitoring throughout the growing season.',
    chemical_control: 'No treatment required; maintain dormant spray programs if historically needed.',
    biological_control: 'Maintain beneficial insect populations and consider compost applications to improve soil biological activity.',
    prevention: 'Regular dormant pruning for air circulation, balanced fertility program, and consistent moisture management during fruit development.'
  },

  // ── Corn Maize (indices 7-10) ──
  {
    common_name: 'Corn Maize Cercospora Leaf Spot Gray Leaf Spot',
    symptoms: 'Rectangular, gray to tan lesions running parallel to leaf veins, leading to significant leaf blight under humid conditions.',
    cultural_control: 'Rotate away from corn, use resistant hybrids, reduce surface residue through tillage, and avoid continuous corn cropping.',
    chemical_control: 'Apply foliar fungicides at VT-R1 growth stages when disease pressure is high; use products with multiple modes of action.',
    biological_control: 'Incorporate crop residue-decomposing organisms through cover cropping; Trichoderma-based seed treatments may reduce seedling infections.',
    prevention: 'Select hybrids with gray leaf spot resistance ratings, rotate with non-host crops (soybeans, wheat), and manage crop residue to reduce overwintering inoculum.'
  },
  {
    common_name: 'Corn Maize Common Rust',
    symptoms: 'Small, circular to elongated reddish-brown pustules on both leaf surfaces, releasing powdery spores when ruptured.',
    cultural_control: 'Plant resistant hybrids, ensure adequate plant spacing for airflow, and scout fields regularly during warm humid weather.',
    chemical_control: 'Apply fungicides if rust is detected before tasseling and conditions favor rapid spread; rotate FRAC groups.',
    biological_control: 'Encourage naturally occurring rust hyperparasites by minimizing broad-spectrum fungicide usage during low-pressure periods.',
    prevention: 'Plant hybrids with rust resistance genes, adjust planting dates to avoid peak spore arrival periods, and maintain balanced soil fertility.'
  },
  {
    common_name: 'Corn Maize Northern Leaf Blight',
    symptoms: 'Large, cigar-shaped grayish-green to tan lesions on leaves, starting from lower canopy and progressing upward.',
    cultural_control: 'Use resistant hybrids, rotate crops, manage residue to reduce inoculum, and maintain adequate plant nutrition.',
    chemical_control: 'Apply foliar fungicides preventively when weather conditions favor disease and susceptible hybrids are planted.',
    biological_control: 'Apply Trichoderma viride to crop residue post-harvest to accelerate decomposition and reduce overwintering pathogen levels.',
    prevention: 'Use Ht-gene resistant hybrids, practice 2+ year rotation away from corn, and incorporate or remove infected crop debris after harvest.'
  },
  {
    common_name: 'Corn Maize Healthy',
    symptoms: 'No disease symptoms detected; plant shows normal growth, leaf color, and ear development.',
    cultural_control: 'Maintain proper fertility, adequate stand density, and continue scouting for pest and disease pressure.',
    chemical_control: 'No treatment required; follow integrated pest management practices.',
    biological_control: 'Maintain diverse soil microbiome through cover cropping and minimal tillage where practical.',
    prevention: 'Continue crop rotation, soil testing, balanced fertilization, and regular field scouting throughout the growing season.'
  },

  // ── Grape (indices 11-14) ──
  {
    common_name: 'Grape Black Rot',
    symptoms: 'Circular tan leaf spots with dark margins; fruit shrivels into hard, black mummies with characteristic surface texture.',
    cultural_control: 'Remove mummified berries and infected canes during dormant pruning, improve canopy airflow, and manage floor vegetation.',
    chemical_control: 'Apply protective fungicides from early shoot growth through veraison, especially during wet springs.',
    biological_control: 'Apply Bacillus subtilis during bloom to compete with pathogen for infection sites on developing berries.',
    prevention: 'Remove all mummified fruit during dormant pruning, open canopy to promote rapid drying, and begin fungicide protection before bloom.'
  },
  {
    common_name: 'Grape Esca Black Measles',
    symptoms: 'Interveinal leaf chlorosis and necrosis creating a tiger-stripe pattern; dark streaking in wood; sudden vine collapse in severe cases.',
    cultural_control: 'Avoid large pruning wounds, protect cuts with wound sealant, remove severely affected vines, and reduce vine stress.',
    chemical_control: 'No consistently effective chemical control; focus on preventive wound protection and cultural management.',
    biological_control: 'Apply Trichoderma spp. wound dressings to pruning cuts to colonize wounds before pathogenic fungi can establish.',
    prevention: 'Make pruning cuts during late dormancy when wounds heal fastest, apply Trichoderma-based sealant within 24 hours of pruning, and maintain vine vigor.'
  },
  {
    common_name: 'Grape Leaf Blight Isariopsis Leaf Spot',
    symptoms: 'Irregular dark brown to black spots on leaves, often with yellow halos, leading to premature defoliation.',
    cultural_control: 'Remove infected leaves and debris, improve air circulation through canopy management, and avoid overhead irrigation.',
    chemical_control: 'Apply fungicides preventively during periods of high humidity and leaf wetness.',
    biological_control: 'Apply potassium bicarbonate sprays as a low-toxicity alternative to synthetic fungicides during moderate disease pressure.',
    prevention: 'Maintain open canopy through shoot positioning and leaf removal, use drip irrigation, and remove fallen leaves from vineyard floor.'
  },
  {
    common_name: 'Grape Healthy',
    symptoms: 'No disease symptoms detected; vines show normal growth, leaf color, and fruit development.',
    cultural_control: 'Continue canopy management, balanced nutrition, proper training, and regular scouting.',
    chemical_control: 'No treatment required; maintain standard preventive spray program based on regional disease pressure.',
    biological_control: 'Foster beneficial insect habitat with cover crops between vine rows; maintain soil microbial diversity.',
    prevention: 'Continue routine canopy management, balanced fertility, proper irrigation scheduling, and regular monitoring for early disease detection.'
  },

  // ── Orange (index 15) ──
  {
    common_name: 'Orange Haunglongbing Citrus Greening',
    symptoms: 'Asymmetric blotchy mottling of leaves, lopsided and bitter fruit, premature fruit drop, and progressive tree decline.',
    cultural_control: 'Control Asian citrus psyllid vector aggressively, remove infected trees promptly, use certified disease-free nursery stock.',
    chemical_control: 'No cure exists; focus on systemic insecticides for psyllid control and nutritional support to extend tree productivity.',
    biological_control: 'Release Tamarixia radiata parasitoid wasps for biological control of Asian citrus psyllid; use entomopathogenic fungi against psyllid nymphs.',
    prevention: 'Use only certified disease-free nursery stock, implement area-wide psyllid management programs, inspect new plantings regularly, and remove symptomatic trees immediately.'
  },

  // ── Peach (indices 16-17) ──
  {
    common_name: 'Peach Bacterial Spot',
    symptoms: 'Angular water-soaked leaf lesions that turn dark, leaf shot-holing, and pitted or cracked fruit with dark sunken spots.',
    cultural_control: 'Plant resistant cultivars, avoid overhead irrigation, improve airflow with proper pruning, and manage nitrogen carefully.',
    chemical_control: 'Apply copper-based bactericides during early growth; use oxytetracycline where labeled for severe pressure.',
    biological_control: 'Apply Bacillus-based biocontrol agents during early bloom to compete with bacterial populations on leaf surfaces.',
    prevention: 'Select resistant cultivars (e.g., Contender, Redhaven), orient rows for maximum airflow, avoid excessive nitrogen, and use windbreaks to reduce leaf abrasion.'
  },
  {
    common_name: 'Peach Healthy',
    symptoms: 'No disease symptoms detected; tree shows normal leaf and fruit development.',
    cultural_control: 'Continue proper pruning, thinning, fertility management, and regular pest scouting.',
    chemical_control: 'No treatment required; maintain dormant and early-season spray schedules as preventive measures.',
    biological_control: 'Maintain diverse orchard floor vegetation to support beneficial organisms and improve soil health.',
    prevention: 'Annual dormant pruning, fruit thinning for optimal size and health, balanced nutrition, and consistent moisture management.'
  },

  // ── Pepper Bell (indices 18-19) ──
  {
    common_name: 'Pepper Bell Bacterial Spot',
    symptoms: 'Small dark lesions on leaves and fruit, often with yellow halos; severe cases cause defoliation and sunken fruit spots.',
    cultural_control: 'Use certified seed, avoid working plants when wet, rotate away from solanaceous crops, use drip irrigation.',
    chemical_control: 'Apply copper-based bactericides with labeled protectants early; rotate modes of action.',
    biological_control: 'Apply Bacillus amyloliquefaciens as a seed treatment and foliar spray to outcompete bacterial spot pathogens.',
    prevention: 'Use hot-water seed treatment (125°F for 25 min), select resistant varieties, rotate 3+ years from solanaceous crops, and avoid working in wet foliage.'
  },
  {
    common_name: 'Pepper Bell Healthy',
    symptoms: 'No disease symptoms detected; plant shows vigorous growth and normal fruit development.',
    cultural_control: 'Maintain balanced nutrition, adequate spacing, and consistent moisture levels.',
    chemical_control: 'No treatment required; continue IPM practices and regular monitoring.',
    biological_control: 'Apply mycorrhizal inoculants at transplanting to improve root health and nutrient uptake.',
    prevention: 'Use clean transplants, practice crop rotation, maintain adequate calcium levels to prevent blossom end rot, and scout regularly.'
  },

  // ── Potato (indices 20-22) ──
  {
    common_name: 'Potato Early Blight',
    symptoms: 'Brown lesions with concentric rings on older leaves leading to progressive defoliation in warm conditions.',
    cultural_control: 'Rotate away from potatoes, destroy cull piles, and avoid prolonged leaf wetness through irrigation timing.',
    chemical_control: 'Begin preventive fungicides before canopy closure and rotate FRAC groups across the season.',
    biological_control: 'Apply Trichoderma harzianum soil drenches to suppress soilborne inoculum; Bacillus subtilis foliar sprays may reduce leaf infection.',
    prevention: 'Use certified disease-free seed potatoes, practice 3-year rotation, avoid overhead irrigation, and maintain adequate fertility to keep plants vigorous.'
  },
  {
    common_name: 'Potato Late Blight',
    symptoms: 'Rapidly expanding water-soaked lesions with potential white growth on leaf undersides in humid weather.',
    cultural_control: 'Use certified seed, kill volunteer plants, and remove infected foliage promptly to reduce inoculum.',
    chemical_control: 'Apply late-blight-active fungicides on short intervals during cool, wet periods and rotate active ingredients.',
    biological_control: 'Limited biological options for established infections; preventive Trichoderma applications may reduce soilborne phases of disease cycle.',
    prevention: 'Plant certified seed only, destroy cull piles, kill volunteer plants, monitor weather forecasts for late blight risk alerts, and respond immediately to symptoms.'
  },
  {
    common_name: 'Potato Healthy',
    symptoms: 'No disease indicators observed; foliage and stems are healthy for current growth stage.',
    cultural_control: 'Maintain scouting cadence, balanced fertilization, and proper hilling and irrigation management.',
    chemical_control: 'No disease-specific chemical treatment required; continue preventive practices based on forecast risk.',
    biological_control: 'Maintain healthy soil microbiome through cover cropping and organic matter additions.',
    prevention: 'Use certified seed, practice crop rotation, maintain proper hilling to protect tubers, and scout regularly for early disease detection.'
  },

  // ── Raspberry (index 23) ──
  {
    common_name: 'Raspberry Healthy',
    symptoms: 'No disease symptoms detected; canes and foliage appear healthy and vigorous.',
    cultural_control: 'Remove spent floricanes after harvest, thin primocanes for airflow, maintain proper fertility and weed control.',
    chemical_control: 'No treatment required; continue preventive lime-sulfur dormant sprays if historically needed.',
    biological_control: 'Encourage beneficial soil organisms by maintaining organic mulch layer and avoiding excessive tillage.',
    prevention: 'Annual removal of spent canes, thinning for airflow, maintaining weed-free rows, and monitoring for early signs of cane diseases.'
  },

  // ── Soybean (index 24) ──
  {
    common_name: 'Soybean Healthy',
    symptoms: 'No disease symptoms detected; plants show uniform growth, green foliage, and normal pod set.',
    cultural_control: 'Rotate crops, use quality seed with seed treatments, scout regularly, and manage drainage.',
    chemical_control: 'No treatment required; apply preventive foliar fungicides only if regional disease advisories warrant.',
    biological_control: 'Maintain Bradyrhizobium inoculant efficacy through proper seed treatment timing and storage conditions.',
    prevention: 'Rotate with non-legume crops, use high-quality treated seed, maintain proper drainage, and scout for early disease symptoms.'
  },

  // ── Squash (index 25) ──
  {
    common_name: 'Squash Powdery Mildew',
    symptoms: 'White, powdery fungal spots on upper leaf surfaces spreading to cover entire leaves, causing yellowing and reduced yield.',
    cultural_control: 'Plant resistant varieties, space plants for good airflow, avoid overhead watering, and remove severely infected leaves.',
    chemical_control: 'Apply sulfur-based or systemic fungicides at first sign of disease; alternate between FRAC groups to reduce resistance.',
    biological_control: 'Apply Bacillus amyloliquefaciens or neem oil sprays preventively; potassium bicarbonate is effective as a contact biocontrol.',
    prevention: 'Select powdery mildew-resistant varieties, ensure 3-4 foot plant spacing, use drip irrigation, and remove crop debris after harvest.'
  },

  // ── Strawberry (indices 26-27) ──
  {
    common_name: 'Strawberry Leaf Scorch',
    symptoms: 'Irregular dark purple spots on leaves that enlarge, causing leaf margins to dry and curl upward, reducing photosynthesis.',
    cultural_control: 'Remove infected debris, renovate beds after harvest, use drip irrigation, and select resistant cultivars.',
    chemical_control: 'Apply labeled fungicides in early spring when new leaves emerge; continue through the growing season during wet weather.',
    biological_control: 'Apply Bacillus subtilis-based products during early spring leaf emergence to establish beneficial microbial populations.',
    prevention: 'Select resistant cultivars, renovate beds annually by mowing and thinning, use drip irrigation to keep foliage dry, and remove infected leaf debris promptly.'
  },
  {
    common_name: 'Strawberry Healthy',
    symptoms: 'No disease symptoms detected; plants show vigorous growth with healthy green foliage and normal fruit set.',
    cultural_control: 'Maintain weed control, proper runner management, adequate fertility, and consistent irrigation.',
    chemical_control: 'No treatment required; continue preventive practices.',
    biological_control: 'Apply mycorrhizal inoculants during transplanting and maintain organic mulch to support soil microbial diversity.',
    prevention: 'Maintain clean planting material, practice crop rotation, renovate beds annually, and maintain proper spacing for air circulation.'
  },

  // ── Tomato (indices 28-37) ──
  {
    common_name: 'Tomato Bacterial Spot',
    symptoms: 'Small dark lesions on leaves and fruit, often with yellow halos; severe cases cause defoliation and fruit spotting.',
    cultural_control: 'Use certified seed, avoid working plants when wet, rotate out of solanaceous crops, and use drip irrigation to reduce splash spread.',
    chemical_control: 'Apply copper-based bactericides with labeled protectants early in the cycle; begin before rapid spread and rotate modes where available.',
    biological_control: 'Apply Bacillus amyloliquefaciens as a preventive foliar treatment; use bacteriophage-based biocontrol products where available.',
    prevention: 'Use hot-water treated seed, select resistant varieties, rotate 2-3 years from solanaceous crops, and avoid overhead irrigation.'
  },
  {
    common_name: 'Tomato Early Blight',
    symptoms: 'Target-like concentric lesions on older leaves with progressive yellowing and defoliation.',
    cultural_control: 'Mulch to reduce soil splash, stake plants for airflow, remove lower infected leaves, and rotate fields for at least 2 years.',
    chemical_control: 'Apply preventive fungicides at first risk period and rotate FRAC groups throughout the season.',
    biological_control: 'Apply Trichoderma-based soil amendments at transplanting; Bacillus subtilis foliar sprays provide moderate suppression.',
    prevention: 'Stake or cage plants, apply 3-4 inches of mulch around bases, remove lower leaves touching soil, and begin fungicide program before symptoms appear.'
  },
  {
    common_name: 'Tomato Late Blight',
    symptoms: 'Water-soaked lesions that rapidly turn dark-brown to black; white sporulation may appear under humid conditions.',
    cultural_control: 'Eliminate volunteer hosts, maximize airflow, and destroy infected plants quickly to contain outbreak spread.',
    chemical_control: 'Use late-blight-specific fungicides immediately at first detection and maintain tight spray intervals during cool, wet weather.',
    biological_control: 'Limited biocontrol efficacy against late blight; focus on prevention and rapid chemical response during outbreaks.',
    prevention: 'Monitor USABlight.org for regional alerts, use only healthy transplants, destroy cull piles, and act immediately at first symptoms.'
  },
  {
    common_name: 'Tomato Leaf Mold',
    symptoms: 'Yellow blotches on upper leaf surfaces with olive-green to gray mold growth underneath in humid environments.',
    cultural_control: 'Lower greenhouse humidity, improve ventilation, avoid excessive nitrogen, and prune for canopy openness.',
    chemical_control: 'Apply registered fungicides targeting leaf mold and alternate chemistry classes to limit resistance development.',
    biological_control: 'Apply Bacillus amyloliquefaciens preventively in greenhouse environments; maintain humidity below 85% to suppress sporulation.',
    prevention: 'Maintain greenhouse relative humidity below 85%, increase ventilation and spacing, use resistant varieties (Cf gene series), and avoid wetting foliage.'
  },
  {
    common_name: 'Tomato Septoria Leaf Spot',
    symptoms: 'Numerous small circular spots with dark margins and tan centers, often beginning on lower leaves.',
    cultural_control: 'Remove infected debris, rotate crops, irrigate at soil level, and avoid overcrowding to limit humidity.',
    chemical_control: 'Start protectant fungicides early after transplant and continue based on weather-driven infection risk.',
    biological_control: 'Apply Bacillus subtilis foliar sprays during early growth to establish competitive microbial populations on leaf surfaces.',
    prevention: 'Remove crop debris thoroughly at end of season, maintain 3-foot spacing, mulch to prevent soil splash, and begin preventive fungicides early.'
  },
  {
    common_name: 'Tomato Spider Mites Two Spotted Spider Mite',
    symptoms: 'Fine stippling and bronzing on leaves with webbing in severe infestations, typically under hot and dry conditions.',
    cultural_control: 'Reduce dust, conserve beneficial predators, and maintain plant vigor to reduce stress-related susceptibility.',
    chemical_control: 'Apply selective miticides when thresholds are reached and rotate IRAC groups between applications.',
    biological_control: 'Release Phytoseiulus persimilis or Neoseiulus californicus predatory mites; maintain habitat for naturally occurring predators.',
    prevention: 'Avoid excessive nitrogen (promotes lush growth favored by mites), reduce dust on roadways near fields, conserve predatory mites by avoiding broad-spectrum insecticides.'
  },
  {
    common_name: 'Tomato Target Spot',
    symptoms: 'Brown lesions with concentric rings on leaves and fruit, commonly expanding during warm and humid weather.',
    cultural_control: 'Improve canopy airflow, use clean transplants, and remove infected residues after harvest.',
    chemical_control: 'Use labeled fungicides preventively in high-risk periods with strict mode-of-action rotation.',
    biological_control: 'Apply Trichoderma-based soil drenches to reduce soilborne inoculum; Bacillus foliar sprays may offer moderate suppression.',
    prevention: 'Use clean transplants, maintain adequate plant spacing, remove lower leaves, and destroy infected crop debris at end of season.'
  },
  {
    common_name: 'Tomato Tomato Yellow Leaf Curl Virus',
    symptoms: 'Upward leaf curling, yellowing, stunting, and reduced fruit set linked to whitefly-mediated viral infection.',
    cultural_control: 'Use virus-free transplants, install reflective mulch, control weeds, and manage whitefly vectors aggressively.',
    chemical_control: 'No direct curative chemistry for virus; focus on whitefly suppression with rotating insecticide classes and integrated controls.',
    biological_control: 'Release Encarsia formosa or Eretmocerus eremicus parasitoid wasps for whitefly biocontrol; use Beauveria bassiana against whitefly nymphs.',
    prevention: 'Use TYLCV-resistant tomato varieties, install insect exclusion netting, use reflective silver mulch to repel whiteflies, and remove infected plants immediately.'
  },
  {
    common_name: 'Tomato Tomato Mosaic Virus',
    symptoms: 'Mosaic mottling, leaf distortion, and reduced vigor; fruit may show uneven ripening and deformities.',
    cultural_control: 'Sanitize tools, remove infected plants, avoid tobacco contamination, and use resistant cultivars when available.',
    chemical_control: 'No curative treatment for viral infection; protect healthy plants through sanitation and vector exclusion practices.',
    biological_control: 'No effective biological control for ToMV; focus entirely on prevention and sanitation measures.',
    prevention: 'Wash hands and disinfect tools between plants (10% bleach or milk solution), avoid tobacco products near tomatoes, use TMV-resistant varieties (Tm-2 gene).'
  },
  {
    common_name: 'Tomato Healthy',
    symptoms: 'No disease symptoms detected; canopy, stems, and fruit appear normal for growth stage.',
    cultural_control: 'Continue scouting, maintain balanced nutrition, and keep foliage dry with drip irrigation and pruning.',
    chemical_control: 'No treatment required unless disease pressure increases; maintain preventive IPM schedule based on local advisories.',
    biological_control: 'Apply compost tea or Trichoderma soil amendments to maintain healthy root zone microbiome.',
    prevention: 'Continue crop rotation, balanced fertilization, regular scouting, adequate spacing, and proper irrigation management.'
  }
];

// ─── Initialize DB ──────────────────────────────────────────────────────────
const fs = require('fs');
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(DB_PATH);

// Drop and recreate table to add new columns cleanly
db.exec(`DROP TABLE IF EXISTS treatments`);
db.exec(`
  CREATE TABLE treatments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    common_name TEXT UNIQUE NOT NULL,
    symptoms TEXT NOT NULL,
    cultural_control TEXT NOT NULL,
    chemical_control TEXT NOT NULL,
    biological_control TEXT NOT NULL DEFAULT '',
    prevention TEXT NOT NULL DEFAULT ''
  )
`);

const upsert = db.prepare(`
  INSERT INTO treatments (common_name, symptoms, cultural_control, chemical_control, biological_control, prevention)
  VALUES (@common_name, @symptoms, @cultural_control, @chemical_control, @biological_control, @prevention)
  ON CONFLICT(common_name) DO UPDATE SET
    symptoms = excluded.symptoms,
    cultural_control = excluded.cultural_control,
    chemical_control = excluded.chemical_control,
    biological_control = excluded.biological_control,
    prevention = excluded.prevention
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
    'SELECT id, common_name, symptoms, cultural_control, chemical_control, biological_control, prevention FROM treatments WHERE common_name = ?'
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
