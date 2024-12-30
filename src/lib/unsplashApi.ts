import axios from "axios";

const UNSPLASH_ACCESS_KEY = "5rF9H9GdZCZip0T16057uirIJ8OkXSqgCBrAPsx6hAc";

const getUnsplashImage = async (query = "pharmacy") => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
    );
    
    return response.data?.urls?.regular;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    return null;
  }
};

export default getUnsplashImage;
