const regex =
  /rgba?\((?<r>\d{1,3}),\s*(?<g>\d{1,3}),\s*(?<b>\d{1,3})(?:,\s*(?<a>\d{1,3}))?\)/;

export class RgbaColor {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a: number,
  ) {}

  public static FromString(color: string) {
    const match = color.match(regex);
    if (!match) {
      throw new Error('invalid rgb(a) string');
    }
    const r = parseFloat(match?.groups?.r!);
    const g = parseFloat(match?.groups?.g!);
    const b = parseFloat(match?.groups?.b!);
    const a = parseFloat(match?.groups?.a!);

    return new this(r, g, b, a);
  }

  public toRgbaString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  public toRgbString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
