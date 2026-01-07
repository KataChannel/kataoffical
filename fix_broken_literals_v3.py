
import os
import re

def fix_broken_template_literal(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Broad regex to find ANY ${ followed by panelClass injection
    # Example: ${ var, panelClass: ["snackbar-success"] }
    # Or: ${ var, panelClass, ["snackbar-success"] }
    
    # Pattern 1: ${ var, panelClass: [...] }
    p1 = re.compile(r'\$\{\s*([^,;}]*),\s*panelClass:\s*\[\s*[\'"]snackbar-\w+[\'"]\s*\]\s*\}')
    new_content = p1.sub(r'${\1}', content)
    
    # Pattern 2: ${ var, panelClass: [...] )  (Missing brace)
    p2 = re.compile(r'\$\{\s*([^,;}]*),\s*panelClass:\s*\[\s*[\'"]snackbar-\w+[\'"]\s*\]\s*')
    new_content = p2.sub(r'${\1}', new_content)
    
    # Pattern 3: Case with comma instead of colon: panelClass, [...]
    p3 = re.compile(r'\$\{\s*([^,;}]*),\s*panelClass,\s*\[\s*[\'"]snackbar-\w+[\'"]\s*\]\s*\}')
    new_content = p3.sub(r'${\1}', new_content)
    
    # Pattern 4: Case where ) was injected: ${ var, panelClass: [...] })
    p4 = re.compile(r'\$\{\s*([^,;}]*),\s*panelClass:\s*\[\s*[\'"]snackbar-\w+[\'"]\s*\]\s*\}\)')
    new_content = p4.sub(r'${\1})', new_content)

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
