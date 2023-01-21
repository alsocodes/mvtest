export const createFormData = (data: any) => {
  const form = new FormData();

  for (let key in data) {
    const item = data[key];
    if (typeof item?.name === 'string' && item?.type != null) {
      form.append(key, item);
    } else {
      objectToFormData(form, item, key);
    }
  }

  return form;
};

const objectToFormData = (formData: any, data: any, key: any) => {
  if ((typeof data === 'object' && data !== null) || Array.isArray(data)) {
    for (let i in data) {
      if (
        (typeof data[i] === 'object' && data[i] !== null) ||
        Array.isArray(data[i])
      ) {
        objectToFormData(formData, data[i], key + '[' + i + ']');
      } else {
        formData.append(key + '[' + i + ']', data[i]);
      }
    }
  } else {
    formData.append(key, data);
  }
};

export const paginationGenerator = (
  current: number,
  last: number,
  width = 2
) => {
  const left = current - width;
  const right = current + width + 1;
  const range = [];
  const rangeWithDots: any = [];
  let l: number;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i <= right)) {
      range.push(i);
    } else if (i < left) {
      i = left - 1;
    } else if (i > right) {
      range.push(last);
      break;
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
};
