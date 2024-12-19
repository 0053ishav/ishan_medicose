"use server";
import { Client, Account, Databases, Query } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    }
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    }
  };
}


export async function fetchProducts () {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const productCollectionid = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!;

  const response = await database.listDocuments(databaseId, productCollectionid);
  return response.documents;
}

export async function fetchCategories () {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const categoriesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!;

  const response = await database.listDocuments(databaseId, categoriesCollectionId);
  return response.documents;
}

export async function fetchProductById (productId: string) {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const productCollectionid = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!;

  try {
    const response = await database.getDocument(
      databaseId,
      productCollectionid,
      productId
    )

    return response;
  } catch (error) {
    console.error("Error fetching product bt ID: ", error);
    throw new Error("Failed to fetch product details.");
    
  }
}


export async function fetchProductsByCategory (categoryId: string) {
  const client = await createAdminClient();
  const database = client.databases;
  
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const productCollectionId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!;

  try {
    const response = await database.listDocuments(
      databaseId,
      productCollectionId,
            [Query.equal("category", categoryId)] 
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error("Failed to fetch products");
  }
};

export async function fetchReviews(productId: string) {
  const client = await createAdminClient();
  const database = client.databases;
  
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const reviewCollectionId = process.env.NEXT_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID!;

  try {
    const response = await database.listDocuments(
      databaseId,
      reviewCollectionId,
      [Query.equal("productId", productId)] 
    );

    const reviews = response.documents.map((doc) => ({
      rating: doc.rating,
      reviewText: doc.reviewText,
      userId: doc.userId,
      createdAt: doc.$createdAt,
      id: doc.$id,
    }));

    return reviews;
  } catch (error) {
    console.error("Error fetching review: ", error);
    throw new Error;
  }
}


export async function submitReview(productId: string, rating: number, reviewText: string,   userId: string) {
  const client = await createAdminClient();
  const database = client.databases;
  
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const reviewCollectionId = process.env.NEXT_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID!;

  try {
    const response = await database.createDocument(
      databaseId,
      reviewCollectionId,
      "unique()",
      {
        productId,
        rating,
        reviewText,
        $createdAt: new Date().toISOString(),
        userId // Todo: Add user id
      }
    )
    return response;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw new Error("Failed to submit review");
  }
}

export async function fetchMedicalDetails(productId: string) {
  const client = await createAdminClient();
  const database = client.databases;
  
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const MedicalDetailsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_MEDICAL_DETAILS_COLLECTION_ID!;

  try {
    const response = await database.listDocuments(
      databaseId,
      MedicalDetailsCollectionId,
      [Query.equal("productId", productId)] 
    );

    return response;
  } catch (error) {
    console.error("Error fetching medical details: ", error);
    throw new Error;
  }
}