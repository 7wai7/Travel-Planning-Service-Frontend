import { useEffect, useRef, forwardRef } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (props, forwardedRef) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const ref =
      (forwardedRef as React.RefObject<HTMLTextAreaElement>) ?? innerRef;

    useEffect(() => {
      const textarea = ref.current;
      if (!textarea) return;

      const resize = () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      };

      resize();
      textarea.addEventListener("input", resize);
      return () => textarea.removeEventListener("input", resize);
    }, [ref, props.value]);

    return (
      <textarea
        ref={ref}
        {...props}
        className={`${props.className || ""} block overflow-x-hidden resize-none text-justify whitespace-pre-wrap`}
      />
    );
  }
);

export default AutoResizeTextarea;
