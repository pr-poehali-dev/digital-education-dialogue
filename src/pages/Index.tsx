/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const slides = [
  {
    id: 1,
    type: "title",
    content: {
      conference: "Научно-практическая конференция",
      conferenceTitle: "«Межкультурный диалог в контексте проблем современного образования: поиск новых смыслов»",
      university: "Донской государственный технический университет",
      city: "Ростов-на-Дону · 2026",
      title: "Использование цифровых образовательных технологий в обучении информатике иностранных студентов подготовительного факультета",
      subtitle: "как средство развития межкультурной коммуникации",
    },
  },
  {
    id: 2,
    type: "content",
    label: "Слайд 2",
    title: "Актуальность исследования",
    icon: "TrendingUp",
    items: [
      "Рост числа иностранных студентов в российских университетах",
      "Необходимость адаптации студентов к новой образовательной и культурной среде",
      "Сложности обучения из-за языкового барьера",
      "Необходимость использования современных образовательных технологий",
    ],
  },
  {
    id: 3,
    type: "content",
    label: "Слайд 3",
    title: "Особенности обучения информатике иностранных студентов",
    icon: "GraduationCap",
    items: [
      "Обучение ведётся на русском языке",
      "Различный уровень подготовки студентов",
      "Культурное разнообразие учебных групп",
      "Необходимость наглядного и интерактивного обучения",
    ],
  },
  {
    id: 4,
    type: "two-col",
    label: "Слайд 4",
    title: "Цифровые образовательные технологии",
    icon: "Monitor",
    leftTitle: "Основные инструменты",
    leftItems: [
      "Электронные образовательные платформы",
      "Мультимедийные презентации",
      "Онлайн-тестирование",
      "Видеоуроки",
      "Интерактивные задания",
    ],
    rightTitle: "Преимущества",
    rightItems: [
      "Наглядность обучения",
      "Доступность учебных материалов",
      "Индивидуализация обучения",
    ],
  },
  {
    id: 5,
    type: "content",
    label: "Слайд 5",
    title: "Цифровые технологии и межкультурная коммуникация",
    icon: "Globe",
    intro: "Цифровые инструменты позволяют:",
    items: [
      "Организовывать групповые проекты",
      "Развивать навыки общения",
      "Обмениваться опытом между студентами разных стран",
      "Формировать атмосферу сотрудничества",
    ],
  },
  {
    id: 6,
    type: "content",
    label: "Слайд 6",
    title: "Результаты использования цифровых технологий",
    icon: "BarChart2",
    intro: "Использование цифровых технологий способствует:",
    items: [
      "Повышению эффективности обучения",
      "Лучшему усвоению материала",
      "Развитию коммуникативных навыков",
      "Успешной адаптации иностранных студентов",
    ],
  },
  {
    id: 7,
    type: "conclusion",
    label: "Слайд 7",
    title: "Выводы",
    icon: "CheckSquare",
    items: [
      "Цифровые образовательные технологии повышают качество обучения информатике",
      "Помогают преодолеть языковые трудности",
      "Способствуют развитию межкультурной коммуникации",
      "Являются важным элементом современной образовательной среды",
    ],
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setDirection(index > current ? "next" : "prev");
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 300);
    },
    [animating, current]
  );

  const next = useCallback(() => goTo(Math.min(current + 1, slides.length - 1)), [current, goTo]);
  const prev = useCallback(() => goTo(Math.max(current - 1, 0)), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="min-h-screen font-ibm flex flex-col" style={{ background: "#eef1f6" }}>
      {/* Header */}
      <div
        className="text-white px-8 py-2.5 flex items-center justify-between text-[11px] tracking-widest uppercase"
        style={{ background: "#1a2b52" }}
      >
        <span className="font-light opacity-80">ДГТУ · Ростов-на-Дону</span>
        <span className="font-light opacity-60">Межкультурный диалог в образовании · 2026</span>
      </div>

      {/* Slide */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-5xl bg-white border border-gray-200 shadow-md"
          style={{ minHeight: "500px", position: "relative", borderRadius: "2px" }}
        >
          {/* Left accent */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ background: "linear-gradient(180deg, #1a2b52 0%, #2e5fa3 100%)" }}
          />

          {/* Slide counter */}
          {slide.type !== "title" && (
            <div className="absolute top-6 right-8 text-[11px] text-gray-400 tracking-widest font-light">
              {current + 1} / {slides.length}
            </div>
          )}

          <div
            key={current}
            className="pl-12 pr-10 py-10 h-full flex flex-col justify-center"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? direction === "next"
                  ? "translateY(14px)"
                  : "translateY(-14px)"
                : "translateY(0)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {slide.type === "title" && <TitleSlide data={(slide as any).content} />}
            {slide.type === "content" && <ContentSlide data={slide as any} />}
            {slide.type === "two-col" && <TwoColSlide data={slide as any} />}
            {slide.type === "conclusion" && <ConclusionSlide data={slide as any} />}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="pb-8 flex flex-col items-center gap-4">
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full focus:outline-none"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background: i === current ? "#1a2b52" : "#b8c4d8",
              }}
              aria-label={`Слайд ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: "#1a2b52", color: "#1a2b52" }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                (e.currentTarget as HTMLElement).style.background = "#1a2b52";
                (e.currentTarget as HTMLElement).style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#1a2b52";
            }}
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderColor: "#1a2b52", color: "#1a2b52" }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                (e.currentTarget as HTMLElement).style.background = "#1a2b52";
                (e.currentTarget as HTMLElement).style.color = "white";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#1a2b52";
            }}
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>

        <p className="text-xs text-gray-400 tracking-wide">
          Используйте клавиши ← → для навигации
        </p>
      </div>
    </div>
  );
}

function TitleSlide({ data }: { data: any }) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <div className="flex flex-col items-center gap-1.5">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
          style={{ background: "#1a2b52" }}
        >
          <Icon name="BookOpen" size={22} className="text-white" />
        </div>
        <p className="text-[11px] text-[#1a2b52] tracking-widest uppercase font-medium">
          {data.university}
        </p>
        <p className="text-[10px] text-gray-400 tracking-wider">{data.city}</p>
      </div>

      <div className="flex items-center gap-4 w-full max-w-lg">
        <div className="flex-1 h-px bg-gray-200" />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#2e5fa3" }} />
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="text-center">
        <p className="text-[10px] text-[#2e5fa3] tracking-widest uppercase font-medium mb-1">
          {data.conference}
        </p>
        <p className="text-xs text-gray-500 font-cormorant italic leading-relaxed max-w-2xl text-base">
          {data.conferenceTitle}
        </p>
      </div>

      <div className="max-w-3xl">
        <h1
          className="font-cormorant text-[2rem] text-[#1a2b52] leading-snug font-semibold"
          style={{ letterSpacing: "0.01em" }}
        >
          {data.title}
        </h1>
        <p className="font-cormorant text-xl text-[#2e5fa3] italic mt-2 leading-relaxed">
          {data.subtitle}
        </p>
      </div>
    </div>
  );
}

function ContentSlide({ data }: { data: any }) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "#eef2f9" }}
        >
          <Icon name={data.icon} size={20} className="text-[#1a2b52]" fallback="Info" />
        </div>
        <div>
          <p className="text-[10px] text-[#2e5fa3] tracking-widest uppercase font-medium mb-1">
            {data.label}
          </p>
          <h2 className="font-cormorant text-[1.7rem] text-[#1a2b52] font-semibold leading-tight">
            {data.title}
          </h2>
        </div>
      </div>

      {data.intro && (
        <p className="font-cormorant text-lg text-gray-500 italic -mt-3">{data.intro}</p>
      )}

      <ul className="flex flex-col gap-3">
        {data.items.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "#1a2b52" }}
            >
              <span className="text-white text-[10px] font-semibold">{i + 1}</span>
            </div>
            <p className="text-[15px] text-gray-700 leading-snug font-light">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TwoColSlide({ data }: { data: any }) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: "#eef2f9" }}
        >
          <Icon name={data.icon} size={20} className="text-[#1a2b52]" fallback="Info" />
        </div>
        <div>
          <p className="text-[10px] text-[#2e5fa3] tracking-widest uppercase font-medium mb-1">
            {data.label}
          </p>
          <h2 className="font-cormorant text-[1.7rem] text-[#1a2b52] font-semibold leading-tight">
            {data.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="border border-[#dce4f0] rounded-sm p-5" style={{ background: "#f5f7fb" }}>
          <p className="text-[10px] text-[#2e5fa3] tracking-widest uppercase font-medium mb-4">
            {data.leftTitle}
          </p>
          <ul className="flex flex-col gap-2.5">
            {data.leftItems.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                  style={{ background: "#1a2b52" }}
                />
                <p className="text-[14px] text-gray-700 leading-snug font-light">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-sm p-5" style={{ background: "#1a2b52" }}>
          <p className="text-[10px] tracking-widest uppercase font-medium mb-4" style={{ color: "#7fa8d8" }}>
            {data.rightTitle}
          </p>
          <ul className="flex flex-col gap-3">
            {data.rightItems.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <Icon name="Check" size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#7fa8d8" }} />
                <p className="text-[14px] text-gray-200 leading-snug font-light">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ConclusionSlide({ data }: { data: any }) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: "#1a2b52" }}
        >
          <Icon name={data.icon} size={20} className="text-white" fallback="Info" />
        </div>
        <div>
          <p className="text-[10px] text-[#2e5fa3] tracking-widest uppercase font-medium mb-1">
            {data.label}
          </p>
          <h2 className="font-cormorant text-[1.7rem] text-[#1a2b52] font-semibold leading-tight">
            {data.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.items.map((item: string, i: number) => (
          <div
            key={i}
            className="flex items-start gap-3 border border-[#dce4f0] rounded-sm p-4"
            style={{ background: "#f5f7fb" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#1a2b52" }}
            >
              <span className="text-white text-[11px] font-semibold">{i + 1}</span>
            </div>
            <p className="text-[14px] text-gray-700 leading-snug font-light">{item}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        <Icon name="Building" size={13} className="text-gray-400" fallback="Building2" />
        <p className="text-xs text-gray-400">
          ДГТУ · Донской государственный технический университет · 2026
        </p>
      </div>
    </div>
  );
}