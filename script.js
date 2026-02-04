document.addEventListener('DOMContentLoaded', () => {
  const red = document.getElementById('red');
  const green = document.getElementById('green');
  const blue = document.getElementById('blue');

  const redNum = document.getElementById('redNum');
  const greenNum = document.getElementById('greenNum');
  const blueNum = document.getElementById('blueNum');

  const rVal = document.getElementById('rVal');
  const gVal = document.getElementById('gVal');
  const bVal = document.getElementById('bVal');

  const visual = document.getElementById('visualizador');
  const hexCode = document.getElementById('hexCode');
  const rgbDecimal = document.getElementById('rgbDecimal');
  const colorPicker = document.getElementById('colorPicker');

  const clamp = v => Math.max(0, Math.min(255, Number(v) || 0));
  const toHex = v => clamp(v).toString(16).padStart(2, '0').toUpperCase();

  // Convertir hex a RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  function updateFromSliders() {
    const r = clamp(red.value);
    const g = clamp(green.value);
    const b = clamp(blue.value);

    redNum.value = r;
    greenNum.value = g;
    blueNum.value = b;

    applyColor(r, g, b);
  }

  function updateFromNumbers() {
    const r = clamp(redNum.value);
    const g = clamp(greenNum.value);
    const b = clamp(blueNum.value);

    red.value = r;
    green.value = g;
    blue.value = b;

    applyColor(r, g, b);
  }

  function updateFromRGBDecimal() {
    const input = rgbDecimal.value.trim();
    const rgbRegex = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
    const match = input.match(rgbRegex);

    if (match) {
      const r = clamp(match[1]);
      const g = clamp(match[2]);
      const b = clamp(match[3]);

      red.value = r;
      green.value = g;
      blue.value = b;

      applyColor(r, g, b);
    }
  }

  function updateFromColorPicker() {
    const hexColor = colorPicker.value;
    const rgb = hexToRgb(hexColor);

    red.value = rgb.r;
    green.value = rgb.g;
    blue.value = rgb.b;

    applyColor(rgb.r, rgb.g, rgb.b);
  }

  function applyColor(r, g, b) {
    rVal.textContent = r;
    gVal.textContent = g;
    bVal.textContent = b;

    const rgbStr = `rgb(${r}, ${g}, ${b})`;
    visual.style.backgroundColor = rgbStr;
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    hexCode.textContent = hex;
    rgbDecimal.value = rgbStr;
    colorPicker.value = hex;
  }

  [red, green, blue].forEach(el => el.addEventListener('input', updateFromSliders));
  [redNum, greenNum, blueNum].forEach(el => el.addEventListener('input', updateFromNumbers));
  rgbDecimal.addEventListener('input', updateFromRGBDecimal);
  colorPicker.addEventListener('input', updateFromColorPicker);

  // Inicializa estado
  updateFromSliders();
});