import React, { useRef, useEffect, useCallback } from "react";
function useOutsideAlerter(ref, fn) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, fn]);
}

export default function PopUp({ children, onClickOutside }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef,  useCallback(() => onClickOutside(), []));

  return <div ref={wrapperRef}>{children}</div>;
}
