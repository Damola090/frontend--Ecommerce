import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


import MetaData from './layout/MetaData';
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import { useAlert } from 'react-alert';

const { createSliderWithTooltip } = Slider;




const Home = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState("")
    const [rating, setRating] = useState(0)

    console.log(rating)

    const categories = [
        'Electronics',
        'cameras',
        'Accessories',
        'Headphones',
        'food',
        'Books',
        'clothes/shoes',
        'Beauty/Health',
        'Outdoor',
        'Home'

    ]

    const { Keyword } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, productsCount, error, resPerPage } = useSelector(state => state.products)

    //const Keyword = match.params.Keyword

    useEffect(() => {

        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts(Keyword, currentPage, price, category));



    }, [dispatch, alert, error, Keyword, currentPage, price, category])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)

    }

    // let count = productsCount;
    // if(Keyword) {
    //     count = filteredProductsCount
    // }

    return (
        <div container="container container-fluid">
            {loading ? <Loader /> : (

                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">

                            {Keyword ? (
                                <Fragment>
                                    <div className='col-6 col-md-3 mt-5 mb-5'>
                                        <div className='px-5'>
                                            {/* <Range 
                                                marks={{
                                                    1 : `$1`,
                                                    1000 : `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            
                                            /> */}

                                        </div>

                                        <hr className='my-5' />

                                        <div className='mt-5' >
                                            <h4 className='mb-3'>
                                                categories
                                            </h4>

                                            <ul className='pl-0'>
                                                {categories.map((category) => (
                                                    <li
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={category}
                                                        onClick={() => setCategory(category)
                                                        }

                                                    >
                                                        {category}
                                                    </li>

                                                ))}
                                            </ul>
                                        </div>
                                        

                                        <hr className='my-3' />

                                        <div className='mt-5' >
                                            <h4 className='mb-3'>
                                                Ratings
                                            </h4>

                                            <ul className='pl-0'>
                                                {[5, 4, 3, 2, 1].map((star) => (
                                                    <li
                                                        style={{
                                                            cursor: 'pointer',
                                                            listStyleType: 'none'
                                                        }}
                                                        key={star}
                                                        onClick={() => setRating(star)
                                                        }

                                                    >
                                                        <div className='rating-outer'>
                                                            <div className="rating-inner"
                                                                style={{
                                                                    width: `${star * 20}%`
                                                                }}
                                                            >

                                                            </div>

                                                        </div>
                                                    </li>

                                                ))}
                                            </ul>
                                        </div>



                                    </div>
                                    <div className='col-6 col-md-9'>
                                        <div className='row'>
                                            {products && products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>

                            ) : (
                                products && products.map(product => (
                                    <Product key={product._id} product={product} col={3} />
                                ))

                            )}


                        </div>
                    </section>

                    {resPerPage <= productsCount && (
                        <div className='d-flex justify-content-center mt-5'>
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass='page-item'
                                linkClass='page-link'

                            />

                        </div>

                    )}


                </Fragment>
            )}

        </div>
    )
}

export default Home;