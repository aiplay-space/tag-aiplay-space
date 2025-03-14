import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <p>本项目用于查询角色的英文名和SD绘图Tag</p>
          <p>
            感谢WAI佬提供的数据：
            <a href="https://github.com/mirabarukaso/character_select_stand_alone_app">
              https://github.com/mirabarukaso/character_select_stand_alone_app
            </a>
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
