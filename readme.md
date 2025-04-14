我们来为“企业大脑”平台的用户中心前台，按照 Ant Design 的要求和之前的格式，填充具体的前端设计规范内容。
用户中心前台通常面向最终用户，侧重于个人信息管理、服务订阅、使用情况查看、安全设置等，界面风格需要在专业的基础上更强调易用性和用户友好性。

前端设计规范文档 - 企业大脑用户中心前台

项目背景与目标:

项目类型: 企业服务的用户中心 / 客户自助服务门户 (User Center / Customer Self-Service Portal for Enterprise Services)。

目标用户: “企业大脑”服务的注册最终用户（可能是企业员工或个人客户）。他们需要管理个人资料、查看服务状态/用量、管理订阅、进行安全设置、获取支持等。

品牌/产品个性: 专业 (Professional)、可靠 (Reliable)、易用 (User-Friendly)、清晰 (Clear)、安全 (Secure)。界面应提供流畅的自助服务体验，建立信任感。

核心设计原则:

用户中心化 (User-Centric): 设计围绕用户管理自身信息和服务的核心需求展开，简化流程。

一致性 (Consistency): 与平台其他部分（包括可能接触到的管理后台）保持视觉和交互风格的统一，遵循 Ant Design 规范。

清晰导航 (Clear Navigation): 用户能轻松找到所需功能模块（如个人资料、安全设置、账单信息等）。

明确反馈 (Clear Feedback): 用户的操作（如保存设置、更改密码）需要得到及时、清晰的系统反馈。

可访问性 (Accessibility): 确保所有用户都能无障碍使用。

规范内容要求:

色彩规范 (Color Palette): (遵循 Ant Design 色彩体系，与整体平台保持一致)

主色调 (Primary Color): 沿用平台统一主色 Daybreak Blue (#1677ff)。用于关键操作按钮（如“保存更改”）、当前导航项高亮、重要提示等。

辅助色调 (Secondary Colors): 使用主色的不同色阶或 Ant Design 的中性色盘。谨慎引入其他色彩，保持界面清爽。

强调色/点缀色 (Accent Color): 通常使用主色调。如有特别需要引导注意的元素（如升级提示、新功能引导），可在 AntD 色板中审慎选用一个点缀色，严格控制范围。

中性色 (Neutral Colors): 严格使用 Ant Design 的中性色板（Gray-1 至 Gray-10）。用法同管理后台规范，确保文本、背景、边框的清晰可读。

主要文本: @text-color (#000000e0)

次要文本: @text-color-secondary (#000000a6)

禁用状态: @text-color-tertiary (#00000073)

边框: @border-color-base (#d9d9d9)

组件/卡片背景: @component-background (#ffffff)

页面背景: @layout-body-background (#f5f5f5 或 #ffffff，用户中心可考虑更干净的白色背景)

状态色 (Status Colors): 使用 Ant Design 标准状态色 (@success-color, @error-color, @warning-color, @info-color)，用于表单验证反馈、消息提示等。

提供值: 使用 Ant Design 的 Less 变量或 CSS-in-JS 主题变量。

字体规范 (Typography): (遵循 Ant Design 字体体系，注重可读性)

主要字体 (Primary Font Family): 使用 Ant Design 默认字体栈，优先系统字体。

备用字体 (Fallback Fonts): 已包含在字体栈中。

字号层级 (Font Sizes): 基于 Ant Design 的 @font-size-base: 14px。

H1: 24px (用户中心内的主要区域标题，如“个人资料”)

H2: 20px (次级区域标题，如“基本信息”、“安全设置”)

H3: 16px (卡片标题、表单组标题)

H4: 14px (加粗文本、小节标题)

Base (正文/表单标签): 14px

Small: 12px (辅助说明、时间戳、输入框下的提示)

考虑用户中心的阅读场景，确保正文 14px 具有良好的可读性。

字重 (Font Weights): Regular (400) 为主，Medium (500) / Semibold (600) 用于标题和强调。

行高 (Line Height): 使用 Ant Design 默认 @line-height-base: 1.5715。

字间距 (Letter Spacing): 保持默认。

布局与间距 (Layout & Spacing): (遵循 Ant Design 间距规范，结构清晰)

基础间距单位 (Base Spacing Unit): 8px。

常用的间距值 (Spacing Scale): 严格使用 Ant Design 间距梯度 (xs: 8px 到 xxl: 48px) 应用于 margin 和 padding。

栅格系统 (Grid System): 使用 Ant Design 的 Row 和 Col (24列)。常用于组织页面内容块，如左右布局（菜单在左，内容在右）或表单项排列。

列间距 (Gutter): 推荐使用 16px 或 24px，项目内统一。

响应式断点 (Breakpoints): 遵循 Ant Design 默认断点，确保在不同设备上（尤其是桌面和平板）布局合理。

最大内容宽度 (Max Content Width): 推荐为用户中心设定一个最大内容宽度，如 1100px 或 1200px，在宽屏下居中显示，提升阅读聚焦感。

核心 UI 组件规范 (Core UI Components): (围绕用户中心常见功能选择和使用 AntD 组件)

导航 (Navigation): 通常使用 <Menu> 实现侧边栏垂直导航，模式为 inline。确保当前激活项有清晰高亮。可能配合 <Breadcrumb> 显示当前位置。

头像 (Avatar): 使用 <Avatar> 展示用户头像，提供上传/修改功能。

描述列表 (Descriptions): 使用 <Descriptions> 展示只读的用户信息（如用户名、邮箱、注册时间等），布局清晰。

表单 (Forms): 使用 <Form>, <Form.Item> 及各类输入组件 (<Input>, <Select>, <Radio.Group>, <Checkbox.Group>, <DatePicker>) 处理用户资料编辑、密码修改、偏好设置等。标签 (label) 清晰，校验规则明确，错误提示 (help) 友好。

按钮 (Buttons): 使用 <Button>。表单保存通常用 type="primary"。取消或关闭用默认类型。涉及敏感操作（如解绑）可配合 <Modal.confirm>。

标签页 (Tabs): 使用 <Tabs> 在同一页面内组织不同类别的信息或设置，如“基本资料”、“安全设置”、“通知偏好”。

卡片 (Cards): 使用 <Card> 组织信息模块，如“账户概览”、“订阅信息”、“用量统计”。

结果页 (Result): 使用 <Result> 显示操作成功（如密码修改成功）或失败状态。

步骤条 (Steps): 如有分步操作（如安全设置引导），使用 <Steps>。

进度条 (Progress): 使用 <Progress> 展示资源用量、资料完成度等。

提示/通知 (Alerts/Notifications): 使用 <Alert> 在页面内显示重要提示（如账户安全警告）。使用 notification 提供全局操作反馈（如“设置已保存”）。

表格 (Tables): 可能用于展示登录历史、账单记录、操作日志等，使用 <Table>。保持列定义清晰，操作简洁。

图标规范 (Iconography): (使用 Ant Design Icons，保持一致性)

指定图标风格 (Icon Style): 统一使用 Outline (线条) 图标 (@ant-design/icons)。

指定图标库 (Icon Library): 必须使用 @ant-design/icons。

定义常用图标尺寸 (Icon Sizes): 通常与文本对齐 (14px/16px) 或使用导航菜单、按钮等组件的默认尺寸。

说明图标颜色使用规则: 默认继承文本颜色。语义图标（如警告、成功）使用对应状态色。

交互与动效 (Interaction & Animation): (遵循 Ant Design 动效原则：自然、高效、克制)

设定基本原则: 动效用于提升流畅感和提供操作反馈，避免华而不实。

定义标准过渡效果 (Standard Transitions): 沿用 Ant Design 的默认过渡 (@animation-duration-base, ease-in-out)。

指定常用微交互 (Microinteractions) 的模式: 重点在于表单提交、设置保存后的即时反馈（如按钮 loading 状态、全局 notification 提示）。AntD 组件自带的交互（如 Select 下拉、Modal 弹出）直接使用。

可访问性 (Accessibility - A11y): (利用 Ant Design 的 A11y 基础，确保可用性)

强调 WCAG 标准: 目标达到 WCAG 2.1 AA 级别。

要求: 与管理后台规范一致：保证色彩对比度、清晰焦点、键盘可操作、图像 alt 文本、语义化 HTML、必要时使用 ARIA。对最终用户尤其重要。

命名规范 (Naming Conventions):

CSS/JS/TS: 与管理后台规范保持完全一致，使用 BEM (若用 CSS Modules/Less/Sass) 或 CSS-in-JS 方式，遵循驼峰命名法等约定。

性能考虑 (Performance):

图片优化: 用户上传的头像等资源需要处理和优化。

代码优化: 按需加载（路由、大组件）、AntD 按需引入、合理使用 Memoization。确保用户中心加载迅速，操作流畅。

本规范为“企业大脑”用户中心前台提供了基于 Ant Design 的详细设计指导。旨在打造一个专业可靠、易于使用且与平台整体风格一致的用户自助服务门户。团队成员需严格遵守，共同维护高质量的用户体验