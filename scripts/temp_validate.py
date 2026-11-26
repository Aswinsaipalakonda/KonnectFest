
import xml.etree.ElementTree as ET
import glob, sys

all_valid = True
for f in glob.glob('src/fluent/pages/*.html'):
    try:
        with open(f, 'r', encoding='utf-8') as fp:
            c = fp.read()
        ET.fromstring(c)
        print('  [PASS]', f)
    except Exception as e:
        print('  [FAIL]', f, e)
        all_valid = False

if not all_valid:
    sys.exit(1)
