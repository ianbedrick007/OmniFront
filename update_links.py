import os
import glob

# Replace the style link in all HTML files
for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple replace
    new_content = content.replace('href="style.css"', 'href="css/main.css"')
    new_content = new_content.replace('href="./style.css"', 'href="css/main.css"')
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")

print("All HTML files updated successfully.")
