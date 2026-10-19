"""Раскладывает задания «Решу ЕГЭ» по темам сайта -> docs/data/ege.js, картинки -> docs/img/ege/.

Тема задания = самая поздняя тема, к которой оно относится (по годам и ключевым словам),
чтобы задание не всплыло раньше, чем пройдены все нужные темы.
Запуск: python -X utf8 -I tools/build_ege.py
"""
import html, json, os, re, shutil

SRC = "downloads/sdamgia"
OUT_JS = "docs/data/ege.js"
OUT_IMG = "docs/img/ege"

KEYS = {
    1: ["вятич", "кривич", "радимич", "дрегович", "ильменск", "языческ", "волхв", "капищ", "вервь", "подсечн", "перелож",
        "бортнич", "анты\b", "склавин", "венед", "соседск", "родов(ая|ой|ую) общин", "племенн", "варяг в греки", "даждьбог", "макошь", "стрибог"],
    2: ["рюрик", "синеус", "трувор", "аскольд", "олег", "игор[ья]", "ольг[аиеуо]", "святослав", "владимир святой", "владимир i ",
        "крещени", "корсун", "херсонес", "десятинн", "полюдь", "повоз", "погост", "древлян", "искоростен", "царьград",
        "цимисх", "доростол", "печенег", "хазар", "норманск", "ярополк", "добрын", "малуш", "перун"],
    3: ["ярослав", "русская правда", "русской правды", "русской правде", "святополк", "борис", "глеб", "тмутаракан", "иларион",
        "слово о законе", "любеч", "мономах", "поучени", "повесть временных лет", "нестор", "половц", "альт[еау]\b", "нежатин",
        "изяслав", "смерд", "закуп", "рядович", "холоп", "софийск", "остромиров", "лествичн", "митрополит", "мстислав"],
    4: ["раздробленност", "удельн", "долгорук", "боголюбск", "большое гнездо", "всеволод iii", "галицк", "волын", "осмомысл",
        "роман мстиславич", "посадник", "тысяцк", "архиепископ", "веч[еау]\b", "вечев", "слово о полку", "покрова на нерли", "дмитриевск",
        "золотые ворота", "боголюбов", "владимиро-суздальск", "ростово-суздальск", "кучков", "кончак", "владимирской богоматери"],
    5: ["батый", "батыя", "батыю", "бату\b", "калк", "монгол", "татар", "орд[аыеуо]", "ярлык", "баскак", "численник", "козельск",
        "евпатий", "коловрат", "сит[ьи]\b", "чингис", "субэдэ", "джэбэ", "джебе", "неврю", "дюден", "сарай", "курултай"],
    6: ["невск", "ледов", "чудск", "тевтон", "биргер", "ливонск"],
}
LATER = ["москв", "калит", "донск", "куликов", "мама[йяе]", "тохтамыш", "иван iii", "ивана iii", "иван iv", "ивана iv", "грозн",
         "василий", "василия", "дмитрий", "дмитрия", "твер", "опричн", "земщин", "смут", "годунов", "романов", "шуйск",
         "лжедмитр", "минин", "пожарск", "алексей михайлович", "никон", "разин", "судебник", "палеолог", "стрелец", "стрельц", "стоглав",
         "казан", "астрахан", "ермак", "сибир", "пётр", "петр ", "кремл", "радонежск", "рублёв", "рублев", "феофан",
         "дионисий", "задонщин", "хождение за три", "афанасий", "местничеств", "поместь", "кормлени", "юрьев день",
         "заповедн", "избранная рада", "избранной рады", "земский собор", "соборное уложение", "государь всея", "ливонская война",
         "литов", "ольгерд", "ягайл", "витовт", "угр[еау]\b", "новгородская республика была", "приказ(ы|ов|ная)\b", "крепостн"]

ROMAN = {"IX": 2, "X": 2, "XI": 3, "XII": 4, "XIII": 5}


def plain(s):
    s = re.sub(r"<[^>]+>", " ", s)
    s = html.unescape(s).replace("­", "").replace(" ", " ").replace("⁠", "").replace("\xa0", " ")
    return re.sub(r"\s+", " ", s).strip()


def has(low, keys):
    return any(re.search(r"(?<![а-яё])" + k, low) for k in keys)


def topic_of(text):
    low = text.lower()
    if has(low, LATER):
        return None
    hits = set()
    for y in re.findall(r"(?<!\d)(\d{3,4})(?:\s?г|\s?—|\s?–|-|\)|\.|,|\s)", text):
        y = int(y)
        if 1300 <= y <= 2100:
            return None
        if 800 <= y < 862: hits.add(1)
        elif y < 1019: hits.add(2)
        elif y < 1132: hits.add(3)
        elif y < 1223: hits.add(4)
        elif y < 1300: hits.add(5)
    for rom, tp in ROMAN.items():
        if re.search(rf"\b{rom}\s*(?:в\.|век)", text):
            hits.add(tp)
    if re.search(r"\bX[IV]{1,3}V?\s*(?:в\.|век)", text) and re.search(r"\bX(?:IV|V|VI|VII)\s*(?:в\.|век)", text):
        return None
    for tp, ks in KEYS.items():
        if has(low, ks):
            hits.add(tp)
    return max(hits) if hits else None


def parse_answer(a):
    a = plain(a)
    if "Ответ:" in a:
        a = a.rsplit("Ответ:", 1)[1]
    a = re.split(r"\s*Источник|\s{2,}|\s*Приведём|\s*Примечание", a)[0].strip().rstrip(".")
    return a


def kind_of(body, ans):
    b = plain(body).lower()
    if not ans:
        return "open"
    if not re.fullmatch(r"[\d]+", ans):
        return "word" if len(ans) <= 40 else None
    if "последовательност" in b or "расположите" in b:
        return "order"
    if "соответстви" in b:
        return "match"
    if "выберите" in b or "верных" in b or "верные" in b:
        return "multi"
    return "choice"


def topic_text(body, kind, ans):
    """Текст для определения темы: без ссылок на источник; в выборе одного ответа — только вопрос и верный вариант."""
    text = re.sub(r"Источник:.*", "", plain(body))
    if kind == "choice" and ans.isdigit():
        parts = re.split(r"(?<![\d.])([1-9])[).]\s?(?=\D)", text)
        if len(parts) > 2:
            opts = dict(zip(parts[1::2], parts[2::2]))
            return parts[0] + " " + opts.get(ans, "")
    return text


def clean_html(s):
    s = s.replace("­", "")
    s = re.sub(r'<img src="(sd_[^"]+)">', lambda m: f'<img src="img/ege/{m.group(1)}" loading="lazy">', s)
    s = re.sub(r"(<p>\s*(&nbsp;)?\s*</p>\s*){2,}", "<p>&nbsp;</p>", s)
    return s.strip()


def main():
    tasks = json.load(open(os.path.join(SRC, "tasks.json"), encoding="utf-8"))
    os.makedirs(OUT_IMG, exist_ok=True)
    out, seen, dist = [], set(), {}
    for t in tasks:
        key = plain(t["body"])[:160]
        if key in seen:
            continue
        ans = parse_answer(t["answer"])
        kind = kind_of(t["body"], ans)
        if not kind:
            continue
        tp = topic_of(topic_text(t["body"], kind, ans))
        if not tp:
            continue
        if any(not os.path.exists(os.path.join(SRC, "img", im)) for im in t["images"]):
            continue
        for im in t["images"]:
            shutil.copy(os.path.join(SRC, "img", im), os.path.join(OUT_IMG, im))
        sol = re.sub(r"^\s*<p>\s*</p>\s*", "", t["solution"])
        out.append({"id": t["id"], "tp": tp, "kind": kind, "type": t["type"], "body": clean_html(t["body"]),
                    "sol": clean_html(sol), "ans": ans})
        seen.add(key)
        dist[tp] = dist.get(tp, 0) + 1
    with open(OUT_JS, "w", encoding="utf-8") as f:
        f.write("// Задания «Решу ЕГЭ» (hist-ege.sdamgia.ru), разложены по темам tools/build_ege.py\n")
        f.write("const EGE = " + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n")
    kinds = {}
    for t in out:
        kinds[t["kind"]] = kinds.get(t["kind"], 0) + 1
    print("tasks:", len(out), "by topic:", dict(sorted(dist.items())), "kinds:", kinds, f"{os.path.getsize(OUT_JS) // 1024} KB")


main()
