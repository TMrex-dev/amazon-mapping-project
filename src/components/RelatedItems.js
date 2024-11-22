import React, { useState } from "react";

const RelatedItems = ({ relatedItems }) => {
  const itemsPerPage = 3; // Number of items to show per page
  const totalPages = Math.ceil(relatedItems.length / itemsPerPage); // Calculate the total pages

  const [currentPage, setCurrentPage] = useState(0); // Start at the first page

  // Get the current items to display based on the current page
  const currentItems = relatedItems.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="related-items">
      <h2>Related Items</h2>
      <div className="related-items-container">
        {/* Left Arrow */}
        <button
          className={`nav-button left ${currentPage === 0 ? "hidden" : ""}`}
          onClick={handlePrevPage}
        >
          ◀
        </button>

        {/* Related Items List */}
        <div className="related-items-list">
          {currentItems.map((item) => (
            <div key={item.id} className="related-item">
              <img src={item.image} alt={item.title} className="related-item-image" />
              <h4>{item.title}</h4>
              <p className="related-item-price">${item.price}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`nav-button right ${currentPage === totalPages - 1 ? "hidden" : ""}`}
          onClick={handleNextPage}
        >
          ▶
        </button>
      </div>

      {/* Pagination Buttons */}
      <div className="pagination-buttons">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${index === currentPage ? "active" : ""}`}
            onClick={() => handlePageClick(index)}
          >
      
          </button>
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
