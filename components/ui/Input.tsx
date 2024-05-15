/* eslint-disable react/display-name */
import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  forElement: string;
  label_cn?: string;
  input_cn?: string;
  error_message?: string;
  box_cn?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      label,
      forElement,
      input_cn,
      label_cn,
      error_message,
      box_cn,
      ...rest
    },
    ref
  ) => {
    return (
      <section className={twMerge("flex flex-col gap-2", box_cn)}>
        <label
          className={twMerge(label_cn, "block text-sky-500 font-semibold")}
          htmlFor={forElement}
        >
          {label}
        </label>
        <input
          className={twMerge(
            input_cn,
            "w-full outline-none bg-zinc-100 focus:bg-zinc-200 p-2 rounded-xl shadow-md"
          )}
          id={forElement}
          name={forElement}
          type={type}
          ref={ref}
          {...rest}
        />
        <p className="text-rose-500">{error_message}</p>
      </section>
    );
  }
);

export default Input;
