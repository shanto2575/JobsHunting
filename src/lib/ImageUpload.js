import { baseUrl } from "./baseUrl";

export const imageUpload = async (image) => {
    // console.log("KEY:", process.env.NEXT_PUBLIC_IMAGE_KEY);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_KEY}`;
    // console.log("URL:", url);

    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(url, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    // console.log(data);

    return data.data;
};

