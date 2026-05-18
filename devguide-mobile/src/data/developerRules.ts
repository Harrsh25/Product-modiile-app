import { Category, Rule } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    icon: 'layers-outline',
    color: '#FF6B9D',
    gradient: ['#FF6B9D', '#FF8C69'],
    description: 'UI components, responsiveness, and user experience patterns.',
    ruleCount: 5,
  },
  {
    id: 'backend',
    name: 'Backend',
    icon: 'server-outline',
    color: '#4ECDC4',
    gradient: ['#4ECDC4', '#45B7D1'],
    description: 'Server architecture, routing, validation, and clean code.',
    ruleCount: 5,
  },
  {
    id: 'database',
    name: 'Database',
    icon: 'cylinder-outline',
    color: '#FFD166',
    gradient: ['#FFD166', '#F7A93E'],
    description: 'Schema design, indexing, migrations, and query optimisation.',
    ruleCount: 5,
  },
  {
    id: 'api',
    name: 'APIs',
    icon: 'git-network-outline',
    color: '#6C63FF',
    gradient: ['#6C63FF', '#8B85FF'],
    description: 'REST design, status codes, pagination, and documentation.',
    ruleCount: 5,
  },
  {
    id: 'authentication',
    name: 'Auth',
    icon: 'shield-checkmark-outline',
    color: '#45B7D1',
    gradient: ['#45B7D1', '#6C63FF'],
    description: 'Secure login, JWT, password hashing, and route protection.',
    ruleCount: 5,
  },
  {
    id: 'security',
    name: 'Security',
    icon: 'lock-closed-outline',
    color: '#F7444E',
    gradient: ['#F7444E', '#FF6B9D'],
    description: 'Input validation, secrets, HTTPS, rate limiting, and more.',
    ruleCount: 5,
  },
  {
    id: 'testing',
    name: 'Testing',
    icon: 'checkmark-circle-outline',
    color: '#26C281',
    gradient: ['#26C281', '#4ECDC4'],
    description: 'Unit, integration, and end-to-end testing best practices.',
    ruleCount: 5,
  },
  {
    id: 'deployment',
    name: 'Deployment',
    icon: 'rocket-outline',
    color: '#F7A93E',
    gradient: ['#F7A93E', '#FFD166'],
    description: 'CI/CD, environment variables, monitoring, and rollback plans.',
    ruleCount: 5,
  },
];

export const RULES: Rule[] = [
  // ─── FRONTEND ───────────────────────────────────────────────────────────────
  {
    id: 'fe-001',
    title: 'Use Reusable Components',
    category: 'frontend',
    shortDescription: 'Break UI into small, reusable, single-responsibility components.',
    fullExplanation:
      'Every piece of UI should be extracted into its own component when it appears more than once or when the JSX tree becomes complex. A component should do one thing well: render a button, display a user avatar, or show a card. Keep props minimal and types explicit.',
    whyItMatters:
      'Reusable components reduce duplication, make refactoring easy, and give every developer on the team a shared vocabulary. Changing the design of a button in one place updates it everywhere.',
    goodExample:
      `// components/PrimaryButton.tsx\ninterface Props {\n  label: string;\n  onPress: () => void;\n  loading?: boolean;\n}\nexport const PrimaryButton = ({ label, onPress, loading }: Props) => (\n  <TouchableOpacity onPress={onPress} disabled={loading}>\n    {loading ? <ActivityIndicator /> : <Text>{label}</Text>}\n  </TouchableOpacity>\n);`,
    badExample:
      `// Inline button everywhere\n<TouchableOpacity onPress={handleSubmit}\n  style={{ backgroundColor: '#6C63FF', padding: 12, borderRadius: 8 }}>\n  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit</Text>\n</TouchableOpacity>`,
    checklist: [
      'Extract any JSX repeated more than twice into a component',
      'Keep component files under 200 lines',
      'Accept only the props the component actually needs',
      'Name components clearly after what they display',
      'Write TypeScript prop interfaces for all components',
    ],
    commonMistakes: [
      'Passing the entire state object as a prop instead of specific fields',
      'Building "god components" that handle logic, data fetching, and rendering',
      'Naming components after implementation details (e.g. BlueButton) instead of purpose',
    ],
    difficulty: 'Beginner',
    importance: 'High',
  },
  {
    id: 'fe-002',
    title: 'Keep UI Fully Responsive',
    category: 'frontend',
    shortDescription: 'Design layouts that adapt to any screen size without breaking.',
    fullExplanation:
      'Use flexbox, percentage widths, and Dimensions API instead of fixed pixel values. Test on small phones (320 px wide) and large tablets. Use ScrollView for content that may exceed screen height. Avoid absolute positioning unless absolutely necessary.',
    whyItMatters:
      'Users run your app on hundreds of device sizes. A layout that looks great on an iPhone 15 Pro may be completely broken on a budget Android phone or a tablet.',
    goodExample:
      `const { width } = Dimensions.get('window');\nconst CARD_WIDTH = width * 0.45;\n\n<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>\n  {categories.map(c => <CategoryCard key={c.id} width={CARD_WIDTH} {...c} />)}\n</View>`,
    badExample:
      `<View style={{ width: 180, height: 220 }}>\n  {/* Fixed size — breaks on small phones */}\n</View>`,
    checklist: [
      'Never use fixed pixel widths for containers',
      'Test on at least 3 screen sizes before shipping',
      'Use SafeAreaView on all root screens',
      'Ensure text scales correctly with large-font accessibility settings',
      'Scroll views handle overflow content',
    ],
    commonMistakes: [
      'Hard-coding pixel widths that only match the design mockup device',
      'Forgetting safe area insets on notched or punch-hole screens',
      'Relying on absolute positioning for complex layouts',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'fe-003',
    title: 'Consistent Spacing & Typography',
    category: 'frontend',
    shortDescription: 'Define a spacing scale and type system — use only those values.',
    fullExplanation:
      'Create a theme file with a spacing scale (4, 8, 12, 16, 24, 32, 48) and font-size scale. Reference these constants everywhere instead of hard-coding numbers. Consistent rhythm makes the UI feel polished and professional.',
    whyItMatters:
      'Random spacing values (11px, 17px, 23px) make the UI look amateurish and make future design changes painful. A consistent scale keeps every screen visually harmonious.',
    goodExample:
      `// theme/spacing.ts\nexport const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };\n\n// usage\n<View style={{ padding: Spacing.md, marginBottom: Spacing.sm }} />`,
    badExample:
      `<View style={{ padding: 13, marginBottom: 7, marginTop: 11 }} />\n// Different magic numbers all over the codebase`,
    checklist: [
      'Create a spacing constants file and import it everywhere',
      'Define a type scale with named sizes (body, h1, caption…)',
      'Never use arbitrary spacing values',
      'Use consistent line-height ratios',
      'Apply spacing scale to padding, margin, and gap properties',
    ],
    commonMistakes: [
      'Each screen uses its own spacing numbers',
      'Mixing rem and px equivalents without a system',
      'Font sizes that differ by 1–2px with no visual purpose',
    ],
    difficulty: 'Beginner',
    importance: 'High',
  },
  {
    id: 'fe-004',
    title: 'Handle Loading & Empty States',
    category: 'frontend',
    shortDescription: 'Every async action needs a loading indicator, empty state, and error view.',
    fullExplanation:
      'When fetching data show a skeleton or spinner. When the list is empty show a friendly illustration and a call-to-action. When the request fails show a descriptive error message with a retry button. The user should never see a blank screen.',
    whyItMatters:
      'Unhandled loading and error states are one of the most common causes of bad user experience reviews. Users interpret a blank screen as a crash, not a loading state.',
    goodExample:
      `if (isLoading) return <LoadingSpinner />;\nif (error) return <ErrorView message={error} onRetry={refetch} />;\nif (data.length === 0) return <EmptyState message="No rules yet" />;\nreturn <RuleList data={data} />;`,
    badExample:
      `// Nothing handles loading or errors\nreturn <RuleList data={data} />;`,
    checklist: [
      'All data-fetching functions have isLoading, error, and data states',
      'Loading state shows a spinner or skeleton UI',
      'Empty state shows an icon, message, and optional CTA',
      'Error state shows message and retry button',
      'Pull-to-refresh is implemented where appropriate',
    ],
    commonMistakes: [
      'Showing an empty list without any message',
      'Showing a spinner that never disappears on error',
      'Using console.error only and silently swallowing fetch failures',
    ],
    difficulty: 'Beginner',
    importance: 'High',
  },
  {
    id: 'fe-005',
    title: 'Validate Forms Before API Calls',
    category: 'frontend',
    shortDescription: 'Validate all inputs client-side before sending any network request.',
    fullExplanation:
      'Check required fields, format constraints (email, phone), and minimum lengths before calling any API. Show inline error messages next to the offending field. Disable the submit button until the form is valid. This saves server round-trips and gives instant feedback.',
    whyItMatters:
      'Client-side validation is not a substitute for server-side validation, but it provides immediate, friendly feedback that reduces frustration and unnecessary API calls.',
    goodExample:
      `const validate = () => {\n  if (!email.includes('@')) { setEmailError('Enter a valid email'); return false; }\n  if (password.length < 8) { setPasswordError('Min 8 characters'); return false; }\n  return true;\n};\nconst handleSubmit = () => { if (!validate()) return; callApi(); };`,
    badExample:
      `// No validation — API call fires immediately\nconst handleSubmit = () => callApi({ email, password });`,
    checklist: [
      'All required fields show an error when left empty',
      'Email fields validate format',
      'Password fields enforce minimum length',
      'Submit button is disabled until form is valid',
      'Error messages appear inline next to fields',
    ],
    commonMistakes: [
      'Relying solely on server error messages for basic validation',
      'Clearing all errors when the user types, before re-validating',
      'Showing vague errors like "Invalid input"',
    ],
    difficulty: 'Beginner',
    importance: 'High',
  },

  // ─── BACKEND ────────────────────────────────────────────────────────────────
  {
    id: 'be-001',
    title: 'Separate Routes, Controllers & Services',
    category: 'backend',
    shortDescription: 'Keep route definitions, request handling, and business logic in separate layers.',
    fullExplanation:
      'Routes define URL patterns and link to controllers. Controllers handle HTTP concerns: parse the request, call a service, and send the response. Services contain pure business logic and talk to the database. This layered architecture keeps each file focused and testable.',
    whyItMatters:
      'When all logic lives in a single route handler, testing becomes impossible without spinning up an HTTP server. Separation lets you unit-test services independently of Express.',
    goodExample:
      `// routes/users.ts\nrouter.post('/register', userController.register);\n\n// controllers/userController.ts\nexport const register = async (req, res) => {\n  const user = await userService.createUser(req.body);\n  res.status(201).json({ user });\n};\n\n// services/userService.ts\nexport const createUser = async (data) => {\n  const hash = await bcrypt.hash(data.password, 12);\n  return User.create({ ...data, passwordHash: hash });\n};`,
    badExample:
      `// Everything in one route handler\nrouter.post('/register', async (req, res) => {\n  const hash = await bcrypt.hash(req.body.password, 12);\n  const user = await db.query('INSERT INTO users ...');\n  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);\n  res.json({ user, token });\n});`,
    checklist: [
      'Routes only define URL patterns and point to controllers',
      'Controllers only handle HTTP parsing and response',
      'Services contain all business logic',
      'Models only define schema/query interface',
      'No database queries inside route handlers',
    ],
    commonMistakes: [
      'Writing 100-line route handlers with embedded SQL',
      'Calling ORM models directly from routes',
      'Mixing validation, business logic, and response in one function',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'be-002',
    title: 'Validate All Incoming Requests',
    category: 'backend',
    shortDescription: 'Never trust frontend data. Validate every field on the server.',
    fullExplanation:
      'Use a validation library (Joi, Zod, express-validator) to define schemas for every request body, query parameter, and route parameter. Reject invalid requests with a 400 status before any business logic runs. This is your last line of defence against malformed or malicious data.',
    whyItMatters:
      'Frontend validation can be bypassed with a simple cURL request. Server-side validation protects your database and business logic from corrupt or malicious input.',
    goodExample:
      `import { z } from 'zod';\nconst registerSchema = z.object({\n  name: z.string().min(2).max(100),\n  email: z.string().email(),\n  password: z.string().min(8),\n});\n\nrouter.post('/register', (req, res) => {\n  const result = registerSchema.safeParse(req.body);\n  if (!result.success) return res.status(400).json({ errors: result.error.issues });\n  // proceed with valid data\n});`,
    badExample:
      `router.post('/register', async (req, res) => {\n  // No validation — inserts whatever the client sends\n  const user = await User.create(req.body);\n  res.json(user);\n});`,
    checklist: [
      'Every route has a validation schema',
      'Validation runs before any controller logic',
      'Invalid requests return 400 with field-level error messages',
      'Route parameters (/:id) are validated as UUIDs or integers',
      'File uploads validate MIME type and size',
    ],
    commonMistakes: [
      'Assuming the frontend will never send bad data',
      'Only validating presence, not format or length',
      'Returning raw validation errors that leak schema details',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'be-003',
    title: 'Use Proper Error Handling',
    category: 'backend',
    shortDescription: 'Catch all errors centrally. Never let unhandled exceptions crash the server.',
    fullExplanation:
      'Create a global error-handling middleware as the last `app.use()` call. All async route handlers should be wrapped in try/catch that forwards errors to `next(err)`. Use custom error classes to distinguish between operational errors (400/404) and programming errors (500). Log errors server-side but send safe messages to clients.',
    whyItMatters:
      'An unhandled promise rejection will crash your Node.js process in older versions and silently swallow errors in newer ones. A crashed server means downtime for all users.',
    goodExample:
      `class AppError extends Error {\n  constructor(public message: string, public statusCode: number) {\n    super(message);\n  }\n}\n\n// Central error handler\napp.use((err, req, res, next) => {\n  const status = err.statusCode ?? 500;\n  const message = status < 500 ? err.message : 'Internal server error';\n  res.status(status).json({ error: message });\n});`,
    badExample:
      `router.get('/user/:id', async (req, res) => {\n  const user = await User.findById(req.params.id); // Throws if DB is down\n  res.json(user); // Crash with unhandled rejection\n});`,
    checklist: [
      'Global error-handling middleware is registered',
      'All async handlers use try/catch with next(err)',
      'Custom error class carries statusCode',
      '500 errors log the full stack trace server-side',
      '500 error messages sent to clients are generic',
    ],
    commonMistakes: [
      'Sending stack traces to API clients',
      'Forgetting to call next(err) in catch blocks',
      'Swallowing errors with empty catch blocks',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'be-004',
    title: 'Keep Secrets in Environment Variables',
    category: 'backend',
    shortDescription: 'Never hard-code API keys, passwords, or secrets in source code.',
    fullExplanation:
      'Use dotenv (or your platform\'s secret manager) to load sensitive values at runtime. Add .env to .gitignore immediately. Provide a .env.example with placeholder values so developers know what variables are required. Access values via process.env.VARIABLE_NAME and validate their presence at startup.',
    whyItMatters:
      'Secrets committed to Git are permanently in the history — even if you delete the file. A leaked database password can compromise all user data. This has caused major data breaches at large companies.',
    goodExample:
      `// .env\nJWT_SECRET=super-secret-key-here\nDB_URI=mongodb://localhost:27017/devguide\n\n// startup validation\nconst required = ['JWT_SECRET', 'DB_URI'];\nrequired.forEach(key => {\n  if (!process.env[key]) throw new Error(\`Missing env var: \${key}\`);\n});`,
    badExample:
      `// Hard-coded in source — DO NOT do this\nconst token = jwt.sign(payload, 'my-super-secret-key');\nconst db = mongoose.connect('mongodb+srv://admin:password123@cluster.mongodb.net');`,
    checklist: [
      '.env is in .gitignore before first commit',
      '.env.example exists with placeholder values',
      'All secrets are loaded from process.env',
      'App validates required env vars at startup',
      'Secrets are rotated when developers leave the team',
    ],
    commonMistakes: [
      'Committing .env with real values',
      'Hard-coding secrets in config files',
      'Sharing secrets over Slack or email',
    ],
    difficulty: 'Beginner',
    importance: 'Critical',
  },
  {
    id: 'be-005',
    title: 'Return Consistent API Response Format',
    category: 'backend',
    shortDescription: 'Every endpoint should return data in the same predictable envelope.',
    fullExplanation:
      'Define a standard response shape used by every endpoint: { success, data, error, meta }. Successful responses wrap the payload in data. Errors include an error object with message and optional code. Pagination metadata lives in meta. This lets the frontend handle all responses with a single helper.',
    whyItMatters:
      'Inconsistent responses (sometimes { user }, sometimes { data: { user } }, sometimes the raw object) force the frontend to handle every endpoint differently and make API clients fragile.',
    goodExample:
      `// Success\n{ "success": true, "data": { "user": { "id": 1, "name": "Alice" } } }\n\n// Error\n{ "success": false, "error": { "message": "User not found", "code": "USER_NOT_FOUND" } }\n\n// List with pagination\n{ "success": true, "data": [...], "meta": { "page": 1, "total": 42 } }`,
    badExample:
      `// Different shapes per endpoint\nGET /users → [ { id: 1 }, { id: 2 } ]\nGET /users/1 → { user: { id: 1 } }\nPOST /users → { result: "ok", newUser: { id: 3 } }`,
    checklist: [
      'All success responses use { success: true, data: ... }',
      'All error responses use { success: false, error: { message, code } }',
      'Pagination metadata is always in meta',
      'HTTP status code matches the success/error state',
      'A response helper function is used everywhere',
    ],
    commonMistakes: [
      'Returning raw Mongoose documents without a consistent wrapper',
      'Using different keys (result, payload, body) per endpoint',
      'Omitting error codes that the frontend needs to act on',
    ],
    difficulty: 'Beginner',
    importance: 'High',
  },

  // ─── DATABASE ───────────────────────────────────────────────────────────────
  {
    id: 'db-001',
    title: 'Design Clear Schemas',
    category: 'database',
    shortDescription: 'Define explicit types, constraints, and relationships for every model.',
    fullExplanation:
      'Every field should have a deliberate type, nullability decision, default value, and constraint. Relationships should be explicit via foreign keys (SQL) or references (NoSQL). Document the intent of non-obvious fields with a short comment. Avoid generic column names like data or info.',
    whyItMatters:
      'A poorly designed schema forces application code to paper over database shortcomings. It becomes harder to query, harder to migrate, and harder to onboard new developers.',
    goodExample:
      `// Mongoose schema\nconst userSchema = new Schema({\n  name: { type: String, required: true, trim: true, maxlength: 100 },\n  email: { type: String, required: true, unique: true, lowercase: true },\n  passwordHash: { type: String, required: true },\n  role: { type: String, enum: ['user', 'admin'], default: 'user' },\n  createdAt: { type: Date, default: Date.now },\n});`,
    badExample:
      `const userSchema = new Schema({\n  n: String,   // What is this?\n  e: String,   // And this?\n  p: String,   // Password? Password hash? PIN?\n  d: String,   // ?\n});`,
    checklist: [
      'Every field has an explicit type',
      'Required fields are marked required',
      'Enum fields list all allowed values',
      'Foreign keys / refs are explicit',
      'Field names are descriptive (passwordHash not pw)',
    ],
    commonMistakes: [
      'Storing serialised JSON in a text column',
      'Using nullable fields everywhere to avoid schema changes',
      'Mixing concerns in one table (e.g. users + user_sessions)',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'db-002',
    title: 'Add Indexes for Common Queries',
    category: 'database',
    shortDescription: 'Index every field you filter, sort, or join on in frequent queries.',
    fullExplanation:
      'Without indexes, queries do a full table scan — O(n). An index makes lookups O(log n). Add single-column indexes on foreign keys and frequently filtered fields. Add compound indexes when queries filter on multiple columns together. Avoid over-indexing: each index costs disk space and write performance.',
    whyItMatters:
      'A table with 1 million rows and no index on email will take seconds to find a user. A proper index makes it milliseconds. Missing indexes are the #1 cause of performance degradation as data grows.',
    goodExample:
      `// MongoDB\nuserSchema.index({ email: 1 }, { unique: true });\nuserSchema.index({ createdAt: -1 });\n\n// SQL\nCREATE INDEX idx_rules_category ON rules(category);\nCREATE INDEX idx_checklist_user_rule ON checklist(user_id, rule_id);`,
    badExample:
      `// No indexes defined — relies on full collection scans\nconst user = await User.findOne({ email: req.body.email });\n// Scans every document in the users collection`,
    checklist: [
      'Every foreign key has an index',
      'Fields used in WHERE clauses have indexes',
      'Frequently sorted fields have indexes',
      'Unique constraints are enforced with unique indexes',
      'Index usage is verified with EXPLAIN/explain()',
    ],
    commonMistakes: [
      'Indexing every column "just in case"',
      'Forgetting compound indexes for multi-column queries',
      'Adding indexes after performance problems appear in production',
    ],
    difficulty: 'Intermediate',
    importance: 'High',
  },
  {
    id: 'db-003',
    title: 'Use Migrations for Schema Changes',
    category: 'database',
    shortDescription: 'Track all database changes in versioned migration files.',
    fullExplanation:
      'Never modify a production schema by running SQL directly in a database client. Write a migration file (up/down) that can be run programmatically and committed to version control. Tools: Knex, TypeORM, Sequelize, Flyway, or Mongoose-migrate. Every team member runs the same migrations in the same order.',
    whyItMatters:
      'Without migrations, different developers have different schemas. Deploying to production requires manual intervention and is error-prone. A rollback plan is impossible.',
    goodExample:
      `// migrations/20240101_add_role_to_users.ts\nexport const up = async (knex) => {\n  await knex.schema.table('users', (t) => {\n    t.string('role').notNullable().defaultTo('user');\n  });\n};\nexport const down = async (knex) => {\n  await knex.schema.table('users', (t) => t.dropColumn('role'));\n};`,
    badExample:
      `// "Quick fix" run directly in production MySQL\nALTER TABLE users ADD COLUMN role VARCHAR(50);\n// Not tracked, can't be rolled back, team doesn't know`,
    checklist: [
      'Migration tool is set up in the project',
      'Every schema change has a migration file',
      'Migrations have both up and down functions',
      'Migration files are committed to version control',
      'CI runs migrations automatically',
    ],
    commonMistakes: [
      'Running raw ALTER TABLE on production without a migration',
      'Writing up migrations without the down counterpart',
      'Editing existing migration files instead of creating new ones',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'db-004',
    title: 'Avoid Unnecessary Data Duplication',
    category: 'database',
    shortDescription: 'Normalise your schema to avoid storing the same data in multiple places.',
    fullExplanation:
      'Data duplication means that when one copy changes, all copies must change — and they often do not. Normalise your schema so each piece of information lives in exactly one place. Use foreign key references instead of copying the data. Use denormalisation intentionally only for read performance.',
    whyItMatters:
      'Duplicate data leads to inconsistencies. If a user\'s email is stored in three tables and they update it, you need to update all three — and any code that misses one creates stale data.',
    goodExample:
      `// Normalised: user data lives only in users table\n// checklist references user by ID\n{\n  checklistId: "abc",\n  userId: "user-123",   // reference, not a copy\n  ruleId: "fe-001",\n  completed: true\n}`,
    badExample:
      `// Denormalised — user name duplicated in every checklist row\n{\n  checklistId: "abc",\n  userName: "Alice",    // duplicated from users table\n  userEmail: "alice@example.com",\n  ruleId: "fe-001"\n}`,
    checklist: [
      'User data is stored once in the users table',
      'Other tables reference users by ID',
      'Denormalisation is documented with a reason',
      'No calculated values are stored if they can be derived',
      'Enum values are stored in lookup tables (SQL) or defined in code',
    ],
    commonMistakes: [
      'Copying user display names into every related table',
      'Storing computed totals instead of computing on read',
      'Over-normalising to the point of needing 10 JOINs for a simple query',
    ],
    difficulty: 'Intermediate',
    importance: 'High',
  },
  {
    id: 'db-005',
    title: 'Use Meaningful Field Names',
    category: 'database',
    shortDescription: 'Column and field names should be self-explanatory and consistent.',
    fullExplanation:
      'Use snake_case for SQL, camelCase for MongoDB. Prefer passwordHash over pw, createdAt over created, isActive over flag1. Avoid abbreviations unless universally understood. Boolean fields should read like a question: isVerified, hasSubscription. Timestamp fields end in At: createdAt, updatedAt, deletedAt.',
    whyItMatters:
      'A new developer reading the schema should understand what each field stores without hunting through the codebase. Unclear names cause bugs when developers misuse fields.',
    goodExample:
      `users {\n  id, name, email, passwordHash,\n  isEmailVerified, role, createdAt, updatedAt\n}\nrules {\n  id, title, category, shortDescription,\n  difficulty, importance, createdAt\n}`,
    badExample:
      `users {\n  id, n, em, pw, v, r, c, u\n}\nrules {\n  id, t, cat, desc, d, imp, ts\n}`,
    checklist: [
      'No single-letter column names (except maybe id)',
      'Boolean fields start with is/has/can',
      'Timestamp fields end with At',
      'Consistent casing convention throughout',
      'Acronyms are consistently cased (userId not UserId)',
    ],
    commonMistakes: [
      'Using type as a column name (reserved word in SQL)',
      'Inconsistent pluralisation (user vs users)',
      'Short abbreviations that mean different things to different people',
    ],
    difficulty: 'Beginner',
    importance: 'Medium',
  },

  // ─── API ─────────────────────────────────────────────────────────────────────
  {
    id: 'api-001',
    title: 'Use Correct HTTP Methods',
    category: 'api',
    shortDescription: 'Match HTTP verbs to the operation: GET, POST, PUT/PATCH, DELETE.',
    fullExplanation:
      'GET retrieves data without side effects. POST creates a new resource. PUT replaces a resource entirely. PATCH partially updates a resource. DELETE removes a resource. Using the wrong method (GET to delete, POST to fetch) confuses clients, breaks caching, and violates the HTTP standard.',
    whyItMatters:
      'HTTP caches (CDNs, browsers) assume GET is safe and idempotent. A GET that deletes data will be replayed by browser prefetching. Correct methods enable caching, retries, and standard tooling.',
    goodExample:
      `GET    /api/rules          → list all rules\nGET    /api/rules/:id      → get one rule\nPOST   /api/rules          → create a rule\nPATCH  /api/rules/:id      → update a rule\nDELETE /api/rules/:id      → delete a rule`,
    badExample:
      `GET  /api/deleteRule?id=5\nPOST /api/getRules\nGET  /api/createUser?name=Alice`,
    checklist: [
      'GET endpoints never modify data',
      'POST creates new resources',
      'PUT/PATCH update existing resources',
      'DELETE removes resources',
      'No RPC-style URLs like /doSomething',
    ],
    commonMistakes: [
      'Using GET for operations that change data',
      'Using POST for all operations out of laziness',
      'Conflating PUT (full replace) and PATCH (partial update)',
    ],
    difficulty: 'Beginner',
    importance: 'High',
  },
  {
    id: 'api-002',
    title: 'Return Proper HTTP Status Codes',
    category: 'api',
    shortDescription: 'Use the correct status code for every response — not just 200 and 500.',
    fullExplanation:
      '200 OK for successful reads. 201 Created after POST. 204 No Content for DELETE. 400 Bad Request for validation errors. 401 Unauthorized when no credentials. 403 Forbidden when credentials are present but insufficient. 404 Not Found for missing resources. 409 Conflict for duplicate entries. 422 Unprocessable Entity for semantic errors. 500 for server bugs.',
    whyItMatters:
      'Status codes let clients react without parsing the body. A 401 tells the mobile app to show the login screen. A 403 tells it to show "access denied". Using 200 for everything forces clients to parse error messages as strings.',
    goodExample:
      `// 201 on create\nres.status(201).json({ data: newRule });\n\n// 404 on missing resource\nif (!rule) return res.status(404).json({ error: { message: 'Rule not found' } });\n\n// 409 on conflict\nif (existingUser) return res.status(409).json({ error: { message: 'Email already registered' } });`,
    badExample:
      `// Always 200, error in body\nres.status(200).json({ error: "User not found" });\nres.status(200).json({ error: "Unauthorized" });`,
    checklist: [
      '201 used for resource creation',
      '204 used for successful deletion',
      '400 used for malformed requests',
      '401/403 correctly distinguished',
      '404 used for missing resources',
    ],
    commonMistakes: [
      'Returning 200 with error: true in the body',
      'Using 500 for validation errors',
      'Using 403 when 401 is correct (no credentials vs insufficient permissions)',
    ],
    difficulty: 'Beginner',
    importance: 'High',
  },
  {
    id: 'api-003',
    title: 'Add Pagination for Large Lists',
    category: 'api',
    shortDescription: 'Never return unbounded lists — paginate every collection endpoint.',
    fullExplanation:
      'Implement cursor-based or offset-based pagination. Include pagination metadata in the response (total count, current page, next cursor). Set a maximum page size (e.g., 100). Never let a client request the entire dataset in one call. Default to a reasonable page size (20–50).',
    whyItMatters:
      'An endpoint that returns all records will work fine in development with 10 records, but will time out or crash the server when there are 100,000 records in production.',
    goodExample:
      `// Offset pagination\nGET /api/rules?page=2&limit=20\n\n// Response\n{\n  "data": [...],\n  "meta": {\n    "page": 2, "limit": 20,\n    "total": 156, "totalPages": 8,\n    "hasNext": true, "hasPrev": true\n  }\n}`,
    badExample:
      `// Returns ALL records every time\nrouter.get('/rules', async (req, res) => {\n  const rules = await Rule.find({}); // No limit\n  res.json(rules);\n});`,
    checklist: [
      'All list endpoints support page and limit query params',
      'Default page size is defined (e.g. 20)',
      'Maximum page size is enforced (e.g. 100)',
      'Response includes total count and pagination metadata',
      'Offset is validated to be non-negative',
    ],
    commonMistakes: [
      'Returning all records in development and discovering the problem in production',
      'Not returning total count, so clients cannot build pagination UI',
      'Allowing limit=999999 via query params',
    ],
    difficulty: 'Intermediate',
    importance: 'High',
  },
  {
    id: 'api-004',
    title: 'Document All Endpoints',
    category: 'api',
    shortDescription: 'Every endpoint must have documented request/response shapes and auth requirements.',
    fullExplanation:
      'Use OpenAPI (Swagger), Postman collections, or JSDoc comments to document every endpoint. Include: URL, method, authentication requirement, request body schema, query parameters, response body examples, and error codes. Keep documentation in sync with the code — ideally auto-generate it.',
    whyItMatters:
      'Undocumented APIs slow down frontend development, cause integration bugs, and make onboarding painful. Documentation is a contract between the API and its consumers.',
    goodExample:
      `/**\n * @route   GET /api/rules/:id\n * @desc    Get a single rule by ID\n * @access  Public\n * @param   {string} id - Rule UUID\n * @returns {Rule} 200 - Rule object\n * @returns {Error} 404 - Rule not found\n */`,
    badExample:
      `// No documentation — consumers must read source code\nrouter.get('/rules/:id', rulesController.getOne);`,
    checklist: [
      'Every endpoint has a description',
      'Request body and query params are documented with types',
      'Auth requirement (public/JWT) is noted',
      'All possible response codes are listed',
      'Example request and response are provided',
    ],
    commonMistakes: [
      'Documentation that falls out of sync with the actual API',
      'Documenting only happy-path responses',
      'Writing docs after the API ships instead of alongside it',
    ],
    difficulty: 'Beginner',
    importance: 'High',
  },
  {
    id: 'api-005',
    title: 'Version Your API',
    category: 'api',
    shortDescription: 'Prefix routes with /v1/ so you can evolve the API without breaking clients.',
    fullExplanation:
      'Introduce a version prefix (/api/v1/) from the first release. When you need to make breaking changes (rename a field, change response shape), create /api/v2/ and deprecate v1 with a sunset header. This allows old clients to keep working while new clients adopt the improved API.',
    whyItMatters:
      'Without versioning, any change you make can break existing mobile apps that users have not updated. Mobile app update adoption is slow; you need to support old API versions for months.',
    goodExample:
      `// app.ts\napp.use('/api/v1', v1Router);\napp.use('/api/v2', v2Router);\n\n// Deprecation header on v1 responses\nres.setHeader('Deprecation', 'true');\nres.setHeader('Sunset', 'Sat, 31 Dec 2025 23:59:59 GMT');`,
    badExample:
      `// No version prefix — any change is a breaking change\napp.use('/api', router);`,
    checklist: [
      'All routes are prefixed with /v1/',
      'Breaking changes go into a new version',
      'Deprecated versions return Deprecation and Sunset headers',
      'Version is documented in the API reference',
      'Old versions have a clearly communicated end-of-life date',
    ],
    commonMistakes: [
      'Adding versioning after the API is already in production',
      'Using the date as a version instead of a semantic number',
      'Removing a version without adequate notice',
    ],
    difficulty: 'Intermediate',
    importance: 'High',
  },

  // ─── AUTHENTICATION ──────────────────────────────────────────────────────────
  {
    id: 'auth-001',
    title: 'Hash Passwords with bcrypt',
    category: 'authentication',
    shortDescription: 'Never store plain or MD5/SHA passwords. Use bcrypt with cost ≥ 12.',
    fullExplanation:
      'bcrypt is purpose-built for password hashing. It is intentionally slow (cost factor controls slowness), so brute-force attacks are impractical. Use a cost of 12 in production. Never use MD5, SHA-1, or SHA-256 for passwords — they are too fast. Never store passwords in plain text.',
    whyItMatters:
      'Database breaches happen. If passwords are stored in plain text or with a fast hash, every user\'s password is compromised. bcrypt gives users time to change their passwords before attackers can crack them.',
    goodExample:
      `import bcrypt from 'bcrypt';\nconst COST = 12;\n\n// Hashing on registration\nconst passwordHash = await bcrypt.hash(password, COST);\nawait User.create({ email, passwordHash });\n\n// Verification on login\nconst isMatch = await bcrypt.compare(attemptedPassword, user.passwordHash);\nif (!isMatch) throw new AppError('Invalid credentials', 401);`,
    badExample:
      `// NEVER do this\nconst password = req.body.password; // stored plain\nconst hash = md5(req.body.password);  // MD5 — cracked instantly`,
    checklist: [
      'bcrypt (or argon2) is used for all password hashing',
      'Cost factor is 12 or higher',
      'Plain passwords are never logged or stored',
      'Passwords are never returned in API responses',
      'Login uses constant-time comparison',
    ],
    commonMistakes: [
      'Using crypto.createHash("sha256") for passwords',
      'Low bcrypt cost (4–8) for "speed" in development and forgetting to change it',
      'Logging req.body which includes the plain password',
    ],
    difficulty: 'Beginner',
    importance: 'Critical',
  },
  {
    id: 'auth-002',
    title: 'Use JWT Correctly',
    category: 'authentication',
    shortDescription: 'Sign tokens with a strong secret, set short expiry, and verify on every request.',
    fullExplanation:
      'Issue JWTs signed with HS256 (symmetric) or RS256 (asymmetric). Set a short expiry (15m–1h for access tokens). Use refresh tokens with longer expiry stored in httpOnly cookies. Verify the token on every protected request in middleware. Invalidate refresh tokens on logout.',
    whyItMatters:
      'A stolen JWT is valid until it expires. Short expiry limits the damage window. Without verification middleware, any request can access private data.',
    goodExample:
      `// Issue\nconst token = jwt.sign({ userId: user.id, role: user.role },\n  process.env.JWT_SECRET, { expiresIn: '15m' });\n\n// Middleware\nconst protect = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'No token' });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch { res.status(401).json({ error: 'Invalid token' }); }\n};`,
    badExample:
      `// No expiry — token valid forever\nconst token = jwt.sign({ userId: user.id }, 'hardcoded-secret');\n// No verification middleware\nrouter.get('/profile', (req, res) => res.json(req.user));`,
    checklist: [
      'Tokens are signed with a strong secret from env vars',
      'Access tokens expire in 15m–1h',
      'Refresh tokens are used for long sessions',
      'Verification middleware is applied to all protected routes',
      'Token payload does not contain sensitive data',
    ],
    commonMistakes: [
      'Never-expiring tokens',
      'Hard-coding the JWT secret',
      'Storing JWTs in localStorage (XSS vulnerable)',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'auth-003',
    title: 'Protect Private Routes',
    category: 'authentication',
    shortDescription: 'Apply auth middleware to every route that requires a logged-in user.',
    fullExplanation:
      'Create a protect middleware that verifies the JWT and attaches the user to req.user. Apply it to router groups rather than individual routes to avoid accidentally leaving a route unprotected. Test unauthenticated requests return 401, not data.',
    whyItMatters:
      'A single unprotected route can expose all user data. Applying middleware at the router level means a new route in that group is protected by default.',
    goodExample:
      `// All routes under this router are protected\nconst privateRouter = express.Router();\nprivateRouter.use(protect);\n\nprivateRouter.get('/profile', userController.getProfile);\nprivateRouter.patch('/profile', userController.updateProfile);\nprivateRouter.delete('/account', userController.deleteAccount);`,
    badExample:
      `// Each route manually (easy to forget)\nrouter.get('/profile', protect, userController.getProfile);\nrouter.patch('/profile', protect, userController.updateProfile);\nrouter.delete('/account', userController.deleteAccount); // Forgot!`,
    checklist: [
      'Auth middleware is applied to router groups, not individual routes',
      'Public routes are explicitly separated from private routes',
      'Tests verify unauthenticated access returns 401',
      'Admin routes have an additional role-check middleware',
      'Route list is reviewed regularly for missing protection',
    ],
    commonMistakes: [
      'Adding protect per-route and forgetting it on new routes',
      'Applying protect in the wrong order (after the handler)',
      'Not distinguishing between user and admin routes',
    ],
    difficulty: 'Beginner',
    importance: 'Critical',
  },
  {
    id: 'auth-004',
    title: 'Handle Token Expiry Gracefully',
    category: 'authentication',
    shortDescription: 'Refresh expired tokens automatically — do not force logout on every expiry.',
    fullExplanation:
      'Implement a token refresh flow: the mobile app stores a refresh token (httpOnly cookie or secure storage). When a request returns 401 due to expiry, the app silently calls POST /auth/refresh to get a new access token, then retries the original request. If the refresh token has also expired, redirect to login.',
    whyItMatters:
      'Short-lived access tokens improve security, but logging users out every 15 minutes is terrible UX. Refresh tokens allow security without friction.',
    goodExample:
      `// API interceptor (axios)\naxios.interceptors.response.use(null, async (error) => {\n  if (error.response?.status === 401 && !error.config._retry) {\n    error.config._retry = true;\n    const { data } = await axios.post('/auth/refresh', {}, { withCredentials: true });\n    setAccessToken(data.accessToken);\n    error.config.headers.Authorization = \`Bearer \${data.accessToken}\`;\n    return axios(error.config);\n  }\n  return Promise.reject(error);\n});`,
    badExample:
      `// Catches 401 and immediately logs out\nif (response.status === 401) { logout(); navigate('/login'); }`,
    checklist: [
      'Refresh token is stored in secure storage',
      'API interceptor auto-refreshes on 401',
      'Refresh token has a longer expiry (7–30 days)',
      'Refresh tokens are revoked on explicit logout',
      'Invalid refresh token redirects to login',
    ],
    commonMistakes: [
      'Logging out on every 401 regardless of reason',
      'Not revoking refresh tokens on logout',
      'Storing refresh tokens in localStorage',
    ],
    difficulty: 'Advanced',
    importance: 'High',
  },
  {
    id: 'auth-005',
    title: 'Use Secure Session Management',
    category: 'authentication',
    shortDescription: 'Regenerate session IDs after login and invalidate sessions on logout.',
    fullExplanation:
      'After a successful login, always regenerate the session ID to prevent session fixation attacks. Store session data server-side (Redis is ideal). Set session cookies with httpOnly, Secure, and SameSite=Strict flags. Invalidate the session completely on logout.',
    whyItMatters:
      'Session fixation allows an attacker to set a session ID before login and then use the same ID after the victim logs in, hijacking the authenticated session.',
    goodExample:
      `// Regenerate session after login\nreq.session.regenerate((err) => {\n  if (err) return next(err);\n  req.session.userId = user.id;\n  res.json({ success: true });\n});\n\n// Logout — destroy session\nreq.session.destroy(() => {\n  res.clearCookie('connect.sid');\n  res.json({ success: true });\n});`,
    badExample:
      `// Session ID never changes — fixation attack possible\nreq.session.userId = user.id;\nres.json({ success: true });`,
    checklist: [
      'Session is regenerated after successful login',
      'Session cookie has httpOnly flag',
      'Session cookie has Secure flag (HTTPS only)',
      'Session cookie has SameSite=Strict',
      'Logout destroys the session server-side',
    ],
    commonMistakes: [
      'Storing sensitive data in the session cookie payload',
      'Not destroying the session on logout (just clearing the cookie)',
      'Using in-memory sessions in production (lost on restart)',
    ],
    difficulty: 'Advanced',
    importance: 'Critical',
  },

  // ─── SECURITY ────────────────────────────────────────────────────────────────
  {
    id: 'sec-001',
    title: 'Validate and Sanitise All Inputs',
    category: 'security',
    shortDescription: 'Validate types and lengths; sanitise to remove malicious content.',
    fullExplanation:
      'Validation confirms input is the right type and format. Sanitisation removes or escapes dangerous characters. Use a library (DOMPurify for HTML, validator.js for strings). Parameterise all database queries. Never construct SQL with string concatenation. This prevents SQL injection, XSS, and NoSQL injection.',
    whyItMatters:
      'SQL injection and XSS are in the OWASP Top 10. They have caused billions of dollars in data breaches. A single unsanitised input can compromise the entire database.',
    goodExample:
      `// Parameterised query (SQL)\nawait db.query('SELECT * FROM users WHERE email = $1', [req.body.email]);\n\n// Mongoose automatically escapes values\nconst user = await User.findOne({ email: req.body.email });`,
    badExample:
      `// SQL injection vulnerability\nawait db.query(\`SELECT * FROM users WHERE email = '\${req.body.email}'\`);\n// Input: ' OR '1'='1 — returns ALL users`,
    checklist: [
      'All DB queries use parameterised statements or an ORM',
      'HTML content is sanitised with DOMPurify before rendering',
      'File upload paths are sanitised (no ../ traversal)',
      'NoSQL queries use safe operators, not user input as keys',
      'Validation runs before sanitisation',
    ],
    commonMistakes: [
      'String concatenation in SQL queries',
      'Trusting sanitisation to replace validation',
      'Forgetting to sanitise stored data before rendering in HTML',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'sec-002',
    title: 'Always Use HTTPS',
    category: 'security',
    shortDescription: 'Serve everything over HTTPS. Redirect HTTP to HTTPS. Use HSTS.',
    fullExplanation:
      'HTTPS encrypts data in transit, preventing man-in-the-middle attacks. Use a free certificate from Let\'s Encrypt. Add the Strict-Transport-Security (HSTS) header so browsers refuse plain HTTP. Set up automatic certificate renewal. In production, redirect all HTTP traffic to HTTPS at the load balancer or reverse proxy level.',
    whyItMatters:
      'HTTP traffic is readable by anyone on the same network (coffee shop Wi-Fi, ISP). Without HTTPS, session tokens, passwords, and user data are sent in plain text.',
    goodExample:
      `// Nginx config\nserver {\n  listen 80;\n  return 301 https://$host$request_uri;\n}\nserver {\n  listen 443 ssl;\n  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";\n}`,
    badExample:
      `// API served over HTTP in production\nhttp://api.myapp.com/login\n// Passwords sent in plain text`,
    checklist: [
      'SSL/TLS certificate is installed and valid',
      'HTTP requests redirect to HTTPS',
      'HSTS header is set with a long max-age',
      'Certificate renewal is automated',
      'Mixed content warnings are resolved',
    ],
    commonMistakes: [
      'Using HTTP for the API while the frontend is HTTPS',
      'Not renewing certificates (causes downtime)',
      'Setting HSTS max-age too short (minutes instead of months)',
    ],
    difficulty: 'Beginner',
    importance: 'Critical',
  },
  {
    id: 'sec-003',
    title: 'Implement Rate Limiting',
    category: 'security',
    shortDescription: 'Limit requests per IP to prevent brute-force and DoS attacks.',
    fullExplanation:
      'Apply rate limiting to login, registration, and password-reset endpoints at minimum. Use express-rate-limit or a Redis-backed solution. Return 429 Too Many Requests with a Retry-After header. Consider sliding-window rate limits for APIs. Whitelist internal services if needed.',
    whyItMatters:
      'Without rate limiting, an attacker can try millions of password combinations in minutes. They can also overwhelm your server with requests, causing a denial of service for legitimate users.',
    goodExample:
      `import rateLimit from 'express-rate-limit';\n\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 10,\n  message: { error: 'Too many login attempts. Try again in 15 minutes.' },\n  standardHeaders: true,\n});\n\nrouter.post('/auth/login', loginLimiter, authController.login);`,
    badExample:
      `// No rate limiting — brute force possible\nrouter.post('/auth/login', authController.login);`,
    checklist: [
      'Login endpoint has strict rate limiting (≤10/15min)',
      'Registration endpoint is rate limited',
      'Global API rate limit protects all endpoints',
      '429 responses include Retry-After header',
      'Rate limiter state uses Redis in production (not in-memory)',
    ],
    commonMistakes: [
      'In-memory rate limiters reset when the process restarts',
      'Rate limiting per user ID instead of per IP (can be bypassed without login)',
      'Setting limits so high they do not actually protect',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'sec-004',
    title: 'Protect API Keys and Secrets',
    category: 'security',
    shortDescription: 'Never expose API keys in mobile app code, frontend JS, or public repos.',
    fullExplanation:
      'Mobile apps are reverse-engineered. Any secret compiled into an APK or IPA is extractable. API keys that belong to the server should only be used on the server. If a mobile app needs to call a third-party API directly, use short-lived tokens issued by your backend. Rotate any key that was accidentally exposed.',
    whyItMatters:
      'Exposed API keys have been used to run up $50,000+ cloud bills and access millions of user records. GitHub scanners routinely find committed secrets and automated bots abuse them within minutes.',
    goodExample:
      `// Mobile app never holds the Stripe secret key\n// It calls YOUR backend, which holds the secret\nconst response = await api.post('/payments/charge', { amount, currency });\n// Your backend then calls Stripe with process.env.STRIPE_SECRET_KEY`,
    badExample:
      `// Mobile app source code (extractable from APK)\nconst STRIPE_SECRET = 'sk_live_abc123...';\nconst response = await stripe.charges.create({ amount });`,
    checklist: [
      'No secrets in mobile app source code',
      'No secrets in frontend JavaScript',
      'Server-side keys are in .env, not committed to Git',
      'GitHub secret scanning is enabled on all repos',
      'Compromised keys are rotated immediately',
    ],
    commonMistakes: [
      'Putting API keys in React Native config files that ship in the app bundle',
      'Committing .env to Git "just for CI"',
      'Keeping compromised keys active after rotation',
    ],
    difficulty: 'Beginner',
    importance: 'Critical',
  },
  {
    id: 'sec-005',
    title: 'Avoid Exposing Sensitive Error Details',
    category: 'security',
    shortDescription: 'Never send stack traces, DB errors, or internal paths to API clients.',
    fullExplanation:
      'Error messages returned to clients should be user-friendly and reveal nothing about the server internals. Stack traces expose file paths, library versions, and logic that attackers can exploit. Log the full error server-side for debugging, but send a generic message to the client. Use unique error codes so support can correlate client errors to server logs.',
    whyItMatters:
      'Error messages that include "MongoDB collection users" or "bcrypt.compare is not a function at /srv/app/services/authService.ts:42" give attackers a map of your application.',
    goodExample:
      `// Server: log the full error\nlogger.error({ err, req: req.id }, 'Unhandled error');\n\n// Client: receive only a safe message\nres.status(500).json({\n  error: { message: 'Something went wrong. Please try again.', code: 'INTERNAL_ERROR' }\n});`,
    badExample:
      `res.status(500).json({ error: err.stack });\n// Sends: "TypeError: Cannot read property 'id' of undefined\n//   at /srv/app/controllers/userController.ts:34:18\n//   at Layer.handle ..."`,
    checklist: [
      'Central error handler strips stack traces from client responses',
      '500 responses always use a generic message',
      'Error codes are logged server-side with a correlation ID',
      'Database error messages are caught before reaching the client',
      'Validation errors only reveal field names and rules, not internals',
    ],
    commonMistakes: [
      'Passing err.message directly to res.json() for all errors',
      'Different error format for development and production',
      'No server-side logging of internal errors',
    ],
    difficulty: 'Beginner',
    importance: 'High',
  },

  // ─── TESTING ─────────────────────────────────────────────────────────────────
  {
    id: 'test-001',
    title: 'Test Important User Flows',
    category: 'testing',
    shortDescription: 'Write end-to-end tests for the most critical paths in the app.',
    fullExplanation:
      'Identify the 5–10 user flows that, if broken, would make the app unusable: register, login, complete a checklist item, view a rule detail, etc. Write integration or e2e tests for each. These tests give you confidence that the app works end-to-end after every change.',
    whyItMatters:
      'Unit tests can all pass while the app is completely broken end-to-end because of a bad interaction between layers. E2E tests catch integration bugs that unit tests miss.',
    goodExample:
      `// Jest + Supertest integration test\nit('should register a new user', async () => {\n  const res = await request(app).post('/api/v1/auth/register').send({\n    name: 'Alice', email: 'alice@test.com', password: 'password123'\n  });\n  expect(res.status).toBe(201);\n  expect(res.body.data.user.email).toBe('alice@test.com');\n  expect(res.body.data.user.passwordHash).toBeUndefined();\n});`,
    badExample:
      `// Only testing utility functions, never testing user flows\nit('should add two numbers', () => {\n  expect(add(1, 2)).toBe(3);\n});`,
    checklist: [
      'Register, login, and logout flows have tests',
      'Core feature (checklist completion) has an e2e test',
      'Tests run against a test database, not production',
      'Tests are part of the CI pipeline',
      'Test data is cleaned up after each test run',
    ],
    commonMistakes: [
      'Testing only utility functions, not user flows',
      'E2E tests that hit the production database',
      'Tests that depend on each other and fail in isolation',
    ],
    difficulty: 'Intermediate',
    importance: 'High',
  },
  {
    id: 'test-002',
    title: 'Test API Responses',
    category: 'testing',
    shortDescription: 'Write tests for every API endpoint covering both success and error cases.',
    fullExplanation:
      'For every endpoint, test: the happy path (correct input, expected output), validation errors (missing fields, wrong types), auth errors (no token, wrong token), and edge cases (resource not found, duplicate). Use supertest to make requests against the Express app without starting a network server.',
    whyItMatters:
      'API tests act as a contract. They catch regressions when you change a controller and prevent you from shipping broken endpoints to the frontend team.',
    goodExample:
      `describe('GET /api/v1/rules/:id', () => {\n  it('returns the rule when found', async () => {\n    const res = await request(app).get('/api/v1/rules/fe-001');\n    expect(res.status).toBe(200);\n    expect(res.body.data.rule.id).toBe('fe-001');\n  });\n  it('returns 404 when not found', async () => {\n    const res = await request(app).get('/api/v1/rules/does-not-exist');\n    expect(res.status).toBe(404);\n  });\n});`,
    badExample:
      `// "Tested" by manually calling the endpoint in Postman once\n// No automated tests exist`,
    checklist: [
      'Every endpoint has at least a happy-path test',
      '401 and 403 cases are tested',
      '404 cases are tested for resource lookups',
      '400 cases test malformed input',
      'Tests are deterministic and do not depend on external state',
    ],
    commonMistakes: [
      'Only testing 200 OK responses',
      'Testing against a real third-party service (non-deterministic)',
      'Not cleaning up database records created by tests',
    ],
    difficulty: 'Intermediate',
    importance: 'High',
  },
  {
    id: 'test-003',
    title: 'Test Validation Rules',
    category: 'testing',
    shortDescription: 'Explicitly test that validation rejects invalid data with correct errors.',
    fullExplanation:
      'For each validation schema, write tests that cover: missing required fields, fields that are too short/long, wrong formats (invalid email, negative number), and boundary values. Confirm the response status is 400 and the error message identifies the correct field.',
    whyItMatters:
      'Validation tests ensure your schemas are actually enforced. It is common to write a schema but make a typo that allows invalid data through.',
    goodExample:
      `describe('POST /auth/register validation', () => {\n  it('rejects missing email', async () => {\n    const res = await request(app).post('/api/v1/auth/register')\n      .send({ name: 'Alice', password: 'pass1234' });\n    expect(res.status).toBe(400);\n    expect(res.body.error.fields).toMatchObject({ email: expect.any(String) });\n  });\n  it('rejects password shorter than 8 chars', async () => {\n    const res = await request(app).post('/api/v1/auth/register')\n      .send({ name: 'Alice', email: 'a@b.com', password: 'short' });\n    expect(res.status).toBe(400);\n  });\n});`,
    badExample:
      `// Validation tested implicitly by happy-path tests\n// No explicit tests for invalid data`,
    checklist: [
      'Each required field is tested for absence',
      'Length limits are tested at boundary values',
      'Format rules (email, UUID) are tested with invalid values',
      'Error response body is asserted, not just status code',
      'Tests cover all fields in the schema',
    ],
    commonMistakes: [
      'Testing only that the endpoint exists, not that validation fires',
      'Not testing boundary values (exactly at the limit)',
      'Asserting only the status code, not the error field names',
    ],
    difficulty: 'Beginner',
    importance: 'Medium',
  },
  {
    id: 'test-004',
    title: 'Test Error States',
    category: 'testing',
    shortDescription: 'Simulate failures — DB errors, network timeouts — and assert graceful handling.',
    fullExplanation:
      'Mock your database and external services to simulate failure scenarios: DB connection loss, third-party API timeout, disk full error. Assert that your error handler catches the failure, logs it, and returns a safe 500 response instead of crashing.',
    whyItMatters:
      'Production databases go down. APIs time out. If you only test the happy path, you will discover unhandled errors when real failures occur in production.',
    goodExample:
      `it('returns 500 when DB is unavailable', async () => {\n  jest.spyOn(User, 'findOne').mockRejectedValue(new Error('DB connection lost'));\n  const res = await request(app).post('/api/v1/auth/login')\n    .send({ email: 'a@b.com', password: 'pass1234' });\n  expect(res.status).toBe(500);\n  expect(res.body.error.message).toBe('Something went wrong. Please try again.');\n  expect(res.body.error.message).not.toContain('DB connection');\n});`,
    badExample:
      `// No tests for failure scenarios\n// Assume the database is always available`,
    checklist: [
      'DB errors are caught and return a 500 response',
      'External API failures are tested with mocks',
      'Error responses do not expose internal details',
      'Error handler is tested directly with a mock error',
      'Application does not crash on unhandled errors',
    ],
    commonMistakes: [
      'Never testing what happens when dependencies fail',
      'Mocks that are too lenient and always succeed',
      'Not asserting that the error message is safe',
    ],
    difficulty: 'Advanced',
    importance: 'High',
  },
  {
    id: 'test-005',
    title: 'Run Tests Before Deployment',
    category: 'testing',
    shortDescription: 'Block deployments if tests fail. Automate this in your CI pipeline.',
    fullExplanation:
      'Configure CI (GitHub Actions, GitLab CI, CircleCI) to run the full test suite on every push to the main branch and on every pull request. Block merging if tests fail. Include type-checking, linting, and tests in the pipeline. Aim for a test suite that completes in under 5 minutes.',
    whyItMatters:
      'Manual "run tests before deploying" disciplines break under pressure. A CI gate ensures that no matter how rushed the deploy is, broken code cannot reach production.',
    goodExample:
      `# .github/workflows/ci.yml\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run typecheck\n      - run: npm test -- --coverage\n      - run: npm run build`,
    badExample:
      `// No CI pipeline\n// Developer remembers to run tests manually\n// "I tested it locally" → deploys broken code`,
    checklist: [
      'CI pipeline runs on every PR and push to main',
      'Pipeline includes lint, typecheck, and tests',
      'Branch protection requires CI to pass before merge',
      'Test coverage report is generated',
      'Pipeline fails fast on the first error',
    ],
    commonMistakes: [
      'CI pipeline that runs tests but does not fail the build on errors',
      'Skipping tests "just this once" for urgent deploys',
      'No branch protection, allowing broken code into main',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },

  // ─── DEPLOYMENT ──────────────────────────────────────────────────────────────
  {
    id: 'dep-001',
    title: 'Use Environment Variables for Config',
    category: 'deployment',
    shortDescription: 'All environment-specific config (URLs, keys, flags) lives in env vars.',
    fullExplanation:
      'Separate code from config. Every value that changes between development, staging, and production must be an environment variable: database URLs, API keys, port numbers, feature flags, log levels. Use a config service or .env files. Validate all required vars at startup.',
    whyItMatters:
      'Hard-coded config means a code change for every environment switch. Env vars let the same Docker image run in development, staging, and production without modification.',
    goodExample:
      `// config/index.ts\nexport const config = {\n  port: Number(process.env.PORT ?? 3000),\n  dbUri: process.env.DATABASE_URL!,\n  jwtSecret: process.env.JWT_SECRET!,\n  nodeEnv: process.env.NODE_ENV ?? 'development',\n  isProduction: process.env.NODE_ENV === 'production',\n};\n\n// Validate at startup\nconst required = ['DATABASE_URL', 'JWT_SECRET'];\nrequired.forEach(k => { if (!process.env[k]) throw new Error(\`Missing: \${k}\`); });`,
    badExample:
      `// Hard-coded environment-specific values\nconst DB_URI = 'mongodb://localhost:27017/devguide';\nconst JWT_SECRET = 'dev-secret-change-in-prod';`,
    checklist: [
      'All environment-specific values are in env vars',
      'Required env vars are validated at startup',
      'Different .env files exist for development and test',
      'Production env vars are set in the hosting platform',
      'No .env files are committed to Git',
    ],
    commonMistakes: [
      'Checking for env vars lazily (only when used, not at startup)',
      'Using the development .env in CI',
      'Storing env var values in code comments',
    ],
    difficulty: 'Beginner',
    importance: 'Critical',
  },
  {
    id: 'dep-002',
    title: 'Set Up a Production Database',
    category: 'deployment',
    shortDescription: 'Use a managed database service with backups, not a local instance.',
    fullExplanation:
      'In production, use a managed database (MongoDB Atlas, AWS RDS, Supabase, PlanetScale). Enable automatic daily backups. Use a separate database for staging. Set up connection pooling. Monitor slow queries. Never run migrations on production without testing them on staging first.',
    whyItMatters:
      'A local database on the same server as your app means one disk failure loses everything. Managed services handle replication, backups, failover, and patching.',
    goodExample:
      `// Separate databases per environment\nDEV:     mongodb://localhost:27017/devguide-dev\nSTAGING: mongodb+srv://cluster.mongodb.net/devguide-staging\nPROD:    mongodb+srv://cluster.mongodb.net/devguide-prod\n\n// Automated daily backups enabled on Atlas\n// Point-in-time recovery enabled`,
    badExample:
      `// Production app using local MongoDB on the same server\n// No backups configured\nmongoose.connect('mongodb://localhost:27017/devguide');`,
    checklist: [
      'Production uses a managed database service',
      'Automated daily backups are enabled',
      'Staging uses a separate database from production',
      'Database is not on the same server as the application',
      'Connection string uses the production cluster URL',
    ],
    commonMistakes: [
      'Running production on the same instance as development',
      'No backup strategy ("we will set that up later")',
      'Migrations tested on production before staging',
    ],
    difficulty: 'Intermediate',
    importance: 'Critical',
  },
  {
    id: 'dep-003',
    title: 'Add Logging and Monitoring',
    category: 'deployment',
    shortDescription: 'Log all errors and key events. Set up alerts for anomalies.',
    fullExplanation:
      'Use a structured logger (Pino, Winston) that outputs JSON in production. Log at INFO level for significant events (user login, payment processed) and ERROR for failures. Send logs to a centralised service (Datadog, Logtail, CloudWatch). Set up alerts for error rate spikes, slow response times, and database connection failures.',
    whyItMatters:
      'Without logging, you are flying blind. When a production bug occurs at 3am, structured logs and alerts are what wake you up and tell you exactly what happened.',
    goodExample:
      `import pino from 'pino';\nconst logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });\n\n// Structured log entry\nlogger.info({ userId: user.id, action: 'login', ip: req.ip }, 'User logged in');\nlogger.error({ err, requestId: req.id }, 'Failed to process payment');`,
    badExample:
      `// console.log in production — unstructured, not searchable\nconsole.log('User logged in: ' + user.email);\nconsole.log('Error: ' + error);`,
    checklist: [
      'Structured JSON logger is used (not console.log)',
      'All errors are logged with full context',
      'Significant events are logged at INFO level',
      'Logs are shipped to a centralised service',
      'Alerts are configured for error rate and latency thresholds',
    ],
    commonMistakes: [
      'Logging sensitive data (passwords, tokens) in log messages',
      'console.log statements left in production code',
      'Logs only on the server with no way to query them',
    ],
    difficulty: 'Intermediate',
    importance: 'High',
  },
  {
    id: 'dep-004',
    title: 'Use CI/CD for Automated Deployments',
    category: 'deployment',
    shortDescription: 'Automate build, test, and deploy — remove manual steps from the release process.',
    fullExplanation:
      'Set up a pipeline that: runs tests on every PR, builds the Docker image on merge to main, pushes the image to a registry, and deploys to your hosting provider (Railway, Render, AWS ECS, Heroku). Zero-downtime deployment with rolling updates or blue/green deployment.',
    whyItMatters:
      'Manual deployments are inconsistent and error-prone. A CI/CD pipeline means every deploy is the same process, and broken code is caught before it reaches users.',
    goodExample:
      `# GitHub Actions — CI/CD pipeline\non: push: branches: [main]\njobs:\n  deploy:\n    steps:\n      - name: Run tests\n        run: npm test\n      - name: Build Docker image\n        run: docker build -t myapp .\n      - name: Deploy to Railway\n        run: railway up`,
    badExample:
      `// Manual deploy checklist:\n// 1. SSH into server\n// 2. git pull origin main\n// 3. npm install\n// 4. pm2 restart app\n// (sometimes forgotten, sometimes wrong branch)`,
    checklist: [
      'Tests run automatically on every PR',
      'Deployment triggers automatically on merge to main',
      'Docker image is built and pushed to a registry',
      'Zero-downtime deployment is configured',
      'Rollback is a single command or click',
    ],
    commonMistakes: [
      'Deployment pipeline that does not run tests',
      'All developers have direct SSH access to production',
      'No staging environment to test deploys before production',
    ],
    difficulty: 'Advanced',
    importance: 'High',
  },
  {
    id: 'dep-005',
    title: 'Keep a Rollback Plan',
    category: 'deployment',
    shortDescription: 'Every deployment must be reversible in under 5 minutes.',
    fullExplanation:
      'Before deploying, know exactly how to roll back: keep the previous Docker image tagged and ready, use database migrations that can be reversed, use feature flags to toggle new features off without a redeploy. Document the rollback procedure. Practice it in staging. Aim for a rollback time of less than 5 minutes.',
    whyItMatters:
      'Production deployments go wrong. Your rollback plan is what limits the blast radius of a bad deploy from hours of downtime to minutes.',
    goodExample:
      `// Docker deployment — tag every release\ndocker tag myapp:latest myapp:v1.2.3\ndocker push myapp:v1.2.3\n\n// Rollback in seconds\ndocker service update --image myapp:v1.2.2 myapp-service\n\n// Migration rollback\nnpm run migrate:down  // Reverts last migration`,
    badExample:
      `// No versioned images — "latest" is the only tag\n// Rollback requires re-deploying from git\n// Database migration has no down() function`,
    checklist: [
      'Every release has a tagged Docker image',
      'All migrations have a working down() function',
      'Rollback procedure is documented',
      'Rollback has been tested in staging',
      'Feature flags can disable new features without a redeploy',
    ],
    commonMistakes: [
      'Only keeping the "latest" Docker tag, overwriting previous versions',
      'Irreversible database migrations (DROP COLUMN without backup)',
      'Never practising the rollback procedure',
    ],
    difficulty: 'Advanced',
    importance: 'Critical',
  },
];
