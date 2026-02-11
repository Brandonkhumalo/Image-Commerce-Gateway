import fitz
import json
import sys

pdf_path = "attached_assets/dmac_1770840215393.pdf"
output_path = "extracted_content.json"
text_output_path = "extracted_content.txt"

doc = fitz.open(pdf_path)

pages = []
full_text = []

print(f"PDF has {len(doc)} pages")
print("=" * 60)

for i, page in enumerate(doc):
    text = page.get_text("text")
    pages.append({
        "page": i + 1,
        "text": text.strip()
    })
    if text.strip():
        full_text.append(f"--- PAGE {i + 1} ---")
        full_text.append(text.strip())
        print(f"Page {i + 1}: {len(text)} chars")

doc.close()

with open(text_output_path, "w") as f:
    f.write("\n\n".join(full_text))

with open(output_path, "w") as f:
    json.dump(pages, f, indent=2)

print("=" * 60)
print(f"Text saved to {text_output_path}")
print(f"JSON saved to {output_path}")
print(f"Total text length: {sum(len(p['text']) for p in pages)} chars")
