"""
Data Pipeline Script — Downloads, extracts, and audits the PlantVillage dataset.
Run from the ml/ directory: source venv/bin/activate && python scripts/download_dataset.py
"""
import os
import zipfile
import shutil
import tempfile

import kagglehub
from kagglehub import http_resolver
import pandas as pd


# ── Paths ──
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))
DATASET_DIR = os.path.join(PROJECT_ROOT, 'dataset')
FINAL_DATA_DIR = os.path.join(DATASET_DIR, 'PlantVillage')

os.makedirs(DATASET_DIR, exist_ok=True)
print(f"[1/4] Project topography initialized. Target: {DATASET_DIR}")


# ── Download ──
# Patch kagglehub's broken extractor to skip extraction — we do it ourselves
_saved_archive_path = [None]
_original_extract = http_resolver._extract_archive

def _capture_and_extract(archive_path, out_path):
    """Custom extractor: handles .archive extension that kagglehub chokes on."""
    print(f"  Extracting {os.path.basename(archive_path)}...")
    os.makedirs(out_path, exist_ok=True)
    # Try as zip regardless of extension
    try:
        with zipfile.ZipFile(archive_path, 'r') as zf:
            zf.extractall(out_path)
            print(f"  Extracted {len(zf.namelist())} entries.")
            return
    except zipfile.BadZipFile:
        pass
    # Fallback to tarfile
    import tarfile
    if tarfile.is_tarfile(archive_path):
        with tarfile.open(archive_path, 'r:*') as tf:
            tf.extractall(out_path)
            print(f"  Extracted (tar).")
            return
    raise ValueError(f"Cannot extract: {archive_path}")

http_resolver._extract_archive = _capture_and_extract

print("[2/4] Downloading PlantVillage dataset from Kaggle...")
cached_path = kagglehub.dataset_download("emmarex/plantdisease")
print(f"  Dataset cached at: {cached_path}")

http_resolver._extract_archive = _original_extract


# ── Normalize ──
print("[3/4] Normalizing directory structure...")

# Find the actual data
source_dir = cached_path
for _ in range(3):  # Walk down up to 3 levels of PlantVillage nesting
    nested = os.path.join(source_dir, 'PlantVillage')
    if os.path.exists(nested):
        source_dir = nested
    else:
        break

# Check if source has class directories (dirs with image files)
subdirs = [d for d in os.listdir(source_dir) if os.path.isdir(os.path.join(source_dir, d))]
if not subdirs:
    print(f"  WARNING: No subdirectories found in {source_dir}")
    print(f"  Contents: {os.listdir(source_dir)}")
else:
    print(f"  Found {len(subdirs)} class directories in source.")

# Copy to project
if os.path.exists(FINAL_DATA_DIR):
    shutil.rmtree(FINAL_DATA_DIR)
shutil.copytree(source_dir, FINAL_DATA_DIR)

# Final flatten
nested_dir = os.path.join(FINAL_DATA_DIR, 'PlantVillage')
if os.path.exists(nested_dir):
    print("  Flattening redundant nesting...")
    for item in os.listdir(nested_dir):
        shutil.move(os.path.join(nested_dir, item), os.path.join(FINAL_DATA_DIR, item))
    os.rmdir(nested_dir)

print(f"  Data ready at: {FINAL_DATA_DIR}")


# ── Audit ──
print("[4/4] Running agronomic audit...")

class_counts = {}
total_images = 0

for class_name in os.listdir(FINAL_DATA_DIR):
    class_path = os.path.join(FINAL_DATA_DIR, class_name)
    if os.path.isdir(class_path):
        num_images = len([f for f in os.listdir(class_path)
                          if f.lower().endswith(('.png', '.jpg', '.jpeg'))])
        class_counts[class_name] = num_images
        total_images += num_images

df_stats = pd.DataFrame(list(class_counts.items()), columns=['Taxonomy', 'Image Count'])
df_stats = df_stats.sort_values(by='Image Count', ascending=False).reset_index(drop=True)

print(f"\n  Total verified images: {total_images}")
print(f"  Total distinct classifications: {len(df_stats)}\n")
print("  Top 5 Dominant Classes:")
print(df_stats.head(5).to_string(index=False))
print("\n  Bottom 5 Underrepresented Classes:")
print(df_stats.tail(5).to_string(index=False))
print("\nPipeline complete.")
