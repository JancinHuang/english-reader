# Page Design Spec（文章管理后台，Desktop-first）

## Global styles（全局）
- Layout system：页面框架用 CSS Grid（左侧导航 + 右侧内容）；组件内部对齐用 Flexbox。
- Breakpoints：
  - Desktop baseline ≥1200px（默认）；
  - <900px：左侧导航折叠为抽屉；
  - <600px：编辑器区域变为单列堆叠。
- Design tokens（可沿用现有前台风格以保持一致）：
  - Background：#0B1220；Surface：#111B2E；Card：#162443
  - Text：primary #EAF0FF；secondary #A9B6D3
  - Accent：#5B8CFF；Success #3DDC97；Danger #FF5B6E
  - Radius：12px；Spacing：4/8/12/16/24/32
  - Typography：14/16 正文，20/24 分区标题，28/32 页面标题
- Buttons：Primary（实心 Accent），Secondary（描边 Accent），Danger（红色确认态），统一 150–200ms hover/press 过渡。
- Form：输入框默认暗色描边；focus 显示 Accent ring；校验错误显示 Danger 边框 + 错误文案。

## 1) 管理员登录
### Meta information
- Title："管理员登录 – 文章管理"
- Description："登录以管理文章、测验与导入导出。"
- Open Graph：title/description + 默认封面

### Page structure
- 居中单卡片布局（max-width 420px），上下留白 96px。

### Sections & components
1. Brand header
   - 应用名 + 简短说明“文章管理后台”。
2. Login card
   - 表单项：邮箱/用户名、密码（或令牌输入框，二选一实现即可）。
   - 主按钮：登录；加载态（spinner + disabled）。
   - 错误态：顶部 Alert（错误原因 + 重试建议）。
3. Session hint
   - 登录成功后跳转到“文章管理（列表）”。

## 2) 文章管理（列表 + 导入导出）
### Meta information
- Title："文章管理"
- Description："浏览、筛选、创建、发布、导入导出文章数据。"

### Page structure
- App shell：左侧导航（固定宽 240px）+ 右侧主内容（12 列栅格容器，max-width 1200px）。
- 主内容上方为工具条（actions），下方为表格列表。

### Sections & components
1. Left nav
   - 菜单项：文章管理（当前）、退出登录。
2. Top action bar
   - 左侧：页面标题 + 数据集版本/更新时间（从 dataset_meta 读取）。
   - 右侧按钮组：新建文章、导入 JSON、导出 JSON。
3. Filter row
   - 搜索框（标题/ID 关键字）、Level 下拉、Topic 下拉、Status（Draft/Published）。
   - Clear filters。
4. Articles table
   - 列：ID、标题、Level、Topic、状态、更新时间、操作。
   - 行操作：编辑、复制、删除（弹窗二次确认）、发布/撤回（按钮随状态切换）。
   - 空态：无数据/无匹配时提示 + CTA（新建/清空筛选）。
5. Import dialog
   - 上传区（拖拽/选择文件）+ JSON 结构校验结果（通过/失败原因、冲突文章数）。
   - 确认按钮：开始导入；结果面板：成功/失败条目列表。
6. Export behavior
   - 点击后直接下载 `ArticleDataset.json`；导出前提示将只包含当前库中的文章。

## 3) 文章编辑（新建/编辑）
### Meta information
- Title："编辑文章 – {title | 新建}"
- Description："编辑文章元信息、段落翻译、词汇与测验题目，并保存或发布。"

### Page structure
- 顶部：面包屑 + 主操作（保存草稿/发布/返回）。
- 主体：两列布局（左 8：编辑表单；右 4：预览与校验）。
- <900px：右侧变为可折叠面板；<600px：单列堆叠。

### Sections & components
1. Header
   - Breadcrumb：文章管理 / 编辑
   - Actions：保存草稿、发布（若校验通过）、返回列表。
2. Metadata card
   - 字段：id、title、level、topic、summary、estimatedMinutes、status。
   - 规则：必填提示、枚举校验（level/status）。
3. Content editor（Tabbed）
   - Tab A：段落 paragraphs
     - 列表（可排序）：index、text、translation；支持新增/删除。
   - Tab B：词汇 vocab
     - 表格：term、ipa、meaning、example、sourceParagraphIndex；支持新增/删除。
   - Tab C：测验 quiz
     - 题目列表（可排序）：type、prompt、关联段落；支持新增/删除。
     - MCQ：options + correctOptionIndex；Short：correctAnswers。
   - Tab D：JSON 模式
     - 文本编辑区（monospace）+ 实时校验（错误行/字段提示）。
4. Validation & preview panel
   - 校验摘要：缺失字段、重复 id、paragraph index 连续性、quiz 引用段落越界等。
   - 预览：用阅读端样式预览 paragraphs 与 translation；用卡片预览题目渲染。
5. Save / publish feedback
   - 成功 toast；失败提示（字段定位）。
