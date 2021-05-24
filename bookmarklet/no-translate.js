javascript: (() => {
  const codeReg = /^(\$.*|-[\w-]*)$/;
  Array.from(document.querySelectorAll("*")).forEach((el) => {
    if (el.tagName === "PRE") {
      el.setAttribute("translate", "no");
      return;
    }
    if (codeReg.test(el.textContent.trim())) {
      el.setAttribute("translate", "no");
      return;
    }
  });
})();
