function Carousel() {
    return (
        <section class="pt-3">
            <div class="container">
                <div class="row gx-3">
                    <main class="col-lg-9">
                        <div
                            id="carouselMaterialStyle"
                            class="carousel slide carousel-fade"
                            data-mdb-ride="carousel"
                        >
                            <div class="carousel-indicators">
                                <button
                                    type="button"
                                    data-mdb-target="#carouselMaterialStyle"
                                    data-mdb-slide-to="0"
                                    class="active"
                                    aria-current="true"
                                    aria-label="Slide 1"
                                ></button>
                                <button
                                    type="button"
                                    data-mdb-target="#carouselMaterialStyle"
                                    data-mdb-slide-to="1"
                                    aria-label="Slide 2"
                                ></button>
                                <button
                                    type="button"
                                    data-mdb-target="#carouselMaterialStyle"
                                    data-mdb-slide-to="2"
                                    aria-label="Slide 3"
                                ></button>
                            </div>
                            <div
                                class="carousel-inner rounded-5 shadow-4-strong"
                                style={{ height: `400px` }}
                            >
                                <div class="carousel-item active">
                                    <img src="assets/images/items/shirt.jpg" class="d-block w-100" />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>SportClothes</h5>
                                        <p>Buy sport Accessories and Clothes now.</p>
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img
                                        src="assets/images/items/shoess.jpg"
                                        class="d-block w-100"
                                        alt="Canyon at Nigh"
                                    />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Shoes</h5>
                                        <p>
                                            Nike, Adidas, and many more famous brands are waiting for
                                            you.
                                        </p>
                                    </div>
                                </div>

                                <div class="carousel-item">
                                    <img
                                        src="assets/images/items/gym.jpg"
                                        class="d-block w-100"
                                        alt="Cliff Above a Stormy Sea"
                                    />
                                    <div class="carousel-caption d-none d-md-block">
                                        <h5>Buy 1 Get 1</h5>
                                        <p>We provide loads of promos and discounts.</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                class="carousel-control-prev"
                                type="button"
                                data-mdb-target="#carouselMaterialStyle"
                                data-mdb-slide="prev"
                            >
                                <span
                                    class="carousel-control-prev-icon"
                                    aria-hidden="true"
                                ></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button
                                class="carousel-control-next"
                                type="button"
                                data-mdb-target="#carouselMaterialStyle"
                                data-mdb-slide="next"
                            >
                                <span
                                    class="carousel-control-next-icon"
                                    aria-hidden="true"
                                ></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </main>
                    <aside class="col-lg-3">
                        <div
                            class="card-banner h-100 rounded-5 img-fluid"
                            style={{
                                backgroundImage: `url('https://images.pexels.com/photos/5926463/pexels-photo-5926463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
                            }}
                        >
                            <div class=" text-center pb-5">
                                <h5 class="pt-5 text-white">Amazing Promos</h5>
                                <h5 class="text-white pl-2 pr-2 pt-3">
                                    We have discount for almost everyday, BUY it now to get free
                                    discount coupon up to 70%.
                                </h5>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}
export default Carousel;