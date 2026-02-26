import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";
export const dynamic = 'force-dynamic';

export async function getProducts() {
    try {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL 
        const response = await fetch(baseURL + '/api/products', { cache: 'no-store' });
        
        if (!response.ok) return []; // إذا فشل الطلب، عد بمصفوفة فارغة

        const products = await response.json();
        // تأكد أن النتيجة مصفوفة فعلاً وليست كائن خطأ مثل {error: ...}
        return Array.isArray(products) ? products : [];
    } catch (err) {
        console.error("Fetch Error:", err.message);
        return [];
    }
}

export default async function Home() {
    const products = await getProducts();

    let planner = null;
    let stickers = [];

    // فحص إضافي للتأكد أن products مصفوفة قبل الدوران
    if (products && products.length > 0) {
        for (let product of products) {
            if (product.name === 'Candleengagement') {
                planner = product;
                continue;
            }
            stickers.push(product);
        }
    }

    return (
        <>
            <ImageBanner />
            <section>
                {/* نرسل البيانات فقط إذا كانت موجودة لمنع أخطاء الـ null في المكونات الابنة */}
                <Products planner={planner} stickers={stickers} />
            </section>
        </>
    );
}