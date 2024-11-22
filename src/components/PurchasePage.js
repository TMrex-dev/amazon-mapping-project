import React, { useState, useEffect } from "react";
import "./PurchasePage.css";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import ReviewFilter from "./ReviewFilter";
import RelatedItems from "./RelatedItems";




function PurchasePage() {
  const [quantity, setQuantity] = useState(1);
  const [isHolding, setIsHolding] = useState(false);
  const [activeSection, setActiveSection] = useState("purchase");
  const [holdProgress, setHoldProgress] = useState(0);
  const images = [image1, image2, image3, image4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = [
    { title: "Great product!", text: "Loved it!", rating: 5 },
    { title: "Not bad", text: "Good value for money.", rating: 4 },
    { title: "Could be better", text: "Had some issues.", rating: 3 },
    { title: "Not great", text: "Some issues.", rating: 2},
    { title: "Terrible", text: "Would not recommend.", rating: 1}
  ];

  const relatedItems = [
    { id: 1, image: "https://via.placeholder.com/200", title: "Item 1", price: 29.99 },
    { id: 2, image: "https://via.placeholder.com/200", title: "Item 2", price: 49.99 },
    { id: 3, image: "https://via.placeholder.com/200", title: "Item 3", price: 39.99 },
    { id: 4, image: "https://via.placeholder.com/200", title: "Item 4", price: 24.99 },
    { id: 5, image: "https://via.placeholder.com/200", title: "Item 5", price: 59.99 },
    { id: 6, image: "https://via.placeholder.com/200", title: "Item 6", price: 44.99 },
    { id: 7, image: "https://via.placeholder.com/200", title: "Item 7", price: 43.99 },
    { id: 8, image: "https://via.placeholder.com/200", title: "Item 8", price: 49.99 },
    { id: 9, image: "https://via.placeholder.com/200", title: "Item 9", price: 69.99 },
    // Add more items as needed
  ];
  

  useEffect(() => {
    // DOM manipulation for drag-and-drop functionality
    const previewImage = document.querySelector('.main-product-image');
    const shoppingCart = document.querySelector('.shopping-cart');

    if (previewImage && shoppingCart) {
      // Make the preview image draggable
      previewImage.setAttribute('draggable', true);
      previewImage.classList.add('draggable');

      // Handle drag events
      const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
      };

      const handleDragOver = (event) => {
        event.preventDefault();
        shoppingCart.style.borderColor = '#000'; // Visual feedback
      };

      const handleDragLeave = () => {
        shoppingCart.style.borderColor = '#bbb';
      };

      const handleDrop = (event) => {
        event.preventDefault();
        shoppingCart.style.borderColor = '#bbb';
        const draggedImageId = event.dataTransfer.getData('text/plain');
        const draggedImage = document.getElementById(draggedImageId);

        if (draggedImage) {
          alert('Image added to cart!');
        }
      };

      // Add event listeners
      previewImage.addEventListener('dragstart', handleDragStart);
      shoppingCart.addEventListener('dragover', handleDragOver);
      shoppingCart.addEventListener('dragleave', handleDragLeave);
      shoppingCart.addEventListener('drop', handleDrop);

      // Cleanup function
      return () => {
        previewImage.removeEventListener('dragstart', handleDragStart);
        shoppingCart.removeEventListener('dragover', handleDragOver);
        shoppingCart.removeEventListener('dragleave', handleDragLeave);
        shoppingCart.removeEventListener('drop', handleDrop);
      };
    }
  }, []); 

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
        <div className="product-details">
          <h1 className="product-title">
            Dell Vostro 3910 Full Size Tower Business Desktop
          </h1>
          <div className="product-rating">4.4 ⭐ (36 ratings)</div>

          <p className="shipping-info">$246.70 Shipping & Import Fees to Ireland</p>
          <p className="stock-info">Only 5 left in stock - order soon.</p>
         
        </div>
        <div className="image-gallery">
          <div className="main-image-container">
            {/* {currentIndex > 0 && (
              <button
                className="nav-button left"
                onClick={handlePrev}
              ></button>
            )} */}

            <img
              src={images[currentIndex]}
              alt="Main Product"
              className="main-product-image"
            />

            {/* {currentIndex < images.length - 1 && (
              <button
                className="nav-button right"
                onClick={handleNext}
              ></button>
            )} */}
            
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
          <div className="shopping-cart">
           </div>
           <p className="cart-instruction">Drag and drop image to add to cart</p>
          <button className="buy-now-button">Buy Now</button>
        </div>
      </section>

      {/* About This Item Section */}
      <section id="about" className="about-this-item">
        <h2>About This Item</h2>
        <p>This Dell Vostro desktop offers high performance for your business needs with a reliable Intel processor and sleek design.</p>
        <p>Great for multitasking and storing important files securely.</p>
        <p>CPU: 12th Gen Intel Core i3-12100 (12 MB cache, 4 cores, 8 threads, 3.30 GHz to 4.30 GHz Turbo).</p>  
        <p>Intel UHD Graphics 730.</p>  
        <p>Note: Optical drive not included ▌Memory: 16GB DDR4 RAM; Hard Drive: 512GB M.2 PCIe NVMe SSD. Optical Drive: None.</p> 
        <p>Intel(R) Wi-Fi 6 AX201, 2x2, 8 02.11ax, Bluetooth(R) wireless card</p>
        <p>Front: 2 USB 3.2 Gen 1 ports, 2 USB 2.0 ports, 1 Global headset jack; Rear: 2 USB 2.0 ports, 2 USB 3.2 Gen 1 ports, 1 Audio line-out port, 1 HDMI 1.4b port, HDMI 1.4 Maximum resolution supported over HDMI is 1920x1080 @60Hz. No 4K/2K output, 1 DisplayPort 1.4, 1 RJ-45 Ethernet port, 1 AC power-supply port.</p>
        <p>Intel(R) Wi-Fi 6 AX201, 2x2, 8 02.11ax, Bluetooth(R) wireless card; Front: 2 USB 3.2 Gen 1 ports, 2 USB 2.0 ports, 1 Global headset jack; Rear: 2 USB 2.0 ports, 2 USB 3.2 Gen 1 ports, 1 Audio line-out port, 1 HDMI 1.4b port, HDMI 1.4 (Maximum resolution supported over HDMI is 1920x1080 @60Hz. No 4K/2K output), 1 DisplayPort 1.4, 1 RJ-45 Ethernet port, 1 AC power-supply port. </p> 
        <p>Windows 11 Pro, English. Dell Multimedia Keyboard-KB216 Black (English) and Dell Optical Mouse (Black) included. Black with Silver mesh. USISNIC </p>

      </section>

      {/* Related Items Section */}
      <section id="related" className="related">
        <RelatedItems relatedItems={relatedItems} />
      </section>     

 


      {/* Questions Section */}
      <section id="questions" className="questions">
        <h2>Customer Questions & Answers</h2>
        <p>
          <strong>Q:</strong> Does this desktop come with a monitor? <br />
          <strong>A:</strong> No, the monitor is sold separately.
        </p>
        <p>
          <strong>Q:</strong> Does this desktop come with a monitor? <br />
          <strong>A:</strong> No, the monitor is sold separately.
        </p>
        <p>
          <strong>Q:</strong> Does this desktop come with a monitor? <br />
          <strong>A:</strong> No, the monitor is sold separately.
        </p>
        <p>
          <strong>Q:</strong> Does this desktop come with a monitor? <br />
          <strong>A:</strong> No, the monitor is sold separately.
        </p>
        <p>
          <strong>Q:</strong> Does this desktop come with a monitor? <br />
          <strong>A:</strong> No, the monitor is sold separately.
        </p>
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
        <ReviewFilter reviews={reviews} />
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


