import React, { useState, useEffect } from 'react';
import './PurchasePage.css';
import image1 from '../images/image1.jpg'
import image2 from '../images/image2.jpg'
import image3 from '../images/image3.jpg'
import image4 from '../images/image4.jpg'

function PurchasePage() {
  const [quantity, setQuantity] = useState(1);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(image1); // Default main image

  const holdDuration = 2000; // Duration in milliseconds to fully fill the line

  const previewImages = [image1, image2, image3, image4]; // Local images

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleMouseDown = () => {
    setIsHolding(true);
    setHoldProgress(0);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    if (holdProgress >= 100) {
      console.log('Item added to cart!');
    }
    setHoldProgress(0); // Reset progress
  };

  const handleMouseLeave = () => {
    setIsHolding(false);
    setHoldProgress(0); // Reset progress if the user moves cursor away
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image); // Set selected image as main image
  };

  useEffect(() => {
    let interval;
    if (isHolding) {
      interval = setInterval(() => {
        setHoldProgress((prevProgress) => {
          const newProgress = prevProgress + (100 / (holdDuration / 50));
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 50); // Update every 50ms
    } else if (!isHolding && holdProgress < 100) {
      setHoldProgress(0); // Reset if not holding
    }

    return () => clearInterval(interval);
  }, [isHolding]);

  return (
    <div className="purchase-page">
      {/* Left Section: Image Gallery */}
      <div className="image-gallery">
        <div className="thumbnail-container">
          {previewImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${selectedImage === image ? 'selected' : ''}`}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
        <img src={selectedImage} alt="Product" className="main-product-image" />
      </div>

      {/* Center Section: Product Details */}
      <div className="product-details">
        <h1 className="product-title">Dell Vostro 3910 Full Size Tower Business Desktop</h1>
        <div className="product-rating">
          <span>4.4 ⭐ (36 ratings)</span>
        </div>
        <p className="product-price">$629.00</p>
        <p className="shipping-info">$246.70 Shipping & Import Fees to Ireland</p>
        <p className="stock-info">Only 5 left in stock - order soon.</p>

        {/* Tabs */}
        <div className="product-tabs">
          <button className="tab">Description</button>
          <button className="tab">Reviews</button>
          <button className="tab">Related Items</button>
          <button className="tab">Comparison</button>
          <button className="tab">Recommended</button>
        </div>
      </div>

      {/* Right Section: Purchase Panel */}
      <div className="purchase-panel">
        <p className="product-price-large">$629.00</p>
        <div className="quantity-section">
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
            min="1"
          />
        </div>
        <button
          className="add-to-cart-button"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          Add to Cart
          <div className="progress-line" style={{ width: `${holdProgress}%` }}></div>
        </button>
        <button className="buy-now-button">Buy Now</button>
        <div className="shipping-info">
          Ships from: Amazon <br />
          Sold by: AZXUT STORE
        </div>
        <div className="return-info">
          <input type="checkbox" id="gift-receipt" />
          <label htmlFor="gift-receipt">Add a gift receipt for easy returns</label>
        </div>
        <button className="add-to-list-button">Add to List</button>
      </div>
    </div>
  );
}

export default PurchasePage;
