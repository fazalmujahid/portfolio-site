import { FILE_SYSTEM } from "../data/fileSystem";

export function resolvePath(cwd, p) {
  if (p.startsWith("~/")) return p;
  if (p === "~") return "~";
  if (p === "..") {
    const parts = cwd.split("/");
    parts.pop();
    return parts.length === 0 ? "~" : parts.join("/");
  }
  if (p === ".") return cwd;
  const base = cwd === "~" ? "~/" : cwd + "/";
  return base + p.replace(/\/$/, "");
}

export function lookupDir(path) {
  const key = path.endsWith("/") ? path.slice(0, -1) : path;
  const dirKey = FILE_SYSTEM[key] ? key : FILE_SYSTEM[key + "/"] ? key + "/" : key;
  const dir = FILE_SYSTEM[dirKey] || FILE_SYSTEM[key + "/"];
  return dir && dir.type === "dir" ? dir : null;
}

export function lookupFile(path) {
  return FILE_SYSTEM[path] || null;
}
