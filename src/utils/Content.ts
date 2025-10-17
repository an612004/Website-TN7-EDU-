import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

import { parseDateString } from './Common';

export const POSTS_DIRECTORY = join(process.cwd(), '_data/posts');

export const getAllCategoryIds = (): string[] => {
  const dirs = fs.readdirSync(POSTS_DIRECTORY, { withFileTypes: true });
  const catsInfo = dirs
    .filter((folder) => !folder.isFile()) // only get folder
    .map((folder) => folder.name);
  return catsInfo;
};

export const getCategory = (slug: string): { [key: string]: string } | null => {
  try {
    return JSON.parse(
      fs.readFileSync(join(POSTS_DIRECTORY, slug, '__info__.json'), 'utf8')
    );
  } catch {
    return null;
  }
};

export const getAllCategories = (): { [key: string]: string }[] => {
  const dirs = fs.readdirSync(POSTS_DIRECTORY, { withFileTypes: true });
  const catsInfo = dirs
    .filter((folder) => !folder.isFile()) // only get folder
    .map((folder) => {
      const info: { [key: string]: string } = JSON.parse(
        fs.readFileSync(
          join(POSTS_DIRECTORY, folder.name, '__info__.json'),
          'utf8'
        )
      );
      return { ...info, slug: folder.name };
    });

  return catsInfo;
};

export type IPostEditorProps = {
  listCategory: { [key: string]: string }[];
  title: string;
  description: string;
  date?: string;
  modified_date?: string;
  image?: string;
  content: string;
  slug: string;
  status?: number;
  category?: string;
};

export interface IAppConfig {
  seo: IAppConfigSEO;
  header: IAppConfigHeader;
  contact: IAppConfigContact;
  footer: IAppConfigFooter;
  navbar: IAppConfigNavbar;
  blogs: IAppConfigBlog;
}
export interface IAppConfigSEO {
  site_name: string;
  site_title: string;
  site_description: string;
  url: string;
  author: string;
}
export interface IAppConfigHeader {
  title: string;
  description: string;
}

export interface IAppConfigLink {
  name: string;
  url: string;
}

export interface IAppConfigFooter {
  links: Array<IAppConfigLink>;
}

export interface IAppConfigNavbar {
  // links: Array<IAppConfigLink>;
  links: string;
}

export interface IAppConfigBlog {
  slugs: Array<string>;
}

export interface IAppConfigContact {
  phone: string;
  email: string;
  address1: string;
  address2: string;
}

export function getDataConfig(): IAppConfig {
  const configDir = join(process.cwd(), '_data/config.json');
  const file = fs.readFileSync(configDir, 'utf8');
  const cfgDict = JSON.parse(file);
  return cfgDict;
}

const postsDirectory = join(process.cwd(), '_data/posts');

export type PostItems = {
  [key: string]: string;
};

interface IPostSlug {
  slug: string;
  category?: string;
}

export function getPostSlugs(category: string | null | undefined = undefined) {
  const childs = fs.readdirSync(postsDirectory, { withFileTypes: true });
  let postsFound: IPostSlug[] = [];
  childs.forEach((c) => {
    if (
      c.isFile() &&
      (category === undefined || category === null) &&
      c.name.endsWith('.md')
    )
      postsFound.push({ slug: c.name });
    if (
      !c.isFile() &&
      (category === undefined || category === null || category === c.name)
    ) {
      const listPost = fs.readdirSync(join(postsDirectory, c.name), {
        withFileTypes: true,
      });
      listPost.forEach((p) => {
        postsFound.push({ category: c.name, slug: p.name });
      });
    }
  });

  postsFound = postsFound
    .filter((p) => p.slug?.endsWith('.md'))
    .map((p) => ({ ...p, slug: p.slug.replace('.md', '') }));
  return postsFound;
}

export function getPostBySlug(
  slug: IPostSlug,
  fields: string[] = [],
  onlyPublished = true
) {
  const realSlug = slug.slug;
  let { category } = slug;

  let fileContents = '';
  try {
    if (!category)
      category = getPostSlugs().filter((p) => p.slug === realSlug)[0].category;
    const fullPath = category
      ? join(postsDirectory, category, `${realSlug}.md`)
      : join(postsDirectory, `${realSlug}.md`);
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (err) {
    return null;
  }
  const { data, content } = matter(fileContents);
  if (data.status !== 1 && onlyPublished) return null;

  const items: PostItems = {};

  if (category) items.category = category;

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (data[field] !== undefined || data[field] != null) {
      items[field] = data[field];
    }
  });

  return items;
}

export const getPostsByCategory = (
  category: string,
  fields: string[] = [],
  onlyPublished = true
) => {
  const slugs = getPostSlugs(category);
  return slugs
    .map((slug) => getPostBySlug(slug, fields, onlyPublished))
    .filter((p) => p !== null)
    .sort((post1, post2) => {
      const d1 = parseDateString(post1.date);
      const d2 = parseDateString(post2.date);
      return d1 > d2 ? -1 : 1; // newest on top
    });
};

export function getAllPosts(fields: string[] = [], onlyPublished = true) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, onlyPublished))
    .filter((p) => p !== null)
    .sort((post1, post2) => {
      const d1 = parseDateString(post1.date);
      const d2 = parseDateString(post2.date);
      return d1 > d2 ? -1 : 1; // newest on top
    });
  return posts;
}
