import React, { useState } from 'react';
import './PriceRange.css'
function PriceRange({ onPriceRangeChange }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);
    const [priceGap, setPriceGap] = useState(10);

    const handlePriceInputChange = (e) => {
        const inputName = e.target.name;
        const inputValue = parseInt(e.target.value);

        if (inputName === 'minPrice') {
            if (inputValue <= maxPrice - priceGap) {
                setMinPrice(inputValue);
                onPriceRangeChange(inputValue, maxPrice);
            }
        } else if (inputName === 'maxPrice') {
            if (inputValue >= minPrice + priceGap || isNaN(inputValue)) {
                setMaxPrice(inputValue || null);
                onPriceRangeChange(minPrice, inputValue || null);
            }
        }
    };

    const handleRangeInputChange = (e) => {
        const inputName = e.target.name;
        const inputValue = parseInt(e.target.value);

        if (inputName === 'minRange') {
            if (inputValue <= maxPrice - priceGap) {
                setMinPrice(inputValue);
            } else {
                setMinPrice(maxPrice - priceGap);
            }
        } else if (inputName === 'maxRange') {
            if (inputValue >= minPrice + priceGap) {
                setMaxPrice(inputValue);
            } else {
                setMaxPrice(minPrice + priceGap);
            }
        }
        onPriceRangeChange(minPrice, maxPrice);
    };

    const rangeWidth = ((maxPrice - minPrice) / 10000) * 100;
    const rangeLeft = (minPrice / 10000) * 100;
    const rangeRight = 100 - (maxPrice / 10000) * 100;

    return (
        <div className="wrapper">
            <div className="price-input">
                <div className="field">
                    <span>Min</span>
                    <input
                        type="number"
                        name="minPrice"
                        value={minPrice}
                        onChange={handlePriceInputChange}
                    />
                </div>
                <div className="separator">-</div>
                <div className="field">
                    <span>Max</span>
                    <input
                        type="number"
                        name="maxPrice"
                        value={maxPrice}
                        onChange={handlePriceInputChange}
                    />
                </div>
            </div>
            <div className="slider">
                <div
                    className="progress"
                    style={{ width: `${rangeWidth}%`, left: `${rangeLeft}%`, right: `${rangeRight}%` }}
                ></div>
            </div>
            <div className="range-input">
                <input
                    type="range"
                    name="minRange"
                    min="0"
                    max="500"
                    value={minPrice}
                    step="5"
                    onChange={handleRangeInputChange}
                />
                <input
                    type="range"
                    name="maxRange"
                    min="0"
                    max="500"
                    value={maxPrice}
                    step="5"
                    onChange={handleRangeInputChange}
                />
            </div>
        </div>
    );
}

export default PriceRange;

