export type CartItem = {
    id: string;
    title: string;
    price: number; // VND hoặc đơn vị bạn chọn
    image?: string;
    qty: number;
};

export type AddToCartPayload = Omit<CartItem, "qty"> & { qty?: number };
