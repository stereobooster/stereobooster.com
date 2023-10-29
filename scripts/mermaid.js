// https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid
import marked from "marked";
import { renderMermaid } from "mermaid-render";
import fs from "fs";
import util from "util";
import path from "path";
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const access = util.promisify(fs.access);

const graphs = [];

const walkTokens = (token) => {
  if (token.type === "code" && token.lang === "mermaid") {
    graphs.push(token);
  }
};

marked.use({ walkTokens });

const markdownIndexPath = path.resolve(process.argv[2]);
const markdownDir = path.dirname(markdownIndexPath);
const markdownOrginalPath = markdownIndexPath.replace(/\.md$/, ".original.md");
let orginalExist;
try {
  await access(markdownOrginalPath, fs.constants.W_OK);
  orginalExist = true;
} catch {
  orginalExist = false;
}
const markdownBuffer = await readFile(
  orginalExist ? markdownOrginalPath : markdownIndexPath
);
let markdown = markdownBuffer.toString();

marked(markdown);

if (!orginalExist) {
  await writeFile(markdownOrginalPath, markdown, "utf-8");
}

let i = 0;
while (i < graphs.length) {
  const token = graphs[i];
  const svg = await renderMermaid(token.text);
  const fileName = `${i}.svg`;
  await writeFile(`${markdownDir}/${fileName}`, svg, "utf-8");
  markdown = markdown.replace(
    token.raw,
    `![](${fileName})` + "\n\n"
  );
  i++;
}

await writeFile(markdownIndexPath, markdown, "utf-8");
