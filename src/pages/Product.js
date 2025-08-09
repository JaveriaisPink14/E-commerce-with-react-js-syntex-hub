
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import BreadCrums from '../components/BreadCrums/BreadCrums'; 
import ProductDisplay from '../components/ProductDisplay/ProductDisplay'; 
import { Descriptionbox } from '../components/Descriptionbox/Descriptionbox';
import RelatedProducts from '../components/Relatedproduct/Relatedproduct';






const Product = () => {
  const { AllProducts } = useContext(ShopContext);
  const { ProductId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const productIdNum = Number(ProductId);
    if (!isNaN(productIdNum)) {
      const found = AllProducts.find((e) => e.id === productIdNum);
      setProduct(found);
    }
        fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        console.log("Dummy API Products:", data.products);
        data.products.forEach((item, index) => {
          console.log(`Product ${index + 1}:`, item.title, "-", item.price, "USD");
        });
      });
    
  },
   [ProductId, AllProducts]);

  if (!product) return <div style={{ textAlign: 'center', marginTop: '100px' }}>Loading...</div>;

  return (
    <div>
      <BreadCrums product={product} />
      <ProductDisplay product={product} />
      <Descriptionbox />
    
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      />
    </div>
  );
};

export default Product;