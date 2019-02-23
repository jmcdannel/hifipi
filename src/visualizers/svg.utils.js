export const isSVGLoaded = (svgObjextEl, elementId = 'visualizer', delay = 300, maxWait = (1000 * 60)) => {
  return new Promise((resolve, reject) => {
    let elapsed = 0;
    const check = () => {
      const svgEl = svgObjextEl.contentDocument.getElementById(elementId);
      if (!svgEl) {
        elapsed += delay
        setTimeout(() => check(), delay);
      } else if (elapsed > maxWait) {
        reject();
      } else {
        resolve(svgEl);
      }
    }
    check();
  });
};