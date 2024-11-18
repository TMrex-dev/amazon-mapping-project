import React, { useState, useEffect } from "react";
import "./PurchasePage.css";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";

function PurchasePage() {
  const [quantity, setQuantity] = useState(1);
  const [isHolding, setIsHolding] = useState(false);
  const [activeSection, setActiveSection] = useState("purchase");
  const [holdProgress, setHoldProgress] = useState(0);
  const images = [image1, image2, image3, image4];
  const [currentIndex, setCurrentIndex] = useState(0);

  const holdDuration = 2000; // Duration for holding the add-to-cart button

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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
      console.log("Item added to cart!");
    }
    setHoldProgress(0);
  };

  const handleMouseLeave = () => {
    setIsHolding(false);
    setHoldProgress(0);
  };
  

  useEffect(() => {
    let interval;
    if (isHolding) {
      interval = setInterval(() => {
        setHoldProgress((prevProgress) => {
          const newProgress = prevProgress + 100 / (holdDuration / 50);
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 50);
    } else {
      setHoldProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding]);

  const handleScroll = () => {
    const sections = ["purchase", "about", "related", "questions", "reviews"];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-logo">Amazon</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for products"
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </header>

      {/* Purchase Section */}
      <section id="purchase" className="purchase-page">
        <div className="image-gallery">
          <div className="main-image-container">
            {currentIndex > 0 && (
              <button
                className="nav-button left"
                onClick={handlePrev}
              ></button>
            )}

            <img
              src={images[currentIndex]}
              alt="Main Product"
              className="main-product-image"
            />

            {currentIndex < images.length - 1 && (
              <button
                className="nav-button right"
                onClick={handleNext}
              ></button>
            )}
          </div>

          <div className="thumbnail-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${
                  currentIndex === index ? "selected-thumbnail" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1 className="product-title">
            Dell Vostro 3910 Full Size Tower Business Desktop
          </h1>
          <div className="product-rating">4.4 ⭐ (36 ratings)</div>
          <p className="product-price">$629.00</p>
          <p className="shipping-info">$246.70 Shipping & Import Fees to Ireland</p>
          <p className="stock-info">Only 5 left in stock - order soon.</p>
        </div>

        <div className="purchase-panel">
          <p className="product-price-large">$629.00</p>
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
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
          </button>
          <button className="buy-now-button">Buy Now</button>
        </div>
      </section>

      {/* About This Item Section */}
      <section id="about" className="about-this-item">
        <h2>About This Item</h2>
        <p>
          This Dell Vostro desktop offers high performance for your business
          needs with a reliable Intel processor and sleek design. Great for
          multitasking and storing important files securely.
        </p>
      </section>

      {/* Related Items Section */}
      <section id="related" className="related-items">
        <h2>Related Items</h2>
        <ul>
          <li>Dell Inspiron Desktop</li>
          <li>HP EliteDesk Business Desktop</li>
          <li>Lenovo ThinkCentre M720</li>
        </ul>
      </section>

      {/* Questions Section */}
      <section id="questions" className="questions">
        <h2>Customer Questions & Answers</h2>
        <p>
          <strong>Q:</strong> Does this desktop come with a monitor? <br />
          <strong>A:</strong> No, the monitor is sold separately.
        </p>
        <p>
          <strong>Q:</strong> Is the RAM upgradeable? <br />
          <strong>A:</strong> Yes, it supports up to 64GB of RAM.
        </p>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews">
        <h2>Customer Reviews</h2>
        <p>"Great desktop for office work!" - ⭐⭐⭐⭐</p>
        <p>"Fast and reliable, but a bit noisy." - ⭐⭐⭐⭐</p>
        <p>"Worth the price, highly recommend!" - ⭐⭐⭐⭐⭐</p>
      </section>

      {/* Sticky Navigation Bar */}
      <nav className="sticky-nav">
        <button
          onClick={() => scrollToSection("purchase")}
          className={activeSection === "purchase" ? "active" : ""}
        >
          Purchase
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className={activeSection === "about" ? "active" : ""}
        >
          About
        </button>
        <button
          onClick={() => scrollToSection("related")}
          className={activeSection === "related" ? "active" : ""}
        >
          Related
        </button>
        <button
          onClick={() => scrollToSection("questions")}
          className={activeSection === "questions" ? "active" : ""}
        >
          Questions
        </button>
        <button
          onClick={() => scrollToSection("reviews")}
          className={activeSection === "reviews" ? "active" : ""}
        >
          Reviews
        </button>
      </nav>
    </div>
  );
}

export default PurchasePage;
