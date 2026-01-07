
import os
import re

def fix_broken_template_literal(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to find the broken injection: ${ var, panelClass: [...] }
    # We match everything from ${ until the next } or ) or `
    # and if it contains panelClass, we try to recover the variable.
    
    # We'll use a regex that finds ${ followed by characters and panelClass
    pattern = re.compile(r'\$\{\s*([^,;}]*),\s*panelClass:\s*\[\s*[\'"]snackbar-\w+[\'"]\s*\]\s*\}')
    new_content = pattern.sub(r'${\1}', content)
    
    # Also handle cases where it might be missing the } due to some weirdness
    pattern2 = re.compile(r'\$\{\s*([^,;}]*),\s*panelClass:\s*\[\s*[\'"]snackbar-\w+[\'"]\s*\]\s*')
    new_content = pattern2.sub(r'${\1}', new_content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    count = 0
    for r, d, files in os.walk('/mnt/chikiet/kata2025/rausachfinalv2/frontend/src/app'):
        for f in files:
            if f.endswith('.ts'):
                if fix_broken_template_literal(os.path.join(r, f)):
                    count += 1
    print(f"Fixed {count} files")

if __name__ == "__main__":
    main()
