"use server";

export const getPopularCategoryProducts = async() => {
    try {
        const res = await fetch('https://sustainability-idea-hub-server.vercel.app/api/idea');


        const result = await res.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error
    }
}