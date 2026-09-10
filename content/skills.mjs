// Each pair contains an English explanation and its Chinese counterpart.
export const skills = [
  {
    id: 'using-superpowers', category: 'foundation', title: ['Start with the right skill', '从正确的技能开始'],
    short: ['The entry point', '技能系统入口'],
    intro: ['Superpowers is a development workflow built from composable skills. This entry skill tells an agent to check for relevant skills before responding or acting, so the method is chosen before the work begins.', 'Superpowers 是由可组合技能构成的开发工作流。这个入口技能要求代理在回复或行动前检查适用技能，先确定方法，再开始工作。'],
    when: ['At the start of a conversation, before answering, asking questions, or exploring files. The upstream rule is deliberately strict: even a small chance of relevance is enough to load a skill. Agents dispatched for a specific subtask are explicitly exempt from this bootstrap.', '在对话开始时使用，早于回答、提问或探索文件。上游规则刻意设置得很严格：即使只有很小的相关可能性，也要加载技能。已被派遣执行具体子任务的代理明确不适用这个引导流程。'],
    steps: [
      ['Check the available skills against the request. Load relevant or explicitly requested skills instead of relying on memory.', '将请求与可用技能对照。加载相关或被明确要求的技能，不要仅凭记忆执行。'],
      ['Apply process skills first. A new feature starts with brainstorming; a bug starts with systematic debugging.', '优先应用流程技能。新功能从头脑风暴开始，缺陷从系统化调试开始。'],
      ['Announce the skill and its purpose, then follow its checklist. Read platform adaptations when relevant.', '说明所用技能及目的，然后遵循检查清单。涉及平台差异时阅读对应的适配说明。']
    ],
    rule: ['User instructions take precedence over skills. This page explains the upstream method; reading it does not install or activate Superpowers.', '用户指令优先于技能。本页解释上游方法；阅读本页不会安装或激活 Superpowers。'],
    mistake: ['Starting with a quick file inspection and checking skills later reverses the intended order. The process skill is supposed to guide that inspection.', '先快速看文件、稍后再检查技能，颠倒了预期顺序。流程技能本应指导这次检查。'],
    example: ['Request: "Add a saved-search feature." First identify brainstorming as relevant, understand the desired behavior, and only then move toward implementation.', '请求："添加保存搜索的功能。" 先识别出头脑风暴技能适用，理解目标行为，然后再进入实现。'],
    related: ['brainstorming', 'systematic-debugging', 'writing-skills']
  },
  {
    id: 'brainstorming', category: 'workflow', title: ['Turn an idea into a design', '把想法变成设计'], short: ['Clarify and design', '澄清需求与设计'],
    intro: ['Explore what the user wants before building it. The current skill scales the process to the work: a feasibility spike, a bounded change to an existing flow, or an architectural change.', '在动手构建前探索用户真正需要什么。当前技能根据工作规模调整流程：可行性探索、对现有流程的有限修改，或架构性变更。'],
    when: ['Before creative work such as adding features, building components, or changing behavior. A new project follows the architectural path because there is no existing flow to inspect.', '在添加功能、构建组件或改变行为等创造性工作之前使用。新项目没有可供检查的现有流程，因此走架构路径。'],
    steps: [
      ['Inspect the project context, announce the chosen path, and ask the questions that affect scope or success. Ask one question at a time.', '检查项目背景，说明所选路径，并询问影响范围或成功标准的问题。每次只问一个问题。'],
      ['For a spike, propose a small probe. For a bounded change, present a short design in chat. For architecture, compare approaches and present the design in sections.', '探索任务提出小规模验证方案；有限修改在对话中给出简短设计；架构任务比较方案并分节展示设计。'],
      ['Get approval before implementation. On the architectural path, write and self-review the spec, obtain the user review, then hand off to writing-plans.', '实现前获得批准。架构路径还要写下并自审规格说明，经用户审阅后交给 writing-plans。']
    ],
    rule: ['The amount of documentation changes with scope; the upstream approval gate remains. Hidden complexity upgrades the path.', '文档量随范围调整，但上游的批准关卡仍然存在。发现隐藏复杂性时，需要升级处理路径。'],
    mistake: ['Calling a new project "bounded" because the app type is familiar. Bounded means the flow already exists in this repository.', '因为熟悉应用类型，就把新项目称作"有限修改"。有限修改意味着该流程已经存在于此代码库中。'],
    example: ['For saved searches, settle what is saved, who can see it, and how users restore it. A small UI change and a shared storage subsystem need different design depth.', '以保存搜索为例，先明确保存哪些信息、谁能看到、用户如何恢复。小型界面修改与共享存储子系统需要不同深度的设计。'],
    related: ['writing-plans', 'using-git-worktrees']
  },
  {
    id: 'writing-plans', category: 'workflow', title: ['Make the design executable', '让设计可以执行'], short: ['Write the implementation plan', '编写实现计划'],
    intro: ['Translate an approved specification into independently testable tasks. A plan should give an engineer with no project context enough information to implement and verify the work.', '把已批准的规格说明转化为可独立测试的任务。计划应让没有项目背景的工程师获得足够信息，能够实现并验证工作。'],
    when: ['When a specification or requirements describe a multi-step implementation. The architectural brainstorming path hands off here; a bounded change does not require a separate plan document.', '当规格说明或需求涉及多步骤实现时使用。架构型头脑风暴会交接到这里；有限修改不要求单独的计划文档。'],
    steps: [
      ['Map files and responsibilities first. Include the goal, architecture, stack, spec path, and exact global constraints in the plan header.', '先梳理文件与职责。在计划开头写明目标、架构、技术栈、规格路径以及准确的全局约束。'],
      ['Define tasks with exact paths and interfaces. Give each step one action: a failing test, its command and expected failure, minimal code, verification, or a commit.', '用准确路径和接口定义任务。每一步只做一件事：失败测试、命令及预期失败、最小实现、验证或提交。'],
      ['Check coverage against the spec, remove placeholders, and verify names and types across tasks. Save the plan and choose an execution approach.', '对照规格检查覆盖范围，去除占位内容，核对跨任务的名称和类型。保存计划并选择执行方式。']
    ],
    rule: ['The 2-5 minute guidance applies to individual steps. A task is a deliverable that deserves its own test cycle and review.', '2 至 5 分钟的建议针对单个步骤。任务则是值得独立测试和审查的一项交付成果。'],
    mistake: ['"Add appropriate tests" is not an executable step. Include the actual test, command, and expected result; do not leave design decisions to the implementer.', '"添加适当的测试"不是可执行步骤。应包含实际测试、命令和预期结果，不要把未解决的设计决策留给实现者。'],
    example: ['A saved-search task names the storage file, the save/load interface, a persistence test, the minimal implementation, and the command that proves a search survives reload.', '保存搜索任务应写明存储文件、保存与加载接口、持久化测试、最小实现，以及证明搜索在重新加载后仍存在的验证命令。'],
    related: ['subagent-driven-development', 'executing-plans', 'test-driven-development']
  },
  {
    id: 'using-git-worktrees', category: 'workflow', title: ['Give the work its own workspace', '给任务独立的工作空间'], short: ['Isolate the workspace', '隔离工作空间'],
    intro: ['Establish an isolated workspace without duplicating isolation already provided by the coding environment. Prefer the platform\'s native worktree tools, then fall back to Git.', '建立隔离工作空间，同时避免重复创建编码环境已提供的隔离。优先使用平台原生 worktree 工具，其次才使用 Git。'],
    when: ['Before executing a plan or starting feature work that needs isolation. Existing declared user preferences determine whether to create a worktree; otherwise the skill asks for consent.', '执行计划前，或开始需要隔离的功能开发前使用。已有的用户偏好决定是否创建 worktree；没有偏好时，技能会征求同意。'],
    steps: [
      ['Detect an existing linked worktree and distinguish it from a submodule. Reuse isolation already provided by the environment.', '检测现有的 linked worktree，并与子模块区分。复用环境已提供的隔离。'],
      ['Honor user preferences. When creating a workspace, use native tools first; for manual Git worktrees, verify project-local worktree directories are ignored.', '遵循用户偏好。创建工作空间时优先使用原生工具；手动创建 Git worktree 时，验证项目内的 worktree 目录已被忽略。'],
      ['Run the project setup and baseline tests. Report the path, branch state, and baseline result before implementation.', '执行项目初始化和基线测试。在开始实现前报告路径、分支状态和基线结果。']
    ],
    rule: ['A clean baseline distinguishes pre-existing failures from failures introduced by the change. Report failing baseline tests before proceeding.', '干净的测试基线能区分已有故障与本次修改引入的故障。继续工作前应报告基线测试失败。'],
    mistake: ['Creating another worktree inside an environment-managed worktree, or bypassing native tools that track workspace lifecycle.', '在环境管理的 worktree 中再建一个 worktree，或绕过负责跟踪工作空间生命周期的原生工具。'],
    example: ['The environment has already opened a feature worktree. Reuse it, install the project dependencies, and run the baseline instead of creating a second checkout.', '环境已经打开了一个功能 worktree。复用它，安装项目依赖并运行基线测试，无需再建第二份检出。'],
    related: ['subagent-driven-development', 'executing-plans', 'finishing-a-development-branch']
  },
  {
    id: 'subagent-driven-development', category: 'workflow', title: ['Implement with focused agents', '用专注的子代理实现'], short: ['Delegate, review, integrate', '委派、审查与集成'],
    intro: ['A coordinator executes a plan using a fresh implementer for each task, task-level review of specification compliance and code quality, and a final review of the whole branch.', '协调代理按计划为每个任务派遣新的实现代理，逐任务审查规格符合性与代码质量，最后审查整个分支。'],
    when: ['When a written plan has mostly independent tasks and subagents are available in the current session. This is coordinated task execution; it does not mean all implementation tasks run concurrently.', '已有书面计划、任务大体独立且当前会话可以使用子代理时使用。这是协调式任务执行，不意味着所有实现任务都同时运行。'],
    steps: [
      ['Verify workspace isolation, read the plan and spec, and check task interfaces for conflicts. Maintain a plan-specific progress ledger so completed tasks survive context compaction.', '确认工作空间隔离，阅读计划与规格，检查任务接口冲突。维护该计划专属的进度台账，避免上下文压缩后重复已完成任务。'],
      ['Give each implementer a precisely scoped task and the context it needs. Review the result against the spec and for code quality; fix findings and re-review the affected changes.', '给每个实现代理范围明确的任务和必要背景。按规格与代码质量审查结果，修复问题并重新审查受影响的修改。'],
      ['Record completed tasks and decisions in the ledger. After all tasks, run a broad branch review before handing off to the finishing skill.', '在台账中记录已完成任务与决策。所有任务完成后，对整个分支进行全面审查，再交给收尾技能。']
    ],
    rule: ['The spec is authoritative when the plan conflicts with it. The current skill records reasoned rulings and keeps working, but stops for destructive, security-sensitive, or approval-requiring external actions, or a plan with no sound path forward.', '计划与规格冲突时以规格为准。当前技能会记录有理由的裁决并继续工作；遇到破坏性、安全敏感、需批准的外部操作，或完全没有可靠前进路径的计划时才停下。'],
    mistake: ['Passing the coordinator\'s entire conversation to each worker, trusting an implementer\'s success claim, or re-running completed tasks after losing context.', '把协调代理的全部对话传给每个工作代理、直接相信实现代理的成功声明，或丢失上下文后重做已完成任务。'],
    example: ['Delegate saved-search persistence with its exact interface and test command. Review it before the UI task consumes that interface, then review the combined feature at the end.', '委派保存搜索的持久化任务，提供准确接口和测试命令。在界面任务使用该接口前先审查它，最后审查组合后的完整功能。'],
    related: ['dispatching-parallel-agents', 'requesting-code-review', 'finishing-a-development-branch']
  },
  {
    id: 'executing-plans', category: 'workflow', title: ['Work through an existing plan', '逐项执行已有计划'], short: ['Execute in the current session', '在当前会话中执行'],
    intro: ['Load a written plan, review it critically, and execute its tasks with the specified checks. This is the inline execution alternative when subagent-driven development is not available.', '加载书面计划，批判性审阅后，按指定检查逐项执行。在无法使用子代理驱动开发时，这是会话内执行的替代方式。'],
    when: ['When implementation is ready to follow a written plan, including a plan handed over from another session. The current body recommends subagent-driven development when subagents are available.', '实现工作已经有可遵循的书面计划时使用，也包括从其他会话交接来的计划。当前正文建议在可用时使用子代理驱动开发。'],
    steps: [
      ['Create or verify workspace isolation. Read the plan critically and raise important gaps before beginning.', '创建或确认工作空间隔离。批判性阅读计划，开始前提出重要缺口。'],
      ['Track each task, follow its steps, run the specified verifications, and mark completion only after those checks.', '跟踪每个任务，遵循步骤，执行指定验证，检查完成后才标记为完成。'],
      ['After all tasks are verified, use finishing-a-development-branch. Stop for blockers, unclear instructions, or repeated verification failures.', '全部任务验证后使用 finishing-a-development-branch。遇到阻碍、不清楚的指令或反复验证失败时停下。']
    ],
    rule: ['The upstream description and some overview text still mention batches and checkpoints. The pinned skill body actually says to execute all tasks; it does not define a fixed three-task batch.', '上游描述及部分概述仍提到批次和检查点，但此固定版本的技能正文要求执行所有任务，并未定义固定的三任务批次。'],
    mistake: ['Treating a plan as infallible, skipping verification steps, or guessing through a missing dependency or critical requirement.', '把计划视为绝对正确，跳过验证步骤，或在缺失依赖、关键需求不明时凭猜测继续。'],
    example: ['Open the approved saved-search plan in a fresh session. Check prerequisites, implement each task with its tests, and report a concrete blocker if a required storage API does not exist.', '在新会话中打开已批准的保存搜索计划。检查前提，逐项实现并测试；如果必需的存储 API 不存在，报告具体阻碍。'],
    related: ['writing-plans', 'using-git-worktrees', 'finishing-a-development-branch']
  },
  {
    id: 'test-driven-development', category: 'quality', title: ['Let a failing test lead', '让失败测试引路'], short: ['TDD: red, green, refactor', '测试驱动开发：红、绿、重构'],
    intro: ['Write a test for the next behavior, observe the expected failure, implement only enough to pass, and then improve the code while keeping tests green.', '为下一个行为编写测试，观察预期失败，只实现足以让测试通过的代码，然后在保持测试通过的前提下改善代码。'],
    when: ['Before implementing features, bug fixes, refactors, or behavior changes. The upstream skill calls out throwaway prototypes, generated code, and configuration as exceptions to discuss with the user.', '在实现功能、修复缺陷、重构或改变行为前使用。上游技能将一次性原型、生成代码和配置列为需要与用户讨论的例外。'],
    steps: [
      ['RED: write one small test through real behavior. Run it and check that it fails because the behavior is missing, not because the test is broken.', '红：针对真实行为编写一个小测试。运行并确认它因行为缺失而失败，而非因为测试本身出错。'],
      ['GREEN: write the simplest implementation that passes. Run the new test and the relevant existing suite.', '绿：编写能通过测试的最简单实现。运行新测试和相关已有测试。'],
      ['REFACTOR: remove duplication or improve structure without adding behavior. Keep tests green, then repeat with the next behavior.', '重构：去除重复或改善结构，不增加新行为。保持测试通过，再进入下一个行为的循环。']
    ],
    rule: ['A test that passes on its first run has not demonstrated that it detects the missing behavior. Seeing the intended failure is part of the evidence.', '第一次运行就通过的测试，并未证明自己能检测缺失行为。观察到预期失败本身就是证据的一部分。'],
    mistake: ['Testing mock calls instead of the public behavior, writing production code first, or expanding the implementation beyond what the current test requires.', '测试 mock 调用而非公开行为、先写生产代码，或实现超出当前测试需要的功能。'],
    example: ['Test that an empty saved-search name is rejected. Watch it fail, add the smallest validation, verify success, then separately test a valid name.', '测试空的搜索名称会被拒绝。观察失败，添加最小校验，确认通过，然后单独测试有效名称。'],
    related: ['systematic-debugging', 'verification-before-completion', 'writing-skills']
  },
  {
    id: 'systematic-debugging', category: 'quality', title: ['Find the cause before the fix', '先找原因，再修问题'], short: ['Systematic debugging', '系统化调试'],
    intro: ['Use a four-phase investigation to replace trial-and-error fixes with evidence: investigate the root cause, compare patterns, test a hypothesis, then implement a verified fix.', '用四阶段调查取代试错式修复：调查根因、比较模式、测试假设，然后实现经过验证的修复。'],
    when: ['For bugs, failing tests, unexpected behavior, build failures, performance issues, and integration problems. Time pressure makes this process more valuable, not less.', '适用于缺陷、测试失败、意外行为、构建失败、性能和集成问题。时间压力越大，这套流程越有价值。'],
    steps: [
      ['Investigate: read the full error, reproduce it, check recent changes, and trace data across component boundaries to find where it first goes wrong.', '调查：完整阅读错误，复现问题，检查近期变更，并沿组件边界追踪数据，定位最早出错的位置。'],
      ['Compare and hypothesize: examine a working example, list differences, and state one specific explanation. Test one variable with the smallest possible experiment.', '比较并提出假设：检查正常工作的示例，列出差异，提出一个具体解释。用最小实验测试单一变量。'],
      ['Implement: first capture the failure in a regression test, make one fix at the source, and verify both the original symptom and relevant regressions.', '实现：先用回归测试捕获故障，在源头做一次修复，再验证原始症状和相关回归。']
    ],
    rule: ['After three unsuccessful fixes, stop and discuss the architecture before attempting a fourth. Repeated failures may indicate the model is wrong.', '连续三次修复无效后，应停下讨论架构，再考虑第四次尝试。反复失败可能意味着整体模型有问题。'],
    mistake: ['Changing several things at once, increasing a timeout without evidence, or patching the final error site instead of tracing the invalid value back to its origin.', '一次修改多个因素、没有证据就延长超时，或只修补最终报错位置，而不追查无效值的来源。'],
    example: ['A saved search disappears after reload. Check what the UI submits, what storage writes, and what loading returns. If the keys differ, test that mismatch and fix the contract.', '保存的搜索在重新加载后消失。检查界面提交什么、存储写入什么、加载返回什么。如果键名不一致，就测试这个差异并修正接口约定。'],
    related: ['test-driven-development', 'verification-before-completion', 'dispatching-parallel-agents']
  },
  {
    id: 'verification-before-completion', category: 'quality', title: ['Prove it before you say it', '先证明，再宣布完成'], short: ['Fresh evidence before claims', '用新证据支持结论'],
    intro: ['Match every completion claim to a fresh check that actually proves it. Confidence, old test results, and another agent\'s report are not substitutes for current evidence.', '每个完成声明都应对应一项真正能够证明它的最新检查。信心、旧测试结果和其他代理的报告，都不能替代当前证据。'],
    when: ['Before saying work is done, a bug is fixed, tests pass, or a build succeeds; also before commits, pull requests, or moving on with a success assumption.', '在声称工作完成、缺陷修复、测试通过或构建成功之前使用；也适用于提交、拉取请求，或以成功为前提继续工作之前。'],
    steps: [
      ['Identify the exact command or check that proves the claim. A lint pass does not prove the application builds.', '找出能证明该声明的准确命令或检查。lint 通过并不证明应用可以构建。'],
      ['Run the full check on the current state. Read its output, exit code, and failure count.', '对当前状态运行完整检查。阅读输出、退出码和失败数量。'],
      ['State only what the result establishes, with evidence. If a check fails or cannot run, report that actual status.', '只陈述结果能够证明的内容，并提供证据。检查失败或无法运行时，报告真实状态。']
    ],
    rule: ['Different claims need different evidence: tests for tested behavior, a build command for a build, and a requirements review for specification coverage.', '不同结论需要不同证据：行为靠测试，构建靠构建命令，规格覆盖范围靠逐项需求核对。'],
    mistake: ['Saying "it should work now" after editing a file, or reporting an entire feature complete because a narrow test passed.', '编辑文件后就说"现在应该能用了"，或因为一个局部测试通过就声称整个功能已完成。'],
    example: ['After fixing persistence, run the regression test and the relevant suite. Report the actual results and separately note whether the browser reload flow was checked.', '修复持久化后，运行回归测试和相关测试集。报告实际结果，并单独说明是否检查了浏览器重新加载流程。'],
    related: ['test-driven-development', 'requesting-code-review', 'finishing-a-development-branch']
  },
  {
    id: 'requesting-code-review', category: 'workflow', title: ['Ask for a review with context', '带着准确背景请求审查'], short: ['Review the actual change', '审查实际修改'],
    intro: ['Request a focused review while mistakes are still cheap to fix. Provide the intended behavior and the exact change range, so the reviewer can evaluate the work independently.', '在修正成本仍低时请求聚焦审查。提供预期行为与准确的变更范围，使审查者能够独立评估工作。'],
    when: ['After tasks in subagent-driven development, after a major feature, and before merging. A fresh review is also useful when stuck or after a complex fix.', '在子代理驱动开发的任务之后、主要功能完成后以及合并之前使用。遇到阻碍或完成复杂修复后，独立审查也很有用。'],
    steps: [
      ['Identify the base and head commits that bound the change. Collect the plan or requirements and a concise description of what was implemented.', '确定界定修改范围的起始和结束提交。收集计划或需求，以及已实现内容的简短描述。'],
      ['Dispatch a reviewer with precisely crafted context using the upstream review template. Keep the request centered on the work product.', '使用上游审查模板，给审查代理提供精确组织的背景。请求应围绕工作成果展开。'],
      ['Fix Critical findings immediately and Important findings before proceeding. Track Minor findings; challenge incorrect feedback with code or test evidence.', '立即修复严重问题，继续前修复重要问题，记录轻微问题；用代码或测试证据质疑不正确的反馈。']
    ],
    rule: ['Review checks whether the change meets requirements as well as whether the code is sound. A passing test suite alone does not establish either completely.', '审查既检查变更是否满足需求，也检查代码是否可靠。仅凭测试集通过，无法完整证明这两点。'],
    mistake: ['Asking "review my code" without the requirements or commit range, or sending the entire conversation instead of a concise review package.', '只说"审查我的代码"，却不给需求或提交范围；或发送整段对话，而非简明的审查材料。'],
    example: ['Provide the saved-search spec, the persistence and UI commit range, and the verification results. Ask the reviewer to check data lifetime and the restore behavior.', '提供保存搜索的规格、持久化与界面的提交范围以及验证结果。请审查者检查数据生命周期和恢复行为。'],
    related: ['receiving-code-review', 'subagent-driven-development', 'verification-before-completion']
  },
  {
    id: 'receiving-code-review', category: 'quality', title: ['Evaluate feedback before editing', '先判断反馈，再修改'], short: ['Verify review suggestions', '验证审查建议'],
    intro: ['Treat review feedback as technical input to understand and verify. Implement valid suggestions and explain disagreements with evidence from the actual codebase.', '把审查反馈当作需要理解和验证的技术输入。实施合理建议，并用实际代码库中的证据解释分歧。'],
    when: ['When review comments arrive, especially when a suggestion is ambiguous, might break compatibility, or appears to add work the product does not need.', '收到审查意见时使用，尤其是建议含糊、可能破坏兼容性，或似乎增加产品不需要的工作时。'],
    steps: [
      ['Read all comments and restate the technical requirements. Clarify unclear items before implementing because the comments may depend on one another.', '阅读所有评论，重述技术要求。实现前澄清不明确的条目，因为评论之间可能相互依赖。'],
      ['Check the suggestion against existing behavior, supported platforms, actual usage, and prior user decisions. Give a technical response or reasoned pushback.', '对照现有行为、支持平台、实际使用情况和用户先前决策检查建议。给出技术回应或有理由的反对意见。'],
      ['Fix blocking issues first, then simple and complex fixes. Implement one item at a time, test it, and check for regressions.', '先修阻塞问题，再处理简单和复杂修改。每次实现一项并测试，检查是否出现回归。']
    ],
    rule: ['Technical correctness matters more than automatic agreement. If you cannot verify a suggestion, state what is missing instead of pretending certainty.', '技术正确性比自动赞同更重要。无法验证建议时，说明缺少什么，不要假装确定。'],
    mistake: ['Removing a compatibility path just because a reviewer calls it legacy, without checking the supported runtime versions.', '仅因为审查者把某段代码称为旧代码，就删除兼容路径，而不检查支持的运行时版本。'],
    example: ['A reviewer suggests replacing local storage with a server. Check whether cross-device sync is actually in the approved scope before introducing a backend.', '审查者建议用服务器替代本地存储。引入后端前，先检查跨设备同步是否确实属于已批准范围。'],
    related: ['requesting-code-review', 'systematic-debugging', 'test-driven-development']
  },
  {
    id: 'finishing-a-development-branch', category: 'workflow', title: ['Finish with an explicit choice', '用明确选择完成收尾'], short: ['Verify and hand off', '验证与交接'],
    intro: ['Close the development loop by verifying the work, detecting the repository state, and letting the user decide how to integrate it. Cleanup depends on how the workspace was created.', '通过验证工作、检测代码库状态，并让用户决定集成方式，完成开发闭环。清理方式取决于工作空间的创建来源。'],
    when: ['When implementation is complete and it is time to integrate or preserve the branch. The skill starts by running the full test suite; integration choices come after it passes.', '当实现完成，需要集成或保留分支时使用。技能先运行完整测试集，通过后才提供集成选项。'],
    steps: [
      ['Run the full suite. If it fails, report the failures and stop the finishing flow.', '运行完整测试集。失败时报告故障并停止收尾流程。'],
      ['Detect a normal checkout, a named worktree branch, or an externally managed detached HEAD. Establish the correct base branch.', '检测普通检出、worktree 中的命名分支，或外部管理的 detached HEAD。确定正确的基础分支。'],
      ['Offer the applicable choices and wait: merge locally, push and create a PR, or keep the branch. Detached HEAD has only PR-as-new-branch or keep. Clean up only when the chosen path and workspace ownership allow it.', '提供适用选项并等待选择：本地合并、推送并创建 PR，或保留分支。detached HEAD 只提供以新分支创建 PR 或保留。只有所选路径和工作空间所有权允许时才清理。']
    ],
    rule: ['Discard is not a routine menu option in this revision. It requires an explicit user request and a separate confirmation; externally managed worktrees should be preserved.', '此版本不把丢弃工作列为常规选项。丢弃需要用户明确提出并单独确认；外部管理的 worktree 应予保留。'],
    mistake: ['Automatically merging after tests pass, assuming the base branch, or deleting a worktree that the environment owns.', '测试通过后自动合并、擅自假定基础分支，或删除由环境管理的 worktree。'],
    example: ['The saved-search feature passes verification. Present the integration choices with the correct base branch; if the user keeps the branch, report its location and preserve the workspace.', '保存搜索功能通过验证。基于正确的基础分支提供集成选项；若用户选择保留分支，就报告位置并保留工作空间。'],
    related: ['verification-before-completion', 'using-git-worktrees', 'requesting-code-review']
  },
  {
    id: 'dispatching-parallel-agents', category: 'toolbox', title: ['Split only independent work', '只拆分互不依赖的工作'], short: ['Investigate concurrently', '并行调查'],
    intro: ['Assign one focused agent to each independent problem domain. Parallelism helps when work can proceed without shared mutable state or a result from another task.', '为每个独立问题领域分配一个专注代理。当任务不共享可变状态，也不依赖其他任务的结果时，并行执行才有帮助。'],
    when: ['For two or more independent tasks, such as unrelated failures in separate subsystems. First establish independence; several failures may have a single shared cause.', '适用于两个或更多独立任务，例如不同子系统中互不相关的故障。先确认独立性；多个失败也可能源于同一个原因。'],
    steps: [
      ['Group work by independent domain. Keep related failures and tasks with shared state together.', '按独立领域分组。相互关联的故障和共享状态的任务应放在一起。'],
      ['Give each agent a specific scope, clear goal, constraints, and expected output, with only the necessary context. Dispatch the independent tasks concurrently.', '给每个代理明确范围、目标、约束和预期输出，仅提供必要背景。并发派遣独立任务。'],
      ['Read the results, inspect changes for conflicts, and run the integrated test suite before accepting the combined result.', '阅读结果，检查修改冲突，并在接受组合结果前运行集成测试集。']
    ],
    rule: ['Independence is a precondition, not a result of delegation. If agents would edit the same logic or need each other\'s answers, investigate sequentially.', '独立性是委派的前提，不会因为委派而自动产生。如果代理要修改同一逻辑或依赖彼此答案，应顺序调查。'],
    mistake: ['Launching one agent per failing test before checking whether all failures come from the same initialization bug.', '尚未检查所有失败是否来自同一个初始化缺陷，就为每个失败测试启动一个代理。'],
    example: ['A docs link checker and an unrelated parser test fail. Give them separate scopes, then run both checks on the combined changes. Do not parallelize storage and UI changes that are still negotiating an interface.', '文档链接检查与无关的解析器测试同时失败。分别限定范围处理，再对组合修改运行两项检查。存储与界面如果仍在协商接口，就不应并行修改。'],
    related: ['subagent-driven-development', 'systematic-debugging', 'verification-before-completion']
  },
  {
    id: 'writing-skills', category: 'foundation', title: ['Test the instructions themselves', '测试指令本身'], short: ['Build and test reusable skills', '构建并测试可复用技能'],
    intro: ['Apply test-driven development to process documentation. Observe an agent failing a realistic scenario without the skill, write guidance for that failure, and verify the behavior improves.', '把测试驱动开发应用于流程文档。先观察代理在没有技能时如何在真实场景中失败，再针对失败编写指导，并验证行为是否改善。'],
    when: ['When creating or editing reusable skills, or verifying them before deployment. Project-specific conventions belong in project instructions; mechanically enforceable rules are often better automated.', '创建、编辑可复用技能，或在部署前验证技能时使用。项目专属约定应写入项目指令；可以机械执行的规则通常更适合自动化。'],
    steps: [
      ['RED: run representative scenarios without the skill and record the observed failures and rationalizations. Use pressure scenarios for discipline rules.', '红：在没有技能时运行代表性场景，记录观察到的失败及辩解。对于纪律性规则，使用压力场景。'],
      ['GREEN: write the minimum guidance addressing that failure. Use a discoverable name and a description of when to use it, then re-run the scenarios with the skill.', '绿：编写针对该失败的最少指导。使用易检索名称和说明触发条件的描述，然后带着技能重新运行场景。'],
      ['REFACTOR: close observed gaps and re-test. For wording experiments, include a no-guidance control and repeated fresh-context samples, then perform the full scenario checks.', '重构：补上实际观察到的缺口并重新测试。措辞实验应包含无指导对照和多次新上下文采样，之后仍需执行完整场景检查。']
    ],
    rule: ['Match the instruction form to the failure: prohibitions for skipped rules, positive output recipes for wrong-shaped responses, required fields for omissions, and explicit conditions for conditional behavior.', '让指令形式匹配失败类型：跳过规则用禁止性约束，输出形态错误用正向范式，遗漏内容用必填字段，条件性行为用明确条件。'],
    mistake: ['Writing an elaborate skill before observing a baseline failure, or assuming more prohibitions will improve an output-format problem.', '尚未观察到基线失败就写复杂技能，或以为增加禁止条款就能改善输出格式问题。'],
    example: ['To teach verification, first test an agent under deadline pressure without the new guidance. Add a targeted rule only if it claims success without evidence, then repeat the same scenario with the skill.', '要教会代理验证，先在没有新指导的情况下测试它在截止时间压力下的行为。只有观察到无证据宣布成功，才添加针对性规则，再带着技能重复相同场景。'],
    related: ['test-driven-development', 'using-superpowers', 'verification-before-completion']
  }
];
