import axios from "axios";

async function GetImage(query: string): Promise<any> {
    try {
        const { data } = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=wL1AVxGDVkSN4B99j8_NOiluXT19QPGtbV2i6TGGAww`);
        return data.results[0];
    } catch (error) {
        throw new Error('Failed to fetch image');
    }
}

export default GetImage;
