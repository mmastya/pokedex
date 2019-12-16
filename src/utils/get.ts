export const get = async (path: string, byUrl = false): Promise<any> => {
  try {
    const response = await fetch(byUrl ? path : `https://pokeapi.co/api/v2/${path}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};
