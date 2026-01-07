
import os

def check_files():
    base_dir = '/mnt/chikiet/kata2025/rausachfinalv2/frontend/src/app'
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    for i, line in enumerate(lines):
                        if '${' in line:
                            # Simple check: does it have a '}' after '${'?
                            if '}' not in line[line.find('${'):]:
                                # Possible multi-line interpolation, but if it has panelClass it's suspicious
                                if 'panelClass' in line:
                                    print(f"SUSPICIOUS (Missing }): {path}:{i+1}")
                                    print(f"  {line.strip()}")
                            elif 'panelClass' in line:
                                # Check if panelClass is BETWEEN ${ and }
                                start = line.find('${')
                                end = line.find('}', start)
                                if 'panelClass' in line[start:end]:
                                    print(f"SUSPICIOUS (panelClass in ${}): {path}:{i+1}")
                                    print(f"  {line.strip()}")

if __name__ == "__main__":
    check_files()
