"""Собирает задания с hist-ege.sdamgia.ru по категориям -> downloads/sdamgia/tasks.json (+ картинки).

Запуск: python -X utf8 -I tools/sdamgia.py <out_dir> <category_id> [<category_id> ...]
Тело задания чистится до белого списка тегов (p, br, b, i, table, tr, td, th, img, sup, sub).
"""
import html, json, os, re, subprocess, sys, time

BASE = "https://hist-ege.sdamgia.ru"
UA = "Mozilla/5.0 (personal EGE prep)"
KEEP = {"p", "br", "b", "i", "table", "tr", "td", "th", "img", "sup", "sub", "tbody"}


def get(url, binary=False):
    for _ in range(3):
        r = subprocess.run(["curl", "-s", "-L", "--max-time", "30", "-A", UA, url], capture_output=True)
        if r.returncode == 0 and r.stdout:
            return r.stdout if binary else r.stdout.decode("utf-8", "replace")
        time.sleep(3)
    return b"" if binary else ""


def clean(fragment, out_dir, images):
    s = fragment.replace("­", "").replace("&shy;", "")
    s = re.sub(r"<!--.*?-->", "", s, flags=re.S)
    s = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", s, flags=re.S)

    def tag(m):
        closing, name, attrs = m.group(1), m.group(2).lower(), m.group(3) or ""
        if name not in KEEP:
            return ""
        if name == "img":
            src = re.search(r'src="([^"]+)"', attrs)
            if not src:
                return ""
            url = html.unescape(src.group(1))
            if url.startswith("/"):
                url = BASE + url
            if "sdamgia" not in url and "/get_file" not in url:
                return ""
            name_ = "sd_" + re.sub(r"[^A-Za-z0-9]+", "_", url.split("//", 1)[-1])[-60:]
            if not os.path.splitext(name_)[1]:
                name_ += ".png"
            path = os.path.join(out_dir, "img", name_)
            if not os.path.exists(path):
                data = get(url, binary=True)
                if data:
                    open(path, "wb").write(data)
                time.sleep(0.5)
            images.append(name_)
            return f'<img src="{name_}">'
        if name in ("td", "th") and not closing:
            span = re.search(r'colspan="(\d+)"', attrs)
            return f"<{name}{' colspan=' + chr(34) + span.group(1) + chr(34) if span else ''}>"
        return f"<{closing}{name}>"

    s = re.sub(r"<(/?)([a-zA-Z0-9]+)([^>]*)>", tag, s)
    s = re.sub(r"(\s*<br>\s*){3,}", "<br><br>", s)
    return s.strip()


def text(fragment):
    s = re.sub(r"<[^>]+>", " ", fragment.replace("­", ""))
    return re.sub(r"\s+", " ", html.unescape(s)).strip()


def parse_page(page, cat, out_dir):
    tasks = []
    parts = re.split(r'<div class="problem_container" id="problem_(\d+)">', page)
    for pid, chunk in zip(parts[1::2], parts[2::2]):
        typ = re.search(r'class="prob_nums">(.*?)&nbsp;№', chunk)
        theme = re.search(r'class="align-left"><div>(.*?)</div>', chunk, re.S)
        body = re.search(r'class="pbody">(.*?)</div></div><div[^>]+id="sol', chunk, re.S)
        sol = re.search(r'id="sol\d+"[^>]*>(.*?)(?:<div class="minor"|<div class="prob_cmt|$)', chunk, re.S)
        if not body:
            continue
        images = []
        sol_text = text(sol.group(1)) if sol else ""
        ans = re.search(r"Ответ:\s*([^\s].*?)(?:\s{2,}|$|Пояснение|Спрятать)", sol_text)
        tasks.append({
            "id": int(pid), "cat": cat,
            "type": text(typ.group(1)) if typ else "",
            "theme": text(theme.group(1)) if theme else "",
            "body": clean(body.group(1), out_dir, images),
            "solution": clean(sol.group(1), out_dir, images) if sol else "",
            "answer": ans.group(1).strip() if ans else "",
            "images": images,
        })
    return tasks


def main():
    out_dir, cats = sys.argv[1], [int(c) for c in sys.argv[2:]]
    os.makedirs(os.path.join(out_dir, "img"), exist_ok=True)
    path = os.path.join(out_dir, "tasks.json")
    done = {t["id"]: t for t in json.load(open(path, encoding="utf-8"))} if os.path.exists(path) else {}
    for cat in cats:
        first = get(f"{BASE}/test?filter=all&category_id={cat}")
        total = int((re.search(r'data-total="(\d+)"', first) or [0, 1])[1])
        n = 0
        for p in range(1, total + 1):
            page = first if p == 1 else get(f"{BASE}/test?filter=all&category_id={cat}&page={p}")
            for t in parse_page(page, cat, out_dir):
                done.setdefault(t["id"], t); n += 1
            time.sleep(1)
        print(f"cat {cat}: {total} pages, {n} tasks", flush=True)
        json.dump(list(done.values()), open(path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("total", len(done))


main()
