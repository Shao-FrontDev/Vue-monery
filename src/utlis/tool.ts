import dayjs from "dayjs";

interface RecordItem {
  selectedTags: Array<String>;
  selectedNotes: string;
  selectedType: "-" | "+";
  selectedAmount: number;
  createAt?: any;
}

type CloneFunction = (data: RecordItem) => RecordItem;

export const clone: CloneFunction = data => {
  return JSON.parse(JSON.stringify(data));
};

export const calculate = (data: RecordItem, type: String) => {
  let number = 0;

  if (data.selectedType === type) {
    number += data.selectedAmount;
  }
  return number;
};

export const beautify = (value: Date) => {
  const day = dayjs(value);
  const now = dayjs();

  if (day.isSame(now, "day")) {
    return "今天";
  } else if (day.isSame(now.subtract(1, "day"), "day")) {
    return "昨天";
  } else if (day.isSame(now.subtract(2, "day"), "day")) {
    return "前天";
  } else if (day.isSame(now, "year")) {
    return day.format("M月D日");
  }
};
