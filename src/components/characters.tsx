import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Spacer } from "@heroui/spacer";
import { Tooltip } from "@heroui/tooltip";
import { Chip } from "@heroui/chip";
import { addToast } from "@heroui/toast";
import characters from "@/data/characters.json";
import { Tag } from "lucide-react";

interface Character {
  cn: string;
  en: string;
}

export default function Characters() {
  // const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  // useEffect(() => {
  //   // 加载角色数据
  //   import("@/data/characters.json").then((data) => {
  //     setCharacters(data.default);
  //     setFilteredCharacters(data.default);
  //   });
  // }, []);

  useEffect(() => {
    // 根据搜索词过滤角色
    if (searchTerm.trim() === "") {
      setFilteredCharacters(characters);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = characters.filter(
        (character) =>
          character.cn.toLowerCase().includes(term) ||
          character.en.toLowerCase().includes(term)
      );
      setFilteredCharacters(filtered);
    }
  }, [searchTerm, characters]);

  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 只有在不是中文输入法状态时才立即更新搜索词
    if (!isComposing) {
      setSearchTerm(value);
    }
  };

  // 处理中文输入开始
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // 处理中文输入结束
  const handleCompositionEnd = () => {
    setIsComposing(false);
    // 中文输入完成后更新搜索词
    setSearchTerm(inputValue);
  };

  // 清除输入
  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      addToast({
        title: "复制成功",
        description: `已复制 ${text} 到剪贴板`,
        color: "primary",
      });
    });
  };

  const handleTagCopy = (text: string) => {
    // 将英文名中的特殊字符加上反斜杠转义
    const escapedText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    navigator.clipboard.writeText(escapedText).then(() => {
      addToast({
        title: "复制成功",
        description: `已复制 ${escapedText} 到剪贴板`,
        color: "primary",
      });
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">角色列表</h1>
      <Card className="mb-6">
        <CardBody>
          <Input
            label="搜索角色"
            placeholder="输入中文名或英文名进行搜索..."
            value={inputValue}
            onChange={handleInputChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            isClearable
            onClear={handleClear}
            className="w-full max-w-md"
          />
          <Spacer y={2} />
          <div className="flex items-center">
            <Chip color="primary" variant="flat">
              总计: {filteredCharacters.length} 个角色
            </Chip>
          </div>
        </CardBody>
      </Card>

      <Table aria-label="角色列表表格" className="w-full" isVirtualized>
        <TableHeader>
          <TableColumn width={200}>中文名</TableColumn>
          <TableColumn width={200}>英文名</TableColumn>
          <TableColumn width={50}>复制</TableColumn>
        </TableHeader>
        <TableBody emptyContent="没有找到角色">
          {filteredCharacters.map((character, index) => (
            <TableRow key={index}>
              <TableCell>
                <div
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleCopy(character.cn, "中文名")}
                >
                  {character.cn}
                </div>
              </TableCell>
              <TableCell>
                <div
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => handleCopy(character.en, "英文名")}
                >
                  {character.en}
                </div>
              </TableCell>
              <TableCell>
                <Tooltip content="复制转义后的Tag">
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    onClick={() => handleTagCopy(character.en)}
                    isIconOnly
                  >
                    <Tag />
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
