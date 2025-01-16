"use server";
import { Client, Account, Databases, Query, Storage } from "node-appwrite";
import { cookies } from "next/headers";
import { ProductCart } from "@/types";
import { CartItemDB } from "@/lib/hooks/use-CartContext";
import { getLoggedInUser } from "@/actions/user.actions";

const applyDiscount = (price: number, discountPercentage: number) => {
  return Math.round(price - (price * (discountPercentage / 100)));
};

const capitalizeName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

const encodeCartItem = (item: { id: string; quantity: number }): string => {
  return `${item.id}:${item.quantity}`;
};

const decodeCartItem = (encodedItem: string): { id: string; quantity: number } => {
  const [id, quantity] = encodedItem.split(':');
  return { id, quantity: parseInt(quantity, 10) };
};


export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = (await cookies()).get("appwrite-session");
  if (!session || !session.value) {
    // throw new Error("No session");
    return null
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
    },
    get storages() {
      return new Storage(client);
    }
  };
}

export async function fetchProducts() {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const productCollectionid = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!;

  try {
    const response = await database.listDocuments(databaseId, productCollectionid);
    const products = response.documents;

    const productsWithDiscount = products.map(product => {
      const discountedPrice = applyDiscount(product.price, product.discountPercentage);

      return { ...product, discountedPrice, name: capitalizeName(product.name) };
    });
    return productsWithDiscount;

  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    throw new Error("Failed to fetch product details.");
  }
}

export async function fetchCategories() {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const categoriesCollectionId = process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID!;

  const response = await database.listDocuments(databaseId, categoriesCollectionId);
  return response.documents;
}

export async function fetchProductById(productId: string) {
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

    const result = applyDiscount(response.price, response.discountPercentage);

    return { ...response, discountedPrice: result, name: capitalizeName(response.name) }
  } catch (error) {
    console.error("Error fetching product bt ID: ", error);
    throw new Error("Failed to fetch product details.");

  }
}

export async function fetchProductsByIds(productIds: string[]): Promise<ProductCart[]> {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const productCollectionId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!;
  try {
    const response = await database.listDocuments(databaseId, productCollectionId, [
      Query.equal("$id", productIds),
    ]);

    const products = response.documents.map((product) => {
      const discountedPrice = applyDiscount(product.price, product.discountPercentage);
      return {
        ...product,
        discountedPrice,
        price: product.price,
        name: capitalizeName(product.name),
        imageUrl: product.imageUrl,
      };
    });
    return products;
  } catch (error) {
    console.error("Error fetching products by IDs:", error);
    throw new Error("Failed to fetch product details.");
  }
}

export async function fetchProductsByCategory(categoryId: string) {
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


export async function submitReview(productId: string, rating: number, reviewText: string, userId: string) {
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

export async function searchProducts(query: string) {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const productCollectionId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID!;

  try {
    const response = await database.listDocuments(
      databaseId,
      productCollectionId,
      [
        Query.search('name', query),
        // Query.search('description', query)
      ]
    );

    return response.documents;
  } catch (error) {
    console.error("Error searching products: ", error);
    throw new Error("Unknown error occurred during search.");
  }

}


export async function fetchCouponByCode(couponCode: string, originalPrice: number) {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const couponsCollectionId = process.env.NEXT_PUBLIC_APPWRITE_COUPONS_COLLECTION_ID!;

  try {
    const response = await database.listDocuments(
      databaseId,
      couponsCollectionId,
      [Query.equal("code", couponCode)]
    );

    if (response.documents.length === 0) {
      throw new Error("Coupon code not found");
    }

    const coupon = response.documents[0];

    // Check if coupon is expired
    const currentDate = new Date();
    const expiryDate = new Date(coupon.expiryDate);

    if (expiryDate < currentDate) {
      throw new Error("Coupon code has expired");
    }

    // Check if coupon is active
    if (coupon.status !== "active") {
      throw new Error("Coupon code is inactive");
    }

    // Assuming coupon has a field like 'discountPercentage'
    const discountPercentage = coupon.discountPercentage || 0;
    const discountedPrice = applyDiscount(originalPrice, discountPercentage);

    return {
      coupon,
      discountedPrice,
    };
  } catch (error) {
    console.error("Error fetching coupon: ", error);
    throw new Error("Failed to validate coupon code");
  }
}

export async function fetchBanners() {
  const client = await createAdminClient();
  const storage = client.storages;

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BANNER_BUCKET_ID!;

  try {
    const response = await storage.listFiles(bucketId);

    const banners = response.files.map((file) => ({
      id: file.$id,
      name: file.name,
      url: `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`
    }))
    return banners;
  } catch (error) {
    console.error('Error fetching banners: ', error);
    throw new Error('Unknown error occured while fetching banners.');
  }
}

export const updateUserCartInDb = async (userId: string, cart: CartItemDB[]) => {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const userCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!;

  try {
    const cartData = cart.map(encodeCartItem);
    await database.updateDocument(databaseId, userCollectionId, userId, { cart: cartData });
  } catch (error) {
    console.error('Error updating user cart in database:', error);
  }
};


export async function fetchUserCart(userId: string): Promise<{ id: string; quantity: number }[]> {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const userCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!;
  try {
    const userDoc = await database.getDocument(databaseId, userCollectionId, userId);

    const cartData = (userDoc.cart as string[] || []).map(decodeCartItem);
    return cartData;
  } catch (error) {
    console.error('Error fetching user cart from database:', error);
    return [];
  }
}

export async function fetchAnnouncement() {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const AnnouncementCollectionId = process.env.NEXT_PUBLIC_APPWRITE_ANNOUNCEMENT_COLLECTION_ID!;
  try {
    const response = await database.listDocuments(
      databaseId,
      AnnouncementCollectionId,
      [Query.equal("isActive", true)],
    )

    if (response.documents.length > 0) {
      return response.documents[0]
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching announcement:", error);
    throw new Error("Failed to fetch announcement");
  }
}

export const resetPassword = async (email: string) => {
  const client = await createAdminClient();
  const account = client.account;

  try {
    await account.createRecovery(email, process.env.NEXT_PUBLIC_RESET_URL!);

    return true;
  } catch (error) {
    console.error("Error sending recovery email", error);
    throw new Error("Unable to send recovery email");
  }
};


export const updatePassword = async (userId: string, secret: string, newPassword: string) => {
  const client = await createAdminClient();
  const account = client.account;
  try {
    await account.updateRecovery(userId, secret, newPassword);
  } catch (error) {
    console.error("Error resetting password: ", error);
    throw new Error("Failed to reset password.");
  }
};


export const newsletterSubscription = async (email: string, action: "subscribe" | "unsubscribe") => {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const newsletterCollectionId = process.env.NEXT_PUBLIC_APPWRITE_NEWSLETTER_COLLECTION_ID!;

  try {
    const listResponse = await database.listDocuments(databaseId, newsletterCollectionId, [
      Query.equal("email", email)
    ]);

    if (listResponse.total > 0) {
      const existingDoc = listResponse.documents[0];

      if (action === "subscribe") {
        // await database.updateDocument(databaseId, newsletterCollectionId, existingDoc.$id, { subscribed: true });
        return { success: true, message: "Successfully subscribed!" };
      } else if (action === "unsubscribe") {
        await database.updateDocument(databaseId, newsletterCollectionId, existingDoc.$id, { subscribed: false });
        return { success: true, message: "Successfully unsubscribed!" };
      } else {
        throw new Error("Invalid action provided.");
      }
    } else {
      if (action === "subscribe") {
        await database.createDocument(databaseId, newsletterCollectionId, "unique()", { email, subscribed: true });
        return { success: true, message: "Thank you for subscribing!" };
      } else {
        throw new Error("Email not found for unsubscribing.");
      }
    }
  } catch (error: any) {
    return { success: false, message: error.message || "An error occurred." };
  }
};

export async function fetchUserWishlist(userId: string): Promise<string[]> {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const userCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!;

  try {
    const userDoc = await database.getDocument(databaseId, userCollectionId, userId);
    return userDoc.wish || [];
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw new Error("Failed to fetch wishlist.");
  }
}


export async function updateWishlist(productId: string, add: boolean): Promise<void> {
  const client = await createAdminClient();
  const database = client.databases;

  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
  const userCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!;

  try {
    const user = await getLoggedInUser();
    const userId = user.$id;

    const userDocument = await database.getDocument(databaseId, userCollectionId, userId);

    let currentWishlist: string[] = userDocument.wish || [];


    if (add) {
      if (!currentWishlist.includes(productId)) {
        currentWishlist.push(productId);
      }
    } else {
      currentWishlist = currentWishlist.filter((id) => id !== productId);
    }

    const result = await database.updateDocument(databaseId, userCollectionId, userId, {
      wish: currentWishlist,
    });
  } catch (error) {
    console.error('Error updating wishlist:', error);
    throw new Error('Failed to update wishlist.');
  }
}