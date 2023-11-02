import { useState } from "react"
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import './Paginate.css'

const Paginate = (props) => {
    const { data } = props
    const itemsPerPage = 12
    const [itemOffset, setItemOffset] = useState(0)
    const endOffset = itemOffset + itemsPerPage
    const currentItems = data.slice(itemOffset, endOffset)
    const pageCount = Math.ceil(data.length / itemsPerPage)
    const navigate = useNavigate()

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset)
    }

    return (
        <>
            <div className="content">
                {currentItems.map((val) => {
                    return (
                        <div className="content-info" key={val.id} onClick={() => { navigate(`/homecontent/${val.id}`) }}>
                            <img src={'http://localhost:3001/images/'+val.img} alt={val.title} />
                            <h3>{val.title}</h3>
                            <pre>{val.caption}</pre>
                        </div>
                    )
                })}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< "
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName={itemOffset === 0 ? 'page-arr disabled' : 'page-arr'}
                nextLinkClassName={(itemOffset + itemsPerPage >= data.length) ? 'page-arr disabled' : 'page-arr'}
                activeLinkClassName="active"
            />
        </>
    )
}

export default Paginate