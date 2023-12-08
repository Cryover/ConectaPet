export class SelectOptionEntryClass {
  label: string;
  value: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}

export class LineChartDataClass {
  labels: string[];
  datasets: number[];
  constructor(labels: string[], datasets: number[]) {
    this.labels = labels;
    this.datasets = datasets;
  }
}

export class PickerItemPropsClass {
  label: string;
  value: any;
  constructor(label: string, value: any) {
    this.label = label;
    this.value = value;
  }
}
