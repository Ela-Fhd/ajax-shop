$(function () {
    let productData = null;
    let page_capacity = 6;
    let productItem = null;
    let subject = null;
    let minPrice = null;
    let maxPrice = null;
    let subjectbrand = null;
    let ID;
    let shoppingObject;
    let shoppingItemList;

    if (typeof $.cookie("shoppingCartItem") == "undefined") {
        shoppingItemList = [];

    } else {
        shoppingItemList = JSON.parse($.cookie("shoppingCartItem"));
    }

    if (window.location.href.indexOf("shoppingCartpage.html") == -1) {
        $.ajax({
            url: "XML/products.xml",
            success: function (response) {
                productData = response;
                productItem = $(productData).find("product");
                if (window.location.href.indexOf("products") == -1) {
                    createPage();
                    createProduct(1);
                    handlePrice();
                    filtersubject();
                    addSubject();
                }
                else {
                    addSubject();
                    showProducts();
                }
            },
            timeout: 5000,
            error: function () {
                alert("Error Found!")
            }

        });
    }
    else {
        fillShoppingCardTable();
    }



    function fillShoppingCardTable() {
        $.each(shoppingItemList, function (index, element) {
            let indexItem = index + 1;
            let price = element.price.split("$")[0];
            // console.log(price)
            $("[data-shopping-cart-table] tbody").append("<tr/>");
            $("[data-shopping-cart-table] tbody tr").last().append("<td data-id ='" + element["id"] + "' data-index='" + index + "'>" + indexItem + "</td>").append("<td>" + element.name + "</td>").append("<td>" + element.price + "</td>").append("<td contenteditable='true'>" + element.Qty + "</td>").append("<td>" + (element.Qty * price) + "<small> $</small> </td>");
        });


        $("[data-shopping-cart-table] tbody tr td[contenteditable]").blur(function () {
            // console.log($(this).text())
            let currentRow = $(this).parent();
            $(currentRow).children().eq(4).html($(currentRow).children().eq(2).text().split("$")[0] * $(this).text() + "<small> $ </small>");

            shoppingItemList[$(currentRow).children().eq(0).attr("data-index")].Qty = $(this).text();
            $.cookie("shoppingCartItem", JSON.stringify(shoppingItemList), { expires: 1 })
            totalInvoice()
        })
        totalInvoice()
    }

    function totalInvoice() {
        let total = 0;
        $.each(shoppingItemList, function (index, element) {
            let totalprice = element.price.split("$")[0];
            total += element.Qty * totalprice;
            $("[data-shopping-cart-table] tfoot tr td:nth-child(2)").html("<span class='text-center'>" + total + "</span> <span> $ </span>");
        });
    }

    updateBadge();
    function updateBadge() {
        $(".move-right .badge").text(shoppingItemList.length);
    }

    function showProducts() {
        ID = window.location.href.split("?")[1].split("=")[1];
        // console.log(ID);
        let selectedProduct = $(productData).find("product[id='" + ID + "']");
        let img = $(".product-img img").attr("src", "img/" + ID + ".jpg");
        if ((window.innerWidth) < 800) {
            img.attr("data-zoom-image", "img/" + ID + ".jpg").elevateZoom({
                easing: true,
                zoomType: "inner",
                lensSize: 100,
                borderSize: 0,
                responsive: true,
                cursor: "crosshair",
                zoomWindowOffetx: 5,
            });
        }
        if ((window.innerWidth) > 800) {
            img.attr("data-zoom-image", "img/" + ID + ".jpg").elevateZoom({
                zoomWindowPosition: 2,
                easing: true,
                lensSize: 100,
                borderSize: 0,
                responsive: true,
                cursor: "crosshair",
                zoomWindowOffetx: 5,
            });
        }

        $(".colorPickSelector").colorPick({
            'initialColor': '#f1c40f',
            'allowRecent': true,
            'recentMax': 5,
            'palette': ["#1abc9c", "#16a085", "#2ecc71", "#27ae60", "#3498db", "#2980b9", "#9b59b6", "#8e44ad", "#34495e", "#2c3e50", "#f1c40f", "#f39c12", "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#ecf0f1", "#bdc3c7", "#95a5a6", "#7f8c8d"],
        });

        $("[data-product]").each(function (indexItem, elementItem) {
            $(elementItem).text($(selectedProduct).find($(elementItem).attr("data-product")).text());
            $("[data-product]").eq(1).text($(selectedProduct).find("price").text() + "$");
        });


        var accardionTitle = document.querySelector(".accardion-title");
        accardionTitle.addEventListener("click", () => {
            const height = accardionTitle.nextElementSibling.scrollHeight;
            accardionTitle.classList.toggle("active-header");
            if (accardionTitle.classList.contains("active-header")) {
                accardionTitle.nextElementSibling.style.maxHeight = height + "px";
            } else {
                accardionTitle.nextElementSibling.style.maxHeight = "0px";
            }
        })
    }

    function handlePrice() {
        let Max;
        let Min;
        $(productItem).find("price").each(function (indexPrice, elementPrice) {
            if (Number(clearText($(elementPrice).text().trim())) > Max || typeof Max == "undefined") {
                Max = Number(clearText($(elementPrice).text().trim()));
            }
            if (Number(clearText($(elementPrice).text().trim())) < Min || typeof Min == "undefined") {
                Min = Number(clearText($(elementPrice).text().trim()));
            }
        });
        $(".price-slider").ionRangeSlider({
            type: "double",
            min: Min,
            max: Max,
            from: Min,
            to: Max,
            grid: true,
            skin: "square",
            grid_num: 4,
            postfix: "$",
            onChange: function (data) {
                minPrice = data.from;
                maxPrice = data.to;
                filterProducts();
            }

        });
        let priceRangeElement = $(".price-slider").data("ionRangeSlider");
        priceRangeElement.update({
            from: Min,
            to: Max
        });
    }

    function filterProducts() {
        productItem = $(productData).find("product").filter(function () {
            let filterFlag = true;
            if (subject != null) {
                filterFlag = $(this).find("subject").text() == subject && filterFlag;
            }
            if (maxPrice != null) {
                filterFlag = Number(clearText($(this).find("price").text().trim())) <= maxPrice && filterFlag;
            }

            if (minPrice != null) {
                filterFlag = Number(clearText($(this).find("price").text().trim())) >= minPrice && filterFlag;
            }

            if (subjectbrand != null) {
                filterFlag = $(this).find("subject").text() == subjectbrand && filterFlag;
            }

            return filterFlag;
        });
        createProduct(1);
        createPage();

    }

    function filtersubject() {
        var subject = $(productItem).find("subject");
        $(".checkboxes").append('<div class="d-flex justify-content-end align-items-center my-3 text-light "><label for="checkbox" class="my-1">All</label> <input type="checkbox" name="All" id="checkbox" class="mx-2"></div>');
        $.each(subject, function (indexSub, elementSub) {
            // $("input:checkbox").attr("name", $(elementBrand).last().text());
            if ($(".checkboxes").html().indexOf('<div class="d-flex justify-content-end align-items-center my-3 text-light "><label for="checkbox" class="my-1">' + $(elementSub).text() + '</label> <input type="checkbox" name="' + $(elementSub).text() + '" id="checkbox" class="mx-2"></div>') == -1) {

                $(".checkboxes").append('<div class="d-flex justify-content-end align-items-center my-3 text-light "><label for="checkbox" class="my-1">' + $(elementSub).text() + '</label> <input type="checkbox" name="' + $(elementSub).text() + '" id="checkbox" class="mx-2"></div>');
            }
        });

        $("input:checkbox").change(function () {
            if ($(this).prop("checked")) {
                let selectsub = $(this).attr("name");
                if (selectsub != "All") {
                    subjectbrand = selectsub;
                    filterProducts();
                }
                else {
                    subjectbrand = null;
                    filterProducts();
                }
            }
            else {
                subjectbrand = null;
                filterProducts();
            }

            handlePrice();
        })



        // $.each(myInput , function(index , element){
        //     $("input:checkbox").change(function(){
        //         if($(myInput).prop("checked") == true){
        //             let selectsub =$(this).attr("name");
        //             alert(selectsub)
        //         }

        //      })

        // }) 



    }

    function addSubject() {
        let subjects = $(productItem).find("subject");
        $("navbar ul.navbar-list li ul.sub-menue").append(`<li><a href="#" class="text-center"><strong>All product</strong></a></li>`);

        $.each(subjects, function (indexSub, elementSub) {
            if (clearText($("navbar ul.navbar-list li ul.sub-menue").html().trim()).indexOf('<li class="subject"><a href="#">' + $(elementSub).text() + '</a></li>') == -1) {
                $("navbar ul.navbar-list li ul.sub-menue").append('<li class="subject"><a href="#">' + $(elementSub).text() + '</a></li>');
            }
        });

        $("ul.sub-menue li a").click(function () {
            let selectSubject = $(this).text();
            if (selectSubject.indexOf("All product") == -1) {
                subject = selectSubject;
                filterProducts();
            }
            else {
                subject = null;
                filterProducts();
            }
            handlePrice();
        })

    }

    function clearText(_text) {
        while (_text.indexOf('\n') != -1) {
            _text = _text.replace('\n', '');
        }
        while (_text.indexOf('\r') != -1) {
            _text = _text.replace('\r', '');
        }
        return _text;
    };

    function createPage() {
        $(".pageCenter .pagination li.page-item a.page-link:not([aria-label])").parent().remove();

        let PageNo = Math.ceil(productItem.length / page_capacity);
        for (pageItemNo = 1; pageItemNo <= PageNo; pageItemNo++) {
            $(".pageCenter nav .pagination li").last().before("<li class='page-item'><a href='#' class='page-link'>" + pageItemNo + "</a></li>")
        }

        $(".pageCenter .pagination li.page-item a.page-link").not("[aria-label]").click(function () {
            setPage($(this).text());

        });

        $(".pageCenter .pagination li.page-item a.page-link ").not("[aria-label]").parent().first().addClass("active");

        $(".pageCenter .pagination li.page-item a.page-link[aria-label='Previous']").click(function () {
            var prevPage = Number($(".pageCenter .pagination li.page-item.active").text()) - 1;
            setPage(prevPage);

        });

        $(".pageCenter .pagination li.page-item a.page-link[aria-label='Next']").click(function () {
            var nextPage = Number($(".pageCenter .pagination li.page-item.active").text()) + 1;
            setPage(nextPage);

        });
    }

    function setPage(pageNo) {
        //   event.preventDefault();
        //   event.stopPropagation();
        createProduct(pageNo);
        $(".pageCenter .pagination li.page-item.active").removeClass("active");
        $(".pageCenter .pagination li.page-item").eq(pageNo).addClass("active");

        if (pageNo == 1) {
            $(".pageCenter .pagination li.page-item a[aria-label='Previous']").parent().addClass("disabled").css("cursor", "not-allowed");
            $(".pageCenter .pagination li.page-item a[aria-label='Previous']").css("background", "lightgray");
        }
        else {
            $(".pageCenter .pagination li.page-item a[aria-label='Previous']").parent().removeClass("disabled");
            $(".pageCenter .pagination li.page-item a[aria-label='Previous']").css("background", "#000").css("color", "#eb3007")
        }

        if (pageNo == Math.ceil($(productItem).length / page_capacity)) {
            $(".pageCenter .pagination li.page-item a[aria-label='Next']").parent().addClass("disabled").css("cursor", "not-allowed");
            $(".pageCenter .pagination li.page-item a[aria-label='Next']").css("background", "lightgray");
        }
        else {
            $(".pageCenter .pagination li.page-item a[aria-label='Next']").parent().removeClass("disabled");
            $(".pageCenter .pagination li.page-item a[aria-label='Next']").css("background", "#000").css("color", "#eb3007");
        }

        $("body , html").animate({ scrollTop: 135 }, 500)
    };

    function createProduct(page_current_no) {
        $(".card-section").html("");
        // var productItem = $(productData).find("product");
        var MaxNoItem = ((page_current_no) * page_capacity) > $(productItem).length ? $(productItem).length : (page_current_no * page_capacity);

        for (let item = (page_current_no - 1) * page_capacity; item < MaxNoItem; item++) {

            $(".card-section").last().append(`
            
            <div class="col-12 col-sm-12 col-md-6 col-lg-4">
            <div class="card card-product mt-3">
                <div class="align-items-center p-2 text-center">
                   <div class="card-img">
                   <img src="images/img-4.jpg" alt="" class="rounded img-fluid" width="160">
                   </div>
                    <h5 class="mt-1 product-name text-uppercase"></h5>
                    <div class="mt-1 info">
                        <span class="text1 d-block product-explain nowrap text-center"></span>
                        <a href="#" class="text-decoration-none"><span class="text1 details-product text-capitalize text-danger">more</span></a>
                    </div>
                    <div class="cost text-dark mt-1">
                        <div class="price align-self-center py-2 px-3 text-white">
                            <span class="product-price"></span>
                        </div>
                        <div class="stars mt-3 align-items-center">
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                            <ion-icon name="star" class="star"></ion-icon>
                        </div>
                    </div>
            </div>
                <div class="p-3 text-center text-white add-to-cart cursor">
        <span class="text-uppercase">add to cart
         <ion-icon name="bag-add"></ion-icon>
        </span>
                </div>
            </div>
        </div>
    
`)
            $(".card-section .card img").last().attr("src", "img/" + $(productItem).eq(item).attr("id") + ".jpg");
            $(".card-section .card .product-name").last().text($(productItem).eq(item).find("Name").text());
            $(".card-section .card .product-price").last().text($(productItem).eq(item).find("price").text() + "$");
            // $(".card-section .card .product-explain").last().text($(product).eq(item).find("description").text());
            $(".card-section .card .details-product").last().parent().attr("href", "products.html?id=" + $(productItem).eq(item).attr("id"));
            $(".card-section .card .add-to-cart").last().attr("data-id", $(productItem).eq(item).attr("id"));



        };

        $(".add-to-cart").click(function () {
            swal({
                title: "successfully added to your shopping cart",
                text: "",
                icon: "",
                closeModal: true,
            });
            let id = $(this).attr("data-id");
            let name = $(this).parent().find(".product-name").text();
            let price = $(this).parent().find(".product-price").text();
            let Qty = 1;
            addToShop(id, name, price, Qty);
        })


    };


    $(".addToCart").click(function () {
        swal({
            title: "Thank you!",
            text: "",
            icon: "",
            closeModal: true,
        });

        addToShop(ID, $("[data-product='Name']").text(), $("[data-product='price']").text(), Number($("[data-product='Qty']").val()));

    });


    function addToShop(_Id, _name, _price, _Qty) {
        let findIndex = -1;
        let findItem = shoppingItemList.filter(function (i, n) {
            findIndex = n;
            return i.id == _Id;
        });

        if (findItem.length == 0) {
            shoppingObject = new Object();
            shoppingObject.id = _Id;
            shoppingObject.name = _name;
            shoppingObject.price = _price;
            shoppingObject.Qty = _Qty;
            shoppingItemList.push(shoppingObject);
            updateBadge()
        }

        else {
            shoppingItemList[findIndex].Qty = Number(shoppingItemList[findIndex].Qty + Number(_Qty));
            // findItem[0].Qty = Number(findItem[0].Qty) + _Qty;
            // console.log(findItem[0])
        }

        console.log(shoppingItemList)



        $.cookie("shoppingCartItem", JSON.stringify(shoppingItemList), { expires: 3 });
    }




    //script navbar start
    let selectMenueIcons = document.querySelector(".menue-icons");
    selectMenueIcons.addEventListener("click", function () {
        let selectNavebar = document.querySelector("navbar");
        selectNavebar.classList.toggle("active");
    });
    //script navbar end

    //scrollbar script start
    var progressbar = document.getElementById("progressbar");
    var totalHeight = document.body.scrollHeight - window.innerHeight;
    window.onscroll = function () {
        var progressHeight = (window.pageYOffset / totalHeight) * 100;
        progressbar.style.Height = progressHeight + "%"
    }
    //scrollbar script end

    //scroll to top script start
    let scrollToTop = document.getElementById("ScrollToTop");
    scrollToTop.addEventListener("click", function () {
        // window.scrollTo({
        //     top: 0 ,
        //     left : 0 ,
        //     behavior : "smooth"
        // }) just vanilla js and animation

        // OR

        $("html , body").animate({ scrollTop: 0 }, "slow");
        // just use jquery
    })
    //scroll to top script end

});


