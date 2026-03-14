"use client";

import { useEffect, useRef, useState } from "react";

type SingleSelectProps = {
  multiple?: false;
  value: string;
  onChange: (value: string) => void;
};

type MultiSelectProps = {
  multiple: true;
  value: string[];
  onChange: (value: string[]) => void;
};

type DropdownProps = {
  placeholder: string;
  options: string[];
} & (SingleSelectProps | MultiSelectProps);

export function Dropdown(props: DropdownProps) {
  const { placeholder, options, multiple } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = searchQuery
    ? options.filter((option) => option.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;

  const isSelected = (option: string) =>
    multiple ? props.value.includes(option) : props.value === option;

  const selectedCount = multiple ? props.value.length : props.value ? 1 : 0;

  function handleSelect(option: string) {
    if (multiple) {
      const current = props.value;
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      props.onChange(next);
    } else {
      props.onChange(option);
      setIsOpen(false);
      setSearchQuery("");
    }
  }

  function handleClear() {
    if (multiple) {
      props.onChange([]);
    } else {
      props.onChange("");
    }
    if (!multiple) {
      setIsOpen(false);
      setSearchQuery("");
    }
  }

  const triggerLabel =
    selectedCount === 0
      ? placeholder
      : multiple
        ? `${placeholder} (${selectedCount})`
        : props.value;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearchQuery("");
        }}
        className="flex h-8 cursor-pointer items-center gap-1.5 rounded border border-neutral-300 bg-transparent px-2.5 text-sm outline-none hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600"
      >
        <span className={selectedCount > 0 ? "" : "text-neutral-400 dark:text-neutral-500"}>
          {triggerLabel}
        </span>
        <svg
          className={`h-3 w-3 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M3 4.5 L6 7.5 L9 4.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-20 mt-1 w-56 rounded border border-neutral-200 bg-[var(--background)] shadow-lg dark:border-neutral-700">
          <div className="border-b border-neutral-200 p-1.5 dark:border-neutral-700">
            <input
              type="text"
              autoFocus
              placeholder="Filter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-7 w-full rounded bg-neutral-100 px-2 text-sm outline-none placeholder:text-neutral-400 dark:bg-neutral-800 dark:placeholder:text-neutral-500"
            />
          </div>
          <ul className="custom-scrollbar max-h-80 overflow-y-auto py-1">
            {selectedCount > 0 && (
              <li>
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full cursor-pointer px-3 py-1.5 text-left text-sm text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  Clear selection
                </button>
              </li>
            )}
            {filteredOptions.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                    isSelected(option)
                      ? "font-medium text-[var(--foreground)]"
                      : "text-neutral-600 dark:text-neutral-300"
                  }`}
                >
                  {multiple && (
                    <span
                      className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border text-[10px] ${
                        isSelected(option)
                          ? "border-neutral-500 bg-neutral-500 text-white dark:border-neutral-400 dark:bg-neutral-400 dark:text-black"
                          : "border-neutral-300 dark:border-neutral-600"
                      }`}
                    >
                      {isSelected(option) && "\u2713"}
                    </span>
                  )}
                  {option}
                </button>
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-neutral-400">
                No matches
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
