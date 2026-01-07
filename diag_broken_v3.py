
import os

def check_files():
    base_dir = '/mnt/chikiet/kata2025/rausachfinalv2/frontend/src/app'
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.ts'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = f.readlines()
                        for i, line in enumerate(lines):
                            if '${' in line:
                                start_idx = line.find('${')
                                rest = line[start_idx:]
                                if '}' not in rest:
                                    if 'panelClass' in line:
                                        print("SUSPICIOUS (Missing }): " + path + ":" + str(i+1))
                                        print("  " + line.strip())
                                else:
                                    end_idx = rest.find('}')
                                    content_between = rest[:end_idx]
                                    if 'panelClass' in content_between:
                                        print("SUSPICIOUS (panelClass in ${}): " + path + ":" + str(i+1))
                                        print("  " + line.strip())
                except:
                    pass

if __name__ == "__main__":
    check_files()
