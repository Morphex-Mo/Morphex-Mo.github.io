# Academic Column and Seven Literature Reports Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a top-level “学术” navigation tab that aggregates tagged posts, publish seven standalone academic literature reports as normal posts, and remove the former combined report.

**Architecture:** Keep every report in the existing `_posts` collection so Chirpy automatically includes it in the home feed, categories, tags, archives, search, and post pages. Add one local academic layout and one tab definition; the layout reads `site.tags['学术']` and renders only those posts in a Chirpy-style card list. Store design and implementation documents under `docs/`, which `_config.yml` already excludes from the generated site.

**Tech Stack:** Jekyll, Chirpy 7.4.1, Liquid, Markdown, Font Awesome, Python 3 verification script, existing Jekyll/html-proofer build workflow.

---

## File Structure

**Create**

- `_layouts/academic.html`: renders the tag-filtered academic post list.
- `_tabs/academic.md`: registers the top-level navigation tab and graduation-cap icon.
- `_posts/2026-07-18-s5-baseline-systems-and-metrics.md`: report 1.
- `_posts/2026-07-18-dcase2025-task4-description.md`: report 2.
- `_posts/2026-07-18-s5-enriched-features-agent-correction.md`: report 3.
- `_posts/2026-07-18-casa-sdr-metric-analysis.md`: report 4.
- `_posts/2026-07-18-self-guided-tse-multiple-clues.md`: report 5.
- `_posts/2026-07-18-dcase2025-task4-challenge-review.md`: report 6.
- `_posts/2026-07-18-fsd50k-dataset-reading-report.md`: report 7.
- `tools/check_academic_content.py`: deterministic source-level verification.

**Delete**

- `output/literature/ADQA_相关文献阅读与研究启发.md`: obsolete combined report.
- Remove `output/literature/` and `output/` only if they are empty after deleting the report.

**Do not modify**

- `docs/superpowers/specs/2026-07-18-academic-column-design.md`: reference-only design document.
- `_config.yml`: it already excludes `docs` and already configures tabs/posts correctly.
- Existing posts and unrelated user changes.

---

### Task 1: Add Failing Academic-Content Verification

**Files:**

- Create: `tools/check_academic_content.py`

- [ ] **Step 1: Create the source-level checker**

Use this complete script:

```python
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
TAB = ROOT / "_tabs" / "academic.md"
LAYOUT = ROOT / "_layouts" / "academic.html"
COMBINED = ROOT / "output" / "literature" / "ADQA_相关文献阅读与研究启发.md"

POSTS = [
    "2026-07-18-s5-baseline-systems-and-metrics.md",
    "2026-07-18-dcase2025-task4-description.md",
    "2026-07-18-s5-enriched-features-agent-correction.md",
    "2026-07-18-casa-sdr-metric-analysis.md",
    "2026-07-18-self-guided-tse-multiple-clues.md",
    "2026-07-18-dcase2025-task4-challenge-review.md",
    "2026-07-18-fsd50k-dataset-reading-report.md",
]

REQUIRED_HEADINGS = [
    "## 文献信息",
    "## 研究背景与核心问题",
    "## 方法与技术路线",
    "## 实验与关键结果",
    "## 核心贡献",
    "## 局限与批判性分析",
    "## 读后感",
    "## 新思路",
    "## 对 ADQA 研究的启发",
    "## 总结",
]


def read(path: Path) -> str:
    if not path.is_file():
        raise AssertionError(f"missing file: {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


def front_matter(text: str) -> str:
    match = re.match(r"\A---\s*\n(.*?)\n---\s*\n", text, re.S)
    if not match:
        raise AssertionError("missing or malformed YAML front matter")
    return match.group(1)


def check_tab() -> None:
    tab = read(TAB)
    layout = read(LAYOUT)
    fm = front_matter(tab)
    assert re.search(r"^title:\s*学术\s*$", fm, re.M), "tab title must be 学术"
    assert re.search(r"^layout:\s*academic\s*$", fm, re.M), "tab layout must be academic"
    assert re.search(r"^icon:\s*fas fa-graduation-cap\s*$", fm, re.M), "wrong tab icon"
    assert re.search(r"^order:\s*4\s*$", fm, re.M), "academic tab must follow archives"
    assert "site.tags['学术']" in layout, "layout must filter the 学术 tag"
    assert 'id="post-list"' in layout, "layout must use the Chirpy post-list container"
    assert "academic_posts" in layout, "layout must name the filtered collection"


def check_post(filename: str) -> None:
    path = ROOT / "_posts" / filename
    text = read(path)
    fm = front_matter(text)
    assert re.search(r"^title:\s*.+$", fm, re.M), f"{filename}: missing title"
    assert re.search(r"^date:\s*2026-07-18 .+\+0800\s*$", fm, re.M), f"{filename}: wrong date"
    categories = re.search(r"^categories:\s*\[(.*?)\]\s*$", fm, re.M)
    tags = re.search(r"^tags:\s*\[(.*?)\]\s*$", fm, re.M)
    assert categories and "学术" in categories.group(1) and "音频研究" in categories.group(1), (
        f"{filename}: categories must include 学术 and 音频研究"
    )
    assert tags and "学术" in tags.group(1) and "ADQA" in tags.group(1), (
        f"{filename}: tags must include 学术 and ADQA"
    )
    assert re.search(r"^description:\s*.+$", fm, re.M), f"{filename}: missing description"
    assert re.search(r"^toc:\s*true\s*$", fm, re.M), f"{filename}: toc must be enabled"
    for heading in REQUIRED_HEADINGS:
        assert heading in text, f"{filename}: missing heading {heading}"


def check_combined_removed() -> None:
    assert not COMBINED.exists(), "combined report must be removed"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", choices=POSTS)
    parser.add_argument("--tab-only", action="store_true")
    parser.add_argument("--no-combined-report", action="store_true")
    args = parser.parse_args()

    try:
        if args.tab_only:
            check_tab()
        elif args.no_combined_report:
            check_combined_removed()
        elif args.only:
            check_post(args.only)
        else:
            check_tab()
            for filename in POSTS:
                check_post(filename)
            check_combined_removed()
    except AssertionError as exc:
        print(f"FAIL: {exc}")
        return 1

    print("PASS: academic column and seven reports satisfy the source contract")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 2: Run the checker and confirm the red state**

Run:

```powershell
python tools/check_academic_content.py
```

Expected: exit code 1 with `FAIL: missing file: _tabs/academic.md`.

- [ ] **Step 3: Commit the failing verification contract**

```powershell
git add -- tools/check_academic_content.py
git commit -m "test: define academic content contract"
```

---

### Task 2: Add the Academic Layout and Navigation Tab

**Files:**

- Create: `_layouts/academic.html`
- Create: `_tabs/academic.md`

- [ ] **Step 1: Create `_tabs/academic.md`**

```markdown
---
title: 学术
layout: academic
icon: fas fa-graduation-cap
order: 4
permalink: /academic/
---
```

- [ ] **Step 2: Create `_layouts/academic.html`**

```liquid
---
layout: default
---

{% include lang.html %}

{% assign academic_posts = site.tags['学术'] %}

<h1 class="dynamic-title">{{ page.title }}</h1>

<div id="post-list" class="flex-grow-1 px-xl-1">
  {% for post in academic_posts %}
    <article class="card-wrapper card">
      <a href="{{ post.url | relative_url }}" class="post-preview row g-0">
        <div class="col-md-12">
          <div class="card-body d-flex flex-column">
            <h2 class="card-title my-2 mt-md-0">{{ post.title }}</h2>

            <div class="card-text content mt-0 mb-3">
              <p>{{ post.description | default: post.excerpt | strip_html | truncate: 220 }}</p>
            </div>

            <div class="post-meta flex-grow-1 d-flex align-items-end">
              <div class="me-auto">
                <i class="far fa-calendar fa-fw me-1"></i>
                {% include datetime.html date=post.date lang=lang %}

                {% if post.categories.size > 0 %}
                  <i class="far fa-folder-open fa-fw me-1"></i>
                  <span class="categories">
                    {% for category in post.categories %}
                      {{ category }}{% unless forloop.last %}, {% endunless %}
                    {% endfor %}
                  </span>
                {% endif %}
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
  {% else %}
    <p>暂无学术文章。</p>
  {% endfor %}
</div>
```

- [ ] **Step 3: Verify the tab contract**

Run:

```powershell
python tools/check_academic_content.py --tab-only
```

Expected: `PASS: academic column and seven reports satisfy the source contract`.

- [ ] **Step 4: Commit the navigation feature**

```powershell
git add -- _layouts/academic.html _tabs/academic.md
git commit -m "feat: add academic post column"
```

---

### Task 3: Publish the S5 Baseline Report

**Files:**

- Create: `_posts/2026-07-18-s5-baseline-systems-and-metrics.md`

- [ ] **Step 1: Write the post front matter**

Use title `空间声音场景语义分割的基线系统与联合指标：论文阅读报告`, date `2026-07-18 00:10:00 +0800`, categories `[学术, 音频研究]`, tags `[学术, ADQA, DCASE2025, S5, 声源分离, 音频标注]`, description `阅读 S5 基线论文，梳理 M2D 音频标注、ResUNetK 并行分离与 CA-SDRi 联合评测，并讨论其对 ADQA 的启发。`, `toc: true`, and `comments: true`.

- [ ] **Step 2: Write all required report sections**

Cover the paper `2503.22088v2.pdf`. Include these verified facts:

- S5 maps multichannel reverberant mixtures to labeled direct-path/early-reflection sound objects.
- The first stage fine-tunes M2D for audio tagging; the second stage performs label-queried separation.
- M2D head-only accuracy is 72.2%, and partial backbone fine-tuning reaches 84.7%.
- ResUNet extracts one queried source per run; ResUNetK outputs up to three sources jointly.
- CA-SDRi and CA-SI-SDRi assign 0 dB to false-positive and false-negative labels.
- ResUNetK outperforms ResUNet and exhibits an implicit mixture-consistency effect.
- Critique label-first matching, the mutually exclusive class assumption, and zero-valued penalties.
- Derive ADQA ideas around object-level quality, mixture residuals, duplicate extraction, and multi-dimensional metrics.

- [ ] **Step 3: Verify the individual post**

```powershell
python tools/check_academic_content.py --only 2026-07-18-s5-baseline-systems-and-metrics.md
```

Expected: PASS.

- [ ] **Step 4: Commit**

```powershell
git add -- _posts/2026-07-18-s5-baseline-systems-and-metrics.md
git commit -m "content: add S5 baseline reading report"
```

---

### Task 4: Publish the DCASE Task Definition Report

**Files:**

- Create: `_posts/2026-07-18-dcase2025-task4-description.md`

- [ ] **Step 1: Write the post front matter**

Use title `DCASE 2025 Task 4：空间声音场景语义分割任务与数据集阅读报告`, date `2026-07-18 00:20:00 +0800`, categories `[学术, 音频研究]`, tags `[学术, ADQA, DCASE2025, S5, 空间音频, 数据集]`, description `分析 DCASE 2025 Task 4 的任务定义、空间声学数据构造、隐藏评测集与基线泛化差距。`, `toc: true`, and `comments: true`.

- [ ] **Step 2: Write all required report sections**

Cover `2506.10676v1.pdf`. Include:

- Eighteen target classes, 10-second 32 kHz clips, one to three targets, one to two interference events.
- Target SNR 5-20 dB and interference SNR 0-15 dB.
- Development data use new recordings plus FSD50K, EARS, and FOA-MEIR; evaluation materials are newly recorded.
- The target is the signal convolved with the direct path toward a reference microphone, not an absolute dry source.
- ResUNetK scores 11.09 dB CA-SDRi on development and 6.60 dB on evaluation; accuracy falls from 59.80% to 51.48%.
- ResUNet evaluation CA-SDRi is 5.72 dB.
- Discuss hidden-domain evaluation, reference-definition quality, and factorized perceptual metrics.

- [ ] **Step 3: Verify and commit**

```powershell
python tools/check_academic_content.py --only 2026-07-18-dcase2025-task4-description.md
git add -- _posts/2026-07-18-dcase2025-task4-description.md
git commit -m "content: add DCASE Task 4 description report"
```

Expected checker result: PASS.

---

### Task 5: Publish the Feature-Enrichment and Agent-Correction Report

**Files:**

- Create: `_posts/2026-07-18-s5-enriched-features-agent-correction.md`

- [ ] **Step 1: Write front matter**

Use title `从数据清洗到代理纠错：DCASE S5 系统改进论文阅读报告`, date `2026-07-18 00:30:00 +0800`, categories `[学术, 音频研究]`, tags `[学术, ADQA, DCASE2025, S5, 数据质量, 音频特征]`, description `总结频谱滚降点、Chroma、训练数据审计和代理式标签纠错对 S5 系统的作用，并反思指标导向优化。`, `toc: true`, and `comments: true`.

- [ ] **Step 2: Write the report**

Cover `2506.21174v1.pdf`. Include:

- Removal of samples shorter than 1.5 seconds and manual removal of heterogeneous samples.
- Targeted AudioSet augmentation for Doorbell and MusicalKeyboard.
- Spectral roll-off and chroma auxiliary features alongside M2D embeddings.
- The agent reclassifies separated audio, rejects inconsistent labels, reranks candidates, and repeats separation.
- FP-penalized accuracy equals TP/(TP+FN+FP).
- Baseline CA-SDRi is 11.088 dB; the final ensemble with agent reaches 12.726 dB, a 14.7% relative improvement.
- Data refinement contributes a 10.9% relative improvement; the agent adds about 0.2 dB.
- Critique metric gaming, recall loss, manual data-removal bias, and external-data reproducibility.
- Propose uncertainty-aware soft correction rather than hard label deletion for ADQA.

- [ ] **Step 3: Verify and commit**

```powershell
python tools/check_academic_content.py --only 2026-07-18-s5-enriched-features-agent-correction.md
git add -- _posts/2026-07-18-s5-enriched-features-agent-correction.md
git commit -m "content: add S5 data and agent correction report"
```

Expected checker result: PASS.

---

### Task 6: Publish the CASA-SDR Metric Report

**Files:**

- Create: `_posts/2026-07-18-casa-sdr-metric-analysis.md`

- [ ] **Step 1: Write front matter**

Use title `CA-SDR 是否混淆了分类与分离？CASA-SDR 指标论文阅读报告`, date `2026-07-18 00:40:00 +0800`, categories `[学术, 音频研究]`, tags `[学术, ADQA, S5, CASA-SDR, 评价指标, 声源分离]`, description `分析 CA-SDR 的标签优先匹配问题，以及 CASA-SDR 如何分离声源错误与分类错误。`, `toc: true`, and `comments: true`.

- [ ] **Step 2: Write the report**

Cover `2511.07075v3.pdf`. Include:

- CA-SDR matches by predicted labels before measuring waveform distortion.
- CASA-SDR performs permutation-invariant source matching first, applies the permutation to labels, then counts classification errors.
- At 10 dB SNR, deletion/substitution produce 6.67 dB in both metrics; label swapping produces -0.68 dB CA-SDR and 3.33 dB CASA-SDR.
- Explain error-based and source-based aggregation.
- Note that real-system ranking differences can be small even when diagnostic interpretations differ.
- Discuss application-dependent use of CA-SDR versus CASA-SDR.
- Propose an ADQA dashboard with separation, classification, swap, perceptual, and calibration axes.

- [ ] **Step 3: Verify and commit**

```powershell
python tools/check_academic_content.py --only 2026-07-18-casa-sdr-metric-analysis.md
git add -- _posts/2026-07-18-casa-sdr-metric-analysis.md
git commit -m "content: add CASA-SDR metric report"
```

Expected checker result: PASS.

---

### Task 7: Publish the Self-Guided TSE Report

**Files:**

- Create: `_posts/2026-07-18-self-guided-tse-multiple-clues.md`

- [ ] **Step 1: Write front matter**

Use title `通用分离与多线索自引导目标声音提取：DCASE 第一名系统阅读报告`, date `2026-07-18 00:50:00 +0800`, categories `[学术, 音频研究]`, tags `[学术, ADQA, DCASE2025, S5, TSE, DeFT-Mamba]`, description `解读 DCASE 第一名系统如何结合通用分离、实例线索、类别线索和迭代目标声音提取。`, `toc: true`, and `comments: true`.

- [ ] **Step 2: Write the report**

Cover `DCASE2025_Kwon_68_t4.pdf`. Include:

- DeFT-Mamba-USS separates three foreground, two interference, and one noise object.
- M2D-SC uses single-label classification plus energy-based silence detection and class-specific thresholds.
- Raw enrollment clues preserve instance-level spectral detail; class clues enter through Res-FiLM.
- The iterative sequence is USS, classification, TSE, reclassification, and another TSE stage.
- Initial output: 15.1 dB SNRi, 73.2% accuracy, 10.8 dB CA-SDRi.
- Final output: 18.4 dB SNRi, 84.5% accuracy, 14.9 dB CA-SDRi.
- Discuss sequential error propagation, clue mismatch, computation, and joint optimization.
- Propose an ADQA quality router that triggers refinement only for uncertain objects.

- [ ] **Step 3: Verify and commit**

```powershell
python tools/check_academic_content.py --only 2026-07-18-self-guided-tse-multiple-clues.md
git add -- _posts/2026-07-18-self-guided-tse-multiple-clues.md
git commit -m "content: add self-guided TSE report"
```

Expected checker result: PASS.

---

### Task 8: Publish the DCASE Challenge Review

**Files:**

- Create: `_posts/2026-07-18-dcase2025-task4-challenge-review.md`

- [ ] **Step 1: Write front matter**

Use title `从 24 个系统看 S5 的瓶颈：DCASE 2025 Task 4 挑战总结阅读报告`, date `2026-07-18 01:00:00 +0800`, categories `[学术, 音频研究]`, tags `[学术, ADQA, DCASE2025, S5, 泛化, 感知质量]`, description `从 8 支队伍的 24 个系统中分析 S5 的分离收益、域外退化、感知质量和未来挑战。`, `toc: true`, and `comments: true`.

- [ ] **Step 2: Write the report**

Cover `DCASE2025Workshop_Yasuda_58.pdf`. Include:

- Twenty-four systems from eight teams; seven teams beat the baseline, some by more than 4 dB.
- The top system ranks second in label accuracy but first in CA-SDRi because of separation quality.
- All systems drop from development to evaluation.
- Known RIR or known target events help more than known background noise or interference.
- Baseline perceptual scores: PESQ 2.39, STOI 0.84, PEAQ -3.60.
- Top systems reach PESQ 2.77-2.97, STOI about 0.90, and PEAQ around -3.4.
- Multiple same-class instances and real recordings remain unresolved.
- Propose factor-specific ADQA stress tests and no-reference evaluation for real recordings.

- [ ] **Step 3: Verify and commit**

```powershell
python tools/check_academic_content.py --only 2026-07-18-dcase2025-task4-challenge-review.md
git add -- _posts/2026-07-18-dcase2025-task4-challenge-review.md
git commit -m "content: add DCASE challenge review"
```

Expected checker result: PASS.

---

### Task 9: Publish the FSD50K Dataset Report

**Files:**

- Create: `_posts/2026-07-18-fsd50k-dataset-reading-report.md`

- [ ] **Step 1: Write front matter**

Use title `FSD50K：开放声音事件数据集的构建、标注与质量控制阅读报告`, date `2026-07-18 01:10:00 +0800`, categories `[学术, 音频研究]`, tags `[学术, ADQA, FSD50K, 数据集, 标签质量, 音频事件识别]`, description `梳理 FSD50K 的开放数据来源、人工标注、标签完整性、上传者隔离划分及其对 ADQA 数据治理的价值。`, `toc: true`, and `comments: true`.

- [ ] **Step 2: Write the report**

Cover `FSD50K_An_Open_Dataset_of_Human-Labeled_Sound_Events.pdf`. Include:

- 51,197 clips, more than 100 hours, 200 classes, 144 leaf nodes, 56 intermediate nodes, 7,225 uploaders.
- Clip lengths 0.3-30 seconds and CC-distributable waveforms.
- Candidate-label nomination from Freesound metadata followed by human validation and expert refinement.
- Quality controls: FAQs, training examples, verification clips, discarded error windows, inter-annotator agreement, spectrograms, EBU R-128 normalization, and PP/PNP salience labels.
- 94.3% of incoming labels are verified correct, while 50.9% of refined clips have at least one missing label before refinement.
- Uploader-disjoint splitting prevents the uploader effect; random or ordinary stratified splits yield optimistic validation.
- A lightweight audio-adapted VGG-like model beats larger generic vision architectures in the reported baseline.
- Discuss weak-label density, class imbalance, provenance, openness, and evaluation-set priority.
- Propose continuous data-quality labels and provenance-aware ADQA.

- [ ] **Step 3: Verify and commit**

```powershell
python tools/check_academic_content.py --only 2026-07-18-fsd50k-dataset-reading-report.md
git add -- _posts/2026-07-18-fsd50k-dataset-reading-report.md
git commit -m "content: add FSD50K reading report"
```

Expected checker result: PASS.

---

### Task 10: Remove the Combined Report and Run Full Verification

**Files:**

- Delete: `output/literature/ADQA_相关文献阅读与研究启发.md`
- Possibly remove empty directories: `output/literature/`, `output/`

- [ ] **Step 1: Delete only the obsolete combined report**

Use `apply_patch` to delete the Markdown file. Remove directories only after resolving and confirming they are inside `E:\Morphex-Mo.github.io` and empty.

- [ ] **Step 2: Verify report deletion**

```powershell
python tools/check_academic_content.py --no-combined-report
```

Expected: PASS.

- [ ] **Step 3: Run the complete source contract**

```powershell
python tools/check_academic_content.py
```

Expected: PASS, with exactly seven expected academic posts and no combined report.

- [ ] **Step 4: Check Markdown and repository whitespace**

```powershell
rg -n -i "TBD|TODO|placeholder|待补" _posts -g "2026-07-18-*.md"
rg -n -i "TBD|TODO|placeholder|待补" _tabs/academic.md _layouts/academic.html
git diff --check
```

Expected: no placeholder matches and no whitespace errors.

- [ ] **Step 5: Build and validate the generated site**

Preferred command when Ruby/Bundler is available:

```bash
bash tools/test.sh
```

Expected: Jekyll build succeeds and html-proofer reports no internal-link failures.

If the local host still lacks `bundle`, run the same build in the project’s configured development container or rely on the repository’s `pages-deploy.yml` command locally after installing Bundler. Do not claim the rendered site passes until one of these full build paths exits with code 0.

- [ ] **Step 6: Inspect generated pages**

Confirm:

- `_site/academic/index.html` exists.
- The academic page contains seven report links and no non-academic post links.
- `_site/index.html` contains the seven new report links.
- All seven `_site/posts/<slug>/index.html` files exist.
- The sidebar contains `fa-graduation-cap` and the “学术” label.
- No generated path contains `docs/superpowers` or the deleted combined report.

- [ ] **Step 7: Commit deletion and final verification adjustments**

```powershell
git add -- output/literature/ADQA_相关文献阅读与研究启发.md tools/check_academic_content.py
git commit -m "content: replace combined ADQA report with academic posts"
```

Only include files that actually changed and are not already committed. Do not stage unrelated user changes.

---

## Final Acceptance Checklist

- [ ] “学术” appears as a top-level tab after “归档” with a graduation-cap icon.
- [ ] `/academic/` uses `site.tags['学术']` and contains only academic-tagged posts.
- [ ] All seven reports are normal posts and appear in the home feed.
- [ ] Every report includes `学术` and `ADQA` tags, complete front matter, and all ten report sections.
- [ ] Every key numerical claim matches the source PDFs.
- [ ] The combined report is deleted and no eighth duplicate report exists.
- [ ] `docs/` remains excluded from the site and neither design nor plan documents are generated.
- [ ] Source checker, Jekyll build, and html-proofer all pass with fresh output.
