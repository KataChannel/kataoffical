
import os
import re

def fix_broken_template_literal(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to find the broken injection: ${ var, panelClass: [...] }
    # and change it back to ${ var }
    # We also need to handle cases where it might have injected other things if I'm not careful,
    # but the grep showed mainly panelClass.
    
    # regex: \$\{\s*([^,}]*),\s*panelClass:\s*\[\s*['\"]snackbar-\w+['\"]\s*\]\s*\}
    new_content = re.sub(r'\$\{\s*([^,}]*),\s*panelClass:\s*\[\s*[\'"]snackbar-\w+[\'"]\s*\]\s*\}', r'${\1}', content)
    
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
