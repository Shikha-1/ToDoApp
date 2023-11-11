import React, { useRef, useEffect } from "react";
function useOutsideAlerter(ref, fn) {
  const newFn = () => useCallback(() => fn(), []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        newFn();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, newFn]);
}

export default function PopUp({ children, onClickOutside }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClickOutside);

  return <div ref={wrapperRef}>{children}</div>;
}
