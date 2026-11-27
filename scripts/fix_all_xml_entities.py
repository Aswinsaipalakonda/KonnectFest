import glob, re

replacements = {
    '&bull;': '•',
    '&rarr;': '→',
    '&larr;': '←',
    '&times;': '×',
    '&copy;': '©',
    '&nbsp;': '&#160;',
    '&check;': '✓',
    '&cross;': '✗',
}

files = glob.glob('src/fluent/pages/*.html')
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace known HTML entities
    for k, v in replacements.items():
        content = content.replace(k, v)

    # In CSS blocks (between <style> and </style>), replace bare & with 'and'
    def fix_style(match):
        css = match.group(0)
        # replace bare & (not part of &amp; etc)
        css = re.sub(r'&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)', 'and', css)
        return css

    content = re.sub(r'<style[\s\S]*?</style>', fix_style, content)

    # In comments, replace bare &
    def fix_comment(match):
        comm = match.group(0)
        comm = re.sub(r'&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)', 'and', comm)
        return comm

    content = re.sub(r'<!--[\s\S]*?-->', fix_comment, content)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed {fpath}')
