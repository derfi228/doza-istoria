"""Собирает макет в один файл: src.html + data.js + topic5.js + img/*.jpg -> index.html."""
import base64
import pathlib

here = pathlib.Path(__file__).parent
html = (here / "src.html").read_text(encoding="utf-8")
for js in ("data.js", "topic5.js", "peter.js"):
    html = html.replace(f'<script src="{js}"></script>', "<script>\n" + (here / js).read_text(encoding="utf-8") + "\n</script>")
imgs = ",\n".join(
    f'"{p.stem}":"data:image/jpeg;base64,{base64.b64encode(p.read_bytes()).decode()}"'
    for p in sorted((here / "img").glob("*.jpg"))
)
html = html.replace("const IMG = {};", "const IMG = {\n" + imgs + "\n};")
(here / "index.html").write_text(html, encoding="utf-8")
# для локального превью: на claude.ai кодировку и viewport добавляет обёртка артефакта
(here / "preview.html").write_text('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n' + html, encoding="utf-8")
print(f"index.html: {len(html.encode()) // 1024} KB")
