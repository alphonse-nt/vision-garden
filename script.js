/* ==========================================================
   VISION GARDEN COMPANY LTD
   FINAL SCRIPT.JS
   HOME + EDEN GARDEN + ORDERS + MEDIA + TESTIMONIALS
========================================================== */


/* ==========================================================
   BASIC SETTINGS
========================================================== */

const DEFAULT_PRICE = 1000;
const WHATSAPP_NUMBER = "250781632705";

let visionOrder = [];
let edenOrder = [];

let selectedOrderType = "vision";

let selectedMediaType = "";
let selectedMediaGarden = "";


/* ==========================================================
   HELPER
========================================================== */

function formatPrice(amount){

    return Number(amount || 0).toLocaleString("en-US") + " Frw";

}


/* ==========================================================
   MENU
========================================================== */

function toggleMenu(){

    const menu = document.getElementById("main-menu");

    if(menu){
        menu.classList.toggle("show");
    }

}


function closeMenu(){

    const menu = document.getElementById("main-menu");

    if(menu){
        menu.classList.remove("show");
    }

}


/* ==========================================================
   SEARCH
========================================================== */

function openSearch(){

    const searchBox =
        document.getElementById("searchBox");

    if(!searchBox){
        return;
    }

    searchBox.classList.toggle("show");

    if(searchBox.classList.contains("show")){

        const input =
            document.getElementById("searchInput");

        if(input){

            setTimeout(function(){

                input.focus();

            },100);

        }

    }

}


function searchSite(){

    const input =
        document.getElementById("searchInput");

    if(!input){
        return;
    }

    const keyword =
        input.value.toLowerCase().trim();

    if(keyword === ""){

        alert("Andika icyo ushaka gushaka.");

        return;

    }

    const elements =
        document.querySelectorAll(
            "h1,h2,h3,h4,p,a"
        );

    let found = false;

    elements.forEach(function(element){

        if(found){
            return;
        }

        if(
            element.innerText &&
            element.innerText
                .toLowerCase()
                .includes(keyword)
        ){

            element.scrollIntoView({

                behavior:"smooth",

                block:"center"

            });

            element.style.background =
                "#e8f5e9";

            element.style.transition =
                "background 0.3s ease";

            setTimeout(function(){

                element.style.background = "";

            },2000);

            found = true;

        }

    });

    if(!found){

        alert(
            "Nta bisubizo bibonetse kuri: " +
            keyword
        );

    }

}


/* ==========================================================
   CLOSE MENU / SEARCH OUTSIDE
========================================================== */

document.addEventListener(
    "click",
    function(e){

        const menu =
            document.getElementById("main-menu");

        const menuBtn =
            document.querySelector(".menu-btn");

        const searchBox =
            document.getElementById("searchBox");

        const searchBtn =
            document.querySelector(".search-btn");


        if(
            menu &&
            !menu.contains(e.target) &&
            menuBtn &&
            !menuBtn.contains(e.target)
        ){

            closeMenu();

        }


        if(
            searchBox &&
            !searchBox.contains(e.target) &&
            searchBtn &&
            !searchBtn.contains(e.target)
        ){

            searchBox.classList.remove("show");

        }

    }
);


/* ==========================================================
   UNIVERSAL SLIDER ENGINE
========================================================== */

function createSlider(config){

    const slider =
        document.querySelector(config.sliderSelector);

    if(!slider){
        return null;
    }


    const slides =
        slider.querySelectorAll(config.slideSelector);

    if(!slides.length){
        return null;
    }


    const dotsBox =
        slider.querySelector(config.dotsSelector);

    const nextButton =
        slider.querySelector(config.nextSelector);

    const prevButton =
        slider.querySelector(config.prevSelector);


    let currentIndex = 0;

    let timer = null;


    /* ======================================================
       SHOW SLIDE
    ====================================================== */

    function showSlide(index){

        if(index >= slides.length){
            index = 0;
        }

        if(index < 0){
            index = slides.length - 1;
        }


        slides.forEach(function(slide){

            slide.classList.remove("active");

        });


        slides[index].classList.add("active");


        if(dotsBox){

            const dots =
                dotsBox.querySelectorAll("span");


            dots.forEach(function(dot){

                dot.classList.remove("active");

            });


            if(dots[index]){

                dots[index].classList.add("active");

            }

        }


        currentIndex = index;

    }


    /* ======================================================
       NEXT
    ====================================================== */

    function nextSlide(){

        showSlide(
            currentIndex + 1
        );

    }


    /* ======================================================
       PREVIOUS
    ====================================================== */

    function previousSlide(){

        showSlide(
            currentIndex - 1
        );

    }


    /* ======================================================
       START TIMER
    ====================================================== */

    function start(){

        if(timer){

            clearInterval(timer);

        }


        timer =
            setInterval(
                nextSlide,
                config.interval
            );

    }


    /* ======================================================
       RESTART TIMER
    ====================================================== */

    function restart(){

        start();

    }


    /* ======================================================
       CREATE DOTS
    ====================================================== */

    if(dotsBox){

        dotsBox.innerHTML = "";


        slides.forEach(function(slide,index){

            const dot =
                document.createElement("span");


            dot.setAttribute(
                "role",
                "button"
            );


            dot.setAttribute(
                "aria-label",
                "Slide " + (index + 1)
            );


            dot.addEventListener(
                "click",
                function(e){

                    e.preventDefault();

                    e.stopPropagation();

                    showSlide(index);

                    restart();

                }
            );


            dotsBox.appendChild(dot);

        });

    }


    /* ======================================================
       NEXT BUTTON
    ====================================================== */

    if(nextButton){

        nextButton.addEventListener(
            "click",
            function(e){

                e.preventDefault();

                e.stopPropagation();

                nextSlide();

                restart();

            }
        );

    }


    /* ======================================================
       PREVIOUS BUTTON
    ====================================================== */

    if(prevButton){

        prevButton.addEventListener(
            "click",
            function(e){

                e.preventDefault();

                e.stopPropagation();

                previousSlide();

                restart();

            }
        );

    }


    /* ======================================================
       INITIAL SLIDE
    ====================================================== */

    showSlide(0);


    /* ======================================================
       START AUTOPLAY
    ====================================================== */

    start();


    /* ======================================================
       RETURN CONTROLS
    ====================================================== */

    return {

        showSlide: showSlide,

        next: nextSlide,

        previous: previousSlide,

        start: start,

        restart: restart

    };

}


/* ==========================================================
   HOME / VISION GARDEN SLIDER
========================================================== */

let visionSlider = null;


/* ==========================================================
   EDEN GARDEN SLIDER
========================================================== */

let edenSlider = null;


/* ==========================================================
   IMAGE ZOOM
========================================================== */

function getTouchDistance(touch1,touch2){

    const x =
        touch1.clientX -
        touch2.clientX;

    const y =
        touch1.clientY -
        touch2.clientY;

    return Math.sqrt(
        x * x + y * y
    );

}


function openImageZoom(image){

    if(!image){
        return;
    }


    closeImageZoom();


    const overlay =
        document.createElement("div");

    overlay.className =
        "image-overlay";


    const zoomImage =
        document.createElement("img");


    zoomImage.src =
        image.currentSrc ||
        image.src;


    zoomImage.alt =
        image.alt || "";


    zoomImage.className =
        "zoom-image";


    zoomImage.style.touchAction =
        "none";


    overlay.appendChild(
        zoomImage
    );


    document.body.appendChild(
        overlay
    );


    document.body.style.overflow =
        "hidden";


    let scale = 1;

    let startScale = 1;

    let startDistance = 0;

    let translateX = 0;

    let translateY = 0;

    let startTranslateX = 0;

    let startTranslateY = 0;

    let isPanning = false;

    let startPanX = 0;

    let startPanY = 0;


    function updateTransform(){

        zoomImage.style.transform =
            "translate3d(" +
            translateX +
            "px," +
            translateY +
            "px,0) scale(" +
            scale +
            ")";

    }


    zoomImage.addEventListener(
        "touchstart",
        function(e){

            if(e.touches.length === 2){

                e.preventDefault();


                startDistance =
                    getTouchDistance(
                        e.touches[0],
                        e.touches[1]
                    );


                startScale =
                    scale;


                startTranslateX =
                    translateX;


                startTranslateY =
                    translateY;


                isPanning = false;

                return;

            }


            if(
                e.touches.length === 1 &&
                scale > 1
            ){

                e.preventDefault();


                isPanning = true;


                startPanX =
                    e.touches[0].clientX;


                startPanY =
                    e.touches[0].clientY;


                startTranslateX =
                    translateX;


                startTranslateY =
                    translateY;

            }

        },
        {
            passive:false
        }
    );


    zoomImage.addEventListener(
        "touchmove",
        function(e){

            if(
                e.touches.length === 2 &&
                startDistance > 0
            ){

                e.preventDefault();


                const currentDistance =
                    getTouchDistance(
                        e.touches[0],
                        e.touches[1]
                    );


                let newScale =
                    startScale *
                    (
                        currentDistance /
                        startDistance
                    );


                newScale =
                    Math.max(
                        1,
                        Math.min(
                            5,
                            newScale
                        )
                    );


                scale =
                    newScale;


                if(scale === 1){

                    translateX = 0;

                    translateY = 0;

                }


                updateTransform();

                return;

            }


            if(
                e.touches.length === 1 &&
                isPanning &&
                scale > 1
            ){

                e.preventDefault();


                translateX =
                    startTranslateX +
                    (
                        e.touches[0].clientX -
                        startPanX
                    );


                translateY =
                    startTranslateY +
                    (
                        e.touches[0].clientY -
                        startPanY
                    );


                updateTransform();

            }

        },
        {
            passive:false
        }
    );


    zoomImage.addEventListener(
        "touchend",
        function(e){

            if(e.touches.length < 2){

                startDistance = 0;

            }

            if(e.touches.length === 0){

                isPanning = false;

            }

        }
    );


    zoomImage.addEventListener(
        "wheel",
        function(e){

            e.preventDefault();


            if(e.deltaY < 0){

                scale += 0.25;

            }else{

                scale -= 0.25;

            }


            scale =
                Math.max(
                    1,
                    Math.min(
                        5,
                        scale
                    )
                );


            if(scale === 1){

                translateX = 0;

                translateY = 0;

            }


            updateTransform();

        },
        {
            passive:false
        }
    );


    let lastTap = 0;


    zoomImage.addEventListener(
        "click",
        function(){

            const now =
                Date.now();


            if(
                now - lastTap > 0 &&
                now - lastTap < 300
            ){

                if(scale === 1){

                    scale = 2;

                }else{

                    scale = 1;

                    translateX = 0;

                    translateY = 0;

                }


                updateTransform();

            }


            lastTap = now;

        }
    );


    overlay.addEventListener(
        "click",
        function(e){

            if(e.target === overlay){

                closeImageZoom();

            }

        }
    );


    updateTransform();

}


function closeImageZoom(){

    const overlay =
        document.querySelector(
            ".image-overlay"
        );


    if(overlay){

        overlay.remove();

    }


    document.body.style.overflow =
        "";

}


function setupImageZoom(){

    const images =
        document.querySelectorAll(
            ".zoom-img, .media-grid img"
        );


    images.forEach(function(img){

        if(
            img.dataset.zoomReady === "true"
        ){

            return;

        }


        img.dataset.zoomReady =
            "true";


        img.style.cursor =
            "zoom-in";


        img.addEventListener(
            "click",
            function(e){

                e.preventDefault();

                openImageZoom(this);

            }
        );

    });

}


/* ==========================================================
   WHY US
========================================================== */

function toggleWhyUs(){

    const box =
        document.getElementById(
            "why-content"
        );


    if(box){

        box.classList.toggle("show");

    }

}


/* ==========================================================
   ORDER DATA
========================================================== */

const ORDER_PRODUCTS = {

    vision: [

        {
            name:"Ingemwe za Avoka",
            price:DEFAULT_PRICE
        },

        {
            name:"Ingemwe z'Imyembe",
            price:DEFAULT_PRICE
        },

        {
            name:"Ingemwe z'Amacunga",
            price:DEFAULT_PRICE
        },

        {
            name:"Ingemwe z'Indimu",
            price:DEFAULT_PRICE
        },

        {
            name:"Ingemwe za Papayi",
            price:DEFAULT_PRICE
        },

        {
            name:"Ingemwe z'Imizabibu",
            price:DEFAULT_PRICE
        },

        {
            name:"Ibiti by'Amashyamba",
            price:DEFAULT_PRICE
        },

        {
            name:"Indabo n'Ibiti byo Kurimbisha",
            price:DEFAULT_PRICE
        }

    ],


    eden: [

        {
            name:"Amafunguro",
            price:DEFAULT_PRICE
        },

        {
            name:"Ibinyobwa",
            price:DEFAULT_PRICE
        },

        {
            name:"Billard / Imyidagaduro",
            price:DEFAULT_PRICE
        },

        {
            name:"Amacumbi",
            price:DEFAULT_PRICE
        }

    ]

};


/* ==========================================================
   GET ORDER
========================================================== */

function getOrder(type){

    return type === "eden"
        ? edenOrder
        : visionOrder;

}


/* ==========================================================
   OPEN UNIVERSAL ORDER
========================================================== */

function openUniversalOrder(type){

    selectedOrderType =
        type === "eden"
            ? "eden"
            : "vision";


    const modal =
        document.getElementById(
            "universalOrderModal"
        );


    if(!modal){
        return;
    }


    const title =
        document.getElementById(
            "orderTitle"
        );


    const description =
        document.getElementById(
            "orderDescription"
        );


    if(selectedOrderType === "eden"){

        if(title){

            title.textContent =
                "🏡 Eden Garden Order";

        }


        if(description){

            description.textContent =
                "Hitamo ibyo ushaka muri Eden Garden.";

        }

    }else{

        if(title){

            title.textContent =
                "🌱 Vision Garden Order";

        }


        if(description){

            description.textContent =
                "Hitamo ibicuruzwa cyangwa serivisi ushaka.";

        }

    }


    renderOrderProducts();

    renderSelectedOrderItems();

    updateUniversalOrderTotal();


    document
        .querySelectorAll(
            ".universal-order-step"
        )
        .forEach(function(step){

            step.style.display =
                "none";

        });


    const firstStep =
        document.getElementById(
            "universalStep1"
        );


    if(firstStep){

        firstStep.style.display =
            "block";

    }


    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeUniversalOrder(){

    const modal =
        document.getElementById(
            "universalOrderModal"
        );


    if(modal){

        modal.classList.remove("show");

    }


    document.body.style.overflow =
        "";

}


/* ==========================================================
   RENDER PRODUCTS
========================================================== */

function renderOrderProducts(){

    const box =
        document.getElementById(
            "orderProducts"
        );


    if(!box){
        return;
    }


    const products =
        ORDER_PRODUCTS[
            selectedOrderType
        ] || [];


    const order =
        getOrder(
            selectedOrderType
        );


    box.innerHTML = "";


    products.forEach(function(product){

        const existing =
            order.find(function(item){

                return item.name === product.name;

            });


        const card =
            document.createElement("div");


        card.className =
            "order-product";


        if(existing){

            card.classList.add(
                "selected"
            );

        }


        card.innerHTML = `

            <h4>${product.name}</h4>

            <div class="order-price">
                ${formatPrice(product.price)}
            </div>

            <label>

                <input
                    type="checkbox"
                    ${existing ? "checked" : ""}
                >

                Hitamo

            </label>

        `;


        const checkbox =
            card.querySelector(
                "input[type='checkbox']"
            );


        checkbox.addEventListener(
            "change",
            function(){

                if(this.checked){

                    addToOrder(
                        selectedOrderType,
                        product.name,
                        1,
                        product.price
                    );


                    card.classList.add(
                        "selected"
                    );

                }else{

                    removeFromOrder(
                        selectedOrderType,
                        product.name
                    );


                    card.classList.remove(
                        "selected"
                    );

                }


                renderSelectedOrderItems();

                updateUniversalOrderTotal();

            }
        );


        box.appendChild(card);

    });

}


/* ==========================================================
   ADD ORDER
========================================================== */

function addToOrder(
    type,
    name,
    quantity = 1,
    price = DEFAULT_PRICE
){

    const order =
        getOrder(type);


    quantity =
        parseInt(
            quantity,
            10
        ) || 1;


    const existing =
        order.find(function(item){

            return item.name === name;

        });


    if(existing){

        existing.quantity += quantity;

    }else{

        order.push({

            name:name,

            price:
                Number(price) ||
                DEFAULT_PRICE,

            quantity:quantity

        });

    }


    updateUniversalOrderTotal();

}


/* ==========================================================
   SET QUANTITY
========================================================== */

function setOrderQuantity(
    type,
    name,
    quantity
){

    const order =
        getOrder(type);


    quantity =
        parseInt(
            quantity,
            10
        ) || 0;


    const existing =
        order.find(function(item){

            return item.name === name;

        });


    if(quantity <= 0){

        removeFromOrder(
            type,
            name
        );

        return;

    }


    if(existing){

        existing.quantity =
            quantity;

    }else{

        order.push({

            name:name,

            price:DEFAULT_PRICE,

            quantity:quantity

        });

    }


    renderSelectedOrderItems();

    updateUniversalOrderTotal();

}


/* ==========================================================
   REMOVE ORDER
========================================================== */

function removeFromOrder(
    type,
    name
){

    const order =
        getOrder(type);


    const index =
        order.findIndex(function(item){

            return item.name === name;

        });


    if(index !== -1){

        order.splice(
            index,
            1
        );

    }


    renderSelectedOrderItems();

    updateUniversalOrderTotal();

}


/* ==========================================================
   ORDER TOTAL
========================================================== */

function calculateOrderTotal(type){

    const order =
        getOrder(type);


    return order.reduce(
        function(total,item){

            return total +
                (
                    Number(item.price) *
                    Number(item.quantity)
                );

        },
        0
    );

}


/* ==========================================================
   SELECTED ORDER ITEMS
========================================================== */

function renderSelectedOrderItems(){

    const box =
        document.getElementById(
            "selectedOrderItems"
        );


    if(!box){
        return;
    }


    const order =
        getOrder(
            selectedOrderType
        );


    box.innerHTML = "";


    if(!order.length){

        box.innerHTML = `

            <div class="media-empty">

                🛒 Nta kintu urahitamo.

                <br>

                Subira kuri Step 1 uhitemo ibyo ushaka.

            </div>

        `;

        return;

    }


    order.forEach(function(item){

        const row =
            document.createElement("div");


        row.className =
            "selected-order-item";


        row.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <br>

                <small>
                    ${formatPrice(item.price)}
                    kuri kimwe
                </small>

            </div>

            <input
                class="order-quantity"
                type="number"
                min="1"
                value="${item.quantity}"
            >

            <button
                type="button"
                class="small-btn"
            >
                ❌
            </button>

        `;


        const quantityInput =
            row.querySelector(
                ".order-quantity"
            );


        quantityInput.addEventListener(
            "change",
            function(){

                setOrderQuantity(
                    selectedOrderType,
                    item.name,
                    this.value
                );

            }
        );


        const removeButton =
            row.querySelector(
                "button"
            );


        removeButton.addEventListener(
            "click",
            function(){

                removeFromOrder(
                    selectedOrderType,
                    item.name
                );

                renderOrderProducts();

            }
        );


        box.appendChild(row);

    });

}


/* ==========================================================
   UPDATE ORDER TOTAL
========================================================== */

function updateUniversalOrderTotal(){

    const total =
        calculateOrderTotal(
            selectedOrderType
        );


    const totalElement =
        document.getElementById(
            "orderTotal"
        );


    const finalTotalElement =
        document.getElementById(
            "finalOrderTotal"
        );


    if(totalElement){

        totalElement.textContent =
            formatPrice(total);

    }


    if(finalTotalElement){

        finalTotalElement.textContent =
            formatPrice(total);

    }

}


/* ==========================================================
   ORDER STEPS
========================================================== */

function nextUniversalOrderStep(step){

    const order =
        getOrder(
            selectedOrderType
        );


    if(step === 2 && !order.length){

        alert(
            "Banza uhitemo nibura ikintu kimwe."
        );

        return;

    }


    if(step === 3 && !order.length){

        alert(
            "Nta kintu wahisemo."
        );

        return;

    }


    updateUniversalOrderTotal();


    document
        .querySelectorAll(
            ".universal-order-step"
        )
        .forEach(function(box){

            box.style.display =
                "none";

        });


    const target =
        document.getElementById(
            "universalStep" + step
        );


    if(target){

        target.style.display =
            "block";

        target.scrollTop = 0;

    }


    const modalBox =
        document.querySelector(
            ".order-modal-box"
        );


    if(modalBox){

        modalBox.scrollTop = 0;

    }

}


/* ==========================================================
   SEND ORDER TO WHATSAPP
========================================================== */

function sendUniversalOrder(){

    const order =
        getOrder(
            selectedOrderType
        );


    if(!order.length){

        alert(
            "Banza uhitemo nibura ikintu kimwe."
        );

        nextUniversalOrderStep(1);

        return;

    }


    const nameElement =
        document.getElementById(
            "orderCustomerName"
        );


    const phoneElement =
        document.getElementById(
            "orderCustomerPhone"
        );


    const peopleElement =
        document.getElementById(
            "orderPeople"
        );


    const dateElement =
        document.getElementById(
            "orderDate"
        );


    const timeElement =
        document.getElementById(
            "orderTime"
        );


    const noteElement =
        document.getElementById(
            "orderExtraNote"
        );


    const name =
        nameElement
        ? nameElement.value.trim()
        : "";


    const phone =
        phoneElement
        ? phoneElement.value.trim()
        : "";


    const people =
        peopleElement
        ? peopleElement.value.trim()
        : "";


    const date =
        dateElement
        ? dateElement.value
        : "";


    const time =
        timeElement
        ? timeElement.value
        : "";


    const note =
        noteElement
        ? noteElement.value.trim()
        : "";


    if(!name){

        alert("Andika amazina yawe.");

        if(nameElement){
            nameElement.focus();
        }

        return;

    }


    if(!phone){

        alert("Andika nimero ya telefone.");

        if(phoneElement){
            phoneElement.focus();
        }

        return;

    }


    if(!date){

        alert("Hitamo itariki ushaka.");

        if(dateElement){
            dateElement.focus();
        }

        return;

    }


    if(!time){

        alert("Hitamo isaha ushaka.");

        if(timeElement){
            timeElement.focus();
        }

        return;

    }


    const total =
        calculateOrderTotal(
            selectedOrderType
        );


    const title =
        selectedOrderType === "eden"
            ? "🏡 EDEN GARDEN ORDER"
            : "🌱 VISION GARDEN ORDER";


    let message =
        title +
        "\n\n";


    message +=
        "🛒 Ibyo nahisemo:\n";


    order.forEach(function(item){

        const subtotal =
            item.price *
            item.quantity;


        message +=
            "• " +
            item.name +
            " × " +
            item.quantity +
            " = " +
            formatPrice(subtotal) +
            "\n";

    });


    message +=
        "\n💰 TOTAL: " +
        formatPrice(total) +
        "\n\n";


    message +=
        "👤 Amazina: " +
        name +
        "\n";


    message +=
        "📞 Telephone: " +
        phone +
        "\n";


    if(people){

        message +=
            "👥 Umubare w'abantu: " +
            people +
            "\n";

    }


    message +=
        "📅 Itariki: " +
        date +
        "\n";


    message +=
        "🕐 Isaha: " +
        time +
        "\n";


    if(note){

        message +=
            "\n📝 Ibindi nshaka:\n" +
            note +
            "\n";

    }


    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


/* ==========================================================
   CLEAR ORDER
========================================================== */

function clearOrder(type){

    if(type === "eden"){

        edenOrder = [];

    }else{

        visionOrder = [];

    }


    if(selectedOrderType === type){

        renderOrderProducts();

        renderSelectedOrderItems();

        updateUniversalOrderTotal();

    }

}


/* ==========================================================
   OLD ORDER COMPATIBILITY
========================================================== */

function getOrderText(type){

    const order =
        getOrder(type);


    if(!order.length){

        return "Nta kintu nahisemo.";

    }


    return order.map(function(item){

        return (
            "• " +
            item.name +
            " × " +
            item.quantity +
            " = " +
            formatPrice(
                item.price *
                item.quantity
            )
        );

    }).join("\n");

}


function getOrderTotal(type){

    return calculateOrderTotal(type);

}


/* ==========================================================
   OLD EDEN ORDER
========================================================== */

function openMenuOrder(){

    const modal =
        document.getElementById(
            "menuOrderModal"
        );


    if(modal){

        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }

}


function closeMenuOrder(){

    const modal =
        document.getElementById(
            "menuOrderModal"
        );


    if(modal){

        modal.classList.remove("show");

    }


    document.body.style.overflow =
        "";

}


function nextMenuStep(step){

    document
        .querySelectorAll(
            ".order-step"
        )
        .forEach(function(box){

            box.style.display =
                "none";

        });


    const next =
        document.getElementById(
            "menuStep" + step
        );


    if(next){

        next.style.display =
            "block";

    }

}


function sendEdenOrder(){

    const selected = [];


    document
        .querySelectorAll(
            "#menuOrderModal input[type='checkbox']:checked"
        )
        .forEach(function(item){

            selected.push(
                item.value
            );

        });


    const nameElement =
        document.getElementById(
            "customerName"
        );


    const phoneElement =
        document.getElementById(
            "customerPhone"
        );


    const noteElement =
        document.getElementById(
            "customerNote"
        );


    const name =
        nameElement
        ? nameElement.value
        : "";


    const phone =
        phoneElement
        ? phoneElement.value
        : "";


    const note =
        noteElement
        ? noteElement.value
        : "";


    const message =
        "🏡 Muraho Eden Garden!\n\n" +

        "Ndifuza gutumiza:\n" +

        (
            selected.length
            ? selected.join("\n")
            : "Nta kintu nahisemo."
        ) +

        "\n\n" +

        "Amazina: " +
        name +

        "\nTelephone: " +
        phone +

        "\n\nIbisobanuro:\n" +
        note;


    window.open(

        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message),

        "_blank"

    );

}


/* ==========================================================
   MEDIA
========================================================== */

function chooseMediaType(type){

    selectedMediaType =
        type;

    selectedMediaGarden =
        "";


    const gardenStep =
        document.getElementById(
            "mediaStepGarden"
        );


    const contentStep =
        document.getElementById(
            "mediaStepContent"
        );


    const gallery =
        document.getElementById(
            "mediaGallery"
        );


    if(gardenStep){

        gardenStep.style.display =
            "block";

    }


    if(contentStep){

        contentStep.style.display =
            "none";

    }


    if(gallery){

        gallery.innerHTML =
            "";

    }


    document
        .querySelectorAll(
            ".media-type-btn"
        )
        .forEach(function(button){

            button.classList.remove(
                "active"
            );

        });


    if(gardenStep){

        gardenStep.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }

}


function chooseMediaGarden(garden){

    selectedMediaGarden =
        garden;


    const contentStep =
        document.getElementById(
            "mediaStepContent"
        );


    const gallery =
        document.getElementById(
            "mediaGallery"
        );


    const title =
        document.getElementById(
            "selectedMediaTitle"
        );


    if(
        !contentStep ||
        !gallery
    ){

        return;

    }


    const gardenName =
        garden === "vision"
            ? "Vision Garden"
            : "Eden Garden";


    const icon =
        garden === "vision"
            ? "🌱"
            : "🏡";


    const typeName =
        selectedMediaType === "photos"
            ? "Amafoto"
            : "Videos";


    if(title){

        title.textContent =
            icon +
            " " +
            gardenName +
            " — " +
            typeName;

    }


    gallery.innerHTML = `

        <div class="media-empty">

            ${
                selectedMediaType === "photos"
                ? "📷 Amafoto"
                : "🎥 Videos"
            }

            bya ${gardenName}
            bizashyirwa hano.

        </div>

    `;


    contentStep.style.display =
        "block";


    contentStep.scrollIntoView({

        behavior:"smooth",

        block:"start"

    });

}


function backMediaStep(){

    const gardenStep =
        document.getElementById(
            "mediaStepGarden"
        );


    const contentStep =
        document.getElementById(
            "mediaStepContent"
        );


    if(contentStep){

        contentStep.style.display =
            "none";

    }


    if(gardenStep){

        gardenStep.style.display =
            "block";

    }

}


function resetMediaSection(){

    selectedMediaType = "";

    selectedMediaGarden = "";


    const gardenStep =
        document.getElementById(
            "mediaStepGarden"
        );


    const contentStep =
        document.getElementById(
            "mediaStepContent"
        );


    const gallery =
        document.getElementById(
            "mediaGallery"
        );


    if(gardenStep){

        gardenStep.style.display =
            "none";

    }


    if(contentStep){

        contentStep.style.display =
            "none";

    }


    if(gallery){

        gallery.innerHTML =
            "";

    }


    document
        .querySelectorAll(
            ".media-type-btn, .media-garden-btn"
        )
        .forEach(function(button){

            button.classList.remove(
                "active"
            );

        });

}


/* ==========================================================
   MEDIA OUTSIDE CLICK
========================================================== */

document.addEventListener(
    "click",
    function(e){

        const mediaSection =
            document.getElementById(
                "ibikorwa"
            );


        if(
            !mediaSection ||
            mediaSection.contains(e.target)
        ){

            return;

        }


        const gardenStep =
            document.getElementById(
                "mediaStepGarden"
            );


        const contentStep =
            document.getElementById(
                "mediaStepContent"
            );


        if(gardenStep){

            gardenStep.style.display =
                "none";

        }


        if(contentStep){

            contentStep.style.display =
                "none";

        }

    }
);


/* ==========================================================
   ORDER MODAL OUTSIDE CLICK
========================================================== */

document.addEventListener(
    "click",
    function(e){

        const modal =
            document.getElementById(
                "universalOrderModal"
            );


        if(
            modal &&
            e.target === modal
        ){

            closeUniversalOrder();

        }

    }
);


/* ==========================================================
   MINIMUM ORDER DATE
========================================================== */

function setMinimumOrderDate(){

    const dateInput =
        document.getElementById(
            "orderDate"
        );


    if(!dateInput){
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    dateInput.min =
        year +
        "-" +
        month +
        "-" +
        day;

}


/* ==========================================================
   TESTIMONIAL FILTER
========================================================== */

function filterTestimonials(type, button){

    const cards =
        document.querySelectorAll(
            ".testimonial-card"
        );


    const buttons =
        document.querySelectorAll(
            ".testimonial-filter-btn"
        );


    buttons.forEach(function(btn){

        btn.classList.remove("active");

    });


    if(button){

        button.classList.add("active");

    }


    cards.forEach(function(card){

        const cardType =
            card.getAttribute(
                "data-type"
            );


        if(
            type === "all" ||
            cardType === type
        ){

            card.style.display = "";

        }else{

            card.style.display = "none";

        }

    });

}


/* ==========================================================
   SUBMIT TESTIMONIAL
========================================================== */

function submitTestimonial(event){

    if(event){

        event.preventDefault();

    }


    const nameElement =
        document.getElementById(
            "testimonialName"
        );


    const phoneElement =
        document.getElementById(
            "testimonialPhone"
        );


    const typeElement =
        document.getElementById(
            "testimonialType"
        );


    const messageElement =
        document.getElementById(
            "testimonialMessage"
        );


    const consentElement =
        document.getElementById(
            "testimonialConsent"
        );


    const rating =
        document.querySelector(
            'input[name="rating"]:checked'
        );


    const name =
        nameElement
        ? nameElement.value.trim()
        : "";


    const phone =
        phoneElement
        ? phoneElement.value.trim()
        : "";


    const type =
        typeElement
        ? typeElement.value
        : "";


    const message =
        messageElement
        ? messageElement.value.trim()
        : "";


    const consent =
        consentElement
        ? consentElement.checked
        : false;


    if(
        !name ||
        !type ||
        !rating ||
        !message
    ){

        alert(
            "Nyamuneka uzuza amakuru yose akenewe."
        );

        return;

    }


    if(!consent){

        alert(
            "Ugomba kwemera ko ubuhamya bwawe bugenzurwa mbere yo kugaragara kuri website."
        );

        return;

    }


    const testimonial = {

        id:Date.now(),

        name:name,

        phone:phone,

        type:type,

        rating:Number(
            rating.value
        ),

        message:message,

        status:"pending",

        createdAt:
            new Date().toISOString()

    };


    let pendingTestimonials =
        JSON.parse(
            localStorage.getItem(
                "pendingTestimonials"
            )
        ) || [];


    pendingTestimonials.push(
        testimonial
    );


    localStorage.setItem(
        "pendingTestimonials",
        JSON.stringify(
            pendingTestimonials
        )
    );


    const form =
        document.getElementById(
            "testimonialForm"
        );


    if(form){

        form.reset();

    }


    const pendingMessage =
        document.getElementById(
            "testimonialPendingMessage"
        );


    if(pendingMessage){

        pendingMessage.style.display =
            "block";

        pendingMessage.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }


    alert(
        "Murakoze! Ubuhamya bwawe bwoherejwe kandi buri gutegereza igenzurwa."
    );

}


/* ==========================================================
   ESC KEY
========================================================== */

document.addEventListener(
    "keydown",
    function(e){

        if(e.key !== "Escape"){
            return;
        }


        closeMenu();

        closeUniversalOrder();

        closeMenuOrder();

        closeImageZoom();


        const searchBox =
            document.getElementById(
                "searchBox"
            );


        if(searchBox){

            searchBox.classList.remove(
                "show"
            );

        }

    }
);


/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        /* ==================================================
           HOME SLIDER
        ================================================== */

        visionSlider =
            createSlider({

                sliderSelector:
                    "#vision-slider",

                slideSelector:
                    ".hero-slide",

                dotsSelector:
                    ".hero-dots",

                nextSelector:
                    ".hero-next",

                prevSelector:
                    ".hero-prev",

                interval:
                    5000

            });


        /* ==================================================
           EDEN GARDEN SLIDER

           IMPORTANT:
           Eden uses its own slider container.
        ================================================== */

        edenSlider =
            createSlider({

                sliderSelector:
                    "#eden-slider",

                slideSelector:
                    ".hero-slide",

                dotsSelector:
                    ".hero-dots",

                nextSelector:
                    ".hero-next",

                prevSelector:
                    ".hero-prev",

                interval:
                    6000

            });


        /* ==================================================
           IMAGE ZOOM
        ================================================== */

        setupImageZoom();


        /* ==================================================
           ORDER DATE
        ================================================== */

        setMinimumOrderDate();


        /* ==================================================
           LOG
        ================================================== */

        console.log(
            "Vision Garden Company Ltd — Script loaded successfully."
        );


        if(visionSlider){

            console.log(
                "Vision/Home slider: READY"
            );

        }


        if(edenSlider){

            console.log(
                "Eden Garden slider: READY"
            );

        }

    }
);



/* ==========================================================
   AMATANGAZO SYSTEM
   VISION GARDEN COMPANY LTD
========================================================== */


/* ==========================================================
   SELECT COMPANY
========================================================== */

function showAnnouncementCompany(company){

    const vision =
        document.getElementById("vision-announcements");

    const eden =
        document.getElementById("eden-announcements");

    const visionButton =
        document.querySelector(".vision-company");

    const edenButton =
        document.querySelector(".eden-company");


    /* VISION */

    if(company === "vision"){

        if(vision){
            vision.style.display = "block";
        }

        if(eden){
            eden.style.display = "none";
        }

        if(visionButton){
            visionButton.classList.add("active");
        }

        if(edenButton){
            edenButton.classList.remove("active");
        }

        if(vision){
            setTimeout(function(){

                vision.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            },100);
        }

    }


    /* EDEN */

    if(company === "eden"){

        if(vision){
            vision.style.display = "none";
        }

        if(eden){
            eden.style.display = "block";
        }

        if(edenButton){
            edenButton.classList.add("active");
        }

        if(visionButton){
            visionButton.classList.remove("active");
        }

        if(eden){
            setTimeout(function(){

                eden.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            },100);
        }

    }

}


/* ==========================================================
   OPEN DOCUMENT
========================================================== */

function openAnnouncementDocument(file){

    if(!file){
        alert("Document ntiyabonetse.");
        return;
    }

    window.open(file,"_blank");

}


/* ==========================================================
   DOWNLOAD DOCUMENT
========================================================== */

function downloadAnnouncementDocument(file){

    if(!file){
        alert("Document ntiyabonetse.");
        return;
    }

    const link =
        document.createElement("a");

    link.href = file;
    link.download = "";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}


/* ==========================================================
   DEFAULT COMPANY
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const vision =
            document.getElementById(
                "vision-announcements"
            );

        const eden =
            document.getElementById(
                "eden-announcements"
            );

        const visionButton =
            document.querySelector(
                ".vision-company"
            );

        const edenButton =
            document.querySelector(
                ".eden-company"
            );


        /* Default = Vision */

        if(vision){
            vision.style.display = "block";
        }

        if(eden){
            eden.style.display = "none";
        }

        if(visionButton){
            visionButton.classList.add("active");
        }

        if(edenButton){
            edenButton.classList.remove("active");
        }

    }
);