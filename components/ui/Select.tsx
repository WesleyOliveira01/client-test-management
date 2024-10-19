import { forwardRef, ReactNode, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  label?: string;
  forElement?: string;
  label_cn?: string;
  select_cn?: string;
  error_message?: string;
};

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      children,
      forElement,
      label_cn,
      select_cn,
      error_message,
      onChange,
      ...rest
    },
    ref
  ) => {
    return (
      <section className="flex flex-col gap-2">
        <label className={twMerge("text-lime-500 font-semibold", label_cn)} htmlFor={forElement}>
          {label}
        </label>
        <select
          className={twMerge(
            "p-2 w-full outline-none bg-zinc-100 focus:bg-zinc-200 text-zinc-950 font-semibold rounded-xl shadow-md",
            select_cn
          )}
          onChange={onChange}
          ref={ref}
          name={forElement}
          id={forElement}
          {...rest}
        >
          {children}
        </select>
        <p className="text-rose-500">{error_message}</p>
      </section>
    );
  }
);

export default Select;
