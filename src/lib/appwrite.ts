import { Client, Databases } from 'appwrite';

// Initialize Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Replace with your Appwrite URL
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Replace with your Appwrite Project ID

// Initialize Appwrite Database service
const database = new Databases(client);

// Function to fetch categories
export const fetchCategories = async () => {
  try {
    const categories = await database.listDocuments('Categories', process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!);
    return categories.documents;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Function to fetch products
export const fetchProducts = async () => {
  try {
    const products = await database.listDocuments('ProductsList', process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!);
    return products.documents;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
