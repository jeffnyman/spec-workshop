class FluidTypography {
  constructor(min_font, max_font, min_vw, max_vw) {
    this.min_font = min_font;
    this.max_font = max_font;
    this.min_vw = min_vw;
    this.max_vw = max_vw;
    this.min_rem = this.computeRem().min_rem;
    this.max_rem = this.computeRem().max_rem;
  }

  computeRem() {
    const body = document.documentElement;
    const properties = window.getComputedStyle(body);

    const base_font_size = properties.fontSize.replace(/px/, "");

    const max = Math.max(this.min_font, base_font_size);
    const relative_max = (this.max_font * max) / this.min_font;

    const max_rem = relative_max / base_font_size;
    const min_rem = max / base_font_size;

    return { min_rem, max_rem };
  }

  fontSize() {
    const width = document.documentElement.offsetWidth;
    let rem = this.min_rem;

    if (width > this.min_vw && width < this.max_vw) {
      // The fluid typography calculation
      rem =
        this.min_rem +
        ((this.max_rem - this.min_rem) * (width - this.min_vw)) /
          (this.max_vw - this.min_vw);
    }

    if (width > this.max_vw) {
      rem = this.max_rem;
    }

    // KEEP NEXT LINE IN PLACE IF USING JAVASCRIPT
    // COMMENT OUT NEXT LINE IF USING CSS SOLUTION

    document.documentElement.style = `font-size: ${rem}rem`;
  }

  resizeHandler() {
    this.fontSize();
    window.addEventListener("resize", this.fontSize.bind(this));
  }
}

const ft = new FluidTypography(16, 32, 320, 1920).resizeHandler();
