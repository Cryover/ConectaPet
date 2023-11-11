export const isJSON = (input:any) => {
    try {
      const parsed = JSON.parse(input);

      if (parsed && typeof parsed === 'object') {
        console.log('Is Object');
        return true;
      }
    } catch (error) {
      // Not a valid JSON string
      console.log('Invalid JSON');
    }
    console.log('Is JSON');
    return false;
  };
