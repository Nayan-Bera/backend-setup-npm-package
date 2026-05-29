#!/usr/bin/env node
import { access, cp, mkdir, readFile, readdir, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_DIR = path.resolve(__dirname, "../template");
const PACKAGE_JSON = path.resolve(__dirname, "../package.json");
const EMPTY_DIRS = [
	"src/constants",
	"src/controller",
];

const usage = `Usage:
  backend-easy-setup <project-name>
  backend-easy-setup .
  backend-easy-setup create <project-name>

Examples:
  npx backend-easy-setup my-api
  npx backend-easy-setup .
  npx backend-easy-setup create my-api`;

const fileExists = async (filePath: string) => {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
};

const isDirectoryEmpty = async (dirPath: string) => {
	try {
		const items = await readdir(dirPath);
		return items.length === 0;
	} catch {
		return true;
	}
};

const toPackageName = (projectName: string) =>
	projectName
		.trim()
		.toLowerCase()
		.replace(/\\/g, "/")
		.split("/")
		.filter(Boolean)
		.pop()
		?.replace(/[^a-z0-9._-]/g, "-")
		.replace(/^-+|-+$/g, "") || "backend-app";

const readPackageVersion = async () => {
	try {
		const packageJson = JSON.parse(await readFile(PACKAGE_JSON, "utf8")) as { version?: string };
		return packageJson.version || "unknown";
	} catch {
		return "unknown";
	}
};

const parseTarget = () => {
	const args = process.argv.slice(2);
	const firstArg = args[0];

	if (!firstArg || firstArg === "-h" || firstArg === "--help") {
		return { action: "help" as const };
	}

	if (firstArg === "-v" || firstArg === "--version") {
		return { action: "version" as const };
	}

	if (["create", "init", "new"].includes(firstArg)) {
		return { action: "scaffold" as const, rawTarget: args[1] };
	}

	return { action: "scaffold" as const, rawTarget: firstArg };
};

const replaceProjectName = async (targetDir: string, projectName: string) => {
	const packagePath = path.join(targetDir, "package.json");
	const packageLockPath = path.join(targetDir, "package-lock.json");

	if (await fileExists(packagePath)) {
		const packageJson = await readFile(packagePath, "utf8");
		await writeFile(packagePath, packageJson.replaceAll("__PROJECT_NAME__", projectName));
	}

	if (await fileExists(packageLockPath)) {
		const packageLock = await readFile(packageLockPath, "utf8");
		await writeFile(packageLockPath, packageLock.replaceAll("__PROJECT_NAME__", projectName));
	}
};

const restoreGitIgnore = async (targetDir: string) => {
	const packagedGitIgnore = path.join(targetDir, "gitignore");

	if (!(await fileExists(packagedGitIgnore))) {
		return;
	}

	const contents = await readFile(packagedGitIgnore, "utf8");
	await writeFile(path.join(targetDir, ".gitignore"), contents);
	await unlink(packagedGitIgnore);
};

const ensureScaffoldDirs = async (targetDir: string) => {
	await Promise.all(
		EMPTY_DIRS.map((dir) => mkdir(path.join(targetDir, dir), { recursive: true })),
	);
};

const scaffold = async () => {
	const parsed = parseTarget();

	if (parsed.action === "help") {
		console.log(usage);
		return;
	}

	if (parsed.action === "version") {
		console.log(await readPackageVersion());
		return;
	}

	const rawTarget = parsed.rawTarget;

	if (!rawTarget) {
		throw new Error(`Missing project name.\n\n${usage}`);
	}

	const targetDir = path.resolve(process.cwd(), rawTarget);
	const projectName = toPackageName(rawTarget === "." ? path.basename(process.cwd()) : rawTarget);

	if (await fileExists(targetDir)) {
		const targetStats = await stat(targetDir);

		if (!targetStats.isDirectory()) {
			throw new Error(`Target exists and is not a directory: ${targetDir}`);
		}

		if (!(await isDirectoryEmpty(targetDir))) {
			throw new Error(`Target directory is not empty: ${targetDir}`);
		}
	}

	await mkdir(targetDir, { recursive: true });
	await cp(TEMPLATE_DIR, targetDir, { recursive: true });
	await restoreGitIgnore(targetDir);
	await ensureScaffoldDirs(targetDir);
	await replaceProjectName(targetDir, projectName);

	console.log(`Created backend setup in ${targetDir}`);
	console.log("");
	console.log("Next steps:");
	if (rawTarget !== ".") {
		console.log(`  cd ${path.relative(process.cwd(), targetDir) || "."}`);
	}
	console.log("  npm install");
	console.log("  npm run dev");
};

scaffold().catch((error: unknown) => {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`backend-easy-setup failed: ${message}`);
	process.exit(1);
});
