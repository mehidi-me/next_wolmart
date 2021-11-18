import React from 'react'
import Skeleton from 'react-loading-skeleton';

export default function SkeletonCard() {
    return (
        <div className="product-wrap product text-center">
        <figure className="product-media">
            <a >
                
                <Skeleton className="skeleton-img" width={216} height={243} />
               
                
            </a>
        </figure>
        <div className="product-details">
        <div className="product-price">
                <span className="price"><Skeleton /></span>
            </div>
            <h4 className="product-name"><a><Skeleton/></a></h4>
           
            <div className="product-price">
                <span className="price"><Skeleton /></span>
            </div>
        </div>
    </div>
    )
}
