import React from 'react';


const Pagination = ({ currentPage, pages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {currentPage > 1 ? 
          <li className="page-item">
            <a className="page-link" href="#!" aria-label="Previous" onClick={() => paginate(currentPage-1)}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li> 
          : ""} 
        { currentPage !== 1 ? 
          <li key={currentPage-1} className='page-item'>
              <a onClick={() => paginate(currentPage-1)} href="#!" className='page-link'>
                {currentPage-1}
              </a>
          </li> : ""}  

        <li key={currentPage} className='page-item'>
              <a onClick={() => paginate(currentPage)} href="#!" className='page-link'>
              {currentPage}
              </a>
        </li>
        
        {currentPage === pages ? "" :
          <li key={currentPage+1} className='page-item'>
            <a onClick={() => paginate(currentPage+1)} href="#!" className='page-link'>
              {currentPage+1}
            </a>
         </li>} 

        {currentPage < pages -1 ? 
          <li className="page-item">
            <a className="page-link" href="#!" aria-label="Next" onClick={() => paginate(currentPage+1)}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li> : ""} 
      </ul>
    </nav>
  );
};

export default Pagination;