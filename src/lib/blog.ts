import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * BLOG — cada post é um arquivo .md na pasta /content/blog
 * Para publicar um post novo, basta criar um novo arquivo .md
 * copiando o formato de um existente (veja docs/06-manutencao.md).
 */

const dir = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  cover?: string;
  readingTime: number;
  html: string;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPost(f.replace(/\.md$/, "")))
    .filter((p): p is Post => !!p)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function readPost(slug: string): Post | null {
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const words = content.split(/\s+/).length;
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Equipe Selo Magna"),
    category: String(data.category ?? "Artigos"),
    cover: data.cover ? String(data.cover) : undefined,
    readingTime: Math.max(1, Math.round(words / 200)),
    html: marked.parse(content, { async: false }) as string,
  };
}

export const formatDate = (d: string) =>
  new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
