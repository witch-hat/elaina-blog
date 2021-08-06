export namespace TextAreaResizer {
  export function getHeight(rows: number, el: HTMLTextAreaElement): number {
    const { borderBottomWidth, borderTopWidth, fontSize, lineHeight, paddingBottom, paddingTop } = window.getComputedStyle(el);

    const lh = lineHeight === 'normal' ? parseFloat(fontSize) * 1.2 : parseFloat(lineHeight);

    const rowHeight =
      rows === 0
        ? 0
        : lh * rows + parseFloat(borderBottomWidth) + parseFloat(borderTopWidth) + parseFloat(paddingBottom) + parseFloat(paddingTop);

    const scrollHeight = el.scrollHeight + parseFloat(borderBottomWidth) + parseFloat(borderTopWidth);

    return Math.max(rowHeight, scrollHeight);
  }

  export function resize(rows: number, el: HTMLTextAreaElement | null): void {
    if (el) {
      let overflowY = 'hidden';
      const { maxHeight } = window.getComputedStyle(el);

      if (maxHeight !== 'none') {
        const maxHeightN = parseFloat(maxHeight);

        if (maxHeightN < el.scrollHeight) {
          overflowY = '';
        }
      }

      el.style.height = '0';
      el.style.overflowY = overflowY;
      el.style.height = `${getHeight(rows, el)}px`;
    }
  }
}
