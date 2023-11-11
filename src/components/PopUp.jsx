import React, { useRef, useEffect, useCallback } from "react";

function useOutsideAlerter(ref, fn) {
  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    },
    [ref, fn]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
}

export default function PopUp({ children, onClickOutside }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(
    wrapperRef,
    useCallback(() => onClickOutside(), [])
  );

  return <div ref={wrapperRef}>{children}</div>;
}
