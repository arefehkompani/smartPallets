// $(document).ready(function () {
//     var Scrollbar = window.Scrollbar;
//     Scrollbar.init(document.querySelector('.list-menu'));
// });

// const filter_search = () => {
//     $('.select-search').SumoSelect({search: true, noMatch: "یافت نشد"});
//     $('.filter-search').SumoSelect({search: true, searchText: 'Enter here.', noMatch: "یافت نشد", captionFormat:'{0} انتخاب', captionFormatAllSelected:'{0} انتخاب همه', locale: ['انتخاب', 'لغو', 'انتخاب همه']});
// }

// const date_picker = () => {
//     $('#datepicker-1, #datepicker-2, #datepicker-3, #datepicker-4').datepicker({
//         dateFormat: 'yy/mm/dd',
//         changeMonth: true,
//         changeYear: true
//     });
// }

// $('.do-click').click( function() {
//    window.location.replace($(this).attr('href'));
// });

// var menuStatus = true
// var menuClick = false
// var browser
// const menu = () => {
//     if(menuStatus){ //Closing
//         $(".menu").css("width", "90px")
//         $(".content-all").css("margin-right","90px")
//         $(".user-info").hide()
//         $(".accordion-menu-hide").hide()
//         $(".main-menu span").hide()
//         $(".main-menu").addClass("hide-minus-menu")
//         $(".logo img").addClass("minimize-logo")
//         $("#icon-menu").attr("uk-icon", "close")
//         menuStatus = false
//         menuClick = true
//     }else{
//         $(".menu").css("width", "270px")
//         $(".content-all").css("margin-right","270px")
//         $(".user-info").show()
//         $(".accordion-menu-hide").show()
//         $(".main-menu span").show()
//         $(".main-menu").removeClass("hide-minus-menu")
//         $(".logo img").removeClass("minimize-logo")

//         $("#icon-menu").attr("uk-icon", "menu")
//         menuStatus = true
//         menuClick = false
//     }
// }

// const menu_mouseenter = () => {
//    if(!menuStatus){
//     $(".menu").css("width", "270px")
//     $(".user-info").show()
//     $(".accordion-menu-hide").show()
//     $(".main-menu span").show()
//     $(".main-menu").removeClass("hide-minus-menu")
//     $(".logo img").removeClass("minimize-logo")

//     menuStatus = true
//    }
// };

// const menu_mouseleave = () => {
//    if(menuStatus && menuClick){
//         menu()
//    }
// };

// const maximize = () => {
//     if($.fullscreen.isFullScreen()){
//         $.fullscreen.exit()
//     }else{
//         $("body").fullscreen()
//     }
// }

// $(".datepicker-modal").click(function() {
//     $(".datepicker-modal-input").val("")
//     $('#datepicker-modal-1, #datepicker-modal-2').datepicker({
//         dateFormat: 'yy/mm/dd',
//         changeMonth: true,
//         changeYear: true
//     });
    
// })


