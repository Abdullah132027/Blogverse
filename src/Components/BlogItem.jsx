import React from 'react'
import img from '../assets/travel.jpg'
import { useNavigate } from 'react-router-dom'

function BlogItem(props) {
    const navigate = useNavigate()

    const goToSinglePost = () => {
        navigate(`/singlePost/${props.postId}`)
    }

    const validImage =
        props.image &&
        typeof props.image === 'string' &&
        props.image.trim() !== '' &&
        (props.image.startsWith('data:image') || props.image.startsWith('http'));
    return (
        <>
            <div className="p-4 md:w-1/3" key={props.postId}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={validImage ? props.image : 'https://placehold.co/400x200/png/?text=Blog+Verse'} alt="blog" />
                    <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{props.category || 'Uncategorized'}</h2>
                        <h1 className="title-font text-lg font-bold text-gray-900 mb-3">{props.title}</h1>
                        <p className="leading-relaxed mb-3 line-clamp-3">{props.description}</p>
                        <div className="flex items-center flex-wrap ">
                            <a className="text-primary inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer" onClick={goToSinglePost}>Learn More
                                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-xs pr-3 py-1 border-r-2 border-gray-200">
                                {/* <!-- Calendar Icon --> */}
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                {props.date || 'Unknown Date'}
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-xs">
                                {/* <!-- User Icon --> */}
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 00-3-3.87"></path>
                                    <path d="M4 21v-2a4 4 0 013-3.87"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                {props.userName || 'Anonymous User'}
                            </span>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default BlogItem
