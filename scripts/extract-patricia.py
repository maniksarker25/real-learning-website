"""
Cut the Patricia character sheet into individual transparent PNGs.

Usage:
    python scripts/extract-patricia.py <path-to-sheet.png> [out_dir]

Crop boxes are defined for the 1536x1024 sheet and scale automatically if
you supply a higher-resolution export of the same layout.
"""

import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

BASE_W, BASE_H = 1536, 1024

# name: (left, top, right, bottom) in 1536x1024 coordinates, above the labels
BOXES = {
    # full body
    "full-body": (12, 48, 300, 592),
    # facial expressions row 1
    "normal": (323, 58, 512, 268),
    "happy": (512, 58, 690, 268),
    "laughing": (690, 58, 866, 268),
    "excited": (866, 58, 1043, 268),
    "surprised": (1043, 58, 1220, 268),
    # facial expressions row 2
    "angry": (323, 312, 512, 530),
    "sad": (512, 312, 690, 530),
    "thinking": (690, 312, 866, 530),
    "confused": (866, 312, 1043, 530),
    "shy": (1043, 312, 1220, 530),
    # side & back views
    "view-side": (1228, 72, 1382, 280),
    "view-back": (1382, 72, 1528, 280),
    "view-three-quarter": (1226, 322, 1382, 540),
    "view-angle": (1382, 322, 1528, 540),
    # body poses
    "pose-pointing": (14, 646, 208, 962),
    "pose-thumbs-up": (200, 618, 378, 962),
    "pose-cross-arms": (378, 618, 540, 962),
    "pose-thinking": (540, 618, 700, 962),
    "pose-wave": (698, 618, 862, 962),
    # hands / assets
    "hand-point": (880, 652, 972, 748),
    "hand-peace": (972, 652, 1066, 748),
    "hand-open": (1066, 652, 1162, 748),
    "hand-fist": (1162, 652, 1256, 748),
    "hand-thumbs-up": (880, 748, 972, 848),
    "hand-ok": (972, 748, 1066, 848),
    "hand-heart": (1066, 748, 1162, 848),
    "hand-finger-guns": (1162, 748, 1256, 848),
    "hand-phone": (880, 848, 972, 965),
    "hand-phone-tilt": (972, 848, 1066, 965),
    "hand-phone-front": (1066, 848, 1162, 965),
    "hand-coffee": (1162, 848, 1256, 965),
    # effect stickers (extras panel)
    "fx-sparkles": (1438, 646, 1512, 709),
    "fx-anger": (1283, 724, 1346, 790),
    "fx-question": (1361, 719, 1416, 791),
    "fx-exclaim": (1436, 721, 1496, 791),
    "fx-scribble": (1281, 801, 1349, 874),
    "fx-speech": (1359, 801, 1447, 879),
    "fx-zzz": (1446, 804, 1519, 864),
}


def is_background(rgb: np.ndarray) -> np.ndarray:
    r, g, b = (rgb[..., i].astype(int) for i in range(3))
    mint = (g > 150) & (b > 160) & (g - r > 45) & (np.abs(g - b) < 45)
    # purple label pills
    purple = (b > 150) & (r > 80) & (g < r - 20) & (b - g > 60)
    # light lavender label fill / panel border highlights
    return mint | purple


def components(mask: np.ndarray):
    """4-connected component labelling (pure python BFS)."""
    h, w = mask.shape
    labels = np.zeros((h, w), dtype=np.int32)
    comps = []
    cur = 0
    for y in range(h):
        for x in range(w):
            if mask[y, x] and not labels[y, x]:
                cur += 1
                q = deque([(y, x)])
                labels[y, x] = cur
                size, touches = 0, False
                while q:
                    cy, cx = q.popleft()
                    size += 1
                    if cy in (0, h - 1) or cx in (0, w - 1):
                        touches = True
                    for ny, nx in ((cy + 1, cx), (cy - 1, cx), (cy, cx + 1), (cy, cx - 1)):
                        if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not labels[ny, nx]:
                            labels[ny, nx] = cur
                            q.append((ny, nx))
                comps.append((cur, size, touches))
    return labels, comps


def cut(crop: Image.Image) -> Image.Image:
    rgb = np.asarray(crop.convert("RGB"))
    bg = is_background(rgb)

    # background = bg-coloured regions connected to the crop edge
    lab, comps = components(bg)
    edge_bg = np.isin(lab, [c for c, _, t in comps if t])

    # enclosed gaps (between curls, inside hand shapes, between legs) that are
    # clearly the sheet's mint colour – strict match so tears/highlights survive
    r, g, b = (rgb[..., i].astype(int) for i in range(3))
    pure_mint = (g > 215) & (b > 200) & (r > 100) & (r < 185) & (g - r > 60) & (np.abs(g - b) < 30)
    lab2, comps2 = components(pure_mint & ~edge_bg)
    holes = np.isin(lab2, [c for c, s, _ in comps2 if s >= 6])
    # include the soft anti-aliased ring around each hole
    holes_img = Image.fromarray(holes.astype(np.uint8) * 255).filter(ImageFilter.MaxFilter(3))
    holes = (np.asarray(holes_img) > 0) & bg

    fg = ~(edge_bg | holes)

    # keep the character + its effects; drop slivers of neighbours on the edges
    lab, comps = components(fg)
    if not comps:
        return crop.convert("RGBA")
    biggest = max(comps, key=lambda c: c[1])
    keep = [biggest[0]] + [
        c for c, s, t in comps
        if c != biggest[0] and s > 25 and (not t or s > biggest[1] * 0.15)
    ]
    alpha = np.isin(lab, keep).astype(np.uint8) * 255

    # tidy the edge: shave 1px of mint fringe, then soften slightly
    a = Image.fromarray(alpha).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    out = crop.convert("RGBA")
    out.putalpha(a)
    bbox = a.point(lambda v: 255 if v > 8 else 0).getbbox()
    return out.crop(bbox) if bbox else out


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    sheet = Image.open(sys.argv[1]).convert("RGB")
    out_dir = Path(sys.argv[2] if len(sys.argv) > 2 else "public/images/patricia")
    out_dir.mkdir(parents=True, exist_ok=True)
    sx, sy = sheet.width / BASE_W, sheet.height / BASE_H

    for name, (l, t, r, b) in BOXES.items():
        box = (round(l * sx), round(t * sy), round(r * sx), round(b * sy))
        img = cut(sheet.crop(box))
        img.save(out_dir / f"{name}.png", optimize=True)
        print(f"{name}.png  {img.size}")


if __name__ == "__main__":
    main()
