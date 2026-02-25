'use client'

import { useState } from "react"
import Portal from "./portal" // تأكد أن اسم الملف portal.js بحروف صغيرة
import { useProducts } from "@/context/ProductContext"

export default function Products(props) {
    const { planner, stickers } = props
    const [portalImage, setPortalImage] = useState(null)

    const { handleIncrementProduct, cart } = useProducts()
    
    // التحقق من وصول البيانات من السيرفر
    if (!stickers || !stickers.length || !planner) { 
        return null 
    }

    return (
        <>
            {/* نافذة العرض الكبيرة (Portal) */}
            {portalImage && (
                <Portal handleClosePortal={() => { setPortalImage(null) }}>
                    <div className="portal-content" onClick={() => { setPortalImage(null) }}>
                        <img 
                            className="img-display" 
                            src={`med_res/${portalImage}.png`} 
                            alt={`${portalImage}-high-res`} 
                            onClick={(e) => e.stopPropagation()} // منع الإغلاق عند الضغط على الصورة نفسها
                        />
                    </div>
                </Portal>
            )}

            {/* قسم المنتج الرئيسي (Planner / Candle Engagement) */}
            <div className="section-contanier">
                <div className="section-header">
                    <h2>Shop our Selection</h2>
                    <p>From Candles or Decors Candles</p>
                </div>
                
                <div className="planner-container">
                    <div>
                        <button onClick={() => { setPortalImage('Candleengagement') }} className="img-button">
                            <img src="low_res/Candleengagement.png" alt="Candle Engagement" />
                        </button>
                    </div>
                    <div className="planner-info">
                        <p className="text-large planner-header">Buy our Candle Engagement</p>
                        <h3><span>$</span>16</h3>
                        <p><strong>Engagement Cinnamon Candle...</strong></p>
                        <ul>
                            <li><strong>Warm Cinnamon Aroma:</strong> A rich, romantic scent that fills the room with warmth.</li>
                            <li><strong>Romantic Ambiance:</strong> The soft, glowing flame creates the perfect atmosphere for special moments.</li>
                        </ul>

                        <div className="purchase-btns">
                            <button onClick={() => {
                                const plannerPriceId = planner.default_price
                                handleIncrementProduct(plannerPriceId, 1, planner)
                            }}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* قسم بقية المنتجات (Stickers / Candles Selection) */}
            <div className="section-contanier">
                <div className="section-header">
                    <h2>Our Selection</h2>
                    <p>Choose from our designed Candles</p>
                </div>
                <div className="sticker-container">
                    {stickers.map((sticker, stickerIndex) => {
                        const stickerName = sticker.name;
                        const rawPrice = sticker.prices?.[0]?.unit_amount || sticker.prices?.[0]?.unitAmount;
                        
                     
                        const price = rawPrice ? (rawPrice / 100).toFixed(2) : "0.00";
                        return (
                            <div key={stickerIndex} className="sticker-card">
                                <button onClick={() => { setPortalImage(stickerName) }} className="img-button">
                                    <img src={`low_res/${stickerName}.png`} alt={stickerName} />
                                </button>
                                <div className="sticker-info">
                                    {/* تحويل الشرطات السفلية في الاسم إلى مسافات ليكون المظهر أجمل */}
                                    <p className="text-medium">{stickerName.replaceAll('_', ' ')}</p>
                                    <p>{sticker.description}</p>
                                    <h4><span>$</span>{price}</h4>
                                    <button onClick={() => {
                                        // استخدام id السعر من Stripe
                                        const stickerPriceId = sticker.default_price || sticker.prices?.[0]?.id;
                                        if (stickerPriceId) {
                                            handleIncrementProduct(stickerPriceId, 1, sticker);
                                        } else {
                                            console.error("No price found for:", stickerName);
                                        }
                                    }}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}