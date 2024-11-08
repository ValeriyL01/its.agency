import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('https://672cea40fd8979715640b319.mockapi.io/goods');
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error);
    return [];
  }
};
