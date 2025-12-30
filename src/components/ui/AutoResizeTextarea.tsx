import clsx from "clsx";
import { useRef, forwardRef } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, Props>(
  (props, forwardedRef) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);

    const setRefs = (node: HTMLTextAreaElement | null) => {
      innerRef.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const resize = (textarea: HTMLTextAreaElement) => {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    };

    return (
      <textarea
        ref={setRefs}
        {...props}
        onInput={(e) => {
          resize(e.currentTarget);
          props.onInput?.(e);
        }}
        className={clsx(
          "block overflow-x-hidden resize-none whitespace-pre-wrap",
          props.className
        )}
      />
    );
  }
);

AutoResizeTextarea.displayName = "AutoResizeTextarea";
export default AutoResizeTextarea;
