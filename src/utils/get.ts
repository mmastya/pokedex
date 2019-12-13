export const get = async (path: string): Promise<any> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/${path}`);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};
