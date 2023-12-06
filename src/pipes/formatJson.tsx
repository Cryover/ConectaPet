export const formatAndStringify = (data: string | null) => {
  //const formatedData = JSON.stringify(data);
  const formatedData = data ? JSON.parse(data) : null;

  return formatedData;
};
