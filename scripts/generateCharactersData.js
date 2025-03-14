import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取CSV文件
const csvFilePath = path.join(
  __dirname,
  "..",
  "src",
  "data",
  "wai_characters.csv"
);
const outputPath = path.join(__dirname, "..", "src", "data", "characters.json");

try {
  const csvData = fs.readFileSync(csvFilePath, "utf-8");
  const lines = csvData.split("\n").filter((line) => line.trim() !== "");

  const characters = lines.map((line) => {
    const [chineseName, englishName] = line.split(",");
    return {
      cn: chineseName,
      en: englishName,
    };
  });

  // 写入JSON文件
  fs.writeFileSync(outputPath, JSON.stringify(characters, null, 2), "utf-8");
  console.log("Characters data generated successfully!");
} catch (error) {
  console.error("Error generating characters data:", error);
  process.exit(1);
}
