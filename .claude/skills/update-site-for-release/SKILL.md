---
name: update-site-for-release
description: ServerStarter2 本体の新バージョンに合わせてホームページを更新する。本体リポジトリの Releases・Pull Request・Issues から前回リリースとの機能差を洗い出し、古くなった記述の修正・新機能の加筆・ロードマップ（/roadmap）への項目追加・本体アプリを起動したスクリーンショットの取得までを行う。「v2.x.x に向けてホームページを更新」「ロードマップに項目を追加」「新機能をサイトに反映」などの依頼で使う。
---

# 本体アプリのリリースに合わせたホームページ更新

本体アプリ（[ServerStarter2](https://github.com/Server-Starter-for-Minecraft/ServerStarter2)）の新バージョンに合わせて，ホームページの内容とロードマップを更新するための手順。
作業は CLAUDE.md の作業ルール（レビュー・表示確認・PR 対応）に従うこと。

## 0. 準備

- `main` から作業ブランチを切る（例：`feature/v2.4.0-update`）
- 本体リポジトリは `gh` で参照する（`-R Server-Starter-for-Minecraft/ServerStarter2`）
- 対象バージョンを決める：ユーザーの指定が無ければ「最新リリース」と「次のマイルストーン」を確認して提案する

## 1. 機能差の洗い出し

以下を取得し，**前回のリリースタグ以降**の変更を一覧にする。

```bash
R=Server-Starter-for-Minecraft/ServerStarter2
gh release list -R $R                                   # リリース済みバージョンと日付
gh release view <tag> -R $R                             # 各リリースの変更内容
gh api "repos/$R/milestones?state=all"                  # 次期バージョンのマイルストーン
gh issue list -R $R --milestone "<マイルストーン名>" --state all --limit 100
gh issue list -R $R --state open --limit 100            # 今後の予定（バージョン未定）の候補
git -C <本体クローン> log --first-parent --format='%h %ad %s' --date=short <前回タグ>..origin/main
gh pr view <番号> -R $R                                  # 主要な PR の概要（CodeRabbit の要約が便利）
```

洗い出した変更は次のように分類する。

| 分類 | 例 | サイトへの反映 |
| --- | --- | --- |
| 主要な新機能 | 新しいサーバー種類・画面の刷新 | 機能ページの加筆＋ロードマップの主要項目（詳細ページあり） |
| 小さな改善 | 検索の強化・ボタンの追加 | ロードマップの通常項目，必要なら機能ページに一文追加 |
| 不具合修正・内部改修 | リファクタリング・依存更新 | 原則掲載しない（利用者に影響が見える場合のみ通常項目） |

ユーザー向けに非公開の機能（UI 上で無効化されているもの）や，公開してよいか判断が分かれる項目（寄付窓口など）は，掲載前にユーザーへ確認する。

## 2. 既存ページのレビューと加筆

`src/pages/` と `src/components/Pages/` を対象に，洗い出した変更と食い違う記述を探す。

- 本体アプリの文言は本体の `src/i18n/ja/` が正なので，ボタン名・タブ名はそこに合わせる
  （`git -C <本体クローン> show origin/main:src/i18n/ja/Pages/World/player.ts` など）
- よく古くなる箇所
  - 対応サーバーの種類と数 → `src/scripts/serverTypes.ts` に1件追加するだけで，トップページ・機能一覧・サーバー一覧に反映される（アイコンを `public/assets/servers/{name}.png` に置き，i18n の `home.servers.serverType` / `serverDescription` に追記）
  - 画面構成が変わった機能の説明文とスクリーンショット（`public/assets/Features/` など）
  - 機能一覧のカード（`src/pages/features/FeaturesPage.vue`）のリンク先
- 新しい機能ページを作る場合は `src/pages/features/` に追加し，`src/router/routes.ts` に登録する
- 文言を i18n に追加する場合は `ja` と `en-US` の両方に追加する

## 3. ロードマップの更新

ロードマップは `/roadmap`（一覧）と `/roadmap/:id`（主要項目の詳細）で構成される。

- 項目のデータ：`src/roadmap/items.ts`（型は `src/roadmap/types.ts`）
- 文言：`src/i18n/ja/Pages/roadmap.ts` と `src/i18n/en-US/Pages/roadmap.ts` の `items.{id}`
- 画像：`public/assets/Roadmap/{id}/`（機能ページと同じ画像はそちらを参照して重複させない）

### 項目の追加

1. `items.ts` に1件追加する（並び順はバージョンとリリース日から自動で決まる）

   ```ts
   {
     id: 'auto-backup',          // URL と i18n キーに使う（kebab-case）
     status: 'developing',       // released / developing / planned
     version: '2.4.0',           // 未定なら省略 → 「今後の予定」に入る（'v' や '-beta' は付けない）
     // releasedAt: '2026-12-01',  // status が released の場合のみ設定する
     major: true,                // 詳細ページを持つ主要な項目
     media: [{ src: '/assets/Roadmap/auto-backup/settings.png', caption: 'settings' }],
     links: [{ to: '/features/create-world', label: 'createWorld' }], // label が roadmap.links に無ければ追加する
     issues: [50],               // 本体の Issue / PR 番号（詳細ページに GitHub へのリンクを表示）
   },
   ```

2. i18n（`ja` / `en-US` の両方）の `roadmap.items` に文言を追加する
   - `title`：項目名，`summary`：一覧に出す1〜2文の説明
   - 主要な項目のみ：`detail`（段落の配列），`captions`（`media` の `caption` に対応）
   - 新しいリンク名を使う場合は `roadmap.links` にも追加する
3. 主要な項目は手順 4 でスクリーンショット（1枚・複数枚・GIF のいずれか）を用意する

### リリース時の更新

- 該当バージョンの項目の `status` を `developing` → `released` にし，`releasedAt` を設定する
- 「今後の予定」から実装された項目は `version` を設定して移す（不要になった項目は削除する）

## 4. 本体アプリのスクリーンショット取得

ユーザーの作業中ブランチや実データに影響を与えないよう，**scratchpad に本体を別クローンして開発モードで起動**する。

1. クローンと起動準備

   ```bash
   git clone <本体のローカルクローン or GitHub URL> <scratch>/ss2
   git -C <scratch>/ss2 checkout <対象のコミット or ブランチ>   # 未マージの修正が必要ならそのブランチ
   (cd <scratch>/ss2 && bun install)
   ```

   - `src-electron/electron-main.ts` の `requestSingleInstanceLock` の直後に
     `app.commandLine.appendSwitch('remote-debugging-port', '9333');` を追加する（**クローン内のみの変更。コミットしない**）
   - （Windows の場合）開発モードのデータ保存先はクローン直下の `userData`。scratchpad のパスは長く，Java ランタイムのパスが
     Windows の上限（260 文字）を超えてサーバーが起動できないため，`subst Q: <scratch>` で短いドライブを割り当て，
     `src-electron/source/const.ts` の `new Path('userData')` を `new Path('Q:/ud')` に置き換える（これもクローン内のみ）
2. `bun run dev` をバックグラウンドで起動し，`scripts/app-cdp.mjs` で操作・撮影する（使い方はファイル冒頭のコメント参照）
   - 初回は利用規約への同意・オーナー登録・ワールド作成から行う。見栄えのため，プレイヤー・データパック等のサンプルを用意する
   - 撮影前に `scripts/restore-window.ps1` でウィンドウを復元する（最小化中は撮影がハングする）
3. 撮影時の注意
   - **個人情報を写さない**：グローバル IP は `app-cdp.mjs` が自動でマスクする。ログや検索結果にローカルパス（ユーザー名）が出ていないか，必ず画像を目視確認する
   - 基本サイズは 1280×800（16:10）。縦に長い画面は `H=1050` などで撮る
   - コンソールのコマンド入力は `type "input:not([aria-label])" "say Hello"` のように送る
   - GIF が必要な場合は連続撮影した PNG を `sharp` などで結合する
4. 撮影後：アプリを終了し，`subst Q: /D` でドライブ割り当てを解除する。scratch のクローンは削除してよい

## 5. 確認

- `bun run lint` / `bun run typecheck` / `bun run build` が通ること
  - `bunx prettier --write` は対象ファイルを絞って実行する（全体に掛けると Windows では改行コードだけの差分が大量に出る。出た場合は内容に差分のないファイルを `git checkout --` で戻す）
- `bun run dev` で起動し，`scripts/site-shot.mjs` で変更したページを PC 幅・スマホ幅（ライト / ダーク，日本語 / 英語）で撮影して目視確認する。`h-overflow` が 0 であること
  - ロードマップは一覧 `/roadmap`，追加した詳細ページ，存在しない ID（`/roadmap/unknown`）を確認する
- CLAUDE.md の作業ルールに従い，サブエージェントによるレビュー → PR 作成 → CI・CodeRabbit の確認を行う

## 6. 報告

- 反映した機能差（掲載した項目 / 掲載を見送った項目とその理由）
- 撮影したスクリーンショットの一覧と撮影条件（本体のコミット・サーバー種類）
- 撮影中に見つけた本体アプリの不具合（本体の Issue 化を提案する）
- ユーザーの確認が必要な点（未公開機能の掲載可否など）
